
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
import { home } from './schemaTypes/home'
import { artwork } from './schemaTypes/artwork'
import { bio } from './schemaTypes/bio'
import { bloodAndThorns } from './schemaTypes/bloodAndThorns'
import { contact } from './schemaTypes/contact'
import { blogPost } from './schemaTypes/blogPost'
import { media } from 'sanity-plugin-media'
import { commonTag } from './schemaTypes/tag'
import { support } from './schemaTypes/support'
import { visionTool } from '@sanity/vision'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'

// These are one off pages, not content collections
// This is used to remove the Create buttons
// See link for more info:
// https://www.sanity.io/schemas/use-newdocumentoptions-to-configure-new-document-creation-2c640bf6
const pages = ['home', 'bio', 'support', 'bloodAndThorns', 'contact']

export default defineConfig({
	name: 'default',
	title: 'PinkArtWitch',
	projectId: 'v81020gt',
	dataset: 'production',
	basePath: '/admin',

	schema: {
		types: () => {
			return [home, bloodAndThorns, support, bio, contact, blogPost, artwork, commonTag]
		}
	},

	plugins: [structureTool({
		structure: (S, context) => {
			return S.list()
				.title('Content')
				.items([
					// The following line gets all schema:types, then filters out artwork as 
					// orderableDocumentListDeskItem is the new sortable artwork list
					...S.documentTypeListItems().filter(doc => doc.getId() !== 'artwork'),
					orderableDocumentListDeskItem({ type: 'artwork', title: 'Artwork', S, context }),
				])
		},
	}), scheduledPublishing(), media(), visionTool()],

	document: {
		newDocumentOptions: (prev, { creationContext }) => {
			const { type, schemaType } = creationContext

			// Remove single pages from global Create button
			if (type === 'global') {
				return prev.filter((template) => !pages.includes(template.templateId));

			// Remove  single pages' content create button
			} else if (pages.includes(schemaType as string)) {
				return [];
			}

			return prev;
		},
	},
})
