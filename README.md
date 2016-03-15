# uicForm3

The plugin’s key feature are:
- Mapping html form data to javascript object data and vice versa
  - Populating javascript data to the form by providing flat or nested objects.
  - Retrieving data from the form and creating flat or nested objects according to the form element’s naming.
  - Working on a property base rather than on a form field base.
- Differentiating between initial and current data.
- Triggering several callbacks whenever form data do change.
- Leaving the DOM untouched.


## How to use?
- Download the plugin from here or from the [project's homepage](http://uic.megaflop.net).
- Include jQuery and uicForm3 in your project
````javascript
<script src="path/to/file/jquery-1.10.1.min.js" type="text/javascript"></script>
<script src="path/to/file/jquery.uic-form3-1.0.4.js" type="text/javascript"></script>
````

- Apply plugin to an html form.
````javascript
$('#myFrom').uicForm3();
````

- Use the plugin's [methods](http://uic.megaflop.net/documentation) to control your form (populate data into it, get data out of it, reset, wipe and clear the form) and define methods for the [callbacks](http://uic.megaflop.net/documentation) within the plugin's options to make your code react dynamically on any changes of the form's data.

For
- more information on how to use uicForm3,
- a complete documentation and
- some examples,

please visit the [project's homepage](http://uic.megaflop.net).

## Compatibility
Tested on Firefox, Safari, Chrome, Safari Mobile, iCab Mobile, Internet Explorer 7

## Author
Ole Manshardt
