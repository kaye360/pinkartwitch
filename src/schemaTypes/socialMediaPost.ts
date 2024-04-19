import { defineType, defineField } from 'sanity'

export const socialMediaPost = defineType({
  type: "document",
  name: "socialMediaPost",
  title: 'Social Media Post',
  preview : {
    select : {
      title: 'title',
      media: 'image'
    }
  },
  fields: [
    defineField({ 
      type: "string", 
      name: "title", 
      title: 'Title' 
    }),

    defineField({ 
      type: "text", 
      name: "description", 
      title: 'Description', 
      rows : 4 ,
      validation : rule => rule.required()
    }),

    defineField({ 
      type: "array", 
      of: [{type: 'string'}], 
      name: "tags", 
      title : 'Tags'
    }),

    defineField({ 
      type: "date", 
      name: "date", 
      title : 'Date', 
      options: { 
        dateFormat : 'MMM DD YYYY'
      },
      validation : rule => rule.required()
    }),
    
    defineField({ 
      type: "image", 
      name: "image", 
      title: 'Image', 
      description : 'This should be in a webp format. No more than 1000 pixels in width or height',
      options : {
         hotspot : true 
        }  
      }),
  ],
});

