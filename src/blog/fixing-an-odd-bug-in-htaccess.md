---
title: Fixing an odd bug in .htaccess
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Fixing an odd bug in .htaccess](../blog/fixing-an-odd-bug-in-htaccess)

Posted on **Sunday, June 21, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">Apache</span></li>
<li><span class="badge badge-success p-2">htaccess</span></li>
</ul>

I don't know if this is relevant to anyone else, but I've been experiencing issues with some of my sites where I get a 500 (server configuration) error. Something like this:

```
http://somesite.com/blog
```

is fine, but going to this:

```
http://somesite.com/blog/
```

would throw a 500 error. I think I finally figured out why, and I thought some of you might benefit as well.

See, I have this line in my .htaccess file:

```apacheconf
RewriteRule ^(.*)$ $1.php
```

I think what is happening is that Apache is merrily doing what I've asked it to do: add `.php` to the end of the url. So my first example becomes:

```
http://somesite.com/blog.php
```

which I want, but then it is also doing this (I think):

```
http://somesite.com/blog/.php
```

which is obviously invalid. So, to fix it, I added this rule before that rule:

```apacheconf
RewriteRule ^(.*)/$ $1.php [L]
```

And et viola! No more 500 errors. May just be coincidence, and if someone reads this and knows better, let me know. For now, though, I am happy to let it stand.

Hope this helps!

**[EDIT:]** I think the real fix here was the `[L]` flag. That flag tells Apache to stop processing my htaccess file. That prevents the rewrite engine from trying to add a `.php` to a directory.

This also seems to have the added bonus of keeping people from snooping in my various directories, since my htaccess file makes each directory look like a file to Apache. So if someone tries to peek into, say, the `/images/` directory, they get a 404 error instead, since I do not have a file called 'images.php'.

:)

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Nifty Corners = Sah-weeeeet...](../blog/nifty-corners-sah-weeeeet)
[View all](../blog)
[Survey of Programming Languages I <i class="fas fa-chevron-right"></i>](../blog/survey-of-programming-languages-i)
</div>

