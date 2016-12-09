/*!
 * MaskAsNumber Jquery Plugin v1.1
 * https://github.com/andrehtissot/jquery-mask-as-number
 *
 * Requires jQuery Library
 * https://jquery.com/
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 *
 * Date: 2016-12-09
 */
(function($) {
  var compareIntegerStrings = function(integerStringA, integerStringB){
    if(integerStringA.length > integerStringB.length) { return -1; }
    if(integerStringB.length > integerStringA.length) { return 1; }
    if(integerStringA > integerStringB) { return -1; }
    if(integerStringB > integerStringA) { return 1; }
    return 0;
  }
  var fixValue = function(originalValue, min, max, maxlength){
    var value = originalValue;
    value = value.replace(/\D/g,'');
    if(value !== '0') { value = value.replace(/^0+/,''); }
    if(min && compareIntegerStrings(value, min) === 1)
      value = min;
    else if(max && compareIntegerStrings(value, max) === -1)
      value = max;
    else if(maxlength && value.length > maxlength)
      value = value.substr(0, maxlength);
    return (''+value) === originalValue ? false : value;
  }
  $.fn.maskAsNumber = function(options){
    var options = options || {};
    $(this).each(function(idx,element){
      var $elem = $(element), min = null, value = $elem.val(),
        max = (options.max || $elem.data('maskAsNumberMax') || null);
      var maxlength = $elem.attr('maxlength') || null;
      if (max !== null && maxlength === null)
        $elem.attr('maxlength', (''+max).length);
      if(options.min){ $elem.data('maskAsNumberMin', min = options.min); }
      else if($elem.data('maskAsNumberMin'))
        min = $elem.data('maskAsNumberMin');
      if(!(/\d/.test(value))){
        $elem.val('');
        return;
      }
      var fixedValue = fixValue(value, min, max, maxlength);
      if(fixedValue !== false) { $elem.val(fixedValue); }
    }).on('keypress.maskAsNumber', function(event){
      if (event.ctrlKey || event.keyCode === 13
        || event.keyCode === 9 || event.charCode === 0) { return; }
      var char = event.char || String.fromCharCode(event.charCode);
      if (!(/^\d$/.test(char))) { event.preventDefault(); return; }
    }).on('keyup.maskAsNumber', function(event){
      var $this = $(this), value = $this.val();
      if(value === '' || value === '0') { return; }
      var fixedValue = fixValue(value, null,
        ($this.data('maskAsNumberMax') || null), null);
      if (fixedValue !== false)
        $this.val(''+fixedValue);
    }).on('focusout.maskAsNumber', function(event){
      var $this = $(this), value = $this.val();
      if(value === '') { return; }
      var fixedValue = fixValue(value,
        ($this.data('maskAsNumberMin') || null),
        ($this.data('maskAsNumberMax') || null), null);
      if(fixedValue === '0') { return; }
      if(fixedValue !== false) { $this.val(fixedValue); }
    }).on('paste.maskAsNumber', function(e){
      var pastedString;
      if(e.originalEvent.clipboardData){
       pastedString = (e.originalEvent || e).clipboardData.getData('text/plain');
      } else if(window.clipboardData){
        pastedString = window.clipboardData.getData('Text');
      } else { return; }
      if(!/\D/.test(pastedString)){ return; }
      var $this = $(this);
      var maxlength = $this.attr('maxlength');
      $this.removeAttr('maxlength');
      setTimeout(function($elem, maxlength){
        $elem.attr('maxlength', maxlength);
        var value = $elem.val();
        if(value.length > maxlength)
          $elem.val(value.substr(0, maxlength));
      }, 100, $this, maxlength);
    });
  };
})(jQuery);
