import { useState, useMemo } from 'react'
//// translation
import { useTranslation } from 'react-i18next'

/// languages 
import languages from '../../assets/jsonData'

/// css
import './LangSwitcher.css'


type ToggleLangProps = {
    data: {
        icon: string;
        value: string;
        label: string
    }[]
}
export const ToggleLang = (props: ToggleLangProps) => {
    const {
        data
    } = props
    const { i18n } = useTranslation()

    const selectedLanguage = useMemo(() => {
        return data.find(item => item.value === i18n.language)
    }, [i18n.language])

    console.log(selectedLanguage)

    return (
        <>
            <img src={selectedLanguage?.icon} width={30}/>
        </>
    )
}




export const LanguageSwitcher = () => {
    const {i18n} = useTranslation()
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const changeLanguage = (value: string) => {
        console.log(value)
        i18n.changeLanguage(value)
        localStorage.setItem('language', value);
    }

    return (
        <>
            <div className=''>
                <div className='heading' onClick={()  => setShowDropdown(!showDropdown)} style={{color: 'white'}}>Dropdown</div>
                <div className='dropdown-content'>
                    {showDropdown && languages.map((item: any, index: number) => (
                        <div key={index} onClick={() => changeLanguage(item.value)}>
                            {/* <img src={item.icon} alt="Language flag image" width={30} /> */}
                            <div>{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
