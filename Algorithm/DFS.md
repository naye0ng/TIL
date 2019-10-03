# 깊이 우선 탐색(DFS)

*2019.06.14*



## 깊이 우선 탐색(Depth First Search)

- 비선형 구조인 그래프 구조는 **그래프로 표현된 모든 자료를 빠짐없이 검색하는 것이 중요**하다.( 깊이우선탐색, 깊이우선탐색을 생각해볼 수 있다.)
- 시작 정점의 한 방향으로 갈 수 있는 곳까지 깊이 탐색해 가다가 더 이상 갈 곳이 없게되면, 가잘 마지막에 만났던 갈림길 간선이 있는 곳으로 되돌아와 다른 방향의 정점으로 탐색을 반복하여 결국 모든 정점을 방문하는 순회 방법이다.
- 가장 마지막에 만났던 갈림길의 정점으로 되돌아가 다른 방향으로 탐색을 진행하므로 후입선출 구조의 **스택**을 사용한다.



### 1. DFS 알고리즘

1. 시작 정점 v를 결정하여 방문한다.

2. 정점 v에 인접한 정점 중에서

   - 방문하지 않은 정점 w가 있다면, 정점 v를 스택에 push하고 정점 v를 방문한다. 그리고 w를 v로 하여 [과정 2]를 반복한다.

   - 방문하지 않은 정점이 없다면(해당 깊이의 모든 정점을 방문한 경우), 스택에서 pop하여 받은 가장 마지막 정점을 v로 하여 다시 [과정 2]를 반복한다.

3. 스택이 공백이 될 때까지 [과정 2]를 반복한다.



### 2. DFS 구현

**연습문제** 연결되어 있는 두 개의 정점 사이의 간선을 순서대로 나열해 놓은 것이 입력과 같을 때, 모든 정점을 깊이 우선 탐색하여 경로를 출력하라

- 입력 : 1,2,1,3,2,4,2,5,4,6,5,6,6,7,3,7

```python
def DFS(v) :
    stack = []
    stack.append(v)
    while stack :
        v = stack.pop()
        if not visitied[v] :
            visitied[v] = 1
            print(v)
            for w in range(1, len(G[v])) :
                if G[v][w] and not visitied[w] :
                    stack.append(w)

edges = [1, 2, 1, 3, 2, 4, 2, 5, 4, 6, 5, 6, 6, 7, 3, 7]
visitied = [0] * 8

G = [[0] * 8 for _ in range(8)]
for i in range(0, len(edges), 2):
    G[edges[i]][edges[i + 1]] = 1
    G[edges[i + 1]][edges[i]] = 1

DFS(1)
```