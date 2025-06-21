export interface Student {
  _id: string;
  fullName: string;
  cardNumber: string;
  email: string;
  promotion: {
    _id: string;
    nom: string;
    section: {
      _id: string;
      name: string;
      __v: number;
    };
    faculty: {
      _id: string;
      nom: string;
      __v: number;
    };
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface StudentItem {
  _id: string;
  fullName: string;
  cardNumber: string;
  email: string;
  promotion: {
    _id: string;
    nom: string;
    section: { _id: string; name: string; __v: number };
    faculty: { _id: string; nom: string; __v: number };
    __v: number;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
