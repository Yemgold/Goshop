

export interface DeliveryFeeRule {
  state: string;
  town: string;
  fee: number;
}

/*
  NORMALIZED:
  - state = lowercase
  - town = lowercase
*/

export const deliveryFees: DeliveryFeeRule[] = [
  /* LAGOS */
  {
    state: "lagos",
    town: "ikeja",
    fee: 2500,
  },
  {
    state: "lagos",
    town: "lekki",
    fee: 4000,
  },
  {
    state: "lagos",
    town: "yaba",
    fee: 3000,
  },
  {
    state: "lagos",
    town: "ajah",
    fee: 4500,
  },

  /* ABUJA */
  {
    state: "abuja",
    town: "gwarinpa",
    fee: 3500,
  },
  {
    state: "abuja",
    town: "wuse",
    fee: 3000,
  },

  /* RIVERS */
  {
    state: "rivers",
    town: "port harcourt",
    fee: 5000,
  },

  /* DEFAULT FALLBACK */
  {
    state: "default",
    town: "default",
    fee: 7000,
  },
];