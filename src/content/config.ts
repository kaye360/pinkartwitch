import { z, defineCollection } from 'astro:content';

const productCollection = defineCollection({
    type : 'content',
    schema : z.object({
        title       : z.string(),
        description : z.string(),
        image       : z.string(),
        price       : z.string()
    })
})

const pageCollection = defineCollection({})

export const collections = {
    'products' : productCollection,
    'pages' : pageCollection
}