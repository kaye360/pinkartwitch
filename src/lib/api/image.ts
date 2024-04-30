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


/**
 * 
 * @description Gets image data from a Portable Text Image
 * 
 */
export const imageUrlFor = (source: ImageSource) =>
  imageUrlBuilder(client).image(source);


/**
 * 
 * @description Takes a list of Sanity image URLs and returns an array of image data 
 * @param imgURLList Array of Sanity image URLs (full URL)
 * 
 */
export function getImageListData(imgURLList: string[]): (ImageData)[] {
  if (!Array.isArray(imgURLList)) return []
  return imgURLList.map((imgURL: string) => getImageDataFromURL(imgURL))
                   .filter( imageData => imageData !== null ) as ImageData[]
}


/**
 * 
 * @description Takes a Sanity image URL and returns its image data
 * @param url - Sanity image URL
 * 
 */
export function getImageDataFromURL(url: string): ImageData | null {
  if (!(typeof url === 'string')) return null

  const [width, height] = url.split('-')[1]
      .split('.')[0]
      .split('x')

  return { url, width: Number(width), height: Number(height) }
}