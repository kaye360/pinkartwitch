

export interface HomeContent {
    hero:  {
        headline: string,
        subHeadline: string,
        featuredArt : ImageMetaData[]
    },
    intro: any[]
}


export interface ImageMetaData {
    url: string, 
    width : number,
    height : number
}


export interface SocialMediaPost {
    description : string,
    tags : string[],
    date : string,
    image : ImageMetaData
}


export interface Artwork {
    title : string,
    description : string,
    image : ImageMetaData
}