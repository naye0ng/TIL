# Javascript 

*2019.04.22*



## 1. 자바스크립트 기본

### 1-1. 자바스크립트의 역사

1990년대 Netscape와 MS사의 브라우저 경쟁으로 각각의 브라우저는 독자적인 기능을 Javascript에 추가함으로써 비표준 기능들을 양산하게 된다. 때문에 어느 한쪽에서 작동하는 Javascript 코드가 다른 쪽에서 작동하지 않는 일이 발생한다. 이후 크롬, 파이어폭스 등의 등장과 더불어 자바스크립트 표준화의 중요성이 대두되면서 ECMA의 표준을 따르는 것을 권장하고 있다.



### 1-2. 자바스크립트 - 브라우저 조작

- BOM(Browser Object Model) : 브라우저 제어

```javascript
window.innerWidth
649 // 현재 브라우저의 넓이 출력
```

- DOM(Document Object Model) : 브라우저 상에 띄어지는 document객체 조작

```javascript
window.document.title = "현재 페이지의 제목 변경"
```



## 2. 자바스크립트 원시 자료형(Primitive Data Type)

|        자료형         |                                                              |
| :-------------------: | ------------------------------------------------------------ |
|        string         | 텍스트 데이터를 나타내는데 사용                              |
|        number         | 숫자형 데이터, 정수만을 표현하기 위한 특별한 자료형은 없다.  |
|        boolean        | Boolean 은 논리적인 요소를 나타내고, `true` 와 `false` 의 두 가지 값을 가질 수 있다. |
|         null          | Null 타입은 딱 한 가지 값, `null` 을 가질 수 있다.           |
|       undefined       | 값을 할당하지 않은 변수는 `undefined` 값을 가진다.           |
| sysmbol(ECMAScript 6) | Symbol은 **유일**하고 **변경 불가능한** (immutable) 기본값 (primitive value) 이다. 또한, 객체 속성의 key 값으로도 사용될 수 있다. |

자바스크립트에서 `typeof null`의 결과는 'object'이고, 이 의미는 null을 객체라고 잘못 알려주고 있다. null은 원시타입이다. 이것은 자바스크립트가 기존코드와의 하위호환을 지키기위해 유지하고 있는 일종의 버그이다.

자바스립트에서는 위의 원시 자료형(Primitive Data Type)을 제외하면 모든 것이 객체(사용자 정의 자료형, Array, Function => Object)다.

<br>

> #### immutable VS  mutable
> 원시 자료형 : immutable(변경 불가능한 값)
> 사용자 정의 자료형(객체) : mutable



## 3. 자바스크립트 자료형(mutable)

### 3-1. 변수

#### (1) var

**함수형 스코프**를 가지는 자료형

#### (2) const

**블록형 스코프**, 다시 설정하지 않는 변수형

```javascript
const name = "nayeong";
name = "nana"; 
//Uncaught TypeError: Assignment to constant variable.
```

#### (3) let 

**블록형 스코프**, 다시 설정할 변수형

```javascript
let name = "nayeong";
name = "nana";
```



> #### 함수형 스코프 VS 브록형 스코프
> ##### (1)  함수형 스코프
>
>```javascript
>for(var i = 0; i < 10; i++){
>    console.log(i);
>}
>console.log(i); // i = 10
>```
>
>for문이 끝나도 i가 살아있다. 
>
>##### (2) 블록형 스코프
>
>```javascript
>for(let i = 0; i < 10; i++){
>    console.log(i);
> }
> console.log(i); // Uncaught ReferenceError: i is not defined at<anonymous>:1:13
> ```
> 
> for문이 끝나면 블록이 끝났으므로 i는 알 수 없다.



### 3-2. list

#### (1) length

리스트의 길이를 리턴

```javascript
let name = ["nayeong", "hee", "jick"]
name;
//(3) ["nayeong", "hee", "jick"]
name.length;
// 3
```
#### (2) reverse()

python과 달리, javascript에서는 원본을 바꾼다.

```javascript
name;
//(4) ["nayeong", "hee", "jick", "jang"]
name.reverse();
//(4) ["jang", "jick", "hee", "nayeong"]
```

#### (3) push(parm)

