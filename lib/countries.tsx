export interface Icountry {
    name: string,
    population: string,
    region: string,
    capital: string[],
    flags: string
}
interface Iresponse {
    status: "sucess" | "error",
    data?: Array<Icountry>,
    message?: string
}

export type CountriesType = undefined | Array<Icountry>

const formatToIregion = (obj: any): Icountry => {
    let region: Icountry = {
        name: obj.name.official,
        population: obj.population.toLocaleString("en-US"),
        region: obj.region,
        capital: obj.capital,
        flags: obj.flags.png
    } 
    return region
}

export const getCountries = async () => {
    try {
        let data = await fetch("https://restcountries.com/v3.1/all").then((response) => {
            if (response.ok) {
                return response.json()
            }
        })

        data = data.map((region: any) => formatToIregion(region))

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

