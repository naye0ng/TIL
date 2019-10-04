# 자바 API 클래스

- java.lang 패키지는 자바에서 가장 기본적인 동작을 수행하는 클래스들의 집합이다.
- 자바에서 java.lang 패키지의 클래스들은 import 문을 사용하지 않아도 클래스 이름만으로 바로 사용할 수 있다.



## I. Object 클래스

- 모든 자바 클래스는 Object 클래스를 자동으로 상속받으며, Object클래스의 모든 메서드를 바로 사용할 수 있다.
-  Object 클래스는 필드를 가지지 않으며, 총 11개의 메소드만으로 구성된다.



#### toString() 메소드

- 해당 인스턴스에 대한 정보(주소)를 문자열로 반환한다.

```java
Car car01 = new Car();
Car car02 = new Car();

System.out.println(car01.toString());	// Car@15db9742
System.out.println(car02.toString());	// Car@6d06d69c
```



#### equals() 메소드

- equals() 메소드는 해당 인스턴스를 매개변수로 전달받는 참조 변수와 비교하여, 그 결과를 반환
- 참조 변수가 가리키는 값을 비교하므로, 서로 다른 두 객체는 언제나 false를 반환

```java
Car car01 = new Car();
Car car02 = new Car();

System.out.println(car01.equals(car02));	// false

car01 = car02; // 두 참조 변수가 같은 주소를 가리킴.
System.out.println(car01.equals(car02));	// true
```



#### clone() 메서드

- clone() 메소드는 해당 인스턴스를 복제하여, 새로운 인스턴스를 생성해 반환한다.
- Object 클래스의 clone() 메소드는 단지 필드의 값만을 복사하므로, 필드의 값이 배열이나 인스턴스면 제대로 복제할 수 없다.
- **클래스에서 clone() 메소드를 오버라이딩하여, 복제가 제대로 이뤄지도록 재정의**해야 한다.
- **clone() 메소드는 데이터의 보호를 이유로 Cloneable 인터페이스를 구현한 클래스의 인터페이스만 사용이 가능**하다.

```java
class Car implements Cloneable {
    private String modelName;
		private ArrayList<String> owners = new ArrayList<String>();
  
  	public Object clone(){
        try{
            Car clonedCar = (Car)super.clone();
          	// owners에 대한 clone를 따로해줘야 한다.
            clonedCar.owners = (ArrayList)owners.clone();
            return clonedCar;
        }catch(CloneNotSupportedException e) {
            e.printStackTrace();
            return null;
        }
    }

}

public class JavaStudy01 {
    public static void main(String[] args) throws CloneNotSupportedException {
        Car car01 = new Car();
        Car car02 = (Car)car01.clone();
    }
}
```



## II. String 클래스 vs StringBuffer 클래스

### a. String 클래스

- String 객체는 한 번 생성되면 그 값을 읽기만 할 수 있으며, 변경이 불가능(immutable)하다.



#### charAt()

- 해당 메소드는 해당 문자열의 특정 인덱스에 해당하는 문자를 반환한다.

```java
String str = new String("java");

for(int i=0;i<str.length();i++){
  System.out.print(str.charAt(i)+" ");	// j a v a
}
```



### b. StringBuffer 클래스

- 변경이 가능한(mutable) 문자열 클래스





## III. Wrapper 클래스

- 기본 타입의 데이터를 객체로 취급해야하는 경우, 기본 타입 데이터를 객체로 포장해주는 래퍼 클래스를 사용해야한다.

| 기본 타입 | 래퍼 클래스 |
| --------- | ----------- |
| byte      | Byte        |
| short     | Short       |
| int       | Integer     |
| long      | Long        |
| float     | Float       |
| double    | Double      |
| char      | Character   |
| boolean   | Boolean     |

- 레퍼 클래스는 산술 연산을 위해 정의된 클래스가 아니므로, 인스턴스에 저장된 값을 변경할 수 없다.
- 값을 참조하기 위해 새로운 인스턴스를 생성하고, 생성된 인스턴스의 값만 참조할 수 있다.



#### 박싱과 언박싱

- 박싱 : 기본 타입 => 래퍼 클래스
- 언박싱 : 래퍼 틀래스 => 기본 타입



#### 오토 박싱과 오토 언박싱

