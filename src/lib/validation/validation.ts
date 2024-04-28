

export function isString(value: unknown) : value is string {
    return typeof value === 'string' || value instanceof String
}


export function isObject(value: unknown) : value is object {
    return typeof value === 'object' && !Array.isArray(value) && value !== null
}