import { render, createElement } from "./react";

// const vdom = {
//   tag: 'p',
//   props: {},
//   children: [
//     {
//       tag: 'h1',
//       props: {},
//       children: ["React 만들기"],
//     },
//     {
//       tag: 'ul',
//       props: {},
//       children: [
//         {
//           tag: 'li',
//           props: {
//             style: 'color:red'
//           },
//           children: ["첫 번째 아이템"]
//         },
//         {
//           tag: 'li',
//           props: {},
//           children: ["두 번째 아이템"]
//         },
//         {
//           tag: 'li',
//           props: {},
//           children: ["세 번째 아이템"]
//         },
//       ]
//     }
//   ],
// };

//만든 createElement 함수를 이용해 vdom을 만들어본다.
const vdom = createElement('p', {},
  createElement('h1', {}, 'react 만들기'),
  createElement('ul', {},
    createElement('li', { style: 'color:red' }, '첫번째 아이템'),
    createElement('li', { style: 'color:green' }, '두번째 아이템'),
    createElement('li', { style: 'color:blue' }, '세번째 아이템')
  )
)

render(vdom, document.querySelector('#root'))
