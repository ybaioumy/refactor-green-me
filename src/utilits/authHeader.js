import { useGetToken } from "../hooks/useCookies";
import Cookies from 'js-cookie';

export function authHeader() {
    const token = Cookies.get('token')

    return `Bearer ${token}`
}