# Javascript 

*2019.04.23*



>### vscode extensions
>Live Server : vscode 상에서 변경된 내용을 로컬에서 바로 확인 가능
>JavaScript (ES6) code snippets
>Bracket Pair Colorizer 



## 1. Javascript function

자바스크립트에서는 여러가지 방법으로 함수 선언이 가능하다.

### 1-1. 함수선언식

```javascript
function sum1(a,b){
    return a+b
}
```



### 1-2. 익명함수를 선언 => 변수에 할당

```javascript
let sum2 = function(a,b){
    return a+b
}
```



### 1-3. ES6 Arrow Function🤟

얘도 마찬가지로 익명함수 : 함수 선언할때 이름이 없음

```javascript
let sum3 = (a, b) => {
    return a+b
}

// 4. ES6 Arrow Function 축약, return 생략가능!
let sum4 = (a, b) => a+b 
```
<br>

>#### 자바스크립트의 this
>
>```javascript
>let sum2 = function(a,b){
>    this // 실행 시점에서의 함수 객체를 바라봄
>    return a+b
>}
>```
>
>```javascript
>let sum3 = (a, b) => {
>    this // 생성 시점의 함수 객체를 바라봄
>    return a+b
>}
>```



## 2. ES6 array helper methods🤟

[ES6 array helper methods ](http://gnujoow.github.io/dev/2016/10/14/Dev6-es6-array-helper/) 참고

### 2-1. forEach() 메서드를 이용한 순회

forEach 메서드는 리스크를 순회하면서 각 리스트의 원소에 선언된 조작을 수행한다.

```javascript
let menu = ['짜장면', '짬뽕','김밥']

// 1. forEach() 메서드를 이용한 순회(1)
menu.forEach(function(a){
    console.log(a)
})

// 2. forEach() 메서드를 이용한 순회(2) : ES6 Arrow function
menu.forEach(a => {
    console.log(a)
})
```

> **[문제1] forEach를 통해 순회하여 id가 2번인 post의 title를 찾으세요.**
>
> ```javascript
> const posts = [
>     {id:1, title:'안녕'},
>     {id:2, title:'자바스크립트'},
>     {id:3, title:'브라우저조작'},
> ]
> // [답]
> posts.forEach(post => {
>     if(post.id === 2){
>         console.log(post.title)
>     }
> })
> ```

> **[문제2] images의 넓이를 구해 area에 넣으세요.**
>
> ```javascript
> const area = []
> const images = [
>     {height: 10, width:30},
>     {height: 20, width:90},
>     {height: 50, width:40},
> ]
> // [답]
> images.forEach(image => {
>     area.push(image.height*image.width)
> })
> ```



### 2-2. map()

map 메서드는 forEach와 의미상으로 비슷해보이지만 새로운 값을 리턴해준다는 점이 다르다.
> **[문제1] squaredNumbers를 numbers의 요소의 제곱을 한 숫자들의 배열로 만드시오.**
>
> ```javascript
> let squaredNumbers = []
> const numbers = [1,2,3,4,5,6]
> 
> // [답(1)]
> squaredNumbers = numbers.map(function(number){
>     return number*number
> })
> ```
>
> ```javascript
> let squaredNumbers = []
> const numbers = [1,2,3,4,5,6]
> 
> // [답(2)]
> squaredNumbers = numbers.map(number => number*number)
> ```



### 2-3. find()

return 구문에 찾으려고하는 값의 조건식을 써준다.

> **[문제] username이 tony인 사람을 찾아라.**
>
> ```javascript
> let users = [
>     {id:1, username:'tony'},
>     {id:2, username:'tom'},
>     {id:3, username:'nana'},
>     {id:4, username:'tony'},
> ]
> // [답]
> const tony = users.find(function(user){
>     return user.username === 'tony'
> })
> // [결과]
> console.log(tony)
> // {id: 1, username: "tony"}
> ```



### 2-4. filter()

find는 동일한 조건이 여러개 있어도 가장 앞에 있는 값 1개만 뽑아준다. 반면, filter는 조건에 맞는 모든 값을 찾아준다.

> **[문제] username이 tony인 사람을 모두 찾아라.**
>
> ```javascript
> let users = [
>     {id:1, username:'tony'},
>     {id:2, username:'tom'},
>     {id:3, username:'nana'},
>     {id:4, username:'tony'},
> ]
> // [답]
> const tonys = users.filter(function(user){
>     return user.username === 'tony'
> })
> console.log(tonys) // 리스트 형식으로 출력됨
> ```



### 2-5. every()

리스트의 모든 원소를 조건식과 검사하여 모든 원소가 해당 조건를 통과하면 true, 아니면 false를 반환한다.

```javascript
const everyTony = users.every(function(user){
    return user.username === 'tony'
})
console.log(everyTony)
// [결과]
// false
```

```javascript
const everyTony2 = users.every(function(user){
    return user.id < 5 
})
console.log(everyTony2)
// [결과]
// true
```



### 2-6. some()

해당 조건을 만족하는 원소가 하나라도 존재한다면 true, 아니면 false

```javascript
const someTony = users.some(function(user){
    return user.username === 'tony'
})
console.log(someTony)
// [결과]
// true
```

```javascript
const someTony2 = users.some(function(user){
    return user.username === 'any'
})
console.log(someTony2)
// [결과]
// false
```




## 3. ===를 사용하는 이유🤟

### 3-1. type coercion

자바스크립트에서 일어나는 형변환. 즉, 아래코드의 age의 type은 `string`인데도 숫자비교연산에서 에러가 발생하지 않는 이유이기도 하다.

```javascript
const age = prompt('나이를 입력하세요.')

if(age>30){
    alert('아재')
}else if(age>20){
    alert('학식')
}else if(age>8){
    alert('급식')
}else{
    alert('이유식')
}

alert(typeof age) //string
```

```javascript
if("34"==34){
    console.log('같다.')
}else{
    console.log('다르다.')
}
// [결과]"같다."
```

당연히 '다르다'가 출력될 것 같지만, 자바스크립트의 type coercion으로 인해 '같다'가 출력된다.



### 3-2. ===

```javascript
if("34"===34){
    console.log('같다.')
}else{
    console.log('다르다.')
}
// [결과]"다르다."
```






## (+) 추가
###  A. reject() 선언

reject : 해당하는 조건이 아닌 원소를 리턴하는 함수

#### (1) 내 함수

```javascript
function reject(array, func){
    return array.filter(a => a.username!==func)
}
const notTony = reject(users,'tony')
```



#### (2) 함수를 인자로 받기🤟

```javascript
function reject(array, func){
    //filter도 리턴을 해줘야 reject함수 전체에서 리턴이 생김
    return array.filter(function(user){
        return !func(user)
    })
}

const notTony = reject(users, function(user){
    return user.username === 'tony'
})
```

```javascript
function reject(array, func){
    return array.filter(user => !func(user))
}

const notTony = reject(users, function(user){
    return user.username === 'tony'
})
```



### B. 자바스크립트 

#### (1) querySelector()

dom 객체를 id, tag, class로 가져오는 함수

```javascript
const crong = document.querySelector('#crong')
```



#### (2) addEventListener(event, function)

사용자가 브라우저를 조작하면서 일어나는 event를 감지하면 function을 수행한다.

**[1] 그림을 클릭하면 alert**

```javascript
crong.addEventListener('click', function(e){
    alert("croooong!!!!");
})
```

**[2] 키보드 눌림 이벤트**

```javascript
document.addEventListener('keydown',function(e){
    console.log(e)  
})
/*
눌린 키보드 값이 e객체에 전달됨을 확인할 수 있다.
KeyboardEvent {isTrusted: true, key: "ArrowLeft", code: "ArrowLeft", location: 0, ctrlKey: false, …}
app.js:8 KeyboardEvent {isTrusted: true, key: "ArrowRight", code: "ArrowRight", location: 0, ctrlKey: false, …}
app.js:8 KeyboardEvent {isTrusted: true, key: "ArrowDown", code: "ArrowDown", location: 0, ctrlKey: false, …}
app.js:8 KeyboardEvent {isTrusted: true, key: "ArrowUp", code: "ArrowUp", location: 0, ctrlKey: false, …}
app.js:8 KeyboardEvent {isTrusted: true, key: " ", code: "Space", location: 0, ctrlKey: false, …}
*/
```
키보드 이벤트로 이미지를 제어해보자!
```javascript
document.addEventListener('keydown',function(e){
    if (e.code === 'Space') {
        console.log("스페이스를 누르셨네여")
    } else if(e.code == 'ArrowUp'){
        crong.style.marginBottom = '100px'
    } else if(e.code == 'ArrowLeft'){
        crong.style.marginRight = '100px'
    } else if(e.code == 'ArrowRight'){
        crong.style.marginLeft = '100px'
    } else if(e.code == 'ArrowDown'){
        crong.style.marginTop = '100px'
    }
}) 
```

그런데 나라별로 키보드의 code값이 달라진다. 그러므로 keycode를 사용하도록 하자! [keycode 확인](http://keycode.info/)