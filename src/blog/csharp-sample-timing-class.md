---
title: C# Sample&#58; Timing Class
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [C# Sample: Timing Class](../blog/csharp-sample-timing-class)

Posted on **Sunday, January 25, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">C#</span></li>
<li><span class="badge badge-success p-2">timing</span></li>
<li><span class="badge badge-success p-2">classes</span></li>
</ul>

This timing class can be used to test the execution time of your C# algorithms. We used it to compare the time it took various sort and search functions to complete execution.

#### Timing.cs

Here's the code:

```csharp
class Timing
{
	DateTime startTime;
	TimeSpan duration;

	/// <summary>
	/// Default constructor. Sets start time and duration to zero.
	/// </summary>
	public Timing()
	{
		startTime = System.DateTime.Now;
		duration = new TimeSpan( 0 );
	}

	/// <summary>
	/// Overloaded constructor. Accepts an initial start time as a parameter. Sets duration to zero.
	/// </summary>
	/// <param name="start">Accepts a TimeSpan starting value.</param>
	public Timing( DateTime start )
	{
		this.startTime = start;
		this.duration = new TimeSpan( 0 );
	}

	/// <summary>
	/// Overloaded constructor. Accepts an initial start time and duration as parameters.
	/// </summary>
	/// <param name="start">Accepts a TimeSpan starting value.</param>
	/// <param name="end">Accepts a TimeSpan elapsed time value.</param>
	public Timing( DateTime start, TimeSpan elapsedtime )
	{
		this.startTime = start;
		this.duration = elapsedtime;
	}

	/// <summary>
	/// Method to calculate the duration of the timed event.
	/// </summary>
	public void StopTime()
	{
		this.duration = System.DateTime.Now.Subtract( startTime );
	}

	/// <summary>
	/// Method to set the timed event's start time.
	/// </summary>
	public void StartTime()
	{
		GC.Collect();
		GC.WaitForPendingFinalizers();

		startTime = System.DateTime.Now;//Process.GetCurrentProcess().Threads[0].UserProcessorTime;
	}

	/// <summary>
	/// Method to extract the timed event's duration.
	/// </summary>
	/// <returns>The time, in milliseconds, required for the timed event to execute.</returns>
	public TimeSpan Result()
	{
		return duration;
	}
}// end class
```

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> C# Sample: RandomDataSet Class](../blog/csharp-sample-randomdataset-class)
[View all](../blog)
[The Many Faces of the Hyperlink Element <i class="fas fa-chevron-right"></i>](../blog/the-many-faces-of-the-hyperlink-element)
</div>

