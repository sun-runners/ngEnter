/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

(function(){
  cssist.convert = {
    eventCode2event : function(event_code){
      if(!(event_code && event_code.toLowerCase().match(/^ct|cy|p|kp|ku|h|f|a|me|mo|mm|md|mu|ml|mo|c|dc|w$/))) return;
      var events = { // CSS Pseudo-classes
        'a':'active',
        'c':'checked',
        'd':'disabled',
        'ey':'empty',
        'e':'enabled',
        'f':'focus',
        'h':'hover',
        'ir':'in-range',
        'i':'invalid',
        'l':'link',
        'oot':'only-of-type',
        'oc':'only-child',
        'o':'optional',
        'oor':'out-of-range',
        'ro':'read-only',
        'rw':'read-write',
        'r':'required',
        'r':'root',
        't':'target',
        'v':'valid',
        'vd':'visited'
      };
      return events[event_code.toLowerCase()];
    },
    mediaQueryCodes2mediaQueries : function(media_query_codes){
      var self = this;
      var media_queries = {};
      if(!media_query_codes) return media_queries;
      var media_query_codes_matches = media_query_codes.match(/(^(?:XH|NH|XW|NW|X|N)[0-9]+)?((?:XH|NH|XW|NW|X|N)[0-9]+)?$/);
      for(i=1; i<=media_query_codes_matches.length-1; i++){
        var media_query = self.mediaQueryCode2mediaQuery(media_query_codes_matches[i]);
        if(media_query) media_queries[media_query.key] = media_query.value;
      }
      return media_queries;
    },
    mediaQueryCode2mediaQuery : function(media_query_code){
      if(!media_query_code) return null;
      var media_query = {};
      if(media_query_code.match(/^XW[0-9]+/)||media_query_code.match(/^X[0-9]+/)) media_query.key = 'max_width';
      else if(media_query_code.match(/^NW[0-9]+/)||media_query_code.match(/^N[0-9]+/)) media_query.key = 'min_width';
      else if(media_query_code.match(/^XH[0-9]+/)) media_query.key = 'max_height';
      else if(media_query_code.match(/^NH[0-9]+/)) media_query.key = 'min_height';
      else return null;
      media_query.value = media_query_code.match(/[0-9]+$/)[0]+'px';
      return media_query;
    },
    css2css_text : function(css){
  		if(!(css.property&&css.value)) return;
      var css_text='';
      if(Array.isArray(css.value)){
        for(var i=0; i<css.value.length; i++){
          if(css.value[i].property&&css.value[i].value){
            css_text += (css.value[i].property.name?css.value[i].property.name:css.value[i].property)+': '+css.value[i].value+'; ';
          }
          else{
            css_text += (css.property.name?css.property.name:css.property)+': '+css.value[i]+'; '
          }
        }
        return css_text;
      }
      else{
        var broswers = ['webkit', 'moz', 'o', 'ms'];
        if(css.property) css_text = (css.property.name?css.property.name:css.property)+': '+css.value+'; ';
        else css_text = (css.property.name?css.property.name:css.property)+': '+css.value+'; ';
        for(var i=0; i<broswers.length; i++){
          css_text += '-'+broswers[i]+'-'+(css.property.name?css.property.name:css.property)+': '+css.value+'; '
        }
        return css_text;
      }
  	},
    css2css_class : function(css){
  		if(!(css.class)) return;
      var class_event = css.class+(css.event?':'+css.event:'');
      var result = class_event;
      if(!angular.isString(css.property)){
        if(css.property&&css.property.afters&&css.property.afters.length>=1){
          result = '';
          for(var i=0; i<css.property.afters.length; i++){
            if(i>0) result += ','
            result += class_event+css.property.afters[i];
          }
        }
      }
      return result;
  	}
    // ,
    // css2css_cors : function(css, css_content){
    //   // if(!css.property.cors) return '.'+css.class+(css.event?':'+css.event:'')+css_content;
    //   // var css_cors = '';
    //   // if(css.property&&css.property.cors&&css.property.cors.type&&css.property.cors.type == 'class'){
    //   //   for(var i=0; i<css.property.cors.list.length; i++){
    //   //     css_cors+='.'+css.class+(css.event?':'+css.event:'')+css.property.cors.list[i]+css_content;
    //   //     if(i!=css.property.cors.list.length-1){ css_cors+='\n\n'; }
    //   //   }
    //   // }
    //   // return css_cors;
  	// },
    // css2css_text : function(css){
    //   var css_content = ' {'+this.property2property_cors(css.property, css.value)+'}';
    //   // var css_text = this.css2css_cors(css, css_content);
    //   return css_text;
    // }
  };
})();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(0);
(function(){
  cssist.get = {

    // Classes
    classesOfElement : function(element){
      var classNames = [];
      if(element && element.className && element.className.length>=1) classNames = element.className.split(/\s|↵/);
      return classNames;
    },
    classPiecesOfClass: function(class_name){
      if(!class_name){ return; }
      var class_pieces = class_name.match(/^([a-zA-Z\_]+)-((?:[a-zA-Z0-9]|(?:\_)|(?:\-\-))+)(?:-([a-zA-Z]{1,2}))?(?:-((?:(?:XH|NH|XW|NW|X|N)[0-9]+)+))?$/);
      var special_class_pieces = class_name.match(/^(cen)(?:-((?:[a-zA-Z0-9]|(?:\_)|(?:\-\-))+))?(?:-([a-zA-Z]{1,2}))?(?:-((?:(?:XH|NH|XW|NW|X|N)[0-9]+)+))?$/);
      if(!(class_pieces&&class_pieces[1]&&class_pieces[2])&&!(special_class_pieces&&special_class_pieces[0])){ return; }
      if(class_pieces&&class_pieces[1]&&class_pieces[2]){
        return {
          class_name: class_name,
          property: class_pieces[1],
          value: class_pieces[2],
          event: class_pieces[3]?class_pieces[3]:null,
          media_query: class_pieces[4]?class_pieces[4]:null
        };
      }
      else{
        return {
          class_name: class_name,
          property: special_class_pieces[1],
          value: special_class_pieces[2],
          event: special_class_pieces[3]?special_class_pieces[3]:null,
          media_query: special_class_pieces[4]?special_class_pieces[4]:null
        };
      }
    },

    // Css
    cssSetsOfClassPieces: function(class_pieces){
      for(var i=0; i<cssist.property_sets.length; i++){
        var property_set = cssist.property_sets[i];
        if(property_set.properties[class_pieces.property]){
          for(var j=0; j<property_set.value_sets.length; j++){
            var value_set = property_set.value_sets[j];
            var regex = new RegExp('^'+value_set.regex+'$');
            if(class_pieces.value.match(regex)){
              return {
                property_set : property_set,
                value_set : value_set
              };
            }
          }
        }
      }
    },
    cssOfCssSetsAndClassPieces: function(class_pieces, css_sets){
      var class_name = class_pieces.class_name;

      var property;
      if(css_sets.property_set&&css_sets.property_set.properties&&css_sets.property_set.properties[class_pieces.property]){
        property = css_sets.property_set.properties[class_pieces.property];
      }
      else return;

      var value;
      if(css_sets.value_set&&css_sets.value_set.getValue(class_pieces.value)){
        value = css_sets.value_set.getValue(class_pieces.value);
      }
      else return;

      var event;
      if(cssist.convert.eventCode2event(class_pieces.event)){
        event = cssist.convert.eventCode2event(class_pieces.event);
      }

      var media_queries;
      if(cssist.convert.mediaQueryCodes2mediaQueries(class_pieces.media_query)){
        media_queries = cssist.convert.mediaQueryCodes2mediaQueries(class_pieces.media_query);
      }

      if((value === undefined || value === null)) return;

      return {
        class:class_name,
        property:property,
        value:value,
        event:event,
        max_height:media_queries.max_height?media_queries.max_height:null,
        min_height:media_queries.min_height?media_queries.min_height:null,
        max_width:media_queries.max_width?media_queries.max_width:null,
        min_width:media_queries.min_width?media_queries.min_width:null
      };
    },
    cssesOfCssSetsAndClassPieces: function(class_pieces, classes){
      if(!(class_pieces&&classes&&classes.length>=1)) return;
      var class_name = class_pieces.class_name;

      var event;
      if(cssist.convert.eventCode2event(class_pieces.event)){
        event = cssist.convert.eventCode2event(class_pieces.event);
      }

      var media_queries;
      if(cssist.convert.mediaQueryCodes2mediaQueries(class_pieces.media_query)){
        media_queries = cssist.convert.mediaQueryCodes2mediaQueries(class_pieces.media_query);
      }

      css = {
        class:class_name,
        list:[],
        event:event,
        max_height:media_queries.max_height?media_queries.max_height:null,
        min_height:media_queries.min_height?media_queries.min_height:null,
        max_width:media_queries.max_width?media_queries.max_width:null,
        min_width:media_queries.min_width?media_queries.min_width:null
      };

      for(var i=0; i<classes.length; i++){
        class_pieces_ith = this.classPiecesOfClass(classes[i]);
        if(!class_pieces_ith) continue;
        css_sets_ith = this.cssSetsOfClassPieces(class_pieces_ith);
        if(!css_sets_ith) continue;
        css_ith = this.cssOfCssSetsAndClassPieces(class_pieces_ith, css_sets_ith);
        if(!css_ith) continue;
        css.list.push(css_ith);
      }
      return css;
    },
    cssOfClass : function(class_name){
      var class_pieces, css_sets, css;
      class_pieces = this.classPiecesOfClass(class_name);
      if(!class_pieces) return;
      css_sets = this.cssSetsOfClassPieces(class_pieces);
      var css;
      if(!css_sets){
        var special_class = cssist.special_classes[class_pieces.property];
        if(!special_class){ return; }
        var classes = special_class.getClasses(class_pieces.value);
        css = this.cssesOfCssSetsAndClassPieces(class_pieces, classes);
      } else {
        css = this.cssOfCssSetsAndClassPieces(class_pieces, css_sets);
      }
      if(!css) return;
      return css;
    },

    // Style
    styleElement: function(){
      var style_element;
      if(document.querySelectorAll('style#cssist')&&document.querySelectorAll('style#cssist')[0]){
        return document.querySelectorAll('style#cssist')[0];
      }
      var style = document.createElement("STYLE");

      // WebKit hack :(
      style.appendChild(document.createTextNode(''));

      style.setAttribute("type", 'text/css');
      style.setAttribute("id", "cssist");
      document.head.appendChild(style);
      return style;
    },
    styleSheet: function(){
      var style_element = this.styleElement();
      return style_element.styleSheet || style_element.sheet;
    }

  };
})();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(1);
__webpack_require__(0);
(function(){
  var timeout;
  cssist.make = {
    cssToStyleSheet : function(css){
      var style_element = cssist.get.styleElement();
      var css_class = cssist.convert.css2css_class(css);
      var css_text = '';
      if(css.list&&css.list.length>=1){
        for(var i=0; i<css.list.length; i++){
          css_text += cssist.convert.css2css_text(css.list[i]);
        }
      } else{
        css_text = cssist.convert.css2css_text(css);
      }

      var css_style = "."+css_class+" { "+css_text+" }";
      if(css.max_width||css.min_width||css.max_height||css.min_height){
        var css_mediaqueries = [];
        if(css.max_width) css_mediaqueries.push('max-width:'+css.max_width);
        if(css.min_width) css_mediaqueries.push('min-width:'+css.min_width);
        if(css.max_height) css_mediaqueries.push('max-height:'+css.max_height);
        if(css.min_height) css_mediaqueries.push('min-height:'+css.min_height);
        css_style = '@media all and ('+css_mediaqueries.join(') and (')+') {'+css_style+' }';
      }

      if(style_element.innerHTML.indexOf(css_style)==-1){
        style_element.innerHTML += css_style+'\n';
      }
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        localStorage['cssist_style'] = JSON.stringify(style_element.innerHTML);
        console.log('%c'+style_element.innerHTML, "color:#616161; font-size:9px; line-height:18px;");
        var console_text = '%c****************************************** CSSIST NOTICE *******************************************\n'
        +'                                                                                                    \n'
        +'Hi! I am Cssist. Your cssist css is updated!                                                        \n'
        +'If you want to open the webpage faster at the first time, there are two ways.                       \n'
        +'1. Paste the above "css" codes into your css file.                                                  \n'
        +'2. You can download your "cssist.css" file by typing "cssist.download();" command into this console.\n'
        +'Cssist Version: '+cssist.VERSION+'                                                                               \n'
        +'                                                                                                    \n'
        +'****************************************************************************************************\n';
        var console_style = "width:100%; color:#FFC107; background:#000000; font-size:12px; padding-top:12px; padding-bottom:12px; line-height:36px;";
        console.log(console_text, console_style);
      });
    },
    classToStyleSheet: function(class_name) {
  		var css = cssist.get.cssOfClass(class_name);
  		if(css){
        this.cssToStyleSheet(css);
        return true;
      }
      else return false;
  	}
  };
})();


