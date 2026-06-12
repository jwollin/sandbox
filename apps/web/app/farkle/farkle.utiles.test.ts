export type Hand = number[];
export type Roll = { [key: string]: number };

export const populateDice = ({ hand = [] }: { hand: Hand }) => {
  return hand.reduce((acc: Record<number, number>, die: number) => {
    if (acc[die]) {
      acc[die] = acc[die] + 1;
      return acc;
    }
    acc[die] = 1;

    return acc;
  }, {});
};

const WILDS = {
  1: {
    value: 100,
  },
  5: {
    value: 50,
  },
};

export const getDiceProperties = (
  number: string | number,
):
  | {
      name: string;
      prettyName: string;
    }
  | {} => {
  switch (number.toString()) {
    case '1': {
      return {
        name: 'one',
        prettyName: 'ace',
      };
    }
    case '2': {
      return {
        name: 'two',
        prettyName: 'deuce',
      };
    }
    case '3': {
      return {
        name: 'three',
        prettyName: 'three',
      };
    }
    case '4': {
      return {
        name: 'four',
        prettyName: 'four',
      };
    }
    case '5': {
      return {
        name: 'five',
        prettyName: 'five',
      };
    }
    case '6': {
      return {
        name: 'six',
        prettyName: 'six',
      };
    }
    default:
      return {};
  }
};

const checkForStraight = ({ rolls, hand }: { rolls: Roll; hand: Hand }) => {
  const hasHand = Object.entries(rolls).length === 6;
  if (!hasHand) {
    return [];
  }

  return {
    type: 'Straight',
    hasHands: hasHand,
    hands: [
      {
        type: 'Straight',
        points: 1500,
        message: 'You have a Straight!',
        hand,
      },
    ],
  };
};

const getPairs = (number: number, length: number) => {
  return Array.from({ length }, () => number);
};

const checkForWilds = ({
  hand: hand,
  rolls: _,
}: {
  rolls: Roll;
  hand: Hand;
}) => {
  const wildArr: string[] = Object.keys(WILDS);
  const filteredHandByWilds: number[] = hand.filter((die: number) => {
    return wildArr.includes(`${die}`);
  });

  const hasHands = filteredHandByWilds.length > 0;

  if (!hasHands) return [];

  return {
    type: 'Wilds',
    hasHands,
    hands: [
      {
        type: 'Wild',
        message: 'You have wilds!',
        hand: filteredHandByWilds,
      },
    ],
  };
};

const checkForCombos = ({
  hand: hand,
  rolls: rolls,
}: {
  rolls: Roll;
  hand: Hand;
}) => {
  const combos = {
    type: 'Combos',
    hasHands: false,
  };
  const hands: {
    type: string;
    message: string;
    points: number;
    hand: number[];
  }[] = [];

  const rollEntries = Object.entries(rolls);
  const rollValues = Object.values(rolls);
  const highestRollValue = Math.max(...rollValues);
  const hasThreeOfKind = highestRollValue === 3;
  const hasFourOfKind = highestRollValue === 4;
  const hasFiveOfKind = highestRollValue === 5;
  const hasSixOfKind = highestRollValue === 6;
  const hasTwoEntries = rollEntries.length === 2;
  const hasThreeEntries = rollEntries.length === 3;
  const isThreePairs = rollValues.every((value) => value === 2);

  if (hasSixOfKind) {
    hands.push({
      type: 'Combo',
      message: 'Six of a kind!',
      points: 3000,
      hand,
    });
    return {
      ...combos,
      hasHands: true,
      hand,
    };
  } else if (hasFiveOfKind) {
    hands.push({
      type: 'Combo',
      message: 'Five of a kind!',
      points: 2000,
      hand,
    });
    return {
      ...combos,
      hasHands: true,
      hands,
    };
  } else if (hasTwoEntries) {
    if (hasFourOfKind) {
      hands.push({
        type: 'Combo',
        message: 'Four of a kind with a pair',
        points: 1500,
        hand: hand,
      });

      return {
        ...combos,
        hasHands: true,
        hands,
      };
    } else if (hasThreeOfKind) {
      hands.push({
        type: 'Combo',
        message: 'Two triplets',
        points: 2500,
        hand: hand,
      });

      return {
        ...combos,
        hasHands: true,
        hands,
      };
    }
  } else if (hasFourOfKind) {
    if (hasFourOfKind) {
      hands.push({
        type: 'Combo',
        message: 'Four of a kind',
        points: 1000,
        hand: hand,
      });

      return {
        ...combos,
        hasHands: true,
        hands,
      };
    }
  } else if (hasThreeEntries && isThreePairs) {
    hands.push({
      type: 'Combo',
      message: 'Three pairs',
      points: 1000,
      hand: hand,
    });

    return {
      ...combos,
      hasHands: true,
      hands,
    };
  }

  if (!hands.length) {
    return [];
  }

  return combos;
};

const HAND_MAP_UTILS = [checkForStraight, checkForWilds, checkForCombos];

export const checkHands = ({ hand }: { hand: Hand }) => {
  const rolls = populateDice({ hand });
  const hands = HAND_MAP_UTILS.flatMap((fn) => {
    return fn({ hand, rolls });
  });

  return hands.filter((item) => item);
};

const TEST_HAND = [1, 1, 2, 5, 6, 1];
const TEST_HAND_2 = [2, 2, 5, 6, 1, 3];
const TEST_HAND_3 = [2, 2, 2, 3, 1, 3];
const TEST_HAND_4 = [1, 1, 1, 3, 3, 3];
const TEST_HAND_5 = [2, 2, 2, 2, 3, 3];
const FARKLE = [6, 3, 4, 2, 6, 3];
describe('farkle utils', () => {
  describe('populateDice', () => {
    it('gets the number of each die type', () => {
      const result = populateDice({ hand: TEST_HAND });

      expect(result).toEqual({
        '1': 3,
        '2': 1,
        '5': 1,
        '6': 1,
      });
    });
  });
  describe('getHands', () => {
    it('gets all 1s and 5s', () => {
      const result = checkHands({ hand: FARKLE });
      console.log({ result });
      expect(result).toEqual([]);
    });
  });
});
