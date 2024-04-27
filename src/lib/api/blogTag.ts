import { client } from "./api"

export interface Tags {
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


export function mergePostTags(postData: any) : Tags[]  {

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


export function createPostTagList(tagList: string[]) : Tags[] {
	return tagList.map( (tag: string) => (
		{
			hyphen : tag.replaceAll(' ', '-'),
			space  : tag.replaceAll('-', ' ')
		}
	))
}

export async function getTags() : Promise<Tags[]> {
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