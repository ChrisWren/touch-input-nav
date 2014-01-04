'use strict';

window.navigator.__defineGetter__('userAgent', function () {
  return 'iPhone';
});

var customClass = 'customClass';

window.touchInputNav(customClass);

$('#test-input').focus();

module('touch-input-nav');

test('should disabled input elements outside the focused element\'s form scope', function () {
  ok($('#test-textarea').prop('disabled') === true);
});

test('should add a class to allow for custom styling of disabled elements', function () {
  ok($('#test-textarea').hasClass(customClass) === true);
});

test('should add a <style> element to the page with styling for temporary disabled elements', function () {
  ok($('#touch-input-nav-styles').length);
  ok($('#touch-input-nav-styles').html() === 'input:disabled.customClass{opacity:1;}textarea:disabled.customClass{opacity:1;}select:disabled.customClass{color:black;}');
});

test('should remove the styling class and disabled attribute when the focus blurs from the currently focused element', function () {
  $('#test-input').blur();
  ok($('#test-textarea').prop('disabled') === false);
  ok($('#test-textarea').hasClass(customClass) === false);
});