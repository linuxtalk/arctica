// ColorBox v1.3.20.1 - jQuery lightbox plugin
// (c) 2012 Jack Moore - jacklmoore.com
// License: http://www.opensource.org/licenses/mit-license.php
(function(e,t,n){function G(n,r,i){var o=t.createElement(n);return r&&(o.id=s+r),i&&(o.style.cssText=i),e(o)}function Y(e){var t=T.length,n=(U+e)%t;return n<0?t+n:n}function Z(e,t){return Math.round((/%/.test(e)?(t==="x"?tt():nt())/100:1)*parseInt(e,10))}function et(e){return B.photo||/\.(gif|png|jp(e|g|eg)|bmp|ico)((#|\?).*)?$/i.test(e)}function tt(){return n.innerWidth||N.width()}function nt(){return n.innerHeight||N.height()}function rt(){var t,n=e.data(R,i);n==null?(B=e.extend({},r),console&&console.log&&console.log("Error: cboxElement missing settings object")):B=e.extend({},n);for(t in B)e.isFunction(B[t])&&t.slice(0,2)!=="on"&&(B[t]=B[t].call(R));B.rel=B.rel||R.rel||"nofollow",B.href=B.href||e(R).attr("href"),B.title=B.title||R.title,typeof B.href=="string"&&(B.href=e.trim(B.href))}function it(t,n){e.event.trigger(t),n&&n.call(R)}function st(){var e,t=s+"Slideshow_",n="click."+s,r,i,o;B.slideshow&&T[1]?(r=function(){M.text(B.slideshowStop).unbind(n).bind(f,function(){if(B.loop||T[U+1])e=setTimeout(J.next,B.slideshowSpeed)}).bind(a,function(){clearTimeout(e)}).one(n+" "+l,i),g.removeClass(t+"off").addClass(t+"on"),e=setTimeout(J.next,B.slideshowSpeed)},i=function(){clearTimeout(e),M.text(B.slideshowStart).unbind([f,a,l,n].join(" ")).one(n,function(){J.next(),r()}),g.removeClass(t+"on").addClass(t+"off")},B.slideshowAuto?r():i()):g.removeClass(t+"off "+t+"on")}function ot(t){V||(R=t,rt(),T=e(R),U=0,B.rel!=="nofollow"&&(T=e("."+o).filter(function(){var t=e.data(this,i),n;return t&&(n=t.rel||this.rel),n===B.rel}),U=T.index(R),U===-1&&(T=T.add(R),U=T.length-1)),W||(W=X=!0,g.show(),B.returnFocus&&e(R).blur().one(c,function(){e(this).focus()}),m.css({opacity:+B.opacity,cursor:B.overlayClose?"pointer":"auto"}).show(),B.w=Z(B.initialWidth,"x"),B.h=Z(B.initialHeight,"y"),J.position(),d&&N.bind("resize."+v+" scroll."+v,function(){m.css({width:tt(),height:nt(),top:N.scrollTop(),left:N.scrollLeft()})}).trigger("resize."+v),it(u,B.onOpen),H.add(A).hide(),P.html(B.close).show()),J.load(!0))}function ut(){!g&&t.body&&(Q=!1,N=e(n),g=G(K).attr({id:i,"class":p?s+(d?"IE6":"IE"):""}).hide(),m=G(K,"Overlay",d?"position:absolute":"").hide(),L=G(K,"LoadingOverlay").add(G(K,"LoadingGraphic")),y=G(K,"Wrapper"),b=G(K,"Content").append(C=G(K,"LoadedContent","width:0; height:0; overflow:hidden"),A=G(K,"Title"),O=G(K,"Current"),_=G(K,"Next"),D=G(K,"Previous"),M=G(K,"Slideshow").bind(u,st),P=G(K,"Close")),y.append(G(K).append(G(K,"TopLeft"),w=G(K,"TopCenter"),G(K,"TopRight")),G(K,!1,"clear:left").append(E=G(K,"MiddleLeft"),b,S=G(K,"MiddleRight")),G(K,!1,"clear:left").append(G(K,"BottomLeft"),x=G(K,"BottomCenter"),G(K,"BottomRight"))).find("div div").css({"float":"left"}),k=G(K,!1,"position:absolute; width:9999px; visibility:hidden; display:none"),H=_.add(D).add(O).add(M),e(t.body).append(m,g.append(y,k)))}function at(){return g?(Q||(Q=!0,j=w.height()+x.height()+b.outerHeight(!0)-b.height(),F=E.width()+S.width()+b.outerWidth(!0)-b.width(),I=C.outerHeight(!0),q=C.outerWidth(!0),g.css({"padding-bottom":j,"padding-right":F}),_.click(function(){J.next()}),D.click(function(){J.prev()}),P.click(function(){J.close()}),m.click(function(){B.overlayClose&&J.close()}),e(t).bind("keydown."+s,function(e){var t=e.keyCode;W&&B.escKey&&t===27&&(e.preventDefault(),J.close()),W&&B.arrowKey&&T[1]&&(t===37?(e.preventDefault(),D.click()):t===39&&(e.preventDefault(),_.click()))}),e("."+o,t).live("click",function(e){e.which>1||e.shiftKey||e.altKey||e.metaKey||(e.preventDefault(),ot(this))})),!0):!1}var r={transition:"elastic",speed:300,width:!1,initialWidth:"600",innerWidth:!1,maxWidth:!1,height:!1,initialHeight:"450",innerHeight:!1,maxHeight:!1,scalePhotos:!0,scrolling:!0,inline:!1,html:!1,iframe:!1,fastIframe:!0,photo:!1,href:!1,title:!1,rel:!1,opacity:.9,preloading:!0,current:"image {current} of {total}",previous:"previous",next:"next",close:"close",xhrError:"This content failed to load.",imgError:"This image failed to load.",open:!1,returnFocus:!0,reposition:!0,loop:!0,slideshow:!1,slideshowAuto:!0,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:!1,onLoad:!1,onComplete:!1,onCleanup:!1,onClosed:!1,overlayClose:!0,escKey:!0,arrowKey:!0,top:!1,bottom:!1,left:!1,right:!1,fixed:!1,data:undefined},i="colorbox",s="cbox",o=s+"Element",u=s+"_open",a=s+"_load",f=s+"_complete",l=s+"_cleanup",c=s+"_closed",h=s+"_purge",p=!e.support.opacity&&!e.support.style,d=p&&!n.XMLHttpRequest,v=s+"_IE6",m,g,y,b,w,E,S,x,T,N,C,k,L,A,O,M,_,D,P,H,B,j,F,I,q,R,U,z,W,X,V,$,J,K="div",Q;if(e.colorbox)return;e(ut),J=e.fn[i]=e[i]=function(t,n){var s=this;t=t||{},ut();if(at()){if(!s[0]){if(s.selector)return s;s=e("<a/>"),t.open=!0}n&&(t.onComplete=n),s.each(function(){e.data(this,i,e.extend({},e.data(this,i)||r,t))}).addClass(o),(e.isFunction(t.open)&&t.open.call(s)||t.open)&&ot(s[0])}return s},J.position=function(e,t){function f(e){w[0].style.width=x[0].style.width=b[0].style.width=e.style.width,b[0].style.height=E[0].style.height=S[0].style.height=e.style.height}var n,r=0,i=0,o=g.offset(),u,a;N.unbind("resize."+s),g.css({top:-9e4,left:-9e4}),u=N.scrollTop(),a=N.scrollLeft(),B.fixed&&!d?(o.top-=u,o.left-=a,g.css({position:"fixed"})):(r=u,i=a,g.css({position:"absolute"})),B.right!==!1?i+=Math.max(tt()-B.w-q-F-Z(B.right,"x"),0):B.left!==!1?i+=Z(B.left,"x"):i+=Math.round(Math.max(tt()-B.w-q-F,0)/2),B.bottom!==!1?r+=Math.max(nt()-B.h-I-j-Z(B.bottom,"y"),0):B.top!==!1?r+=Z(B.top,"y"):r+=Math.round(Math.max(nt()-B.h-I-j,0)/2),g.css({top:o.top,left:o.left}),e=g.width()===B.w+q&&g.height()===B.h+I?0:e||0,y[0].style.width=y[0].style.height="9999px",n={width:B.w+q,height:B.h+I,top:r,left:i},e===0&&g.css(n),g.dequeue().animate(n,{duration:e,complete:function(){f(this),X=!1,y[0].style.width=B.w+q+F+"px",y[0].style.height=B.h+I+j+"px",B.reposition&&setTimeout(function(){N.bind("resize."+s,J.position)},1),t&&t()},step:function(){f(this)}})},J.resize=function(e){W&&(e=e||{},e.width&&(B.w=Z(e.width,"x")-q-F),e.innerWidth&&(B.w=Z(e.innerWidth,"x")),C.css({width:B.w}),e.height&&(B.h=Z(e.height,"y")-I-j),e.innerHeight&&(B.h=Z(e.innerHeight,"y")),!e.innerHeight&&!e.height&&(C.css({height:"auto"}),B.h=C.height()),C.css({height:B.h}),J.position(B.transition==="none"?0:B.speed))},J.prep=function(t){function o(){return B.w=B.w||C.width(),B.w=B.mw&&B.mw<B.w?B.mw:B.w,B.w}function u(){return B.h=B.h||C.height(),B.h=B.mh&&B.mh<B.h?B.mh:B.h,B.h}if(!W)return;var n,r=B.transition==="none"?0:B.speed;C.remove(),C=G(K,"LoadedContent").append(t),C.hide().appendTo(k.show()).css({width:o(),overflow:B.scrolling?"auto":"hidden"}).css({height:u()}).prependTo(b),k.hide(),e(z).css({"float":"none"}),d&&e("select").not(g.find("select")).filter(function(){return this.style.visibility!=="hidden"}).css({visibility:"hidden"}).one(l,function(){this.style.visibility="inherit"}),n=function(){function y(){p&&g[0].style.removeAttribute("filter")}var t,n,o=T.length,u,a="frameBorder",l="allowTransparency",c,d,v,m;if(!W)return;c=function(){clearTimeout($),L.detach().hide(),it(f,B.onComplete)},p&&z&&C.fadeIn(100),A.html(B.title).add(C).show();if(o>1){typeof B.current=="string"&&O.html(B.current.replace("{current}",U+1).replace("{total}",o)).show(),_[B.loop||U<o-1?"show":"hide"]().html(B.next),D[B.loop||U?"show":"hide"]().html(B.previous),B.slideshow&&M.show();if(B.preloading){t=[Y(-1),Y(1)];while(n=T[t.pop()])m=e.data(n,i),m&&m.href?(d=m.href,e.isFunction(d)&&(d=d.call(n))):d=n.href,et(d)&&(v=new Image,v.src=d)}}else H.hide();B.iframe?(u=G("iframe")[0],a in u&&(u[a]=0),l in u&&(u[l]="true"),u.name=s+ +(new Date),B.fastIframe?c():e(u).one("load",c),u.src=B.href,B.scrolling||(u.scrolling="no"),e(u).addClass(s+"Iframe").appendTo(C).one(h,function(){u.src="//about:blank"})):c(),B.transition==="fade"?g.fadeTo(r,1,y):y()},B.transition==="fade"?g.fadeTo(r,0,function(){J.position(0,n)}):J.position(r,n)},J.load=function(t){var n,r,i=J.prep;X=!0,z=!1,R=T[U],t||rt(),it(h),it(a,B.onLoad),B.h=B.height?Z(B.height,"y")-I-j:B.innerHeight&&Z(B.innerHeight,"y"),B.w=B.width?Z(B.width,"x")-q-F:B.innerWidth&&Z(B.innerWidth,"x"),B.mw=B.w,B.mh=B.h,B.maxWidth&&(B.mw=Z(B.maxWidth,"x")-q-F,B.mw=B.w&&B.w<B.mw?B.w:B.mw),B.maxHeight&&(B.mh=Z(B.maxHeight,"y")-I-j,B.mh=B.h&&B.h<B.mh?B.h:B.mh),n=B.href,$=setTimeout(function(){L.show().appendTo(b)},100),B.inline?(G(K).hide().insertBefore(e(n)[0]).one(h,function(){e(this).replaceWith(C.children())}),i(e(n))):B.iframe?i(" "):B.html?i(B.html):et(n)?(e(z=new Image).addClass(s+"Photo").error(function(){B.title=!1,i(G(K,"Error").html(B.imgError))}).load(function(){var e;z.onload=null,B.scalePhotos&&(r=function(){z.height-=z.height*e,z.width-=z.width*e},B.mw&&z.width>B.mw&&(e=(z.width-B.mw)/z.width,r()),B.mh&&z.height>B.mh&&(e=(z.height-B.mh)/z.height,r())),B.h&&(z.style.marginTop=Math.max(B.h-z.height,0)/2+"px"),T[1]&&(B.loop||T[U+1])&&(z.style.cursor="pointer",z.onclick=function(){J.next()}),p&&(z.style.msInterpolationMode="bicubic"),setTimeout(function(){i(z)},1)}),setTimeout(function(){z.src=n},1)):n&&k.load(n,B.data,function(t,n,r){i(n==="error"?G(K,"Error").html(B.xhrError):e(this).contents())})},J.next=function(){!X&&T[1]&&(B.loop||T[U+1])&&(U=Y(1),J.load())},J.prev=function(){!X&&T[1]&&(B.loop||U)&&(U=Y(-1),J.load())},J.close=function(){W&&!V&&(V=!0,W=!1,it(l,B.onCleanup),N.unbind("."+s+" ."+v),m.fadeTo(200,0),g.stop().fadeTo(300,0,function(){g.add(m).css({opacity:1,cursor:"auto"}).hide(),it(h),C.remove(),setTimeout(function(){V=!1,it(c,B.onClosed)},1)}))},J.remove=function(){e([]).add(g).add(m).remove(),g=null,e("."+o).removeData(i).removeClass(o).die()},J.element=function(){return e(R)},J.settings=r})(jQuery,document,this);;
(function ($) {

Drupal.behaviors.initColorbox = {
  attach: function (context, settings) {
    if (!$.isFunction($.colorbox)) {
      return;
    }

    if (settings.colorbox.mobiledetect && window.matchMedia) {
      // Disable Colorbox for small screens.
      mq = window.matchMedia("(max-device-width: " + settings.colorbox.mobiledevicewidth + ")");
      if (mq.matches) {
        return;
      }
    }

    $('.colorbox', context)
      .once('init-colorbox')
      .colorbox(settings.colorbox);
  }
};

{
  $(document).bind('cbox_complete', function () {
    Drupal.attachBehaviors('#cboxLoadedContent');
  });
}

})(jQuery);
;
(function ($) {

Drupal.behaviors.initColorboxDefaultStyle = {
  attach: function (context, settings) {
    $(document).bind('cbox_complete', function () {
      // Only run if there is a title.
      if ($('#cboxTitle:empty', context).length == false) {
        $('#cboxLoadedContent img', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideDown();
        });
        $('#cboxOverlay', context).bind('mouseover', function () {
          $('#cboxTitle', context).slideUp();
        });
      }
      else {
        $('#cboxTitle', context).hide();
      }
    });
  }
};

})(jQuery);
;
var ManualCrop = {croptool: null, oldSelection: null, widget: null, output: null};

(function ($) {

/**
 * Mark required image styles and trigger the onchange event of all (hidden) fields that store
 * crop data. This way all css classes for the crop lists/buttons will be updated and the default
 * image preview will be changed to the cropped image.
 */
ManualCrop.init = function() {
  var fields = Drupal.settings.manualCrop.fields;

  for (var identifier in fields) {
    for (var k in fields[identifier].required) {
      $('.manualcrop-identifier-' + identifier + ' option[value="' + fields[identifier].required[k] + '"]')
        .addClass('manualcrop-style-required');
    }
  }

  $('.manualcrop-cropdata').trigger('change');
}

/**
 * Callback triggerd after an image upload.
 *
 * @param context
 *    Container of the uploaded image widget.
 */
ManualCrop.afterUpload = function(context) {
  ManualCrop.init();

  var fields = Drupal.settings.manualCrop.fields;

  for (var identifier in fields) {
    if (fields[identifier].instantCrop) {
      if ($('.manualcrop-cropdata', context).length == 1) {
        $('.manualcrop-style-button, .manualcrop-style-thumb', context).trigger('mousedown');
      }
    }
  }
}

/**
 * Open the cropping tool for an image.
 *
 * @param identifier
 *    Unique crop settings identifier.
 * @param style
 *   The image style name or selection list triggering this event.
 * @param fid
 *   The file id of the image the user is about to crop.
 */
ManualCrop.showCroptool = function(identifier, style, fid) {
  var styleName, styleSelect, cropType, origContainer, conWidth, conHeight;

  if (ManualCrop.croptool) {
    // Close the current croptool.
    ManualCrop.closeCroptool();
  }

  // Get the style name.
  if (typeof style == 'string') {
    styleName = style
  }
  else {
    styleSelect = $(style);
    styleName = styleSelect.val();
  }

  $('.manualcrop-file-' + fid + '-holder img').imagesLoaded(function() {
    // IE executes this callback twice, so we check if the ManualCrop.croptool
    // has already been set and skip the rest if this is the case.
    if (!ManualCrop.croptool) {
      // Determine the croptool type.
      if ($('#manualcrop-overlay-' + fid).length == 1) {
        cropType = 'overlay';
        origContainer = $('#manualcrop-overlay-' + fid);
      }
      else {
        cropType = 'inline';
        origContainer = $('#manualcrop-inline-' + fid);
      }

      // Get the crop settings.
      var settings = Drupal.settings.manualCrop.styles[styleName] || {};

      // Get the destination field and the current selection.
      ManualCrop.output = $('#manualcrop-area-' + fid + '-' + styleName);
      ManualCrop.oldSelection = ManualCrop.parseStringSelection(ManualCrop.output.val());

      // Create the croptool.
      ManualCrop.croptool = origContainer.clone()
        .removeAttr('id')
        .removeClass('element-hidden');

      // Get the container maximum width and height.
      if (cropType == 'overlay') {
        conWidth = $(window).width();
        conHeight = $(window).height();
      }
      else {
        conWidth = origContainer.parent().innerWidth();
        conHeight = $(window).height();
      }

      // Tool width and height.
      ManualCrop.croptool.css('width', conWidth + 'px');

      if (cropType == 'overlay') {
        ManualCrop.croptool.css('height', conHeight + 'px');
      }

      // Get the image and its dimensions.
      var image = $('.manualcrop-image', origContainer);
      var width = ManualCrop.parseInt(image.width()) || ManualCrop.parseInt(image.attr('width'));
      var height = ManualCrop.parseInt(image.height()) || ManualCrop.parseInt(image.attr('height'));

      // Scale the image to fit the maximum width and height (so all is visible).
      var maxWidth = conWidth - ManualCrop.parseInt(image.css('marginLeft')) - ManualCrop.parseInt(image.css('marginRight'));
      var maxHeight = conHeight - ManualCrop.parseInt(image.css('marginTop')) - ManualCrop.parseInt(image.css('marginBottom'));

      // Calculate the clone image dimensions.
      var resized = ManualCrop.resizeDimensions(width, height, maxWidth, maxHeight);

      // Set the new width and height to the cloned image.
      image = $('.manualcrop-image', ManualCrop.croptool)
        .css('width', resized.width + 'px')
        .css('height', resized.height + 'px');

      // Basic imgAreaSelect options; All options are set - also if it's their
      // default value - because IE doesn't seem to use the default values.
      var options = {
        handles: true,
        instance: true,
        keys: true,
        movable: true,
        resizable: true,
        parent: image.parent(),
        imageWidth: width,
        imageHeight: height,
        onSelectChange: ManualCrop.updateSelection
      };

      // Additional options based upon the effect.
      if (settings) {
        switch (settings.effect) {
          // Crop and scale effect.
          case 'manualcrop_crop_and_scale':
            options.aspectRatio = settings.data.width + ':' + settings.data.height;

            if (settings.data.respectminimum) {
              // Crop at least the minimum.
              options.minWidth = ManualCrop.parseInt(settings.data.width);
              options.minHeight = ManualCrop.parseInt(settings.data.height);
            }
            break;

          // Crop effect.
          case 'manualcrop_crop':
            if (settings.data.width) {
              options.minWidth = ManualCrop.parseInt(settings.data.width);
            }

            if (settings.data.height) {
              options.minHeight = ManualCrop.parseInt(settings.data.height);
            }

            if (typeof settings.data.keepproportions != 'undefined' && settings.data.keepproportions) {
              options.aspectRatio = settings.data.width + ':' + settings.data.height;
            }
        }
      }

      // Set the image style name.
      $('.manualcrop-image-style', ManualCrop.croptool).text(styleName);

      if (typeof styleSelect != 'undefined') {
        // Reset the image style selection list.
        styleSelect.val('');
        styleSelect.blur();
      }
      else {
        // Hide the crop button.
        $('.manualcrop-style-button-' + fid).hide();
      }

      // Append the cropping area (last, to prevent that '_11' is undefined).
      if (cropType == 'overlay') {
        $('body').append(ManualCrop.croptool);
      }
      else {
        origContainer.parent().append(ManualCrop.croptool);
      }

      // Create the crop widget.
      ManualCrop.widget = image.imgAreaSelect(options);

      // IE seems to have some issues with the imgAreaSelect $parent variable,
      // so we set the options again to initialize it correctly.
      if ($.browser.msie) {
        ManualCrop.widget.setOptions(options);
      }

      // Insert the instant preview image.
      var instantPreview = $('.manualcrop-instantpreview', ManualCrop.croptool);
      if (instantPreview.length) {
        // Save the current width as maximum width and height.
        instantPreview
          .data('maxWidth', instantPreview.width())
          .data('maxHeight', instantPreview.width())
          .height(instantPreview.width());

        // Calculate the instant preview dimensions.
        resized = ManualCrop.resizeDimensions(width, height, instantPreview.width(), instantPreview.width());

        // Set those dimensions.
        image.clone().appendTo(instantPreview)
          .removeClass()
          .css('width', resized.width + 'px')
          .css('height', resized.height + 'px');
      }

      if (!ManualCrop.oldSelection) {
        var fields = Drupal.settings.manualCrop.fields;

        // Create a default crop area.
        if (typeof fields[identifier] == 'object' && fields[identifier].defaultCropArea) {
          var minWidth = (typeof options.minWidth != 'undefined' ? options.minWidth : 0);
          var minHeight = (typeof options.minHeight != 'undefined' ? options.minHeight : 0)

          // Set a width and height.
          ManualCrop.oldSelection = {
            width: (minWidth ? minWidth * 100 : (width / 2)),
            height: (minHeight ? minHeight * 100 : (height / 2)),
            maxWidth: (width / 2),
            maxHeight: (height / 2)
          };

          // Resize the selection.
          ManualCrop.oldSelection = ManualCrop.resizeDimensions(ManualCrop.oldSelection);

          // Make sure we respect the minimum dimensions.
          if (minWidth || minHeight) {
            if (minWidth && ManualCrop.oldSelection.width < minWidth) {
              ManualCrop.oldSelection.width = minWidth;

              if (minHeight) {
                ManualCrop.oldSelection.height = minHeight;
              }
            }
            else if (minHeight && ManualCrop.oldSelection.height < minHeight) {
              ManualCrop.oldSelection.height = minHeight;

              if (minWidth) {
                ManualCrop.oldSelection.width = minWidth;
              }
            }
          }

          // Center the selection.
          ManualCrop.oldSelection.x1 = (width - ManualCrop.oldSelection.width) / 2;
          ManualCrop.oldSelection.y1 = (height - ManualCrop.oldSelection.height) / 2;
          ManualCrop.oldSelection.x2 = ManualCrop.oldSelection.x1 + ManualCrop.oldSelection.width;
          ManualCrop.oldSelection.y2 = ManualCrop.oldSelection.y1 + ManualCrop.oldSelection.height;
        }
      }

      // Set the initial selection.
      if (ManualCrop.oldSelection) {
        ManualCrop.croptool.imagesLoaded(ManualCrop.resetSelection);
      }

      // Handle keyboard shortcuts.
      $(document).keyup(ManualCrop.handleKeyboard);
    }
  });
}

/**
 * Close the cropping tool.
 *
 * @param reset
 *   Set to true to reset the selection before closing.
 */
ManualCrop.closeCroptool = function(reset) {
  if (ManualCrop.croptool) {
    if (reset) {
      ManualCrop.resetSelection();
    }

    ManualCrop.output.trigger('change');

    ManualCrop.widget.setOptions({remove: true});
    ManualCrop.croptool.remove();
    ManualCrop.croptool = null;
    ManualCrop.oldSelection = null;
    ManualCrop.widget = null;
    ManualCrop.output = null;

    $('.manualcrop-style-button').show();

    $(document).unbind('keyup', ManualCrop.handleKeyboard);
  }
}

/**
 * Reset the selection to the previous state.
 */
ManualCrop.resetSelection = function() {
  if (ManualCrop.croptool) {
    if (ManualCrop.oldSelection) {
      ManualCrop.widget.setSelection(ManualCrop.oldSelection.x1, ManualCrop.oldSelection.y1, ManualCrop.oldSelection.x2, ManualCrop.oldSelection.y2);
      ManualCrop.widget.setOptions({hide: false, show: true});
      ManualCrop.widget.update();
      ManualCrop.updateSelection(null, ManualCrop.oldSelection);

      // Hide reset button.
      $('.manualcrop-reset', ManualCrop.croptool).hide();
    }
    else {
      ManualCrop.clearSelection();
    }
  }
}

/**
 * Maximize the selection to fill the container as much as possible/allowed.
 */
ManualCrop.maximizeSelection = function() {
  if (ManualCrop.croptool) {
    var image = $('img.manualcrop-image', ManualCrop.croptool);

    // Get the original width and height.
    var origWidth = ManualCrop.parseInt(image.get(0).getAttribute('width'));
    var origHeight = ManualCrop.parseInt(image.get(0).getAttribute('height'))
    var options = ManualCrop.widget.getOptions();

    // Check if the ratio should be respected.
    if (typeof options.aspectRatio != 'undefined' && options.aspectRatio != '') {
      // Get the ratio.
      var ratio = options.aspectRatio.match(/([0-9]+):([0-9]+)/);
      var ratioWidth = ManualCrop.parseInt(ratio[1]);
      var ratioHeight = ManualCrop.parseInt(ratio[2]);

      // Crop area defaults.
      var width = origWidth;
      var height = origHeight;
      var x = 0;
      var y = 0;

      if ((ratioWidth / ratioHeight) > (origWidth / origHeight)) {
        // Crop from top and bottom.
        height = Math.floor((width / ratioWidth) * ratioHeight);
        y = Math.floor((origHeight - height) / 2);
      }
      else {
        // Crop from sides.
        width = Math.floor((origHeight / ratioHeight) * ratioWidth);
        x = Math.floor((origWidth - width) / 2);
      }

      // Set the new selection.
      ManualCrop.widget.setSelection(x, y, (x + width), (y + height));
    }
    else {
      // No ratio requirements, just select the whole image.
      ManualCrop.widget.setSelection(0, 0, origWidth, origHeight);
    }

    // Update the widget and stored selection.
    ManualCrop.widget.setOptions({hide: false, show: true});
    ManualCrop.widget.update();
    ManualCrop.updateSelection(null, ManualCrop.widget.getSelection());
  }
}

/**
 * Remove the selection.
 */
ManualCrop.clearSelection = function() {
  if (ManualCrop.croptool) {
    ManualCrop.widget.setOptions({hide: true, show: false});
    ManualCrop.widget.update();
    ManualCrop.updateSelection();

    // Hide clear button.
    $('.manualcrop-clear', ManualCrop.croptool).hide();
  }
}

/**
 * When a selection updates write the position and dimensions to the output field.
 *
 * @param image
 *   Reference to the image that is being cropped.
 * @param selection
 *   Object defining the current selection.
 */
ManualCrop.updateSelection = function(image, selection) {
  if (ManualCrop.croptool) {
    var resized;

    // Update the image reference.
    image = $('img.manualcrop-image', ManualCrop.croptool);

    // Get the original width and height.
    var origWidth = ManualCrop.parseInt(image.get(0).getAttribute('width'));
    var origHeight = ManualCrop.parseInt(image.get(0).getAttribute('height'))

    // Get the instant preview.
    var instantPreview = $('.manualcrop-instantpreview', ManualCrop.croptool);

    if (selection && selection.width && selection.height && selection.x1 >= 0 && selection.y1 >= 0) {
      ManualCrop.output.val(selection.x1 + '|' + selection.y1 + '|' + selection.width + '|' + selection.height);

      // Update the selection details.
      $('.manualcrop-selection-x', ManualCrop.croptool).text(selection.x1);
      $('.manualcrop-selection-y', ManualCrop.croptool).text(selection.y1);
      $('.manualcrop-selection-width', ManualCrop.croptool).text(selection.width);
      $('.manualcrop-selection-height', ManualCrop.croptool).text(selection.height);

      // Update the instant preview.
      if (instantPreview.length) {
        // Calculate the instant preview dimensions.
        resized = ManualCrop.resizeDimensions(selection.width, selection.height, instantPreview.data('maxWidth'), instantPreview.data('maxHeight'));

        // Set the new width and height to the preview container.
        instantPreview.css({
          width: resized.width + 'px',
          height: resized.height + 'px'
        });

        // Calculate the resize scale.
        var scaleX = resized.width / selection.width;
        var scaleY = resized.height / selection.height;

        // Update the image css.
        $('img', instantPreview).css({
          width: Math.round(scaleX * origWidth) + 'px',
          height: Math.round(scaleY * origHeight) + 'px',
          marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
          marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
        });
      }
    }
    else {
      ManualCrop.output.val('');

      $('.manualcrop-selection-x', ManualCrop.croptool).text('-');
      $('.manualcrop-selection-y', ManualCrop.croptool).text('-');
      $('.manualcrop-selection-width', ManualCrop.croptool).text('-');
      $('.manualcrop-selection-height', ManualCrop.croptool).text('-');

      // Reset the instant preview.
      if (instantPreview.length) {
        instantPreview
          .width(instantPreview.data('maxWidth'))
          .height(instantPreview.data('maxHeight'));

        resized = ManualCrop.resizeDimensions(origWidth, origHeight, instantPreview.width(), instantPreview.height());

        $('img', instantPreview).css({
          width: resized.width + 'px',
          height: resized.height + 'px',
          marginLeft: '0px',
          marginTop: '0px'
        });
      }
    }

    if (ManualCrop.oldSelection) {
      // Show reset button.
      $('.manualcrop-reset', ManualCrop.croptool).show();
    }

    // Hide clear button.
    $('.manualcrop-clear', ManualCrop.croptool).show();
  }
}

/**
 * A new cropping area was saved to the hidden field, update the default image
 * preview and find the corresponding select option or button and append a css
 * class and text to indicate the crop status.
 *
 * This is a seperate function so it can be triggered after loading.
 *
 * @param element
 *   The hidden field that stores the selection.
 * @param fid
 *   The file id.
 * @param styleName
 *   The image style name.
 */
ManualCrop.selectionStored = function(element, fid, styleName) {
  var selection = $(element).val();

  $('.manualcrop-file-' + fid + '-holder img').imagesLoaded(function() {
    var previewHolder = $('.manualcrop-preview-' + fid + '-' + styleName + ' .manualcrop-preview-cropped');
    if (!previewHolder.length) {
      previewHolder = $('.manualcrop-preview-' + fid + ' .manualcrop-preview-cropped');
    }

    var defaultPreview = $('.manualcrop-preview-' + fid + '-' + styleName + ' > img');
    if (!defaultPreview.length) {
      defaultPreview = $('.manualcrop-preview-' + fid + ' > img');
    }

    var toolOpener = $('.manualcrop-style-select-' + fid + " option[value='" + styleName + "'], .manualcrop-style-button-" + fid + ', .manualcrop-style-thumb-' + fid + '-' + styleName + ' .manualcrop-style-thumb-label');
    var hasClass = toolOpener.hasClass('manualcrop-style-cropped');

    if (previewHolder.length && previewHolder.children().length) {
      previewHolder.css({
        width: '0px',
        height: '0px'
      }).html('');
      defaultPreview.css('display', 'block');
    }

    if (selection) {
      if (previewHolder.length) {
        // Get the dimensions of the original preview image and hide it again.
        var maxWidth = ManualCrop.parseInt(defaultPreview.width());
        var maxHeight = ManualCrop.parseInt(defaultPreview.height());

        if (maxWidth > 0) {
          defaultPreview.css('display', 'none');

          // Get the selected crop area.
          selection = ManualCrop.parseStringSelection(selection);

          // Calculate the preview dimensions.
          var resized = ManualCrop.resizeDimensions(selection.width, selection.height, maxWidth, maxHeight);

          // Set the new width and height to the cropped preview holder.
          previewHolder.css({
            width: resized.width + 'px',
            height: resized.height + 'px'
          });

          // Calculate the resize scale.
          var scaleX = resized.width / selection.width;
          var scaleY = resized.height / selection.height;

          // Get the original image.
          var originalImage = $('#manualcrop-overlay-' + fid + ' img.manualcrop-image, #manualcrop-inline-' + fid + ' img.manualcrop-image');

          // Calculate the new width and height using the full image.
          resized.width = Math.round(scaleX * ManualCrop.parseInt(originalImage.width()));
          resized.height = Math.round(scaleY * ManualCrop.parseInt(originalImage.height()));

          // Create and insert the cropped preview.
          previewHolder.append(originalImage.clone().removeClass().css({
            width: resized.width + 'px',
            height: resized.height + 'px',
            marginLeft: '-' + Math.round(scaleX * selection.x1) + 'px',
            marginTop: '-' + Math.round(scaleY * selection.y1) + 'px'
          }));
        }
      }

      if (!hasClass) {
        // Style has been cropped.
        toolOpener.addClass('manualcrop-style-cropped');

        if (toolOpener.is('input')) {
          toolOpener.val(toolOpener.val() + ' ' + Drupal.t('(cropped)'));
        }
        else {
          toolOpener.text(toolOpener.text() + ' ' + Drupal.t('(cropped)'));
        }
      }
    } else if (hasClass) {
      // Style not cropped.
      toolOpener.removeClass('manualcrop-style-cropped');

      if (toolOpener.is('input')) {
        toolOpener.val(toolOpener.val().substr(0, (toolOpener.val().length - Drupal.t('(cropped)').length - 1)));
      }
      else {
        toolOpener.text(toolOpener.text().substr(0, (toolOpener.text().length - Drupal.t('(cropped)').length - 1)));
      }
    }
  });
}

/**
 * Keyboard shortcuts handler.
 *
 * @param e
 *    The event object.
 */
ManualCrop.handleKeyboard = function(e) {
  if (ManualCrop.croptool) {
    if(e.keyCode == 13) {
      // Enter
      ManualCrop.closeCroptool();
    }
    else if(e.keyCode == 27) {
      // Escape
      ManualCrop.closeCroptool(true);
    }
  }
}

/**
 * Parse a string defining the selection to an object.
 *
 * @param txtSelection
 *   The selection as a string e.a.: "x|y|width|height".
 * @return
 *   An object containing defining the selection.
 */
ManualCrop.parseStringSelection = function(txtSelection) {
  if (txtSelection) {
    var parts = txtSelection.split('|');
    var selection = {
      x1: ManualCrop.parseInt(parts[0]),
      y1: ManualCrop.parseInt(parts[1]),
      width: ManualCrop.parseInt(parts[2]),
      height: ManualCrop.parseInt(parts[3])
    };

    selection.x2 = selection.x1 + selection.width;
    selection.y2 = selection.y1 + selection.height;

    return selection;
  }

  return null;
}

/**
 * Parse a textual number to an integer.
 *
 * @param integer
 *   The textual integer.
 * @return
 *   The integer.
 */
ManualCrop.parseInt = function(integer) {
  return (parseInt(integer) || 0)
}

/**
 * Calculate new dimensions based upon a maximum width and height.
 *
 * @param width
 *   The current width or an object width all the properties set.
 * @param height
 *   The current height.
 * @param maxWidth
 *   The maximum width.
 * @param maxHeight
 *   The maximum height.
 * @return
 *   An object with the new width and height as properties.
 */
ManualCrop.resizeDimensions = function(width, height, maxWidth, maxHeight) {
  if (typeof width == 'object') {
    if (typeof width.maxWidth != 'undefined' && width.maxWidth) {
      maxWidth = width.maxWidth;
    }
    else {
      maxWidth = 9999999;
    }

    if (typeof width.maxHeight != 'undefined' && width.maxHeight) {
      maxHeight = width.maxHeight;
    }
    else {
      maxHeight = 9999999;
    }

    height = width.height;
    width = width.width;
  }
  else {
    if (!maxWidth) {
      maxWidth = 9999999;
    }

    if (!maxHeight) {
      maxHeight = 9999999;
    }
  }

  // Calculate the new width and height.
  if(width > maxWidth) {
    height = Math.floor((height * maxWidth) / width);
    width = maxWidth;
  }

  if(height > maxHeight) {
    width = Math.floor((width * maxHeight) / height);
    height = maxHeight;
  }

  return {
    'width': width,
    'height': height
  };
}

$(document).ready(function() {
  ManualCrop.init();

  // Add a blur action to all buttons.
  $('.manualcrop-button').live('mousedown', function() {
    this.blur();
  });

  // Attach behaviors to execute after an ajax call.
  Drupal.behaviors.manualCrop = {
    attach: function(context, settings) {
      // After upload function on image upload.
      $('.ajax-new-content', context).once('manualcrop', function() {
        var element = $(this);

        if (!element.html().length) {
          // If the $form['#file_upload_delta'] is not set or invalid the file module
          // will add an empty <span> as .ajax-new-content element, so we need the
          // previous element to execute the after upload function.
          ManualCrop.afterUpload(element.prev().get(0));
        }
        else {
          ManualCrop.afterUpload(this);
        }
      });

      // Init function if a modal (Media module) was opened.
      $('.modal-content', context).ready(function() {
        ManualCrop.init();
      });
    }
  };
});

})(jQuery);
;
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(m($){1k W=2v.4N,D=2v.4M,F=2v.4L,u=2v.4K;m V(){C $("<4J/>")};$.N=m(T,c){1k O=$(T),2E,A=V(),1i=V(),I=V().r(V()).r(V()).r(V()),B=V().r(V()).r(V()).r(V()),E=$([]),1J,G,l,17={v:0,l:0},Q,M,1j,1f={v:0,l:0},12=0,1I="1G",2k,2j,1s,1r,S,1A,1z,2o,2n,14,1O,a,b,j,g,f={a:0,b:0,j:0,g:0,H:0,L:0},2u=R.4I,$p,d,i,o,w,h,2p;m 1m(x){C x+17.v-1f.v};m 1l(y){C y+17.l-1f.l};m 1a(x){C x-17.v+1f.v};m 19(y){C y-17.l+1f.l};m 1y(3H){C 3H.4H-1f.v};m 1x(3G){C 3G.4G-1f.l};m 13(30){1k 1h=30||1s,1g=30||1r;C{a:u(f.a*1h),b:u(f.b*1g),j:u(f.j*1h),g:u(f.g*1g),H:u(f.j*1h)-u(f.a*1h),L:u(f.g*1g)-u(f.b*1g)}};m 23(a,b,j,g,2Z){1k 1h=2Z||1s,1g=2Z||1r;f={a:u(a/1h||0),b:u(b/1g||0),j:u(j/1h||0),g:u(g/1g||0)};f.H=f.j-f.a;f.L=f.g-f.b};m 1e(){9(!O.H()){C}17={v:u(O.2t().v),l:u(O.2t().l)};Q=O.2X();M=O.3F();17.l+=(O.2Y()-M)>>1;17.v+=(O.2q()-Q)>>1;1A=u(c.4F/1s)||0;1z=u(c.4E/1r)||0;2o=u(F(c.4D/1s||1<<24,Q));2n=u(F(c.4C/1r||1<<24,M));9($().4B=="1.3.2"&&1I=="21"&&!2u["4A"]){17.l+=D(R.1p.2r,2u.2r);17.v+=D(R.1p.2s,2u.2s)}1f=/1G|4z/.1V(1j.q("1o"))?{v:u(1j.2t().v)-1j.2s(),l:u(1j.2t().l)-1j.2r()}:1I=="21"?{v:$(R).2s(),l:$(R).2r()}:{v:0,l:0};G=1m(0);l=1l(0);9(f.j>Q||f.g>M){1S()}};m 1T(3D){9(!1O){C}A.q({v:1m(f.a),l:1l(f.b)}).r(1i).H(w=f.H).L(h=f.L);1i.r(I).r(E).q({v:0,l:0});I.H(D(w-I.2q()+I.2X(),0)).L(D(h-I.2Y()+I.3F(),0));$(B[0]).q({v:G,l:l,H:f.a,L:M});$(B[1]).q({v:G+f.a,l:l,H:w,L:f.b});$(B[2]).q({v:G+f.j,l:l,H:Q-f.j,L:M});$(B[3]).q({v:G+f.a,l:l+f.g,H:w,L:M-f.g});w-=E.2q();h-=E.2Y();2N(E.3b){15 8:$(E[4]).q({v:w>>1});$(E[5]).q({v:w,l:h>>1});$(E[6]).q({v:w>>1,l:h});$(E[7]).q({l:h>>1});15 4:E.3E(1,3).q({v:w});E.3E(2,4).q({l:h})}9(3D!==Y){9($.N.1Z!=2Q){$(R).U($.N.1Z,$.N.3C)}9(c.1R){$(R)[$.N.1Z]($.N.3C=2Q)}}9($.1b.1E&&I.2q()-I.2X()==2){I.q("3B",0);3u(m(){I.q("3B","4y")},0)}};m 22(3A){1e();1T(3A);a=1m(f.a);b=1l(f.b);j=1m(f.j);g=1l(f.g)};m 27(2W,2w){c.1N?2W.4x(c.1N,2w):2W.1q()};m 1c(2V){1k x=1a(1y(2V))-f.a,y=19(1x(2V))-f.b;9(!2p){1e();2p=11;A.1F("4w",m(){2p=Y})}S="";9(c.2C){9(y<=c.1U){S="n"}X{9(y>=f.L-c.1U){S="s"}}9(x<=c.1U){S+="w"}X{9(x>=f.H-c.1U){S+="e"}}}A.q("2U",S?S+"-18":c.26?"4v":"");9(1J){1J.4u()}};m 2R(4t){$("1p").q("2U","");9(c.4s||f.H*f.L==0){27(A.r(B),m(){$(J).1q()})}$(R).U("P",2l);A.P(1c);c.2f(T,13())};m 2B(1W){9(1W.3w!=1){C Y}1e();9(S){$("1p").q("2U",S+"-18");a=1m(f[/w/.1V(S)?"j":"a"]);b=1l(f[/n/.1V(S)?"g":"b"]);$(R).P(2l).1F("1w",2R);A.U("P",1c)}X{9(c.26){2k=G+f.a-1y(1W);2j=l+f.b-1x(1W);A.U("P",1c);$(R).P(2S).1F("1w",m(){c.2f(T,13());$(R).U("P",2S);A.P(1c)})}X{O.1M(1W)}}C Y};m 1v(3z){9(14){9(3z){j=D(G,F(G+Q,a+W(g-b)*14*(j>a||-1)));g=u(D(l,F(l+M,b+W(j-a)/14*(g>b||-1))));j=u(j)}X{g=D(l,F(l+M,b+W(j-a)/14*(g>b||-1)));j=u(D(G,F(G+Q,a+W(g-b)*14*(j>a||-1))));g=u(g)}}};m 1S(){a=F(a,G+Q);b=F(b,l+M);9(W(j-a)<1A){j=a-1A*(j<a||-1);9(j<G){a=G+1A}X{9(j>G+Q){a=G+Q-1A}}}9(W(g-b)<1z){g=b-1z*(g<b||-1);9(g<l){b=l+1z}X{9(g>l+M){b=l+M-1z}}}j=D(G,F(j,G+Q));g=D(l,F(g,l+M));1v(W(j-a)<W(g-b)*14);9(W(j-a)>2o){j=a-2o*(j<a||-1);1v()}9(W(g-b)>2n){g=b-2n*(g<b||-1);1v(11)}f={a:1a(F(a,j)),j:1a(D(a,j)),b:19(F(b,g)),g:19(D(b,g)),H:W(j-a),L:W(g-b)};1T();c.2g(T,13())};m 2l(2T){j=/w|e|^$/.1V(S)||14?1y(2T):1m(f.j);g=/n|s|^$/.1V(S)||14?1x(2T):1l(f.g);1S();C Y};m 1u(3y,3x){j=(a=3y)+f.H;g=(b=3x)+f.L;$.2c(f,{a:1a(a),b:19(b),j:1a(j),g:19(g)});1T();c.2g(T,13())};m 2S(2m){a=D(G,F(2k+1y(2m),G+Q-f.H));b=D(l,F(2j+1x(2m),l+M-f.L));1u(a,b);2m.4r();C Y};m 2h(){$(R).U("P",2h);1e();j=a;g=b;1S();S="";9(!B.2y(":4q")){A.r(B).1q().2D(c.1N||0)}1O=11;$(R).U("1w",1L).P(2l).1F("1w",2R);A.U("P",1c);c.3v(T,13())};m 1L(){$(R).U("P",2h).U("1w",1L);27(A.r(B));23(1a(a),19(b),1a(a),19(b));9(!J 4p $.N){c.2g(T,13());c.2f(T,13())}};m 2z(2i){9(2i.3w!=1||B.2y(":4o")){C Y}1e();2k=a=1y(2i);2j=b=1x(2i);$(R).P(2h).1w(1L);C Y};m 2A(){22(Y)};m 2x(){2E=11;25(c=$.2c({1Q:"4n",26:11,20:"1p",2C:11,1U:10,3t:m(){},3v:m(){},2g:m(){},2f:m(){}},c));A.r(B).q({36:""});9(c.2F){1O=11;1e();1T();A.r(B).1q().2D(c.1N||0)}3u(m(){c.3t(T,13())},0)};1k 2Q=m(16){1k k=c.1R,d,t,2M=16.4m;d=!1K(k.2O)&&(16.2e||16.3q.2e)?k.2O:!1K(k.2a)&&16.3r?k.2a:!1K(k.2b)&&16.3s?k.2b:!1K(k.2P)?k.2P:10;9(k.2P=="18"||(k.2b=="18"&&16.3s)||(k.2a=="18"&&16.3r)||(k.2O=="18"&&(16.2e||16.3q.2e))){2N(2M){15 37:d=-d;15 39:t=D(a,j);a=F(a,j);j=D(t+d,a);1v();1t;15 38:d=-d;15 40:t=D(b,g);b=F(b,g);g=D(t+d,b);1v(11);1t;3p:C}1S()}X{a=F(a,j);b=F(b,g);2N(2M){15 37:1u(D(a-d,G),b);1t;15 38:1u(a,D(b-d,l));1t;15 39:1u(a+F(d,Q-1a(j)),b);1t;15 40:1u(a,b+F(d,M-19(g)));1t;3p:C}}C Y};m 1P(3o,2L){3m(2d 4l 2L){9(c[2d]!==1X){3o.q(2L[2d],c[2d])}}};m 25(K){9(K.20){(1j=$(K.20)).3g(A.r(B))}$.2c(c,K);1e();9(K.2K!=3n){E.1n();E=$([]);i=K.2K?K.2K=="4k"?4:8:0;3c(i--){E=E.r(V())}E.29(c.1Q+"-4j").q({1o:"1G",34:0,1H:12+1||1});9(!4i(E.q("H"))>=0){E.H(5).L(5)}9(o=c.2J){E.q({2J:o,2G:"3j"})}1P(E,{3k:"2I-28",3i:"2H-28",3l:"1d"})}1s=c.4h/Q||1;1r=c.4g/M||1;9(K.a!=3n){23(K.a,K.b,K.j,K.g);K.2F=!K.1q}9(K.1R){c.1R=$.2c({2b:1,2a:"18"},K.1R)}B.29(c.1Q+"-4f");1i.29(c.1Q+"-4e");3m(i=0;i++<4;){$(I[i-1]).29(c.1Q+"-2I"+i)}1P(1i,{4d:"2H-28",4c:"1d"});1P(I,{3l:"1d",2J:"2I-H"});1P(B,{4b:"2H-28",4a:"1d"});9(o=c.3k){$(I[0]).q({2G:"3j",3h:o})}9(o=c.3i){$(I[1]).q({2G:"49",3h:o})}A.3g(1i.r(I).r(1J).r(E));9($.1b.1E){9(o=B.q("3f").3e(/1d=(\\d+)/)){B.q("1d",o[1]/1Y)}9(o=I.q("3f").3e(/1d=(\\d+)/)){I.q("1d",o[1]/1Y)}}9(K.1q){27(A.r(B))}X{9(K.2F&&2E){1O=11;A.r(B).2D(c.1N||0);22()}}14=(d=(c.48||"").47(/:/))[0]/d[1];O.r(B).U("1M",2z);9(c.1D||c.1C===Y){A.U("P",1c).U("1M",2B);$(3d).U("18",2A)}X{9(c.1C||c.1D===Y){9(c.2C||c.26){A.P(1c).1M(2B)}$(3d).18(2A)}9(!c.46){O.r(B).1M(2z)}}c.1C=c.1D=1X};J.1n=m(){25({1D:11});A.r(B).1n()};J.45=m(){C c};J.31=25;J.44=13;J.43=23;J.42=1L;J.41=22;$p=O;3c($p.3b){12=D(12,!1K($p.q("z-3a"))?$p.q("z-3a"):12);9($p.q("1o")=="21"){1I="21"}$p=$p.20(":3Z(1p)")}12=c.1H||12;9($.1b.1E){O.3Y("3X","3W")}$.N.1Z=$.1b.1E||$.1b.3V?"3U":"3T";9($.1b.3S){1J=V().q({H:"1Y%",L:"1Y%",1o:"1G",1H:12+2||2})}A.r(B).q({36:"35",1o:1I,3R:"35",1H:12||"0"});A.q({1H:12+2||2});1i.r(I).q({1o:"1G",34:0});T.33||T.3Q=="33"||!O.2y("3P")?2x():O.1F("3O",2x);9($.1b.1E&&$.1b.3N>=7){T.32=T.32}};$.2w.N=m(Z){Z=Z||{};J.3M(m(){9($(J).1B("N")){9(Z.1n){$(J).1B("N").1n();$(J).3L("N")}X{$(J).1B("N").31(Z)}}X{9(!Z.1n){9(Z.1C===1X&&Z.1D===1X){Z.1C=11}$(J).1B("N",3K $.N(J,Z))}}});9(Z.3J){C $(J).1B("N")}C J}})(3I);',62,298,'|||||||||if|x1|y1|_7|||_23|y2|||x2||top|function||||css|add|||_4|left|||||_a|_d|return|_2|_e|_3|_10|width|_c|this|_53|height|_13|imgAreaSelect|_8|mousemove|_12|document|_1c|_6|unbind|_5|_1|else|false|_54||true|_16|_2c|_21|case|_4f|_11|resize|_29|_28|browser|_39|opacity|_30|_15|sy|sx|_b|_14|var|_27|_26|remove|position|body|hide|_1b|_1a|break|_44|_41|mouseup|evY|evX|_1e|_1d|data|enable|disable|msie|one|absolute|zIndex|_17|_f|isNaN|_49|mousedown|fadeSpeed|_22|_50|classPrefix|keys|_31|_32|resizeMargin|test|_3f|undefined|100|keyPress|parent|fixed|_35|_2e||_4e|movable|_37|color|addClass|ctrl|shift|extend|option|altKey|onSelectEnd|onSelectChange|_48|_4b|_19|_18|_3d|_47|_20|_1f|_25|outerWidth|scrollTop|scrollLeft|offset|_24|Math|fn|_4d|is|_4a|_4c|_3e|resizable|fadeIn|_9|show|borderStyle|background|border|borderWidth|handles|_52|key|switch|alt|arrows|_34|_3b|_40|_43|cursor|_3a|_38|innerWidth|outerHeight|_2f|_2d|setOptions|src|complete|fontSize|hidden|visibility||||index|length|while|window|match|filter|append|borderColor|borderColor2|solid|borderColor1|borderOpacity|for|null|_51|default|originalEvent|ctrlKey|shiftKey|onInit|setTimeout|onSelectStart|which|_46|_45|_42|_36|margin|onKeyPress|_33|slice|innerHeight|_2b|_2a|jQuery|instance|new|removeData|each|version|load|img|readyState|overflow|opera|keypress|keydown|safari|on|unselectable|attr|not||update|cancelSelection|setSelection|getSelection|getOptions|persistent|split|aspectRatio|dashed|outerOpacity|outerColor|selectionOpacity|selectionColor|selection|outer|imageHeight|imageWidth|parseInt|handle|corners|in|keyCode|imgareaselect|animated|instanceof|visible|preventDefault|autoHide|_3c|toggle|move|mouseout|fadeOut|auto|relative|getBoundingClientRect|jquery|maxHeight|maxWidth|minHeight|minWidth|pageY|pageX|documentElement|div|round|min|max|abs'.split('|')))
;
(function(c,n){var k="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";c.fn.imagesLoaded=function(l){function m(){var b=c(h),a=c(g);d&&(g.length?d.reject(e,b,a):d.resolve(e));c.isFunction(l)&&l.call(f,e,b,a)}function i(b,a){b.src===k||-1!==c.inArray(b,j)||(j.push(b),a?g.push(b):h.push(b),c.data(b,"imagesLoaded",{isBroken:a,src:b.src}),o&&d.notifyWith(c(b),[a,e,c(h),c(g)]),e.length===j.length&&(setTimeout(m),e.unbind(".imagesLoaded")))}var f=this,d=c.isFunction(c.Deferred)?c.Deferred():
0,o=c.isFunction(d.notify),e=f.find("img").add(f.filter("img")),j=[],h=[],g=[];e.length?e.bind("load.imagesLoaded error.imagesLoaded",function(b){i(b.target,"error"===b.type)}).each(function(b,a){var e=a.src,d=c.data(a,"imagesLoaded");if(d&&d.src===e)i(a,d.isBroken);else if(a.complete&&a.naturalWidth!==n)i(a,0===a.naturalWidth||0===a.naturalHeight);else if(a.readyState||a.complete)a.src=k,a.src=e}):m();return d?d.promise(f):f}})(jQuery);
;
