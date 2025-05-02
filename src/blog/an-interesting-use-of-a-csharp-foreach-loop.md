---
title: An Interesting Use of a C# Foreach Loop
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [An Interesting Use of a C# Foreach Loop](../blog/an-interesting-use-of-a-csharp-foreach-loop)

Posted on **Tuesday, November 4, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">foreach</span></li>
<li><span class="badge badge-success p-2">WinForms</span></li>
</ul>

I've seen many different ways of clearing the contents of controls in a Windows Form object, some of which can be quite elaborate. While it can be fun to come up with these convoluted schemes, there **is** an easier way. Here's what I do...

I implement a `foreach` loop, and iterate over the form's collection of Controls, comparing each control to the `TextBox` control type, using the `is` keyword. This keyword, `is`, performs a type comparison. If the `Control` _is_ the type I am comparing it to, then I perform a function call, in this case a call to the Control's `ResetText()` method.

The beauty of this chunk of code is that it scales with the form itself. If the form has 3 controls or 300, the same code can be applied without modification.

Pretty sweet, huh? Here's the code (written for C#):

```csharp
foreach(Control ctrl in this.Controls)
{
    if( ctrl is TextBox )
    {
        ctrl.ResetText();
    }
}
```

Enjoy!

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Coding Like Forrest Gump](../blog/coding-like-forrest-gump)
[View all](../blog)
[HTML + CSS = A Calendar? Cool! <i class="fas fa-chevron-right"></i>](../blog/html-css-calendar)
</div>

