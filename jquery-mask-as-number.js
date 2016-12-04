/*!
 * MaskAsNumber Jquery Plugin v1.0
 * https://github.com/andrehtissot/jquery-mask-as-number
 *
 * Requires jQuery Library
 * https://jquery.com/
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 *
 * Date: 2016-12-04
 */
(function($) {
  var compareIntegerStrings = function(integerStringA, integerStringB){
    if(integerStringA.length > integerStringB.length) { return -1; }
    if(integerStringB.length > integerStringA.length) { return 1; }
    if(integerStringA > integerStringB) { return -1; }
    if(integerStringB > integerStringA) { return 1; }
    return 0;
  }
  var fixValue = function(originalValue, min, max){
    var value = originalValue;
    value = value.replace(/\D/g,'');
    if(value !== '0') { value = value.replace(/^0+/,''); }
    if(min && compareIntegerStrings(value, min) === 1)
      value = min;
    else if(max && compareIntegerStrings(value, max) === -1)
      value = max;
    return (''+value) === originalValue ? false : value;
  }
  $.fn.maskAsNumber = function(options){
    var options = options || {};
    $(this).data('maskAsNumber', 'loaded')
      .each(function(idx,element){
      var $elem = $(element), min = null, value = $elem.val(),
        max = (options.max || $elem.data('maskAsNumberMax') || null);
      if (max === null && $elem.attr('maxlength'))
        max = ((Math.pow(10,parseInt($elem.attr('maxlength'),10))-1) || null);
      if(max !== null && !($elem.data('maskAsNumberMax')))
        $elem.data('maskAsNumberMax', ''+max);
      if(options.min){ $elem.data('maskAsNumberMin', min = options.min); }
      else if($elem.data('maskAsNumberMin'))
        min = $elem.data('maskAsNumberMin');
      if(!(/\d/.test(value))){
        $elem.data('maskAsNumberOldValue', '').val('');
        return;
      }
      var fixedValue = fixValue(value, min, max);
      if(fixedValue === false)
        $elem.data('maskAsNumberOldValue', $elem.val());
      else $elem.data('maskAsNumberOldValue', fixedValue).val(fixedValue);
    }).on('keypress.maskAsNumber', function(event){
      if (event.ctrlKey || event.keyCode === 13
        || event.keyCode === 9 || event.charCode === 0) { return; }
      var char = event.char || String.fromCharCode(event.charCode);
      if (!(/^\d$/.test(char))) { event.preventDefault(); return; }
      var $this = $(this), oldValue = $this.val();
      $this.data('maskAsNumberOldValue', oldValue);
    }).on('keyup.maskAsNumber', function(event){
      var $this = $(this), value = $this.val();
      if(value === '' || value === '0') { return; }
      var fixedValue = fixValue(value, null,
        ($this.data('maskAsNumberMax') || null));
      if (fixedValue !== false)
        $this.val(''+fixedValue);
    }).on('focusout.maskAsNumber', function(event){
      var $this = $(this), value = $this.val();
      if(value === '') { return; }
      var fixedValue = fixValue(value,
        ($this.data('maskAsNumberMin') || null),
        ($this.data('maskAsNumberMax') || null));
      if(fixedValue === '0') { return; }
      if(fixedValue !== false) { $this.val(fixedValue); }
    });
  };
})(jQuery);
