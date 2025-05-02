---
title: falcon1986 is my hero...
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [falcon1986 is my hero...](/blog/falcon1986-is-my-hero)

Posted on **Saturday, July 11, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">Apache</span></li>
<li><span class="badge badge-success p-2">compression</span></li>
</ul>

I've been looking for ways to make this site more responsive (especially the aggregate pages, like Articles, Tutorials, etc.). Some of these pages can get pretty long, so anything that would optimize how they get from me to you is most welcome.

So I stumbled onto a page from the Yahoo! development team where they talk about compressing pages to save bandwidth. "Gee," thinks I, "that would probably help out a lot." So I go a-googling to see how hard it is to enable any sort of compression on a dynamic website.

Aaaaannnnd... I find lots of links to people complaining about how my host and others like it disable the compression functions on their Apache modules, since can be so CPU intensive.

"Poop!" says I. "There goes that idea..." (sadface).

Then I see [this article, _Force GZIP compression on your HostMonster-hosted website_](http://falcon1986.wordpress.com/2009/01/29/forcing-gzip-compression-on-your-hostmonster-hosted-website/). Hmm. Innntereeesting. Maybe this will work....

And it did! I modified the code I found there a bit to match what I am already using, uploaded my modified php.ini and .htaccess files, and, et viola!, the site takes off!

We're talking compression ratios of over 75 percent, people. **75 percent!!!** That means you dial-up users don't have to twiddle your thumbs (as much), and everyone else is getting a page that has an almost audible snap! as it loads...

So I'm very happy right about now.

:]

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> CSS Template 1](/blog/css-template-1)
[View all](/blog)
[PHP Referrer Snippet <i class="fas fa-chevron-right"></i>](/blog/php-referrer-snippet)
</div>

