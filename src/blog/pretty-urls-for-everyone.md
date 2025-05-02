---
title: Pretty URLs For Everyone!
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Pretty URLs For Everyone!](/blog/pretty-urls-for-everyone)

Posted on **Monday, October 13, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">PHP</span></li>
<li><span class="badge badge-success p-2">Apache</span></li>
<li><span class="badge badge-success p-2">htaccess</span></li>
</ul>

Have you ever visited a website, and wondered how the person managing it is able to have their pages display without having the file extension on every page? I used to. Turns out, it's not so hard to get what is commonly referred to as "pretty URLs." It's as simple as adding a few lines of text to a special file most people have on their host servers: the `.htaccess` file.

#### What is a ".htaccess" file?

According to [Apache.org](http://httpd.apache.org/docs/1.3/howto/htaccess.html), a .htaccess file is a "distributed configuration file." They also go on to describe what it does:

> [.htaccess files] provide a way to make configuration changes on a per-directory basis. A file, containing one or more configuration directives, is placed in a particular document directory, and the directives apply to that directory, and all sub-directories thereof.

In a nutshell, it means we can use this file to make configuration changes to our host server's Apache module, allowing us to set certain file-handling behaviors as we see fit without needing to make permanent changes to the Apache module. It may also be the only way we can modify the Apache module, as is usually the case with shared hosting.

#### So, what are WE doing, then?

We are going to use something called a `mod_rewrite.` What we will do is write some logic out that tells Apache to automagically append a file extension to the file part of the URL containing the page name. This happens in the background, at the server level, so our users are none-the-wiser that we are manipulating the URL. As an added bonus, this also hides the technology we use for our site from our users. This also gives us a small amount of protection from low-level hackers, too.

#### The Code!

This example shows how simple a mod_rewrite can be. It only takes three to four lines to get pretty URLs. Look the sample over, then keep reading.

```apacheconf
# Enable Rewrite Engine so that our regex kicks in.
RewriteEngine On

# Don't attempt to add extension to directory.
RewriteCond %{REQUEST_FILENAME} !-d

# Automagically append .php to URL.
RewriteCond %{REQUEST_FILENAME}\\.php -f
RewriteRule ^(.*)$ $1.php
```

#### The Explanation!

The first thing we do is turn on the Rewrite Engine. This tells Apache we are shaking things up a bit. If we don't add this line, our rewrites are ignored. Next, we tell Apache to skip anything that would map to a directory, and to only rewrite files that already exist on the server. The last line there is a small bit of regex, or **regular expression,** that is applied if both of our conditions pass. The upward caret denotes the beginning of the string, while the dollar sign indicates the end of the string. Once the pattern matching finds the end of the string, it will add `.php` to it.

For example, let's see what happens if the user enters the URL of

`http://example.com/sample-page`

The regex will parse that string and add `.php` to the end. So the URL sent to the server is actually:

`http://example.com/sample-page.php`

You can use this same idea for any extension you can think of, such as `.htm`, `.html`, `.aspx`, and so on. Just swap out `.php` in the sample above with whatever type you are using.

The nice thing is that everything happens at the **server** level, meaning the user is unaware anything has been changed. They still see the original URL, unmodified.

And that is it. Pretty cool, huh? :)

#### The Wrap Up

Using pretty URLs not only improves your site by making your URLs easier to remember, it also tends to improve your SEO, or "search-engine optimization." Better SEO equals better search results equals more traffic for you...

Enjoy!

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Why Sherlock Holmes Would Have Made A Kick-Ass Programmer](/blog/why-sherlock-holmes-would-have-made-a-kick-ass-programmer)
[View all](/blog)
[Coding Like Forrest Gump <i class="fas fa-chevron-right"></i>](/blog/coding-like-forrest-gump)
</div>

