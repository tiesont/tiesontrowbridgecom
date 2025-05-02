---
title: C#, XML, and LINQ&#58; Adding Nodes to an XML File
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C#, XML, and LINQ: Adding Nodes to an XML File](/blog/c-xml-and-linq-sample-2)

Posted on **Wednesday, November 4, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">XML</span></li>
<li><span class="badge badge-success p-2">LINQ</span></li>
</ul>

My [previous example](/tutorial/c-xml-and-linq-sample-1) only covered loading and parsing an XML document. This example will include the code I used to add new nodes to the XML tree.

#### The XML File

For the sake of simplicity, and to be a little more consistent, we will use the same XML file from Sample 1:

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

Classy fellows, these two... :)

#### The C# Class

If you read the previous sample, the code that follows should look pretty familiar. That would be because the majority of the code is the same. We are also using the Student class previously defined in Sample 1.

Let's start off by looking at the code to add a student to the XML tree:

```csharp
/// <summary>
/// Add a new Student node to students file.
/// </summary>
/// <param name="student">A Student object</param>
/// <returns>true if node added, false if node was not added</returns>
public static bool AddStudent(Student student)
{
      if ( student != null )
      {
          try
          {
              XDocument xd = XDocument.Load( "students.xml" );
              xd.Element( "record" ).Add(
                  new XElement( "student",
                      new XElement( "id", student.ID ),
                      new XElement( "firstname", student.FirstName ),
                      new XElement( "lastname", student.LastName ),
                      new XElement( "major", student.MajorID )
                      )
                  );

              xd.Save( "students.xml" );

              return true;
          }
          catch ( Exception ex )
          {
              throw (new Exception(String.Format( "An error occurred. The student could not be saved. Details of this error:\\n\\n{0}", ex.Message )));
          }
      }
      else
      {
          throw(new Exception("Cannot add a null student to the datasource"));
      }
}
```

First, we load the XML document into an XDocument object. This is a LINQ class that gives us a lot of helpful tools for parsing and manipulating XML. If you wanted to, you could use C#'s string parsing tools instead, but it's going to be a lot more work (unless you live and breathe regex, in which case, I tip my hat to you, sir).

Once we have an XDocument object, we can start pushing in new nodes. If you look at the code above, you will see that I am using the Element() method to find the root node, which our XML file says is "record." The next part of that statement is the Add() method. This is being called from the XElement object returned from the Element() method. We can stack these method calls (like I did here), or you could assign the result of `xd.Element("record")` to an `XElement` object and then call it's `Add()` method. I prefer the former because it looks cleaner to me, but feel free to use the latter if it makes more sense to you.

The next part of this code is where the fun begins. The Add() method expects an XElement object as an argument. We could create an XElement object and then pass it to the Add() method, but it's equally valid to create the XElement object <strong>AS</strong> the argument (which is what I did here). The benefit to the latter method is that the new object immediately goes out of scope once the method call finishes, so it's fairly likely the garbage collector will delete it sooner rather than later, since the chance of any "hanging" references is pretty much nil.

Since we are trying to construct a semantically correct XML file, each data value will be written to a node. It is technically valid to embed the values as attributes of a "student" node, but I really hate that method, so I will never cover how you would use attributes. If that bothers anyone, sorry, dem's the breaks.

I already mentioned that the root node of this XML tree is "record." Each data node is called "student" and has attributes nodes for "id," "firstname," "lastname," and "major." The attribute nodes are children of the "student" node. The code I've written to generate this new "student" node reflects this structure. First, we create a new Element and name it "student." When we add a comma and add a new Element, LINQ knows we are adding that element as a child of the element we just defined.

Note where the closing parentheses are. Since we want the attribute nodes to be on the same level, we close each attribute node's constructor call. Once we have defined all of the attribute nodes, we close the data node's constructor call, and then close the Add() method call. To help me keep track of my parentheses, I put each open and close parentheses block on another line, which (like the code block curly braces) helps me make sure I have equal numbers of opening and closing parentheses.

The last thing to do is call the Save() method on the XDocument element. This will write the new node out the file specified, which in our case is the same document we read from.

And you're done!

#### A Note

It is worth noting the try-catch blocks I have around this bit of code. These are useful for gracefully handling any exceptions this code may generate. For instance, this code will fail if the XML file could not be read. It will also cause an exception if the file is read-only.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C#, XML, and LINQ: Load &amp; Parse an XML File](/blog/c-xml-and-linq-sample-1)
[View all](/blog)
[C#, XML, and LINQ: Updating an XML File <i class="fas fa-chevron-right"></i>](/blog/c-xml-and-linq-sample-3)
</div>

