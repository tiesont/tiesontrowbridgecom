---
title: Object-Oriented Programming
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Object-Oriented Programming](/blog/object-oriented-programming)

Posted on **Saturday, September 27, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">OOP</span></li>
</ul>

Object-oriented programming centers around the idea that everything can be represented as an object. Each object has characteristics, represented programmatically as variables, and actions it can perform, represented programmatically with subroutines and functions.

While syntax will vary, every object-oriented programming (OOP) language conforms to certain standards. What this means is that if a programmer learns the basic premises of OOP, namely _encapsulation_, _polymorphism_, and _inheritance_, he or she should be able to successfully adapt to any OOP programming language.

### The Basics

Since understanding encapsulation, polymorphism, and inheritance are important keys to correctly grasping the idea of OOP, I will take a moment here to explain a little bit about each of these points.

#### Encapsulation

**Encapsulation** revolves around one central tenet: only the object in which the variables, subroutines, and functions are contained should have access to those items, unless an outside object is _explicitly_ given access. This is defined by the item's "accessibility level." The syntax varies slightly depending on the language you are using, but every language seems to agree on the two most basic accessibility levels: **private** and **public**.

_Private_ elements can only be accessed by the code in which they are defined. _Public_ elements can be accessed by any code into which our original code is embedded.

There are also intermediate stages of accessibility that exist between private and public: **shared**, **static**, **friend**, **protected**, and **protected internal** being the first to come to mind. I am sure there are other terms in other languages, but they all boil down to have the same meaning.

I know this all sounds a bit vague, but I want to avoid using specific references unless I am discussing a specific language.

#### Polymorphism

**Polymorphism** is a fairly "simple" concept. It means that one object can be adapted to suit new requirements, should the need arise. It always best to create your objects with re-usability in mind.

Polymorphism is achieved programmatically through the use of **overrides** and **overloads**. The syntax is slightly different for each language, so I'll cover that in each section. **Overrides** replace an existing method, function, or subroutine with another of the same name. This occurs most often during inheritance. **Overloads** provide additional implementations of one method, function, or subroutine. Overloading occurs most frequently when creating **object constructors**. Constructors are special functions that are called when we create a new instance of our object, and are used to set our new object's attributes to a known state.

#### Inheritance
**Inheritance** is the concept that confuses many new programmers. Inheritance centers on the principle of starting with a "base" object and building on that object to create new objects. Anthropology students should recognize this idea fairly quickly, as it is very similar to the theory of evolution. Each succeeding "evolution" of the base object adds more functionality or more characteristics to the original object. The new object will have most of the characteristics (depending on the "accessibility level" I mentioned previously) of the base object, plus it's own unique characteristics.

### Classes

Most OOP languages implement OOP through the use of **classes**. [Wikipedia](http://en.wikipedia.org/wiki/Class_(computer_science)) has a good definition of what a class is:

> In object-oriented programming, a class is a programming language construct that is used as a blueprint to create objects. This blueprint includes attributes and methods that the created objects all share.

I really like their use of the term "blueprint," because it is a very accurate analogy for how classes are used. When we create a class file, we are _defining_ what our object is and does, but we do not have a "real" object to manipulate. When we want an object to manipulate, we construct (create) an instance of our class, which then has all the attributes and "abilities" our blueprint says it should. If it helps, think of our class file as a stamp press machine. When we create an instance of the class, it is like we are having the machine stamp out a part for us...

### Summary

Object-oriented programming is a method used to represent real-word objects electronically in a way that allows a user to apply logic to manipulate those objects.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Tutorial One: HTML &gt;&gt; PHP](/blog/tutorial-one-html-php)
[View all](/blog)
[Conditional Statements <i class="fas fa-chevron-right"></i>](/blog/conditional-statements)
</div>

