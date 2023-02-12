# react 만들어보기

## webpack 세팅부터

npm init -y

npm install webpack-cli --save-dev

npm i webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin --save-dev

webpack.config.js 생성, 설정

```js
entry에 지정된 JS부터 시작해 변환과정을 거쳐 출력을 하게됨.
이때 변환 과정에 어떤 일을 할지는 웹팩이 자체 세팅하는게 아니라
내가 지정해준 어떤 프로그램에 entry로 들어온 코드를 넘겨줘,.
처리해서 출력해줘.
n개의 파일을 입력받아 한개의 파일을 만들어내는 번들링.
```

## webpack 기본 구조

```js
module.exports = {
    mode:'', // 개발, 운영 용도를 스위칭하는 mode
    entry: '', // 1. es6이상의 자바스크립트 파일을 입력으로 받고
    output:{ // 4. 최종적으로 output 파일이 나온다.
            // 어느 디렉토리에 어떤 이름으로 쓸거야.
    },
    module:{ // 2. 이것을 모듈에 es5로 변환해주는 transpiler를 설정해주고
        rules:[
            // loader들을 지정해주는 공간. babel loader를 지정해줄예정.
            // 모든 입력 파일이 바벨로더가 처리해야하는 JS파일이 아닐수 있어서 그것들은 처리를 못하니 얘한테 필요없는 파일들은 제거해줘야함. test:/\.js$/ 이런 정규식 형태로
            // node_modules 같은것도 제외해줘야함
        ]
    },
    plugins:[ // 3. 플러그인에는 console이나 주석을 제거하는 plugin을 세팅해줄 수 있다.
    ]
}
```

dev server는 vscode extension Live-server를 사용한다.

## 웹팩 설정을 이정도 하고 babel 추가설정을 해준다

babel.config.json 생성

```js

{
    "presets": [
        "@babel/preset-env"
    ]
}
```

그리고 webpack.config.js로 돌아와
dev server를 세팅한다. 웹서버 띄우는거.

```js
devServer: {
    compress: true,
    port: 9999
  },
```

추가해주고 번들링을 실행시키기 위한 script 추가해준다.

```js
// package.json

"scripts": {
    "build": "webpack", // config파일 만들어놔서 자동으로 찾아줌. 그런데 이렇게 webpack 커맨드만 실행하면 번들링만 일어남.
    "dev": "webpack serve", // dev server띄우는 serve 추가
    ...후략
```

npm run dev ->  번들링, 서버실행 됨.
9999포트로 가본다. (localhost:9999)

이렇게 하면 실제로 거의 메모리에 내용이 들어가있고
실시간으로 바뀌는 내용들이 바뀌는 기능을 제공해줌. dist는 안생김.

dev 종료후 npm run build 해보면,
번들링 되어 dist 디렉토리가 생기고 실행은 되지 않음.
dist안의 index.html에 들어가보면

```html
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>react를 만들어 보자</title>
<script defer src="bundle.js"></script>
</head>

<body>
    <div id="root"></div>
    <!-- 얘는 지워줘야한다. 번들링 전에 참조할 app.js -->
    <script src="app.js" type="module"></script> 
</body>
```

번들링 되기 전 index.html에서 script태그 지우고

npm run build 해서 다시 dist에 app.js가 나오지 않도록 한다.

<br>

앞으로 서비스가 커지고 코드가 많아질테니 구조를 좀 잡고 갈텐데,

번들링 파일과 실제 다룰 코드를 구분하기 위해

`src 디렉토리`를 만들고 `app.js`를 넣는다.

**실제 앱에서는 React에서 제공하는 기능과 실제 우리가 만드는 앱은 코드가 분리되어 있어야 하니,**

현재 app.js 몰려있는 전체 기능을

react.js 만들어 react가 제공함직한 코드들을 분리한다.

(createDom 함수) 옮기고 export 해준다.

