export const setTokenCookie = (token: string) => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 7)

  document.cookie = `jwt_video=${token}; expires=${expirationDate.toUTCString()}; path=/; Secure; SameSite=Strict`
}

export const getTokenFromCookies = () => {
  const cookies = document.cookie.split(';')
  const tokenCookie = cookies.find((cookie) => cookie.trim().startsWith('jwt_video='))

  if (!tokenCookie) {
    return null
  }

  return tokenCookie.split('=')[1].trim()
}
