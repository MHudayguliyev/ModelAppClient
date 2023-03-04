interface LocalizationTypes {
    tm: string,
    ru: string,
    en: string
}

interface UsualTypes {
    value: string,
    label: LocalizationTypes
}



export type Models = { 
    model_guid: string,
    categories: UsualTypes,
    classes: UsualTypes,
    formats: UsualTypes
    model_names: LocalizationTypes,
    model_line_price: number,
    desc: string,
    model_img: string,
    model_zip: string,
    crt_date: Date,
    is_liked: boolean
}

export interface ModelsList {
    data: Models[],
    count: number
}