# touch-input-nav

> Scopes mobile web tabbed input navigation to input elements inside the same form

![touch-input-nav](http://i.imgur.com/adaP4uB.gif)

## Installation

Using bower:

```bash
bower install touch-input-nav
```

Using browserify:
```bash
npm install --save-dev touch-input-nav
```

## Usage

Note that this module is dependent on jQuery.

```js
$(function () {
    touchInputNav();
});
```

### touchInputNav([className])

#### className
Type: `string`
A class to allow for custom styling of the disabled state. This can be used to override how the disabled state is presented for form input elements outside of the current form scope.

## Current Browser's supported

iOS Safari/Chrome

All other browsers will have no input field disabling applied.
