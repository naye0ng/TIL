# Webpack

> [생활코딩](https://www.youtube.com/watch?v=cp_MeXO2fLg) 강의를 듣고 정리한 내용입니다.

웹 사이트에 접속하면 js, css, img 등 많은 파일을 다운받게 되는데, 이런 파일들을 다운받기 위해 서버에 접속할 때마다 애플리케이션은 느려진다. 또한, 자바스크립트 패키지를 다운받아 사용할 때, 각각의 패키지들이 서로 같은 이름의 변수나 함수명을 사용한다면 예상하지 못한 충돌이 발생할 수 있다. 그래서 이러한 문제를 해결하기 위해 나온 도구가 `Bundler`이다.

`Bundler`란 여러 개의 파일을 묶어주는 도구라는 뜻이며, `webpack`은 `Bundler`의 한 종류이다.

`webpack`을 사용하면 js, css, img와 같은 파일과 모듈을 모두 결합할 수 있으며, 분리도 가능하다. 



### 1. 웹팩 이전의 세계와 모듈의 개념

아래 hello.js와 world.js는 서로 같은 이름의 변수를 사용하고 있다. index.html에서 이 두 파일을 불러서 해당 변수를 사용할 때, 어떤 문제가 발생할까?

- 나중에 삽입된 world.js의 value가 hello.js의 value를 덮어쓰게 되어 'world'가 출력된다.

```javascript
// hello.js
var value = 'hello';
```

```javascript
// world.js
var value = 'world';
```

```html
<!DOCTYPE html>
<html>
<head>
  <script src="./hello.js"></script>
  <script src="./world.js"></script>
</head>
<body>
  <div id="target"></div>
  <script>
    document.querySelector('#target').innerHTML = value;
  </script>
</body>
</html>
```

위와 같은 문제를 극복하기 위해서 나온 개념이 `module`이다.

```javascript
// hello.js, world.js
var value = 'world';
export default value;
```

```html
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <div id="target"></div>
  <!-- 모듈을 import할때는 type="module"을 명시해준다. -->
  <script type="module">
    import hello_value from "./hello.js";
    import world_value from "./world.js";
    document.querySelector('#target').innerHTML = hello_value + " " + world_value;
  </script>
</body>
</html>
```

그러나 `module` 개념은 비교적 최근의 개념이기 때문에 오래된 브라우저에서 지원해주지 않는다. 또한, 모듈로 사용되는 js 파일이 수백개 이상이라면, 브라우저는 모든 js 파일을 다운받게 되므로 여전히 성능 문제가 발생할 수 밖에 없다.



### 2. 웹팩의 도입

웹팩은 내부의 코드를 효율적으로 바꿔주고 브라우저에 적합한 코드로 바꿔주는 작업을 수행한다.

#### 1) 웹팩 설치

```shell
# npm 프로젝트 생성
npm init

# webpack 설치
npm install -D webpack webpack-cli
```


#### 2) module 파일 분리

```javascript
// index.js
import hello_value from "./hello.js";
import world_value from "./world.js";
document.querySelector('#target').innerHTML = hello_value + " " + world_value;
```

```html
<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div id="target"></div>
    <script src="./index_bundle.js"></script>
  </body>
</html>
```



#### 3) 웹팩 실행

```shell
# index.js 에서 보고 있는 모든 파일을 하나로 묶어서 index_bundle.js 파일로 만들어줘!
npx webpack --entry ./index.js --output ./public/index_bundle.js
```

- index_bundle.js 파일을 열어보면 import된 모듈이 합쳐지고 결과값을 출력하도록 코드가 작성되어 있다.
- 브라우저의 network 탭을 확인하면 index_bundle.js 파일 하나만 다운받는 모습을 확인할 수 있다.
- 용량을 줄이기 위해, 변수명이나 함수명도 축약형으로 변경되는 것을 확인 할 수 있다.



### 3. 웹팩 설정 파일

프로젝트 루트에 `webpack.config.js` 파일을 생성한다.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  entry: "./index.js", // 시작에 해당하는 파일을 지정한다.
  output: {
    // __dirname : webpack.config.js의 현재 위치를 말하며, 두번째 인자는 나머지 파일 경로
    path: path.resolve(__dirname, "public"),
    filename: "index_bundle.js", 	// 결과로 만들 파일 이름
  }
}
```

```shell
# webpack.config.js을 참고해서 명령을 수행해라
npx webpack --config webpack.config.js

# (동일한 동작) 경로는 생략 가능!
npx webpack
```



### 4. 웹팩의 모드

웹팩은 기본으로 크게 [3가지 모드](https://webpack.js.org/configuration/mode/#root)(`none`, `development`, `production`)를 지원한다.

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  // mode 추가
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index_bundle.js",
  }
}
```

> #### 배포할 예정이라면?
>
> webpack 설정파일을 하나 더 만들고 배포하는 곳에서 해당 웹팩으로 번들링해주면 된다.
>
> ```javascript
> // webpack.config.prod.js
> const path = require('path');
> module.exports = {
>   // [1] mode를 production으로 변경
>   mode: "production",
>   entry: "./index.js",
>   output: {
>     path: path.resolve(__dirname, "public"),
>     filename: "index_bundle.js",
>   }
> }
> ```
>
> ```shell
> # [2] 배포용 웹팩 설정 파일로 번들링
> npx webpack --config webpack.config.prod.js
> ```



### 5. 웹팩 로더

