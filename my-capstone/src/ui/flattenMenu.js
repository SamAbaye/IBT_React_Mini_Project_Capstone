// Converts { categories: [{ category, items: [...] }] } into a flat array
// of dishes, each carrying its own `category` and a normalized `price` field.
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