```java
Integer num = new Integer(10);	// 박싱
int n = num.intValue();	// 언박싱

Integer num2 = 10;	// 오토 박싱
int n2 = num2	// 오토 언박싱
```



> #### 래퍼 클래스 인스턴스의 비교
>
> - 래퍼 클래스역시 객체이므로 '=='은 주소를 비교한다. 그러므로 값을 바교하려면, equals()를 사용해야 한다.
>
> ```java
> Integer num1 = 10;
> Integer num2 = 10;
> 
> System.out.println(num1 == num2);	// false
> System.out.println(num1.equals(num2));	// true
> ```



## IV. Enum 클래스

- 열거체(enumeration type) 클래스

- 열거체의 장점

  1. 실제 값뿐만 아니라 타입까지도 체크가 가능
  2. 상숫값이 재정의되더라도 다시 컴파일할 필요가 없다.

- **enum은 고정된 상수의 집합**이기 때문에 컴파일시 값을 알아야 한다. 




#### 열거체의 정의 및 사용

- `enum` 키워드를 사용하여 열거체 정의

```java
// enum 열거체이름{상수이름1, 상수이름2, ...}
enum Rainbow { RED, ORANGE, YELLOW, GREEN, BLUE }

// 열거체이름.상수이름
Rainbow.RED
```

- enum 객체는 정의된 순서대로 상수값(0부터 시작)을 할당받는다.

  ```java
  enum Rainbow { RED, ORANGE, YELLOW, GREEN, BLUE, INDIGO, VIOLET }
  
  public class JavaStudy01 {
      public static void main(String[] args){
          System.out.println(Rainbow.RED.ordinal());	// 0
      }
  }
  ```

- **불규칙한 상수값을 가지는 emum 객체를 정의할 때는 인스턴스 변수와 생성자를  별도로 추가해야한다.**

  ```java
  enum Rainbow {
      RED(3), ORANGE(10), YELLOW(21), GREEN(5), BLUE(1), INDIGO(-1), VIOLET(-11);
  		// value 선언 및 생성자 선언 
      private final int value;
      Rainbow(int value) { this.value = value; }
    	// value 값을 출력하는 함수를 만들어줌
      public int getValue() { return value; }
  }
  
  public class JavaStudy01 {
      public static void main(String[] args){
        	System.out.println(Rainbow.RED.ordinal());	// 0
          System.out.println(Rainbow.RED.getValue());	// 3
      }
  }
  ```



## V. java.util.Arrays 클래스

- Arrays 클래스에는 배열을 다루기 위한 다양한 메소드가 포함됨
- Arrays 클래스의 모든 메소드는 클래스 메소드(static method)이므로, **객체를 생성하지 않고도 바로 사용할 수 있다.**



#### binarySearch() 메소드

- 전달받은 배열에서 특정 객체의 위치를 이진 검색 알고리즘을 사용하여 검색후, 위치를 반환한다.
- 이 메소드는 **이진 검색 알고리즘을 사용하므로, 매게변수로 전달되는 배열이 sort() 메소드를 사용하여 정렬되어 있어야만 제대로 동작**한다.

```java
int[] arr = new int[1000];
for(int i = 0; i < arr.length; i++) {
    arr[i] = i;
}

System.out.println(Arrays.binarySearch(arr, 500))	// 500
```



#### copyOf() 메소드

- 전달받은 배열의 특정 길이만큼 새로운 배열로 복사하여 반환하는 메소드

```java
int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = Arrays.copyOf(arr1, 3);

for (int i = 0; i < arr2.length; i++) {
    System.out.print(arr2[i] + " ");	// 1 2 3
}

int[] arr3 = Arrays.copyOf(arr1, 7);
for (int i = 0; i < arr3.length; i++) {
    System.out.print(arr3[i] + " ");	// 1 2 3 4 5 0 0
}
```



#### copyOfRange() 메소드

```java
int[] arr1 = {1, 2, 3, 4, 5};
int[] arr2 = Arrays.copyOfRange(arr1, 2, 5);
for (int i = 0; i < arr2.length; i++) {
    System.out.print(arr2[i] + " ");	// 3 4 5
}
```



#### fill() 메소드

- 배열의 모든 요소를 특정 값으로 초기화

```java
int[] arr = new int[5];
Arrays.fill(arr, 7);	// {7,7,7,7,7}
```

