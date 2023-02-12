/* @jsx createElement */
import { render, createElement } from "./react";

function Title(props) {
  return (
    <h1>제목 : {props.children}</h1>
  )
}

const vdom2 = <p>
  <Title>react 잘 만들기</Title>
  <ul>
    <li style="color:red">첫번째 아이템</li>
    <li style="color:green">두번째 아이템</li>
    <li style="color:blue">세번째 아이템</li>
  </ul>
</p>

render(vdom2, document.querySelector('#root'))
