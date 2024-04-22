export function calculateWeightAndQuantity(
  items: { quantity: number; weight: number }[],
) {
  let totalWeight = 0;
  let totalQuantity = 0;
  items.map((item) => {
    totalWeight += item.quantity * item.weight;
    totalQuantity += item.quantity;
  });

  return { totalWeight, totalQuantity };
}
