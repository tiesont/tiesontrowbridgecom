---
title: Debt Repayment Calculator, Part One
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [Debt Repayment Calculator, Part One](../blog/debt-repayment-calculator-part-one)

Posted on **Wednesday, March 25, 2009**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">debt</span></li>
<li><span class="badge badge-success p-2">calculator</span></li>
<li><span class="badge badge-success p-2">cplusplus</span></li>
</ul>

I've been wanting to create another tutorial for quite some time now, but I could never seem to come up with a good subject for a coding project. I hate wasting anyone's time, so doing another stupid "Hello, world!" sample was certainly **not** an option. Then it hit me! What is the one subject that seems to be on everyone's minds lately?

You guessed it: DEBT.

We all seem to be enjoying more debt than we care to admit these days (who knows what I'd do without student loans), but how many of us actually try to think of ways to get out of that debt _sooner_, rather than at the rate our banks might like us to...?

Haha. That's right. **Not many**. So, to follow the example our dear friends at Discover Card&trade; have established, let us build our own debt calculator. We will learn some useful coding practices, AND give ourselves a handy tool that may just save us some stress (and some green...)

#### Step One: PLAN

So, the first thing we need to do is create a plan for our project. That means those of you who have already fired up your favorite IDE can chill out for a while. We won't be coding for two more steps. First, we need to analyze the problem. Then, we work through the logic of solving that problem. I like to use visual tools to do that, so I will be using step-wise refinement of some pseudo-code and some simple UML. Step two should leave us with a working program, but we won't quite be done. A good project will be very cohesive. We will accomplish this by refactoring our code into modules, which will also have the side benefit of leaving us with very reusable code. The last step is simply to run our new calculator, and debug any issues that arise.

Do you have your pencils and paper ready? Let's make us a program! :)

#### Analyze the Problem

The first and most important step in solving any problem is to _understand_ the problem. To understand our problem we need to know certain key aspects; what inputs are required, what calculations must be performed, and what outputs are sought? Are there values we can hard-code into out application? Do we need to have a means of storing the results of the application execution somewhere?

#### Inputs?

After a bit of brainstorming, I came up with the following inputs: the **terms of the debt**, the **time constraints**, and (optionally) the **user information**. Additionally, I came up with these specifics:

1. APR, or annual percentage rate (interest rate)
2. Current balance of the debt
3. Finance charges
4. Fees
5. Billing cycle
6. Interest cycle (what interest method is used, and when is interest applied?)
7. Minimum repayment period
8. Maximum repayment period
9. Target repayment period

If we decide to take in user information (maybe for purposes of creating a customized report), then we can come up with those specifics at that time.

The only question left to answer at this point is whether or not we process calculations for multiple debts in one instance of our application, or if we simply require the user to run the program again for a different debt. I personally prefer method one, especially since it gives me an excuse to incorporate classes into this tutorial...

:]

Since we will be processing multiple debts, we should probably add a "title" to each debt, to give us a good way to tell them apart. Other than that, I think we have our initial plan set for the inputs we need.

#### Calculations?

Anyone who has taken a basic algebra or economics course has seen the formula for simple interest: **I = PV * i * N**, where PV equals principal or present value, i equals interest rate per period, and N equals number of periods, or the number of times interest is applied. Sadly, no one except your local school-yard bully uses simple interest, so we have to determine which interest method our lender uses, which can vary with the type of debt we have.

A wee bit of web crawling seems to indicate that most institutions use a variation of one compound interest formula or another, so we'll build our application to use a general compound interest formula. Later, if you find that the formula doesn't quite match your institution's policy, you can tweak it to match.

So, what is a compound interest formula? Why, this:

**V<sub>future</sub> = V<sub>present</sub> * ( 1 + _i_ )<sup>_n_</sup>**

