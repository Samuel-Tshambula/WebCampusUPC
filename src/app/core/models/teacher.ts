export interface Teacher {
  _id?: string;
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  courses: string[]; // Tableau d'IDs de cours
}

export interface TeacherItem {
  _id: string;
  fullName: string;
  email: string;
  phone:string;
  courses: {
    _id: string;
    title: string;
    description?: string;
    credits: number;
    promotion: {
      _id: string;
      nom: string;
      section: {
        _id: string;
        name: string;
      };
      faculty: {
        _id: string;
        nom: string;
      };
    };
  }[];
}
