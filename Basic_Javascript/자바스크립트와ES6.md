# 자바스크립트와 ES6

> ECMAScript6



## I. let, const 키워드

###1. ` let`, `const` vs `var`

- `let`, `const`는 블록레벨 스코프를 가진다. 즉, 블록 내에서 선언된 코드는 블록 외부에서 참조할 수 없다.

- 변수의 중복 선언이 금지된다.

  ```javascript
  let foo = 1
  {
    let foo = 2
    let foo = 3	// SyntaxError
  }
  ```

- 호이스팅이 발생하지만 선언과 함께 undefined로 초기화가 일어나는 `var`와 다르게, `let`, `const`는 선언만 일어고 초기화는 할당문에서 일어난다. 즉, 선언(블록의 최상단)과 할당(변수 선언문)사이에 일시적 사각지대(TDZ)가 생긴다.

  ```javascript
  let foo = 1	// 전역
  {
    console.log(foo)	// 1
  }
  ```
  ```javascript
  {
    // 지역 변수 foo는 여기에 호이스팅되지만 초기화 안됨
    console.log(foo)	// ReferenceError - 지역 변수 foo를 참조하기 때문
    let foo = 2	// 지역
  }
  ```
  ```javascript
  {
      let foo	// 선언문을 만났을 때, 초기화 undefined
      console.log(foo)	// undefined
      foo = 3	// 할당
      console.log(foo)	// 3
  }
  ```

- 전역 프로퍼티에 등록되지 않는다. 보이지 않는 전역 블록`{}` 내에 존재한다고 생각하자

  ```javascript
  //var로 선언하면 전역 객체의 프로퍼티에 등록된다.
  var foo = 1
  console.log(window.foo)	// 1 
  
  // let, const 키워드는 전역 객체의 프로퍼티에 등록되지 않음
  let bar = 1
  console.log(window.bar)	// undefined
  ```



### 2. `let` vs `const`

- `const`는 상수를 가리키며, 재할당이 금지된다. 또한, 재할당이 불가능하므로 반드시 **선언과 동시에 할당**이 이뤄져야 한다.
- 객체의 내용이 변경되더라도 객체 타입 변수에 할당된 주소값은 변경되지 않기 때문에, `const`로 선언된 객체의 프로퍼티는 변경 가능하다. 



## II. 프로미스(Promis)

자바스크립트는 비동기 처리를 위해 콜백 함수를 사용한다. 하지만 콜백 패턴을 가독성이 나쁘고 비동기 처리중 발생하는 에러의 예외처리가 곤란하다. 또한, 여러개의 비동기 처리 로직을 한꺼번에 처리하는 것도 한계가 있다. `Promis`는 전토적인 콜백 패턴이 가진 단점을 보완하며 비동기 처리 시점을 명확하게 표현한다.



### A. 콜백 패턴의 단점💡

비동기 함수를 사용할 때(DOM 이벤트, 타이머, ajax요청 등) 서버로부터 데이터가 요청이 완료되는 시점을 예상하기 힘들다. 그래서 콜백함수를 사용한다. 비동기 작업이 진행되는 중에 다른 작업을 진행하고 비동기 작업이 완료되면 콜백함수를 꺼내어 결과를 바탕으로 남은 작업을 진행한다.



#### 1. 콜백 헬(Callback Hell)

비동기 작업은 순서가 보장되지 않는다. 그래서 콜백함수를 사용하여 비동기 요청의 순서를 보장하는데, 이런 콜백 함수를 여러개 중첩해서 사용하는 경우 복잡도가 높아지는 **콜백 헬**이 발생한다. 콜백 헬은 가독성을 나쁘게 하고 실수를 유발하는 원인이 된다.

```javascript
step1(function(value1) {
  step2(value1, function(value2) {
    step3(value2, function(value3) {
      step4(value3, function(value4) {
        step5(value4, function(value5) {
            // value5를 사용하는 처리
        })
      })
    })
  })
})
```

> 정리하면, 만일 비동기 함수의 처리 결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 함수의 호출이 중첩(nesting)이 되어 복잡도가 높아지는 현상이 발생하는데 이를 **Callback Hell**이라 한다.



#### 2. 에러 처리의 한계

```javascript
try {
  setTimeout(() => { throw new Error('Error!') }, 1000)
} catch (e) {
  console.log('에러를 캐치하지 못한다..')
  console.log(e)
}
```

setTimeout함수는 비동기 함수이므로 call stack에서 사라진다. 1초 뒤, 콜백함수(에러발생시키는 함수)가 테스크 큐에 들어가고 이것이 다시 call stack으로 이동해서 에러를 발생시킨다.

call stack에 setTimeout함수가 존재하지 않으므로 **해당 콜백함수를 호출한 함수가 setTimeout함수가 아니라는 말**이고, 예외는 호출자 방향으로 전파되기 때문에 setTimeout함수로 예외가 전달되지 않는다. 즉, 예외를 감지할 수 없게 된다.



### B. 프로미스의 생성💡

위와 같은 콜백함수의 문제를 극복하기 위해 프로미스가 제안되었다. 

프로미스는 생성자 함수를 통해 인스턴스화된다. Promis 생성자 함수는 비동기 작업을 수해할 함수를 인자로 전달받는데, 이 콜백 함수는 `resolve`, `reject `함수를 인자로 받는다.

```javascript
const Promise = new Promise((resolve, reject)=>{
  // 비동기 작업 수행
  if (/*비동기 작업 성공*/){
    resolve('성공한 값')
	}else{
    reject('실패한 이유')
  }
})
```

