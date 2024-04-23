import type { ImageMetaData } from "./api"


export function getImageListMetaData(imgURLList: string[]) : ImageMetaData[] {
    if( !Array.isArray(imgURLList) ) return []
    return imgURLList.map( (imgURL : string) => getImageMetaDataFromURL(imgURL) )
}


export function getImageMetaDataFromURL(url : string) : ImageMetaData {
    if( !(typeof url === 'string') ) return {url : '', width : 0, height : 0}

    const [width, height] = url.split('-')[1]
        .split('.')[0]
        .split('x')

    return { url, width : Number(width), height : Number(height) }
}


export function formatSocialMediaPostDate(date: string) : string {
    if( !(typeof date === 'string')) return ''
    return new Date(date).toLocaleDateString('en-CA', {
        // year : '2-digit',
        month : 'short',
        day : '2-digit'
    }).replace(',', '')
}

export function formatPostDate(date: string) : string {
    if( !(typeof date === 'string')) return ''
    return new Date(date).toLocaleDateString('en-CA', {
        // year : '2-digit',
        month : 'short',
        day : '2-digit'
    }).replace(',', '')
}

export function formatSlug(postData: any) : string {
    const slug = (postData.date + '-' + postData.title.trim().replaceAll(' ', '-')).toLowerCase()
    return slug
}