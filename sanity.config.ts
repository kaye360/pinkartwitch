import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
// import {visionTool} from '@sanity/vision'
import { home } from './src/schemaTypes/home'
import { socialMediaPost } from './src/schemaTypes/socialMediaPost'
import { bloodAndThorns } from './src/schemaTypes/bloodAndThorns'
import { bio } from './src/schemaTypes/bio'
import { contact } from './src/schemaTypes/contact'
import { artwork } from './src/schemaTypes/artwork'
import { scheduledPublishing } from '@sanity/scheduled-publishing'

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

  plugins: [structureTool(), scheduledPublishing()],

  schema: {
    types: [home, socialMediaPost, artwork, bloodAndThorns, bio, contact],
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
