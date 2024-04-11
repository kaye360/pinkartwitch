import type { Artwork, Bio, BloodAndThorns, HomeContent, SocialMediaPost } from "./contentTypes"
import { formatSocialMediaPostDate, getImageListMetaData, getImageMetaDataFromURL } from "./utils"


export function formatHomeContent(data: any) : HomeContent {

    const homeContent: HomeContent = {
        hero : {
            headline : data.heroHeadline,
            subHeadline : data.heroSubHeadline,
            featuredArt : getImageListMetaData(data.featuredArtURLs)
        },
        intro : data.intro,
    }
    return homeContent 
}


export function formatSocialMediaPosts(data: any) : SocialMediaPost[] {

    const socialMediaPostList: SocialMediaPost[] = data.map( (postData: any) => {
        postData.date = formatSocialMediaPostDate(postData.date)
        const metaData = getImageMetaDataFromURL(postData.imageURL)
        return { image: metaData, ...postData}
    })

    return socialMediaPostList
}


export function formatArtWork(data: any) : Artwork[] {

    const artWorkList : Artwork[] = data.map( (art : any) => {
        const image = getImageMetaDataFromURL(art.imageURL)
        return { image, ...art }
    }  )

    return artWorkList
}


export function formatBloodAndThorns(data: any) : BloodAndThorns {
    const section1image = getImageMetaDataFromURL(data.section1imageURL)
    const section2image = getImageMetaDataFromURL(data.section2imageURL)
    return {...data, section1image, section2image}
}


export function formatBio(data: any) : Bio {
    const bioImage = getImageMetaDataFromURL(data.bioImageURL)
    return {...data, bioImage}
}
