---
title: The Not-So-Great PHP/MySQL Tutorial, Part 2
layout: blog
with_header: true
render_quote: true
---

<div class="post-title" markdown="1">
## [The Not-So-Great PHP/MySQL Tutorial, Part 2](../blog/the-not-so-great-php-mysql-tutorial-part-2)

Posted on **Wednesday, March 23, 2011**
</div>

<ul class="post-tags-list">
<li><span class="badge badge-success p-2">PHP</span></li>
<li><span class="badge badge-success p-2">MySQLi</span></li>
<li><span class="badge badge-success p-2">SQL</span></li>
</ul>

So, assuming you read (and completed) [Part 1](/tutorial/the-not-so-great-php-mysql-tutorial-part-1), you should have a functional database connection script and an input page. Part 2 will cover how we get our data back out of the database.

To keep things simple, we're going to load our data out into a table. It's a simple and valid way of displaying tabular (table-based) data. Once you understand what's going on in this tutorial, it's relatively simple to develop alternative methods of displaying our tables.

### First Things First

Obviously, since this is Part 2, you need to have completed Part 1. At the very least, you need a copy of the `db.php` file, since it contains the connection script. Once you have your copy of `db.php` ready to go, read on.

So let's think about what we need. We're trying to display what we're perhaps misleadingly calling "timesheets." At this point, it's more of a simple ledger than anything. Regardless, this is the data I want to pull from the table:

- Employee Name
- Hourly rate
- Hours worked
- Gross pay
- Federal tax
- State tax
- Social Security withholding

The structure we defined for the table in the first part of this tutorial doesn't match these output "fields," which is fine. SQL lets us perform aggregation on the server side. We can also perform math functions with SQL. Using the nice aliasing features of most modern database systems (MySQL being one of them), we can run a SQL query, generating some columns on the fly, and then use the aliased values directly in our PHP scripts.

### SQL Aliasing

In the SQL world, when you want to have the database engine calculate some aggregate data for you (say, by summing some fields together), you need a way to reference that new value, since it's not a column that is defined in your table. An alias basically creates a temporary field in real time that you can use in the result set. The result set when using PHP to run a MySQL query is (by default) an associative array. What that means is that each row in the table is returns as an array, with the field name being the key and the field value being the associated value. A rather common aggregate function is `COUNT`, which is often used to count the number of rows in a table, like so:

```sql
SELECT COUNT(`id`) AS rows FROM `table`;
```

Like I mentioned in Part 1, I tend to uppercase SQL keywords, but the MySQL engine is not case-sensitive. In this example, the aggregate function `COUNT` is used to count up each 'id' field in every row. We assign the alias `rows` to the value returned by `COUNT`. You'll see shortly how we reference the values returned by our SQL array.

### Define a Query

The query type we used in Part 1 was an `INSERT` query, which is used to (obviously) insert data into our table. Now that we have data in the table, we need a different type of query to pull that data back out. We call these `SELECT` queries, as that is the keyword we use in the query string.

It';s very easy to do something like this when we want a majority of the fields in a table:

```sql
SELECT * FROM table;
```

**DO NOT DO THAT.** This is a very lazy query, and often results in larger result sets than we need. For instance, imagine that in the COUNT example earlier we had used this instead:

```sql
SELECT COUNT(*) as rows FROM table;
```

While this works, using the `*` means we grab every value from every row, when all we really wanted was to count the number of rows. Why? Because the `*` is what's called the "wildcard" selector. It will match every single field in the table. I have yet to encounter an instance when getting every single field is a valid action.

So what are we doing at this point? Well, it's easy enough to concatenate the first and last name together. MySQL has a function called `CONCAT_WS`, which accepts a minimum of three arguments: the separator, the leading value of the string, and the string to append to the end of the string. Each string provided after the second string is appended to the end of the concatenated string. So the first part of the query is:

```sql
SELECT CONCAT_WS(" ", `first`, `last`) AS name
```

Next, we need to aggregate the individual day values into a sum. MySQL is perfectly capable of evaluating basic arithmetic, so we just need to define the expression to evaluate and give the result an alias, like so:

```sql
SELECT CONCAT_WS(" ", `first`, `last`) AS name, (`monday`+`tuesday`+`wednesday`+`thursday`+`friday`) AS hours
```

The table also has a field for the pay rate, called <code>rate</code>, so we can also calculate the gross pay, just like we calculated the sum:

```sql
SELECT CONCAT_WS(" ", `first`, `last`) AS name, (`monday`+`tuesday`+`wednesday`+`thursday`+`friday`) AS hours, (`hours` * `rate`) AS gross
```

