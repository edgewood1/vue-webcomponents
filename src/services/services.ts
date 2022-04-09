
export async function getAllUsers ():Promise<any> {

  const response = await fetch('/api/users');
  return await response.json();
}