---
title: Using LINQ to Easily Serialize an Exception to XML
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Using LINQ to Easily Serialize an Exception to XML](/blog/using-linq-to-easily-serialize-an-exception-to-xml)

Posted on **Monday, February 7, 2011**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">Exception</span></li>
<li><span class="badge badge-success p-2">XML</span></li>
<li><span class="badge badge-success p-2">LINQ</span></li>
<li><span class="badge badge-success p-2">serialize</span></li>
</ul>

I was working on my capstone project last semester, and ran into a need to log exception data to a portable format. I loves me some XML, so that was my obvious (and, let's be honest, only) choice. .NET includes a lot of built-in code in most data types to allow for seamless serialization, so I thought this would be a simple matter.

Nope.

Turns out the `Exception` class in .NET contains an `IDictionary` member, `Data`, that contains some extra information that the developer might find useful. The problem? `IDictionary` does not implement `ISerializable`, which is required since it is not a primitive type. So, when I attempt to "lazy" serialize the `Exception` object, the runtime hits the `Data` member and throws an exception.

Drat.

Since I really did not want to have to write some complicated wrapper class (I was a bit pressed for time by this point in the semester), I turned to my trusty friend Google to see how other people had handled this problem. It took a bit of searching, but eventually I found a perfect solution to my problem here: [http://seattlesoftware.wordpress.com/2008/08/22/serializing-exceptions-to-xml/](http://seattlesoftware.wordpress.com/2008/08/22/serializing-exceptions-to-xml/)

The solution is remarkably simple: **extend the `XElement` class in LINQ**. I mean, this is "duh" simple. Once you create the extended class, logging an exception is a simple as this:

```csharp
XDocument log = XDocument.Load( path_to_file );
log.Root.Add( new ExceptionXElement( ex ) );
log.Save( path_to_file );
```

Here's the code as implemented:

```csharp
using System;
using System.Collections;
using System.Linq;
using System.Xml.Linq;

/// <summary>Represent an Exception as XML data.</summary>
public class ExceptionXElement : XElement
{
    /// <summary>Create an instance of ExceptionXElement.</summary>
    /// <param name="exception">The Exception to serialize.</param>
    public ExceptionXElement(Exception exception)
        : this(exception, false)
    { ; }

    /// <summary>Create an instance of ExceptionXElement.</summary>
    /// <param name="exception">The Exception to serialize.</param>
    /// <param name="omitStackTrace">
    /// Whether or not to serialize the Exception.StackTrace member if it's not null.
    /// </param>
    public ExceptionXElement(Exception exception, bool omitStackTrace)
        : base(new Func<XElement>(() =>
        {
            // Validate arguments
            if (exception == null)
            {
                throw new ArgumentNullException("exception");
            }
        
            // The root element is the Exception's type
        
            XElement root = new XElement(exception.GetType().ToString());
        
            if (exception.Message != null)
            {
                root.Add(new XElement("Message", exception.Message));
            }
        
            // StackTrace can be null, e.g.:
            // new ExceptionAsXml(new Exception())
            if (!omitStackTrace && exception.StackTrace != null)
            {
                vroot.Add(
                    new XElement("StackTrace",
                        from frame in exception.StackTrace.Split('\n')
                        let prettierFrame = frame.Substring(6).Trim()
                        select new XElement("Frame", prettierFrame))
                    );
            }
            
            // Data is never null; it's empty if there is no data
            if (exception.Data.Count > 0)
            {
                root.Add(
                        new XElement("Data",
                        from entry in exception.Data.Cast<DictionaryEntry>()
                        let key = entry.Key.ToString()
                        let value = (entry.Value == null) ? "null" : entry.Value.ToString()
                        select new XElement(key, value))
                );
            }
            
                // Add the InnerException if it exists
            if (exception.InnerException != null)
            {
                root.Add(new ExceptionXElement(exception.InnerException, omitStackTrace));
            }
            
            return root;
        })())
    { ; }
}
```

Enjoy!

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Thinking About the Past...](/blog/thinking-about-the-past)
[View all](/blog)
[Making Your XML Sitemap a Little More Useful <i class="fas fa-chevron-right"></i>](/blog/making-your-xml-sitemap-a-little-more-useful)
</div>

