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