/***/ },
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(1);
(function(){
  cssist.download = function(){
    var style_element = cssist.get.styleElement();
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/css;charset=utf-8,' + encodeURIComponent(style_element.innerHTML));
    element.setAttribute('download', 'cssist.css');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
})();


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(11);
(function(){
  cssist.watch = {
    change : function(){
      document.addEventListener('DOMNodeInserted', function(event){
        cssist.paint.rootElement(event.target);
      }, false);
    },
    start : function(){
      var self = this;
      var start_interval = setInterval(function(){
        if(!document.querySelector('body')) return;
        self.change();
        cssist.paint.rootElement(document.querySelector('body'));
        clearInterval(start_interval);
      }, 1000);
    }
  };
})();


/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(2);
(function(){
  cssist.init = {
    settings : function(){

      cssist.VERSION = '0.0.7';
      if( localStorage
      && localStorage['cssist_VERSION']
      && localStorage['cssist_VERSION']==cssist.VERSION
      && localStorage['cssist_style'] ){
        var style_element = cssist.get.styleElement();
        style_element.innerHTML = JSON.parse(localStorage['cssist_style']);
      }
      else{
        if(localStorage){
          localStorage['cssist_VERSION'] = cssist.VERSION;
          localStorage.removeItem('cssist_style');
        }
      }

      cssist.value_sets = {}, cssist.property_sets = {};
      cssist.value_sets.integer_3digits = {
        regex: '(?:_?[0-9]{1,3})',
        examples: ['_999', '999'],
        getValue: function(value){ return Math.floor(cssist.value_sets.integer.getValue(value))%1000; }
      };
      cssist.special_classes = {
        cen: {
          property: 'cen',
          value_set: [ 'xy', 'x', 'y' ],
          getClasses: function(value){
            var result;
            if(value=='x') result = ['l-50', 'tn-X_50'];
            else if(value=='y') result = ['t-50', 'tn-Y_50'];
            else result = ['t-50', 'l-50', 'tn-X_50Y_50'];
            return result;
          }
        },
        b: {
          property: 'b',
          value_set: [ 'img' ],
          getClasses: function(value){
            var result = ['background_size-cover', 'background_repeat-centerCenter', 'background_position-cc', 'object_fit-cover'];
            return result;
          }
        }
      }


      function initializeValueSets(){

        var getValueFromValues = function(value){ return this.values[value]; }
        var getValueFromOriginalValue = function(value){ return value; }

        // CONSTANT
        cssist.value_sets.auto = {
          regex: '(?:a|auto)',
          values: { a: 'auto', auto: 'auto' },
          examples: ['a', 'auto'],
          getValue: getValueFromValues
        };
        cssist.value_sets.all = {
          regex: '(?:a|all)',
          values: { a: 'all', all: 'all' },
          examples: ['a', 'all'],
          getValue: getValueFromValues
        };
        cssist.value_sets.initial = {
          regex: '(?:il|initial)',
          values: { il: 'initial', initial: 'initial' },
          examples: ['il', 'initial'],
          getValue: getValueFromValues
        };
        cssist.value_sets.inherit = {
          regex: '(?:it|inherit)',
          values: { it: 'inherit', inherit: 'inherit' },
          examples: ['it', 'inherit'],
          getValue: getValueFromValues
        };
        cssist.value_sets.infinite = {
          regex: '(?:i|infinite)',
          values: { i: 'infinite', infinite: 'infinite' },
          examples: ['i', 'infinite'],
          getValue: getValueFromValues
        };
        cssist.value_sets.none = {
          regex: '(?:n|none)',
          values: { n: 'none', none: 'none' },
          examples: ['n', 'none'],
          getValue: getValueFromValues
        };
        cssist.value_sets.normal = {
          regex: '(?:n|normal)',
          values: { n: 'normal', normal: 'normal' },
          examples: ['n', 'normal'],
          getValue: getValueFromValues
        };

        // KIND
        cssist.value_sets.animation_direction = {
          regex: '(?:n|r|a|ar|normal|reverse|alternate|alternate_reverse)',
          values: { n: 'normal', r: 'reverse', a: 'alternate', ar: 'alternate-reverse', normal: 'normal', reverse: 'reverse', alternate: 'alternate', alternate_reverse: 'alternate-reverse' },
          examples: ['n', 'alternate_reverse'],
          getValue: getValueFromValues
        };
        cssist.value_sets.box_sizing_kind = {
          regex: '(?:c|b|content_box|border_box)',
          values: { c: 'content-box', b: 'border-box', content_box: 'content-box', border_box: 'border-box' },
          examples: ['c', 'b'],
          getValue: getValueFromValues
        };
        cssist.value_sets.background_size_kind = {
          regex: '(?:l|r|b|left|right|both)',
          values: { l: 'left', r: 'right', b: 'both', left: 'left', right: 'right', both: 'both' },
          examples: ['l', 'both'],
          getValue: getValueFromValues
        };
        cssist.value_sets.clear_kind = {
          regex: '(?:cr|cn|cover|contain)',
          values: { cr: 'cover', cn: 'contain', cover: 'cover', contain: 'contain' },
          examples: ['cr', 'contain'],
          getValue: getValueFromValues
        };
        cssist.value_sets.display_kind = {
          regex: '(?:i|b|f|ib|inline|block|flex|inline_block|inline_flex|inline_table|list_item|run_in|table|table_caption|table_column_group|table_header_group|table_footer_group|table_row_group|table_cell|table_column|table_row)',
          values: {
            i: 'inline', b: 'block', f: 'flex', ib: 'inline-block',
            inline: 'inline', block: 'block', flex: 'flex', inline_block: 'inline-block', inline_flex: 'inline-flex',
            inline_table: 'inline-table', list_item: 'list-item', run_in: 'run-in',
            table: 'table', table_caption: 'table-caption', table_column_group: 'table-column-group', table_header_group: 'table-header-group',
            table_footer_group: 'table-footer-group', table_row_group: 'table-row-group', table_cell: 'table-cell', table_column: 'table-column', table_row: 'table-row'
          },
          examples: ['i', 'table_row'],
          getValue: getValueFromValues
        };
        cssist.value_sets.direction_kind = {
          regex: '(?:l|r|t|b|c|left|right|top|bottom|center)',
          values: { l: 'left', r: 'right', t: 'top', b: 'bottom', c: 'center', left: 'left', right: 'right', top: 'top', bottom: 'bottom', center: 'center' },
          examples: ['l', 'center'],
          getValue: getValueFromValues
        };
        cssist.value_sets.direction_2D_kind = {
          regex: '(?:lt|lc|lb|rt|rc|rb|ct|cc|cb|left_top|left_center|left_bottom|right_top|right_center|right_bottom|center_top|center_center|center_bottom)',
          values: {
            lt: 'left top', lc: 'left center', lb: 'left bottom', rt: 'right top', rc: 'right center', rb: 'right bottom', ct: 'center top', cc: 'center center', cb: 'center bottom',
            left_top: 'left top', left_center: 'left center', left_bottom: 'left bottom', right_top: 'right top', right_center: 'right center', right_bottom: 'right bottom', center_top: 'center top', center_center: 'center center', center_bottom: 'center bottom'
          },
          examples: ['lt', 'cc'],
          getValue: getValueFromValues
        };
        cssist.value_sets.float_kind = {
          regex: '(?:l|r|left|right)',
          values: { l: 'left', r: 'right', left: 'left', right: 'right' },
          examples: ['l', 'right'],
          getValue: getValueFromValues
        };
        cssist.value_sets.font_size_kind = {
          regex: '(?:m|xxs|xs|s|l|xl|xxl|sr|lr|medium|xx_small|x_small|small|large|x_large|xx_large|smaller|larger)',
          values: {
            m: 'medium', xxs: 'xx-small', xs:'x-small', s:'small', l:'large', xl:'x-large', xxl:'xx-large', sr:'smaller', lr:'larger',
            medium: 'medium', xx_small: 'xx-small', x_small:'x-small', s:'small', l:'large', x_large:'x-large', xx_large:'xx-large', smaller:'smaller', larger:'larger'
          },
          examples: ['m', 'larger'],
          getValue: getValueFromValues
        };
        cssist.value_sets.font_weight_kind = {
          regex: '(?:n|m|b|br|lr|normal|medium|bold|bolder|lighter)',
          values: {
            n: 'normal', m: 'medium', b: 'bold', br:'bolder', lr:'lighter',
            normal: 'normal', medium: 'medium', bold: 'bold', bolder:'bolder', lighter:'lighter',
          },
          examples: ['n', 'lighter'],
          getValue: getValueFromValues
        };
        cssist.value_sets.gradient_kind = {
          regex: '(?:rl|rr|l|r)',
          values: { l: 'linear-gradient', r: 'radial-gradient', rl: 'repeating-linear-gradient', rr: 'repeating-radial-gradient' },
          examples: ['l', 'rr'],
          getValue: getValueFromValues
        };
        cssist.value_sets.length_unit_kind = {
          regex: '(?:em|ex|ch|rem|vw|vh|vmax|vmin|cm|mm|in|px|pt|pc|p|n)',
          values: { em: 'em', ex: 'ex', ch: 'ch', rem: 'rem', vw:'vw' , vh: 'vh', vmax:'vmax', vmin:'vmin', cm:'cm', mm:'mm', in:'in', px:'px', pt:'pt', pc:'pc', p:'%', n:'' },
          examples: ['em', 'n'],
          getValue: getValueFromValues
        };
        cssist.value_sets.overflow_kind = {
          regex: '(?:h|o|s|v|hidden|overlay|scroll|visible)',
          values: {
            h: 'hidden', o: 'overlay', s: 'scroll', v: 'visible',
            hidden: 'hidden', overlay: 'overlay', scroll: 'scroll', visible: 'visible'
          },
          examples: ['h', 'visible'],
          getValue: getValueFromValues
        };
        cssist.value_sets.position_kind = {
          regex: '(?:s|a|f|r|static|absolute|fixed|relative)',
          values: {
            s: 'static', a: 'absolute', f: 'fixed', r: 'relative',
            static: 'static', absolute: 'absolute', fixed: 'fixed', relative: 'relative'
          },
          examples: ['s', 'relative'],
          getValue: getValueFromValues
        };
        cssist.value_sets.text_overflow_kind = {
          regex: '(?:c|e|s|clip|ellipsis|string)',
          values: {
            c: 'clip', e: 'ellipsis', s: 'string',
            clip: 'clip', ellipsis: 'ellipsis', string: 'string'
          },
          examples: ['c', 's'],
          getValue: getValueFromValues
        };
        cssist.value_sets.text_align_kind = {
          regex: '(?:l|r|c|j|left|right|center|justify)',
          values: {
            l: 'left', r: 'right', c: 'center', j: 'justify',
            left: 'left', right: 'right', center: 'center', justify: 'justify'
          },
          examples: ['l', 'j'],
          getValue: getValueFromValues
        };
        cssist.value_sets.thick_kind = {
          regex: '(?:m|tn|tk|medium|thin|thick)',
          values: { m: 'medium', tn: 'thin', tk:'thick' },
          examples: ['m', 'tk'],
          getValue: getValueFromValues
        };
        cssist.value_sets.transition_timing_function_kind = {
          regex: '(?:l|e|ei|eo|eio|ss|se|linear|ease|ease_in|ease_out|ease_in_out|step_start|step_end)',
          values: { l: 'linear', e: 'ease', ei: 'ease-in', eo: 'ease-out', eio: 'ease-in-out', ss: 'step-start', se: 'step-end' },
          examples: ['l', 'se'],
          getValue: getValueFromValues
        };
        cssist.value_sets.text_trasform_kind = {
          regex: '(?:c|u|l|capitalize|uppercase|lowercase)',
          values: { c: 'capitalize', u: 'uppercase', l: 'lowercase', capitalize: 'capitalize', uppercase: 'uppercase', lowercase: 'lowercase' },
          examples: ['c', 'lowercase'],
          getValue: getValueFromValues
        };
        cssist.value_sets.vertical_align_kind = {
          regex: '(?:be|sb|sr|t|tt|m|b|tb|baseline|sub|super|top|text_top|middle|bottom|text_bottom)',
          values: {
            be: 'baseline', sb: 'sub', sr: 'super', t: 'top', tt: 'text-top	', m: 'middle', b: 'bottom', tb: 'text-bottom',
            baseline: 'baseline', sub: 'sub', super: 'super', top: 'top', text_top: 'text-top	', middle: 'middle', bottom: 'bottom', text_bottom: 'text-bottom'
          },
          examples: ['be', 'text_bottom'],
          getValue: getValueFromValues
        };
        cssist.value_sets.visibility_kind = {
          regex: '(?:v|h|c|visible|hidden|collapse)',
          values: {
            v: 'visible', h: 'hidden', c: 'collapse',
            visible: 'visible', hidden: 'hidden', collapse: 'collapse'
          },
          examples: ['v', 'c'],
          getValue: getValueFromValues
        };
        cssist.value_sets.white_space_kind = {
          regex: '(?:rl|rr|l|r|normal|nowrap|pre|pre_line|pre_wrap)',
          values: {
            n: 'normal', nw: 'nowrap', p: 'pre', pl: 'pre-line', pw: 'pre-wrap',
            normal: 'normal', nowrap: 'nowrap', pre: 'pre', pre_line: 'pre-line', pre_wrap: 'pre-wrap'
          },
          examples: ['l', 'rr'],
          getValue: getValueFromValues
        };
        cssist.value_sets.word_wrap_kind = {
          regex: '(?:b|break_word)',
          values: {
            b: 'break-word',
            break_word: 'break-word'
          },
          examples: ['b', 'break_word'],
          getValue: getValueFromValues
        };

        // NUMBER
        cssist.value_sets.integer = {
          regex: '(?:_?[0-9]+)',
          examples: ['_100', '100'],
          getValue: function(value){ return value.replace(/_/g,'-'); }
        };
        cssist.value_sets.integer_0 = {
          regex: '(?:[0-9]+)',
          examples: ['100'],
          getValue: function(value){
            var result = Math.abs(value);
            if(isNaN(result)) return null;
            else return result;
          }
        };
        cssist.value_sets.integer_0_12 = {
          regex: '(?:10|11|12|[0-9])',
          examples: ['0', '12'],
          getValue: function(value){ return Math.floor(value)%13; }
        };
        cssist.value_sets.integer_0_255 = {
          regex: '(?:(?:25[0-5])|(?:2[0-4][0-9])|(?:[01]?[0-9]?[0-9]))',
          examples: ['0', '255'],
          getValue: function(value){ return Math.floor(value)%256; }
        };
        cssist.value_sets.integer_hundred = {
          regex: '(?:[1-9]00)',
          examples: ['100', '900'],
          getValue: getValueFromOriginalValue
        };
        cssist.value_sets.integer_3digits = {
          regex: '(?:_?[0-9]{1,3})',
          examples: ['_999', '999'],
          getValue: function(value){ return Math.floor(cssist.value_sets.integer.getValue(value))%1000; }
        };
        cssist.value_sets.float = {
          regex: cssist.value_sets.integer.regex+'(?:o'+cssist.value_sets.integer_0.regex+')?',
          examples: ['0', '7o777', '_7o777'],
          getValue: function(value){ return value.replace(/o/g, '.'); }
        };
        cssist.value_sets.float_0_100 = {
          regex: '(?:100|[0-9]?[0-9])(?:o[0-9]+)?',
          examples: ['0', '10', '100', '7o777'],
          getValue: function(value){ return cssist.value_sets.float.getValue(value.replace(/_/g,'-'))%101; }
        };
        cssist.value_sets.float_0 = {
          regex: cssist.value_sets.integer.regex+'(?:o'+cssist.value_sets.integer_0.regex+')?',
          examples: ['0', '7o777'],
          getValue: function(value){ return cssist.value_sets.float.getValue(value.replace(/_/g,'-')); }
        };

        // OPACITY
        cssist.value_sets.opacity = {
          regex: cssist.value_sets.float_0_100.regex,
          examples: ['0', '50o50', '100'],
          getValue: function(value){ return cssist.value_sets.float_0_100.getValue(value)*0.01; }
        };

        // LENGTH
        cssist.value_sets.length = {
          regex: cssist.value_sets.float_0.regex+'(?:'+cssist.value_sets.length_unit_kind.regex+')?',
          examples: ['0px', '50p', '50', '100vw', '3n'],
          getValue: function(value){
            var regex = new RegExp('('+cssist.value_sets.float_0.regex+')('+cssist.value_sets.length_unit_kind.regex+')?');
            var matches = value.match(regex);
            var result = '';
            if(cssist.value_sets.float_0.getValue(matches[1])){ // 길이 값
              result = cssist.value_sets.float_0.getValue(matches[1]);
            }
            if(matches[2]){ // 길이 단위
              result += cssist.value_sets.length_unit_kind.getValue(matches[2]);
            } else {
              result += '%';
            }
            return result;
          }
        };
        cssist.value_sets.calc = {
          regex: '(?:__|_|M|D)',
          examples: ['__','_','D','M'],
          getValue: function(value){
            var result = null;
            if(value=='__'){ result = '+'; }
            else if(value=='_'){ result = '-'; }
            else if(value=='M'){ result = '*'; }
            else if(value=='D'){ result = '/'; }
            return result;
          }
        };
        cssist.value_sets.length_calc = {
          regex: '(?:'+cssist.value_sets.calc.regex+'?'+cssist.value_sets.length.regex+')+',
          examples: ['0', '50', '100_100px', '100M2_100vwD3__100cmD4_100pxD5_100M6_100vwD7__100cmD8_100pxD9'],
          getValue: function(value){
            var regex = new RegExp('('+cssist.value_sets.calc.regex+'?'+cssist.value_sets.length.regex+')', 'g');
            var matches = value.match(regex);
            var result = '';
            for(var i=0; i<matches.length; i++){
              var regex_each = new RegExp('('+cssist.value_sets.calc.regex+')?('+cssist.value_sets.length.regex+')');
              var matches_each = matches[i].match(regex_each);
              if(matches_each[1]){
                result += cssist.value_sets.calc.getValue(matches_each[1]);
              }
              if(!(matches_each[1]=='D'||matches_each[1]=='M')){ // 부호나 나누기나 곱하기가 아닌 경우
                if(i>=1){ result += ' '; }
                result += cssist.value_sets.length.getValue(matches_each[2]);
              } else{ // 부호나 나누기나 곱하기인 경우
                if(i>=1){ result += ' '; }
                result += matches_each[2];
              }
              result += ' ';
            }
            result = 'calc( ' + result + ')';
            console.log('result');
            console.log(result);
            return result;
          }
        };
        cssist.value_sets.length_calc_2D = {
          regex: '(?:[X|Y]'+cssist.value_sets.length_calc.regex+')+',
          examples: ['X100pxY50px', 'X100_10pxY50pxM10', 'X100M2_100vwD3__100cmD4_100pxD5_100M6_100vwD7__100cmD8_100pxD9'],
          getValue: function(value){
            var result = '';
            var regex_X = new RegExp('X('+cssist.value_sets.length_calc.regex+')');
            var matches_X = value.match(regex_X);
            if(matches_X){
              result += cssist.value_sets.length_calc.getValue(matches_X[0]);
            } else {
              result += 0;
            }
            result += ' ';
            var regex_Y = new RegExp('Y('+cssist.value_sets.length_calc.regex+')');
            var matches_Y = value.match(regex_Y);
            if(matches_Y){
              result += cssist.value_sets.length_calc.getValue(matches_Y[0]);
            } else {
              result += 0;
            }
            return result;
          }
        };

        // DEGREE
        cssist.value_sets.degree = {
          regex: '(?:_?[0-9]+)(?:d)',
          examples: ['180d', '_90d'],
          getValue: function(value){ return value.replace(/d/g, 'deg'); }
        };

        // TIME
        cssist.value_sets.hour = {
          regex: cssist.value_sets.integer_0.regex+'h',
          examples: ['0h', '100h'],
          getValue: getValueFromOriginalValue
        };
        cssist.value_sets.hour_0_12 = {
          regex: cssist.value_sets.integer_0_12.regex+'h',
          examples: ['0h', '12h'],
          getValue: getValueFromOriginalValue
        };
        cssist.value_sets.second = {
          regex: cssist.value_sets.float_0.regex+'s',
          examples: ['0s', '100s'],
          getValue: getValueFromOriginalValue
        };
        cssist.value_sets.millisecond = {
          regex: cssist.value_sets.float_0.regex+'ms',
          examples: ['0ms', '100ms'],
          getValue: getValueFromOriginalValue
        };

        // TRANSFORM
        cssist.value_sets.translate_length_calc_2D = {
          regex: '(?:[X|Y]'+cssist.value_sets.length_calc.regex+')+',
          examples: ['X100pxY50px', 'X100_10pxY50pxM10', 'X100M2_100vwD3__100cmD4_100pxD5_100M6_100vwD7__100cmD8_100pxD9'],
          getValue: function(value){
            var result = 'translate( ';
            var regex_X = new RegExp('X('+cssist.value_sets.length_calc.regex+')');
            var matches_X = value.match(regex_X);
            if(matches_X){
              result += cssist.value_sets.length_calc.getValue(matches_X[0]);
            } else {
              result += 0;
            }
            result += ', ';
            var regex_Y = new RegExp('Y('+cssist.value_sets.length_calc.regex+')');
            var matches_Y = value.match(regex_Y);
            if(matches_Y){
              result += cssist.value_sets.length_calc.getValue(matches_Y[0]);
            } else {
              result += 0;
            }
            result += ' )';
            return result;
          }
        };

        // COLOR
        cssist.value_sets.hex_color = {
          regex: '(?:[0-9A-F]{6})',
          examples: ['000000', 'FFFFFF'],
          getValue: function(value){
            var result = 'rgba(';
            result += parseInt(value.substring(0,2), 16)+', ';
            result += parseInt(value.substring(2,4), 16)+', ';
            result += parseInt(value.substring(4,6), 16);
            result += ', 100)';
            return result;
          },
          getObject: function(value){
            var result = {
              red:parseInt(value.substring(0,2), 16),
              green:parseInt(value.substring(2,4), 16),
              blue:parseInt(value.substring(4,6), 16)
            };
            return result;
          }
        };
        cssist.value_sets.google_color = {
          regex: '(?:red|pink|purple|deeppurple|indigo|blue|lightblue|cyan|teal|green|lightgreen|lime|yellow|amber|orange|deeporange|brown|grey|bluegrey|black|white|rd|pk|pe|dp|io|be|lb|cn|tl|gn|lg|le|yw|ar|oe|de|bn|gy|by|bk|we)(?:[1-9]00|50)?',
          values: {
            rd:'F44336', rd50: 'FFEBEE', rd100: 'FFCDD2', rd200: 'EF9A9A', rd300: 'E57373', rd400: 'EF5350', rd500: 'F44336', rd600: 'E53935', rd700: 'D32F2F', rd800: 'C62828', rd900: 'B71C1C', //Red
            red:'F44336', red50: 'FFEBEE', red100: 'FFCDD2', red200: 'EF9A9A', red300: 'E57373', red400: 'EF5350', red500: 'F44336', red600: 'E53935', red700: 'D32F2F', red800: 'C62828', red900: 'B71C1C', //Red

            pk:'E91E63', pk50: 'FCE4EC', pk100: 'F8BBD0', pk200: 'F48FB1', pk300: 'F06292', pk400: 'EC407A', pk500: 'E91E63', pk600: 'D81B60', pk700: 'C2185B', pk800: 'AD1457', pk900: '880E4F', //Pink
            pink:'E91E63', pink50: 'FCE4EC', pink100: 'F8BBD0', pink200: 'F48FB1', pink300: 'F06292', pink400: 'EC407A', pink500: 'E91E63', pink600: 'D81B60', pink700: 'C2185B', pink800: 'AD1457', pink900: '880E4F', //Pink

            pe:'9C27B0', pe50: 'F3E5F5', pe100: 'E1BEE7', pe200: 'CE93D8', pe300: 'BA68C8', pe400: 'AB47BC', pe500: '9C27B0', pe600: '8E24AA', pe700: '7B1FA2', pe800: '6A1B9A', pe900: '4A148C', //Purple
            purple:'9C27B0', purple50: 'F3E5F5', purple100: 'E1BEE7', purple200: 'CE93D8', purple300: 'BA68C8', purple400: 'AB47BC', purple500: '9C27B0', purple600: '8E24AA', purple700: '7B1FA2', purple800: '6A1B9A', purple900: '4A148C', //Purple

            dp:'673AB7', dp50: 'EDE7F6', dp100: 'D1C4E9', dp200: 'B39DDB', dp300: '9575CD', dp400: '7E57C2', dp500: '673AB7', dp600: '5E35B1', dp700: '512DA8', dp800: '4527A0', dp900: '311B92', //Deep Purple
            deeppurple:'673AB7', deeppurple50: 'EDE7F6', deeppurple100: 'D1C4E9', deeppurple200: 'B39DDB', deeppurple300: '9575CD', deeppurple400: '7E57C2', deeppurple500: '673AB7', deeppurple600: '5E35B1', deeppurple700: '512DA8', deeppurple800: '4527A0', deeppurple900: '311B92', //Deep Purple

            io:'3F51B5', io50: 'E8EAF6', io100: 'C5CAE9', io200: '9FA8DA', io300: '7986CB', io400: '5C6BC0', io500: '3F51B5', io600: '3949AB', io700: '303F9F', io800: '283593', io900: '1A237E', //Indigo
            indigo:'3F51B5', indigo50: 'E8EAF6', indigo100: 'C5CAE9', indigo200: '9FA8DA', indigo300: '7986CB', indigo400: '5C6BC0', indigo500: '3F51B5', indigo600: '3949AB', indigo700: '303F9F', indigo800: '283593', indigo900: '1A237E', //Indigo

            be:'2196F3', be50: 'E3F2FD', be100: 'BBDEFB', be200: '90CAF9', be300: '64B5F6', be400: '42A5F5', be500: '2196F3', be600: '1E88E5', be700: '1976D2', be800: '1565C0', be900: '0D47A1', //Blue
            blue:'2196F3', blue50: 'E3F2FD', blue100: 'BBDEFB', blue200: '90CAF9', blue300: '64B5F6', blue400: '42A5F5', blue500: '2196F3', blue600: '1E88E5', blue700: '1976D2', blue800: '1565C0', blue900: '0D47A1', //Blue

            lb:'03A9F4', lb50: 'E1F5FE', lb100: 'B3E5FC', lb200: '81D4FA', lb300: '4FC3F7', lb400: '29B6F6', lb500: '03A9F4', lb600: '039BE5', lb700: '0288D1', lb800: '0277BD', lb900: '01579B', //Light Blue
            lightblue:'03A9F4', lightblue50: 'E1F5FE', lightblue100: 'B3E5FC', lightblue200: '81D4FA', lightblue300: '4FC3F7', lightblue400: '29B6F6', lightblue500: '03A9F4', lightblue600: '039BE5', lightblue700: '0288D1', lightblue800: '0277BD', lightblue900: '01579B', //Light Blue

            cn:'00BCD4', cn50: 'E0F7FA', cn100: 'B2EBF2', cn200: '80DEEA', cn300: '4DD0E1', cn400: '26C6DA', cn500: '00BCD4', cn600: '00ACC1', cn700: '0097A7', cn800: '00838F', cn900: '006064', //Cyan
            cyan:'00BCD4', cyan50: 'E0F7FA', cyan100: 'B2EBF2', cyan200: '80DEEA', cyan300: '4DD0E1', cyan400: '26C6DA', cyan500: '00BCD4', cyan600: '00ACC1', cyan700: '0097A7', cyan800: '00838F', cyan900: '006064', //Cyan

            tl:'009688', tl50: 'E0F2F1', tl100: 'B2DFDB', tl200: '80CBC4', tl300: '4DB6AC', tl400: '26A69A', tl500: '009688', tl600: '00897B', tl700: '00796B', tl800: '00695C', tl900: '004D40', //Teal
            teal:'009688', teal50: 'E0F2F1', teal100: 'B2DFDB', teal200: '80CBC4', teal300: '4DB6AC', teal400: '26A69A', teal500: '009688', teal600: '00897B', teal700: '00796B', teal800: '00695C', teal900: '004D40', //Teal

            gn:'4CAF50', gn50: 'E8F5E9', gn100: 'C8E6C9', gn200: 'A5D6A7', gn300: '81C784', gn400: '66BB6A', gn500: '4CAF50', gn600: '43A047', gn700: '388E3C', gn800: '2E7D32', gn900: '1B5E20', //Green
            green:'4CAF50', green50: 'E8F5E9', green100: 'C8E6C9', green200: 'A5D6A7', green300: '81C784', green400: '66BB6A', green500: '4CAF50', green600: '43A047', green700: '388E3C', green800: '2E7D32', green900: '1B5E20', //Green

            lg:'8BC34A', lg50: 'F1F8E9', lg100: 'DCEDC8', lg200: 'C5E1A5', lg300: 'AED581', lg400: '9CCC65', lg500: '8BC34A', lg600: '7CB342', lg700: '689F38', lg800: '558B2F', lg900: '33691E', //Light Green
            lightgreen:'8BC34A', lightgreen50: 'F1F8E9', lightgreen100: 'DCEDC8', lightgreen200: 'C5E1A5', lightgreen300: 'AED581', lightgreen400: '9CCC65', lightgreen500: '8BC34A', lightgreen600: '7CB342', lightgreen700: '689F38', lightgreen800: '558B2F', lightgreen900: '33691E', //Light Green

            le:'CDDC39', le50: 'F9FBE7', le100: 'F0F4C3', le200: 'E6EE9C', le300: 'DCE775', le400: 'D4E157', le500: 'CDDC39', le600: 'C0CA33', le700: 'AFB42B', le800: '9E9D24', le900: '827717', //Lime
            lime:'CDDC39', lime50: 'F9FBE7', lime100: 'F0F4C3', lime200: 'E6EE9C', lime300: 'DCE775', lime400: 'D4E157', lime500: 'CDDC39', lime600: 'C0CA33', lime700: 'AFB42B', lime800: '9E9D24', lime900: '827717', //Lime

            yw:'FFEB3B', yw50: 'FFFDE7', yw100: 'FFF9C4', yw200: 'FFF59D', yw300: 'FFF176', yw400: 'FFEE58', yw500: 'FFEB3B', yw600: 'FDD835', yw700: 'FBC02D', yw800: 'F9A825', yw900: 'F57F17', //Yellow
            yellow:'FFEB3B', yellow50: 'FFFDE7', yellow100: 'FFF9C4', yellow200: 'FFF59D', yellow300: 'FFF176', yellow400: 'FFEE58', yellow500: 'FFEB3B', yellow600: 'FDD835', yellow700: 'FBC02D', yellow800: 'F9A825', yellow900: 'F57F17', //Yellow

            ar:'FFC107', ar50: 'FFF8E1', ar100: 'FFECB3', ar200: 'FFE082', ar300: 'FFD54F', ar400: 'FFCA28', ar500: 'FFC107', ar600: 'FFB300', ar700: 'FFA000', ar800: 'FF8F00', ar900: 'FF6F00', //Amber
            amber:'FFC107', amber50: 'FFF8E1', amber100: 'FFECB3', amber200: 'FFE082', amber300: 'FFD54F', amber400: 'FFCA28', amber500: 'FFC107', amber600: 'FFB300', amber700: 'FFA000', amber800: 'FF8F00', amber900: 'FF6F00', //Amber

            oe:'FF9800', oe50: 'FFF3E0', oe100: 'FFE0B2', oe200: 'FFCC80', oe300: 'FFB74D', oe400: 'FFA726', oe500: 'FF9800', oe600: 'FB8C00', oe700: 'F57C00', oe800: 'EF6C00', oe900: 'E65100', //Orange
            orange:'FF9800', orange50: 'FFF3E0', orange100: 'FFE0B2', orange200: 'FFCC80', orange300: 'FFB74D', orange400: 'FFA726', orange500: 'FF9800', orange600: 'FB8C00', orange700: 'F57C00', orange800: 'EF6C00', orange900: 'E65100', //Orange

            de:'FF5722', de50: 'FBE9E7', de100: 'FFCCBC', de200: 'FFAB91', de300: 'FF8A65', de400: 'FF7043', de500: 'FF5722', de600: 'F4511E', de700: 'E64A19', de800: 'D84315', de900: 'BF360C', //Deep Orange
            deeporange:'FF5722', deeporange50: 'FBE9E7', deeporange100: 'FFCCBC', deeporange200: 'FFAB91', deeporange300: 'FF8A65', deeporange400: 'FF7043', deeporange500: 'FF5722', deeporange600: 'F4511E', deeporange700: 'E64A19', deeporange800: 'D84315', deeporange900: 'BF360C', //Deep Orange

            bn:'795548', bn50: 'EFEBE9', bn100: 'D7CCC8', bn200: 'BCAAA4', bn300: 'A1887F', bn400: '8D6E63', bn500: '795548', bn600: '6D4C41', bn700: '5D4037', bn800: '4E342E', bn900: '3E2723', //Brown
            brown:'795548', brown50: 'EFEBE9', brown100: 'D7CCC8', brown200: 'BCAAA4', brown300: 'A1887F', brown400: '8D6E63', brown500: '795548', brown600: '6D4C41', brown700: '5D4037', brown800: '4E342E', brown900: '3E2723', //Brown

            gy:'9E9E9E', gy50: 'FAFAFA', gy100: 'F5F5F5', gy200: 'EEEEEE', gy300: 'E0E0E0', gy400: 'BDBDBD', gy500: '9E9E9E', gy600: '757575', gy700: '616161', gy800: '424242', gy900: '212121', //Grey
            grey:'9E9E9E', grey50: 'FAFAFA', grey100: 'F5F5F5', grey200: 'EEEEEE', grey300: 'E0E0E0', grey400: 'BDBDBD', grey500: '9E9E9E', grey600: '757575', grey700: '616161', grey800: '424242', grey900: '212121', //Grey

            by:'607D8B', by50: 'ECEFF1', by100: 'CFD8DC', by200: 'B0BEC5', by300: '90A4AE', by400: '78909C', by500: '607D8B', by600: '546E7A', by700: '455A64', by800: '37474F', by900: '263238', //Blue Grey
            bluegrey:'607D8B', bluegrey50: 'ECEFF1', bluegrey100: 'CFD8DC', bluegrey200: 'B0BEC5', bluegrey300: '90A4AE', bluegrey400: '78909C', bluegrey500: '607D8B', bluegrey600: '546E7A', bluegrey700: '455A64', bluegrey800: '37474F', bluegrey900: '263238', //Blue Grey

            bk:'000000', //Black
            black:'000000', //Black

            we:'FFFFFF', //White
            white:'FFFFFF' //White
          },
          examples: ['yw', 'rd500'],
          getValue: function(value){
            return cssist.value_sets.hex_color.getValue(this.values[value]);
          },
          getObject: function(value){
            return cssist.value_sets.hex_color.getObject(this.values[value]);
          }
        };
        cssist.value_sets.rgb_color = {
          regex: cssist.value_sets.integer_0_255.regex+'(?:_'+cssist.value_sets.integer_0_255.regex+'){2}',
          examples: ['0_0_0', '10_10_10', '100_100_100', '255_255_255'],
          getValue: function(value){
            splits = value.split('_');
            if(!(splits.length==3)) return null;
            var result = 'rgba(';
            result += splits[0]+', ';
            result += splits[1]+', ';
            result += splits[2];
            result += ', 100)';
            return result;
          },
          getObject: function(value){
            splits = value.split('_');
            if(!(splits.length==3)) return null;
            var result = {
              red:splits[0],
              green:splits[1],
              blue:splits[2]
            };
            return result;
          }
        };
        cssist.value_sets.rgba_color = {
          regex: '(?:'+cssist.value_sets.google_color.regex+'|'+cssist.value_sets.hex_color.regex+'|'+cssist.value_sets.rgb_color.regex+')'+'(?:_'+cssist.value_sets.opacity.regex+')?',
          examples: ['rd_0','yw500_25','123456_50', '255_255_255_100','255_255_255'],
          getValue: function(value){
            var regex = new RegExp('(?:('+cssist.value_sets.google_color.regex+')|('+cssist.value_sets.hex_color.regex+')|('+cssist.value_sets.rgb_color.regex+'))'+'(?:_('+cssist.value_sets.opacity.regex+'))?');
            var matches = value.match(regex);
            var object_rgb, opacity, matches_each;
            if(matches[1]){
              var regex_each = new RegExp('('+cssist.value_sets.google_color.regex+')(?:_('+cssist.value_sets.opacity.regex+'))?');
              matches_each = value.match(regex_each);
              object_rgb = cssist.value_sets.google_color.getObject(matches_each[1]);
              if(matches_each[2]) opacity = cssist.value_sets.opacity.getValue(matches_each[2]);
            }
            else if(matches[2]){
              var regex_each = new RegExp('('+cssist.value_sets.hex_color.regex+')(?:_('+cssist.value_sets.opacity.regex+'))?');
              matches_each = value.match(regex_each);
              object_rgb = cssist.value_sets.hex_color.getObject(matches_each[1]);
              if(matches_each[2]) opacity = cssist.value_sets.opacity.getValue(matches_each[2]);
            }
            else if(matches[3]){
              var regex_each = new RegExp('('+cssist.value_sets.rgb_color.regex+')(?:_('+cssist.value_sets.opacity.regex+'))?');
              matches_each = value.match(regex_each);
              object_rgb = cssist.value_sets.rgb_color.getObject(matches_each[1]);
              if(matches_each[2]) opacity = cssist.value_sets.opacity.getValue(matches_each[2]);
            }
            if(!object_rgb) return null;
            if(matches_each[2]){
              return 'rgba('+object_rgb.red+','+object_rgb.green+','+object_rgb.blue+','+opacity+')';
            } else {
              return 'rgb('+object_rgb.red+','+object_rgb.green+','+object_rgb.blue+')';
            }
          }
        };

        // GRADIENT
        cssist.value_sets.gradient = {
          regex: '(?:'+cssist.value_sets.gradient_kind.regex+'_)?'+'(?:'+cssist.value_sets.degree.regex+')((?:_'+cssist.value_sets.rgba_color.regex+'){2,})',
          examples: ['l_30d_rd_oe_yw_gn_be_io_pe'],
          getValue: function(value){
            var result = '';
            var regex = new RegExp('(?:('+cssist.value_sets.gradient_kind.regex+')_)?('+cssist.value_sets.degree.regex+')((?:_'+cssist.value_sets.rgba_color.regex+'){2,})');
            var matches = value.match(regex);
            var gradient_kind=null, degree=null, hour=null, rgba_colors=[];
            if(matches[1]) gradient_kind = cssist.value_sets.gradient_kind.getValue(matches[1]);
            if(matches[2]) degree = cssist.value_sets.degree.getValue(matches[2]);
            if(matches[3]) {
              var regex_rgba_color = new RegExp(cssist.value_sets.rgba_color.regex, 'g');
              var matches_rgba_color = matches[3].match(regex_rgba_color);
              for(var i=0; i<matches_rgba_color.length; i++){
                var rgba_color = cssist.value_sets.rgba_color.getValue(matches_rgba_color[i]);
                if(rgba_color) rgba_colors.push(rgba_color);
              }
            }
            if(gradient_kind&&degree&&rgba_colors.length>=1){
              return gradient_kind+'('+degree+','+rgba_colors.join(', ')+')';
            }
          }
        };

        // SHADOW
        cssist.value_sets.shadow = {
          regex: cssist.value_sets.integer_3digits.regex+'(?:_'+cssist.value_sets.integer_3digits.regex+'){0,3}(?:_'+cssist.value_sets.rgba_color.regex+')',
          examples: ['2_2_bk_30', '2_2_2_000000_50'],
          getValue: function(value){
            var result = '';
            var regex = new RegExp('('+cssist.value_sets.integer_3digits.regex+')(?:_('+cssist.value_sets.integer_3digits.regex+'))?(?:_('+cssist.value_sets.integer_3digits.regex+'))?(?:_('+cssist.value_sets.integer_3digits.regex+'))?(?:_('+cssist.value_sets.rgba_color.regex+'))');
            var matches = value.match(regex);
    				if(!(matches)) return null;
            var shadows = [];
            for(var i=1; i<=4; i++){ shadows.push(matches[i]); }
    				result = shadows.join('px ')+cssist.value_sets.rgba_color.getValue(matches[5]);
            return result;
          }
        };

        // URL
        cssist.value_sets.file_name = {
          regex: '[a-zA-Z0-9_-]+',
          examples: ['aA0_zZ9'],
          getValue: function(value){ return value; }
        };
        cssist.value_sets.image_extension = {
          regex: '(?:png|jpg|gif|PNG|JPG|GIF)',
          examples: ['png','GIF'],
          getValue: function(value){ return value; }
        };
        cssist.value_sets.image_url = {
          regex: cssist.value_sets.file_name.regex+'([__]'+cssist.value_sets.file_name.regex+')*'+'_'+cssist.value_sets.image_extension.regex,
          examples: ['images__image_png'],
          getValue: function(value){ return value; }
        };

        // VARIABLE
        cssist.value_sets.variable = {
          regex: '(?:[a-z]+)(?:[A-Z][a-z]+)*',
          examples: ['linear','ease','easeIn','easeOut','easeInOut'],
          getValue: function(value){
            var result = value.replace(/[A-Z]/g, function(letter, index) {
              return index == 0 ? letter.toLowerCase() : '-'+letter.toLowerCase();
            }).replace(/\s+/g, '');
            return result;
          }
        };
        cssist.value_sets.variables = {
          regex: cssist.value_sets.variable.regex+'(?:_'+cssist.value_sets.variable.regex+')*',
          examples: ['width_backgroundColor'],
          getValue: function(value){
            var splits = value.split('_');
            var result = '';
            for(var i=0; i<splits.length; i++){
              if(result.length>=1){ result += ' ' }
              result += cssist.value_sets.variable.getValue(splits[i]);
            }
            return result;
          }
        };

      };
      function testValueSets(){
        for(var prop in cssist.value_sets){
          var regex = new RegExp('^'+cssist.value_sets[prop].regex+'$');
          if(cssist.value_sets[prop].examples){
            for(var i=0; i<cssist.value_sets[prop].examples.length; i++){
              var matches = cssist.value_sets[prop].examples[i].match(regex);
              if(!(matches&&matches.input==matches[0])||cssist.value_sets[prop].test){
                console.log('\n');
                console.log(prop, regex, cssist.value_sets[prop].examples[i], matches);
                if(matches) console.log(cssist.value_sets[prop].getValue(matches[0]));
              }
            }
          }
        }
      };
      initializeValueSets();
      testValueSets();

      function initializePropertySets(){
        cssist.property_sets = [
          {
            properties: { an:'animation-iteration-count', animation_iteration_count:'animation-iteration-count' },
            value_sets: [cssist.value_sets.integer_0, cssist.value_sets.infinite, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { b:'background', background:'background' },
            value_sets: [cssist.value_sets.rgba_color, cssist.value_sets.gradient, cssist.value_sets.none, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { bi:'background-image', background_image:'background-image' },
            value_sets: [cssist.value_sets.url, cssist.value_sets.none, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { bs:'background-size', background_size:'background-size' },
            value_sets: [cssist.value_sets.auto, cssist.value_sets.length_calc_2D, cssist.value_sets.background_size_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { bs:'box-shadow', ts:'text-shadow', box_shadow:'box-shadow', text_shadow:'text-shadow' },
            value_sets: [cssist.value_sets.shadow]
          },{
            properties: { bs:'box-sizing', box_sizing:'box-sizing' },
            value_sets: [cssist.value_sets.box_sizing_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: {
              bo:'border-width', bo_t:'border-top-width', bo_b:'border-bottom-width', bo_l:'border-left-width', bo_r:'border-right-width',
              border_width:'border-width', border_top_width:'border-top-width', border_bottom_width:'border-bottom-width', border_left_width:'border-left-width', border_right_width:'border-right-width'
            },
            value_sets: [cssist.value_sets.length_calc, cssist.value_sets.auto, cssist.value_sets.initial, cssist.value_sets.inherit, cssist.value_sets.thick_kind]
          },{
            properties: { bp:'background-position', background_position:'background-position' },
            value_sets: [cssist.value_sets.direction_2D_kind, cssist.value_sets.length_calc_2D, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: {
              c: 'color', pc: { name:'color', afters: ['::-webkit-input-placeholder', '::-moz-placeholder', ':-ms-input-placeholder', ':-moz-placeholder'] },
              color: 'color', placeholder: { name:'color', afters: ['::-webkit-input-placeholder', '::-moz-placeholder', ':-ms-input-placeholder', ':-moz-placeholder'] },
              bc:'background-color', background_color:'background-color',
              bo:'border-color', bo_t:'border-top-color', bo_b:'border-bottom-color', bo_l:'border-left-color', bo_r:'border-right-color',
              border_color:'border-color', border_top_color:'border-top-color', border_bottom_color:'border-bottom-color', border_left_color:'border-left-color', border_right_color:'border-right-color'
            },
            value_sets: [cssist.value_sets.rgba_color]
          },{
            properties: { c:'clear', clear:'clear' },
            value_sets: [cssist.value_sets.clear_kind, cssist.value_sets.none, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { d:'display', display:'display' },
            value_sets: [cssist.value_sets.display_kind, cssist.value_sets.none, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { f:'float', float:'float' },
            value_sets: [cssist.value_sets.none, cssist.value_sets.float_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { f:'font-size', font_size:'font-size' },
            value_sets: [cssist.value_sets.font_size_kind, cssist.value_sets.length_calc, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { fw:'font-weight', font_weight:'font-weight' },
            value_sets: [cssist.value_sets.font_weight_kind, cssist.value_sets.integer_hundred, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { t:'text-align', text_align:'text-align' },
            value_sets: [cssist.value_sets.text_align_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { tt:'text-transform', text_transform:'text-transform' },
            value_sets: [cssist.value_sets.text_trasform_kind, cssist.value_sets.none, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { lh:'line-height', line_height:'line-height' },
            value_sets: [cssist.value_sets.normal,  cssist.value_sets.length_calc, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { ls:'letter-spacing', letter_spacing:'letter-spacing' },
            value_sets: [cssist.value_sets.normal, cssist.value_sets.length_calc, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { o:'opacity', opacity:'opacity' },
            value_sets: [cssist.value_sets.opacity]
          },{
            properties: { o:'overflow', ox:'overflow-x', oy:'overflow-y', overflow:'overflow', overflow_x:'overflow-x', overflow_y:'overflow-y' },
            value_sets: [cssist.value_sets.overflow_kind, cssist.value_sets.auto, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { p:'position', position:'position' },
            value_sets: [cssist.value_sets.position_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: {
              p:'padding', pb:'padding-bottom', pl:'padding-left', pr:'padding-right', pt:'padding-top',
              padding:'padding', padding_bottom:'padding-bottom', padding_left:'padding-left', padding_right:'padding-right', padding_top:'padding-top',
              bor:'border-radius', bor_tl:'border-top-left-radius', bor_tr:'border-top-right-radius', bor_bl:'border-bottom-left-radius', bor_br:'border-bottom-right-radius',
              border_radius:'border-radius', border_top_left_radius:'border-top-left-radius', border_top_right_radius:'border-top-right-radius', border_bottom_left_radius:'border-bottom-left-radius', border_bottom_right_radius:'border-bottom-right-radius',
            },
            value_sets: [cssist.value_sets.length_calc, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { to:'text-overflow', text_overflow:'text-overflow' },
            value_sets: [cssist.value_sets.text_overflow_kind]
          },{
            properties: { tn:'transform', transform:'transform' },
            value_sets: [cssist.value_sets.translate_length_calc_2D]
          },{
            properties: { tn:'transition-property', transition_property:'transition-property' },
            value_sets: [cssist.value_sets.none, cssist.value_sets.all, cssist.value_sets.variables, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { tn:'transition-duration', tnd:'transition-delay', an:'animation-duration', and: 'animation-delay', transition_duration:'transition-duration', transition_delay:'transition-delay', animation_duration:'animation-duration', animation_delay: 'animation-delay' },
            value_sets: [cssist.value_sets.second, cssist.value_sets.millisecond, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { tn:'transition-timing-function', an:'animation-timing-function', transition_timing_function:'transition-timing-function', animation_timing_function:'animation-timing-function' },
            value_sets: [cssist.value_sets.transition_timing_function_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { v:'visibility', visibility:'visibility' },
            value_sets: [cssist.value_sets.visibility_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { v:'vertical-align', vertical_align:'vertical-align' },
            value_sets: [cssist.value_sets.vertical_align_kind, cssist.value_sets.length_calc, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { ws:'white-space', white_space:'white-space' },
            value_sets: [cssist.value_sets.white_space_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { wb:'word-break', word_break:'word-break' },
            value_sets: [cssist.value_sets.white_break_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { ww:'word-wrap', word_wrap:'word-wrap' },
            value_sets: [cssist.value_sets.word_wrap_kind, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: {
              w:'width', xw:'max-width', nw:'min-width', h:'height', xh:'max-height', nh:'min-height',
              width:'width', max_width:'max-width', min_width:'min-width', height:'height', max_height:'max-height', min_height:'min-height',
              b:'bottom', r:'right', t:'top', l:'left',
              bottom:'bottom', right:'right', top:'top', left:'left',
              m:'margin', mb:'margin-bottom', ml:'margin-left', mr:'margin-right', mt:'margin-top',
              margin:'margin', margin_bottom:'margin-bottom', margin_left:'margin-left', margin_right:'margin-right', margin_top:'margin-top',
              ws:'word-spacing', word_spacing:'word-spacing'
            },
            value_sets: [cssist.value_sets.length_calc, cssist.value_sets.auto, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: { z:'z-index', z_index:'z-index' },
            value_sets: [cssist.value_sets.auto, cssist.value_sets.integer, cssist.value_sets.initial, cssist.value_sets.inherit]
          },{
            properties: {
              color: 'color', opacity: 'opacity',
              background: 'background', background_attachment: 'background-attachment', background_blend_mode: 'background-blend-mode', background_color: 'background-color', background_image: 'background-image', background_position: 'background-position', background_repeat: 'background-repeat', background_clip: 'background-clip', background_origin: 'background-origin', background_size: 'background-size', border: 'border', border_bottom: 'border-bottom', border_bottom_color: 'border-bottom-color', border_bottom_left_radius: 'border-bottom-left-radius', border_bottom_right_radius: 'border-bottom-right-radius', border_bottom_style: 'border-bottom-style', border_bottom_width: 'border-bottom-width', border_color: 'border-color', border_image: 'border-image', border_image_outset: 'border-image-outset', border_image_repeat: 'border-image-repeat', border_image_slice: 'border-image-slice', border_image_source: 'border-image-source', border_image_width: 'border-image-width', border_ltransitioneft: 'border-left', border_left_color: 'border-left-color', border_left_style: 'border-left-style', border_left_width: 'border-left-width', border_radius: 'border-radius', border_right: 'border-right', border_right_color: 'border-right-color', border_right_style: 'border-right-style', border_right_width: 'border-right-width', border_style: 'border-style', border_top: 'border-top', border_top_color: 'border-top-color', border_top_left_radius: 'border-top-left-radius', border_top_right_radius: 'border-top-right-radius', border_top_style: 'border-top-style', border_top_width: 'border-top-width', border_width: 'border-width', box_decoration_break: 'box-decoration-break', box_shadow: 'box-shadow',
              bottom: 'bottom', clear: 'clear', clip: 'clip', display: 'display', float: 'float', height: 'height', left: 'left', margin: 'margin', margin_bottom: 'margin-bottom', margin_left: 'margin-left', margin_right: 'margin-right', margin_top: 'margin-top', max_height: 'max-height', max_width: 'max-width', min_height: 'min-height', min_width: 'min-width', overflow: 'overflow', overflow_x: 'overflow-x', overflow_y: 'overflow-y', padding: 'padding', padding_bottom: 'padding-bottom', padding_left: 'padding-left', padding_right: 'padding-right', padding_top: 'padding-top', position: 'position', right: 'right', top: 'top', visibility: 'visibility', width: 'width', vertical_align: 'vertical-align', z_index: 'z-index',
              align_content: 'align-content', align_items: 'align-items', align_self: 'align-self', flex: 'flex', flex_basis: 'flex-basis', flex_direction: 'flex-direction', flex_flow: 'flex-flow', flex_grow: 'flex-grow', flex_shrink: 'flex-shrink', flex_wrap: 'flex-wrap', justify_content: 'justify-content', order: 'order',
              hanging_punctuation: 'hanging-punctuation', hyphens: 'hyphens', letter_spacing: 'letter-spacing', line_break: 'line-break', line_height: 'line-height', overflow_wrap: 'overflow-wrap', tab_size: 'tab-size', text_align: 'text-align', text_align_last: 'text-align-last', text_combine_upright: 'text-combine-upright', text_indent: 'text-indent', text_justify: 'text-justify', text_transform: 'text-transform', white_space: 'white-space', word_break: 'word-break', word_spacing: 'word-spacing', word_wrap: 'word-wrap',
              text_decoration: 'text-decoration', text_decoration_color: 'text-decoration-color', text_decoration_line: 'text-decoration-line', text_decoration_style: 'text-decoration-style', text_shadow: 'text-shadow', text_underline_position: 'text-underline-position',
              font: 'font', font_family: 'font-family', font_feature_settings: 'font-feature-settings', font_kerning: 'font-kerning', font_language_override: 'font-language-override', font_size: 'font-size', font_size_adjust: 'font-size-adjust', font_stretch: 'font-stretch', font_style: 'font-style', font_synthesis: 'font-synthesis', font_variant: 'font-variant', font_variant_alternates: 'font-variant-alternates', font_variant_caps: 'font-variant-caps', font_variant_east_asian: 'font-variant-east-asian', font_variant_ligatures: 'font-variant-ligatures', font_variant_numeric: 'font-variant-numeric', font_variant_position: 'font-variant-position', font_weight: 'font-weight', direction: 'direction', text_orientation: 'text-orientation', text_combine_upright: 'text-combine-upright', unicode_bidi: 'unicode-bidi', user_select: 'user-select', writing_mode: 'writing-mode', border_collapse: 'border-collapse', border_spacing: 'border-spacing', caption_side: 'caption-side', empty_cells: 'empty-cells', table_layout: 'table-layout', counter_increment: 'counter-increment', counter_reset: 'counter-reset', list_style: 'list-style', list_style_image: 'list-style-image', list_style_position: 'list-style-position', list_style_type: 'list-style-type',
              animation: 'animation', animation_delay: 'animation-delay', animation_direction: 'animation-direction', animation_duration: 'animation-duration', animation_fill_mode: 'animation-fill-mode', animation_iteration_count: 'animation-iteration-count', animation_name: 'animation-name', animation_play_state: 'animation-play-state', animation_timing_function: 'animation-timing-function',
              backface_visibility: 'backface-visibility', perspective: 'perspective', perspective_origin: 'perspective-origin', transform_origin: 'transform-origin', transform_style: 'transform-style',
              transition_property: 'transition-property', transition_duration: 'transition-duration', transition_timing_function: 'transition-timing-function', transition_delay: 'transition-delay',
              box_sizing: 'box-sizing', content: 'content', cursor: 'cursor', ime_mode: 'ime-mode', nav_down: 'nav-down', nav_index: 'nav-index', nav_left: 'nav-left', nav_right: 'nav-right', nav_up: 'nav-up', outline: 'outline', outline_color: 'outline-color', outline_offset: 'outline-offset', outline_style: 'outline-style', outline_width: 'outline-width', resize: 'resize', text_overflow: 'text-overflow',
              break_after: 'break-after', break_before: 'break-before', break_inside: 'break-inside', column_count: 'column-count', column_fill: 'column-fill', column_gap: 'column-gap', column_rule: 'column-rule', column_rule_color: 'column-rule-color', column_rule_style: 'column-rule-style', column_rule_width: 'column-rule-width', column_span: 'column-span', column_width: 'column-width', columns: 'columns', widows: 'widows',
              orphans: 'orphans', page_break_after: 'page-break-after', page_break_before: 'page-break-before', page_break_inside: 'page-break-inside',
              marks: 'marks', quotes: 'quotes',
              filter: 'filter',
              image_orientation: 'image-orientation', image_rendering: 'image-rendering', image_resolution: 'image-resolution', object_fit: 'object-fit', object_position: 'object-position',
              mask_type: 'mask-type',
              mark: 'mark', mark_after: 'mark-after', mark_before: 'mark-before', phonemes: 'phonemes', rest: 'rest', rest_after: 'rest-after', rest_before: 'rest-before', voice_balance: 'voice-balance', voice_duration: 'voice-duration', voice_pitch: 'voice-pitch', voice_pitch_range: 'voice-pitch-range', voice_rate: 'voice-rate', voice_stress: 'voice-stress', voice_volume: 'voice-volume',
              marquee_direction: 'marquee-direction', marquee_play_count: 'marquee-play-count', marquee_speed: 'marquee-speed', marquee_style: 'marquee-style',
            },
            value_sets: [cssist.value_sets.variable]
          }
        ];
      };
      initializePropertySets();

    }
  };
  cssist.init.settings();
})();
// CSSIST, 클래스 기반 자동 CSS 프레임워크, 이 사이트는 cssist.js 로 만들어졌습니다.
//
// INTRODUCTION 소개
// - 수식계산
// - 반응형 클래스
// - 이벤트형 클래스
// - 크로스브라우징 대응
//
// INSTALLATION 설치
// - bower install cssist
//
// CLASSES
//
// ALPHABET
//
// animation : an:'animation-iteration-count', an:'animation-duration', and: 'animation-delay', an:'animation-timing-function'
// background : b:'background', bi:'background-image', bs:'background-size', bp:'background-position'
// shadow : bs:'box-shadow', ts:'text-shadow'
// box-sizing : bs:'box-sizing'
// border : bo:'border-width', bo_t:'border-top-width', bo_b:'border-bottom-width', bo_l:'border-left-width', bo_r:'border-right-width', bor:'border-radius', bor_tl:'border-top-left-radius', bor_tr:'border-top-right-radius', bor_bl:'border-bottom-left-radius', bor_br:'border-bottom-right-radius'
// color : c: 'color', pc: 'placeholder', bo:'border-color', bo_t:'border-top-color', bo_b:'border-bottom-color', bo_l:'border-left-color', bo_r:'border-right-color',
// clear : c:'clear'
// display : d:'display'
// float : f:'float'
// font : f:'font-size', fw:'font-weight'
// height : h:'height', xh:'max-height', nh:'min-height'
// letter : ls:'letter-spacing'
// line : lh:'line-height'
// margin : m:'margin', mb:'margin-bottom', ml:'margin-left', mr:'margin-right', mt:'margin-top',
// opacity : o:'opacity'
// overflow : o:'overflow', ox:'overflow-x', oy:'overflow-y'
// padding : p:'padding', pb:'padding-bottom', pl:'padding-left', pr:'padding-right', pt:'padding-top',
// position : p:'position'
// text : t:'text-align', tt:'text-transform', to:'text-overflow'
// transform : tn:'transform',
// transition : tn:'transition-property', tn:'transition-duration', tn:'transition-timing-function'
// visibility : v:'visibility'
// vertical-align : v:'vertical-align'
// width : w:'width', xw:'max-width', nw:'min-width'
// white-space : ws:'white-space'
// word : wb:'word-break', ww:'word-wrap', ws:'word-spacing'
// z-index : z:'z-index'
//
//
// LEVEL
//
// {
//   chapter: 'Color',
//   sections: [
//     { property: 'color', prefix:'c' },
//     { property: 'opacity', prefix:'o' },
//     { property: 'placeholder', prefix:'pc' },
//     { property: 'border-color', prefix:'bo' },
//     { property: 'border-top-color', prefix:'bo_t' },
//     { property: 'border-bottom-color', prefix:'bo_b' },
//     { property: 'border-left-color', prefix:'bo_l' },
//     { property: 'border-right-color', prefix:'bo_r' },
//     { property: 'box-shadow', prefix:'bs' },
//     { property: 'text-shadow', prefix:'ts' },
//   ]
// },{
//   chapter: 'Background',
//   sections: [
//     { property: 'background', prefix:'b' },
//     { property: 'background-image', prefix:'bi' },
//     { property: 'background-size', prefix:'bs' },
//     { property: 'background-position', prefix:'bp' },
//   ]
// },{
//   chapter: 'Box',
//   sections: [
//     { property: 'width', prefix:'w' },
//     { property: 'max-width', prefix:'xw' },
//     { property: 'min-width', prefix:'nw' },
//     { property: 'height', prefix:'h' },
//     { property: 'max-height', prefix:'xh' },
//     { property: 'min-height', prefix:'nh' },
//     { property: 'margin', prefix:'m' },
//     { property: 'margin-bottom', prefix:'mb' },
//     { property: 'margin-left', prefix:'ml' },
//     { property: 'margin-right', prefix:'mr' },
//     { property: 'margin-top', prefix:'mt' },
//     { property: 'padding', prefix:'p' },
//     { property: 'padding-bottom', prefix:'pb' },
//     { property: 'padding-left', prefix:'pl' },
//     { property: 'padding-right', prefix:'pr' },
//     { property: 'padding-top', prefix:'pt' },
//     { property: 'overflow', prefix:'o' },
//     { property: 'overflow-x', prefix:'ox' },
//     { property: 'overflow-y', prefix:'oy' },
//     { property: 'position', prefix:'p' },
//     { property: 'display', prefix:'d' },
//     { property: 'float', prefix:'f' },
//     { property: 'box-sizing', prefix:'bs' },
//     { property: 'z-index', prefix:'z' },
//     { property: 'visibility', prefix:'v' },
//     { property: 'vertical-align', prefix:'v' },
//     { property: 'transform', prefix:'tn' },
//     { property: 'clear', prefix:'c' },
//   ]
// },{
//   chapter: 'Border',
//   sections: [
//     { property: 'border-width', prefix:'bo' },
//     { property: 'border-top-width', prefix:'bo_t' },
//     { property: 'border-bottom-width', prefix:'bo_b' },
//     { property: 'border-left-width', prefix:'bo_l' },
//     { property: 'border-right-width', prefix:'bo_r' },
//     { property: 'border-radius', prefix:'bo_r' },
//     { property: 'border-top-left-radius', prefix:'bor_tl' },
//     { property: 'border-top-right-radius', prefix:'bor_tr' },
//     { property: 'border-bottom-left-radius', prefix:'bor_bl' },
//     { property: 'border-bottom-right-radius', prefix:'bor_br' },
//   ]
// },{
//   chapter: 'Text',
//   sections: [
//     { property: 'font-size', prefix:'f' },
//     { property: 'font-weight', prefix:'fw' },
//     { property: 'letter-spacing', prefix:'ls' },
//     { property: 'line-height', prefix:'lh' },
//     { property: 'letter-spacing', prefix:'ls' },
//     { property: 'text-align', prefix:'t' },
//     { property: 'text-transform', prefix:'tt' },
//     { property: 'text-overflow', prefix:'to' },
//     { property: 'white-space', prefix:'ws' },
//     { property: 'word-break', prefix:'wb' },
//     { property: 'word-wrap', prefix:'ww' },
//     { property: 'word-spacing', prefix:'ws' }
//   ]
// },{
//   chapter: 'Animation',
//   sections: [
//     { tn:'transition-property' },
//     { tn:'transition-duration' },
//     { tn:'transition-timing-function' },
//     { an:'animation-iteration-count' },
//     { an:'animation-duration' },
//     { and:'animation-delay' },
//     { an:'animation-timing-function' }
//   ]
// },{
//   chapter: 'Transform',
//   sections: [
//     transform : tn:'transform',
//   ]
// }


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(10);
__webpack_require__(2);
(function(){
  if (typeof(MutationObserver) !== 'undefined') {
    var mutationObserver = new MutationObserver(function(mutations, watcher) {
      var self = this;
      mutations.forEach(function(mutation) {
        var element = mutation.target;
        if(element && element.lastClassName !== element.className && typeof element.className=='string') cssist.paint.element(element);
        element.lastClassName = element.className;
      });
    });
  }
  cssist.paint = {
    element : function(element){
			var class_names = cssist.get.classesOfElement(element);
      for(var i=0; i<class_names.length; i++){
        var class_name = class_names[i];
        if(i == class_names.length-1){
          element.setAttribute('cssist','');
        }
        if(!cssist.classes_success) cssist.classes_success = [];
        if(!cssist.classes_fail) cssist.classes_fail = [];
        if(cssist.get.styleElement().innerHTML.indexOf('.'+class_name+' {')==-1
          &&cssist.get.styleElement().innerHTML.indexOf('.'+class_name+':')==-1
          &&cssist.classes_success.indexOf(class_name)==-1
          &&cssist.classes_fail.indexOf(class_name)==-1
        ){
          var result = cssist.make.classToStyleSheet(class_name);
          if(result){ cssist.classes_success.push(class_name); }
          else { cssist.classes_fail.push(class_name); }
        }
      }
    },
    rootElement : function(element){
      var self = this;
      if( element && typeof element === 'object' && element.nodeType && element.nodeType !== 8 && element.tagName ){
  			var element_childen = element.querySelectorAll(':not([cssist])');
  			self.element(element);
        if(mutationObserver){
          mutationObserver.observe(element, { attributes: true,  attributeFilter: ['class'] });
        }
  			for(var i = 0; i < element_childen.length; i++) {
          var element_child = element_childen[i];
          self.element(element_child);
          if(mutationObserver){
            mutationObserver.observe(element_child, { attributes: true,  attributeFilter: ['class'] });
          }
      	}
  		}
    }
  };
})();


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

window.cssist={};
__webpack_require__(5);
__webpack_require__(4);
// require('!style!css!./reset.css');
cssist.watch.start();


/***/ }
/******/ ]);