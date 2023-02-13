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

<br>

## virtual DOM

react가 전면에 내놓은 기능중 하나인 `virtual DOM`.

여기 만들어놓은 구조물로 보면 `createElement로 만들어놓은 객체`일 수 있다.

정확히는 딱 그 객체라기보다 `virtual DOM`을 만들기 위한 근간이 되는 데이터. `메타 데이터` 라고 할 수 있다.

<br>

DOM을 직접 제어하지않고 더 쉬운 구조물로 개발할 수 있게끔 중간의 DOM 처리는 리액트에 맡기고 JSX라고 하는 DOM과 비슷한,

`컴포넌트 베이스의 개발 방식`을 만들어준 환경이 virtual DOM 이라고 할 수 있겠다.

어떤 맥락으로 동작하는지, 어떤 의미를 가지는지 살펴보자.

<br>

createElement 함수가 return 하는 {tag, props, children} 객체가 vdom의 input data 역할을 함.

이 객체는 트리 구조를 가지고 있고, 루트를 기준으로 자식요소들을 갖는 특징이 있다. 이 단일 객체를 가지고 react는 `real dom`을 만든다.

여기 코드에서는 `createDom`이라는 함수가 만든다.

당연히 프로덕션 환경의 리액트 에서는 이거보다 훨씬 복잡하겠다.

이 createDom 의 역할을 하는 코드가 react에 있을 것이다.

react 이전에 개발을 할 때는 createDom의 역할을 하는 코드를 개발자가 직접 작성했다.

react 에서는 이걸 작성하는게 아니라 vdom을 `createDom을` 이용해 만드는데 또 createDom 보다도 훨씬 간단한 jsx를 이용해 만든다.

그런데 이 구조에서 react는 virtual dom 이라고 하는거를 어떻게 장점으로 부각시켰을까.

바로 **ui가 업데이트될때 vdom의 장점을 극대화** 하는 측면을 부각시켰다.

```js
// react.js의 일부분
export function render(vdom, container) {
    container.appendChild(createDOM(vdom));
}

// app.js 의 일부분
render(vdom2, document.querySelector('#root'))
```

ui가 업데이트 된다는건 `render` 함수가 새로 돈다는 것.

render가 새로 돈다는 건 vdom이 이미 새롭게 만들어져 있고 기존의 DOM과 교체되어야 한다는 것.

근데 react 입장에서는 이미 기존의 `dom`과 dom으로 만들게 된 `virtual DOM 객체`를 가지고 있다.

그리고 새로운 입력으로 받는 `새로운 vdom`도 가지고 있고.

real dom에 있는 변경사항과 실제 객체의 변경사항을 추적하기는 굉장히 어렵다.

리얼돔은 리액트가 변경했을수도, 사용자가 변경했을수도 있고 다양하게 변경이 있을 수 있기 때문에 온전히 모든걸 리액트가 파악하긴 힘들다.

real dom과 real dom을 만든 vdom도 갖고있고 새로운 vdom 입력을 받은 상태에서

**리액트는 dom을 비교하는게 아니라 객체 대 객체를 비교할 수 있게 된 것.** 🎊

dom을 비교하는것 보다 엄청 비용이 적은 프로세스이기 때문에 두 객체를 비교해 다른 점만 `real dom`에 반영할 수 있는 구조를 만들게 된 것.

이 구조 때문에 리액트가 시장에 자리매김할 수 있었던 것이다.

그 구조를 만들 수 있는, 진입점이 바로 이 `render` 메소드인데 현재는 `vdom` 받아서 `appendChild` 하고 있는데 살짝 바꿔보겠다.

```js
export const render = (function () {
    let prevDom = null

    return function (vdom, container) {
        if (prevDom === null) {
            prevDom = vdom
        }
        //diff 객체 수준에서의 비교

        container.appendChild(createDOM(vdom));
    }
})()
```

기존 vdom과 새로 입력받은 vdom을 비교하기위해 render 함수를 조금 수정했다.

이 함수는 즉시실행 함수로 내부의 함수를 return하도록 만들어 closure를 만들었다.

이렇게하면 prevDom은 clousre에 갇혀 바깥에선 참조하지 못하고 내부적으로는 매번 업데이트 때마다 비교할 수 있는 로직을 삽입할 수 있도록 구조가 나온다.

그래서 closure에 숨겨놓을 이전 돔, prevDom을 새로운것과 비교를 한 뒤 어떻게 할지 결정하면 된다.

기존에 바로 리얼돔으로 만들었던걸, 이제는 prevDom이 있는지 파악해 있으면 비교를 하고 변경이 있으면 새 vdom을 createDom에 전달한다.

virtual dom을 실제로 구현해보기는 일단 하지 않겠다. 신기하게도 virtual dom을 구현하는 라이브러리도 많다.

<br>

## class 컴포넌트 구현

createElement 함수 내부에서 class형을 입력받았을때 처리를 해줬다.

그러나 실제 react와는 많이 다르다.

지금 앱에서는 렌더링이 한번만 되지만 리렌더가 된다면?

매번 인스턴스를 새로 만들게 된다...ㅜ 함수 컴포넌트와 똑같은 것.

함수 호출되면 매번 스코프가 새로 생성되니,..

그래서 실제로 리액트의 구현은 다르다.

클래스 컴포넌트는 인스턴스를 만들고 컴포넌트가 삭제될때까지 유지하면서 렌더함수를 호출하는 식으로

디자인 되어있다 정도로 알고 넘어가자.

