import {axiosPrivateInstance} from "../axiosInstance";

export async function get<R>(url: string, config = {}): Promise<R> {
    return axiosPrivateInstance.get(url, {...config}).then((response: any) => response.data)
}

export async function post<T, R>(url:string, data?: any, config = {}): Promise<R> {
    return axiosPrivateInstance.post(url, data, config).then((response: any) => response.data)
}

export async function put<R>(url: string, id?: string): Promise<R> {
    return axiosPrivateInstance.put(url).then(response => response.data)
}

export async function deleter<T, R>(url:string): Promise<R> {
    return axiosPrivateInstance.delete(url).then((response: any) => response.data)
}
  