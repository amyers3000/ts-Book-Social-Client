import { Author } from './Author';
import { Image } from './Image';

export interface Book {
  title: string;
  authors: Author[];
  publisher: string;
  publishedDate: string;
  description: string;
  pageCount: string;
  averageRating: string;
  imageLinks: Image;
  language: string;
  previewLink: string;
  infoLink: string;
}