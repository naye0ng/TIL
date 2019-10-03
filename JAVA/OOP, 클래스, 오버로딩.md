# OOP, 클래스, 오버로딩

## I. 객체 지향 프로그래밍(OOP, Object Oriented Programming)

- 객체 지향 프로그래밍에서는 모든 데이터를 객체로 취급하며, 이러한 객체가 바로 프로그래밍의 중심이 된다.

- 객체의 상태와 행동을 구체화하여 나타내는 것

- 객체 지향 개발의 5대 원리(SOLID)

  - 객체 사이의 의존성을 줄이고, 개체 단위에서의 원자성을 보장하는 것이 객체지향의 설계에서 가장 중요하다.
  
  | 원칙                   | 설명                                                         |
  | ---------------------- | ------------------------------------------------------------ |
  | 단일 책임의 원칙       | 객체는 하나의 책임만을 맡아야 함<br />목적 : 변화에 유연성 확보(낮은 결합도, 높은 응집도) |
  | 개방 폐쇄 원칙         | 모듈은 확장에는 열려있어야 하며, 변경에는 닫혀 있어야 함     |
  | 리스코프 원칙          | 기반 클래스는 파생 클래스로 대체 가능해야 함<br />즉, 인터페이스만 알면 구현체를 몰라도 사용 가능해야 함 |
  | 인터페이스 분리의 법칙 | 하나의 일반적인 인터페이스보다는 구체적인 여러 개의 인터페이스가 나음 |
  | 의존관계 역전의 원칙   | 클라이언트는 구체 클래스가 아닌 인터페이스나 추상 클래스에 의존해야 함 |

- **객체지향 프로그래밍의 특징** 
  
  - 추상화
  - 캡슐화
  - 상속성
  - 다형성
  
- 클래스
  
  - 필드
  - 메소드 
      - 클래스 메소드는 같은 클래스로부터 생성된 모든 인스턴스가 공유함.
    - `메소드 오버로딩` 이란, 매개변수의 개수나 타입을 다르게 하여 같은 이름의 또 다른 메소드를 작성하는 것
  
- 인스턴스

  - 클래스로 부터 객체를 선언하는 과정을 인스턴스 화라고 한다.

  - 클래스 객체를 말하며, 힙 영역에 독립적으로 생성된다.



## II. 클래스

자바에서 클래스는 멤버, 필드, 메소드, 생성자를 포함한다.

```java
class Car{
  private String modeName; // 필드
  private int modelYear; // 필드
  
  Car(String modeName, int modelYear){ // 생성자
    this.modeName = modeName;
    this.modelYear = modelYear;    
  }
  
  public String getModel(){	// 메소드
    return this.modelYear + "년식" + this.modeName;
  }
}
```



### a. 필드

- 클래스에 포함된 변수를 의미

- 클래스 내에서 필드는 선언된 위치에 따라 구분된다.

  - 클래스 변수

  - 인스턴스 변수

  - 지역변수

    ```java
    class Car {
        static int modelOutput; // 클래스 변수
        String modelName;       // 인스턴스 변수
        void method() {
            int something = 10; // 지역 변수
        }
    
    }
    ```

  - **클래스 변수**와 **인스턴스 변수**는 자동으로 초기화 되지만, **지역변수**는 초기화 되지 않음.

  - 클래스 변수는 `static` 키워드를 사용하므로 메로리가 올라갈 때 바로 생성되므로, 인스턴스의 생성 없이 사용이 가능하다. 그래서 `공유변수(shared variable)` 라고도 불린다.

  | 변수          | 생성시기                              | 소멸시기         | 저장 메모리 |
  | ------------- | ------------------------------------- | ---------------- | ----------- |
  | 클래스 변수   | 클래스가 메모리에 올라갈때(전역)      | 프로그램 종료    | 메소드 영역 |
  | 인스턴스 변수 | 인스턴스가 생성될 때                  | 인스턴스 소멸    | 힙 영역     |
  | 지역변수      | 블록 내에서 변수의 선언문이 실행될 때 | 블록응 벗어날 때 | 스택 영역   |



### b. 메소드

- 자바에서 메소드란 어떠한 특정 작업을 수행하기 위한 명령문의 집합이다.
- 메소드로 기능의 모듈화를 하게 되므로 전체적인 가독성이 증가하고, 유지보수가 용이해집니다.

