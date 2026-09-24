import React, { useMemo } from "react";
import DishCard from "../menu/DishCard";
import { useFetch } from "../hooks/useFetch";
import "./SpecialDisplay.css";

function SpecialDisplay() {
  const { data, loading, error } = useFetch("/menu.json");

  const dishes = useMemo(() => {
    if (!data?.categories) return [];
    return data.categories.flatMap((cat) =>
      cat.items.map((item) => ({
        ...item,
        category: cat.category,
      })),
    );
  }, [data]);

  const shown = useMemo(() => {
    const filtered = dishes.filter((d) => d.isSpecial === true);
    return [...filtered].sort((a, b) => a.priceETB - b.priceETB);
  }, [dishes]);

  let content;
  if (loading) {
    content = <p>Loading the menu…</p>;
  } else if (error) {
    content = <p className="err">{error}</p>;
  } else if (shown.length === 0) {
    content = <p>No dishes yet.</p>;
  } else {
    content = shown.map((d) => <DishCard key={d.id} {...d} />);
  }

  return <div className="menu">{content}</div>;
}

export default SpecialDisplay;
