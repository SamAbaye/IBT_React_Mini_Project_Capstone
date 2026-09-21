import React, { useState, useMemo } from "react";
import CategoryBar from "./CatagoryBar";
import DishCard from "./DishCard";
import "./Menu.css";
import { useFetch } from "../hooks/useFetch";
import { useCart } from "../cart/CartContext";

function Menu() {
  const [category, setCategory] = useState("All");
  const { data, loading, error } = useFetch("/menu.json");
  const { dispatch } = useCart();

  const dishes = useMemo(() => {
    if (!data?.categories) return [];
    return data.categories.flatMap((cat) =>
      
      cat.items.map((item) => ({
        ...item,
        category: cat.category,
        price: item.priceETB,
        spiceLevel: item.spiceLevel,
        isFasting: item.isFasting,
        isSpecial: item.isSpecial

      })),
    );
  }, [data]);

  const categories = useMemo(
    () => ["All", ...new Set(dishes.map((d) => d.category))],
    [dishes],
  );

  const shown = useMemo(() => {
    const filtered =
      category === "All"
        ? dishes
        : dishes.filter((d) => d.category === category);
    return [...filtered].sort((a, b) => a.price - b.price);
  }, [dishes, category]);

  const addItem = (dish) => dispatch({ type: "add", dish });

  let content;
  if (loading) {
    content = <p>Loading the menu…</p>;
  } else if (error) {
    content = <p className="err">{error}</p>;
  } else if (shown.length === 0) {
    content = <p>No dishes yet.</p>;
  } else {
    content = shown.map((d) => (
      <DishCard key={d.id} {...d} onAdd={() => addItem(d)} />
    ));
  }

  return (
    <div>
      <CategoryBar
        categories={categories}
        selected={category}
        onSelect={setCategory}
      />
      <div className="menu">
        {content}
        
      </div>
    </div>
  );
}

export default Menu;
