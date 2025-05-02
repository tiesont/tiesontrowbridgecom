---
title: Fun with LINQ
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Fun with LINQ](/blog/fun-with-linq)

Posted on **Monday, August 17, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">LINQ</span></li>
</ul>

Anyone who's read any amount of the content I've put on this site knows I love the C# language. It has a lot of capabilities I find really useful, like strong-typing, properties, generics, etc. I also like that C# has implemented one of the more interesting technologies Microsoft has developed recently: LINQ. LINQ stands for _Language-Integrated Query_, and is a technology we can use to simplify the processing of structured data within the .NET Framework.

My favorite use of LINQ is building database applications. With LINQ, you simply build a database in MS SQL Server, connect to it in the Server Explorer window in Visual Studio, and then drag and drop your tables from the Server Explorer to a special DBML file. DBML, which stands for _Database Markup Language_, is used by LINQ to build classes out of your table definitions. The database column types are converted to their nearest C# equivalent. The fun comes together if you developed your database correctly using primary and foreign keys. If your tables were properly associated in the database, LINQ builds those associations into the LINQ classes it builds from the DBML file.

The LINQ classes have database connections built right into them. So, you can modify an instance of your class that was populated from the database, and then call a special LINQ function called `SubmitChanges()`. LINQ will process the class object and determine what attributes have actually been changed. It then builds LINQ queries to execute against the database, AND it only does that for the values that NEED to be updated. This can save you a lot of bandwidth over time.

Now, you could do this all by hand with the database tools .NET has had pretty much since the beginning. But WHY? LINQ does it just as well, and in a lot of cases BETTER, not to mention QUICKER.

LINQ also comes in handy if you want to parse a structured document, like, say, an XML file. LINQ has an entire library devoted to manipulating and creating XML documents. With a good understanding of building data structures, you can use XML and LINQ to entirely replicate the kind of functionality you get with a database.

The only major beef I have with LINQ is that you don't get something as nice as DBML for automagically transforming your XML into a class object. Which really makes sense if you think about it, since XML just defines structure, so LINQ would really have no idea what types to apply to your XML data, although it could be argued that other languages are capable of inferring data types from anonymous data.

Anyway, I think that is enough rambling for now. I should have some LINQ examples up sometime soon, hopefully before the month is out...

Cheers!

:]

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> PHP Referrer Snippet](/blog/php-referrer-snippet)
[View all](/blog)
[C#, XML, and LINQ: Load &amp; Parse an XML File <i class="fas fa-chevron-right"></i>](/blog/c-xml-and-linq-sample-1)
</div>

