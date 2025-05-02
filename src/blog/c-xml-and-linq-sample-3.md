---
title: C#, XML, and LINQ&#58; Updating an XML File
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C#, XML, and LINQ: Updating an XML File](../blog/c-xml-and-linq-sample-3)

Posted on **Monday, November 30, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">XML</span></li>
<li><span class="badge badge-success p-2">LINQ</span></li>
</ul>

So far, I have shown you [how to load and parse an XML document into a C# class](/tutorial/c-xml-and-linq-sample-1), and also [how to add new nodes to an XML document](/tutorial/c-xml-and-linq-sample-2) using C#. So now we have reached the fun part: updating an existing node!

### The XML File

We're going to use our same trusty XML file for this tutorial:

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

Next we take a look at the code we need to modify this file.

### The C# Class

As before, this code should look fairly familiar. If you've followed along so far (and I've made any sense), you should be able to recognize the LINQ code in this sample:

```csharp
/// <summary>
/// Updates a Student node with new values
/// </summary>
/// <param name="id">The student's unique identification number</param>
/// <param name="firstname">The student's first name</param>
/// <param name="lastname">The student's last name</param>
/// <returns>true if update succeeded; false otherwise</returns>
public static bool UpdateStudent(string id, string firstname, string lastname)
{
    if (firstname != string.Empty && lastname != string.Empty)
    {
        string path = "students.xml";
        XDocument xd = XDocument.Load(path);
        XElement node = xd.Root.Elements("student").FirstOrDefault(x => x.Element("id").Value.Trim() == id);

        if (node != null)
        {
            node.SetElementValue("firstname", firstname);
            node.SetElementValue("lastname", lastname);

            xd.Save(path);
            
            return true;
        }

        return false;
    }
    
    return false;
}
```

Looks pretty simple, doesn't it? Well, I hate to break it to you masochists out there, but it really is _that_ easy with LINQ.

We use some lambda syntax to search for a node identified by the id value we passed in. Then we check to see if the node object we created is null. If it is, we know we did not find a node in the XML document that has the specified id, since `FirstOrDefault()` returns NULL in this instance if a node is not found that matches the lambda expression. If the object is not null, we assume we have the correct node. We then use a method called `SetElementValue()` to set the new values of the firstname and lastname attribute nodes of this node. All that's left to do then is call the `Save()` method on the `XDocument` parent, and we're done. We return true to let the calling code know that the save operation was successful.

The conditional I placed around the actual save code is more or less optional. In my case, I did not want to let a user change a student's first and last name values to null strings, so I added the conditional to short-circuit the method and return false if the user attempted to pass in some null strings for either attribute. You could remove this conditional if your datasource doesn't require each attribute to have a value.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C#, XML, and LINQ: Adding Nodes to an XML File](../blog/c-xml-and-linq-sample-2)
[View all](../blog)
[C#, XML, and LINQ: Deleting an XML Node <i class="fas fa-chevron-right"></i>](../blog/c-xml-and-linq-deleting-an-xml-node)
</div>

