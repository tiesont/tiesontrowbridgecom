---
title: Overloading Constructors in Java
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Overloading Constructors in Java](/blog/overloading-constructors-in-java)

Posted on **Thursday, March 24, 2011**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">Java</span></li>
<li><span class="badge badge-success p-2">OOP</span></li>
<li><span class="badge badge-success p-2">overloading</span></li>
<li><span class="badge badge-success p-2">constructors</span></li>
</ul>

Overloading: bad for boats, but endlessly useful in the programming world. In this post, I'll show you how to take advantage of this core concept in Java.

Let's assume you have a decent grasp on OOP. You can create basic classes containing fields and properties, and maybe a handful of utility methods. Great! Now, let's assume you have built this class:


```java
import java.lang.*;

/**
*   Sample class
*/
public class MyClass {

	private int id;
	private String name;
   
	/**
	* Gets the current value of the id field
	*/
	public int getId() {
		return this.id;
	}
   
	/**
	*   Assigns a new value to the id field
	*   @params value
	*                   The value to assign to the id field
	*/
	public void setId( int value ) {
		this.id = value;
	}
   
	/**
	* Gets the current value of the name field
	*/
	public String getName() {
		return this.name;
	}
   
	/**
	*   Assigns a new value to the id field
	*   @params value
	*                   The value to assign to the name field
	*/
	public void setName( String value ) {
		this.name = value;
	}
}
```

And we can further assume you have used your class in another project like this:

```java
import java.lang.*;
import java.utils.*;

public class MyTestClass {
   
	/**
	*   Main entry point for the application
	*/
	public int main( ){
	   
		MyClass myObject = new MyClass();
		myObject.setId( 1 );
		myObject.setName( "Sam" );
	   
		System.out.println( "This object is " + myObject.getName() + " [" + myObject.getId() + "]" );
   
		return 0;
	} 
}
```

If you've done this a lot, you may have started to think to yourself that this is a rather verbose way of using classes; creating an instance, then setting the values of the class fields; lather, rinse, repeat. It gets to be dull and repetitive after a while.

To our rescue come a handy-dandy feature of the Java language called "overloading." Specifically, we can do something called "constructor overloading."

### Overloaded Constructor

Hopefully the term **constructor** is not new to you. We use constructors in our classes to initialize each instance of the class. When you write this,

```java
MyClass myObject = new MyClass();
```

you are calling the default constructor. This is triggered by the use of the keyword `new`. `new` tells the compiler to look for a constructor in the class that matches the number and type of arguments provided. Since our examples so far omit any arguments, the default constructor is used. The default constructor is provided for us by the runtime, so long as we don't create our own constructors. We want to be more efficient, though, so we're going to overload the constructor to allow us to set the id and name fields when we create an object, like so:

```java
/**
*   Overloaded constructor. Accepts initializing values for id and name.
*   @params id
*                   The value to assign to the id field
*   @params name
*                   The value to assign to the name field
*/
public MyClass( int id, String name ) {
    setId( id );
    setName( name );
}
```

### Overloading

We use the term **overloading** because we are creating a method with the same name as an existing method. That means we are assigning multiple meanings to one statement. The runtime has to choose which meaning we intend by comparing the arguments supplied to the definitions in the class file. Since our first example supplies no arguments, the runtime uses the default constructor. If we now add another instance of our object to the test class but supply an `id` and a `name` to the method call, the runtime looks for a constructor that matches:
```java
MyClass myOtherObject = new MyClass(2, "Max");

System.out.println( "This object is " + myOtherObject.getName() + " [" + myOtherObject.getId() + "]" );
```

If you run the test class, you can see that the result of each println() is the same, but the second object's definition is much more concise.

### The Complete Example

Here's the complete code for each class.

#### MyClass.java
```java
import java.lang.*;

/**
*   Sample class
*/
public class MyClass {

	private int id;
	private String name;
   
	/**
	* Default constructor
	*/
	public MyClass() {
	}
   
	/**
	*   Overloaded constructor. Accepts initializing values for id and name.
	*   @params id
	*                   The value to assign to the id field
	*   @params name
	*                   The value to assign to the name field
	*/
	public MyClass( int id, String name ) {
		setId( id );
		setName( name );
	}
   
	/**
	* Gets the current value of the id field
	*/
	public int getId() {
		return this.id;
	}
   
	/**
	*   Assigns a new value to the id field
	*   @params value
	*                   The value to assign to the id field
	*/
	public void setId( int value ) {
		this.id = value;
	}
   
	/**
	* Gets the current value of the name field
	*/
	public String getName() {
		return this.name;
	}
   
	/**
	*   Assigns a new value to the id field
	*   @params value
	*                   The value to assign to the name field
	*/
	public void setName( String value ) {
		this.name = value;
	}

}
```

#### MyTestClass.java

```java
import java.lang.*;
import java.utils.*;

public class MyTestClass {
   
	/**
	*   Main entry point for the application
	*/
	public int main( ){
	   
		MyClass myObject = new MyClass();
		myObject.setId( 1 );
		myObject.setName( "Sam" );
	   
		System.out.println( "This object is " + myObject.getName() + " [" + myObject.getId() + "]" );
	   
		MyClass myOtherObject = new MyClass(2, "Max");
	   
		System.out.println( "This object is " + myOtherObject.getName() + " [" + myOtherObject.getId() + "]" );
   
		return 0;
	}
   
}
```

Hopefully, this all makes sense. If not, either use the comment feature below or use the [Contact](/contact) page.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> The Not-So-Great PHP/MySQL Tutorial, Part 2](/blog/the-not-so-great-php-mysql-tutorial-part-2)
[View all](/blog)
[Hobbies, Standards, and Ethics - Oh My! <i class="fas fa-chevron-right"></i>](/blog/hobbies-standards-and-ethics-oh-my)
</div>

