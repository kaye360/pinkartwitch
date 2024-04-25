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
			title: 'Support Intro', name: 'supportIntro', type: 'array', of: [
				{ type: 'block' },
				{ type : 'image'}
		]}),
	],
});

