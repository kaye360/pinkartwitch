# Astro Starter: Templates and Componenta

By Josh Kaye

## TODO
- 404 page
- services pages

## Working Demo
[View the Demo](https://joshs-astro-starter.netlify.app/)

## Features
- Reusable components and layouts
- Netlify Form Integration
- Decap CMS Integration
- Snipcart Integration
- Multilanguage support

## Checklist
Things to remember for each project

- Set site info variables in /src/congfig.ts
- Set css variables in /src/css/config.css
- Set production site url and base path in /astro.config.mjs
- If site is not top-level, remove robots.txt
- Favicon - /public/meta-img/favicon.svg
- OpenGraph Card - /public/meta-img/og.png
- Convert images to webp
- Set up form submission on Netlify
- If using Decap, install instructions: https://decapcms.org/docs/add-to-your-site/
- If using multilanguage, prefix all links with /lang/
- check Mozilla Observatory https://observatory.mozilla.org/

## How To's

### MultiLanguage

#### Config
- Set all languages in the LANGUAGES array
- Every page in the PAGES array needs ignoreLangPrefix to be set (boolean)

#### Pages
- Use the folder in /src/pages/[lang] to store all pages.
- Use /src/pages/[lang]/samplePage.astro for basic page template

#### Root Index
- Use /src/pages/[lang]/rootIndex.astro for root index (src/pages/index.astro) This is a simple resolve lang/redirect page

#### Layout
- In order to resolve the current lang in localStorage (whether set or not), at the lang/ResolveLang Component to each layout. For example, in <Layout>:
```
<BaseLayout>
    <slot />
    <ResolveLang>
</BaseLayout>
```

#### Selector
- Use <LangSelector /> to toggle current language
- <LangSelector /> is styled to fit into <ContactLinks /> by default

#### Links
- When using multi language, use <Link> instead of <a> to automatically prefix links with the current lang rest param.
- To Enable auto prefix, in <Link> set ignoreLangPrefix={false}
- To opt out of auto prefix, (#anchor, email, tel etc) add the ignorePrefix prop (boolean)
- For <NavLink>, set ignoreLangPrefix={false} to use lang pages


## Snipcart
- Add the <Snipcart /> component to add the snipcart sdk to any page you need.
- Default cart styling is included with <Snipcart />
- Basic components are in src/components/Snipcart 