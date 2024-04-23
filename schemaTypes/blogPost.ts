import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  type: "document",
  name: "blogPost",
  title: 'Blog Post',
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
      type: "image", 
      name: "image", 
      title: 'Image', 
      description : 'This should be in a webp format. No more than 1000 pixels in width or height',
      options : {
         hotspot : true 
        }  
    }),

		defineField({
			title: 'Post', name: 'post', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				},
				{ type: 'image' }]
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
        type: "url", 
        name: "instagramUrl", 
        title : 'Instagram Url'
      }),
      defineField({ 
        type: "url", 
        name: "deviantArtUrl", 
        title : 'Deviant Art Url'
      }),
      defineField({ 
        type: "url", 
        name: "tumblrUrl", 
        title : 'Tumblr Url'
      }),
      defineField({ 
        type: "url", 
        name: "threadsUrl", 
        title : 'Threads Url'
      }),
  ],
});

