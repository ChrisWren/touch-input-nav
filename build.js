(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var touchInputNav = require('../../touch-input-nav');
touchInputNav();
},{"../../touch-input-nav":2}],2:[function(require,module,exports){
/*
 * touch-input-nav.js
 * https://github.com/ChrisWren/touch-input-nav
 *
 * Copyright (c) 2013 Chris Wren & contributors
 * Licensed under the MIT license.
 */
;(function () {
  'use strict';

  // Negates the user agent :disabled input field styling on a per os/browser basis
  var osData = {
    iOSSafari: {
      touchEvent: 'touchstart',
      styles: {
        input: {
          'opacity': 1
        },
        textarea: {
          'opacity': 1
        },
        select: {
          'color': 'black'
        }
      }
    }
    // Add more browser/OS combos here
  };

  // List of known mobile OS and browser combos which have tabable input navigation
  function getTabableOsAndBrowser() {
    if (window.navigator.userAgent.match(/iPhone|iPad|iPod/)) {
      return 'iOSSafari';
    }
    // Add more browser/OS combos here
  }

  /**
   * Public method which sets up form-scoped touch input navigation
   * @param  {String} className Custom class to override for custom styling
   * @return {Boolean}          Returns false if current browser doesn't have tabable input navigation
   */
  var touchInputNav = function (className) {

    var tabableOsAndBrowser = getTabableOsAndBrowser();

    if (!tabableOsAndBrowser) {
      return false;
    }

    // Allow user to use a custom className so that they can do specific styling
    // per browser/os combo if they so desire
    var disabledClassName = className || 'input-disabled';

    // Generate a <style> tag to insert into the page instead of assigning inline-styles
    var styleString = '';
    for (var element in osData[tabableOsAndBrowser].styles) {
      styleString +=  element + ':disabled.' + disabledClassName + '{';
      for (var key in osData[tabableOsAndBrowser].styles[element]) {
        styleString += key + ':' + osData[tabableOsAndBrowser].styles[element][key] + ';';
      }
      styleString += '}';
    }

    $('<style>').html(styleString).appendTo('head');

    var inputSelectorString = 'input,select,textarea';

    $(document).on('focus', inputSelectorString, function () {
      var $this = $(this);
      var $formInputs = $this.closest('form').find(inputSelectorString);
      var $otherInputs = $(inputSelectorString).not($formInputs);

      // Disable inputs that are outside of the current <form> scope
      $otherInputs.prop('disabled', true);
      $otherInputs.addClass(disabledClassName + ' ' + tabableOsAndBrowser);

      // When the currently focused input element blurs, un-disable all the others
      $this.one('blur', function () {
        $otherInputs.prop('disabled', false);
        $(inputSelectorString).off('.input-disabled');
        $otherInputs.removeClass(disabledClassName + ' ' + tabableOsAndBrowser);
      });

      // If a disabled input field is tapped allow it to be focused
      // by removing the disabled attribute
      $(inputSelectorString).one(osData[tabableOsAndBrowser].touchEvent + '.input-disabled', function () {
        $(this).prop('disabled', false);
      });
    });
  };

   /** Used to determine if values are of the language type Object */
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    define(['jquery'], function () {
      return touchInputNav;
    });
  } else {
    if (typeof module === 'object' && module.exports) {
      module.exports = touchInputNav;
    } else {
      window.touchInputNav = touchInputNav;
    }
  }
})();
},{}]},{},[1])