import { client } from "./api"

export interface BlogPostDate {
    numeric : string,
    longNumeric : string,
    phrase  : string,
    longPhrase : string
}

export interface BlogArchiveDate extends Omit<BlogPostDate, "longNumeric" | "longPhrase"> {}

async function getDateData() : Promise<{date : string}[]> {
    const dateData = await client.fetch(`
        *[ _type == 'blogPost' ] {
                date,
        }
    `)
    return dateData
}

function validateDateData() {

}

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

function dateToPhrase(dateNumeric : string, isDayIncluded : boolean = false) {
    const dateArr = dateNumeric.split('-')
    const year = Number(dateArr[0])
    const month = Number(dateArr[1]) - 1
    const date = new Date(year, month)
    const datePhrase = date.toLocaleDateString('en-EN', {
        year : 'numeric',
        month : 'short',
        day : isDayIncluded ? '2-digit' : undefined
    })
    return datePhrase
}

export function formatPostDate(date: string) : BlogPostDate {
    return { 
        phrase : dateToPhrase(date), 
        longPhrase : dateToPhrase(date, true),
        numeric : date.slice(0,7),
        longNumeric : date
    }
}

