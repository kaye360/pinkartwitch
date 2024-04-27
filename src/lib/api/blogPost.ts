import { client } from "./api"
import { formatPostDate, type BlogPostDate } from "./blogDate"
import { mergePostTags, type Tags } from "./blogTag"
import { getImageMetaDataFromURL } from "./utils"

export interface BlogPost {
    title : string,
    date : BlogPostDate, 
    tags: Tags[],
    commonTags : any,
    post : string,
    slug : string,
    image : {
        url : string,
        width : number,
        height : number
    },
    instagramUrl : string,
    deviantArtUrl : string,
    tumblrUrl : string,
    threadsUrl : string,
}

interface GetBlogPostListOptions {
    amount? : number,
}

const blogPostData = await client.fetch(`
	*[ _type == 'blogPost'] | order(date desc) {
        title,
		"imageURL" : image.asset->url,
		post,
		tags,
        "commonTags" : commonTags[]->tag,
		date,
        instagramUrl,
        deviantArtUrl,
        tumblrUrl,
        threadsUrl,
	}
`)

export async function getBlogPostList( {amount} : GetBlogPostListOptions ) : Promise<BlogPost[]> {
    const blogPostList: BlogPost[] = blogPostData.map( (postData: any) => (
        formatPost(postData)
    ))	
    return amount === null ? blogPostList : blogPostList.slice(0,amount)
}


export function formatPost(postData: any) : BlogPost[] {
    const slug           = formatSlug(postData)
    const formattedDate  = formatPostDate(postData.date)
    const formattedTitle = postData.title.trim()
    const metaData       = getImageMetaDataFromURL(postData.imageURL)
    const mergedTags     = mergePostTags(postData)
    return { image: metaData, slug, ...postData, date : formattedDate, title : formattedTitle, tags: mergedTags}
}

export function formatSlug(postData: any) : string {
    const slug = (postData.date + '-' + postData.title.trim().replaceAll(' ', '-')).toLowerCase()
    return slug
}
