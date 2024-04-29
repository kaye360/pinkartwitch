import { isString } from "../validation/validation"
import { client } from "./api"
import { getImageDataFromURL, type ImageData } from "./image"

export interface Art {
    title : string,
    description : string,
    image : ImageData,
    tags : string[]
}

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
                tags        : Array.isArray(art.tags)   ? art.tags        : ''
            }
        })
        .filter(art => art !== null) as Art[]

    return artList
}

async function getArtworkData() : Promise<object[]> {
    const data : object[] = await client.fetch(`
        *[ _type == 'artwork']  | order(_createdAt desc) {
            title,
            description,
            "imageURL" : image.asset->url,
            tags
        }
    `)
    return Array.isArray(data) ? data : []
}

