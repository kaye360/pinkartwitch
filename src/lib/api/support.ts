import type { Block } from "astro-portabletext/types";
import { client } from "./api";
import { isArray } from "../validation/validation";

interface GetSupport {
    intro : Block[]
}


/**
 * 
 * @description Gets the validated Support page content
 * 
 */
export async function getSupport() : Promise<GetSupport> {

    const [data]  = await client.fetch(`
        *[ _type == 'support' ] {
            intro
        }
    `)
    return isArray(data.intro) ? {intro: data.intro } : {intro: []}
}