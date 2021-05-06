import React, {useContext, useEffect, useState} from "react";
import './App.css';
import {connect, Context, store} from "./redux";

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

const Content = connect(state => {
  return {user: state.user}
})(({user}) => {
  console.log("content 渲染了");
  return <div className="content">大家好，我是: {user.name}</div>
})

const Input = connect()((props) => {
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
