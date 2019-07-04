"""
이진트리 구성 및 전위순회 구현하기
"""
n = 13  # 정점의 개수
inputData = [1,2,1,3,2,4,3,5,3,6,4,6,5,8,5,9,6,10,6,11,7,12,11,13] # 간선

# 이진트리
tree = [[0]*2 for _ in range(n+1)]
for i in range(0,len(inputData),2) :
    if tree[inputData[i]][0] == 0 :
        tree[inputData[i]][0] = inputData[i+1]
    else :
        tree[inputData[i]][1] = inputData[i+1]

print(tree)

# 전위순회
def preoder(t) :
    if t != 0 :
        print(t,"방문")
        preoder(tree[t][0])
        preoder(tree[t][1])

preoder(1)