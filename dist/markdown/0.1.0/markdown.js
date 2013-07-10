/* 2013-04-11 */
define("markdown/0.1.0/markdown",[],function(e,t){function r(){return"Markdown.mk_block( "+uneval(""+this)+", "+uneval(this.trailing)+", "+uneval(this.lineNumber)+" )"}function n(){}function i(e){for(var t=0,r=-1;-1!==(r=e.indexOf("\n",r+1));)t++;return t}function l(e,t){function r(e){this.len_after=e,this.name="close_"+t}var n=e+"_state",i="strong"==e?"em_state":"strong_state";return function(l){if(this[n][0]==t)return this[n].shift(),[l.length,new r(l.length-t.length)];var a=this[i].slice(),s=this[n].slice();this[n].unshift(t);var o=this.processInline(l.substr(t.length)),c=o[o.length-1];if(this[n].shift(),c instanceof r){o.pop();var h=l.length-c.len_after;return[h,[e].concat(o)]}return this[i]=a,this[n]=s,[t.length,t]}}function s(e){for(var t=e.split(""),r=[""],n=!1;t.length;){var i=t.shift();switch(i){case" ":n?r[r.length-1]+=i:r.push("");break;case"'":case'"':n=!n;break;case"\\":i=t.shift();default:r[r.length-1]+=i}}return r}function o(e){return b(e)&&e.length>1&&"object"==typeof e[1]&&!b(e[1])?e[1]:void 0}function c(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function h(e){if("string"==typeof e)return c(e);var t=e.shift(),r={},n=[];for(!e.length||"object"!=typeof e[0]||e[0]instanceof Array||(r=e.shift());e.length;)n.push(arguments.callee(e.shift()));var i="";for(var l in r)i+=" "+l+'="'+c(r[l])+'"';return"img"==t||"br"==t||"hr"==t?"<"+t+i+"/>":"<"+t+i+">"+n.join("")+"</"+t+">"}function u(e,t,r){var n;r=r||{};var i=e.slice(0);"function"==typeof r.preprocessTreeNode&&(i=r.preprocessTreeNode(i,t));var l=o(i);if(l){i[1]={};for(n in l)i[1][n]=l[n];l=i[1]}if("string"==typeof i)return i;switch(i[0]){case"header":i[0]="h"+i[1].level,delete i[1].level;break;case"bulletlist":i[0]="ul";break;case"numberlist":i[0]="ol";break;case"listitem":i[0]="li";break;case"para":i[0]="p";break;case"markdown":i[0]="html",l&&delete l.references;break;case"code_block":i[0]="pre",n=l?2:1;var a=["code"];a.push.apply(a,i.splice(n)),i[n]=a;break;case"inlinecode":i[0]="code";break;case"img":i[1].src=i[1].href,delete i[1].href;break;case"linebreak":i[0]="br";break;case"link":i[0]="a";break;case"link_ref":i[0]="a";var s=t[l.ref];if(!s)return l.original;delete l.ref,l.href=s.href,s.title&&(l.title=s.title),delete l.original;break;case"img_ref":i[0]="img";var s=t[l.ref];if(!s)return l.original;delete l.ref,l.src=s.href,s.title&&(l.title=s.title),delete l.original}if(n=1,l){for(var c in i[1])n=2;1===n&&i.splice(n,1)}for(;i.length>n;++n)i[n]=arguments.callee(i[n],t,r);return i}function f(e){for(var t=o(e)?2:1;e.length>t;)"string"==typeof e[t]?e.length>t+1&&"string"==typeof e[t+1]?e[t]+=e.splice(t+1,1)[0]:++t:(arguments.callee(e[t]),++t)}var g=t,v=g.Markdown=function v(e){switch(typeof e){case"undefined":this.dialect=v.dialects.Gruber;break;case"object":this.dialect=e;break;default:if(!(e in v.dialects))throw Error("Unknown Markdown dialect '"+(e+"")+"'");this.dialect=v.dialects[e]}this.em_state=[],this.strong_state=[],this.debug_indent=""};g.parse=function(e,t){var r=new v(t);return r.toTree(e)},g.toHTML=function(e,t,r){var n=g.toHTMLTree(e,t,r);return g.renderJsonML(n)},g.toHTMLTree=function(e,t,r){"string"==typeof e&&(e=this.parse(e,t));var n=o(e),i={};n&&n.references&&(i=n.references);var l=u(e,i,r);return f(l),l};var d=v.mk_block=function(e,t,i){1==arguments.length&&(t="\n\n");var l=new String(e);return l.trailing=t,l.inspect=n,l.toSource=r,void 0!=i&&(l.lineNumber=i),l};v.prototype.split_blocks=function(e){var t,r=/([\s\S]+?)($|\n(?:\s*\n|$)+)/g,n=[],l=1;for(null!=(t=/^(\s*\n)/.exec(e))&&(l+=i(t[0]),r.lastIndex=t[0].length);null!==(t=r.exec(e));)n.push(d(t[1],t[2],l)),l+=i(t[0]);return n},v.prototype.processBlock=function(e,t){var r=this.dialect.block,n=r.__order__;if("__call__"in r)return r.__call__.call(this,e,t);for(var i=0;n.length>i;i++){var l=r[n[i]].call(this,e,t);if(l)return(!b(l)||l.length>0&&!b(l[0]))&&this.debug(n[i],"didn't return a proper array"),l}return[]},v.prototype.processInline=function(e){return this.dialect.inline.__call__.call(this,e+"")},v.prototype.toTree=function(e,t){var r=e instanceof Array?e:this.split_blocks(e),n=this.tree;try{for(this.tree=t||this.tree||["markdown"];r.length;){var i=this.processBlock(r.shift(),r);i.length&&this.tree.push.apply(this.tree,i)}return this.tree}finally{t&&(this.tree=n)}},v.prototype.debug=function(){var e=Array.prototype.slice.call(arguments);e.unshift(this.debug_indent),"undefined"!=typeof print&&print.apply(print,e),"undefined"!=typeof console&&console.log!==void 0&&console.log.apply(null,e)},v.prototype.loop_re_over_block=function(e,t,r){for(var n,i=t.valueOf();i.length&&null!=(n=e.exec(i));)i=i.substr(n[0].length),r.call(this,n);return i},v.dialects={},v.dialects.Gruber={block:{atxHeader:function(e,t){var r=e.match(/^(#{1,6})\s*(.*?)\s*#*\s*(?:\n|$)/);if(!r)return void 0;var n=["header",{level:r[1].length}];return Array.prototype.push.apply(n,this.processInline(r[2])),r[0].length<e.length&&t.unshift(d(e.substr(r[0].length),e.trailing,e.lineNumber+2)),[n]},setextHeader:function(e,t){var r=e.match(/^(.*)\n([-=])\2\2+(?:\n|$)/);if(!r)return void 0;var n="="===r[2]?1:2,i=["header",{level:n},r[1]];return r[0].length<e.length&&t.unshift(d(e.substr(r[0].length),e.trailing,e.lineNumber+2)),[i]},code:function(e,t){var r=[],n=/^(?: {0,3}\t| {4})(.*)\n?/;if(!e.match(n))return void 0;e:for(;;){var i=this.loop_re_over_block(n,e.valueOf(),function(e){r.push(e[1])});if(i.length){t.unshift(d(i,e.trailing));break e}if(!t.length)break e;if(!t[0].match(n))break e;r.push(e.trailing.replace(/[^\n]/g,"").substring(2)),e=t.shift()}return[["code_block",r.join("\n")]]},horizRule:function(e,t){var r=e.match(/^(?:([\s\S]*?)\n)?[ \t]*([-_*])(?:[ \t]*\2){2,}[ \t]*(?:\n([\s\S]*))?$/);if(!r)return void 0;var n=[["hr"]];return r[1]&&n.unshift.apply(n,this.processBlock(r[1],[])),r[3]&&t.unshift(d(r[3])),n},lists:function(){function e(e){return RegExp("(?:^("+o+"{0,"+e+"} {0,3})("+l+")\\s+)|"+"(^"+o+"{0,"+(e-1)+"}[ ]{0,4})")}function t(e){return e.replace(/ {0,3}\t/g,"    ")}function r(e,t,r,n){if(t)return e.push(["para"].concat(r)),void 0;var i=e[e.length-1]instanceof Array&&"para"==e[e.length-1][0]?e[e.length-1]:e;n&&e.length>1&&r.unshift(n);for(var l=0;r.length>l;l++){var a=r[l],s="string"==typeof a;s&&i.length>1&&"string"==typeof i[i.length-1]?i[i.length-1]+=a:i.push(a)}}function n(e,t){for(var r=RegExp("^("+o+"{"+e+"}.*?\\n?)*$"),n=RegExp("^"+o+"{"+e+"}","gm"),i=[];t.length>0;){if(r.exec(t[0])){var l=t.shift(),a=l.replace(n,"");i.push(d(a,l.trailing,l.lineNumber))}break}return i}function i(e,t,r){var n=e.list,i=n[n.length-1];if(!(i[1]instanceof Array&&"para"==i[1][0]))if(t+1==r.length)i.push(["para"].concat(i.splice(1)));else{var l=i.pop();i.push(["para"].concat(i.splice(1)),l)}}var l="[*+-]|\\d+\\.",a=/[*+-]/,s=RegExp("^( {0,3})("+l+")[ 	]+"),o="(?: {0,3}\\t| {4})";return function(l,o){function c(e){var t=a.exec(e[2])?["bulletlist"]:["numberlist"];return p.push({list:t,indent:e[1]}),t}var h=l.match(s);if(!h)return void 0;for(var u,f,p=[],g=c(h),v=!1,d=[p[0].list];;){for(var b=l.split(/(?=\n)/),k="",m=0;b.length>m;m++){var y="",w=b[m].replace(/^\n/,function(e){return y=e,""}),M=e(p.length);if(h=w.match(M),void 0!==h[1]){k.length&&(r(u,v,this.processInline(k),y),v=!1,k=""),h[1]=t(h[1]);var x=Math.floor(h[1].length/4)+1;if(x>p.length)g=c(h),u.push(g),u=g[1]=["listitem"];else{var $=!1;for(f=0;p.length>f;f++)if(p[f].indent==h[1]){g=p[f].list,p.splice(f+1),$=!0;break}$||(x++,p.length>=x?(p.splice(x),g=p[x-1].list):(g=c(h),u.push(g))),u=["listitem"],g.push(u)}y=""}w.length>h[0].length&&(k+=y+w.substr(h[0].length))}k.length&&(r(u,v,this.processInline(k),y),v=!1,k="");var S=n(p.length,o);S.length>0&&(_(p,i,this),u.push.apply(u,this.toTree(S,[])));var j=o[0]&&o[0].valueOf()||"";if(!j.match(s)&&!j.match(/^ /))break;l=o.shift();var A=this.dialect.block.horizRule(l,o);if(A){d.push.apply(d,A);break}_(p,i,this),v=!0}return d}}(),blockquote:function(e,t){if(!e.match(/^>/m))return void 0;var r=[];if(">"!=e[0]){for(var n=e.split(/\n/),i=[];n.length&&">"!=n[0][0];)i.push(n.shift());e=n.join("\n"),r.push.apply(r,this.processBlock(i.join("\n"),[]))}for(;t.length&&">"==t[0][0];){var l=t.shift();e=new String(e+e.trailing+l),e.trailing=l.trailing}var a=e.replace(/^> ?/gm,"");return this.tree,r.push(this.toTree(a,["blockquote"])),r},referenceDefn:function(e,t){var r=/^\s*\[(.*?)\]:\s*(\S+)(?:\s+(?:(['"])(.*?)\3|\((.*?)\)))?\n?/;if(!e.match(r))return void 0;o(this.tree)||this.tree.splice(1,0,{});var n=o(this.tree);void 0===n.references&&(n.references={});var i=this.loop_re_over_block(r,e,function(e){e[2]&&"<"==e[2][0]&&">"==e[2][e[2].length-1]&&(e[2]=e[2].substring(1,e[2].length-1));var t=n.references[e[1].toLowerCase()]={href:e[2]};void 0!==e[4]?t.title=e[4]:void 0!==e[5]&&(t.title=e[5])});return i.length&&t.unshift(d(i,e.trailing)),[]},para:function(e){return[["para"].concat(this.processInline(e))]}}},v.dialects.Gruber.inline={__oneElement__:function(e,t,r){var n,i;t=t||this.dialect.inline.__patterns__;var l=RegExp("([\\s\\S]*?)("+(t.source||t)+")");if(n=l.exec(e),!n)return[e.length,e];if(n[1])return[n[1].length,n[1]];var i;return n[2]in this.dialect.inline&&(i=this.dialect.inline[n[2]].call(this,e.substr(n.index),n,r||[])),i=i||[n[2].length,n[2]]},__call__:function(e,t){function r(e){"string"==typeof e&&"string"==typeof i[i.length-1]?i[i.length-1]+=e:i.push(e)}for(var n,i=[];e.length>0;)n=this.dialect.inline.__oneElement__.call(this,e,t,i),e=e.substr(n.shift()),_(n,r);return i},"]":function(){},"}":function(){},"\\":function(e){return e.match(/^\\[\\`\*_{}\[\]()#\+.!\-]/)?[2,e[1]]:[1,"\\"]},"![":function(e){var t=e.match(/^!\[(.*?)\][ \t]*\([ \t]*(\S*)(?:[ \t]+(["'])(.*?)\3)?[ \t]*\)/);if(t){t[2]&&"<"==t[2][0]&&">"==t[2][t[2].length-1]&&(t[2]=t[2].substring(1,t[2].length-1)),t[2]=this.dialect.inline.__call__.call(this,t[2],/\\/)[0];var r={alt:t[1],href:t[2]||""};return void 0!==t[4]&&(r.title=t[4]),[t[0].length,["img",r]]}return t=e.match(/^!\[(.*?)\][ \t]*\[(.*?)\]/),t?[t[0].length,["img_ref",{alt:t[1],ref:t[2].toLowerCase(),original:t[0]}]]:[2,"!["]},"[":function(e){var t=e+"",r=v.DialectHelpers.inline_until_char.call(this,e.substr(1),"]");if(!r)return[1,"["];var n,i,l=1+r[0],a=r[1];e=e.substr(l);var s=e.match(/^\s*\([ \t]*(\S+)(?:[ \t]+(["'])(.*?)\2)?[ \t]*\)/);if(s){var o=s[1];if(l+=s[0].length,o&&"<"==o[0]&&">"==o[o.length-1]&&(o=o.substring(1,o.length-1)),!s[3])for(var c=1,h=0;o.length>h;h++)switch(o[h]){case"(":c++;break;case")":0==--c&&(l-=o.length-h,o=o.substring(0,h))}return o=this.dialect.inline.__call__.call(this,o,/\\/)[0],i={href:o||""},void 0!==s[3]&&(i.title=s[3]),n=["link",i].concat(a),[l,n]}return s=e.match(/^\s*\[(.*?)\]/),s?(l+=s[0].length,i={ref:(s[1]||a+"").toLowerCase(),original:t.substr(0,l)},n=["link_ref",i].concat(a),[l,n]):1==a.length&&"string"==typeof a[0]?(i={ref:a[0].toLowerCase(),original:t.substr(0,l)},n=["link_ref",i,a[0]],[l,n]):[1,"["]},"<":function(e){var t;return null!=(t=e.match(/^<(?:((https?|ftp|mailto):[^>]+)|(.*?@.*?\.[a-zA-Z]+))>/))?t[3]?[t[0].length,["link",{href:"mailto:"+t[3]},t[3]]]:"mailto"==t[2]?[t[0].length,["link",{href:t[1]},t[1].substr("mailto:".length)]]:[t[0].length,["link",{href:t[1]},t[1]]]:[1,"<"]},"`":function(e){var t=e.match(/(`+)(([\s\S]*?)\1)/);return t&&t[2]?[t[1].length+t[2].length,["inlinecode",t[3]]]:[1,"`"]},"  \n":function(){return[3,["linebreak"]]}},v.dialects.Gruber.inline["**"]=l("strong","**"),v.dialects.Gruber.inline.__=l("strong","__"),v.dialects.Gruber.inline["*"]=l("em","*"),v.dialects.Gruber.inline._=l("em","_"),v.buildBlockOrder=function(e){var t=[];for(var r in e)"__order__"!=r&&"__call__"!=r&&t.push(r);e.__order__=t},v.buildInlinePatterns=function(e){var t=[];for(var r in e)if(!r.match(/^__.*__$/)){var n=r.replace(/([\\.*+?|()\[\]{}])/g,"\\$1").replace(/\n/,"\\n");t.push(1==r.length?n:"(?:"+n+")")}t=t.join("|"),e.__patterns__=t;var i=e.__call__;e.__call__=function(e,r){return void 0!=r?i.call(this,e,r):i.call(this,e,t)}},v.DialectHelpers={},v.DialectHelpers.inline_until_char=function(e,t){for(var r=0,n=[];;){if(e[r]==t)return r++,[r,n];if(r>=e.length)return null;var i=this.dialect.inline.__oneElement__.call(this,e.substr(r));r+=i[0],n.push.apply(n,i.slice(1))}},v.subclassDialect=function(e){function t(){}function r(){}return t.prototype=e.block,r.prototype=e.inline,{block:new t,inline:new r}},v.buildBlockOrder(v.dialects.Gruber.block),v.buildInlinePatterns(v.dialects.Gruber.inline),v.dialects.Maruku=v.subclassDialect(v.dialects.Gruber),v.dialects.Maruku.processMetaHash=function(e){for(var t=s(e),r={},n=0;t.length>n;++n)if(/^#/.test(t[n]))r.id=t[n].substring(1);else if(/^\./.test(t[n]))r["class"]=r["class"]?r["class"]+t[n].replace(/./," "):t[n].substring(1);else if(/\=/.test(t[n])){var i=t[n].split(/\=/);r[i[0]]=i[1]}return r},v.dialects.Maruku.block.document_meta=function(e){if(e.lineNumber>1)return void 0;if(!e.match(/^(?:\w+:.*\n)*\w+:.*$/))return void 0;o(this.tree)||this.tree.splice(1,0,{});var t=e.split(/\n/);for(p in t){var r=t[p].match(/(\w+):\s*(.*)$/),n=r[1].toLowerCase(),i=r[2];this.tree[1][n]=i}return[]},v.dialects.Maruku.block.block_meta=function(e){var t=e.match(/(^|\n) {0,3}\{:\s*((?:\\\}|[^\}])*)\s*\}$/);if(!t)return void 0;var r,n=this.dialect.processMetaHash(t[2]);if(""===t[1]){var i=this.tree[this.tree.length-1];if(r=o(i),"string"==typeof i)return void 0;r||(r={},i.splice(1,0,r));for(a in n)r[a]=n[a];return[]}var l=e.replace(/\n.*$/,""),s=this.processBlock(l,[]);r=o(s[0]),r||(r={},s[0].splice(1,0,r));for(a in n)r[a]=n[a];return s},v.dialects.Maruku.block.definition_list=function(e,t){var r,n=/^((?:[^\s:].*\n)+):\s+([\s\S]+)$/,i=["dl"];if(!(s=e.match(n)))return void 0;for(var l=[e];t.length&&n.exec(t[0]);)l.push(t.shift());for(var a=0;l.length>a;++a){var s=l[a].match(n),o=s[1].replace(/\n$/,"").split(/\n/),c=s[2].split(/\n:\s+/);for(r=0;o.length>r;++r)i.push(["dt",o[r]]);for(r=0;c.length>r;++r)i.push(["dd"].concat(this.processInline(c[r].replace(/(\n)\s+/,"$1"))))}return[i]},v.dialects.Maruku.inline["{:"]=function(e,t,r){if(!r.length)return[2,"{:"];var n=r[r.length-1];if("string"==typeof n)return[2,"{:"];var i=e.match(/^\{:\s*((?:\\\}|[^\}])*)\s*\}/);if(!i)return[2,"{:"];var l=this.dialect.processMetaHash(i[1]),a=o(n);a||(a={},n.splice(1,0,a));for(var s in l)a[s]=l[s];return[i[0].length,""]},v.buildBlockOrder(v.dialects.Maruku.block),v.buildInlinePatterns(v.dialects.Maruku.inline);var _,b=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)};_=Array.prototype.forEach?function(e,t,r){return e.forEach(t,r)}:function(e,t,r){for(var n=0;e.length>n;n++)t.call(r||e,e[n],n,e)},g.renderJsonML=function(e,t){t=t||{},t.root=t.root||!1;var r=[];if(t.root)r.push(h(e));else for(e.shift(),!e.length||"object"!=typeof e[0]||e[0]instanceof Array||e.shift();e.length;)r.push(h(e.shift()));return r.join("\n\n")}});