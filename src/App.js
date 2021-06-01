import React from "react";
import './App.css';
import {connect, createStore, Provider} from "./redux";

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

const store = createStore(reducer, {
  user: {name: "uccs"},
  group: {name: "前端组"},
})

const App = () => {
  return <Provider store={store}>
    <div className="wrapper">
      <div>
        <Title/>
        <Content/>
        <Input/>
        <Group/>
      </div>
    </div>
  </Provider>
}


const Title = () => {
  console.log("title 渲染了");
  return <div className="title">手写 redux</div>
}

const userSelector = state => {
  return {user: state.user}
}

const userDispatch = dispatch => {
  return {
    updateUser: (attrs) => {
      dispatch({type: "updateUser", payload: attrs})
    }
  }
}
const connectToUser = connect(userSelector, userDispatch)

const Content = connectToUser(({user}) => {
  console.log("content 渲染了");
  return <div className="content">大家好，我是: {user.name}</div>
})

const Input = connectToUser((props) => {
  console.log("input 渲染了");
  const {updateUser, user} = props
  const onChange = (e) => {
    updateUser({name: e.target.value})
  }
  return <div className="input">
    <div className="label">请输入：</div>
    <input type="text" onChange={onChange} value={user.name}/>
  </div>
})

const Group = connect(state => {
  return {group: state.group}
})(({group}) => {
  console.log("group 渲染了")
  return <div>我是：{group.name}</div>
})

export default App;
