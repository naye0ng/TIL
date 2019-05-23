# Javascript



## 1. XMLHttpRequest Object

XMLHttpRequest : 브라우저에서 제공하는 웹 API

- addEventListener() : send() 이벤트 이후의 
- JSON.parse() : 자바스크립트 object를 json으로 변환
- JSON.stringify() : json 객체를 자바스크립트의 object로 변환

```javascript
XHR.addEventListener('load',function(e){
    const result = e.target.response
    console.log(result)
    // JSON.parse()
    const jsonObject = JSON.parse(result)
    console.log(jsonObject)
    // JSON.stringify()
    const jsonString = JSON.stringify(jsonObject)
    console.log(jsonString)
})
```



#### (1) GET 요청 보내기

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts/1"

const XHR = new XMLHttpRequest()

XHR.open('GET',URL)
XHR.send()

XHR.addEventListener('load',function(e){
    const result = e.target.response
    console.log(result)
    const jsonObject = JSON.parse(result)
    console.log(jsonObject)
    const jsonString = JSON.stringify(jsonObject)
    console.log(jsonString)
})
```



#### (2) POST 요청 보내기

- setRequestHeader() : 헤더정보를 저장하는 함수

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts/"
const XHR = new XMLHttpRequest()

XHR.open('POST',URL)

XHR.setRequestHeader(
    "Content-type", 
    "application/json;charset=UTF-8"
)

const data = {
    userId : 1,
    title : "제목이다.",
    body : "내용이다."
}

XHR.send(JSON.stringify(data))

XHR.addEventListener('load',function(e){
    const result = e.target.response
    console.log(result)
})
```



#### (3) PUT 요청 보내기

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts/1"
const XHR = new XMLHttpRequest()

XHR.open('PUT',URL)

XHR.setRequestHeader(
    "Content-type", 
    "application/json;charset=UTF-8"
)

const data = {
    id : 1,
    userId : 1,
    title : "제목이다.",
    body : "내용이다."
}

XHR.send(JSON.stringify(data))

XHR.addEventListener('load',function(e){
    const result = e.target.response
    console.log(result)
})
```



#### (4). DELETE 요청 보내기

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts/1"
const XHR = new XMLHttpRequest()

XHR.open('DELETE',URL)
XHR.send()

XHR.addEventListener('load',function(e){
    const result = e.target.response
    console.log(result)
})
```



## 2. fetch()

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts"

const res = fetch(URL).then(function(response){
    return response.json()
})

res.then(function(obj){
    console.log(obj)
})
```

위의 코드를 arrow 함수를 사용하여 줄이면 아래와 같다.

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts"
const res = fetch(URL).then(response => response.json()).then(obj => obj)
console.log(res)
```



## 3. Non-blocking🤟

자바스크립트의 특징 중 하나이다. `Non-blocking`은 `기다리지 않고 실행`한다는 의미를 가지는데, `Asynchronous`*(비동기=순서대로 처리되지 않음=실행흐름을 멈추어서 기다리는 부분없이 즉시 다음 작업을 수행할 수 있도록 만드는 프로그래밍 방식)*를 지원하기 위함이다.

```javascript
// Non-blocking특징으로 인해 동기적(순차적 처리)으로 처리되지 않음
// 실행순서 : (1) => (2) => (3)
// 처리순서 : (1) => (3) => (2)
function timer(t) {
    console.log(`${t}초 뒤에 알람이 울립니다.`) //(1)
    setTimeout(() => {},t*1000) //(2)
    console.log(`${t}초가 지났습니다.`) //(3)
}
timer(3)
```

위의 코드를 실행시키면 3초뒤에 두번째 문장이 실행될 것이라 예상하지만, 바로 첫번째, 두번째 문장이 출력된다.

자바스크립트가 가지는 `Non-blocking`특징으로 인해 setTimeout()은 별도로 진행되고 있으며, 이 함수의 진행을 기다리지 않고 다른 함수(console.log)를 실행시킨다.

```javascript
function timer2(t) {
    console.log(`${t}초 뒤에 알람이 울립니다.`)
    setTimeout(() => {
        console.log(`${t}초가 지났습니다.`)
    },t*1000)
}
timer2(3)
```

위의 코드는 정상적으로 3초뒤에 '3초가 지났습니다.'라는 문장을 실행시킨다.

그렇다면, 위와 같이  `Non-blocking`특징을 자바스크립트가 가지게 된 이유는 무엇일까? 결론부터 말하면 자바스크립트의 쓰레드 환경이 `single thread`이기 때문이다. 아래 코드를 보면, 싱글 쓰레드를 가지기 때문에 문제가 발생한다.

```javascript
// single thread로 인해 브라우저 조작 불가(이떄 브라우저는 blocking되어 있다.)
function sleep(t) {
    let start = Date.now()
    while(Date.now() < start + t*1000){

    }
}
function timer3(t){
    sleep(t)
    console.log(`${t}초가 지났습니다.`)
}
timer3(3)
```

위의 코드는 정상적으로 3초뒤에 '3초가 지났습니다.'라는 문장을 실행시키는 것으로 보이지만, **해당함수가 동작하는 3초 동안 어떤 작업도 할 수 가 없다.**

그렇다면, 자바스크립트의 모든 함수는  `Non-blocking`라고 말할 수 있을까? 아니다!

자바스크립트는 기본적으로 시간이 오래 걸릴 것리라 예상되는 작업을 수행하는 함수에 대해서만  `Non-blocking`을 지원한다. 

즉, 자바스크립트의 `비동기적인 요청` 이라는 것은  `Non-blocking`함수에서만 가능하다는 점이다.

[자바스크립트와 이벤트 루프1](https://meetup.toast.com/posts/89)

[자바스크립트와 이벤트 루프2](https://engineering.huiseoul.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EC%96%B4%EB%96%BB%EA%B2%8C-%EC%9E%91%EB%8F%99%ED%95%98%EB%8A%94%EA%B0%80-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A3%A8%ED%94%84%EC%99%80-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D%EC%9D%98-%EB%B6%80%EC%83%81-async-await%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EC%BD%94%EB%94%A9-%ED%8C%81-%EB%8B%A4%EC%84%AF-%EA%B0%80%EC%A7%80-df65ffb4e7e)



>#### 아래코드의 실행순서는 어떻게 될까?
>
>```javascript
>function first() {
>    console.log('first');
>}
>function second() {
>    console.log('second');
>}
>function third() {
>    console.log('third');
>}
>first();
>setTimeout(second, 1000); 
>third();
>
>// [결과] 
>// first
>// third
>// second
>```
>
>second를 기다리지 않고(Non-blocking) third를 실행시킨다.

