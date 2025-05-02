---
title: Creating A C++ Application, Part 1
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Creating A C++ Application, Part 1](/blog/creating-a-cplusplus-console-application-part-1)

Posted on **Saturday, April 25, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">cplusplus</span></li>
<li><span class="badge badge-success p-2">VisualStudio</span></li>
</ul>

I've seen a lot of ways of making a console application in C/C++, and I'll admit, I'm not very impressed. Okay, maybe I should clarify the previous statement. I've seen how the students at GRCC write console apps, and, well, they need help...

So, I suppose I should fulfill one of my stated goals, and demonstrate some "clean" ways of writing a console app, m'kay?

So, without further ado, here we go...

#### Step 1: Set up Visual Studio

First off, you don't really need anything as fancy as Visual Studio just to write a console application, but it is somtimes easier to use than the alternatives. So, if you have Visual Studio (pretty much any version) you can follow along here. If you want to use a plain ol' text editor, be my guest, but know that I'm not going to show you how to get your code to compile and run...

So, for those of you with Visual Studio, follow the steps below to set up your environment for this tutorial.

1. Open Visual Studio
2. Click on **File &rarr; New &rarr; Project**.
3. Scroll down as needed until you see the section labeled **Visual C++** and click on that heading.
4. You should now see a bunch of possible file types. Select **Empty Project**.
5. Give your project a name. I also tend to uncheck the "Create directory for solution" option, but that's up to you.
6. Click **OK**.

You should now have a blank editor window. Look for the **Solution Explorer** tab. Depending on your configuration, it may be on the left or right side of the editor window. Now we are going to add the actual C++ file.

1. With the **Solution Explorer** tab open, right-click on the Project name.
2. In the context menu that opens, click on **Add &rarr; New Item**.
3. A dialog will open. You should see a list of available C/C++ file type.
4. Click **C++ file(.cpp)** and then give your file a name.
5. Click **OK**.

We are now ready to start writing our console application! :)

#### Step 2: Add the essentials

Now, the reason I had you set up this project manually, as opposed to just creating a "Win32 Console Application," is that the latter project type adds some unnecessary "baggage" to the project, like a pre-compiled header and some background crap we don't really need. Those of you who decided you knew where I was going and went ahead and created a "console app" can still follow along, but be aware that you can't modify the header for your main() function or remove the "stdafx.h" include directive without causing some major problems. But I digress...

To read or write anything to our console window, we need to add some library functions to our project. There are a lot of options available to us that work more or less the same, but I prefer to use the most "modern" version. As such, we are going to add the `iostream` library. IOStream gives us access to a couple of useful functions: `cin`, `cout`, &amp; `endl`. CIN is used for reading character input from the console window. COUT is used to write characters out to the console window, ENDL is a function used for peforming a carriage return (adding a new line) on the console window.

To add the iostream library to our project, we add this line to the top of our blank .cpp file:

```cpp
#include <iostream>
```

Next, we have to tell the compiler to give us access to the library function we want. There is a right and a wrong way to do this. N00bs like to add this line:

```cpp
using namespace std;
```

which gives us access to EVERYTHING currently available in the std namespace. This works, but its kinda like using a pile-driver to hammer a carpet tack. In other words, its excessive! Instead, we only include those functions we know we will use by employing the `using` directive:

```cpp
using std::cin;
using std::cout;
using std::endl;
```

The double colon ( `::` ) is what's known as the **scope resolution operator**. It tells the compiler where to look for the function or attribute specified to the right of the operator. In our case, we're telling it to look in the std, or **Standard Library**.

#### Step 3: Create the application entry point

Now that we have added the functionality we need to our project, we have to add the code that actually executes when the program runs.

Every application needs to have an **entry point**, or if your prefer, a starting point. Most modern compilers are set up to look for a special function called `main()`. Furthermore, the compiler in C++ is expecting an integer exit code. The common values are `-1`, `0`, and `1`, which can be interpreted by the calling application to indicate whether or not the program completed successfully. For our purposes, we will be returning the exit code `0`. So, add this to your project:

```cpp
int main( )
{
     return 0;
}
```

#### Step 4: Add some code, silly!

Okay, we've added all the code we need to run a console app, but right now, it doesn't DO anything. We should probably rectify that by adding some executable code to our `main()` function. You can add whatever you want, but for the sake of following convention, I'm gonna add the old standard:

```cpp
cout<< "Hello, world!" << endl;

system("pause");
```

The finished product should look similar to this:

```cpp
#include <iostream>

using std::cin;
using std::cout;
using std::endl;

int main()
{
    cout << "Hello, world!" << endl;

    system("pause");

    return 0;
}
```

To see your wonderful new creation, simply click the Run/Debug button (the big green arrow) in your menu bar.

Enjoy!

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Yur Doin' It Wrong...](/blog/yur-doin-it-wrong)
[View all](/blog)
[Nifty Corners = Sah-weeeeet... <i class="fas fa-chevron-right"></i>](/blog/nifty-corners-sah-weeeeet)
</div>

