/* lib/sanity/image.ts */
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./api";

type ImageUrlBuilder = ReturnType<typeof imageUrlBuilder>;
type ImageSource = Parameters<ImageUrlBuilder["image"]>[0];

export interface Image {
  image : ImageData,
  tags : string[],
  title : string,
  description : string
}

export interface ImageData {
  url: string, 
  width : number,
  height : number
}

export const imageUrlFor = (source: ImageSource) =>
  imageUrlBuilder(client).image(source);


export function getImageListData(imgURLList: string[]): (ImageData)[] {
  if (!Array.isArray(imgURLList)) return []
  return imgURLList.map((imgURL: string) => getImageDataFromURL(imgURL))
                   .filter( imageData => imageData !== null ) as ImageData[]
}

export function getImageDataFromURL(url: string): ImageData | null {
  if (!(typeof url === 'string')) return null

  const [width, height] = url.split('-')[1]
      .split('.')[0]
      .split('x')

  return { url, width: Number(width), height: Number(height) }
}