import React, {useContext, useEffect, useState} from "react";

export const store = {
  state: {user: {name: "uccs"}},
  setState(newState) {
    store.state = newState
    store.listeners.map((listener) => listener(store.state))
  },
  listeners: [],
  subscribe(fn) {
    store.listeners.push(fn)
    return () => {
      const index = store.listeners.indexOf(fn)
      store.listeners.splice(index, 1)
    }
  }
}

export const Context = React.createContext(null)

export const connect = (selector) => (Component) => {
  return (props) => {
    const {state, setState} = useContext(Context)
    const [, update] = useState({})
    const data = selector ? selector(state) : {state}
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component dispatch={dispatch} {...data} {...props}/>
  }
}

const reducer = (state, {type, payload}) => {
  if (type === "updateUser") {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  } else {
    return state
  }
}
