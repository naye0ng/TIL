# 이진 검색(Binary Search)

*2019.06.03*




## 이진 검색

- 이진 검색을 하기 위해서는 **자료가 정렬된 상태**여야 한다.
- 자료의 가운데에 있는 항목으 키 값과 비교하여 다음 검색 위치를 결정하고 계속 진행하는 방법
  - 목적 키 값을 찾을 때까지 이진 검색을 순환적으로 반복함으로써 검색 범위를 반으로 줄여가면서 빠르게 검색을 수행한다.
- 시간복잡도 : O(logN)
  - 전체 원본의 갯수가 N일 경우, 첫번째 수행 시 N/2 개가 남는다.
  - 계속해서 반씩 버려져 K번 수행된 경우, N*(1/2)^K 개가 남게 된다.
  - K번이 마지막이라고 한다면 최악의 경우 1개가 남아있을 것이다. N*(1/2)^K = 1
  - 양변에 2^K를 곱하면, N = 2^K
  - K = logN이 된다.
- 예) 소주 병뚜껑에 써있는 숫자 빠르게 맞추기



### 1. 이진검색 과정

1. 자료의 중앙 값을 고른다.
2. 중앙 값과 키 값을 비교한다.
   - 중앙 값 < 키 값 : 중앙 값의 오른쪽에 대하여 검색
   - 중앙 값 > 키 값 : 중앙 값의 왼쪽에 대하여 검색
   - 중앙 값 = 키 값 : 원하는 값을 찾음, 종료



### 2. 이진 검색

#### 2-1. while문 이용

```python
def binarySearch(arr, key) :
    start = 0 
    end = len(arr)-1
    
    while start <= end :
        mid = (start+end)//2 
        if arr[mid] == key :
            return mid
        elif arr[mid] < key :
            start = mid+1
       	elif srr[mid] > key :
            end = mid-1
	return -1
```



#### 2-2.  재귀 함수 이용

```python
def binarySearch(arr, start, end, key) :
    # 검색 실패
    if start > end :
        return -1
    else :
        mid = (start+end)//2
        if arr[mid] == key :
            return mid
        elif arr[mid] < key :
            return binarySearch(arr, mid+1, end, key)
       	elif srr[mid] > key :
            return binarySearch(arr, start, mid-1, key)
```

