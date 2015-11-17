$.fn.toc = function(
  tocAppendEl,   // 目次の挿入先
  frameEl,      // 擬似フレームの指定
  useAnimate  // animateの使用(true or false)
){
  // 見出し要素
  var $headings = this;

  // スクロールバーを持つフレーム要素の確定
  var $frameEl = frameEl ? $(frameEl) : $(window);

  // scrollSpyを有効にするクラス名を割り当てる
  var $tocAppendEl = $(tocAppendEl).addClass('scrollSpy');

  // 目次リンクの生成
  var $links = $($headings.map(function(index, heading){
    return $('<a/>').text(heading.textContent)[0];
  }));

  // 目次UIの生成
  var $list = $('<ul/>').appendTo(tocAppendEl);
  $links.each(function(index){
    $('<li/>').append($links.eq(index)).appendTo($list);
  });

  // 目次リンクのクリック
  $links.on('click', function(){
    var index = $links.index(this);
    scrollToHeading(index);
  });

  // 指定見出し番号の位置までスクロールさせる
  function scrollToHeading(index){
    var $heading = $headings.eq(index);

    // animateを使用しない
    if(!useAnimate){

      // 指定要素の箇所までスクロールされた状態にする
      $heading[0].scrollIntoView(true);
    }

    // animateを使用する
    else{
      // scrollSpyを非適用
      $tocAppendEl.removeClass('scrollSpy');

      // 疑似フレーム使用時は現スクロール量分をoffset値に加算し、
      // 疑似フレームの配置位置分を減算する
      var diff = frameEl ?
          $frameEl.scrollTop() - $frameEl.offset().top : 0;
      var top = $heading.offset().top + diff;

      // 疑似フレームを使用しない場合は$('html,body')でスクロールさせる
      var scrollEl = frameEl ? $frameEl : $('html,body');
      scrollEl.animate({scrollTop: top}, function(){

        // scrollSpyを適用
        $tocAppendEl.addClass('scrollSpy');

      });
    }
  }

  // スクロール時の処理
  $frameEl.on('scroll', function(){
    debounce(setCurrentClass);
  });
  setCurrentClass();

  // 処理を間引く
  function debounce(f){
    cancelAnimationFrame(debounce.id);
    debounce.id = requestAnimationFrame(f);
  }

  // 画面に表示されたコンテンツの目次を強調表示する
  function setCurrentClass(){
    var currentIndex;

    // 画面の中央位置を算出
    var diff = frameEl ?
        $frameEl.offset().top : $frameEl.scrollTop();
    var contentsTop = $frameEl.height() / 2 + diff;

    $headings.each(function(index){

      // 見出し要素が画面の中央位置を過ぎたら、その見出しをカレントとする
      if($headings.eq(index).offset().top <= contentsTop){
        currentIndex = index;
      }
    })

    // カレントの見出しに対しクラス名を割り当てる
    if(currentIndex !== undefined){
      $links.removeClass('current')
            .eq(currentIndex).addClass('current');
    }
  }

  return this;
}
