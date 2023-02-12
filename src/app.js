/* @jsx createElement */
import { render, createElement } from "./react";

const vdom2 = <p>
  <h1>react 만들기</h1>
  <ul>
    <li style="color:red">첫번째 아이템</li>
    <li style="color:green">두번째 아이템</li>
    <li style="color:blue">세번째 아이템</li>
  </ul>
</p>

render(vdom2, document.querySelector('#root'))
