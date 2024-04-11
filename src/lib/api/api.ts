import { createClient } from "@sanity/client"
import type { HomeContent } from "./contentTypes"
import { formatArtWork, formatBio, formatBloodAndThorns, formatHomeContent, formatSocialMediaPosts } from "./services"

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


export async function getBloodAndThorns() {
    const [data] = await client.fetch(`
        *[ _type == 'bloodAndThorns' ] {
            "section1imageURL" : section1image.asset->url,
            section1content,
            "section2imageURL" : section2image.asset->url,
            section2content
        }
    `)
    return formatBloodAndThorns(data)
}


export async function getBio() {
    const [data] = await client.fetch(`
        *[ _type == 'bio' ] {
            "bioImageURL" : bioImage.asset->url,
            section1content,
            section2content
        }
    `)
    return formatBio(data)
}