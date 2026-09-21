import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./DishCard.css";
import { useCart } from "../cart/CartContext";
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
  const { items, dispatch } = useCart();

  const cartItem = items.find((item) => item.id === id);
  const quantity = cartItem?.qty ?? 0;

  const isSpicy = getSpiceRating(spiceLevel) >= 2;
  const secondaryBadge = isFasting
    ? { label: "Fasting", className: "badge-fasting" }
    : isSpicy
      ? { label: "🌶️ Spicy", className: "badge-spicy" }
      : null;

  const handleIncrement = () => {
    dispatch({
      type: "add",
      dish: { id, nameEn, nameAm, priceETB, spiceLevel, isFasting, isSpecial, category },
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch({ type: "decrement", id });
    }
  };

  return (
    <div className="dish-item">
      {/* Clicking the image or name navigates to the detail page.
          The qty buttons below are NOT inside this Link, so clicking
          them doesn't trigger navigation. */}
      <Link to={`/menu/${id}`} className="dish-item-link">
        <div className="image">
          <img src={image} alt={`${nameEn} (${nameAm})`} />
        </div>

        <div className="categoryWrapper">
          <span className="category-label">{category}</span>
          <div className="badges">
            {isSpecial && <span className="badge badge-special">⭐ Special</span>}
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
};

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
