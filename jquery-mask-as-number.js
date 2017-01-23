/*!
 * MaskAsNumber Jquery Plugin v1.3
 * https://github.com/andrehtissot/jquery-mask-as-number
 *
 * Requires jQuery Library
 * https://jquery.com/
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 *
 * Date: 2017-01-23
 */
(function($) {
  var maskAsNumberMaxlengthDataKey = 'maskAsNumberMaxlength',
    maskAsNumberMaxDataKey = 'maskAsNumberMax',
    maskAsNumberMinDataKey = 'maskAsNumberMin',
    compareIntegerStrings = function(integerStringA, integerStringB){
    if(integerStringA[0] === '-' && integerStringB[0] === '-'){
      if(integerStringA.length > integerStringB.length) { return 1; }
      if(integerStringB.length > integerStringA.length) { return -1; }
      if(integerStringA > integerStringB) { return 1; }
      if(integerStringB > integerStringA) { return -1; }
    } else if(integerStringA[0] === '-'){
      return 1;
    } else if(integerStringB[0] === '-'){
      return -1;
    } else {
      if(integerStringA.length > integerStringB.length) { return -1; }
      if(integerStringB.length > integerStringA.length) { return 1; }
      if(integerStringA > integerStringB) { return -1; }
      if(integerStringB > integerStringA) { return 1; }
    }
    return 0;
  },
    fixValue = function(originalValue, min, max, maxlength){
    var value = originalValue, minus = originalValue[0] === '-' ? '-' : '';
    value = value.replace(/\D/g,'');
    if(value !== '0') { value = value.replace(/^0+/,''); }
    value = minus + value;
    if(min && compareIntegerStrings(value, min) === 1)
      value = min;
    else if(max && compareIntegerStrings(value, max) === -1)
      value = max;
    if(maxlength && value.length > maxlength)
      value = value.substr(0, maxlength);
    return (value) === originalValue ? false : value;
  },
    getFieldValue = function(inputElement){
    if(inputElement.type === 'number'){
      inputElement.type = 'text';
      var value = ''+inputElement.value;
      inputElement.type = 'number';
      return value.trim();
    }
    return inputElement.value.trim();
  };
  $.fn.maskAsNumber = function(options){
    var options = options || {};
    var receivedMinus = false;
    $(this).each(function(idx,element){
      var $elem = $(element), value = getFieldValue(element),
        max = (options.max || $elem.data(maskAsNumberMaxDataKey) || $elem.attr('max') || null),
        min = (options.min || $elem.data(maskAsNumberMinDataKey) || $elem.attr('min') || null),
        maxlength = $elem.attr('maxlength') || $elem.data(maskAsNumberMaxlengthDataKey) || null;
      if(element.type === 'number'){
        if(max !== null) { $elem.attr('max', max); }
        if(min !== null) { $elem.attr('min', min); }
        if(maxlength !== null) { $elem.data(maskAsNumberMaxlengthDataKey, maxlength); }
      }
      if (max !== null && maxlength === null && ((min !== null && min >= 0))){
        if(element.type === 'text') { $elem.attr('maxlength', (''+max).length); }
        else { $elem.data(maskAsNumberMaxlengthDataKey, (''+max).length); }
      }
      if(value !== '-' && !(/\d/.test(value))){ $elem.val(''); return; }
      var fixedValue = fixValue(value, min, max, maxlength);
      if(fixedValue !== false) { $elem.val(fixedValue); }
    }).on('keypress.maskAsNumber', function(event){
      if (event.ctrlKey || event.keyCode === 13
        || event.keyCode === 9 || event.charCode === 0) { return; }
      var char = event.char || String.fromCharCode(event.charCode);
      if (char !== '-' && /\D/.test(char)) { event.preventDefault(); return; }
      receivedMinus = char === '-';
    }).on('keyup.maskAsNumber', function(event){
      if(receivedMinus){ receivedMinus = false; return; }
      var $this = $(this), value = getFieldValue(this);
      if(value === '' || value === '0') { return; }
      var fixedValue = fixValue(value, null,
        ($this.data(maskAsNumberMaxDataKey) || $this.attr('max') || null),
        $this.data(maskAsNumberMaxlengthDataKey) || null);
      if (fixedValue !== false) { $this.val(''+fixedValue); }
    }).on('focusout.maskAsNumber', function(event){
      var $this = $(this), value = getFieldValue(this);
      if(value === '') { return; }
      if(value === '-') { $this.val(''); }
      var fixedValue = fixValue(value, ($this.data(maskAsNumberMinDataKey) || $this.attr('min') || null),
        ($this.data(maskAsNumberMaxDataKey) || $this.attr('max') || null),
        $this.data(maskAsNumberMaxlengthDataKey) || null);
      if(fixedValue === '0') { return; }
      if(fixedValue !== false) { $this.val(fixedValue); }
    }).on('paste.maskAsNumber', function(e){
      var pastedString;
      if(e.originalEvent.clipboardData){
        pastedString = (e.originalEvent || e).clipboardData.getData('text/plain');
      } else if(window.clipboardData){
        pastedString = window.clipboardData.getData('Text');
      } else { return; }
      pastedString = pastedString.trim();
      var minus = pastedString[0] === '-' ? '-' : '';
      pastedString = minus+pastedString.replace(/\D/g,'');
      var $this = $(this), isATextField = (this.type === 'text'),
        maxlength = $this.data(maskAsNumberMaxlengthDataKey) || $this.attr('maxlength') || null;
      if(isATextField) { $this.removeAttr('maxlength'); }
      else { $this.removeData(maskAsNumberMaxlengthDataKey); }
      setTimeout(function($elem, maxlength){
        if(isATextField) { $elem.attr('maxlength', maxlength); }
        else { $elem.data(maskAsNumberMaxlengthDataKey, maxlength); }
        var value = getFieldValue($elem[0]);
        if(value.length > maxlength)
          $elem.val(value.substr(0, maxlength));
        }, 100, $this, maxlength);
    });
  };
})(jQuery);
