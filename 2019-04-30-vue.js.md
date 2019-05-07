# Javascript - Vue.js

*2019.04.30*



## 1. Vue.js 시작하기

CDN으로 선언하여 사용이 가능하다.

- 상용(배포)버전 : 속도가 빠르고 용량이 최적화되어 있으나, 사람일 읽을 수 없도록 압축되어 있다. 배포할 때만 사용한다.

- 개발 버전 : 사람이 읽을 수 있는 개발용 코드 버전



> #### vue.js CDN의 선언 위치 
>
> [script위치 비교](http://stevesouders.com/examples/rule-js-bottom.php)
>
> html 문서는 위에서부터 읽어진다. 
> script를 load하는 속도가 느리기 때문에, 클라이언트 부분에 지연이 발생할 수 있다. 때문에 맨 아래쪽에 CDN을 선언하여 모든 페이지를 render한 이후 javascript를 load하여 사용한다.
>
> 주의할점 : CDN으로 불러들인 vue.js를 사용하는 위치는 당연히,  CDN아랫쪽이다.



## 2. vue.js를 사용하는 이유

#### (1) SPA (Single Page App) 

#### (2) 하나의 페이지에서 CRUD가 모두 가능하다

#### (3) declarative programming이 가능하다.

> #### [ Imperative programming ]
>
> - 명령적(절차적) 프로그래밍
> - how to : 어떻게 동작하는지 하나하나의 step을 모두 정의하는 방식
> - 컴퓨터적인 사고 로직
>
>   > 집에 가라 : 걸어서 => 지하철 타고 => 버스로 갈아타고 => 집으로 걸어서 => 문열고 도착
> - 명령적은 이해하기 어렵기 때문에 더욱 인간적이고, 자연스러운 프로그래밍 방식이 필요해졌다.
>
>   > ORM, OOP
>
> #### [ Declarative programming ]
>
> - 선언적 프로그래밍
>
> - what : 무엇을 할지만 생각, detail을 고민하지 않음. 목표로 하는 행동을 수행
>
> - 일반적인 사고 로직 
>
>   > 집에 가라 : 집에 간다....

- declarative programming방식이 더 편리하다. 

- 즉, js가 수행하는 모든 로직과 비동기적인 처리를 직접하는 것이 아닌, Vue.js에게 시키는 것이라고 이해할 수 있다.



## 3. Vue 선언

script 문서에 vue 객체를 생성하여 시작한다.

vue 객체에 우리가 무엇을 수행할 것인지를 정의하여 html 파일에 적용하면, vue객체가 알아서 모든 비동기 처리를 수행한다.

vue.js를 배운다 = vue 객체에 어떤 인자를 전달하는지 배운다.

우리는 무엇을 할 것인지만 잘 정의하면 된다.

### 3-1. 요소

`주어`, `목적어`, `동사`라는 구조로 생각하자

#### el 

- 주어 : **vue 객체를 적용할 html element(id, tag, class...)**를 선언한다.
- 본인이 생각하는 vue 객체를 el에서 정의된 element에 적용(**mount**)한다.

#### data 

- 목적어 : **html에 표현할, 혹은 html에서 조작할 data**를 object로 선언한다.
- vue객체가 이런 data를 조작하고 표현할 것이다.

#### methods

- 동사 : 조작할 행위를 function으로 정의한다.
- 주의할 점 : arrow function 사용 불가능 
  - vue 내부의 this를 파괴한다.

```html
<script>
    // vue 객체를 선언하여 
    let app = new Vue({
        el : '#app',	// id가 app인 개체를 마운트한다.
        data : {		// el에서 마운트한 객체에 표현할 데이터
            msg : 'hello world!',
            age : 26,
        },				// 조작할 행위 표시
        methods : {
            plus : function(){
                this.age += 1
            }
        }
    })
</script>
```



### 3-2. html에서 data의 사용

vue 객체에서 정의한 data를 html 문서에서 사용

html 문서는 최대한 간단하게, 대부분의 data 렌더를 vue.js가 하도록 작성

#### (1) data 출력

-  {{ }} : django template처럼 중괄호 2개 사용하여 출력

```html
<div id="app">
    <h1>
        {{ msg }} <!-- msg 데이터를 출력 -->
    </h1>
</div>
```



#### (2) html tag로 적용

- v- :  vue에게 명령을 시키겠다.
- tag 내부의 v-html 속성에 data 선언

```html
<span v-html="msg"></span>
```

- v-html 속성 : 전달받은 data에 해당하는 tag 적용
- 작동방식 : vue.js가 v-html 태그를 찾아서 html 문서로 rendering



#### (3) iteration

- list, object를 순회하여 요소에 접근
- html 문서에서 index 접근 가능
- v-for 속성에서 iteration문 선언

**[ list, object 선언 ]**

```javascript
data : {
    todos : ['빨래 돌리기','vue.js 배우기','javscript 복습'],
    posts : [{
        id : 1,
        content : '1번 글',
        checked : false
    },{
        id : 2,
        content : '2번 글',
        checked : false
    },{
      	id : 3,
        content : '3번 글',
        checked : true 
    }],
}
```



### 3-3. 반복문

**[ index 접근, iteration ]**

- v-for

```html
<!-- index 접근 -->
<ul>
    <li>{{ todos[0] }}</li>
    <li>{{ todos[1] }}</li>
    <li>{{ todos[2] }}</li>
    <li>{{ todos[3] }}</li>
</ul>

<!-- iteration -->
<ul>
    <li v-for="td in todos">{{ td }}</li>
</ul>
```

**[ dictionary 요소 순회시 value 값을 반환한다. ]**

```html
<!-- 2중 iteration -->
<ol v-for="post in posts">
    <li v-for="p in post">
        {{ p }}	<!-- 각 post의 element의 value값 반환 -->
    </li>
</ol>
```



### 3-4. 조건문

- v-if

```html
<p v-if="post.checked">
    {{ post }}	<!-- post.checked가 ture면 post 출력 -->
</p>
```

**[ iteration 접근, 조건문 중첩사용 가능 ]**

```html
<ol>
    <li v-for="post in posts" v-if="post.checked">
    	<ul>
            <li v-for="c in post">{{ c }}</li>
        </ul>
    </li>
</ol>
```



### 3-5. console 창에서의 사용

el, data에 속한 데이터는 $el, $data를 통해 접근

그러나, methods는 바로 접근 가능

```
app.$data.age
app.$data.msg

app.plus()
```



## 4. MVVM 구조

js에서 Model, Controller, View각 파트가 동작하는 구조

django의 MTV 패턴과 유사



### 4-1. django와 비교

| vue.js                       | django    |
| ---------------------------- | --------- |
| **M**odel                    | **M**odel |
| **V**iew                     | **V**iew  |
| **V**iew **M**odel(Vue 객체) | **V**iew  |



### 4-2. View Model의 역할

실시간으로 데이터를 처리하고 View로 넘긴다.

#### (1) form

Django : input 데이터를 보내는 순간 데이터를 처리하고 리다이렉트가 일어난다.

Vue.js : 실시간으로 input에 담긴 데이터를 받아 처리하고 즉시 출력한다.



#### (2) v-model

- 입력 데이터를 변수에 동적으로 바인딩!

```html
<body>
    <div id="app">
        <h1>{{ header }}</h1>
        <h2>{{ subHeader }}</h2>
        <p>{{ content }}</p>    
        
        <!-- 입력을 content에 동적으로 바인딩. 들어오면 바로바로 연결 -->
        <!-- input에 값을 입력하는 순간 content의 값이 실시간으로 변한다. -->
        <input v-model="content">   
    </div>
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <script>
        let app = new Vue({
            el: '#app',

            data: {
                header: 'Todo App',
                subHeader: '이것은 Todo app 입니다.',
                content: '할일을 입력해주세요',
            },
        })
    </script>
</body>
```

