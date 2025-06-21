export interface Promotion {
  message: string,
  promotion: {
      name: string,
      _id: string,
      __v: number
  }
}

export interface PromotionItem {
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
}

