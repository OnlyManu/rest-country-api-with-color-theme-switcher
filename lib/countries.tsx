interface Iresponse {
    status: "sucess" | "error",
    data?: Array<object>,
    message?: string
}

export const getCountries = async () => {
    try {
        const data = await fetch("https://restcountries.com/v3.1/all").then((response) => {
            if (response.ok) {
                return response.json()
            }
        })
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

