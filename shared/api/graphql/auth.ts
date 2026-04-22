//  # buildBasicHeader(email, password)
//  # Authorization: Basic base64(email:password)
//  # loginAdmin вызывается БЕЗ этого заголовка


export const buildBasicHeader = (email: string, password: string): string => {
  const credentials = `${email}:${password}`;
  const encodedCredentials = btoa(credentials);

  return `Basic ${encodedCredentials}`;
};