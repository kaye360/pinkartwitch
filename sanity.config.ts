
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import { scheduledPublishing } from '@sanity/scheduled-publishing'
import { home } from './schemaTypes/home'
import { artwork } from './schemaTypes/artwork'
import { bio } from './schemaTypes/bio'
import { bloodAndThorns } from './schemaTypes/bloodAndThorns'
import { contact } from './schemaTypes/contact'
import { blogPost } from './schemaTypes/blogPost'
import { media } from 'sanity-plugin-media'

// These are one off pages, not content lists
// This is used to remove the Create buttons
// See link for more info:
// https://www.sanity.io/schemas/use-newdocumentoptions-to-configure-new-document-creation-2c640bf6
const pages = ['home', 'bio', 'bloodAndThorns', 'contact']

export default defineConfig({
  name: 'default',
  title: 'PinkArtWitch',

  projectId: 'v81020gt',
  dataset: 'production',

  plugins: [structureTool(), scheduledPublishing(), media()],

  basePath: '/admin',

  schema: {
    types: [home, blogPost, artwork, bloodAndThorns, bio, contact],
  },

  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type, schemaType } = creationContext

      // Remove single pages from global Create button
      if (type === 'global') { 
        return prev.filter((template) => !pages.includes(template.templateId));

      // Remove single pages' content create button
      } else if (pages.includes(schemaType as string)) {
        return [];
      }

      return prev;
    },
  },
})
