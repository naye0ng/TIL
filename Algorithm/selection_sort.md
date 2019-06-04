# 선택 정렬(Selection Sort)

*2019.06.04*



>**셀렉션 알고리즘(Selection Algorithm)**
>
>- 저장되어 있는 자료로부터 **k번째로 큰 혹은 작은 원소를 찾는 방법**을 셀렉션 알고리즘이라 한다.
>- 선택 과정
>  1. 자료 정렬하기
>   2. 원하는 순서에 있는 원소 가져오기



## 선택 정렬

- 주어진 자료들 중 가장 작은 값의 원소부터 차례로 선택하여 위치를 교환하는 방식
- 정렬 과정
  1. 주어진 리스트의 최소값을 찾는다.
  2. 그 값을 맨 앞에 위치한 값과 교환한다.
  3. 맨 처음 위치를 제외한 나머지 리스트를 대상으로 위의 과정을 반복한다.
- 시간 복잡도 : O(n^2)
  - k번째 루프에서 비교할 리스트의 길이는 n-k이므로, 마지막 원소까지 정렬을 진행하면 n(n-1)(n-2)….1이 된다.
  - n(n-1)(n-2)….1 = n(n+1)/2



### 1. 선택 정렬 과정

**1단계** : 주어진 리스트의 최소값 찾기

![선택정렬](./images/selection1.png)

**2단계** :  맨 앞에 위치한 값과 교환

![선택정렬](./images/selection2.png)

**3단계** : 재정의된 리스트에서 1, 2단계를 반복

![선택정렬](./images/selection3.png)
![선택정렬](./images/selection4.png)

---

![선택정렬](./images/selection5.png)
![선택정렬](./images/selection6.png)

---

![선택정렬](./images/selection7.png)
![선택정렬](./images/selection8.png)



### 2. 선택정렬

```python
def selectionSort(arr) :
  # len(arr)-1 :맨 마지막에는 어차피 큰 값이 남을테니 비교 안해도 됨
  for n in range(len(arr)-1) :	
    # n : 맨 앞의 인덱스
    # min : 최소값의 인덱스
    min = n
    for i in range(n, len(arr)) :
      if arr[i] < arr[min] :
        minm = i
    arr[min], arr[n] = arr[n], arr[min]
```

