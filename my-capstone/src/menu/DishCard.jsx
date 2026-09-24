import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import './DishCard.css';
import useCartStore from "../store/useCartStore";
import image from "../assets/images.png";

function getSpiceRating(spiceLevel) {
  if (!spiceLevel) return 0;
  const match = spiceLevel.match(/(\d)\/3/);
  return match ? Number(match[1]) : 0;
}

const DishCard = ({
  id,
  nameEn,
  nameAm,
  priceETB,
  spiceLevel,
  isFasting,
  isSpecial,
  category,
}) => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.qty ?? 0;

  const isSpicy = getSpiceRating(spiceLevel) >= 2;
  const secondaryBadge = isFasting
    ? { label: "Fasting", className: "badge-fasting" }
    : isSpicy
      ? { label: "🌶️ Spicy", className: "badge-spicy" }
      : null;

  // current (wrong)
  // fixed
  const handleIncrement = () => {
    addItem({
      id,
      nameEn,
      nameAm,
      priceETB,
      spiceLevel,
      isFasting,
      isSpecial,
      category,
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      decrementItem(id);
    }
  };

  return (
    <div className="dish-item">
      <Link to={`/menu/${id}`} className="dish-item-link">
        <div className="image">
          <img src={image} alt={`${nameEn} (${nameAm})`} />
        </div>

        <div className="categoryWrapper">
          <span className="category-label">{category}</span>
          <div className="badges">
            {isSpecial && (
              <span className="badge badge-special">⭐ Special</span>
            )}
            {secondaryBadge && (
              <span className={`badge ${secondaryBadge.className}`}>
                {secondaryBadge.label}
              </span>
            )}
          </div>
        </div>

        <div className="dish-name">{nameAm}</div>
        <div className="dish-price">{priceETB} ETB</div>
      </Link>

      <div className="qty-row">
        <button onClick={handleDecrement} disabled={quantity === 0}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>+</button>
      </div>
    </div>
  );
};;;

DishCard.propTypes = {
  id: PropTypes.string.isRequired,
  nameEn: PropTypes.string.isRequired,
  nameAm: PropTypes.string,
  priceETB: PropTypes.number.isRequired,
  spiceLevel: PropTypes.string,
  isFasting: PropTypes.bool,
  isSpecial: PropTypes.bool,
  category: PropTypes.string,
};

export default DishCard;
