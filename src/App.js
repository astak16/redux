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
        <Group/>
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

const Input = connect(null, (dispatch) => {
  return {
    updateUser: (attrs) => {
      dispatch({type: "updateUser", payload: attrs})
    }
  }
})((props) => {
  console.log("input 渲染了");
  const {updateUser, state} = props
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  return <div className="input">
    <div className="label">请输入：</div>
    <input type="text" onChange={onChange} value={state.user.name}/>
  </div>
})

const Group = connect(state => {
  return {group: state.group}
})(({group}) => {
  console.log("group 渲染了")
  return <div>我是：{group.name}</div>
})

export default App;
