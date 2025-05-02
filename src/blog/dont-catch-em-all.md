---
title: (Don't) Catch 'Em All!
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [(Don't) Catch 'Em All!](/blog/dont-catch-em-all)

Posted on **Wednesday, March 15, 2017**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">c#</span></li>
<li><span class="badge badge-success p-2">exceptions</span></li>
</ul>

> I want to be the very best,
> like no one ever was!
> To catch them is my real test, 
> to train them is my cause...

If you're under the age of 40, that song probably sounds really familiar &mdash; it's the opening theme to Pokemon, whose original catchphrase was "gotta catch 'em all!"

So, what does that have to do with anything (this is supposed to be a blog about programming stuff, right)? Well, I'm getting to that, but first, let's discuss something you've probably seen a few times:

```csharp
/* (c1) some code here... */

try
{
}
catch(Exception ex)
{
}

/* (c2) ... some other code here */
```

What we have here is your garden-variety global exception handling. `Exception` is the base class type of every single exception in the .NET Framework, so a `catch` block for `Exception` is going to catch every single exception. Or, put another way, it will... _"catch 'em all!"_ (see what I did there?)

Now, leaving aside a very real and valid argument that catching all exceptions like this is a bad architectural decision, there's a pretty common problem that arises from this Pokemon-style exception handling: _not accounting for the exception in the flow of execution_. See, handling every exception isn't itself a horrible thing (you don't want to dump your users into a state where they can't finish whatever task they use your code for) -- it's the common mistake of not correctly responding to an exceptional state that leads to issues. Let's look back at the pseudo-code I added earlier.

Let's assume some task takes us the point denoted by `(c1)` above. I'm going to pretend that we're, say, doing some IO operation, perhaps on an uploaded file. IO operations are the most likely to fail, in my experience, since there's a lot of moving parts, with often transient resources in play. So, if we're using something like the File API, we've at least a 50/50 chance that something fails. Since we know that already, maybe we place our IO operations in that Pokemon try/catch block we have at the moment. Problem solved, right?

Well, that depends. What happens at the point in code denoted by `(c2)`? Clearly, we've successfully navigated our IO operation, right? Maybe, maybe not. We didn't have an application crash, since we mitigated that with our Pokemon try/catch, but whether we're in the state we needed to be in depends entirely on what happened in the `catch` block. If we simply do nothing, or just log the exception and move on, then our Pokemon try/catch is the programming equivalent of covering our ears and yelling __"LA LA LA, NOT LISTENING!"__ when an exception occurs.

Now, what would you expect to happen at `(c2)` if an IO exception had been handled (maybe the upload was interrupted)? Let's pretend that the code beginning at `(c2)` assumes that we were able to copy the bytes from the uploaded file into, say, a byte array, and... maybe we're using the Image class to do something with those bytes. Because we had an exception, our byte array was never populated, and so is empty. We blithely pass our (empty) byte array into the Image class (via a memory stream) and attempt to perform some operation. **BLAMO!** Now we have an unhandled exception from trying to read an empty stream. 

What we should have done is abort the method once we knew we had an exception, since nothing past the try/catch is going to work. If we handle specific exceptions, then we can give the user better feedback on what went wrong.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Implementing ASP.NET Membership with a Custom Provider](/blog/implementing-aspnet-membership-with-a-custom-provider)
[View all](/blog)
</div>

