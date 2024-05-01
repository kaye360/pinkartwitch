import type { Block } from "astro-portabletext/types";
import { client } from "./api";
import { isArray } from "../validation/validation";

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
    return isArray(data.intro) ? {intro: data.intro } : {intro: []}
}