```java
/*
접근제어자 반환타입 메소드이름(메게변수목록){}
*/
public void accelerate(int speed){
  	System.out.println(speed+"만큼 가속!")
}
```

- 메소드는 `static` 키워드의 여부에 따라 구분된다.
  - 클래스 메소드
  - 인스턴스 메소드
	
	```java
	class Car{
	  boolean door;
	  static boolean door2;
	  void openDoor(){ // 인스턴스 메소드
	    door = true;
	  }
	  static void toggleDoor2(){	// 클래스 메소드
	    this.door2 = !this.door2;
	    this.door = !this.door; // error!!!!
	  }
	}
	```
	
	- 클래스 메서드는 static 키워드로 선언되어 인스턴스 변수생성 없이 사용이 가능하다. 
	- 또한, 클래스 메서드의 생성 시기에 인스턴스 변수가 메모리에 생성되지 않으므로, 클래스 메서드 내에서 인스턴수 변수를 사용하면 에러가 발생한다.
	- 따라서 클래스 메서드는 인스턴수 변수나 인스턴스 메서드를 사용하지 않는 메소드를 정의할 때 사용된다.
	
	```java
	class Method{
	  int a = 10, b = 20;
	  int add(){
	    return a+b;
	  }
	  static int add(int a, int b){
	    return a + b;
	  }
	}
	
	public class Main {
	    public static void main(String[] args) {
	      // 클래스 메소드
	    	System.out.println(Method.add(20, 30)); 
	      
				// 인스턴스 메소드
	      Method myMethod = new Method();        
	      System.out.println(myMethod.add());     
	    }
	}
	```
	
	

### c. 생성자

- 클래스를 가지고 객체를 생성하면, 객체는 메모리에 즉시 생성된다. 그러나 이렇게 생성된 객체는 모든 인스턴스 변수가 초기화되지 않은 상태이다.

- 따라서 자바는 객체의 생성과 동시에 인스턴스 변수를 원하는 값으로 초기화할 수 있는 생성자라는 메소드를 제공한다.
- 생성자의 이름은 클래스 이름과 같다.

> 자동으로 0이 할당되어 힙 영역에 생성되는 배열의 경우, 0으로 초기화하는 배열의 생성자가 자바에서 기본적으로 제공되고 있다는 것으로 생각해 볼 수 있다.

- 특히, private 접근 지정자를 가진 인스턴수 변수를 초기화 할 때 생성자가 유용하게 사용된다.

- 생성자의 특징

  1. **생성자는 반환 값이 없지만, 반환 타입은 void로 선언하지 않는다.**

  2. 생성자는 초기화를 위한 데이터를 인수로 전달받을 수 있다.

  3. `오버로딩`이 가능하다. 

     - 한 개의 클래스에 여러 개의 생성자 가능

     ```java
     /*
     클래스이름() { ... }
     클래스이름(인수1, 인수2, ...) { ... }
     */
     
     Car(String modelName) {}
     Car(String modelName, int modelYear) {}
     Car(String modelName, int modelYear, String color) {}
     ```

-  기본생성자

  - 자바의 모든 클래스에는 하나 이상의 생성자가 정의되어 있어야 하는데, 자바에서는 특별히 생성자를 정의하지 않고도 인스턴스를 생성할 수 있다. 이는 컴파일러가 `기본 생성자` 를 제공하기 때문이다. 

  - 기본생성자는 매게변수를 하나도 가지지 않으며, 아무런 명령도 포함하지 않는다.

  - 컴파일러는 컴파일 시, 클래스에 생성자가 하나도 정의되어 있지 얺다며, 자동으로 다음과 같은 기본 생성자를 추가한다.

    ```java
    클래스이름(){}
    ```

  - 만약 매개변수를 가지는 생성자를 하나라도 정의했다면, 기본 생성자는 자동으로 추가되지 않습니다.

```java
class Car{
  private String modeName; // 필드
  private int modelYear; // 필드
  
  Car(String modeName, int modelYear){ // 생성자
    this.modeName = modeName;
    this.modelYear = modelYear;    
  }
  
  public String getModel(){	// 메소드
    return this.modelYear + "년식" + this.modeName;
  }
}
public class Main{
  public static void main(String[] args){
    Car car = new Car('아반떼', 2019);	// 생성자 호출
  }
}
```



### d. 초기화 블록

