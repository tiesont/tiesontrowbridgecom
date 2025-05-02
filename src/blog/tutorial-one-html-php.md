---
title: Tutorial One&#58; HTML &gt;&gt; PHP
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Tutorial One: HTML &gt;&gt; PHP](/blog/tutorial-one-html-php)

Posted on **Thursday, September 18, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">HTML</span></li>
<li><span class="badge badge-success p-2">PHP</span></li>
</ul>

Welcome! For those of you stumbling onto this page, this is the first in a series of articles where I walk through creating a simple website for a fictional friend of mine. We will start with the complete HTML source for the index page, and then analyze it to determine which parts can be repeated in our other pages. Then, we will create a dynamically-generated PHP index page from the original HTML source.

So, let's get this party started, right? Okay! What you see below is the HTML of our friend Louie's index page. It's not too fancy. [Take a look](/samples/design-by-louie/), then come back and read the next section.

#### index.html

```markup
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
    <title>Design by Louie | Home</title>
	
    <link rel="Stylesheet" type="text/css" href="design-by-louie.css" media="screen" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
   <div id="header">
      <a href="index.html">
         <img alt="" src="images/louie-logo.png" />
      </a>
   </div>
   <div id="bodytext">
      <div>
         <p>
            <span class="de1">DESIGN</span><span class="de2"> | by Louie&trade;</span>.
            Creating custom, clean imagery for everyone. Bold, but understated. Bright, not flashy. Set your
            brand apart from a sea of monotonous look-alikes. Get <span class="de1">DESIGN</span>ed.
         </p>
      </div>
      <div id="navigate">
         <ul>
            <li>
               <a href="stock-images.html">
                  <img alt="" src="images/stock.png" title="Browse Louie's pre-made imagery." />
                  <br />Stock Imagery...
               </a>
            </li>
            <li>
               <a href="custom-design.html">
                  <img alt="" src="images/custom.png" title="Request a custom design." />
                  <br />Custom Design...
               </a>
            </li>
            <li>
               <a href="about.html">
                  <img alt="" src="images/louie.png" title="Learn more about Louie." />
                  <br />Louie is...
               </a>
            </li>
         </ul>
      </div>
   </div>
   <div id="footer">
      &amp;copy; 2008. All rights reserved.
      <small>&bull;</small> Last Update: May 5 2008.
      <small>&bull;</small> <a href="http://validator.w3.org/check/referer">Valid XHTML</a>
   </div>
</body>
</html>
```

Not bad, eh? Louie is a minimalist. He likes things simple. As you can see, he has created "zones" in his code with ID'd `<div>` tags, to separate the page into sections he can style separately. The "header" div will contain his site logo, which he has also made a link back to the index page. That is very common, since it gives our visitors a "fail-safe" way of getting back to the first page. Next, he defined a zone for the page content. Lastly, we see he has created a "footer" zone, where he can place his copyright information, the date this page was last modified, and a link to the W3C code validator.

Also, those of you with keen eyes may have noticed that there is some extra info within the `<head>` tag. I will cover that in later tutorials, or you can go <a href="/articles/cascading-stylesheets">here</a> if you want to read what I have to say about CSS. Basically, it is a link to an external cascading stylesheet.

#### Analyze the Code

So, let's think about this page for a minute. What do we see that we will probably be able to reuse on the other pages? Hmm...

Well, we know that all that nice stuff above the "bodytext" div tag will be the same on every page, with the exception of the title. So let's snip that and place it in another file.

What else? We definitely know we will be re-using the code from the "footer" div on down, so snip that into another file...

And I would say that is it. You could argue that we need to make a separate file for the section surrounded by the "navigate" div tag. But... this specific setup will only be used on the index page. As you will see in later tutorials, the other pages will employ a similar, but smaller, version of that menu.

So what do we have now? Look:

#### Snipped sections

```markup
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
    <title>Design by Louie | Home</title>
	
    <link rel="Stylesheet" type="text/css" href="design-by-louie.css" media="screen" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
   <div id="header">
      <a href="index.html">
         <img alt="" src="images/louie-logo.png" />
      </a>
   </div>
```

