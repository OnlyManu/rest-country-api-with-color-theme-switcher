interface Iresponse {
    status: "sucess" | "error",
    data?: Array<Iregion>,
    message?: string
}
interface Iregion {
    name: string,
    population: number,
    region: string,
    capital: string[],
}

const formatToIregion = (obj: any): Iregion => {
    let region: Iregion = {
        name: obj.name.official,
        population: obj.population,
        region: obj.region,
        capital: obj.capital
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

