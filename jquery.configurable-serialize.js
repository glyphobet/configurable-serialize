(function ($) {

  $.fn.serialize = function(options) {
    return jQuery.param(this.serializeArray(options));
  };

  $.fn.serializeArray = function(options) {
    var defaults = {emptyValues:true, emptyCheckboxes:false};
    options = $.extend(defaults, options);

    function vcheck(name, val) {
      return ((val || options.emptyValues) ? {name: name, value: val} : null);
    }

    return this.map(function(){
      return this.elements ? jQuery.makeArray(this.elements) : this;
    })
    .filter(function(){
      return this.name && !this.disabled &&
        ((this.checked || (options.emptyCheckboxes && options.emptyValues && this.type == 'checkbox') ) ||
          /select|textarea/i.test(this.nodeName) ||
          /text|hidden|password|search/i.test(this.type));
    })
    .map(function(i, elem){
      var val = jQuery(this).val();
      return val == null ? null :
        jQuery.isArray(val) ?
          jQuery.map( val, function(val, i){
            return vcheck(elem.name, val);
          }) :
            (options.emptyCheckboxes && this.type == 'checkbox' && !this.checked) ?
              vcheck(elem.name, '') :
              vcheck(elem.name, val);
    }).get();
  };

})(jQuery);