```markup
   <div id="bodytext">
      <div>
         <p>
            <span class="de1">DESIGN</span><span class="de2"> | by Louie&trade;</span>.
            Creating custom, clean imagery for everyone. Bold, but understated. Bright, not flashy. Set your
            brand apart from a sea of monotonous look-alikes. Get <span class="de1">DESIGN</span>ed.
         </p>
      </div>
      <div id="navigate">
         <ul>
            <li>
               <a href="stock-images.html">
                  <img alt="" src="images/stock.png" title="Browse Louie's pre-made imagery." />
                  <br />Stock Imagery...
               </a>
            </li>
            <li>
               <a href="custom-design.html">
                  <img alt="" src="images/custom.png" title="Request a custom design." />
                  <br />Custom Design...
               </a>
            </li>
            <li>
               <a href="about.html">
                  <img alt="" src="images/louie.png" title="Learn more about Louie." />
                  <br />Louie is...
               </a>
            </li>
         </ul>
      </div>
   </div>
```

```markup
   <div id="footer">
      &amp;copy; 2008. All rights reserved.
      <small>&bull;</small> Last Update: May 5 2008.
      <small>&bull;</small> <a href="http://validator.w3.org/check/referer">Valid XHTML</a>
   </div>
</body>
</html>
```

#### And now for the Maaaa-gic!

First, we need to save each of these files. I like to use obvious names. Also, each file is now saved as a `.php` file, which yields the best results for ensuring our php code is parsed correctly. So, we should now have: _header.php_, _index.php_, and _footer.php_.

#### And the page title?

We can take care of that issue with a simple PHP trick. First, we add a PHP "zone" to the top of the <em>index.php</em> page. Add a PHP start tag, like this: `<?php`, and an end tag, like so: `?>`. In between we put this code: `$page_title="DESIGN by Louie | Home"`. To wrap up our site surgery, go back to our _header.php_ file, and where we see the text for the page title (the `<title>` tag), we replace that text with this: `<?php echo($page_title); ?>`.

#### Snipped Section, with added PHP

```php
<?php
   $page_title="DESIGN by Louie | Home";
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	
   <title> <?php echo($page_title); ?> </title>
	
    <link rel="Stylesheet" type="text/css" href="design-by-louie.css" media="screen" />
    <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
</head>
<body>
   <div id="header">
      <a href="index.html">
         <img alt="" src="images/louie-logo.png" />
      </a>
   </div>
```

```php
   <div id="bodytext">
      <div>
   ...

   ...
      </div>
   </div>
```

The last step is really quite simple. Simply add the PHP `include` directive to _index.php_ wherever we want insert our new PHP files. Like so:

#### Finished Product: index.php

```php
<?php
   $page_title="DESIGN by Louie | Home";
?>

<?php include('includes/header.php'); ?>

   <div id="bodytext">
      <div>
         <p>
            <span class="de1">DESIGN</span><span class="de2"> | by Louie&trade;</span>.
            Creating custom, clean imagery for everyone. Bold, but understated. Bright, not flashy. Set your
            brand apart from a sea of monotonous look-alikes. Get <span class="de1">DESIGN</span>ed.
         </p>
      </div>
      <div id="navigate">
         <ul>
            <li>
               <a href="stock-images.html">
                  <img alt="" src="images/stock.png" title="Browse Louie's pre-made imagery." />
                  <br />Stock Imagery...
               </a>
            </li>
            <li>
               <a href="custom-design.html">
                  <img alt="" src="images/custom.png" title="Request a custom design." />
                  <br />Custom Design...
               </a>
            </li>
            <li>
               <a href="about.html">
                  <img alt="" src="images/louie.png" title="Learn more about Louie." />
                  <br />Louie is...
               </a>
            </li>
         </ul>
      </div>
   </div>

<?php include('includes/footer.php'); ?>
```

While not necessary, it is common practice to place our "partial" files in a separate directory, which is normally given the name "includes." This helps make sure that a user couldn't accidentally navigate to those files, which could happen if they are left in the "root" directory.

#### The Wrap Up

Hopefully, if I have been clear enough, you were able to follow along with this tutorial. We started with a nice, valid XHTML file, and were able to reduce it to it's unique parts. Employing this same technique on every page that follows, we should be able to create a easily-maintained, dynamic web site. I encourage you to leave comments below, and above all, ASK QUESTIONS!

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> What Ever Happened to Thinking Logically?](/blog/whatever-happened-to-thinking-logically)
[View all](/blog)
[Object-Oriented Programming <i class="fas fa-chevron-right"></i>](/blog/object-oriented-programming)
</div>

