export interface AnnonceItem {
  _id: string;
  title: string;
  description: string;
  publishedAt: string;
  __v: number;
}

export interface AnnonceResponse {
  message: string;
  annonce: AnnonceItem;
}

export interface AnnonceAll {
  annonces: AnnonceItem[];
  totalPages: number;
  currentPage: number;
}
