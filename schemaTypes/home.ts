import { defineType, defineField } from 'sanity'

export const home = defineType({
	type: "document",
	name: "home",
	title: 'Home Page',
	preview: {
		prepare() { return { title: 'Home Page' } }
	},
	fields: [
		defineField({
			type: "text",
			name: "heroHeadline",
			title: 'Hero Headline',
			rows: 3
		}),
		defineField({
			type: "text",
			name: "heroSubHeadline",
			title: 'Hero SubHeadline',
			rows: 3
		}),

		defineField({
			title: 'Featured Art', name: 'featuredArt', type: 'array', of: [
				{ type: 'image' }
			],
			options: {
				sortable: true,
			},
			validation: rule => rule.required().length(5)
		}),

		defineField({
			title: 'Intro', name: 'intro', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				},
				{ type: 'image' }]
		}),
		
		defineField({
			title: 'Blood And Thorns Intro', name: 'bloodAndThornsIntro', type: 'array', of: [
				{
					type: 'block', styles: [
						{ title: 'Normal', value: 'normal' },
						{ title: 'Heading', value: 'h2' },
					]
				},
			]
		}),
	],
});

