import { defineType, defineField } from 'sanity'

export const support = defineType({
	type: "document",
	name: "support",
	title: 'Support',
	preview: {
		prepare() { return { title: 'Support' } }
	},
	fields: [
		defineField({
			title: 'Intro', name: 'intro', type: 'array', of: [
				{ type: 'block' },
				{ type : 'image'}
		]}),
	],
});

