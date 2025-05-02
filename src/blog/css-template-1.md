---
title: CSS Template 1
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [CSS Template 1](/blog/css-template-1)

Posted on **Tuesday, July 7, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">CSS</span></li>
<li><span class="badge badge-success p-2">template</span></li>
</ul>

This is the companion CSS template for the [HTML template](/code/html-template-1). Use both together as a starting point for your own website.

:]

#### The Template: template-style.css

```css
/*
*    The line following this comment is what's known as a 'CSS reset.' Using the wild-card selector ('*') selects all elements.
*    Setting the padding and margin to zero helps override each browser's default settings, and makes it more likely
*    our CSS looks the same on most browsers. Remove that line if you want to build off of the default settings.
*/
*{ margin: 0; padding: 0; }

 
/*
*    General form for CSS selectors:
*
*    tag{
*        attribute: value;
*    }
*
*    #id{
*        attribute: value;
*    }
*
*    .class{
*        attribute: value;
*    }
*/


/*
*    Put all CSS that is common to all media types directly in the file, outside of any media selectors
*/


/*
*    Use media selectors to build CSS specific to a media type.
*/

@media screen
{
}
 

@media tty
{
}
 

@media tv
{
}
 

@media projection
{
}
 

@media handheld
{
}
 

@media print
{
}
 

@media braille
{
}
 

@media aural
{
}
```

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> HTML Template 1](/blog/html-template-1)
[View all](/blog)
[falcon1986 is my hero... <i class="fas fa-chevron-right"></i>](/blog/falcon1986-is-my-hero)
</div>

