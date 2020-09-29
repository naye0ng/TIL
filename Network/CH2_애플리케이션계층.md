# Ch2. 애플리케이션 계층

> 구조와 개념, 프로토콜, 소켓



## 2.1 Principles of network application

### I. Application  Architecture

network application에는 e-mail, web, p2p file sharing, skype, streaming(youtube) 등이 있다. 대부분의 사용자가 사용하고 있는 앱이 여기에 속한다. 그런데, 이렇게 다양한 application과 application을 지원하는 protocol의 구조는 다음 두 가지로 나뉜다.

- `client-server` 
- `peer-to-peer(p2p)` 



#### 1. Client-server architecture

server host의 프로세스와 client host의 프로세스가 통신을 하는 구조

- server 
  - 언제나 on
  - 영구적으로 할당된 고정 IP

- client 
  - 유동 IP
  - 사용할때만 on



#### 2. P2P architecture

커뮤니케이션하는 프로세스가 모두 user host에 존재한다. 즉, 항상 켜져있는 server가 존재하지 않는다.

- peer
  - user host를 지칭한다.
  - peer는 다른 peer에게 서비스를 제공하고 자신이 서비스를 제공하기도 한다.
  - peer가 서비스를 제공하는 역할도 수행할 수 있으므로, 사용자가 증가하면 서비스 제공할 수 있는 peer가 증가한다. 즉, self scalability하는 장점이 있다.
  - 그러나 peer들이 유동 IP를 가지고 있으므로 관리가 복잡하다는 단점이 있다.



### II. Process communicating

결국 커뮤니케이션하는 주체는 host가 아니라 process이다. 서로 다른 host에서 동작하는 process가 메시지를 주고 받는 것으로 인해 애플리케이션이 돌아가는 것이다. 그래서 통신하는 프로세스는 `client process`, `server process` 두 종류로 나뉜다. 

- client process : 커뮤니케이션을 시작하는 프로세스

- server proces : 커뮤니케니션을 기다리고 응대하는 프로세스

Client-server architecture에서는 각 host에 맞는 process가 동작, P2P architecture에서는 하나의 peer 안에 두 가지 프로세스가 모두 동작



### III. Sockets

application layer에서 메시지를 만들고 해당 메시지 전달을 transport layer에 부탁한다. 그런데, application layer는 앱 개발자가 컨트롤하는 부분이고 그 아래부터는 OS가 컨트롤 한다. 프로그램은 user 영역에 있는 process로 인해 실행되고 메시지 전달은 os 영역에 있는 process에 의해 실행된다. 

이때, application layer와 transport layer 사이의 문 역할을 하는 것이 `socket`이다. 

![socket](./image/socket.png)



### IV. Addressing process

메시지를 전달해야할 대상은 host가 아니라 host 내에서 실행되고 있는 process이다. 그렇다면 어떻게 해당 process를 찾아갈 수 있을까? IP 번호가 네트워크에서 host를 찾기 위한 주소라면 **port 번호는 프로세스의 주소**가 된다.

**well kown port number** : 매우 보편적으로 사용되는 process의 경우 port 번호를 고정해서 사용한다.  예를 들면 http 서버는 80, mail 서버는 25를 사용한다. 



### V. Transport service

#### 1. What transport service does an app need? 

application layer에서는 메시지를 transport layer에 전달하는데, 어떤 transport service를 사용해야할까?

- data integrity 
  - 파일 전송과 웹 통신을 진행할 때, 중간 중간 오류가 발생하면 그 서비스에 매우 치명적이다.
  - 반면, 오디오나 비디오 같은 서비스는 data integrity가 치명적이지 않다.
- timing
  
  - 게임, 음성과 같은 경우 딜레이는 치명적이다.
- throughput(처리율)
  
  - 오디오나 비디오 스트리밍의 경우 minimum throughput이 보장되어야한다. 단위 시간당 처리할 수 있는 프레임이 보장되어야 화면에 지연이 발생하지 않는다.
  
  - 반면, FTP 같은 파일전송 시스템의 경우, throughput이 낮더라도 파일이 느리게 전송될 뿐 치명적이지 않다.

- security
  - 뱅킹 서비스를 사용하는 앱의 경우 보안이 가장 중요하다.

즉, 어플리케이션마다 원하는 Transport service가 다르다.



#### 2. Internet trasnport protocols service

인터넷에서 transport service를 제공하는 protocol에는 TCP와 UDP가 있다.

|                                                              | TCP  | UDP  |
| :----------------------------------------------------------- | :--: | :--: |
| **reliable transport**<br />- 상대방에게 오류 없이 전송함을 보장 |  O   |  X   |
| **flow control**<br />- 전송하는 데이터의 순서를 보장<br />- 들어오는 데이터 양을 체크해서 속도를 조절하여 버퍼 오버플로우를 방지한다. |  O   |  X   |
| **connection-oriented**<br />- 상대방과 connenction을 확인하는 과정(hand shaking)을 거친다. |  O   |  X   |
| **congestion control**<br />- 네트워크 상의 데이터 경로 상의 혼잡이 발생할 때, 버퍼에서 내보내는 데이터 속도를 줄인다. |  O   |  X   |
| **timing, minimum throughput guarantee, security**           |  X   |  X   |

왜 UDP를 사용할까? UDP는 상대방과 connenction을 확인하는 과정(hand shaking)을  거치지 않고 오로지 데이터 전송에만 집중한다. TCP는 connection 수립하는 hand shaking과 connection을 통해 트래픽을 관리하는 오버헤드가 발생한다. 즉, 메시지를 하나만 보내는 간단한 어플리케이션에서 TCP를 사용하는 것은 배보다 배꼽이 더 큰 것과 같다. 스트리밍과 같이 데이터의 손실보다 처리율이 중요한 경우에는 UDP를 사용한다.



### IV. Application layer protocol defines

애플리케이션 프로토콜에서 정의되어야 하는 것

- type of message exchanged
- message syntax
- message semantics
- rules



## 2.2 Web and HTTP

웹 페이지는 여러 개의 object로 구성되어 있는데, 기본적으로 웹 페이지의 프레임을 **base HTML 파일**(보통 index.html)이 가지고 있다. 그리고 그 안에 URL 형태로 object 정보를 가지고 있다. (이때, object는 HTML file, 이미지, 오디오 등)



### I. HTTP : hypertext transport protocol

1. WEB 어플리케이션을 위해 만들어진 프로토콜로 `client-server` 구조를 가지고 있다.

   - client process : 사용자의 브라우저
   - server process : 서버 host에서 실행되어 client host의 메시지를 기다림

2. `TCP`를 사용한다.

   - 웹은 데이터 손실이 일어나면 안된다. 즉, data integrity가 보장되어야하므로 TCP를 사용한다.
   - 클라이언트에서 TCP 서버에 connection을 요청하고 서버(port 80)측에서 이에 응답해서 메시지를 주고 받는다.

3. `stateless` 

   - 유저가 이전에 보낸 request가 뭐였는지 기억하고 있지 않음

4. `persistent HTTP`

   - 서버와 클라이언트사이에서 여러개의 object가 하나의 TCP connection을 통해 전달 가능

   > 원래는 **non-persistent HTTP** 이었는데, 바뀜
   >
   > 서버에서 요청을 보내고 나면 TCP connection을 바로 닫아버리는 것이다. 그런데, HTML 문서는 여러개의 object로 이뤄져 있어 모든 object를 다운받기 위해서는 매번 TCP connection야 하므로 매우 비효율적이다.














