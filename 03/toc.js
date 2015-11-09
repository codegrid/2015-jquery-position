$.fn.toc = function(
  appendTo,   // 目次の挿入先
  frame,      // 擬似フレームの指定
  useAnimate  // animateの使用(true or false)
){
  // 見出し要素
  var $headings = this;

  // スクロールバーを持つフレーム要素の確定
  var $frame = frame ? $(frame) : $(window);

  // 目次リンクの生成
  var $links = $($headings.map(function(index, heading){
    return $('<a/>').text(heading.textContent)[0];
  }));

  // 目次UIの生成
  var $list = $('<ul/>').appendTo(appendTo);
  $links.each(function(index){
    $('<li/>').append($links.eq(index)).appendTo($list);
  });

  // 目次リンクのクリック
  $links.on('click', function(){
    var index = $links.index(this)
    scrollTo(index)
  })

  // 指定見出し番号の位置までスクロールさせる
  function scrollTo(index){
    var $heading = $headings.eq(index);

    // animateを使用しない
    if(!useAnimate){

      // 指定要素の箇所までスクロールされた状態にする
      $heading[0].scrollIntoView(true);
    }

    // animateを使用する
    else{

      // 擬似フレーム使用時は現スクロール量分をoffset値に加算し、擬似フレームの配置位置分を減算する
      var top = $heading.offset().top + (frame ? $frame.scrollTop() - $frame.offset().top : 0);

      // 擬似フレームを使用しない場合は$('html,body')でスクロールさせる
      (frame ? $frame : $('html,body')).animate({scrollTop: top});
    }
  }

  // スクロール時の処理
  $frame.on('scroll', function(){
    debounce(setCurrentClass)
  });
  setCurrentClass();


  // 処理を間引く
  function debounce(f, delay){
    if(debounce.timer){
      clearTimeout(debounce.timer);
    }
    debounce.timer = setTimeout(f, delay || 30);
  }

  // 画面に表示されたコンテンツの目次を強調表示する
  function setCurrentClass(){
    var currentIndex;

    // 画面の中央位置を算出
    var contentsTop = $frame.height() / 2 + (frame ? $frame.offset().top : $frame.scrollTop());
    $headings.each(function(index){

      // 見出し要素が画面の中央位置を過ぎたら、その見出しをカレントとする
      if($headings.eq(index).offset().top <= contentsTop){
        currentIndex = index;
      }
    })

    // カレントの見出しに対しクラス名を割り当てる
    if(currentIndex !== undefined){
      $links.removeClass('current').eq(currentIndex).addClass('current');
    }
  }

  return this;
}
