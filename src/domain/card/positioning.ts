import Decimal from 'decimal.js';
import { CARD_POSITION_GAP, MIN_POSITION_DELTA } from './card.constants';

export const computeInsertAtTopPosition = (
  minPosition: string | number | null
): {
  position: Decimal;
  needsRebalance: boolean;
} => {
  if (minPosition === null) {
    return {
      position: new Decimal(CARD_POSITION_GAP),
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

export function computeInsertBetweenPositions({
  before,
  after,
}: {
  before: string | null;
  after: string | null;
}) {
  // insert at top
  if (!before && !after) {
    return {
      position: new Decimal(CARD_POSITION_GAP),
      needsRebalance: false,
    };
  }

  // insert after
  if (after && !before) {
    return {
      position: new Decimal(after).plus(CARD_POSITION_GAP),
      needsRebalance: false,
    };
  }

  // insert before
  if (before && !after) {
    const pos = new Decimal(before).div(2);
    return {
      position: pos,
      needsRebalance: pos.lt(MIN_POSITION_DELTA),
    };
  }

  const beforeDec = new Decimal(before!);
  const afterDec = new Decimal(after!);
  const pos = beforeDec.plus(afterDec).div(2);

  return {
    position: pos,
    needsRebalance: afterDec.minus(pos).lt(MIN_POSITION_DELTA),
  };
}
