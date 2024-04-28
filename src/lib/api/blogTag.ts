import { client } from "./api"

export interface BlogPostTag {
	hyphen : string,
	space : string
}

interface GetTagData { 
	tags : string[], 
	commonTags : string[] 
}


export async function getTagData() : Promise<GetTagData[]> {
	const tagData = await client.fetch(`
		*[ _type == 'blogPost'] {
			tags,
			"commonTags" : commonTags[]->tag,
		}
	`)
	if(!tagData) return []
	return tagData
}


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


export function createPostTagList(tagList: string[]) : BlogPostTag[] {
	return tagList.map( (tag: string) => (
		{
			hyphen : tag.replaceAll(' ', '-'),
			space  : tag.replaceAll('-', ' ')
		}
	))
}

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