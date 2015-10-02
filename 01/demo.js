var info = {
  set: function(contents){
    if(!$('.info > .infoContents').size()){
      $('.info').append('<div class="infoContents"/>');
    }
    $('.infoContents').append(contents);
  },
  clearInfo: function(){
    $('.info').html('');
  },
  showInfo: function(title, json, isFocus){
    var $p = $('<div/>');
    $('<span class="name"/>').text(title).appendTo($p)
    $('<span class="value"/>').text(typeof json === 'object' ? JSON.stringify(json) : json).appendTo($p)
    if(isFocus) $p.addClass('focus');
//    $p.appendTo('.info')
info.set($p);
  },
  setHtmlToInfo: function(html){
//    $(html).appendTo('.info');
info.set($(html));

  },
  showMethod: function(selector, method, isFocus){
    info.showInfo('$("'+selector + '").' + method + '()', $(selector)[method](), isFocus);
  },
  showCss: function(selector, props, isFocus){
    var json = {};
    $.each(props, function(idx, prop){
      json[prop] = $(selector).css(prop);
    });
    info.showInfo('$("'+selector + '").css(...)', json, isFocus);
  }
};
$(function(){
  if($('html').width() > 500){
    $('body').css('min-height', 3000)
  }
});


