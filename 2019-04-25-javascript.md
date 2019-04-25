# Javascript 

*2019.04.25*




## 콜백함수 : callback function
*(node.js의 readFile() 구조 추측을 통한 callback function 이해하기)*

비동기적으로 작동하는 자바스크립트에서, **원하는 시점에 이벤트를 발생시키기 위해 콜백함수를 사용**한다.



> #### 비동기함수 readFile()의 생김새 예측
>
> ```javascript
> const readFile = (myFunc) => {
>     let content 
>     // 파일을 읽는데 100ms라고 가정
>     setTimeout(() => {
>         content = "hello world!"
>         myFunc(content)
>     }, 100);
> }
> const log = (content) => {
>     console.log(content)
> }
> readFile(log)
> ```



### readFile() 사용하기

```javascript
const fs = require('fs')
fs.readFile(__dirname+'/test.md','utf-8',(err,str) => {
    console.log(str)
})
```

