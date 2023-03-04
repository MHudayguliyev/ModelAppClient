export interface formatType {
    label: string,
    value: string
}

export type ObjectType = {
    id: string,
    tm: string,
    ru:string,
    en: string,
    desc: string,
    price?: number | any,
    date?: string,
    formats: formatType[],
    class_guid: string,
}

export type SaveChangesType = {
    modelGuid: string
    categoryGuid: string
    classGuid: string
    formats: Array<string>
    locales: {
        tm: string,
        en: string,
        ru: string,
    }
    desc: string
    price?: number
    modelImg: string | any
    modelZip: string | any
}