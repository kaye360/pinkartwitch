import type { PostProps } from "../../components/Blog/Post.astro"
import { createPostTagList, type PostTag } from "../../components/Blog/TagCloud.astro"
import { getImageMetaDataFromURL } from "./utils"

export function formatPost(postData: any) : PostProps[] {
    const slug           = formatSlug(postData)
    const formattedDate  = formatPostDate(postData.date)
    const formattedTitle = postData.title.trim()
    const metaData       = getImageMetaDataFromURL(postData.imageURL)
    const mergedTags     = mergePostTags(postData)
    return { image: metaData, slug, ...postData, date : formattedDate, title : formattedTitle, tags: mergedTags}
}

export function formatPostDate(date: string) : string {
    if( !(typeof date === 'string')) return ''
    return new Date(date).toLocaleDateString('en-CA', {
        year : 'numeric',
        month : 'short',
        day : '2-digit'
    }).replace(',', '')
}

export function formatSlug(postData: any) : string {
    const slug = (postData.date + '-' + postData.title.trim().replaceAll(' ', '-')).toLowerCase()
    return slug
}

export function mergePostTags(postData: any) : PostTag[]  {

    if( !Array.isArray(postData.tags) && !Array.isArray(postData.commonTags) ) {
        return []
    }

    if( Array.isArray(postData.tags) && !Array.isArray(postData.commonTags) ) {
        return createPostTagList( postData.tags )
    }

    if( Array.isArray(postData.commonTags) && !Array.isArray(postData.tags) ) {
        return createPostTagList( postData.commonTags )
    }

    const mergedUniqueTags = new Set([...postData.tags, ...postData.commonTags])

    return createPostTagList( Array.from(mergedUniqueTags) )
}