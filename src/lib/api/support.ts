import type { Block } from "astro-portabletext/types";
import { client } from "./api";

interface GetSupport {
    intro : Block[]
}

export async function getSupport() : Promise<GetSupport> {

    const [data]  = await client.fetch(`
        *[ _type == 'support' ] {
            intro
        }
    `)
    return Array.isArray(data.intro) ? {intro: data.intro } : {intro: []}
}