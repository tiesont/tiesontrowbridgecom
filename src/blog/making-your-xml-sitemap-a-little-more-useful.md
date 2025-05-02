---
title: Making Your XML Sitemap a Little More Useful
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Making Your XML Sitemap a Little More Useful](../blog/making-your-xml-sitemap-a-little-more-useful)

Posted on **Monday, February 21, 2011**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">sitemap</span></li>
<li><span class="badge badge-success p-2">XSL</span></li>
<li><span class="badge badge-success p-2">XML</span></li>
<li><span class="badge badge-success p-2">jQuery</span></li>
</ul>

I've had a sitemap for this site for quite a while. Google (and the various other search engines) loves them some sitemaps, since it helps them crawl your site a little faster and more efficiently. For those of you wondering what a sitemap is, it is a XML document that contains an element for every public-facing page in your web site. A good sitemap follows the standard setup by [Sitemaps.org](http://sitemaps.org/), a collaboration between Google, Yahoo, and Microsoft to establish a standard sitemap format. You can deviate from the sitemap protocol if you're feeling rebellious, but the search engines will respond by ignoring your sitemap (and perhaps your site in the process).

One problem with sitemaps (and XML documents in general) is that they aren't exactly great to look at. A seasoned coding warrior can probably get what they need from viewing a XML document, but for those of us that like things to be a little nicer to read, an HTML version of a sitemap would be wonderful. A HTML sitemap is not a valid sitemap for search engines, though, so what to do? Hmm...

To our rescue comes an often-overlooked sibling of XML: XSL. XSL stands for _E**X**tensible **S**tylesheet **L**anguage_. What it does is to let us create a series of transformations we can apply to our XML document. So what, you say? It is still an ugly old XML document, you say? Maybe, but I know of a type of XML that I'm particularlly fond of... XHTML.

**That's right, XHTML**.

Bet some of you forgot that XHTML was created to blend the rigor of XML with the presentation aspects of HTML, didn't you? No worries...

And that brings us to the main topic of this post: _making our sitemap more useful_. With a XSL document, properly linked to our XML sitemap, we can transform the sitemap into a XHTML page that us humans can read, and the search robots will still get the valid XML document that they came for. Pretty neat, huh?

Even better: you don't even have to work this XSL out yourself. A rather thoughtful fellow by the name of [Joost de Valk](http://yoast.com/) created a plugin for Wordpress to tranform his sitemaps into lovely sortable tables. Best of all, you don't have to be using Wordpress to use his plugin. You can get the XSL by visiting [http://yoast.com/xsl-stylesheet-xml-sitemap/](http://yoast.com/xsl-stylesheet-xml-sitemap/). You will also need to grab a jQuery plugin called tableSorter from [http://tablesorter.com/docs/](http://tablesorter.com/docs/), or simply edit the XSL to remove the JavaScript references. If you elect to leave the jQuery in, you will need to make a few changes to the source code.

This

```markup
<script type="text/javascript" src="http://tablesorter.com/jquery.tablesorter.min.js"></script>
```

needs to be updated to

```markup
<script src="/path_to_your_javascript_directory/jquery.tablesorter.min.js"></script>
```

as the original markup makes a reference to an external file that doesn't seem to be available any longer. I also like to limit my external dependencies, so I would probably have changed that link anyway.

If you updated your sitemap correctly, and everything is in place, you should see something similar to my sitemap, found at [https://tiesontrowbridge.com/sitemap.xml](/sitemap.xml). That's it. You're done. For the minimum amount of effort we just expended, we get well-formatted, easily-read sitemaps. And that's just freakin' cool...

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Using LINQ to Easily Serialize an Exception to XML](../blog/using-linq-to-easily-serialize-an-exception-to-xml)
[View all](../blog)
[The Not-So-Great PHP/MySQL Tutorial, Part 1 <i class="fas fa-chevron-right"></i>](../blog/the-not-so-great-php-mysql-tutorial-part-1)
</div>

