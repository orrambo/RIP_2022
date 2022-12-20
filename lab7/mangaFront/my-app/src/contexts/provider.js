import { useEffect, useReducer } from "react";
import { MangasContext } from "./context";
import {reducer, initialState} from "./reducer"

export const MangasProvider = ({ children }) => {
  const [users, dispatch] = useReducer(reducer, initialState)

  return (
    <MangasContext.Provider value={[users, dispatch]}>
      {children}
    </MangasContext.Provider>
  );
};


export function GetMangas() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/manga/')
        .then(response => response.json())
        .then(data => {
          dispatch({type: 'GET_DATA', payload: data});
        })
  }, [])
  return state.mangas
}

export function GetManga(manga_id) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/manga/${manga_id}`)
        .then(response => response.json())
        .then(data => {
          dispatch({type: 'GET_MANGA', payload: data});
        })
  }, [])
  return state.mangas
}

export function GetCart(user) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/cart/?user=${user}`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_CART', payload: data});
                console.log(data);
            })
    }, [])
    return state.cart
}

export function GetPurchases(userId) {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/sell/?user=${userId}`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_PURCHASE', payload: data});
            })
    }, [])
    return state.purchases
}