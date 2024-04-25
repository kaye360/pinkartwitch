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
  groups: [
    { name: 'post',        title: 'Post' },
    { name: 'tags',        title: 'Tags'},
    { name: 'socialLinks', title: 'Social Links' },
  ],
  fields: [

    defineField({ 
      type: "string", 
      name: "title", 
      title: 'Title',
      group : 'post',
      validation : rule => rule.required(),
    }),

    defineField({ 
      type: "image", 
      name: "image", 
      title: 'Image', 
      description : 'This should be in a webp format. No more than 1000 pixels in width or height',
      options : {
        hotspot : true 
      },
      group : 'post',
    }),

    defineField({ 
      type: "date", 
      name: "date", 
      title : 'Date', 
      options: { 
        dateFormat : 'MMM DD YYYY'
      },
      validation : rule => rule.required(),
      group : 'post',
    }),

		defineField({
			title: 'Post', name: 'post', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				},
				{ type: 'image' }
      ],
      group : 'post',
      validation : rule => rule.required(),
		}),

    defineField({
			name: 'commonTags',
			title: 'Commonly Used Tags',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: [{ type: 'commonTag' }],
				},
			],
      options : {
        layout : 'tags'
      },
      group : 'tags'
		}),

    defineField({ 
      type: "array", 
      of: [{type: 'string'}], 
      name: "tags", 
      title : 'Tags',
      group : 'tags'
    }),

    defineField({ 
      type: "url", 
      name: "instagramUrl", 
      title : 'Instagram Url',
      group : 'socialLinks'
    }),
    defineField({ 
      type: "url", 
      name: "deviantArtUrl", 
      title : 'Deviant Art Url',
      group : 'socialLinks'
    }),
    defineField({ 
      type: "url", 
      name: "tumblrUrl", 
      title : 'Tumblr Url',
      group : 'socialLinks'
    }),
    defineField({ 
      type: "url", 
      name: "threadsUrl", 
      title : 'Threads Url',
      group : 'socialLinks'
    }),
  ],
});

