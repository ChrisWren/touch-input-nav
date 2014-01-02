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
      event: 'touchstart',
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
    } else if (window.navigator.userAgent.match(/Samsung/)) {
      return 'SamsungAndroid';
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

    // If current browser doesn't have tabable input navigation, exit early
    if (!tabableOsAndBrowser) {
      return false;
    }

    // Allow user to use a custom className so that they can do specific styling
    // per browser/os combo if they so desire
    var disabledClassName = className || 'input-disabled';

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

    // Prevent input navigation outside of the current form scope
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
      $(inputSelectorString).one(osData[tabableOsAndBrowser].event + '.input-disabled', function () {
        $(this).prop('disabled', false);
      });
    });
  };

  var root = window ? window : module.exports;

  if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
    root.touchInputNav = touchInputNav;

    // define as an anonymous module so, through path mapping, it can be
    define(function () {
      return touchInputNav;
    });
  } else {
    root.touchInputNav = touchInputNav;
  }
})();