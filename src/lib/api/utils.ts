import type { PostProps } from "../../components/Blog/Post.astro"
import type { ImageMetaData } from "./api"


export function getImageListMetaData(imgURLList: string[]) : ImageMetaData[] {
    if( !Array.isArray(imgURLList) ) return []
    return imgURLList.map( (imgURL : string) => getImageMetaDataFromURL(imgURL) )
}


export function getImageMetaDataFromURL(url : string) : ImageMetaData {
    if( !(typeof url === 'string') ) return {url : '', width : 0, height : 0}

    const [width, height] = url.split('-')[1]
        .split('.')[0]
        .split('x')

    return { url, width : Number(width), height : Number(height) }
}