V<sub>future</sub> equals the future (ending) value of the debt, V<sub>present</sub> equals the present (initial) value of the debt, _i_ equals the interest rate, and _n_ equals the number of times interest is compounded. Using this simple formula will get us a good idea of what the final repayment value of our debt will be, although it does not include such niceties as finance charges or fees.

A rather thoughtful fellow by the name of **<a href="http://oakroadsystems.com/math/loan.htm">Stan Brown</a>** worked out some rather nice formulas for us, one of which applies directly to our task at hand:

**B = A * ( 1 + _i_ )<sup>_n_</sup> - ( P * [ ( 1 + _i_ )<sup>_n_</sup> - 1 ] ) / _i_**

B equals the balance of the debt after a payment is made, A equals the current value of the debt, _i_ equals the interest rate, _n_ is the number of times interest has been compounded since the last payment, and P equals the value of the payment. While Mr. Brown does stress that this calculation yields approximate values, the results we get from it are close enough for our purposes.

#### Explaining the formula

Since the above formula looks a bit confusing, let's talk about each part. Let's start with the first set of arithematic functions:

**A * ( 1 + _i_ )<sup>_n_</sup>**.

This part of the equation will give us the current value of the debt after interest in applied. We apply interest before subtracting the payment (since that's how banks and credit card companies do it).

The part in parenthesis will give us the effective interest rate. So if _i_ was equal to, say, 19% (or .19), the effective interest value is 1.19. Then we take the interest rate to the _nth_ power. Last, we multiply that value times the existing debt balance. This gives us the value of our debt should we not make a payment.

Now for the second part:

**( P * [ ( 1 + _i_ )<sup>_n_</sup> - 1 ] ) / _i_**.

This is where it gets interesting. First, we add the interest rate to 1. Given the previous value we suggested for i (19%, or 0.19), that would give us 1.19. We then take that to the nth power, and then subtract 1. Next, we multiply that value by the value of P. Lastly, we divide everything by i. The result of all these shenanigans? Why, the effective payment amount, of course. In other words, this part calculates how much of the debt we are actually paying off.

Put these two together, and you have the new balance of the debt. Cool, huh?

:]

#### Outputs?

Well, obviously, we want to output the final debt amount somehow, be it to the screen or as a print out. I also like the idea of outputting the payment amount(s) and the number of payments required to pay off the debt. Some extra information we can add might include the total interest, fees, and finance charges paid on the debt.

Hey, guess what? It looks like we are finally done with the planning stage of our application. Now we can move on to developing the logic that drives our program!

#### Step Two: LOGIC

Now that we know what we want our application to accomplish, we can start working out the logic required to arrive at those results. We will start with the simplest pseudo-code necessary to mimic our logic, then steadily refine that pseudo-code into statements that include more and more language keywords, until we are left with the bare-bones of a working application.

##### First Approximation

In our first run through, we don't need to be very specific; we just want to outline the most basic functions of our application, like so:

```
START PROGRAM

    PROMPT USER FOR REQUIRED INPUT<

    PERFORM INTEREST CALCULATIONS

    RETURN RESULTS TO USER

END PROGRAM
```

Our UML would be equally simple:

![Uh, shoulda been something displayed here...](/content/post-assets/uml-debt-tut.png)

Obviously, our real program will be much more complicated than these few lines, but each "call" in our pseudo-code happens to nicely encapsulate the major functions of our applications. We will have one part of our program devoted entirely to getting the data we need from the user. The next part of our program performs the various calculations required to generate the data we are after, such as monthly payments, interest paid over life of the debt, and so on. The last part obviously needs to give us this generated data in some fashion, be it a print out, written to file, or displayed on our screen.

#### The Wrap Up

Hopefully, if I have been clear enough, you were able to follow along with this tutorial. I encourage you to leave comments below, and above all, ASK QUESTIONS!

#### To be continued...

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> Programming Primer](../blog/programming-primer)
[View all](../blog)
[Yur Doin' It Wrong... <i class="fas fa-chevron-right"></i>](../blog/yur-doin-it-wrong)
</div>

