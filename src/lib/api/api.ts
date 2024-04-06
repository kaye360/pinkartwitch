import { createClient } from "@sanity/client"
import type { HomeContent } from "./contentTypes"
import { formatArtWork, formatHomeContent, formatSocialMediaPosts } from "./services"

export const client = createClient({
   projectId: "v81020gt", 
   dataset: "production", 
   apiVersion: "2024-03-11",
   useCdn: true, 
})


export async function getHomeContent() : Promise<HomeContent> {
    const [data] = await client.fetch(`
        *[ _type == 'home']{
            heroHeadline, 
            heroSubHeadline,
            "featuredArtURLs" : featuredArt[].asset->url,
            intro
        }
    `)
    return formatHomeContent(data)
} 


export async function getSocialMediaPosts() {
    const data = await client.fetch(`
        *[ _type == 'socialMediaPost'] | order(date desc)[0..4] {
            description,
            tags,
            date,
            "imageURL" : image.asset->url
        }
    `)
    return formatSocialMediaPosts(data)
}


export async function getArtWork() {
    const data = await client.fetch(`
        *[ _type == 'artwork'] {
            title,
            description,
            "imageURL" : image.asset->url
        }
    `)
    return formatArtWork(data)
}