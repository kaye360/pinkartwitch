import { client } from "./api"

export interface BlogPostTag {
	hyphen : string,
	space : string
}


interface GetTagData { 
	tags : string[], 
	commonTags : string[] 
}


/**
 * 
 * @description Gets an array of unique tags used in all blog posts
 * 
 */
export async function getTags() : Promise<BlogPostTag[]> {
	const tagSet: Set<string>  = new Set()
	const tagData = await getTagData()
	
	tagData.forEach( (post : {tags : string[], commonTags : string[]}) => {
		
		if( Array.isArray(post.tags) ) {
			post.tags.forEach( tag => tagSet.add( tag ))
		}

		if( Array.isArray(post.commonTags) ) {
			post.commonTags.forEach( tag => tagSet.add( tag )) 
		}
	} )
	
	return createPostTagList( Array.from( tagSet ).sort() )
}


/**
 * 
 * @description Gets a list of all tags and commonTags used in all blog posts
 * The data is not validated
 * 
 */
async function getTagData() : Promise<GetTagData[]> {
	const tagData = await client.fetch(`
		*[ _type == 'blogPost'] {
			tags,
			"commonTags" : commonTags[]->tag,
		}
	`)
	if(!tagData) return []
	return tagData
}


/**
 * 
 * @description Merges the tags and commonTags of a blog post into an array of unique tags
 * @param tags Array of tag strings
 * @param commonTags Array of commonTag strings
 * 
 */
export function mergeRawBlogPostTags(tags : unknown, commonTags : unknown) : BlogPostTag[]  {

    if( !Array.isArray(tags) && !Array.isArray(commonTags) ) {
        return []
    }

    if( Array.isArray(tags) && !Array.isArray(commonTags) ) {
        return createPostTagList( tags )
    }

    if( Array.isArray(commonTags) && !Array.isArray(tags) ) {
        return createPostTagList( commonTags )
    }

    const mergedUniqueTags = new Set([...tags as string[], ...commonTags as string[]])

    return createPostTagList( Array.from(mergedUniqueTags) )
}


/**
 * 
 * @description Get an array of tags with hyphenated and spaced versions of each tag
 * This is needed for tags with spaces in them that are in URLs
 * @param tagList 
 * 
 */
function createPostTagList(tagList: string[]) : BlogPostTag[] {
	return tagList.map( (tag: string) => (
		{
			hyphen : tag.replaceAll(' ', '-'),
			space  : tag
		}
	))
}