app.js에서 import해서 쓴다.

app.js - vdom에서

```js
   props: {
            style: 'color:red'
          },
```

프롭스 추가해주고 이걸 처리할 코드를 `createDOM`에 작성해줌.

```js
// createDOM
...전략
Object.entries(node.props)
        .forEach(([name, value]) => element.setAttribute(name, value))
...후략
```

이 때 npm run build 하면 에러난다. 디렉토리구조 아까 바꿨으니,.

```js
// webpack.config.js
...전략
entry: './src/app.js', // 이렇게 수정해준다.

...후략

```

기존 렌더방식도 리액트가 해주는 것처럼 바꾼다.

```js
// document
//   .querySelector('#root')
//   .appendChild(createDOM(vdom));

render(vdom, document.querySelector('#root'))
```

vdom을 만들었는데,.

세개의 속성을 가진 객체의 단순 반복이라는 점을 이용해

세 속성을 가진 객체를 생성하는 함수를 만들어 반복 호출해 vdom 구조를 만들어 볼 수 있겠다.

<br>

## createElement 함수로 vdom 객체를 만들어봤지만, 아직 완전히 편리하지 않다

'html 태깅하듯이 하는게 가장 편리하겠다' 라는 아이디어로 jsx가 등장.

그냥 jsx 문법으로 만든 코드를 render 함수에 전달해본다.

```jsx
const vdom2 = <p>
  <h1>react 만들기</h1>
  <ul>
    <li style="color:red">첫번째 아이템</li>
    <li style="color:green">두번째 아이템</li>
    <li style="color:blue">세번째 아이템</li>
  </ul>
</p>
```

그럼 React is not defined 에러남.

코드는 웹팩으로 번들링 하고 있는데
js 파일은 `바벨 로더`한테 전달되게끔 되어있다.

트랜스 파일러인데 es5 이상의 코드를 아랫단계 버전으로 트랜스파일 해주는건데

`babel-loader`에게 preset 즉, 어떤 변환을 하게 할거야 라는 setting값을 넘겨줬는데

JS안에 포함되어있는 jsx를 react가 갖고있는 `createElement`라고 하는 함수 호출 구문으로 바꿔주는 역할을 포함한다.

preset-react를 webpack.config에 설정해놨기 때문에 jsx가 createElement로 실제로는 변환이 되어 있을 것이다.

그런데 왜 에러가 나느냐?

변환된 코드는 아래와 같다.

```js
"use strict";

/*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("h1", null, "react \uB9CC\uB4E4\uAE30"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", {
  style: "color:red"
}, "\uCCAB\uBC88\uC9F8 \uC544\uC774\uD15C"), /*#__PURE__*/React.createElement("li", {
  style: "color:green"
}, "\uB450\uBC88\uC9F8 \uC544\uC774\uD15C"), /*#__PURE__*/React.createElement("li", {
  style: "color:blue"
}, "\uC138\uBC88\uC9F8 \uC544\uC774\uD15C")));
```

여기서 React.createElement를 사용하는데 내 코드에 React가 없기 때문에 react가 없다는 에러가 나는 것.

```js
/* @jsx createElement */

// 이 주석을 코드 상단에 추가해준다.

```

babel 안에 포함되어 있는 React의 JSX Transpiler가 옵션을 입력 받는다.

코드안에 @jsx 구문을 포함시켜 놓으면 그걸 입력으로 받아서 저 변환 결과를 변경시킨다.

default는 `React.createElement`인데

위처럼 createElement로 바꿔주면 저 함수를 호출하게 된다는 것.

이렇게 해주면 정상 렌더가 되느냐? -> 아직 안된다.

이번엔 `Cannot convert undefined or null to object` 에러가 남.

실제로 이 `babel`의 `Transpiler`가 jsx를 바꾸면서 props가 없으면 null로 반환하기 때문이다. createElement 함수에 props로 null을 전달해버린다.

