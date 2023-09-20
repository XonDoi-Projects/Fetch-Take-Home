export interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string //would prefer this to be camelCased
    breed: string
}
export interface Location {
    zip_code: string //would prefer this to be camelCased
    latitude: number
    longitude: number
    city: string
    state: string
    county: string
}
export interface Coordinates {
    lat: number
    lon: number
}

export interface SearchQueryParams {
    breeds: string[]
    zipCodes: string[]
    ageMin: string
    ageMax: string
}
