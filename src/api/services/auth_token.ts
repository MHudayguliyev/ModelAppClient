import moment from 'moment'
import {get} from '../services/auth_helper'

export default function authToken() {
    const data = localStorage.getItem('User') as string;
    const obj = JSON.parse(data)

    if(obj && obj.access_token){
        return obj.access_token
    }
    return {}
}

export async function refreshAccessToken () {
    const data = localStorage.getItem('User') as string;
    let obj;
    try {
        obj = JSON.parse(data ?  data : '')
    } catch (error) {
        obj = { refresh_token: '' }
    }

    try {
        const res: any = await get('auth/load-user', {
            headers: { Authorization: `Bearer ${obj.refresh_token}` }
        })
        console.log('res', res)
        localStorage.setItem('authUser', JSON.stringify({ ...obj, access_token: res.access_token }));
        localStorage.setItem('accessTokenCreatedTime', moment(new Date()).format("YYYY-MM-DD HH:mm:ss"))
    } catch (error) {
        console.log(error)
    }
}