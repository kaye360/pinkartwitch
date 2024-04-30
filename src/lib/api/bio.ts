import type { Block } from "astro-portabletext/types"
import { isString } from "../validation/validation"
import { client } from "./api"
import { getImageDataFromURL, type ImageData } from "./image"

export interface Bio {
    bioImage : ImageData | null,
    section1content : Block[],
    section2content : Block[]
}


/**
 * 
 * @description Gets the validated Bio content from Sanity CMS
 * 
 */
export async function getBio() : Promise<Bio> {
    const query = await getBioData()
    return {
        bioImage        : 'bioImageURL' in query     && isString(query.bioImageURL)          ? getImageDataFromURL(query.bioImageURL) : null,
        section1content : 'section1content' in query && Array.isArray(query.section1content) ? query.section1content                  : [],
        section2content : 'section2content' in query && Array.isArray(query.section2content) ? query.section2content                  : [],
    }
}


/**
 * 
 * @description Gets the raw Bio data from Sanity CMS. 
 * The data is not validated
 * 
 */
async function getBioData() : Promise<object[]> {
    const [data] = await client.fetch(`
        *[ _type == 'bio' ] {
            "bioImageURL" : bioImage.asset->url,
            section1content,
            section2content
        }
    `)
    return 'bioImageURL' in data && 'section1content' in data && 'section2content' in data  ? data : []
}
