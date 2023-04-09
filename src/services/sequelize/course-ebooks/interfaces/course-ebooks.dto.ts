export interface CourseEbookrDTO {
  id: string;
  file?: string;
  title: string;
  level: string;
  reviews?: string;
  typeCourseId: string;
  categoryId: string;
  status: string;
}

export interface CourseEbookQueryDTO {
  page: number;
  limit: number;
  level: string;
  keyword: string;
}
