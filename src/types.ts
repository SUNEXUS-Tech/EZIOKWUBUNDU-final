export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  caption: string;
  dateOrEra?: string;
  categorySlug: string;
}


export type GalleryCategory =
  | 'All Moments'
  | 'The Man Behind the Name'
  | 'A Difficult Chapter'
  | 'Hope and Healing'
  | 'Family and Togetherness'
  | 'Life Celebrated';
