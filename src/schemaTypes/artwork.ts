import { defineType, defineField } from 'sanity'

export const artwork = defineType({
	type: "document",
	name: "artwork",
	fields: [
		defineField({ 
			type: "string", 
			name: "title" 
		}),
		
		defineField({ 
			type: "image", 
			name: "image", 
			description : 'Image should be in webp format and should not be larger than 1000px in width or height',
			options: { hotspot: true } }),
			
		defineField({ 
			type: "text", 
			name: "description" 
		}),

		defineField({ 
			type: "array", 
			of: [{type: 'string'}], 
			name: "tags", 
			title : 'Tags'
		  }),
		
	],
});

