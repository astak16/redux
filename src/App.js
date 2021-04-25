import React, {useContext, useState} from "react";
import './App.css';

const Context = React.createContext(null)

const App = () => {
  const [appState, setAppState] = useState({
    user: {name: "uccs"}
  })
  const contextValue = {appState, setAppState}
  return <Context.Provider value={contextValue}>
    <div className="wrapper">
      <div>
        <Title/>
        <Content/>
        <Wrapper/>
      </div>
    </div>
  </Context.Provider>
}


const Title = () => {
  return <div className="title">手写 redux</div>
}

const Content = () => {
  const {appState} = useContext(Context)
  return <div className="content">大家好，我是: {appState.user.name}</div>
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

const Wrapper = () => {
  const {appState, setAppState} = useContext(Context)
  const dispatch = (action) => {
    setAppState(reducer(appState, action))
  }
  return <Input dispatch={dispatch} state={appState}/>
}
const Input = (props) => {
  const {dispatch, state} = props
  const onChange = (e) => {
    dispatch({type: "updateUser", payload: {name: e.target.value}})
  }
  return <div className="input">
    <div className="label">请输入：</div>
    <input type="text" onChange={onChange} value={state.user.name}/>
  </div>
}

export default App;
