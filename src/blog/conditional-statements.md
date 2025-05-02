---
title: Conditional Statements
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Conditional Statements](/blog/conditional-statements)

Posted on **Wednesday, October 1, 2008**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">conditional</span></li>
<li><span class="badge badge-success p-2">logic</span></li>
</ul>

**Conditional statements** are used where your program must evaluate whether a logical statement is true or false. These include, but are not limited to:

#### IF-THEN-ELSE

`IF-THEN-ELSE` statements are used when your algorithm requires branching logic. Please note: an `IF-THEN-ELSE` statement is **not** a loop - the code does not repeat.

General form:

```
IF(CONDITION evaluates to TRUE) THEN
    DO SOMETHING
ELSE
    DO SOMETHING ELSE
```

Language-specific examples:

- C/C++ / C# / Java

```clike	
if(x == 1)
{
    // do something
}
else
{
    // do something else
}
```

- VisualBasic.NET

```basic
If foo = "bar" Then
    ' do something
Else
    ' do something else
End If
```

- Ruby / Python
```ruby
if foo == 'bar'
    # do something
else
    # do something else
end
```

---

Loops are used when your algorithm requires that a portion of your process is repeated. 

There are two general classes of loops: determinate, and indeterminate. An *indeterminate* loop has no set number of 
repetitions - it will repeat until an exit condition is met. A *determinate* loop repeats (at most) a fixed number of times. Both types 
of loops can be exited early, using the keyword(s) defined by the language being used to implement the loop.

#### WHILE, DO-WHILE, and DO-UNTIL loops

General form:

```
WHILE(CONDITION evaluates to TRUE)
    DO SOMETHING
LOOP

DO
    SOMETHING
WHILE(CONDITION evaluates to TRUE)

DO
    SOMETHING
UNTIL(CONDITION evaluates to TRUE)
```

Language-specific examples:

- C/C++ / C# / Java

```clike
while(choice != 'x')
{
    // do something
}

do
{
    // do something
} while(choice != 'x')

do
{
    // do something
} while(choice == 'x')
```

- VisualBasic.NET

```basic
While repeat = True
    ' do something
End While

Do While repeat = True
    ' do something
Loop

Do Until repeat = False
    ' do something 
Loop
```
<br />

#### FOR and FOREACH loops

General form:

```
FOR(ITERATOR; CONDITION; INCREMENTOR)
    DO SOMETHING
	
FOREACH(ELEMENT in COLLECTION)
    DO SOMETHING
```

- C/C++

```clike
for(int i = 0; i < 10; i++)
{
    // do something
}
```

- C#

```csharp
int x = 10;
for(int i = 0; i <= x; i++)
{
    // do something
}

foreach (Control ctrl in this.Controls)
{
    // do something
}
```

- Java

```java
int x = 10;
for(int i = 0; i <= x; i++) {
    // do something
}

for (Control ctrl : this.Controls) { 
    // do something
}
```

- VisualBasic.NET

```basic
For Each ctrl As Control In Me.MainForm.Controls
    ' do something
Next ctrl
```

---

#### SWITCH or SELECT CASE statements

A `SWITCH` or `SELECT CASE` statement is primarily a shorthand way of writing a series of IF / ELSE-IF / ELSE-IF / ELSE statements. As such, it, like an 
`IF-THEN-ELSE` statement, is a branching statement - it is **not** a loop.

General form:

```
SWITCH (COMPARITOR)
    CASE (VALUE1):
	    DO SOMETHING
		BREAK
    CASE (VALUE2):
	    DO SOMETHING
		BREAK
	CASE (DEFAULT VALUE):
	    DO SOMETHING
		BREAK
END SWITCH
```

- C/C++ / C# / Java

```clike
switch(rdb.Name)
{
    case "button1":
	    // do something
		break;
		
	case "button2":
	    // do something
		break;
		
	default:
	    // do something
		break;
}
```

- VisualBasic.NET

```basic
Select Case option
    Case 0
	    ' do something
	Case 1
	    ' do something
	Case Else
	    ' do something
End Select
```

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Object-Oriented Programming](/blog/object-oriented-programming)
[View all](/blog)
[C/C++ : Includes <i class="fas fa-chevron-right"></i>](/blog/cplusplus-includes)
</div>

