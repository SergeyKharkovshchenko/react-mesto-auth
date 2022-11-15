const getResponse = res => 
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.statusText}`);

    export const register = async (email, password) => {
    const res = await fetch(`${baseUrl}signup`, {
      method: "POST",
      headers: {
        "Accept": "application/json",        
        "Content-Type": "application/json"
    } ,
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })
    return getResponse(res);  
  }

  export const login = async (email, password ) => {
    const res = await fetch(`${baseUrl}signin`, {
      method: "POST",
      headers: {
        "Accept": "application/json",        
        "Content-Type": "application/json"
    } ,
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })
    return getResponse(res);  
  }

export const checkToken = async (jwt) => {
  const res = await fetch(`${baseUrl}users/me`, {
      method: "GET",
      headers: {
        "Accept": "application/json",        
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
    } ,
    });
    return getResponse(res);  
  }

export const baseUrl= "https://auth.nomoreparties.co/";

