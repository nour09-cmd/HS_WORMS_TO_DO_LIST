export const BEURL ="http://localhost:4545/api"


export const TOKEN =() =>  {

  return  {headers: {Authorization:  localStorage.getItem('token')}}
};
