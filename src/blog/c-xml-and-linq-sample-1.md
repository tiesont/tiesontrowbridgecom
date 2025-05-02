---
title: C#, XML, and LINQ&#58; Load &amp; Parse an XML File
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C#, XML, and LINQ: Load &amp; Parse an XML File](/blog/c-xml-and-linq-sample-1)

Posted on **Saturday, August 22, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">XML</span></li>
<li><span class="badge badge-success p-2">LINQ</span></li>
</ul>

I promised an example of using LINQ and C# together before the month was out, and it here it is! Whoo. Go me.

Anyway...

In this example, I will provide some sample code of how to use LINQ to parse an existing XML file into a sample class I created in C#. As usual, the code used in this example can be downloaded below.

### The XML File

First, we need a data file to parse. I recently had to make an academic audit application, so I just happen to have an XML file for compiling a list of student data lying around:

```markup
<?xml version="1.0" encoding="utf-8"?>
<record>
  <student>
    <id>2</id>
    <firstname>Buddy</firstname>
    <lastname>Lee</lastname>
    <major>SENG</major>
  </student>
  <student>
    <id>1</id>
    <firstname>Forrest</firstname>
    <lastname>Gump</lastname>
    <major>SENG</major>
  </student>
</record>
```

Obviously, these are fictitious students, so don't get any bright ideas, people.

### The C# Class

This is the class I built to model students within my academic audit application:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

/// <summary>
/// An object for storing student information; implements ICloneable and IComparable
/// </summary>
public partial class Student : ICloneable, IComparable
{
    private string id, firstName, lastName, majorID;
    private Major _major = new Major();

    /// <summary>
    /// Student's major (as a string ID value)
    /// </summary>
    public string MajorID
    {
        get { return majorID; }
        set
        {
            if (value.Length > 0)
            {
                majorID = value;
            }
            else
            {
                throw (new Exception("Major ID must contain a value."));
            }
        }
    }

    /// <summary>
    /// Student's unique identifier
    /// </summary>
    public string ID
    {
        get { return id; }
        set
        {
            if (value.Length > 0)
            {
                id = value;
            }
            else
            {
                throw (new Exception("ID cannot be empty."));
            }
        }
    }

    /// <summary>
    /// Student's first name
    /// </summary>
    public string FirstName
    {
        get { return firstName; }
        set
        {
            if (value.Length > 0)
            {
                firstName = value;
            }
            else
            {
                throw (new Exception("First name must contain a value."));
            }
        }
    }

    /// <summary>
    /// Student's last name
    /// </summary>
    public string LastName
    {
        get { return lastName; }
        set
        {
            if (value.Length > 0)
            {
                lastName = value;
            }
            else
            {
                throw (new Exception("Last name must contain a value."));
            }
        }
    }

    /// <summary>
    /// Major property; returns or accepts a Major object
    /// </summary>
    public Major _Major
    {
        get { return _major; }
        set
        {
            if (value != null)
            {
                _major = value;
            }
            else
            {
                throw (new Exception("Major value cannot be null."));
            }
        }
    }


    /// <summary>
    /// Default constructor
    /// </summary>
    public Student()
        :this(string.Empty, string.Empty, string.Empty, string.Empty)
    {
    }

    /// <summary>
    /// Overloaded constructor
    /// </summary>
    /// <param name="id">A unique ID to identify this student</param>
    /// <param name="firstname">Student's first name</param>
    /// <param name="lastname">Student's last name</param>
    public Student(string id, string firstname, string lastname)
        : this(id, firstname, lastname, string.Empty)
    {
    }

    /// <summary>
    /// Overloaded constructor
    /// </summary>
    /// <param name="id">A unique ID to identify this student</param>
    /// <param name="firstname">Student's first name</param>
    /// <param name="lastname">Student's last name</param>
    /// <param name="major">Student's Major (as a string ID)</param>
    public Student(string id, string firstname, string lastname, string major)
    {
        this.ID = id;
        this.FirstName = firstname;
        this.LastName = lastname;
        this.majorID = major;
    }

    /// <summary>
    /// Overloaded constructor
    /// </summary>
    /// <param name="id">A unique ID to identify this student</param>
    /// <param name="firstname">Student's first name</param>
    /// <param name="lastname">Student's last name</param>
    /// <param name="major">Student's Major (as a Major object)</param>
    public Student(string id, string firstname, string lastname, Major major)
        : this(id, firstname, lastname, major.ID)
    {
        this._Major = major;
    }


    object ICloneable.Clone()
    {
        return this;
    }


