export interface Actualite {
   message: string;
   actualite: {
        image: string;
        title: string;
        description: string;
        _id: string;
        createdAt: string;
        __v: number;
    }
}

export interface ActualiteAll {
  _id: string;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  __v: number;
}

