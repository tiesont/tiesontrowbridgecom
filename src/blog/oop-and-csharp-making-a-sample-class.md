---
title: OOP and C#&#58; Making a Sample Class
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [OOP and C#: Making a Sample Class](../blog/oop-and-csharp-making-a-sample-class)

Posted on **Friday, January 2, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">OOP</span></li>
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">classes</span></li>
</ul>

Understanding the principles of OOP (object-oriented programming) is very important for those who wish to become .NET programmers, since the .NET Framework is built on the premise that everything is an Object. Since C# was created specifically to implement the .NET Framework, it stands to reason that C# is a good language to demonstrate the development of an object from a logical construct to a piece of working code. The code we will develop here can also be modified to work in pretty much any language that supports OOP. So, get your pencils and notepads ready, kids. It's time to build an object!

#### The Construct

OOP is all about using code to represent some "thing," some real-life object that we can quantify the various aspects (or attributes) of. Therefore, the first step we need to take is to decide on the "thing" we want to model. For our purposes, we should probably make it as simple an object as we can since a complicated object requires a lot of complicated code to reproduce. So... how about a box? It has enough attributes to be interesting, but is simple enough to not require us to write lines and lines of code. Hmm. I like it. A box it is!

#### The Outline

Now that we have an object to model, let's think about how we would be able to reproduce that object in code.

Hmm...

We know all boxes have these three attributes: height, width, and length. Feel free to add any other attributes you can think of, but these three are the bare minimum we need. Using those attributes, we can easily calculate a few more attributes: volume and surface area. We'll stick to those two calculated attributes, for the time being.

So, let's see what we have so far:

```box
- Object: Box.
- Attributes:
	- height
	- width
	- length
	- volume
	- surface area
```

Not too shabby. That's all we need to make the first version of our object, as seen below:

##### Box

```box
- length
- height
- width
- volume
- surface area
```

#### Encapsulate the Attributes

One of the most important tenets of OOP is that we do not want to just let any ol' piece of code manipulate our object's attributes. We want to "protect" our attributes from all code except that which we give explicit permission. This is a process called **encapsulation**. Think of it as "insulating" our attributes. We do this by changing each of our attribute's modifier, or accessibility level. C# has a bunch of intermediate modifiers, but for now we will only worry about the extremes: private and public. Public attributes are openly accessible by all code, whereas private attributes are only accessible from the code that is within the same scope as the attributes. So, if we want to make our Box attributes "hidden" from code outside our Box code, we simply make them private, like so:

##### Box

```box
private:
- length
- height
- width
- volume
- surface area
```

Now, I know what some of you are thinking: if nothing can access those attributes, how do I set their values? Good catch! There are three ways we can do this. One method involves something we call a constructor, which I'll get into later. Another way is to create what we call **functions** (or **methods**, if you were to insist on proper C# nomenclature) to set and/or get the value of each attribute. C# also gives us a nice programming construct called a **property**, which, depending on how it is used in your code, will either get or set the value of your attribute. I really like properties, so the code we will be developing will use them. Our properties are identified by using a capitalized version of the attribute name, and should be public, since we want to make them accessible to external code. Our object now looks something like this:

##### Box

```box
private:
- length
- height
- width
- volume
- surface area
	
public:
- Length
- Height
- Width
- Volume
- Surface Area
```

Not bad, if I do say so myself...

#### Create the Class Code

At this point, we've worked through enough of the logic of our object to start working on a real chunk of code. In C#, we can use the **class** construct to build our object. It's actually remarkably simple, which is one reason I like C# so much.

We're only going to create the actual class code here. If you were writing this class for a real project, say a class library or some C# application, we would need to add something called a **namespace** to this class code. We are not working on a project that needs compiling, though, so for now, don't worry about it. I just wanted to make sure you were aware that this code will need some adjustments if you want to see it in action...

First, we need to define the beginning and end of the Box class. This is actually pretty easy:

```csharp
class Box
{
}
```

The keyword **class** informs the compiler that we are creating an object blueprint. The open and close curly braces, **{ &nbsp; }**, define the scope of the class. Next, we add our attributes to the class. We also need to decide on what type of values we want each attribute to hold. I like flexibility, so I'm going to choose the widest data type I can, **double**, for all the attributes. Also, we don't really _need_ to specify that the attributes are private, since C# makes them private by default, but I like to anyway. It's a good habit to get into, in my opinion. So, we should have something like this, now:

```csharp
class Box
{
   private double length;
   private double height;
   private double width;
   private double volume;
   private double surface_area;
}
```

Here's the fun part: the properties. The properties will share the same data type as the attribute each is matched with. However, each property will be public, rather than private, since we want to use these properties to modify or view the value of each attribute. Each property defines its own scope, and within that scope we place two more keywords: **get** and **set**. The **get** part of the property is used to view the value of our attribute, using the keyword **return**. The **set** part of the property is used to change the value of our attribute, using the keyword **value**. I will explain this process more in just a moment, but first, let's see what our class looks like with the properties added:

```csharp
class Box
{
   private double length;
   private double height;
   private double width;
   private double volume;
   private double surface_area;

   public double Length
   {
      get{ return length; }
      set{ length = value; }
   }

   public double Height
   {
      get{ return height; }
      set{ height = value; }
   }
   
   public double Width
   {
      get{ return width; }
      set{ width = value; }
   }

   public double Volume
   {
      get{ return volume; }
      set{ volume = value; }
   }

   public double Surface_Area
   {
      get{ return surface_area; }
      set{ surface_area = value; }
   }
}
```

Now that we have our properties in place, we should probably work out the logic for calculating our Box object's volume and surface area. Volume is easy; we simply multiply length by width by height. Surface area is a little trickier: we basically have to find the area of six different rectangles. We know that there are only three unique sides, so a simple formula could be this:

```
2 x ( ( length x height ) + ( length x width ) + ( height x width ) )
```

Now that we know how to calculate our volume and surface area, we should add a couple of methods to our class so that we can make these calculations whenever we need to.

```csharp
class Box
{
   [ rest omitted ... ]

   public void Calculate_Volume( )
   {
      volume = length * width * height;
   }

   public void Calculate_Surface_Area( )
   {
      surface_area = 2 * ( ( length * height ) + ( length * width ) + ( height * width ) );
   }
}
```

At this point, all the fundamental parts of our class are set. We could use this blueprint to create Box objects in a project, if we were so inclined. There is one more thing we should do, however. It would be really useful to be able to set the dimensions of our Box when we create it, instead of having to create the Box and then set the dimensions using the properties. We can add this ability by creating overloaded constructors. A **constructor** is a very specialized method that is called every time we create an instance of a class object. In C#, if we don't create a constructor in our class code, the compiler adds one for us. This "default" constructor cannot accept any arguments, however, so it's usefulness is somewhat limited. If we need a constructor to be able to accept arguments, then we create **overloaded constructors**. An overloaded constructor has the exact same name as the default constructor, but we add parameters to it to match the kind of data we want to pass in. So, if we want to be able to set the dimensions of our Box when we create it, we might add something like this:

```csharp
class Box
{
   [ omitted ... ]

   public Box( double len, double wid, double hgt )
   {
      length = len;
      width = wid;
      height = hgt;
   }

   [ omitted ... ]
}
```

We are almost done, but we have to do one more thing. Since we created an overloaded constructor, the C# compiler will no longer add the default constructor for us. Since every class _must_ supply a default constructor, we have to create one or we will not be able to use our nice shiny new class code. Thankfully, default constructors are simple to make: we simply use the code from the overload, but remove the parameters and set all of our dimensions equal to zero, like so:

```csharp
class Box
{
   public Box()
   {
      length = 0;
      width = 0;
      height = 0;
   }

   [ omitted ... ]
}
```

#### The Finished Class

And we're done! Here is our new Box class, with everything we talked about in one file:

```csharp
class Box
{
   private double length;
   private double height;
   private double width;
   private double volume;
   private double surface_area;

   public Box( )
   {
      length = 0;
      width = 0;
      height = 0;
   }

   public Box( double len, double wid, double hgt )
   {
      length = len;
      width = wid;
      height = hgt;
   }

   public double Length
   {
      get{ return length; }
      set{ length = value; }
   }

   public double Height
   {
      get{ return height; }
      set{ height = value; }
   }

   public double Width
   {
      get{ return width; }
      set{ width = value; }
   }

   public double Volume
   {
      get{ return volume; }
      set{ volume = value; }
   }

   public double Surface_Area
   {
      get{ return surface_area; }
      set{ surface_area = value; }
   }

   public void Calculate_Volume( )
   {
      volume = length * width * height;
   }

   public void Calculate_Surface_Area( )
   {
      surface_area = 2 * ( ( length * width ) + ( length * height ) + ( height * width ) );
   }
}
```

#### C# Properties

The interesting thing about a C# property is that, depending on which side of the assignment ( '=' ) operator it is on, the property can be used to either assign (set) a value to an attribute, or can be used to return (get) the current value of the attribute. If the property is used on the left side of the assignment operator, the 'set' part of the property is used. If the property is used on the right side of the assignment operator, then the 'get' part of the property is used.

Pretty neat, huh? I think so...

#### The Wrap Up

While not the best of walk-throughs, I do think the information I presented here is fairly useful. This is very similar to the technique I use every time I write a small project, and I hasn't failed me yet...

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> HTML + CSS = A Calendar? Cool!](../blog/html-css-calendar)
[View all](../blog)
[C# Sample: RandomDataSet Class <i class="fas fa-chevron-right"></i>](../blog/csharp-sample-randomdataset-class)
</div>

