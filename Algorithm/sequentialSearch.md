# 순차 검색(Sequential Search)

*2019.06.03*



## 순차 검색

- 일렬로 되어있는 자료를 순서대로 검색하는 방법
- 단, 대상의 수가 많은 경우 수행시간이 급격하게 증가하여 비효율적



### 1. 정렬되지 않은 경우

- 첫 번째 원소부터 순서대로 대상과 키 값이 같은 원소가 있는지 비교한다.
- 키값과 동일한 원소를 찾으면 종료
- 자료구조의 마지막에 이를 때까지 찾지 못하면 실패

- 시간복잡도 : O(n) 
  - 찾고자 하는 원소의 순서에 따라 비교횟수가 결정된다.

```python
def sequentialSearch(arr,n,key) :
    i = 0
    while i < n and arr[i] != key :
        i += 1
    if i < n :  return i
    return -1	# i = n 인경우, 키 값이 배열에 없다.
```

```python
def sequentialSearch(arr,n,key) :
    for i in range(n) :
        if arr[i] == key :
            return i
    return -1
```



### 2. 정렬된 경우

- 자료가 오름차순으로 정렬되어 있다 가정했을때, 자료를 순차적으로 검색하면서 키 값보다 큰 값이 나오면 찾는 원소가 없다는 것이므로 종료한다.

```python
def sequentialSearch(arr,n,key) :
    i = 0
    while i < n and arr[i] < key :
        i += 1
    if i < n and arr[i] = key :  return i
    return -1
```

```python
def sequentialSearch(arr,n,key) :
	for i in range(n) :
        if arr[i] == key :
            return i 
        elif arr[i] > key :
            return -1
	return -1
```

