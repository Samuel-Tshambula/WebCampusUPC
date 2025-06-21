export interface Course {
  _id?: string;
  title: string;
  description?: string;
  credit: number;
  promotion: string;
}

export interface CourseResponse {
  message: string;
  course: Course;
}

export interface CourseItem {
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
      __v: number;
    };
    faculty: {
      _id: string;
      nom: string;
      __v: number;
    };
    __v: number;
  };
  __v: number;
}


