---
title: C/C++ &#58; Creating a Custom Class
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C/C++ : Creating a Custom Class](/blog/cplusplus-classes)

Posted on **Friday, October 3, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">cplusplus</span></li>
<li><span class="badge badge-success p-2">classes</span></li>
</ul>

There are two methods for creating a class in a C++ project. The first method is to code your class directly in the project code in which you will be using the class. However, if you take that route, you cannot reuse that code later (say, for an entirely different project) without opening the first project, copying the code, and pasting it into your new project. The second method involves creating a discrete class project, separate from any program code, and then "including" the class in your program code. I try to always use the second method, for the very simple fact that if I create a class I find useful, I can use it again and again.

So, I will be covering the second method here. :)

#### Let's Get Classy...

As I mentioned previously, a C++ class consists of two parts: a `.h` file and a `.cpp` file. I made up a couple of really simple examples, which you can probably see below. The top sample is the `.h` file, and the bottom sample is its associated `.cpp` file.

#### SampleClass.h

```cpp
#pragma once

class SampleClass
{
    public:
    SampleClass( void ); // constructor
    ~SampleClass( void ); // destructor

    private:
    // internal variables and functions go here

    public:
    /* shared variables and external functions go here */
};
```

#### SampleClass.cpp

```cpp
#include "SampleClass.h"

// default constructor
SampleClass::SampleClass( void )
{
    /* place code here that needs to execute
    when an instance of our class is created */
}

// destructor - this is called when our class object
// is no longer being used.
SampleClass::~SampleClass( void )
{
}

[ return type ] SampleClass::[ function name ]( [ parameter type] [ parameter name ] )
{
    /* place code here that needs to execute
    when this function is called */
}
```

#### `.h` Filetype

Within the `.h` file, you **define** the outline of your class object; what characteristics (variables) it has, and what actions it can perform (functions). You can (and must) define the data-type of your variables and the return type of your functions within the .h file. You DO NOT (and cannot) initialize, or "set default values", for your variables within the `.h` file. That happens within your `.cpp` file.

The `.h` file basically is you telling the compiler _"here is my class, this is the type of data I am going to use, and this is where you find it."_

#### `.cpp` Filetype

The `.cpp` file contains all of the code that is capable of acting on your class data. It is only here, within the `.cpp` file, that you will find the assignment operator, otherwise known as the " = " sign. This is also where you will implement your relational operators ( `<`, `>`, `==`, and `!=` ).

In order for the compiler to know what the outline of your class is, you must include the `.h` file you built previously, using the proper notation:

```cpp
#include "SampleClass.h"
```

Recall (if you read that part already) that there are two distinct ways of including a class in C++. We use `" "` because our class is _not_ part of the STL. If it were, we would use `< >` instead.

#### The Constructor

When you create an instance of your class, the constructor is used to set your member variables (variables local to this class) to a known state, or value. In other words, it **initializes** those variables. This clears out any data that may have previously existed in the location in memory in which our new variables now reside. We do this to make certain that our program will not be crashed by random invalid data.

#### The Destructor

This basically a "self-destruct button" for our class object. When the object goes out of [scope](/blog/programming-primer#scope), it's destructor is called to destroy the object. This frees up any resources the object may have been using (usually memory).

#### Class-level Functions

Class functions are normally used in one of two ways:

- To provide access to our (preferably) private member variables.
- To implement class-level logic, such as calculations, that do not need to be (and perhaps shouldn't be) exposed to the user of our class.

##### Function Examples

Let us suppose our class, SampleClass, has a couple of member variables declared: `char name[25]` and `int age`. Now, if we want to be good OOP programmers (and we do!), we need to enforce encapsulation. That means we should make these variables **private**, since we don't want any ol' bit of code to be able to modify these variables unless we say it can. So we have this:

#### SampleClass.h

```cpp
#pragma once

class SampleClass
{
    public:
    SampleClass( void ); // constructor
    ~SampleClass( void ); // deconstructor

    private:
    // internal variables and functions go here
    char name[25];
    int age;

    public:
    /* shared variables and external functions
    go here */
};
```

Since our variables are now private, we need a way of accessing and/or modifying them. Suppose for now we just want to be able to view the values of our object's variables. We can create a function for each variable that will do just that, like so:

#### SampleClass.h

```cpp
#pragma once

class SampleClass
{
    public:
    SampleClass( void ); // constructor
    ~SampleClass( void ); // deconstructor

    private:
    // internal variables and functions go here
    char name[25];
    int age;

    public:
    /* shared variables and external functions
    go here */
    char* GetName( void );
    int GetAge( void );

};
```

#### SampleClass.cpp

```cpp
#include "SampleClass.h"

// default constructor
SampleClass::SampleClass( void )
{
    /* place code here that needs to execute
    when an instance of our class is created */
}

// deconstructor - this is called when our class object is no longer being used.
SampleClass::~SampleClass( void )
{
}

char* SampleClass::GetName( void )
{
    /* place code here that needs to execute
    when this function is called */
    return name;
}

int SampleClass::GetAge( void )
{
    /* place code here that needs to execute 
    when this function is called */
    return age;
}
```

The "return type" of the function needs to match the data type of the variable whose value we want to return as a result of calling this function.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C/C++ : Includes](/blog/cplusplus-includes)
[View all](/blog)
[Why Sherlock Holmes Would Have Made A Kick-Ass Programmer <i class="fas fa-chevron-right"></i>](/blog/why-sherlock-holmes-would-have-made-a-kick-ass-programmer)
</div>