- 자바에서는 필드를 초기화하지 않아도 변수의 타입에 맞는 초기값으로 자동으로 초기화되지만, 지역변수와 마찬가지로 적절한 값으로 초기화한 뒤 사용하는 것이 좋다.

- 필드는 지역변수와 달리 여러가지 방법으로 초기화할 수 있다.

  1. 명시적 초기화

     - 지역변수를 초기화하는 것과 같음. 선언과 동시에 초기화

     ```java
     class Field{
       static int classVar = 10;	// 클래스 변수의 명시적 초기화
       int instanceVar = 20;	// 인스턴스 변수의 명시적 초기화
     }
     ```

  2. 생성자를 사용한 초기화

  3. **초기화 블록**을 이용한 초기화

     - 클래스 필드의 초기화만을 담당하는 중괄호로 둘러싸인 블록을 의미

     1. 인스턴스 초기화 블록

        - 생성자와 마찬가지로 인스턴스가 생성될 때마다 실행되며, 생성자보다 먼저 실행된다.
        - 주로 여러 개의 생성자가 존재할 때, 모든 생성자에서 공통으로 수행되어야 할 코드를 인스턴스 초기화 블록에 포함하여 코드의 중복을 줄일때 사용한다.

        ```java
        class Field{
          int instanceVar;
          int instanceVar2;
          
          { // 인스턴스 초기화 블록
            instanceVar = 10;
          }
        
          Field(int instanceVar2){
            this.instanceVar2 = instanceVar2;
          }
        }
        ```

     2. **클래스 초기화 블록**

        - 인스턴스 초기화 블록에 `static` 키워드를 추가하여 정의할 수 있다. 
        - 당연하겠지만, **클래스 초기화 블록은 클래스가 처음으로 메모리에 로딩될 때 단 한 번만 실행**된다.
        - 클래스 초기화 블록은 생성자나 인스턴스 초기화 블록으로는 수행할 수 없는 클래스 변수의 초기화를 수행할 때 사용된다.

        ```java
        class Field{
          static int instanceVar;
          
          static { // 클래스 초기화 블록
            instanceVar = 10;
          }
        }
        ```

        

### e. this와 this()

#### this 참조 변수

- 인스턴스가 바로 자기 자신을 참조하는데 사용하는 변수
- 인스턴스의 주소를 가리킨다.
- **this 참조 변수를 사용할 수 있는 영역은 인스턴스 메소드 영역뿐이며, 클래스 메소드에서는 사용이 불가능하다.**

#### this() 메소드

- 생성자 내부에서만 사용이 가능하며, 같은 클래스의 다른 생성자를 호출한다.
- 단, 한 생성자에서 다른 생성자를 호출할 때에는 **반드시 해당 생성자의 첫 줄에서만 호출할 수 있다.**

```java
class Car{
  private String modeName;
  private int modelYear;
  
  Car(String modeName){
    this.modeName = modeName;
  }
  
  Car(String modeName, int modelYear){
    this(modeName);	// this() 
    this.modelYear = modelYear; 	// this
  }
}
```



## III. 메소드 오버로딩

- 메소드 오버로딩이란, 같은 이름의 메소드를 중복하여 정의하는 것을 말함.

- 메소드 오버로딩을 사용함으로써 메소드에 사용되는 이름을 절약할 수 있다. 또한, 메소드를 호출할 때 매게변수의 타입과 개수에 크게 신경쓰지 않아도 된다.

- 즉, 메소드 오버로딩은 객체지향 프로그래밍의 특징 중 하나인 `다형성` 을 구현하는 방법 중 하나

```java
class Test {
  // 1
  static void display(int num1) { 
    System.out.println(num1); 
  }
  // 2
	static void display(int num1, int num2) { 
    System.out.println(num1 * num2); 
  }
  // 3
	static void display(int num1, double num2) { 
    System.out.println(num1 + num2); 
  }
}

public class Method {
    public static void main(String[] args) {
      Test myfunc = new Test();

      myfunc.display(10); 				//1
      myfunc.display(10, 20); 	  //2
      myfunc.display(10, 3.14); 	//3

      myfunc.display(10, 'a');		// 2? 3?
			/* 
			char형은 int형과 double형 모두로 자동 형변환이 가능하다.
			이런 경우, 더 작은 표현 범위를 가지는 int형을 가진 '2'번 메소드가 호출된다.
			(만약,2번 메소드가 없었다면 3번 메소드를 호출할 것)
			*/
    }
}
```





