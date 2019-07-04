"""
1, 2, 1, 3, 2, 4, 2, 5, 4, 6, 5, 6, 6, 7, 3, 7 간선을 가지는 그래프의 너비우선 탐색
"""

def DFS(G, v) : # G: 그래프, v: 시작점
    queue = []
    visited = [False]*n

    queue.append(v)

    while queue :
        v = queue.pop(0)
        if not visited[v] :
            visited[v] = True
            print(f'{v}방문')

        for g in G[v] :
            if not visited[g] :
                queue.append(g)
        

edges = [1, 2, 1, 3, 2, 4, 2, 5, 4, 6, 5, 6, 6, 7, 3, 7]
n = 8

G = [[] for _ in range(8)]
for i in range(0, len(edges), 2) :
    G[edges[i]].append(edges[i+1])

# G = [[], [2, 3], [4, 5], [7], [6], [6], [7], []]

DFS(G, 1)