프로미스는 비동기 처리가 성공인지 실패인지 상태 정보를 갖는다.

| 상태      | 의미                                       | 구현                                   |
| --------- | ------------------------------------------ | -------------------------------------- |
| pending   | 비동기 처리 수행 중                        | `resolve` 또는 `reject `함수 실행 전   |
| fulfilled | 비동기 처리 수행 완료(성공)                | `resolve` 함수 호출된 상태             |
| rejected  | 비동기 처리 수행 완료(실패)                | `reject `함수 호출된 상태              |
| settled   | 비동기 처리 수행되고 모든 처리가 끝난 상태 | `resolve` 또는 `reject `함수 실행 완료 |



### C. 프로미스의 후속 처리 메소드 - `then`, `catch`💡

romise 객체는 상태에 따라 후속 처리 메소드를 체이닝 방식으로 호출한다. 

#### `then(Func1, Func2)`

- 두 개의 콜백 함수를 인자러로 받는다.
- Func1은 성공(fulfilled)시 실행되고, Func2는 실패(rejected)시 실행된다.

#### `catch`

- 비동기 처리 과정에서 발생한 에러와 then 메소드에서 발생한 에러를 처리한다.

```javascript
const promiseAjax = (method, url, payload) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(payload));

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== XMLHttpRequest.DONE) return;

      if (xhr.status >= 200 && xhr.status < 400) {
        resolve(xhr.response); // Success!
      } else {
        reject(new Error(xhr.status)); // Failed...
      }
    };
  });
};

promiseAjax('GET', 'http://jsonplaceholder.typicode.com/posts/1')
  .then(JSON.parse)
  .then(render)
  .catch(console.log);
```



## III. 제너레이터와 async/await

> 이터러블은 Symbol.iterator 메소드를 구현하거나 프로토타입 체인에 의해 상속한 객체를 말한다. 이터러블은 for…of 문에서 순회할 수 있으며 Spread 문법의 대상으로 사용할 수 있다.



### 1. 제너레이터

제너레이터 함수는 이터러블을 생성하는 함수이다.

1. 이터러블을 구현한다.
2. 비동기 처리를 진행한다. 즉, 비동기 퍼리 함수가 처리 결과를 반환하도록 구현할 수 있다.



###2. async/await

```javascript
async function 함수명() {
  await 비동기_처리_메서드_명();
}
```

먼저 함수의 앞에 `async` 라는 예약어를 붙이고 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 `await`를 붙인다. 주의할 점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 `await`가 의도한 대로 동한다.

```javascript
function fetchItems() {
  return new Promise(function(resolve, reject) {
    var items = [1,2,3];
    resolve(items)
  });
}

async function logItems() {
  var resultItems = await fetchItems();
  console.log(resultItems); // [1,2,3]
}
```

- 만약 asymc, await를 붙이지 않으면 그냥 프로미스 객체가 먼저 반환되어 fetchItems() 내부의 비동기 결과가 반영되지 않은 값이 resultItems에 저장된다. 



## IV. 화살표 함수(Arrow function)

화살표 함수(Arrow function)는 function 키워드 대신 화살표(=>)를 사용하여 보다 간략한 방법으로 함수를 선언할 수 있게도록 한다.

```javascript
x => {return x*x}
x => x*x // 중괄호를 생략하면 암묵적으로 return이 일어난다.

() => ({ a: 1 }) // 객체를 반환하고 싶다면 소괄호 사용

() => { 
  const x = 10;
  return x * x;
};

const pow = x => x*x
pow(10)	// 100
```

화살표 함수는 익명 함수로만 사용할 수 있으며, 주로 콜백 함수로 이용된다.



#### 화살표 함수의 this

일반함수와 화살표 함수의 가장 큰 차이는 this이다.

화살표 함수는 함수를 선언할 때 this에 바인딩할 객체가 정적으로 결정된다. 즉, **선언 시점을 따르는 렉시컬 스코프를 따른다.**

물론 화살표 함수의 this도 call/apply/bind 함수를 통해 this를 변경할 수 있다.

> 화살표 함수는 객체 **내부 메서드**를 선언할 때 사용하면 안된다. 렉시컬 스코프를 따르므로 내부 메서드가 객체가 아닌 전역 window를 가리키게 되기 때문이다.
>
> 마찬가지로 **addEventListener 함수의 콜백 함수**를 화살표 함수를 사용하면 해당 요소 객체가 아닌 전역 window를 가리키므로 사용해선 안된다.



## V.  ETC

> `Babel`는 최신 사양의 자바스크립트 코드를 IE나 구형 브라우저에서도 동작하는 ES5 이하의 코드로 변환(트랜스파일링)할 수 있다.

>`Webpack`은 의존 관계에 있는 모듈들을 하나의 자바스크립트 파일로 번들링하는 모듈 번들러이다.
>
> Webpack을 사용하면 의존 모듈이 하나의 파일로 번들링되므로 별도의 모듈 로더가 필요없다. 그리고 다수의 자바스크립트 파일을 하나의 파일로 번들링하므로 html 파일에서 script 태그로 다수의 자바스크립트 파일을 로드해야 하는 번거로움도 사라진다.
>
>즉, `Webpack`은 파일의 종속성을 스스로 파악하여, 종속성이 있어 서로 엮여 있는 파일을 하나의 파일로 묶어주는 역할을 한다.