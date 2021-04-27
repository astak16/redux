import React, {useContext, useEffect, useState} from "react";
import './App.css';

const Context = React.createContext(null)

const store = {
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
const App = () => {
  return <Context.Provider value={store}>
    <div className="wrapper">
      <div>
        <Title/>
        <Content/>
        <Input/>
      </div>
    </div>
  </Context.Provider>
}


const Title = () => {
  console.log("title 渲染了");
  return <div className="title">手写 redux</div>
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

const connect = (Component) => {
  return (props) => {
    const {state, setState} = useContext(Context)
    const [, update] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component dispatch={dispatch} state={state} {...props}/>
  }
}

const Content = connect(({state}) => {
  console.log("content 渲染了");
  return <div className="content">大家好，我是: {state.user.name}</div>
})

const Input = connect((props) => {
  console.log("input 渲染了");
  const {dispatch, state} = props
  const onChange = (e) => {
    dispatch({type: "updateUser", payload: {name: e.target.value}})
  }
  return <div className="input">
    <div className="label">请输入：</div>
    <input type="text" onChange={onChange} value={state.user.name}/>
  </div>
})

export default App;
