export interface TPItem {
  _id?: string;
  title: string;
  description: string;
  promotion: string; // ID de la promotion
  file?: string | null;
  teacher?: string;
  createdAt?: string;
}
