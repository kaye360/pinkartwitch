import { client } from "./api"
import { getImageDataFromURL, type ImageData } from "./image"
import { formatPostDate, type BlogPostDate } from "./blogDate"
import { mergeRawBlogPostTags, type BlogPostTag } from "./blogTag"
import { isObject, isString } from "../validation/validation"
import type { Block } from "astro-portabletext/types"

export interface BlogPost {
    title : string,
    date  : BlogPostDate, 
    tags  : BlogPostTag[],
    post  : (Block|null)[] | null,
    slug  : string,
    image? : ImageData | null,
    instagramUrl?  : string | null,
    deviantArtUrl? : string | null,
    tumblrUrl?     : string | null,
    threadsUrl?    : string | null,
}

interface BlogPostQuery {
    title         : string,
    imageURL      : string,
    post          : (Block|null)[] | null,
    tags          : string[],
    commonTags    : string[],
    date          : string,
    instagramUrl  : string | null,
    deviantArtUrl : string | null,
    tumblrUrl     : string | null,
    threadsUrl    : string | null,
}


interface GetBlogPostListOptions {
    amount? : number,
}

export async function getBlogPostList( {amount} : GetBlogPostListOptions ) : Promise<BlogPost[]> {
    const query = await queryBlogPosts()
    const validatedBlogPostList = validateBlogPostQuery(query)
    if( validatedBlogPostList === null || !Array.isArray(validatedBlogPostList) ) return []
    return amount === null ? validatedBlogPostList : validatedBlogPostList.slice(0,amount)
}

async function queryBlogPosts() : Promise<BlogPostQuery[] | null> {
    const query = await client.fetch(`
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
    return query
}

function validateBlogPostQuery(query : BlogPostQuery[] | null) : BlogPost[] {

    if( !query ) return []

    const validatedBlogPostList = query
        .map( (query: BlogPostQuery) => {

            if( !isObject(query) ) return null

            const title         = validateBlogPostString({obj : query, prop : query.title, defaultValue : '' }) as string
            const date          = isValidBlogPostString(query, query.date)  ? formatPostDate(query.date) : { phrase : '', longPhrase : '', numeric : '', longNumeric : '' }
            const tags          = 'tags'  in query && 'commonTags' in query ? mergeRawBlogPostTags(query.tags, query.commonTags) : []
            const post          = 'post' in query ? query.post : []
            const slug          = validateSlug({title, date : date.longNumeric })
            const image         = isValidBlogPostString(query, query.imageURL) ? getImageDataFromURL(query.imageURL) : null
            const instagramUrl  = validateBlogPostString({obj : query, prop : query.instagramUrl,  defaultValue : null })
            const deviantArtUrl = validateBlogPostString({obj : query, prop : query.deviantArtUrl, defaultValue : null })
            const threadsUrl    = validateBlogPostString({obj : query, prop : query.threadsUrl,    defaultValue : null })
            const tumblrUrl     = validateBlogPostString({obj : query, prop : query.tumblrUrl,     defaultValue : null })

            return { title, date, tags, post, slug, image, instagramUrl, deviantArtUrl, threadsUrl, tumblrUrl }
        })
        .filter( post => post !== null) as BlogPost[]

    return validatedBlogPostList
}

interface ValidateBlogPostString {
    obj : object,
    prop : string|number|null,
    defaultValue : string|number|null
}


function validateBlogPostString( {obj, prop, defaultValue } : ValidateBlogPostString ) : string|number|null {
    return isValidBlogPostString(obj, prop) ? prop : defaultValue
}

function isValidBlogPostString(obj : object, prop :string|number|null  ) : prop is string {
    const key = Object.entries(obj)
        .filter( post => post.includes(prop) )
        .flat()[0] as string
    return isObject(obj) && key in obj && isString(prop)
}

function validateSlug({title, date} : {[key:string]: string}) : string {
    const slug = (date + '-' + title.trim().replaceAll(' ', '-')).toLowerCase()
    return slug
}
