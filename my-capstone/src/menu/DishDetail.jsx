import { useParams, Link } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import useCartStore from "../store/useCartStore";
import { flattenMenu } from "../ui/flattenMenu";
import image from "../assets/images.png";
import "./DishDetail.css";

function getSpiceRating(spiceLevel) {
  if (!spiceLevel) return 0;
  const match = spiceLevel.match(/(\d)\/3/);
  return match ? Number(match[1]) : 0;
}

function DishDetail() {
  const { id } = useParams();
  const { data, loading, error } = useFetch("/menu.json");

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  if (loading) return <p className="dish-detail-status">Loading dish…</p>;
  if (error) return <p className="dish-detail-status err">{error}</p>;

  const dishes = flattenMenu(data);
  const dish = dishes.find((d) => d.id === id);

  if (!dish) {
    return (
      <div className="dish-detail-status">
        <p>We couldn't find that dish.</p>
        <Link to="/menu">Back to menu</Link>
      </div>
    );
  }

  const cartItem = items.find((i) => i.id === dish.id);
  const quantity = cartItem?.qty ?? 0;
  const isSpicy = getSpiceRating(dish.spiceLevel) >= 2;

  const handleIncrement = () => {
    addItem({
      id: dish.id,
      nameEn: dish.nameEn,
      nameAm: dish.nameAm,
      priceETB: dish.priceETB,
      spiceLevel: dish.spiceLevel,
      isFasting: dish.isFasting,
      isSpecial: dish.isSpecial,
      category: dish.category,
    });
  };

  const handleDecrement = () => {
    if (quantity > 0) decrementItem(dish.id);
  };

  return (
    <div className="dish-detail">
      <Link to="/menu" className="back-link">
        ← Back to menu
      </Link>

      <div className="dish-detail-layout">
        <div className="dish-detail-image">
          <img src={image} alt={`${dish.nameEn} (${dish.nameAm})`} />
        </div>

        <div className="dish-detail-info">
          <span className="category-label">{dish.category}</span>

          <h1>{dish.nameEn}</h1>
          <h2 className="dish-name-am">{dish.nameAm}</h2>

          <div className="badges">
            {dish.isSpecial && (
              <span className="badge badge-special">⭐ Special</span>
            )}
            {dish.isFasting && (
              <span className="badge badge-fasting">Fasting</span>
            )}
            {!dish.isFasting && isSpicy && (
              <span className="badge badge-spicy">🌶️ Spicy</span>
            )}
          </div>

          <p className="dish-price">{dish.priceETB} ETB</p>

          {dish.tagline && <p className="dish-tagline">{dish.tagline}</p>}

          <p className="dish-description">{dish.description}</p>

          {dish.spiceLevel && (
            <p className="dish-meta">
              <strong>Spice level:</strong> {dish.spiceLevel}
            </p>
          )}

          {dish.servings && (
            <p className="dish-meta">
              <strong>Servings:</strong> {dish.servings}
            </p>
          )}

          {dish.ingredients?.length > 0 && (
            <div className="dish-ingredients">
              <strong>Ingredients</strong>
              <ul>
                {dish.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="dish-detail-qty">
            <button onClick={handleDecrement} disabled={quantity === 0}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DishDetail;
