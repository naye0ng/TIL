class Queue:
    def __init__(self, n) :
        self.n = n
        self.front = -1
        self.rear = -1
        self.queue = [None]*self.n 

    def inQueue(self, value) :
        if self.isFull() :
            return None
        self.rear += 1
        self.queue[self.rear] = value

    def deQueue(self):
        if self.isEmpty() :
            return None

        self.front += 1
        # front가 가리키는 곳에는 값이 없다고 생각하고 진행하면 주석부분은 생략가능
        # value = self.queue[self.front]
        # self.queue[self.front] = None
        return self.queue[self.front]

    def isEmpty(self):
        if self.front == self.rear :
            return True
        return False

    def isFull(self) :
        if self.rear == self.n-1 :
            return True
        return False
    
    # 현재 Queue 출력
    def print(self) :
        return self.queue[self.front+1:]