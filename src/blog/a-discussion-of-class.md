---
title: A Discussion of Class
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [A Discussion of Class ](../blog/a-discussion-of-class)

Posted on **Wednesday, March 3, 2010**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">classes</span></li>
<li><span class="badge badge-success p-2">OOP</span></li>
</ul>

I seem to have to explain the concept of "classes" to a lot of programming students lately, so I got to thinking that a new blog post may be in order. So, if you happen to be a newbie programmer and are wondering exactly what a class is, tune in and follow along. Please ask questions at the end, too, if anything is not clear...

### The Basics

"Class" is a term you'll hear thrown around a lot in any discussion of OOP, or object-oriented programming. I wrote a simple article about OOP a while ago, so if that term is new to you, follow [this link](/articles/object-oriented-programming) and read that post first, then come back here. In a nutshell, OOP is a programming technique that seeks to create systems that can model real-world objects and the way in which we interact with them. An object has "attributes," or things that describe it, and "methods," or things it can do. Again, [see my OOP article](/articles/object-oriented-programming) if you need something more in-depth.

Okay, so what the heck is this "class" thing anyway? Well, the analogy that most people are comfortable with seems to be "a class is like a blueprint." A class file represents the attributes and methods of an object within our system. It describes an object as it would exist in our system. When we want to manipulate that kind of object within our system, we create an "instance" of that class object. This would be similar to a construction crew taking a blueprint for a house and actually building a home.

### The Not-So-Basics

One thing that the C# language designers have talked about is that all class definitions are "types." They define **type** as the root classification of any object within a system. So, when you create a new class definition, you are defining your own custom "type." This makes sense if you think about how you would describe your objects to a colleague.

There are two relationships you need to be aware of when creating classes: _**is a**_ and **_has a_**. Say, for instance, that you created a class called "Worker" and then created an instance called "worker1." When you describe worker1, you would say "worker1 _is a_ Worker." **Is a** relationships indicate that worker1 _is an_ object _of type_ Worker.

Let's also assume that when you created your class that you defined a couple of attributes, say, "name," "pay rate," and "job title." We could then say that worker1 _has a_ "name," worker1 _has a_ "job title." This relationship, **has a**, says that our object is defined by those attributes. In other words, those attributes describe the object. For example, let's say that we wanted to represent Bob from Accounting within our system. We could say "worker1 _is a_ Worker who _has a_ name of Bob Smith, who _has a_ job title of Accounting Manager, and who _has a_ pay rate of $25.00 per hour."

### Danger! Danger!

A common trap I see a lot of new programmers fall into is mistaking their class definitions (the class file) for an actual object. It is really important that a clear distinction is made between a class and an object. A class **cannot **be manipulated. It is nothing more than a description, like a diagram of a toad in an anatomy book. An object **can **be manipulated. If we stay with the same analogy, an object would be the actual toad in your dissection pan.

This seems like a good stopping point. Again, if you need anything cleared up, post your questions in the comments, or [use the contact page](/contact) to send me your questions. Thanks!

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C#, XML, and LINQ: Deleting an XML Node](../blog/c-xml-and-linq-deleting-an-xml-node)
[View all](../blog)
[Thinking About the Past... <i class="fas fa-chevron-right"></i>](../blog/thinking-about-the-past)
</div>

