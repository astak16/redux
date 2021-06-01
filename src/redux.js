import React, {useEffect, useState} from "react";

let state = undefined
let reducer = undefined
let listeners = []

const setState = (newState) => {
  state = newState
  listeners.map((listener) => listener(state))
}

const store = {
  getState() {
    return state
  },
  dispatch(action) {
    setState(reducer(state, action))
  },
  subscribe(fn) {
    listeners.push(fn)
    return () => {
      const index = listeners.indexOf(fn)
      listeners.splice(index, 1)
    }
  }
}

const dispatch = store.dispatch
export const createStore = (_reducer, initState) => {
  state = initState
  reducer = _reducer
  return store
}

export const Context = React.createContext(null)

const changed = (oldState, newState) => {
  let changed = false
  for (let key in oldState) {
    if (oldState[key] !== newState[key]) {
      changed = true
    }
  }
  return changed
}

export const connect = (selector, mapDispatchToProps) => (Component) => {
  return (props) => {
    // const {setState} = useContext(Context)
    const [, update] = useState({})

    const data = selector ? selector(state) : {state}
    const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}
    useEffect(() => {
      return store.subscribe(() => {
        const newData = selector ? selector(state) : {state}
        if (changed(data, newData)) {
          console.log("update")
          update({})
        }
      })
    }, [selector])

    return <Component {...dispatchers} {...data} {...props}/>
  }
}

export const Provider = ({store, children}) => {
  return (
    <Context.Provider value={store}>
      {children}
    </Context.Provider>
  )
}