    /// <summary>
    /// Determines if this Student object is identical to another Student object
    /// </summary>
    /// <param name="obj">The right-hand object to compare to this object</param>
    /// <returns>true if objects match; false if they do not</returns>
    public override bool Equals(object obj)
    {
        Student right = (Student)obj;
        return (this.ID == right.ID && this.FirstName == right.FirstName && this.LastName == right.LastName);
    }

    /// <summary>
    /// Generate hashcode for comparing instances of student objects
    /// </summary>
    /// <returns>This object as a hashcode</returns>
    public override int GetHashCode()
    {
        return base.GetHashCode();
    }

    /// <summary>
    /// Displays student data as [ID] Last name, First name
    /// </summary>
    /// <returns>This Student object as a string</returns>
    public override string ToString()
    {
        return String.Format("[{3}] {0}, {1}", this.LastName, this.FirstName, this.ID);
    }

    int IComparable.CompareTo(object obj)
    {
        Student right = (Student)obj;
        return this.LastName.CompareTo(right.LastName);
    }
}
```

As you can see, there is a class attribute for every element of a student node in the XML file. While this class does look a bit long, it really isn't. I added some validation to the properties and implemented a couple of interfaces (for sorting, mostly). You will also notice the comments that are preceded with three slashes. Those are what as known as XML comments. Visual Studio can use those to build tool tips for it's auto-complete tool when you are using your class in some part of your project.

### Adding LINQ

Now, the fun part of LINQ is taking the data from our XML file and building class objects with it. How do we do that? Glad you asked!

I built two different methods for getting student data. The first method will return a single student, like so:

```csharp
/// <summary>
/// Get data for a single student record
/// </summary>
/// <param name="id">A student ID</param>
/// <returns>A Student object</returns>
public static Student GetStudent(string id)
{
    XDocument xd = XDocument.Load("students.xml");

    try
    {
        var s = xd.Element("record").Elements("student").FirstOrDefault(x => x.Element("id").Value.Trim() == id);
        Student student = new Student(
                s.Element("id").Value,
                s.Element("firstname").Value,
                s.Element("lastname").Value,
                s.Element("major").Value
                );

        student._Major = GetMajor(student.MajorID);

        return student;
    }
    catch
    {
        return null;
    }
}
```

The second method builds a list of student objects:

```csharp
/// <summary>
/// Attempt to load the student data from the default location.
/// </summary>
/// <param name="path">Path to the Student XML file.</param>
/// <returns>A List<> of Student objects.</returns>
public static List<Student> Students(string path)
{
    XDocument xd = XDocument.Load(path);
    List<Student> students = new List<Student>();

    //  Method syntax (lambda expression)
    var stds = xd.Element("record").Elements("student");

    try
    {
        foreach (var s in stds)
        {
            students.Add(
                new Student(
                    s.Element("id").Value,
                    s.Element("firstname").Value,
                    s.Element("lastname").Value,
                    s.Element("major").Value
                    )
                );
        }

        return students;
    }
    catch
    {
        throw (new Exception("Student data file could not be parsed."));
    }
}
```

As you can see, the methods aren't terribly different, and are actually fairly simple.

Now, these two methods are inside a static class I created called `DataLoader`. DataLoader is static so that I don't have to actually create an instance of it in order to use it's methods. We likes that, yes we do.

In order to gain access to all the fun LINQ XML tools, we have to add a reference to a special library, like so:

```csharp
using System.Xml.Linq;
```

Once we do that, you get access to `XDocument`. We use `XDocument` to read in our XML file. We could just use the regular `StreamReader` in the `System.IO` library, but `XDocument` objects let us apply LINQ methods to find the nodes we're looking for. Using `StreamReader`, we'd have to build either a fairly complicated substring method, or come up with a good regex pattern to find what we wanted.

As you can see in the first example above, it's not too hard to find a node. We take our `XDocument` object (xd), and (using it's built-in query methods) descend through the node elements until we find elements that contain a value we want. In my case, I'm looking for a student node that has an id element whose value equals the id parameter I passed into the method. `FirstOrDefault` returns the first node that matches or NULL is no node is found that matches.

In the second example, I simply grab every node. That little bit of LINQ code returns an enumerated collection of XElements (the objects LINQ uses to represent XML nodes). I can then use a foreach loop to iterate through that collection and build a list of student objects, assigning the attribute nodes of each student node to the correct attribute in a student object.

Pretty cool, huh?

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Fun with LINQ](/blog/fun-with-linq)
[View all](/blog)
[C#, XML, and LINQ: Adding Nodes to an XML File <i class="fas fa-chevron-right"></i>](/blog/c-xml-and-linq-sample-2)
</div>

