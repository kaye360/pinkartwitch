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
			type: "array", 
			of : [{
				type: 'block', styles: [
					{ title: 'Normal', value: 'normal' },
					{ title: 'Heading', value: 'h2' },
				]
			}],
			name: "description",
			title: 'Description'
		}),

		defineField({ 
			type: "array", 
			of: [{type: 'string'}], 
			name: "tags", 
			title : 'Tags'
		  }),
		
		defineField({
			type  : 'boolean',
			name  : 'isSpicy',
			title : 'Spicy Content'
		})
	],
});

