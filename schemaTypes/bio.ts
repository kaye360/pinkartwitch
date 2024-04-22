import { defineType, defineField } from 'sanity'

export const bio = defineType({
	type: "document",
	name: "bio",
	title: 'Bio',
	preview: {
		prepare() { return { title: 'Bio' } }
	},
	fields: [
		defineField({
			type: "image",
			name: "bioImage",
			title: 'Bio Image'

		}),

		defineField({
			title: 'Section 1 Content', name: 'section1content', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				},
				{ type : 'image'}
		]}),

		defineField({
			title: 'Section 2 Content', name: 'section2content', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				},
				{ type : 'image'}
		]}),

	],
});

