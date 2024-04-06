import type { Artwork, HomeContent, SocialMediaPost } from "./contentTypes"
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

