# 스택(Stack)

*2019.06.06*



## 스택

- 후입선출(LIFO) : 마지막에 삽입한 자료를 제일 마지막에 꺼낸다.
- 스택에 저장된 자료는 선형 구조를 갖는다.
  - 선형구조 : 자료간의 관계가 1:1
  - 비선형구조 : 자료간의 관계가 1:N (예: 트리)



### 1. 스택 구현

- push : 삽입
- pop : 삭제
- isEmpty : 스택이 비었는지 확인
- peek : top이 가리키는 값 반환

```python
class Stack :
    def __init__(self) :
        self.top = -1
        self.stack = []

    def push(self, value) :
        self.stack += [value]
        self.top += 1
    
    def pop(self) :
        value = self.stack[self.top]
        self.stack = self.stack[:self.top]
        self.top -= 1
        return value

    def isEmpty(self) :
        if self.top == -1 :
            return True
        return False
    
    def peek(self) :
        if not self.isEmpty :
            return self.stack[self.top]
```



### 2. 스택의 응용

#### 2-1. 괄호 검사

![stack]()

1. 왼쪽에서 오른쪽으로 진행하면서, 왼쪽 괄호`(`를 만나면 스택에 삽입한다.
2. 오른쪽 괄호`)`를 만나면 스택의 top값이 가리키는 괄호와 짝이 맞는지 확인한다.
   - 맞다면, 왼쪽 괄호를 스택에서 삭제한다.
   - 틀리다면, 잘못된 괄호 사용임을 알리고 종료한다.
3. 마지막 괄호까지 조사를 마친 후, **스택에 괄호가 남아있는지 여부를 검사**해야한다.



**[ 연습문제 ]** 올바른 괄호 사용을 검사하는 프로그램을 스택을 이용하여 작성해라.

```python
def ckeckBracket(T) :
  	# 위에서 구현한 스택 사용
    stack = Stack()

    for t in T :
        if t == '(' or t == '{':
            stack.push(t)
        elif t == ')' :
            if stack.pop() != '(' :
                return False
        elif t == '}' :
            if stack.pop() != '{' :
                return False
    
    # 마지막 남아있는 괄호 조사
    if stack.isEmpty() : 
        return True
    return False
```



#### 2-2. Function call

프로그램에서의 함수 호출과 복귀에 따른 수행 순서를 스택을 통해 관리한다.









