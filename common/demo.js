(function($){
  $.OpenFullWindow = function(opt){
    var extend = function(){
      var ret = {};
      var arg = arguments;
      for(var i = 0; i < arg.length; i++ ){
        var obj = arg[i];
        for(var j in obj){
          ret[j] = obj[j];
        }
      }
      return ret;
    }
    var sirial = function(obj){
      var ret = '';
      for(var i in obj){
        if(ret.length) ret += ',';
        ret = ret + (i + '=' + obj[i]);
      }
      return ret;
    }
    var opt = opt || {};
    var c = extend(def,opt);
    c.width = c.width || screen.availWidth + c.adjustWidth;
    c.height = c.height || screen.availHeight + c.adjustHeight;
    var p = extend(c);
    delete p.url;
    delete p.target;
    delete p.adjustWidth;
    delete p.adjustHeight;
    return window.open(c.url,c.target,sirial(p));
  }
  var def = $.OpenFullWindow.defaults = {
    top : 0,
    left : 0,
    status : 1,
    resizable : 1,
    directories : 1,
    location : 0,
    menubar : 0,
    toolbar : 0,
    scrollbars : 1,
    url : '',
    target : '_blank',
    adjustWidth : 0,
    adjustHeight : 0
  }
})(typeof $ ? $ : window);

;(function($){
  var plugin = $.parseURL = function(url){
    var prop = plugin.prop
    var loc = url ? $('<a/>').prop('href', url)[0] : location;
    var ret = {};
    $.each(prop, function(i){
      var n = prop[i];
      if(typeof loc[n] == 'string') ret[n] = loc[n];
    });
    var q = ret.query = {};
    if(ret.search){
      var s = ret.search.substr(1).split('&');
      $.each(s, function(i){
        var p = s[i].split('=');
        var v = p[1];
        try{
          v = decodeURIComponent(v);
        }catch(e){}
        q[p[0]] = v;
      });
    }
    return ret;
  }
  $.fn.parseURL = function(){
    var t = this.eq(0);
    return $.parseURL(t.prop('href') || t.prop('src'));
  }
  plugin.prop = ['hash','host','hostname','href','pathname','port','protocol','search'];

})(jQuery);


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
  if(!$('.disabledAutoHeight').size() && $('html').width() > 500){
    $('body').css('min-height', 3000)
  }
});


