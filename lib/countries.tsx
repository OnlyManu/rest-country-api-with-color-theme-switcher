import { ObjectFlags } from "typescript"

export interface Icountry {
    name: string,
    nameNative: object,
    population: string,
    region: string,
    subRegion: string,
    capital: string[],
    flags: string,
    currencies: Array<object>,
    languages: Array<object>,
    tld: Array<string>,
    borders: string[]
}
interface Iresponse {
    status: "sucess" | "error",
    data?: Array<Icountry> | Icountry,
    message?: string
}

export type CountriesType = undefined | Array<Icountry>
export type RegionType = "" | "africa" | "america" | "asia" | "europe" | "oceania"

const formatToIcountry = (obj: any): Icountry => {
    let region: Icountry = {
        name: obj.name.common ? obj.name.common : "",
        nameNative: obj.name.nativeName ? obj.name.nativeName : "",
        population: obj.population ? obj.population.toLocaleString("en-US") : "",
        region: obj.region ? obj.region : "",
        subRegion: obj.subregion ? obj.subregion : "",
        capital: obj.capital ? obj.capital : [],
        flags: obj.flags.png,
        currencies: obj.currencies ? obj.currencies : [],
        languages: obj.languages ? obj.languages : [],
        tld: obj.tld ? obj.tld : [],
        borders: obj.borders ? obj.borders : []
    } 
    return region
}

const formatBordersCca3ToName = async (cca3: string): Promise<string> => {
    let tryNumber: number = 2
    let result: "sucess" | "error" = "error"
    while (tryNumber > 0 && result === "error") {
        try {
            tryNumber -= 1
            let data = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}`).then((response) => {
                if (response.ok) {
                    return response.json()
                }
            })

            result = "sucess"
            return data[0].name.common as string
        } catch (error) {
            console.log(error)
        }    
    }
    return "Not found"
}

const formatAllBordersCca3ToName = async (bordersCca3: string[]): Promise<string[]> => {
    let bordersNames: string[] = []
    for (let i = 0; i < bordersCca3.length; i++) {
        const name = await formatBordersCca3ToName(bordersCca3[i].toLowerCase())
        bordersNames.push(name)
    }
    
    return bordersNames
}

export const getCountries = async () => {
    try {
        let data = await fetch("https://restcountries.com/v3.1/all").then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        data = data.map((country: any) => formatToIcountry(country))
        

        const respone: Iresponse = {
            status: "sucess",
            data
        }

        return respone
    } catch (error) {
        const respone: Iresponse = {
            status: "error",
            message: error as string
        }

        return respone
    }
}

export const getCountry = async (name: string) => {
    try {
        let rawData: Array<any> = await fetch(`https://restcountries.com/v3.1/name/${name}`).then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
        
        let data: Icountry = formatToIcountry(rawData[0] as any)
        data.borders = data.borders.length > 0 ? await formatAllBordersCca3ToName(data.borders as any) : data.borders

        const response: Iresponse = {
            status: "sucess",
            data
        }

        return response
    } catch (error) {
        const response: Iresponse = {
            status: "error",
            message: error as string
        }

        return response
    }
}
