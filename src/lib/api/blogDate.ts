import { client } from "./api"

export interface BlogPostDate {
    numeric : string,
    longNumeric : string,
    phrase  : string,
    longPhrase : string
}

export interface BlogArchiveDate extends Omit<BlogPostDate, "longNumeric" | "longPhrase"> {}


/**
 * 
 * @description Gets an array of unique dates of blog posts for blog post archives
 * This function only returns month and year, no days.
 * 
 */
export async function getDates() {
    const dateSet = new Set()
    const dateData = await getDateData()
    dateData.forEach( (date : {date : string} ) => {
        dateSet.add( date.date.slice(0,7) )
    } )
    const dateDataUniqueOrdered = Array.from( dateSet ).sort().reverse() as string[]
    
    const blogPostDates : BlogArchiveDate[] = dateDataUniqueOrdered.map( date => ({
        numeric : date,
        phrase : dateToPhrase(date)
    }))
    return blogPostDates
}


/**
 * 
 * @description Gets all dates from all blog post entries
 * Data is not validated
 * 
 */
async function getDateData() : Promise<{date : string}[]> {
    const dateData = await client.fetch(`
        *[ _type == 'blogPost' ] {
                date,
        }
    `)
    return dateData
}


/**
 *  
 * @description Converts a numeric date string to a phrase
 * @example 2020-04 -> Apr 2020
 * @example 2020-04-31 -> Apr 31, 2020
 * @param dateNumeric  Date string YYYY-MM-DD (Day is optional)
 * @param isDayReturned Is day need in the returned object 
 * 
 */
function dateToPhrase(dateNumeric : string, isDayReturned : boolean = false) {
    const dateArr = dateNumeric.split('-')
    // console.log(dateArr)
    const year = Number(dateArr[0])
    const month = Number(dateArr[1]) - 1
    const day = dateArr[2] ? Number(dateArr[2]) : null
    const date =  day ? new Date(year, month, day) : new Date(year, month)
    const datePhrase = date.toLocaleDateString('en-EN', {
        year : 'numeric',
        month : 'short',
        day : isDayReturned ? '2-digit' : undefined
    })
    return datePhrase
}


/**
 * 
 * @description Takes a date string  and returns short and long versions of both
 *  numeric and phrase dates
 * @param date date string: YYYY-MM-DD
 * 
 */
export function formatPostDate(date: string) : BlogPostDate {
    return { 
        phrase : dateToPhrase(date), 
        longPhrase : dateToPhrase(date, true),
        numeric : date.slice(0,7),
        longNumeric : date
    }
}

