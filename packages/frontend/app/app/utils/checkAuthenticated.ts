import {jwtDecode} from 'jwt-decode'

export async function checkAuthenticated() {
  const token = useCookie('token');

  if(!token.value) return false

  const result = jwtDecode(token.value)

  if(result.exp && result.exp > new Date().getTime()) {
    return false
  }

  return true;
}
