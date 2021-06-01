import React, {useContext, useEffect, useState} from "react";

const store = {
  state: undefined,
  reducer: undefined,
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

export const createStore = (reducer, initState) => {
  console.log(reducer)
  if (initState)
    store.state = initState
  else
    store.state = reducer.state
  store.reducer = reducer
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
    const {state, setState} = useContext(Context)
    const [, update] = useState({})
    const dispatch = (action) => {
      setState(store.reducer(state, action))
    }
    const data = selector ? selector(state) : {state}
    const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : {dispatch}
    useEffect(() => {
      return store.subscribe(() => {
        const newData = selector ? selector(store.state) : {state: store.state}
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
