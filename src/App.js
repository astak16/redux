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
        <Input/>
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

const changeState = (state, {type, payload}) => {
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
const Input = () => {
  const {appState, setAppState} = useContext(Context)
  const onChange = (e) => {
    // appState.user.name = e.target.value
    setAppState(changeState(appState, {type: "updateUser", payload: {name: e.target.value}}))
  }
  return <div className="input">
    <div className="label">请输入：</div>
    <input type="text" onChange={onChange} value={appState.user.name}/>
  </div>
}

export default App;
