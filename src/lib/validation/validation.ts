
/**
 * 
 * @description Determine if a value is a string
 * 
 */
export function isString(value: unknown) : value is string {
    return typeof value === 'string' || value instanceof String
}


/**
 * 
 * @description Determine if a value is an object
 * 
 */
export function isObject(value: unknown) : value is object {
    return typeof value === 'object' && !isArray(value) && value !== null
}


/**
 * 
 * @description Determine if a value is an object
 * 
 */
export function isArray(value: unknown) : value is Array<any> {
    return Array.isArray(value)
}


/**
 * 
 * @description Determine if a value is a boolean
 * 
 */
export function isBoolean(value: unknown) : value is boolean {
    return typeof value ===  'boolean'
}


/**
 * 
 * @description Determine if a value is a valid JSON
 * 
 */
export function isJson(str: any) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}