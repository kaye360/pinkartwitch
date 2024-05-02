/**
 * 
 * Site Configuration
 * 
 */


/**
 * Site Info
 */

export const SITE_URL               = 'http://'
export const SITE_BASE_PATH         = '/'
export const SITE_FULL_NAME         = '@PinkArtWitch'
export const SITE_SHORT_NAME        = '@PinkArtWitch'
export const LOGO_NAME              = SITE_SHORT_NAME
export const EMAIL_ADDRESS          = 'email@email.com'
export const HEADER_LOGO_PATH       = '/img/logo.webp'
export const HEADER_LOGO_DIMENSIONS = { width : 48, height : 48 }
export const HERO_IMG_PATH          = '/img/hero.webp'
export const HERO_IMG_ALT_TEXT      = 'Hero image alt text'
export const HERO_IMG_DIMENSIONS    = { width : 200, height : 100 }
export const FAVICON_PATH           = '/meta-img/favicon.svg'
export const OPENGRAPH_PATH         = '/meta-img/og.webp'



/**
 * Site Pages
 */

export type PageGroup = 'header' | 'footer'

export interface Page {
    title     : string,
    path      : string,
    group     : PageGroup[],
    dropdown? : PageGroup
}

export const PAGES : Page[] = [
    { title : 'Home',               path  : '/',                    group : ['header', 'footer']    },
    { title : 'Art',                path  : '/art',                 group : ['header', 'footer'],   },
    { title : 'Blood And Thorns',   path  : '/blood-and-thorns',    group : ['header', 'footer'],   },
    { title : 'Support',            path  : '/support',             group : ['header', 'footer'],   },
    { title : 'Bio',                path  : '/bio',                 group : ['header', 'footer'],   },
    { title : 'Blog',               path  : '/blog/1',              group : ['header', 'footer'],   },
    { title : 'Contact',            path  : '/contact',             group : ['header', 'footer'],   },
]

export const SOCIAL_LINKS = {
    instagram  : 'https://www.instagram.com/pinkartwitch',
    deviantArt : 'https://www.deviantart.com/pinkartwitch',
    tumblr     : 'https://pinkartwitch.tumblr.com',
    threads    : 'https://www.threads.net/@pinkartwitch',
    kofi       : 'https://ko-fi.com/pinkartwitch'
}

