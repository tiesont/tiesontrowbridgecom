---
title: C#, XML, and LINQ&#58; Deleting an XML Node
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C#, XML, and LINQ: Deleting an XML Node](/blog/c-xml-and-linq-deleting-an-xml-node)

Posted on **Friday, January 22, 2010**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">XML</span></li>
<li><span class="badge badge-success p-2">LINQ</span></li>
</ul>

So far we've learned [how to load &amp; parse](/tutorial/c-xml-and-linq-sample-1) an XML file, [add new nodes](/tutorial/c-xml-and-linq-sample-2) to it, and [update](/tutorial/c-xml-and-linq-sample-3) it's nodes. Today we're gonna learn the scary part: deleting nodes.

### The XML File

First, we need a data file to parse. For the sake of consistency, we'll use the same data file from the previous tutorials:

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

Simplistic, I know, but this file serves our purpose.

### The Code

And now we will explore the wonderful code I used to delete nodes. Look this over, and then I'll explain what's happening.

```csharp
public static bool RemoveStudent(string id)
{
    if (id != string.Empty)
    {
        try
        {
            XDocument xd = XDocument.Load( "students.xml" );
            xd.Element("record").Elements("student").Where(x => x.Element("id").Value.Trim() == id).Remove();

            xd.Save( "students.xml" );

            return true;
        }
        catch (Exception ex)
        {
            throw new Exception(String.Format("An error occurred. The student could not be removed. Details of this error:\n\n{0}", ex));
        }
    }
    else
    {
        throw new Exception("ID cannot be negative or null.");
    }
}
```

This method gets an ID passed in that should correspond to an ID in the data file. We are again using the awesome LINQ lambda method syntax to search for a "student" node whose "id" element has a value matching the ID that was passed into the method.

```csharp
xd.Element("record").Elements("student").Where(x => x.Element("id").Value.Trim() == id).Remove();
```

The `Remove()` method removes all nodes from the parent node (in our case, "record") that are specified by whatever preceded it. In our case, it's deleting the node (or nodes) that match the `Where()` clause we specified.

It's worth noting that the code I present here will delete multiple nodes if they happen to have the same value for their "id" element. I did not code against that simply because the code I use to write to the data file checks to see if an ID exists already and will not add the node if the ID exists. This basically mimics the "primary key" attribute of a RMDBMS system. If your system does allow the ID element to have duplicates then you will want to add a limit clause such as `First()` or `FirstOrDefault()` after the `Where()` clause.

This method could also be extended by changing the parameter from a single string to a params array. You would then add a loop around the `Remove()` method call to loop until each of the passed-in IDs have been processed, like so:

```csharp
public static bool RemoveStudent( params string[] id_list )
{
    if ( id_list.Count() > 0 )
    {
        try
        {
            XDocument xd = XDocument.Load( "students.xml" );

            foreach ( string id in id_list )
            {
                xd.Element( "record" ).Elements( "student" ).Where( x => x.Element( "id" ).Value.Trim() == id ).Remove();
            }

            xd.Save( "students.xml" );
  
            return true;
        }
        catch ( Exception ex )
        {
            throw new Exception( String.Format( "An error occurred. The student could not be removed. Details of this error:\n\n{0}", ex ) );
        }
    }
    else
    {
        throw new Exception( "ID cannot be negative or null." );
    }
}
```

Questions or comments? You know what to do... :]

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C#, XML, and LINQ: Updating an XML File](/blog/c-xml-and-linq-sample-3)
[View all](/blog)
[A Discussion of Class  <i class="fas fa-chevron-right"></i>](/blog/a-discussion-of-class)
</div>

