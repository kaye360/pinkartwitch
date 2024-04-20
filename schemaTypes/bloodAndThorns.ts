import { defineType, defineField } from 'sanity'

export const bloodAndThorns = defineType({
	type: "document",
	name: "bloodAndThorns",
	title: 'Blood And Thorns',
	preview: {
		prepare() { return { title: 'Blood And Thorns' } }
	},
	fields: [
		defineField({
			type: "image",
			name: "section1image",
			title: 'Section 1 Image'

		}),

		defineField({
			title: 'Section 1 Content', name: 'section1content', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				}
		]}),

		defineField({
			type: "image",
			name: "section2image",
			title: 'Section 2 Image'

		}),

		defineField({
			title: 'Section 2 Content', name: 'section2content', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				}
		]}),

	],
});

