import { defineType, defineField } from 'sanity'

export const contact = defineType({
	type: "document",
	name: "contact",
	title: 'Contact',
	preview: {
		prepare() { return { title: 'Contact' } }
	},
	fields: [
		defineField({
			title: 'Intro', name: 'intro', type: 'array', of: [
				{ type: 'block' }
		]}),
	],
});

