---
title: The Many Faces of the Hyperlink Element
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [The Many Faces of the Hyperlink Element](/blog/the-many-faces-of-the-hyperlink-element)

Posted on **Thursday, February 5, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">HTML</span></li>
<li><span class="badge badge-success p-2">hyperlink</span></li>
</ul>

Ah, the `<a>` element. Our friend, the hyperlink. Few HTML elements are as versatile as the hyperlink. We can jump around a page, back and forth between different pages, open our email clients, and execute scripts, all with one meek little HTML tag. Talk about over-achieving...

Don't believe me? Well then, maybe I should show you some examples!

#### Navigating a Page

One of the more useful ways to implement a hyperlink is to use it as a method of quickly jumping to different topics within a page. This is accomplished by using what are referred to as "page anchors," or "anchors" for short. Creating anchors is a simple, two-step process:

- Add the "id" attribute to the HTML element closest to where you want the link to "jump" to.
- Point the "href" attribute of the link tag to that id, preceded with a # sign.

Like so:

```markup
<html>
	<head>
		<title>Sample Page</title>
	</head>
	<body>
		<div>
				<h2>Hyperlink Sample Page</h2>
				<ul>
					<li><a href="#one">Link #1</a></li>
					<li><a href="#two">Link #2</a></li>
					<li><a href="mailto:person@fakemail.com">Contact</a></li>
				</ul>
				<h4 id="one">Anchor #1</h4>
				<p>
					Sample text here. Blah blah blah.
				</p>
				<p>
					Blah blah blah some more...
				</p>
				<h4 id="two">Anchor #2</h4>
				<p>
					Look! More sample text!
				</p>
				<p>
					Isn't HTML neat? :)
				</p>
		</div>
	</body>
</html>
```

Each of the links in the "navigation bar" would take you to a different section of this page.

#### The MailTo: Link

The "Contact" link in the example above is what is known as a "mailto" link, which gets its name from the fact that you precede the email address in the "href" attribute with "mailto:". The browser recognizes that the link is an email address and causes whatever email client you have installed on your machine to launch.

#### Linking to Another Page

There are two ways of linking to another page. If you want to link to another page within _your_ website, you only need to specify the folder and file name of the target document. Linking to an entirely _different_ (external) site requires a canonical, or absolute, URL.

Examples:

1. Relative (Local site)
	- `images/meatball.png`
	- `code/samples/hello-world.html`
2. Absolute (External site)
	- `http://www.google.com/`
	- `http://www.w3fools.com/`

#### El Fin

I will eventually update this post to include some script links, as well, but for now, I think I've given you a good introduction into how to use the hyperlink tag. Questions? Comments? You know what to do...

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C# Sample: Timing Class](/blog/csharp-sample-timing-class)
[View all](/blog)
[Programming Primer <i class="fas fa-chevron-right"></i>](/blog/programming-primer)
</div>

