---
title: C/C++ &#58; Includes
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C/C++ : Includes](../blog/cplusplus-includes)

Posted on **Friday, October 3, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">cplusplus</span></li>
<li><span class="badge badge-success p-2">includes</span></li>
</ul>

C++ includes take one of two forms: `#include <>` or `#include ""`. The only difference is that the former tells the compiler to look within the STL (Standard Template Library) for the source code, while the latter instructs the compiler to look in the local project folder first. If the compiler doesn't find the file in the local folder, it will search the STL.

Certain header files seem to see a lot of use in low-level programming courses, especially those that focus on creating console-based programs. These include, but are not limited to:

- iostream
- iomanip
- list
- map
- stdlib
- string
- math

As you read on, I will try to explain the use of each class, and show ways to implement it in your code.

#### iostream

From the MSDN Standard C++ Library Reference:

> [This class] declares objects that control reading from and writing to the standard streams. This is often the only header you need to include to perform input and output from a C++ program.

Specifically, `iostream` contains the following functions:

- `cerr`
- `cin`
- `clog`
- `cout`
- `wcerr`
- `wcin`
- `wclog`
- `wcout`.

The functions used most often are `cin` and `cout`. These are used for console input and output, respectively; in other words, to read in character input from a console window and display character output back out to the console window.

#### iomanip

This class is used to manipulate the input and output sent and received by the console window.

`iomanip` contains the following functions: ``

- `resetiosflags`
- `setbase`
- `setfill`
- `setiosflags`
- `setprecision`
- `setw`.

The functions I used most often are `setfill`, `setprecision` and `setw`. These are used for formatting the output sent to the console window. `setfill` is used to define an automatically-inserted character, `setprecision` is used to set the number of trailing digits displayed, and `setw` sets a minimum width to an output string.

Using these three functions together, it is quite easy to format your output to mimic, say, an ATM screen, with the output formatted correctly for currency, without need for excessive code.

#### list

The easiest way to define the `list` class is to think of it as an automatic array. A `list` object is a dynamically re-sized collection of other objects, such as integers, floats, characters, and pointers.

#### map

The `map` class is very similar to the list class, with the exception being that a `map` object's collection is automatically sorted.

#### stdlib

This class is mostly used to implement legacy C code. It contains a long list of functions. The functions I have used most often are:

- `atof`
- `atoi`
- `atol`
- `rand`
- `srand `.

The first three, `atof`, `atoi` and `atol`, are used to convert a character string into, in order, a float, integer, or long integer value. `rand` is used to generate a pseudo-random number. `srand` is used to "seed", or _initialize_, the random number generator, which helps to increase the randomness of any subsequent calls to the `rand` function.

#### string

The `string` class is easily the most welcomed class to be added the STL, as it saves programmers from having to manually build either their own string class for each program or from having to deal with the complexities of character arrays.

The `string` class implements it's own overloaded operators, and gives us access to the function `getline`, which is extremely useful for when you wish to read in a line of text (from the console window) that contains spaces, a condition that the character inputs have issues dealing with.

#### math

The `math` class, according to [cplusplus.com](http://www.cplusplus.com/reference/cmath/), _"declares a set of functions to compute common mathematical operations and transformations."_

These include:

`acos`, `asin`, `atan`, `atan2`, `ceil`, `cos`, `cosh`, `exp`,`fabs`, `floor`, `fmod`, `frexp`, `ldexp`, `log`, `log10`, `modf`, `pow`, `sin`, `sinh`, `sqrt`, `tan`, and `tanh`.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Conditional Statements](../blog/conditional-statements)
[View all](../blog)
[C/C++ : Creating a Custom Class <i class="fas fa-chevron-right"></i>](../blog/cplusplus-classes)
</div>

