import { isArray, isBoolean, isString } from "../validation/validation"
import { client } from "./api"
import { getImageDataFromURL, type ImageData } from "./image"

export interface Art {
    title       : string,
    description : string,
    image       : ImageData,
    tags        : string[],
    isSpicy     : boolean
}


/**
 * 
 * @description Gets a validated array of artwork and related data from Sanity CMS
 * 
 */
export async function getArt() : Promise<Art[]> {
    const query = await getArtworkData()
    
    const artList = query
        .map( (art : any) : Art|null => {
            const image = getImageDataFromURL(art.imageURL)
            if (image === null || !image?.url) return null

            return { 
                image, 
                title       : isString(art.title)       ? art.title       : '',
                description : isString(art.description) ? art.description : '',
                tags        : isArray(art.tags)         ? art.tags        : '',
                isSpicy     : isBoolean(art.isSpicy)    ? art.isSpicy     : false
            }
        })
        .filter(art => art !== null) as Art[]

    return artList
}


/**
 * 
 * @description Gets the raw artwork data from Sanity CMS. 
 * The data is not validated
 * 
 */
async function getArtworkData() : Promise<object[]> {
    const data : object[] = await client.fetch(`
        *[ _type == 'artwork']  | order(_createdAt desc) {
            title,
            description,
            "imageURL" : image.asset->url,
            tags,
            isSpicy
        }
    `)
    return isArray(data) ? data : []
}