웹팩은 javascript가 아닌, [css와 이미지 파일도 번들링](https://webpack.js.org/guides/asset-management/#root)해준다.

#### 1) css bundling

```shell
# style-loader와 css-loader를 설치
npm install -D style-loader css-loader
```

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "index_bundle.js",
  },
  // loader를 사용할 수 있도록 설정을 추가한다.
  module:{
    rules:[
      {
        // 확장자가 css인 파일을 실행할 때
        test:/\.css$/,
        // css-loader와 style-loader를 사용해 번들링하겠다.
        // [순서 주의] 뒤에 있는 loader부터 실행된다!
        use:[
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
}
```

```javascript
// ./index.js
import hello_value from "./hello.js";
import world_value from "./world.js";

// css import
import css from './style.css'

document.querySelector('#target').innerHTML = hello_value + " " + world_value;
```

- 웹팩이 index.js를 번들리하다가 확장자가 css인 import 문을 만나면, css-loader를 사용해 번들링하는 과정을 수행한다.
- `css-loader`를 이용하면 css를 가져와 자바스크립트 객체 모양으로 만들어 주는데, 이를 DOM에서 사용가능하도록 스타일을 만들어 주입해주는 것이 `style-loader`이다.



> 웹팩에는 다양한 loader가 존재한다. 이미지부터, 폰트, JSON 등 번들링하길 원하는 것은 [여기](https://webpack.js.org/loaders)를 참고하여 사용하면 된다.



### 6. output 설정

최종 결과를 원하는 모습(하나로 합칠까?, 여러개로 쪼갤까?)으로 어떻게 만들어 낼수 있을까?

- 만약 두 파일(index.js, about.js)을 모두 번들링하고 싶다면, 아래처럼 설정을 변경하자!

```javascript
// webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  // [1] entry에 번들링하고 싶은 파일을 추가
  entry: {
    index: "./index.js",
    about: "./about.js",
  },
  // [2] output에 [name]을 넣어준다. 이 부분에는 entry에서 설정한 파일 이름이 들어간다.
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_bundle.js",
  },
}
```

- 결과로 index_bundle.js와 about_bundle.js이 생성된다.



### 7. 웹팩 플러그인

로더를 이용해 번들링한 최종적인 결과물을 변화시키는 것을 플러그인이라고 한다.

- [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)은 번들링한 뒤, 최종적으로 완성된 html 파일을 생성해주는 플러그인이다. 이것을 사용해보자.

```shell
# [1] 플러그인 설치
npm install --save-dev html-webpack-plugin
```

```javascript
// webpack.config.js
// [2] 플러그인은 직접 로드해와야한다.
var HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: "development",
  entry: {
    index: "./index.js",
    about: "./about.js"
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name]_bundle.js"
  },
  // [3] 객체를 직접 생성해서 실행
  plugins:[new HtmlWebpackPlugin()]
}
```

```shell
# 이전 번들링 결과 파일들 삭제
rm -rf public/*.*

# [3] 웹팩 실행
npx webpack
```

- public 폴더 안에 **index.html** 과 index_bundle.js, about_bundle.js 파일이 생성되었다.



> 번들링된 자바스크립트를 포함하여 **최종 번들링의 결과 파일이 index.html 하나만 생성**되게 하고 싶다면?
>
> - [HtmlWebpackPlugin](https://webpack.js.org/plugins/html-webpack-plugin/)의 옵션을 사용해보자.
>
> ```javascript
> module.exports = {
>   mode: "development",
>   entry: {...},
>   output: {...},
>   plugins:[
>     new HtmlWebpackPlugin(
>       {
> 				// 번들링할 html 파일
>         template: './index.html',
>         // ./public(output에서 설정한 경로)/index.html이 생성된다.
>         filename: 'index.html',	
>         /* 
>           - chunks를 설정하지 않으면 번들링된 모든 js 파일이 import된다.
>           - chunks에 들어갈 이름은 entry에서 설정한 name이다.
>           - 해당 js 파일을 번들링한 스크립트가 html 파일에 삽입된다.
>         */
>         chunks: ['index'], 
>       }
>     ),
>     new HtmlWebpackPlugin(
>       {
>         template: './about.html',
>         filename: 'about.html',	
>         chunks: ['about'], 
>       }
>     ),
>   ]
> }
> ```



### 8. 웹팩 자동화

`watch 옵션`은 소스 파일이 변경되었을 때, 자동으로 웹팩이 이를 감지하고 번들링할 수 있도록하는 옵션

```shell
npx webpack --watch
```



### 9. npm 패키지 추가

npm으로 다운받은 패키지를 웹팩에 추가하여 한꺼번에 번들링하는 방법

```shell
# npm으로 lodash 설치 
npm install lodash
```

```javascript
// ./index.js
import hello_value from "./hello.js";
import world_value from "./world.js";

// [1] lodash 추가
import _ from "lodash"
import css from './style.css'

// [2] lodash 사용
document.querySelector('#target').innerHTML = _.join([hello_value,world_value], ' ')
```



### 10. DevServer

개발하다가 필요할 때, 아래 내용을 찾아서 사용해보자!

- `live reload`  :소스코드를 수정하면 자동으로 웹페이지가 리로드 되는 것

- `hot module replacement` : 코드가 수정된 부분만 변경되므로 웹페이지에 입력해둔 정보가 유지된다. 테스트할 때 매우 좋음!

- `code splitting` :  번들링했을 때 거대해진 파일을 쪼개는 것

- `lazy loading` : 쪼개진 파일을 필요할 때마다 로딩