지금까지 직접 vdom을 생성해 전달할때는 props가 없으면 빈 객체를 전달했었는데 말이다.

이 null 처리를 createElement 함수에서 처리해줘야 한다.

```js
// 인자로 props에 null이 들어와버리고 그걸 key로 쓰려고 하니 에러가 나는 것.
export function createElement(tag, props, ...children) {
    props = props || {} //방어 코드를 작성해준다.
    return {
        // tag:tag,
        // props:props,
        // children:children
        //단축표현 사용
        tag,
        props,
        children
    }
}
```

이렇게 되면 잘 작동한다 !

## JSX는 별 게 아니다

1. DOM을 다루기 귀찮기 때문에 간단한 객체를 만들고 그 객체를 만드는 헬퍼 함수를 만들었는데

DOM보다 훨씬 간단한 구조물을 만들었다는 장점.

2. 그것을 생성함에 있어 리터럴이나 함수를 이용한 방법은 UI의 구조를 파악하기 힘들고 작성하기도 힘든점을 마크업 형태로 구조파악, 작성도 쉽게함.

이런거다.

이렇게 jsx만 도입했는데도 react와 상당히 비슷해졌다.

```js
// app.js

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

```

여기서.. createElement가 사용되지 않으니 import에서 빼버리면 어떻게 될까?

에러가 난다. 왜일까?

실제로 실행은 번들 파일이 실행이 된다.

그 파일에는 `jsx`가 `createElement` 함수 호출 구문으로 바뀌어 있다.

그래서 코드상에서 쓰이지 않지만 꼭 import 해줘야한다.

똑같은 제약 사항이 react에도 있다.

React가 코드상에서 쓰이지 않아도 상단에 import React 해주는 이유이다.

<br>

## React가 한 단계 더 나아간 점

`사용자 component`를 만들 수 있는 기능을 제공.

함수형, 클래스형 방법을 제공.

```js
function Title() {
  return (
    <h1>react 만들기</h1>
  )
}

const vdom2 = <p>
  <Title />
```

이렇게 jsx로 이용이 가능한데, 이렇게만하면 에러난다.

여기서도 babel에 의해 컴파일 된 코드를 보자.

```js
...전략
const vdom2 = /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement(Title, null), // 첫번째 인수로 string이 아닌 Title이 전달된다.
...후략
```

Title이 함수인지를 체크해서 함수라면 호출을 해주면,

그리고 그 함수가 jsx를 반환한다면 결과적으로 똑같이 동작하게 할 수 있다.

jsx 태그 이름이 대문자로 시작되면 이것을 문자열로 처리하지않고 자바스크립트 값으로 취급할꺼고

그 값은 함수여야하고 jsx를 리턴하는 createElement의 리턴 결과값이어야 한다는 약속을 갖고있다.

바로 이 이유때문에 대문자로 컴포넌트를 만들지 않으면 리액트는 알지 못한다.

```js
export function createElement(tag, props, ...children) {
    props = props || {}

    if (typeof tag === 'function') { // 전달받은 tag의 타입이 함수면 실행시켜서 jsx를 리턴받아라.
        return tag()
    } else {
        return { tag, props, children }
    }

```

이렇게 하면 또 에러가 해결 되었다.

반드시 대문자로 시작해야하고, jsx를 return 해야하는 일종의 컨벤션, 제약사항이 생기는 점이 있지만,

jsx로 html처럼 짜여진 코드가 주는 장점이 더 많다.

<br>

## props

사용자 컴포넌트에 props, children을 넘겨 사용할 수 있도록

helper 함수인 createElement를 수정해줬다. commit 변경사항 보면됨.

<br>

## li tag

```js
function Item(props) {
  return <li style={`color:${props.color}`}>{props.children}</li>
}
```

props를 넘겨 이용할 수 있도록 createElement 함수를 만들어놨기 때문에 바로 적용된다.
