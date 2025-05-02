---
title: PHP Referrer Snippet
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [PHP Referrer Snippet](/blog/php-referrer-snippet)

Posted on **Friday, July 31, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">PHP</span></li>
<li><span class="badge badge-success p-2">snippet</span></li>
</ul>

This is a small chunk of code I use as part of my login script:

```php
if( !isset( $_SESSION['ref'] ) )
{
    $_SESSION['ref'] =$_SERVER['HTTP_REFERER']; 
}
```

and

```php
$ref = strip_tags_attributes( $_SESSION['ref'] );
$_SESSION['ref'] = "";
header( "Location: ".$ref );
```

The first snippet is part of the load section of the login page. It checks to see if the session contains an index for a referral page (useful for if/when the user gets posted back to the page due to login errors). The next snippet is part of the actual login script. It sets a local variable to the current value of the session 'ref' index, clears the value of the session, and then redirects the user back to the page they originally came from.

It does need some work, since the user could technically arrive directly at the login page. If that were the case, these snippets would redirect them away from my site (or your site, if you use these snippets). However, it works well enough for now. You can easily add some extra code to redirect the user to your index page if they came from an external site...

Enjoy!

:]

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> falcon1986 is my hero...](/blog/falcon1986-is-my-hero)
[View all](/blog)
[Fun with LINQ <i class="fas fa-chevron-right"></i>](/blog/fun-with-linq)
</div>

