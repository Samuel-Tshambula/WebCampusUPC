export interface Section {
  _id: string;
  name: string;
  __v?: number;
}

export interface SectionResponse {
  message: string;
  section: Section;
}