<br>

## Hook 원리와 제약

react 16.8 이전엔 class 컴포넌트만 state를 가질 수 있었다.

function형 컴포넌트는 함수기 때문에 호출될 때마다 모든것이 리셋되는 개념이었기 때문에 state를 가질 수 없었다.

그래도 함수형 컴포넌트도 상태를 갖고싶으니, 개발하게된게 `hook`이다.

원래대로라면 되지 않을 동작을 되게하면, 그에 따른 제약이 있기 마련이다.

1. 최상위 에서만 hook을 호출해야함.

반복문, 조건문, 중첩된 함수 내에서 Hook을 호출하지 마시오.

2. 오직 react 함수 내에서 hook을 호출하시오.

react 함수 컴포넌트, custom hook에서 훅을 호출하시오.

hook이 호출되는 순서에 의존한다, 모든 렌더링에서 Hook의 호출 순서는 같기 때문에

예시가 올바르게 작동한다.

여기까지의 문장을 코드로 보자. 실제로 실행이 제대로 되는 코드는 아니다.

주석위주로 읽으며 컨셉을 이해해보자.

```js


// 리액트는 훅과 관련된 배열을 내부적으로 갖고있다고 예상함.
const hooks = []
// createElement 객체가 만들어지는 지점에 저 훅 배열을 세팅

//index를 관리할 값
let currentComponent = 0

export class Component {
    constructor(props) {
        this.props = props;
    }
}

export function createDOM(node) {
    if (typeof node === 'string') {
        return document.createTextNode(node);
    }
    const element = document.createElement(node.tag);
    Object.entries(node.props)
        .forEach(([name, value]) => element.setAttribute(name, value))
    node.children
        .map(createDOM)
        .forEach(element.appendChild.bind(element));
    return element;
}


function makeProps(props, children) {
    return {
        ...props,
        children: children.length === 1 ? children[0] : children,
    }
}


function useState(initValue) {
    let position = currentComponent - 1

    if (!hooks[position]) {
        hooks[position] = initValue
    }
    const modifier = nextValue => {
        hooks[position] = nextValue
    }
    return [hooks[position], modifier]
}


export function createElement(tag, props, ...children) {
    props = props || {}

    if (typeof tag === 'function') {
        if (tag.prototype instanceof Component) {
            const instance = new tag(makeProps(props, children))
            return instance.render()
        }

        hooks[currentComponent] = null
        // tag 가 실행되기전, (함수가 만들어지기 전에 hooks를 세팅해준다.)
        //createElement가 호출될 때마다 Component 하나가 만들어진다. 그래서
        currentComponent++
        // 여기서 ++를 해줬기 때문에 이 안에서 또 useState 불러야 하는데
        // 그래서 useState 안에서 position으로 -1을 준 값을 준다.

        //핵심.
        // tag 함수 컴포넌트가 호출된 다음에 훅이 함수 안에서 호출돼서 index가 맞아진다는 것!
        // 그래서 순서 보장이 매우 중요하다.
        // 순서 보장은 createElement로 만들어진 객체 순서 메커니즘과 맞물려있다.
        // 함수는 실제로 상태를 가질 수 없지만 index 위치값 기반의 외부 상태에 값을 저장해놓고
        // 마치 그 함수가 상태를 저장하는 것 처럼 효과를 내는 마법의 원리인 것이다.
        // 그래서 hook을 써야할 위치가 제약이 있는 것이다.

        if (children.length) {
            return tag(makeProps(props, children))
        } else {
            return tag(props)
        }
    }
    return { tag, props, children }
}

export function render(vdom, container) {
    container.appendChild(createDOM(vdom));
}
```

<br>

## 정리

1. virtual Dom 자체 보다 Dom을 컨트롤 하기 위한 중간 매개체로서의 자료형을 만들고 그것을 다루게 했다는게 의미가 크다.

react native같은것도 만들어내는 백그라운드가 된다.

그 자료형으로 돔을 만들든 native의 코드로 만들든 변환기만 있으면 되는것.

2. client 뿐 아니라 server side rendering 구현에도 쓰인다.

코드 자체는 react 컴포넌트 코드인데 dom을 만드는게 아니라 서버사이드에서 ui를 만들어내고
브라우저에 서빙하는 구조가 가능하다는 것.

virtual dom이 문자열로 만들면 그게 결국 serverside rendering이 되는 것이니..

이렇게 똑같은 코드 베이스에서 다양한 플랫폼으로 이식할 수 있다는게 가장 큰 이점.

### 하지만 단점도 있다

1. 리액트가 말하는 컴포넌트의 스펙이 단촐하다.
컴포넌트는 재활용이 극대화 될 수 있는 형태의 소프트웨어 아키텍처인데, 리액트가 만든 컴포넌트가 그렇게 재활용성이 높은가 보면 아니다.

서비스 범위를 넘나들면서 재활용 되는 컴포넌트를 만드는 것은 너무 힘들다고 함.

2. 초기에 ui만 다루겠다는 라이브러리로 나왔는데 그렇기 때문에 프레임웤이라기엔 제공하는 기능이 너무 적다. 리액트 관련 도구들이 어떻게보면 굉장히 많지만 반대로 처음 진입하는 사람의 입장에서는 어떤 도구로 어떻게 만드는게 가장 효율적인 방법인가 고민스럽다는 것. open source가 안정적이지 않은 점도 많으니 프레임웤 수준에서 제공했으면 좋겠다는 의견.
