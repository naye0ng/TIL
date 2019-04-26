# Javascript



## 1. Callback 함수

```javascript
const orderCoffee = (coffee, callback) => {
    setTimeout(() => {
        callback(coffee)
    }, 1000);
}
const coffee = orderCoffee('아이스아메리카노',(coffee) =>{
    console.log(coffee)
})
```



## 2. Promise 객체

프로미스는 자바스크립트 비동기 처리에 사용되는 객체이다. 

(*자바스크립트의 모든 함수는 return값을 가지고 있다. 우리가 함수를 선언할 때 return값을 반환하지 않으면 undefined가 반환된다.*)

Promise는 return으로 자기 자신을 리턴(Promise)하므로 아래와 같이 체이닝을 해도 문제가 발생하지 않는다.

```javascript
new Promise().then().then().then()....
```

.then() : 성공시 결과를 넘겨줌

.catch() : 실패시 결과를 넘겨줌



### 2-1. Promise 정의해서 사용하기🤟

```javascript
// orderCoffee는 Promise 객체를 리턴하는 함수라고 생각하면 된다.
// resolve : 성공했을 때 넘겨주는 값
// reject : 실패했을 때 넘겨주는 값
const orderCoffee = (order) => new Promise((resolve, reject)=>{
    //비동기 작업
    if(order === undefined){
        // 주문 실패
        reject("손님 주문 안하셨는데요;;")
    }
    let coffee
    setTimeout(() => {
        // 성공했을 때
        coffee = order
        resolve(`${coffee} 나왔습니다.`)
    }, 1000);
})
```
[1] order에 값이 있을 때 **resolve함수가 실행**되고, promise의 상태가 resolved가 되며 **then()함수가 수행**된다.

```javascript
orderCoffee('아이스아메리카노')
    .then(coffee => { // resolve의 값이 반환된다.
        console.log(coffee)
    })
    .catch(error => { // reject의 값이 반환된다.
        console.log(error)
    })
// [결과] 아이스아메리카노 나왔습니다.
```
[2] order 값이 없으므로(undefined) **reject함수가 실행**되고 promise의 status가 rejected가 되고 바로 **catch()함수**를 찾아서 수행한다.

```javascript
orderCoffee()
    .then(coffee => { // resolve의 값이 반환된다.
        console.log(coffee)
    })
    .catch(error => { // reject의 값이 반환된다.
        console.log(error)
    })
// [결과] 손님 주문 안하셨는데요;;
```

[3] **체이닝** 사용해보기🤟

- 아래와 같이 then함수를 통해 계속해서 주문을 넣을 수 있다.
- 하지만 에러가 발생한다면 catch함수가 호출되고 체이닝이 끝난다.

```javascript
orderCoffee('아이스아메리카노')
    .then(coffee => { // resolve
        console.log(coffee) //아이스메리카노
        return orderCoffee('라떼')
    })
    .then(coffee=>{
        console.log(coffee) //라떼
    })
    .catch(error => { // reject
        console.log(error)
    })
// [결과] 
// 아이스아메리카노 나왔습니다.
// 라떼 나왔습니다.
```



### 2-2. 제공되는 Promise() 함수 사용하기

```javascript
fetch("https://koreanjson.com/posts/1")
    .then(response => response.json())
    .then(post => console.log(post))
    .catch(error => console.log(error))
```



## 3. async, await 키워드🤟

`async` : 함수선언 시 사용하는 키워드로써, 함수 내부에 비동기적인 작업이 있을 것임을 알린다.

`await`: 실제로 비동기적으로 처리되는 함수 앞에 선언하여, 해당 함수의 작업이 완료될 때까지 기다리라는 것을 알림

*위의 키워드를 사용하게 되면 then()을 사용하지 않고 비동기적 처리를 제어할 수 있다.*

```javascript
const orderCoffee = (order) => new Promise((resolve, reject)=>{
    if(order === undefined){
        reject("손님 주문 안하셨는데요;;")
    }
    let coffee
    setTimeout(() => {
        coffee = order
        resolve(`${coffee} 나왔습니다.`)
    }, 1000);
})
// async : getCoffee함수 내부에 비동기 로직이 있는데,
// await : orderCoffee함수가 바로 비동기 작업인데 이걸 기다려줘
const getCoffee = async (order) => {
    const coffee = await orderCoffee(order)
    console.log(coffee)
}
getCoffee("따아")

/* 위의 코드를 then()을 사용하게되면 아래와 같다! 
const coffee = orderCoffee("따아").then( coffee =>{
    console.log(coffee)    
})
*/
```



>#### [문제] 아래의 함수를 async, await를 사용하도록 고쳐보자
>
>```javascript
>fetch("https://koreanjson.com/posts/1")
>    .then(response => response.json())
>    .then(post => console.log(post))
>    .catch(error => console.log(error))
>```
>
>[답]
>
>```javascript
>const getPost = async () =>{
>    const res = await fetch("https://koreanjson.com/posts/1")
>    const post = await res.json()
>    console.log(post)
>}
>getPost()
>```
>위의 fetch를 보면 then을 두번 쓰고 있음을 알 수 있다. 즉, 비동기함수의 호출이 두번 일어났음을 알 수 있다. 
>
>첫번째 비동기함수는 fetch()일 것이며, 두번째 비동기함수는 json()일 것이므로 await를 두번 사용하도록 하자.

