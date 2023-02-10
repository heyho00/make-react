# react 만들어보기

```bash
npm init -y

npm install webpack-cli --save-dev

npm i webpack-dev-server babel-loader @babel/core @babel/preset-env @babel/preset-react html-webpack-plugin --save-dev

webpack.config.js 생성, 설정
# entry에 지정된 JS부터 시작해 변환과정을 거쳐 출력을 하게됨.
# 이때 변환 과정에 어떤 일을 할지는 웹팩이 자체 세팅하는게 아니라
# 내가 지정해준 어떤 프로그램에 entry로 들어온 코드를 넘겨줘,.
# 처리해서 출력해줘.
# n개의 파일을 입력받아 한개의 파일을 만들어내는 번들링.

# webpack 기본 구조
module.exports = {
    mode:'', # 개발, 운영 용도를 스위칭하는 mode
    entry: '', # 1. es6이상의 자바스크립트 파일을 입력으로 받고
    output:{ # 4. 최종적으로 output 파일이 나온다.
            # 어느 디렉토리에 어떤 이름으로 쓸거야.
    },
    module:{ # 2. 이것을 모듈에 es5로 변환해주는 transpiler를 설정해주고
        rules:[
            # loader들을 지정해주는 공간. babel loader를 지정해줄예정.
      #모든 입력 파일이 바벨로더가 처리해야하는 JS파일이 아닐수 있어서 그것들은 처리를 못하니 얘한테 필요없는 파일들은 제거해줘야함. test:/\.js$/ 이런 정규식 형태로
   # node_modules 같은것도 제외해줘야함.
        ]
    },
    plugins:[ # 3. 플러그인에는 console이나 주석을 제거하는 plugin을 세팅해줄 수 있다.
        
    ]
}

```
