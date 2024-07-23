import { CarProps } from "@/types";
import axios from "axios";
import { FilterProps } from "@/types";

const GET_CAR_API = process.env.GET_CAR_API;

export async function fetchCars( filters : FilterProps) {
    try{

        const { manufacturer, year, model, limit, fuel} = filters;
        const headers  = {
            'x-rapidapi-key': 'efc51b0d97msh4c041c31688a135p19b7eejsnaaa4c392d28c',
            'x-rapidapi-host': 'cars-by-api-ninjas.p.rapidapi.com'
        }

        const {data} = await axios.get(`${GET_CAR_API}?make=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
            headers: headers,
        })
        
        return data; 
    }catch(error){

    }
}

export const updateSearchParams = (type: string, value: string) => {

    const searchParams  = new URLSearchParams(window.location.search);

    searchParams.set(type, value)

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname
} 

export const deleteSearchParams = (type: string) => {

    // Set the specified search parameter to the given value
    const newSearchParams = new URLSearchParams(window.location.search)

    //delete the specified parameter
    newSearchParams.delete(type.toLocaleLowerCase());

    // Construct the updated URL pathname with the deleted search parameter
    const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;
}

export const generateCarImageUrl = (car: CarProps, angle?:string) => {
    
    const url = new URL("https://cdn.imagin.studio/getimage")

    const { make, year, model } = car;

    url.searchParams.append('customer', "hrjavascript-mastery");
    url.searchParams.append("make", make)
    url.searchParams.append("modelFamily", model.split(" ")[0])
    url.searchParams.append("zoomType", 'fullscreen')
    url.searchParams.append("modelYear", `${year}`)
    // url.searchParams.append("zoomLevel", zoomLevel)
    url.searchParams.append("angle", `${angle}`)

    return `${url}`
}

export const calculateCarRent = (city_mpg: number, year: number) => {
    const basePricePerDay = 50; // Base rental price per day in dollars
    const mileageFactor = 0.1; // Additional rate per mile driven
    const ageFactor = 0.05; // Additional rate per year of vehicle age
  
    // Calculate additional rate based on mileage and age
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;
  
    // Calculate total rental rate per day
    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;
  
    return rentalRatePerDay.toFixed(0);
};



