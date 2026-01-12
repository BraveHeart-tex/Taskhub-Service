import Decimal from 'decimal.js';

export const POSITION_GAP = new Decimal(1000);

export function computeInsertAtBottomPosition(max: string | null): {
  position: Decimal;
  needsRebalance: boolean;
} {
  if (max === null) {
    return {
      position: POSITION_GAP,
      needsRebalance: false,
    };
  }

  const next = new Decimal(max).add(POSITION_GAP);

  return {
    position: next,
    needsRebalance: false, // bottom inserts never squeeze
  };
}
