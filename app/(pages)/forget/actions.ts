'use server'

export async function forgetAction(prevState: any, data: FormData) {

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return emailRegex.test(email)
  }

  let email: any = data.get('email')

  if (!isValidEmail(email)) {
    return { error: 'Email is invalid' }
  }

  try {
    const res = await fetch(`http://localhost:3000/api/get/${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (res.status === 200) {
      let data = await res.json()
      if (data) {
        try {
          if (data.provider === 'credentials') {
            return { message: 'https://localhost:3000/new-password' }
          }
          return { error: `you create account with ${data.provider}` }
        } catch {
          //null
        }
      }
      return { error: 'Email not found in database.' }
    }
  } catch (error) {
    console.log(error)
    return { error: 'Error, try again' }
  }
}