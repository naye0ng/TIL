# CSS 기본

*2019.05.30*



## 1. CSS 선언

css를 HTML안에 적용하는 방식은 크게 `inline`, `internal`, `external` 세가지가 있다.

**[ CSS의 구성 ]**

```css
selector { property : value; }
```



### 1.1. inline

style을 HTML 태그 안에 바로 적용하는 방법, body 태그 아래에서 쓰임

```html
<p style="color:red;">CSS 기본</p>
```



### 1.2. internal

style  태그로 지정한다.

HTML 구조와 스타일이 섞이게 되므로 유지보수가 어렵다. 물론 별도의 css 파일을 관리하지 않으므로 서버에 css 파일을 요청할 필요가 없다.

```html
<head>
    <style>
        p {
            color : red;
        }
    </style>
</head>
<body>
    <p>CSS 기본</p>
</body>
```



### 1.3. external

외부파일(.css)로 지정하는 방식으로 link 태그로 불러온다. 가장 추천하는 방식이다.

```css
// style.css
p {
    color : red;
}
```

```html
<html>
	<head>
		<link rel="stylesheet" href="style.css">
	</head>
	<body>
		<p>CSS 기본</p>
	</body>
</html>
```



### 1.4. 우선순위 🤟

우선순위 : `inline` > `internal`= `external`

`inline`은 별도의 우선순위를 갖지만 `internal`과 `external`은 우선순위가 동등하다. 때문에 겹치는 선언의 경우, 나중에 선언된 속성이 반영된다.