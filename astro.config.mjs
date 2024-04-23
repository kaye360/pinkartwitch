import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import sanity from "@sanity/astro";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sanity({
    projectId: "v81020gt", 
    dataset: "production", 
    apiVersion: "2024-03-11",
    useCdn: false, 
    studioBasePath : '/admin'
 }), react()],
  // Set base URL
  site: 'https://pinkartwitch.com',
  // Set path for site
  base: '/',
  build: {
    inlineStylesheets: 'never'
  },
  // This causes a failed build with a getStaticPaths() error in production
  redirects : import.meta.env.DEV 
    ? { '/admin/[...page]' : '/admin'} 
    : {}
});