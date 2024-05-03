import { toHTML } from "@portabletext/to-html"
import type { Block } from "astro-portabletext/types"

/**
 * 
 * @description Converts portable text to a plain text string
 * @see https://www.sanity.io/docs/presenting-block-text#ac67a867dd69
 * 
 */
export function portableTextToPlainText(blocks: Block[] = []) : string {
    return blocks
        .map(block => {
            if (block._type !== 'block' || !block.children) {
                return ''
            }
            return block.children.map(child => child.text).join('')
        })
        .join('\n\n')
}


/**
 * 
 * @description Converts portable text to HTML
 * 
 */
export function portableTextToHTML( blocks: Block[] = []) : string {
    return toHTML(blocks)
}