import type { Block } from "astro-portabletext/types"
import { client } from "./api"
import { getImageDataFromURL, type ImageData } from "./image"
import { isString } from "../validation/validation"

export interface BloodAndThorns {
    section1image   : ImageData | null,
    section1content : Block[],
    section2image   : ImageData | null,
    section2content : Block[]
}

/**
 * 
 * @description Get validated Blood and Thorns page content
 * 
 */
export async function getBloodAndThorns() : Promise<BloodAndThorns> {
	const query = await getBloodAndThornsData()
	return {
		section1content : query.section1content,
		section2content : query.section2content,
		section1image   : 'section1imageURL' in query && isString(query.section1imageURL) ?  getImageDataFromURL(query.section1imageURL) : null,
		section2image   : 'section2imageURL' in query && isString(query.section2imageURL) ?  getImageDataFromURL(query.section2imageURL) : null,
	}
}


/**
 * 
 * @description Get raw Blood and Thorns page data from Sanity CMS
 * Data is not validated
 * 
 */
async function getBloodAndThornsData() {
	const [data] = await client.fetch(`
		*[ _type == 'bloodAndThorns' ] {
			"section1imageURL" : section1image.asset->url,
			section1content,
			"section2imageURL" : section2image.asset->url,
			section2content
		}
	`)
	return data
}

