

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
    image : ImageMetaData,
    tags : string | string[]
}

export interface BloodAndThorns {
    section1image : ImageMetaData,
    section1content : any[],
    section2image : ImageMetaData,
    section2content : any[]
}

export interface Bio {
    bioImage : ImageMetaData,
    section1content : any[],
    section2content : any[]
}

export interface Contact {
    intro : any[]
}