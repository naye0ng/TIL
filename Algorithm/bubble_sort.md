# 버블 정렬(Bubble Sort)

*2019.06.01*



## 버블 정렬

- 인접한 두 개의 원소를 비교하며 자리를 계속 교환하는 방식
- 시간복잡도 : O(n^2)
  - n 단계 * (n-1번의 배열 비교)

1. 첫 번째 원소부터 인접한 원소끼리 계속 자리를 교환하면서 맨 마지막 자리까지 이동한다.
2. 한 단계가 끝나면 가장 큰 원소가 마지막 자리로 정렬된다.



### 1. [55, 7, 78, 12, 42] 버블정렬 과정

**1단계**
![1단계](/Users/nayeong/TIL/Algorithm/images/buuble1.png)

**2단계**
![2단계](/Users/nayeong/TIL/Algorithm/images/buuble2.png)

**3단계**
![3단계](/Users/nayeong/TIL/Algorithm/images/buuble3.png)

**4단계**
![4단계](/Users/nayeong/TIL/Algorithm/images/buuble4.png)

**5단계**
![5단계](/Users/nayeong/TIL/Algorithm/images/buuble5.png)



### 2. 버블 정렬 

```python
def bubbleSort(an) :
    # 단계 설정, 범위의 끝을 말한다.
    for i in range(len(an)-1,0,-1) :
        # 비교 부분
        for j in range(0, i) :
            if an[j] > an[j+1] :
                an[j], an[j+1] = an[j+1], an[j]
```

