import { Models } from "@app/api/Types/queryReturnTypes/Models";

export function capitalize(str: string) {
    return str && str[0].toUpperCase() + str.slice(1)
}

export const toRem = (value: number): string => {
    return (value / 16) + 'rem';;
}

export const isEqual = (date: string | number | any) => {
    const postgresDate = new Date(date)
    const curr_date = new Date()
    return postgresDate.getFullYear() === curr_date.getFullYear() &&
    postgresDate.getMonth() === curr_date.getMonth() &&
    postgresDate.getDate() === curr_date.getDate();
}

export const isSelectedModel = (data: Models, model: Models) => {
    return data.model_guid === model.model_guid
}
