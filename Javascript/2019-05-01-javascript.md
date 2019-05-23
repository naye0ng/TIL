# Javascript - Vue.js

*2019.05.01*



## 1. vue.js directive

v-once : 한 번만 바인딩

v-on : 이벤트 핸들링 

v-bind : Vue를 바인딩

v-model : 사용자의 입력값을 양방향 데이터바인딩

> `v-bind` 디렉티브는 단방향 데이터바인딩을 통해 기존 데이터를 렌더하는 역할을 하고 `v-model` 디렉티브는 사용자가 입력한 값을 양방향 데이터바인딩으로 모델의 속성에 업데이트해주는 역할을 하기 때문이다.



## 2. Vue를 이용한 Todo app

```html
<body>
    <div id="app">
        <h1>{{ header }}</h1>
        <h2 v-once>{{ subHeader | capitalize}}</h2>
        <h3>{{ hello() }}</h3>

        <p>{{ content }}</p>   
        <input v-model="content">   
        <button v-on:click="addTodo">추가</button>
        <!--button v-on="{click:addTodo, mouseenter:addTodo}">추가</button-->

        <ul>
            <li v-for="todo in todos">{{todo}}</li>
        </ul>

        <img v-bind:src="image">
        <br>
        <a v-bind:href="link">삼성 홈페이지</a>
    </div>
    <script src="vue.js"></script>    
</body>
```
#### 주요 기능
1. 리다이렉트 없이 input값 제어하기
2. 로컬스토리지 제어하기

```javascript
const STORAGE_KEY = 'vue.app'
// 로컬 스토리지 객체안에 fetch()와 save()를 정의한 것
let todoStorage = {
    fetch : function(){
        // 로컬 스토리지에 값이 아무것도 없으면, '[]'을 반환
        // 빈배열을 넣어주는 이유는 아래쪽에 addTodo의 push에서 오류가 발생하기 때문!
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    },

    save : function(todos){
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
}

let app = new Vue({
    el: '#app',

    data: {
        header: 'Todo App',
        subHeader: 'this is todo app.',
        content: '',
        image : '이미지 url',
        link : 'https://www.samsung.com',
        todos : todoStorage.fetch(),
    },
    methods : {
        hello: function() {
            this.subHeader = "소풍가고 싶어요!"
            return this.subHeader
        },
        addTodo : function() {
            this.todos.push(this.content)
            this.content = ''
        } 
    },
    filters : {
        capitalize : function(val) {
            // val을 capitalize하는 함수
            if(!val) return ''
            val = val.toString()
            return val.charAt(0).toUpperCase() + val.slice(1)
        }
    },
    // 데이터의 변화 상태를 지켜보는 함수
    // 데이터가 변화 할 때 xxx를 하게 만들 수 있다.
    // todos에 새로운 데이터가 들어오면, localstorage에 저장하는 함수를 정의한다.
    watch : {
        // watch는 this 안써도 된다.
        todos : {
            // handler에는 todos의 내용이 그대로 인자로 들어간다.
            handler : function(todo_list) {
                // todos에 일이 일어나면, 이 일을 수행하겠다.
                todoStorage.save(todo_list)
            }
        }
    }
})
```

