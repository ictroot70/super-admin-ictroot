export const buildBasicHeader = (email: string, password: string): string => {
  const credentials = `${email}:${password}`
  const encodedCredentials = btoa(credentials)

  return `Basic ${encodedCredentials}`
}