리스트의 오른쪽에 원소 추가한다. 원소 추가 후의 리스트의 개수를 리턴한다.

```javascript
name;
//(3) ["nayeong", "hee", "jick"]
name.push("jang");
// 4
```

#### (4) pop()

리스트의 맨 오른쪽 원소를 리턴하고 내보낸다.
```javascript
name;
//(4) ["jang", "jick", "hee", "nayeong"]
name.pop();
//"nayeong"
```
#### (5) shift()

맨 왼쪽의 원소를 리턴하고 내보낸다.
```javascript
name;
//(3) ["jang", "jick", "hee"]
name.shift();
// "jang"
```
#### (6) unshift(parm)

맨 왼쪽에 원소를 추가한다. 원소 추가 후의 리스트의 개수를 리턴한다.
```javascript
name;
//(2) ["jick", "hee"]
name.unshift("jang");
//3
```
#### (7) includes(parm)

리스트에 parm이 존재하는지 여부를 true, false로 리턴한다.
```javascript
name;
//(3) ["jang", "jick", "hee"]
name.includes("nayeong");
//false
```

#### (8) join(parm)

리스트에 parm을 넣어 스트링으로 반환

```javascript
name;
//(3) ["jang", "jick", "hee"]
name.join("와");
//"jang와jick와hee"
```



### 3-3. dictionary

키 값을 스트링으로 써주지 않아도 된다.

```javascript
const student = {name :'나영',age:26};
student.name;
// '나영'
student.age;
// 26
```



## 4. 자바스크립트 반복 / 조건문

### 4-1. for 문

```javascript
for(let i = 0; i < 10; i++){
   console.log(i);
}
```



### 4-2. while 문

```javascript
let i = 0
while( i < 10 ) {
    console.log(i);
    i++;
}
```

while문이 돌아가고 있는 경우, 브라우저는 어떤 동작도 수행할 수 없다. 그래서 이후에 `async`를 사용하여 비동기 처리할 것이다.



### 4-3. if - else if - else문

```javascript
if(age>=30){
    console.log("아재");
}else if(age>=20){
    console.log("학식");
}else{
    console.log("급식");
}
```



## 5. 자바스트립트 함수

### 5-1. function 키워드로 함수 정의

```javascript
// [선언]
function hello(){
    return "hello"
}
// [실행]
hello = hello()
alert(hello)
// hello
```



### 5-2. 익명함수🤟

```javascript
// [선언] 함수의 이름이 없으므로 익명함수!
const sum = function(a, b){
    return a+b
}
// [실행]
sum(7,3)
// 10
```
>익명함수의 경우 type을 찍어보면 function이 호출된다.
>
>```javascript
>typeof sum
>// "function"
>```
>

자바스크립트의 경우 주로 `익명함수`로 선언(변수에 함수를 전달)하여 사용한다. 정석대로 함수를 정의해서 사용하면 `호이스팅`이 일어나기 때문이다. [(호이스팅 참고)](https://asfirstalways.tistory.com/197)




자바스크립트는 함수를 변수에 **저장**하고 **전달**할 수 있고 **실행** 또한 가능하다. 이러한 자료형을 `1급객체`라고 한다. 즉, 자바스크립트의 함수는 1급객체이다.*(python에서의 함수도 1급 객체)*



## 6. 자바스크립트의 Srting 제어

### 6-1. + 연산자

```javascript
let firstName = "나영"
let lastName = "김"
let fullName = lastName + firstName
// "김나영"
```




### 6-2. ` (backtick)

```javascript
let firstName = "나영"
let introduce = `안녕하세요. 저는 ${firstName}입니다.`
introduce
// 안녕하세요. 저는 나영입니다.`
```



## 7. 자바스크립트 Object

```javascript
// [선언]
const me ={
    name:'nayeong',
    phone_number:'01012345678',
  	apple: {
		mackBook:'2018pro',
		iPhone: 7}
}

// [검색]
me.name
//"nayeong"
me.apple.iPhone
//7
me.apple.mackBook
//"2018pro"

// [삽입]
me.address = "강남구"
"강남구"

me
//{name: "nayeong", phone_number: "01012345678", apple: {…}, address: "강남구"}
```



