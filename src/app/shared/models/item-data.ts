export interface ItemMedia {
  description?: string;
  src?: string;
  title?: string;
}

export interface ItemData {
  title: string;
  thumbnailSrc: string;
  shortDescription: string;
  description?: string;
  audio?: ItemMedia;
  video?: ItemMedia;
  tag?: string;
}