Calculating the withholding is a bit trickier. There is no such thing as a flat tax rate; you pay a higher tax rate as you make more. While we can do this in MYSQL, it may be easier to see it done in PHP. That also means we can't calculate net pay using MySQL, since we need the values of each withholding. Before we can move on the PHP script, we need to close up our query string:

```sql
SELECT CONCAT_WS(" ", `first`, `last`) AS name, (`monday`+`tuesday`+`wednesday`+`thursday`+`friday`) AS hours, (`hours` * `rate`) AS gross FROM employees;
```

### output.php

If you haven't done it yet, create a new PHP file in the same directory as `db.php` and `input.php`, and name it `output.php`. This script will contain both the PHP to generate the content and some HTML to structure the output.

Let's start off with the HTML part of the page:

```markup
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title&gt;Dah Timesheet</title>
		<style>
			body 
			{ 
				font: 14px/22px Calibri, "Frutiger Linotype", Frutiger, "Gill Sans", "Gills Sans MT", sans-serif; 
				color:#333; 
				background:#fffbff; 
			}
		</style>
	</head>
	<body>
		<h2>Dah Timesheet<h2>
		<table>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Hours</th>
				<th>Gross</th>
				<th>Federal</th>
				<th>State</th>
				<th>Social Security</th>
				<th>Net</th>
			</tr>
		</table>
	</body>
</html>
```

As you can see, there's not a lot going on in the raw HTML part of the page, which is by design. This is intended to be a simple example, not a full-fledged reporting tool&hellip;

Next, we create a PHP zone embedded in the HTML. This will dynamically generate the HTML to display each employee's "timesheet" in the format we want:

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Dah Timesheet</title>
		<style>
			body 
			{ 
				font: 14px/22px Calibri, "Frutiger Linotype", Frutiger, "Gill Sans", "Gills Sans MT", sans-serif; 
				color: #333; 
				background: #fffbff; 
			}
		</style>
	</head>
	<body>
		<h2>Dah Timesheet<h2>
		<table>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Hours</th>
				<th>Gross</th>
				<th>Federal</th>
				<th>State</th>
				<th>Social Security</th>
				<th>Net</th>
			</tr>
		   
			<?php # Here there be PHP ?>
		   
		</table>
	</body>
</html>
```

The first thing we do is add a reference to our `db.php` file, which gives us a connection to our database. Assuming the connection is now valid, we need to build and execute the query we defined earlier:

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Dah Timesheet</title>
		<style>
			body 
			{ 
				font: 14px/22px Calibri, "Frutiger Linotype", Frutiger, "Gill Sans", "Gills Sans MT", sans-serif; 
				color: #333; 
				background: #fffbff; 
			}
		</style>
	</head>
	<body>
		<h2>Dah Timesheet<h2>
		<table>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Hours</th>
				<th>Gross</th>
				<th>Federal</th>
				<th>State</th>
				<th>Social Security</th>
				<th>Net</th>
			</tr>
		   
			<?php # Here there be PHP
			   
				# include the connection script
				require( 'db.php' );
			   
				# build the query string
				$str = 'SELECT CONCAT_WS(" ", `first`, `last`) AS name, (`monday`+`tuesday`+`wednesday`+`thursday`+`friday`) AS hours, (`hours` * `rate`) AS gross FROM employees;';
			   
				# Execute the query, handling the error as needed
				$result = mysqli_query( $dbc, $str ) or die( "<h1>SELECT query failed!</h1> <p>Error: " . mysqli_error( $dbc ) . "</p>"  );

			?>
		   
		</table>
	</body>
</html>
```


### Building the Table

