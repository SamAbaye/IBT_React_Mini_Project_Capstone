
export function flattenMenu(data) {
  if (!data?.categories) return [];

  return data.categories.flatMap((cat) =>
    cat.items.map((item) => ({
      ...item,
      category: cat.category,
      price: item.priceETB,
    })),
  );
}
