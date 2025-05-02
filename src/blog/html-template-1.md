---
title: HTML Template 1
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [HTML Template 1](/blog/html-template-1)

Posted on **Tuesday, July 7, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">HTML</span></li>
<li><span class="badge badge-success p-2">template</span></li>
</ul>

I put together a simple HTML/XHTML template for anyone that wants it. If you're new to web design, this template should be a good way to get started. I also created a CSS template to go with this HTML template. You can [find it here](/code/css-template-1).</p>

#### The Sample: template.html

```markup
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Site/Page Title</title>
		<!-- 
			This is a link to your site's favicon (the icon that appears on bookmarks and/or the navigation bar.
			Just like the CSS links below, choose one, delete the rest.
		-->
		<!-- <link rel="shortcut icon" type="image/x-icon" href="/somepath/image.ico" /> (old style) -->
		<!-- <link rel="icon" type="image/vnd.microsoft.icon" href="/somepath/image.ico" /> -->
		<!-- <link rel="icon" type="image/png" href="/somepath/image.png" /> -->
		<!-- <link rel="icon" type="image/gif" href="/somepath/image.gif" /> -->

		<!--
			This is a list of all of the possible stylesheet media types. Delete all but the one(s) you are creating CSS for. 
			Also note that you must remove the HTML comments from around the link tag or the browser will ignore it.
			Alternately, you could just use the "all" media version, and specify the media-specific CSS in the stylesheet itself,
			using the @media selector. See sample CSS for details.
		-->
		<!-- <link rel="stylesheet" type="text/css" href="" media="screen" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="tty" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="tv" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="projection" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="handheld" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="print" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="braille" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="aural" /> -->
		<!-- <link rel="stylesheet" type="text/css" href="" media="all" /> -->
	</head>
	<body>
		<div id="container">
			<div id="header">
				<h1><a href="/link-to-home-page">Site Title</a></h1>
			</div>
			<div id="navigation">
				<ul id="navbar">
					<li>
						<a href="">
						Link 1
					</a>
					</li>
					<li>
						<a href="">
                            Link 2
                        </a>
                    </li>
                    <li>
                        <a href="">
                            Link 3
                        </a>
                    </li>
                </ul>
            </div>
            <div id="content">
                <h2>Entry Title 1</h2>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sollicitudin, metus a ultricies laoreet, turpis purus commodo neque, quis vehicula nibh lacus id libero. Duis fringilla, mauris at ultrices aliquet, tellus sapien pharetra augue, quis molestie odio velit quis tortor. Cras molestie sem eu turpis dignissim commodo. Ut condimentum gravida consequat. Curabitur eget ligula est. Phasellus aliquet iaculis tristique. Quisque dapibus lorem est. Vestibulum pulvinar, ligula eu aliquam vehicula, dui odio porttitor urna, a tempor dui arcu in orci. Duis ultricies risus id enim porttitor tristique. Maecenas mollis risus sit amet arcu iaculis eu consectetur nunc luctus. Suspendisse convallis faucibus imperdiet. Nullam pharetra euismod quam vel ultricies. Phasellus in nisl quis turpis sollicitudin porttitor a quis quam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce elementum ultricies nisi non vestibulum. Proin sed nunc mauris. Proin purus erat, pulvinar non consequat sed, consectetur at augue. 
                </p>
                <h2>Entry Title 2</h2>
                <p>
                    Vivamus et lectus ante, eu laoreet libero. Vivamus quis porta quam. Integer eu eros arcu, in pharetra est. Duis id diam vel mi eleifend mattis dapibus in purus. Vivamus laoreet porttitor purus. Aliquam at venenatis lectus. Suspendisse vehicula scelerisque fermentum. Ut suscipit orci eu metus rutrum quis pulvinar lectus convallis. Aliquam erat volutpat. Vestibulum sit amet enim lectus. Cras scelerisque aliquam sapien a tempor. Fusce porta nunc in massa molestie ultricies. Suspendisse pulvinar interdum aliquet. Donec nec nisl sed velit pharetra tempor in vitae diam. Donec quis euismod risus. In malesuada, velit tincidunt porttitor sagittis, libero lectus placerat orci, in convallis nibh libero nec metus. Cras vel erat tortor. Aliquam erat volutpat. Nullam sit amet erat odio, in posuere magna. 
                </p>
                <h2>Entry Title 3</h2>
                <p>
                    Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed in pharetra quam. Aenean mauris libero, tincidunt eget ultricies sit amet, dictum ut quam. Aliquam erat volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut feugiat accumsan vehicula. Sed congue mattis sapien at tempus. Aliquam ac odio diam. Fusce sodales ipsum ac tortor porta malesuada. Pellentesque feugiat vehicula accumsan. Nunc neque felis, sodales eget porttitor vel, suscipit non velit. Nunc eu justo ipsum, non ultrices orci. Aliquam sed arcu tortor. Donec egestas metus in mauris consectetur a tempus turpis pretium. Maecenas et rutrum dolor. Sed eget massa tellus. Suspendisse potenti. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur sed lobortis nunc. 
                </p>
            </div>
            <div id="footer">
                <p>
                    &amp;copy; First copyright year - current year. Statement of rights reserved. Designer links, etc.
                </p>
            </div>
        </div>
    </body>
</html>
```

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Survey of Programming Languages I](/blog/survey-of-programming-languages-i)
[View all](/blog)
[CSS Template 1 <i class="fas fa-chevron-right"></i>](/blog/css-template-1)
</div>

