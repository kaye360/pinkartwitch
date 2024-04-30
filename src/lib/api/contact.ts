import type { Block } from "astro-portabletext/types";
import { client } from "./api";

interface GetContact {
    intro : Block[]
}


/**
 * 
 * @description Gets the validated Contact content from Sanity CMS
 * 
 */
export async function getContact() : Promise<GetContact> {

    const [data] = await client.fetch(`
        *[ _type == 'contact' ] {
            intro
        }
    `)
    return Array.isArray(data.intro) ? {intro: data.intro } : {intro: []}
}