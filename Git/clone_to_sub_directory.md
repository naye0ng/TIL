# 특정 디렉토리만 clone하기

github 블로그에 포스팅을 하려고 하는데, 개인 노트북이 아닌 공용 컴퓨터에서 해야하는 일이 생겼다.  

이처럼 원격지의 모든 폴더와 파일을 로컬로 가져올 필요가 없는 경우, 특정 폴더만 클론하자.

### 원격 저장소의 폴더 구조

```shell
├─assets
│  ├─css
│  ├─img
│  └─js
├─_includes
├─_layouts
├─_posts
└─_sass
    ├─base
    ├─external
    ├─includes
    └─layouts
```

포스팅을 하기 위해선 '_posts'폴더와 이미지를 저장할 'assets/img'폴더를 가져와야 한다.

### 1. 로컬 저장소 만들기

```shell
# blog 폴더 생성 및 이동
$ mkdir blog && cd blog	
$ git init
```



### 2.  remote 추가

f 옵션을 추가해야 현재 디렉토리의 master branch가 origin/master로 설정된다.
즉, f 옵션 없이 remote 디렉토리를 추가한다면 git pull origin master에서 origin/master를 찾을 수 없다는 에러가 뜰 것이다.
```shell
$ git remote add -f origin {원격 저장소 url}
```



### 3. Sparse Checkout 활성화

```shell
# core.sparseCheckout true로 설정
$ git config core.sparseCheckout true
```



### 4. sparse-checkout파일에 checkout폴더 등록

```shell
# spars-checkout파일 생성 및 가져올 폴더명 등록
$ echo "{checkout하고 싶은 파일이나 디렉토리}" >> .git/info/sparse-checkout
```



### 5. git pull

```shell
$ git pull origin master
```



### 최종 결과

원하는 디렉토리만 clone이 가능하다.

```shell
├─assets
│  └─img
└─_posts
```

