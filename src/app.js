/* @jsx createElement */
import { render, createElement } from "./react";

function Title(props) {
  return (
    <h1>제목 : {props.children}</h1>
  )
}

function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>
}

const vdom2 = <p>
  <Title>react 잘 만들기</Title>
  <ul>
    <Item color="red">first 아이템</Item>
    <Item color="green">second 아이템</Item>
    <Item color="blue">third 아이템</Item>
  </ul>
</p>

render(vdom2, document.querySelector('#root'))
