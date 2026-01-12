import Decimal from 'decimal.js';
import { MIN_POSITION_DELTA, POSITION_GAP } from './ordering.constants';

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

export function computeNewPosition({
  before,
  after,
}: {
  before?: string | null;
  after?: string | null;
}): { position: Decimal; needsRebalance: boolean } {
  // Empty container
  if (!before && !after) {
    return {
      position: POSITION_GAP,
      needsRebalance: false,
    };
  }

  // Append (right / bottom)
  if (before && !after) {
    return {
      position: new Decimal(before).plus(POSITION_GAP),
      needsRebalance: false,
    };
  }

  // Prepend (left / top)
  if (!before && after) {
    return {
      position: new Decimal(after).minus(POSITION_GAP),
      needsRebalance: false,
    };
  }

  // Insert between
  const left = new Decimal(before!);
  const right = new Decimal(after!);
  const diff = right.minus(left);

  if (diff.lte(MIN_POSITION_DELTA)) {
    return {
      position: left,
      needsRebalance: true,
    };
  }

  return {
    position: left.plus(diff.div(2)),
    needsRebalance: false,
  };
}

export const computeInsertAtTopPosition = (
  minPosition: string | number | null
): {
  position: Decimal;
  needsRebalance: boolean;
} => {
  if (minPosition === null) {
    return {
      position: new Decimal(POSITION_GAP),
      needsRebalance: false,
    };
  }

  const min = new Decimal(minPosition);
  const position = min.div(2);
  const delta = min.minus(position);

  return {
    position,
    needsRebalance: delta.lt(MIN_POSITION_DELTA),
  };
};
