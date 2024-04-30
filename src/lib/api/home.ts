import type { Block } from "astro-portabletext/types"
import { client } from "./api"
import { getImageListData } from "./image"
import { isString } from "../validation/validation"
import { type ImageData } from "./image"

interface HomeContent {
    hero:  {
        headline    : string,
        subHeadline : string,
        featuredArt : ImageData[] | null
    },
    intro               : Block[] | null,
	bloodAndThornsIntro : Block[] | null
}


interface HomeData {
    heroHeadline        : string|null
    heroSubHeadline     : string|null
    featuredArtURLs     : (string|null)[]
    intro               : Block[]
    bloodAndThornsIntro : Block[]
}


/**
 * 
 * @returns Gets validated homepage content
 * 
 */
export async function getHomeContent() : Promise<HomeContent> {
    const data = await getHomeData()
    const content: HomeContent = {
        hero : {
            headline    : isString(data.heroHeadline) ? data.heroHeadline : '',
            subHeadline : isString(data.heroSubHeadline) ? data.heroSubHeadline : '',
            featuredArt : data.featuredArtURLs
                            .filter( url => url !== null)
                            .every( url => isString(url)) 
                        ? getImageListData(data.featuredArtURLs as string[]) 
                        : null
        },
        intro               : data.intro,
        bloodAndThornsIntro : data.bloodAndThornsIntro
    }
    return content
}


/**
 * 
 * @description Gets Homepage raw data from Sanity 
 * The data is not validated
 * 
 */
async function getHomeData() : Promise<HomeData> {
    const [data] = await client.fetch(`
        *[ _type == 'home']{
            heroHeadline, 
            heroSubHeadline,
            "featuredArtURLs" : featuredArt[].asset->url,
            intro,
            bloodAndThornsIntro
        }
    `)
    return data
}
	