We should at this point have a result set. To get our values to build the array, we must use a PHP function called `mysqli_fetch_assoc` which returns an associative array equal to one "row" of the result set. We can use a handy feature of PHP, which lets us use pretty much any value in a conditional expression, to create a loop while the result set contains a valid new row:

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Dah Timesheet</title>
		<style>
			body 
			{ 
				font: 14px/22px Calibri, "Frutiger Linotype", Frutiger, "Gill Sans", "Gills Sans MT", sans-serif; 
				color: #333; 
				background: #fffbff; 
			}

			.alt { background: #d0d0d0; }
		</style>
	</head>
	<body>
		<h2>Dah Timesheet<h2>
		<table>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Hours</th>
				<th>Gross</th>
				<th>Federal</th>
				<th>State</th>
				<th>Social Security</th>
				<th>Net</th>
			</tr>
		   
			<?php
				# Here there be PHP
			   
				# include the connection script
				require( 'db.php' );
			   
				# build the query string
				$str = 'SELECT CONCAT_WS(" ", `first`, `last`) AS name, (`monday`+`tuesday`+`wednesday`+`thursday`+`friday`) AS hours, (`hours` * `rate`) AS gross FROM employees;';
			   
				# Execute the query, handling the error as needed
				$result = mysqli_query( $dbc, $str ) or die( "<h1>SELECT query failed!</h1> <p>Error: " . mysqli_error( $dbc ) . "</p>"  );

				$alt = false;
				while( $row = mysqli_fetch_assoc( $result ) ) {
			   
				}              	   
			?>
		</table>
	</body>
</html>
```

What this new line does is project a row of the result set into a new array. This array is then used as the conditional of the `while` loop. As long as the array value is not something that would evaluate as `false` (an empty or null array), the loop will continue.

Each time we run through the loop, we need to figure out what tax bracket the user falls in for both state and federal taxes. We can use the SQL-calculated value, `gross`, in a `switch` statement for federal tax. Once we have established what the correct tax rates are, we can build our table rows, using a generated value for each of the federal, state, and Social Security fields:

```php
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<title>Dah Timesheet</title>
		<style>
			body 
			{ 
				font: 14px/22px Calibri, "Frutiger Linotype", Frutiger, "Gill Sans", "Gills Sans MT", sans-serif; 
				color: #333; 
				background: #fffbff; 
			}

		        .alt { background: #d0d0d0; }
		</style>
	</head>
	<body>
		<h2>Dah Timesheet<h2>
		<table>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th>Hours</th>
				<th>Gross</th>
				<th>Federal</th>
				<th>State</th>
				<th>Social Security</th>
				<th>Net</th>
			</tr>
		   
			<?php
				# Here there be PHP
			   
				# include the connection script
				require( 'db.php' );
			   
				# build the query string
				$str = 'SELECT CONCAT_WS(" ", `first`, `last`) AS name, (`monday`+`tuesday`+`wednesday`+`thursday`+`friday`) AS hours, (`hours` * `rate`) AS gross FROM employees;';
			   
				# Execute the query, handling the error as needed
				$result = mysqli_query( $dbc, $str ) or die( "<h1>SELECT query failed!</h1> <p>Error: " . mysqli_error( $dbc ) . "</p>"  );

				$alt = false;
				while( $row = mysqli_fetch_assoc( $result ) ) {
			   
					# Determine the tax brackets via http://www.moneychimp.com/features/tax_brackets.htm
					switch( $row['gross'] ) {
						case ( $row['gross'] < 8375 ):
							$fedtax = 0.10 * $row['gross'];
							break;
						case ( $row['gross'] < 34000 ):
							$fedtax = 0.15 * $row['gross'];
							break;
						case ( $row['gross'] < 82400 ):
							$fedtax = 0.25 * $row['gross'];
							break;
						case ( $row['gross'] < 171850 ):
							$fedtax = 0.28 * $row['gross'];
							break;
						case ( $row['gross'] < 373650 ):
							$fedtax = 0.33 * $row['gross'];
							break;
						default:
							$fedtax = 0.35 * $row['gross'];
							break;
					}
			   
					$statetax = 0.0435 * $row['gross'];
					$sstax = 0.062 * $row['gross'];
					$net = $row['gross'] - $fedtax - $statetax - $sstax;
				   
					if( $alt ) {
						echo( "\n<tr class=\"alt\">\n" );
					}
					else {
						echo( "\n<tr>\n" );
					}
					echo( "\n<td>" . $row['name'] . "<td>\n" );
					echo( "\n<td>" . $row['hours'] . "<td>\n" );
					echo( "\n<td>" . $row['gross'] . "<td>\n" );
					echo( "\n<td>" . $fedtax . "<td>\n" );
					echo( "\n<td>" . $statetax . "<td>\n" );
					echo( "\n<td>" . $sstax . "<td>\n" );
					echo( "\n<td>" . $net . "<td>\n" );
					echo( "\n</tr>\n" );
				   
					$alt = !$alt;
				}
			?>
		</table>
	</body>
</html>
```

And that's pretty much it. Again, this is a super simple example of extracting output from our table. Depending on how much feedback this tutorial gets, I could write a Part 3, where I could you how to create a much more interesting output page.

---

<div class="blog-pager" markdown="1">
[<i class="fas fa-chevron-left"></i> The Not-So-Great PHP/MySQL Tutorial, Part 1](../blog/the-not-so-great-php-mysql-tutorial-part-1)
[View all](../blog)
[Overloading Constructors in Java <i class="fas fa-chevron-right"></i>](../blog/overloading-constructors-in-java)
</div>

