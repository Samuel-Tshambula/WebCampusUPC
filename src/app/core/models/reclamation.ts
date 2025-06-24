export interface Reclamation {
  message: string;
  reclamation: {
    _id: string;
    type: string;
    subject: string;
    message: string;
    teacher: string;
  }
}
