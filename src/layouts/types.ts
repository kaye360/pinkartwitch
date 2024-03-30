import type { HTMLAttributes } from "astro/types";


export interface Layout extends HTMLAttributes<'html'> {
    title : string,
    description : string,
    lang : string,
    class? : string,

    /**
     * @extends <html>
     * 
     * @prop title : string
     * @prop description : string,
     * @prop lang : string
     */
    props? : true

}