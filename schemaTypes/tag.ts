import { defineField, defineType } from "sanity";

export const commonTag = defineType({
    type: "document",
    name: "commonTag",
    title: 'Commonly Used Blog Tags',
    description : 'Tags that are commonly used in Blog Posts',
    preview : {
      select : {
        title: 'tag',
      }
    },
    fields: [
      defineField({ 
        type: "string", 
        name: "tag", 
        title: 'Tag' 
      })
    ]
})