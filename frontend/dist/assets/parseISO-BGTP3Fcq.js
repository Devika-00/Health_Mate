var ue=Object.defineProperty;var ce=(s,n,e)=>n in s?ue(s,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[n]=e;var o=(s,n,e)=>(ce(s,typeof n!="symbol"?n+"":n,e),e);import{t as m,e as b,m as H,a as E,j as R,k as le,n as de,b as C,o as ee,p as fe,h as we,q as te,r as he,l as J,u as ye,w as S,v as xe}from"./format-HzG6idBM.js";function Q(s,n){const e=m(s);return isNaN(n)?b(s,NaN):(n&&e.setDate(e.getDate()+n),e)}function re(s,n){const e=m(s);if(isNaN(n))return b(s,NaN);if(!n)return e;const t=e.getDate(),r=b(s,e.getTime());r.setMonth(e.getMonth()+n+1,0);const a=r.getDate();return t>=a?r:(e.setFullYear(r.getFullYear(),r.getMonth(),t),e)}function v(s,n){const e=+m(s);return b(s,e+n)}function It(s,n){return v(s,n*H)}function Ht(s,n){return v(s,n*E)}function Et(s,n){const e=n*3;return re(s,e)}function qt(s,n){return v(s,n*1e3)}function Lt(s,n){const e=n*7;return Q(s,e)}function Ct(s,n){return re(s,n*12)}function Rt(s,n){const e=m(s),t=m(n),r=e.getFullYear()-t.getFullYear(),a=e.getMonth()-t.getMonth();return r*12+a}function Qt(s,n){const e=m(s),t=m(n);return e.getFullYear()-t.getFullYear()}function vt(s){const n=m(s);return n.setHours(23,59,59,999),n}function Wt(s){const n=m(s),e=n.getMonth();return n.setFullYear(n.getFullYear(),e+1,0),n.setHours(23,59,59,999),n}function Ft(s){const n=m(s),e=n.getMonth(),t=e-e%3;return n.setMonth(t,1),n.setHours(0,0,0,0),n}function Bt(s){const n=m(s);return n.setDate(1),n.setHours(0,0,0,0),n}function Gt(s){const n=m(s),e=n.getFullYear();return n.setFullYear(e+1,0,0),n.setHours(23,59,59,999),n}function zt(s,n){var d,l,p,M;const e=R(),t=(n==null?void 0:n.weekStartsOn)??((l=(d=n==null?void 0:n.locale)==null?void 0:d.options)==null?void 0:l.weekStartsOn)??e.weekStartsOn??((M=(p=e.locale)==null?void 0:p.options)==null?void 0:M.weekStartsOn)??0,r=m(s),a=r.getDay(),i=(a<t?-7:0)+6-(a-t);return r.setDate(r.getDate()+i),r.setHours(23,59,59,999),r}function me(){return Object.assign({},R())}function be(s){let e=m(s).getDay();return e===0&&(e=7),e}function pe(s,n){const e=n instanceof Date?b(n,0):new n(0);return e.setFullYear(s.getFullYear(),s.getMonth(),s.getDate()),e.setHours(s.getHours(),s.getMinutes(),s.getSeconds(),s.getMilliseconds()),e}const Te=10;class ne{constructor(){o(this,"subPriority",0)}validate(n,e){return!0}}class ge extends ne{constructor(n,e,t,r,a){super(),this.value=n,this.validateValue=e,this.setValue=t,this.priority=r,a&&(this.subPriority=a)}validate(n,e){return this.validateValue(n,this.value,e)}set(n,e,t){return this.setValue(n,e,this.value,t)}}class De extends ne{constructor(){super(...arguments);o(this,"priority",Te);o(this,"subPriority",-1)}set(e,t){return t.timestampIsSet?e:b(e,pe(e,Date))}}class c{run(n,e,t,r){const a=this.parse(n,e,t,r);return a?{setter:new ge(a.value,this.validate,this.set,this.priority,this.subPriority),rest:a.rest}:null}validate(n,e,t){return!0}}class ke extends c{constructor(){super(...arguments);o(this,"priority",140);o(this,"incompatibleTokens",["R","u","t","T"])}parse(e,t,r){switch(t){case"G":case"GG":case"GGG":return r.era(e,{width:"abbreviated"})||r.era(e,{width:"narrow"});case"GGGGG":return r.era(e,{width:"narrow"});case"GGGG":default:return r.era(e,{width:"wide"})||r.era(e,{width:"abbreviated"})||r.era(e,{width:"narrow"})}}set(e,t,r){return t.era=r,e.setFullYear(r,0,1),e.setHours(0,0,0,0),e}}const y={month:/^(1[0-2]|0?\d)/,date:/^(3[0-1]|[0-2]?\d)/,dayOfYear:/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,week:/^(5[0-3]|[0-4]?\d)/,hour23h:/^(2[0-3]|[0-1]?\d)/,hour24h:/^(2[0-4]|[0-1]?\d)/,hour11h:/^(1[0-1]|0?\d)/,hour12h:/^(1[0-2]|0?\d)/,minute:/^[0-5]?\d/,second:/^[0-5]?\d/,singleDigit:/^\d/,twoDigits:/^\d{1,2}/,threeDigits:/^\d{1,3}/,fourDigits:/^\d{1,4}/,anyDigitsSigned:/^-?\d+/,singleDigitSigned:/^-?\d/,twoDigitsSigned:/^-?\d{1,2}/,threeDigitsSigned:/^-?\d{1,3}/,fourDigitsSigned:/^-?\d{1,4}/},g={basicOptionalMinutes:/^([+-])(\d{2})(\d{2})?|Z/,basic:/^([+-])(\d{2})(\d{2})|Z/,basicOptionalSeconds:/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,extended:/^([+-])(\d{2}):(\d{2})|Z/,extendedOptionalSeconds:/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/};function x(s,n){return s&&{value:n(s.value),rest:s.rest}}function f(s,n){const e=n.match(s);return e?{value:parseInt(e[0],10),rest:n.slice(e[0].length)}:null}function D(s,n){const e=n.match(s);if(!e)return null;if(e[0]==="Z")return{value:0,rest:n.slice(1)};const t=e[1]==="+"?1:-1,r=e[2]?parseInt(e[2],10):0,a=e[3]?parseInt(e[3],10):0,i=e[5]?parseInt(e[5],10):0;return{value:t*(r*H+a*E+i*le),rest:n.slice(e[0].length)}}function se(s){return f(y.anyDigitsSigned,s)}function h(s,n){switch(s){case 1:return f(y.singleDigit,n);case 2:return f(y.twoDigits,n);case 3:return f(y.threeDigits,n);case 4:return f(y.fourDigits,n);default:return f(new RegExp("^\\d{1,"+s+"}"),n)}}function I(s,n){switch(s){case 1:return f(y.singleDigitSigned,n);case 2:return f(y.twoDigitsSigned,n);case 3:return f(y.threeDigitsSigned,n);case 4:return f(y.fourDigitsSigned,n);default:return f(new RegExp("^-?\\d{1,"+s+"}"),n)}}function W(s){switch(s){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;case"am":case"midnight":case"night":default:return 0}}function ae(s,n){const e=n>0,t=e?n:1-n;let r;if(t<=50)r=s||100;else{const a=t+50,i=Math.trunc(a/100)*100,d=s>=a%100;r=s+i-(d?100:0)}return e?r:1-r}function oe(s){return s%400===0||s%4===0&&s%100!==0}class Me extends c{constructor(){super(...arguments);o(this,"priority",130);o(this,"incompatibleTokens",["Y","R","u","w","I","i","e","c","t","T"])}parse(e,t,r){const a=i=>({year:i,isTwoDigitYear:t==="yy"});switch(t){case"y":return x(h(4,e),a);case"yo":return x(r.ordinalNumber(e,{unit:"year"}),a);default:return x(h(t.length,e),a)}}validate(e,t){return t.isTwoDigitYear||t.year>0}set(e,t,r){const a=e.getFullYear();if(r.isTwoDigitYear){const d=ae(r.year,a);return e.setFullYear(d,0,1),e.setHours(0,0,0,0),e}const i=!("era"in t)||t.era===1?r.year:1-r.year;return e.setFullYear(i,0,1),e.setHours(0,0,0,0),e}}class Ye extends c{constructor(){super(...arguments);o(this,"priority",130);o(this,"incompatibleTokens",["y","R","u","Q","q","M","L","I","d","D","i","t","T"])}parse(e,t,r){const a=i=>({year:i,isTwoDigitYear:t==="YY"});switch(t){case"Y":return x(h(4,e),a);case"Yo":return x(r.ordinalNumber(e,{unit:"year"}),a);default:return x(h(t.length,e),a)}}validate(e,t){return t.isTwoDigitYear||t.year>0}set(e,t,r,a){const i=de(e,a);if(r.isTwoDigitYear){const l=ae(r.year,i);return e.setFullYear(l,0,a.firstWeekContainsDate),e.setHours(0,0,0,0),C(e,a)}const d=!("era"in t)||t.era===1?r.year:1-r.year;return e.setFullYear(d,0,a.firstWeekContainsDate),e.setHours(0,0,0,0),C(e,a)}}class Ne extends c{constructor(){super(...arguments);o(this,"priority",130);o(this,"incompatibleTokens",["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"])}parse(e,t){return I(t==="R"?4:t.length,e)}set(e,t,r){const a=b(e,0);return a.setFullYear(r,0,4),a.setHours(0,0,0,0),ee(a)}}class _e extends c{constructor(){super(...arguments);o(this,"priority",130);o(this,"incompatibleTokens",["G","y","Y","R","w","I","i","e","c","t","T"])}parse(e,t){return I(t==="u"?4:t.length,e)}set(e,t,r){return e.setFullYear(r,0,1),e.setHours(0,0,0,0),e}}class Pe extends c{constructor(){super(...arguments);o(this,"priority",120);o(this,"incompatibleTokens",["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"])}parse(e,t,r){switch(t){case"Q":case"QQ":return h(t.length,e);case"Qo":return r.ordinalNumber(e,{unit:"quarter"});case"QQQ":return r.quarter(e,{width:"abbreviated",context:"formatting"})||r.quarter(e,{width:"narrow",context:"formatting"});case"QQQQQ":return r.quarter(e,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(e,{width:"wide",context:"formatting"})||r.quarter(e,{width:"abbreviated",context:"formatting"})||r.quarter(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=1&&t<=4}set(e,t,r){return e.setMonth((r-1)*3,1),e.setHours(0,0,0,0),e}}class Oe extends c{constructor(){super(...arguments);o(this,"priority",120);o(this,"incompatibleTokens",["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"])}parse(e,t,r){switch(t){case"q":case"qq":return h(t.length,e);case"qo":return r.ordinalNumber(e,{unit:"quarter"});case"qqq":return r.quarter(e,{width:"abbreviated",context:"standalone"})||r.quarter(e,{width:"narrow",context:"standalone"});case"qqqqq":return r.quarter(e,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(e,{width:"wide",context:"standalone"})||r.quarter(e,{width:"abbreviated",context:"standalone"})||r.quarter(e,{width:"narrow",context:"standalone"})}}validate(e,t){return t>=1&&t<=4}set(e,t,r){return e.setMonth((r-1)*3,1),e.setHours(0,0,0,0),e}}class Ie extends c{constructor(){super(...arguments);o(this,"incompatibleTokens",["Y","R","q","Q","L","w","I","D","i","e","c","t","T"]);o(this,"priority",110)}parse(e,t,r){const a=i=>i-1;switch(t){case"M":return x(f(y.month,e),a);case"MM":return x(h(2,e),a);case"Mo":return x(r.ordinalNumber(e,{unit:"month"}),a);case"MMM":return r.month(e,{width:"abbreviated",context:"formatting"})||r.month(e,{width:"narrow",context:"formatting"});case"MMMMM":return r.month(e,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(e,{width:"wide",context:"formatting"})||r.month(e,{width:"abbreviated",context:"formatting"})||r.month(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=0&&t<=11}set(e,t,r){return e.setMonth(r,1),e.setHours(0,0,0,0),e}}class He extends c{constructor(){super(...arguments);o(this,"priority",110);o(this,"incompatibleTokens",["Y","R","q","Q","M","w","I","D","i","e","c","t","T"])}parse(e,t,r){const a=i=>i-1;switch(t){case"L":return x(f(y.month,e),a);case"LL":return x(h(2,e),a);case"Lo":return x(r.ordinalNumber(e,{unit:"month"}),a);case"LLL":return r.month(e,{width:"abbreviated",context:"standalone"})||r.month(e,{width:"narrow",context:"standalone"});case"LLLLL":return r.month(e,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(e,{width:"wide",context:"standalone"})||r.month(e,{width:"abbreviated",context:"standalone"})||r.month(e,{width:"narrow",context:"standalone"})}}validate(e,t){return t>=0&&t<=11}set(e,t,r){return e.setMonth(r,1),e.setHours(0,0,0,0),e}}function Ee(s,n,e){const t=m(s),r=fe(t,e)-n;return t.setDate(t.getDate()-r*7),t}class qe extends c{constructor(){super(...arguments);o(this,"priority",100);o(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","i","t","T"])}parse(e,t,r){switch(t){case"w":return f(y.week,e);case"wo":return r.ordinalNumber(e,{unit:"week"});default:return h(t.length,e)}}validate(e,t){return t>=1&&t<=53}set(e,t,r,a){return C(Ee(e,r,a),a)}}function Le(s,n){const e=m(s),t=we(e)-n;return e.setDate(e.getDate()-t*7),e}class Ce extends c{constructor(){super(...arguments);o(this,"priority",100);o(this,"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"])}parse(e,t,r){switch(t){case"I":return f(y.week,e);case"Io":return r.ordinalNumber(e,{unit:"week"});default:return h(t.length,e)}}validate(e,t){return t>=1&&t<=53}set(e,t,r){return ee(Le(e,r))}}const Re=[31,28,31,30,31,30,31,31,30,31,30,31],Qe=[31,29,31,30,31,30,31,31,30,31,30,31];class ve extends c{constructor(){super(...arguments);o(this,"priority",90);o(this,"subPriority",1);o(this,"incompatibleTokens",["Y","R","q","Q","w","I","D","i","e","c","t","T"])}parse(e,t,r){switch(t){case"d":return f(y.date,e);case"do":return r.ordinalNumber(e,{unit:"date"});default:return h(t.length,e)}}validate(e,t){const r=e.getFullYear(),a=oe(r),i=e.getMonth();return a?t>=1&&t<=Qe[i]:t>=1&&t<=Re[i]}set(e,t,r){return e.setDate(r),e.setHours(0,0,0,0),e}}class We extends c{constructor(){super(...arguments);o(this,"priority",90);o(this,"subpriority",1);o(this,"incompatibleTokens",["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"])}parse(e,t,r){switch(t){case"D":case"DD":return f(y.dayOfYear,e);case"Do":return r.ordinalNumber(e,{unit:"date"});default:return h(t.length,e)}}validate(e,t){const r=e.getFullYear();return oe(r)?t>=1&&t<=366:t>=1&&t<=365}set(e,t,r){return e.setMonth(0,r),e.setHours(0,0,0,0),e}}function F(s,n,e){var Y,P,k,N;const t=R(),r=(e==null?void 0:e.weekStartsOn)??((P=(Y=e==null?void 0:e.locale)==null?void 0:Y.options)==null?void 0:P.weekStartsOn)??t.weekStartsOn??((N=(k=t.locale)==null?void 0:k.options)==null?void 0:N.weekStartsOn)??0,a=m(s),i=a.getDay(),l=(n%7+7)%7,p=7-r,M=n<0||n>6?n-(i+p)%7:(l+p)%7-(i+p)%7;return Q(a,M)}class Fe extends c{constructor(){super(...arguments);o(this,"priority",90);o(this,"incompatibleTokens",["D","i","e","c","t","T"])}parse(e,t,r){switch(t){case"E":case"EE":case"EEE":return r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"EEEEE":return r.day(e,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"EEEE":default:return r.day(e,{width:"wide",context:"formatting"})||r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=0&&t<=6}set(e,t,r,a){return e=F(e,r,a),e.setHours(0,0,0,0),e}}class Be extends c{constructor(){super(...arguments);o(this,"priority",90);o(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"])}parse(e,t,r,a){const i=d=>{const l=Math.floor((d-1)/7)*7;return(d+a.weekStartsOn+6)%7+l};switch(t){case"e":case"ee":return x(h(t.length,e),i);case"eo":return x(r.ordinalNumber(e,{unit:"day"}),i);case"eee":return r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"eeeee":return r.day(e,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"});case"eeee":default:return r.day(e,{width:"wide",context:"formatting"})||r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"})}}validate(e,t){return t>=0&&t<=6}set(e,t,r,a){return e=F(e,r,a),e.setHours(0,0,0,0),e}}class Ge extends c{constructor(){super(...arguments);o(this,"priority",90);o(this,"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"])}parse(e,t,r,a){const i=d=>{const l=Math.floor((d-1)/7)*7;return(d+a.weekStartsOn+6)%7+l};switch(t){case"c":case"cc":return x(h(t.length,e),i);case"co":return x(r.ordinalNumber(e,{unit:"day"}),i);case"ccc":return r.day(e,{width:"abbreviated",context:"standalone"})||r.day(e,{width:"short",context:"standalone"})||r.day(e,{width:"narrow",context:"standalone"});case"ccccc":return r.day(e,{width:"narrow",context:"standalone"});case"cccccc":return r.day(e,{width:"short",context:"standalone"})||r.day(e,{width:"narrow",context:"standalone"});case"cccc":default:return r.day(e,{width:"wide",context:"standalone"})||r.day(e,{width:"abbreviated",context:"standalone"})||r.day(e,{width:"short",context:"standalone"})||r.day(e,{width:"narrow",context:"standalone"})}}validate(e,t){return t>=0&&t<=6}set(e,t,r,a){return e=F(e,r,a),e.setHours(0,0,0,0),e}}function ze(s,n){const e=m(s),t=be(e),r=n-t;return Q(e,r)}class Ae extends c{constructor(){super(...arguments);o(this,"priority",90);o(this,"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"])}parse(e,t,r){const a=i=>i===0?7:i;switch(t){case"i":case"ii":return h(t.length,e);case"io":return r.ordinalNumber(e,{unit:"day"});case"iii":return x(r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"}),a);case"iiiii":return x(r.day(e,{width:"narrow",context:"formatting"}),a);case"iiiiii":return x(r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"}),a);case"iiii":default:return x(r.day(e,{width:"wide",context:"formatting"})||r.day(e,{width:"abbreviated",context:"formatting"})||r.day(e,{width:"short",context:"formatting"})||r.day(e,{width:"narrow",context:"formatting"}),a)}}validate(e,t){return t>=1&&t<=7}set(e,t,r){return e=ze(e,r),e.setHours(0,0,0,0),e}}class Xe extends c{constructor(){super(...arguments);o(this,"priority",80);o(this,"incompatibleTokens",["b","B","H","k","t","T"])}parse(e,t,r){switch(t){case"a":case"aa":case"aaa":return r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"});case"aaaaa":return r.dayPeriod(e,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(e,{width:"wide",context:"formatting"})||r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,t,r){return e.setHours(W(r),0,0,0),e}}class Ue extends c{constructor(){super(...arguments);o(this,"priority",80);o(this,"incompatibleTokens",["a","B","H","k","t","T"])}parse(e,t,r){switch(t){case"b":case"bb":case"bbb":return r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"});case"bbbbb":return r.dayPeriod(e,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(e,{width:"wide",context:"formatting"})||r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,t,r){return e.setHours(W(r),0,0,0),e}}class Ze extends c{constructor(){super(...arguments);o(this,"priority",80);o(this,"incompatibleTokens",["a","b","t","T"])}parse(e,t,r){switch(t){case"B":case"BB":case"BBB":return r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"});case"BBBBB":return r.dayPeriod(e,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(e,{width:"wide",context:"formatting"})||r.dayPeriod(e,{width:"abbreviated",context:"formatting"})||r.dayPeriod(e,{width:"narrow",context:"formatting"})}}set(e,t,r){return e.setHours(W(r),0,0,0),e}}class $e extends c{constructor(){super(...arguments);o(this,"priority",70);o(this,"incompatibleTokens",["H","K","k","t","T"])}parse(e,t,r){switch(t){case"h":return f(y.hour12h,e);case"ho":return r.ordinalNumber(e,{unit:"hour"});default:return h(t.length,e)}}validate(e,t){return t>=1&&t<=12}set(e,t,r){const a=e.getHours()>=12;return a&&r<12?e.setHours(r+12,0,0,0):!a&&r===12?e.setHours(0,0,0,0):e.setHours(r,0,0,0),e}}class Ke extends c{constructor(){super(...arguments);o(this,"priority",70);o(this,"incompatibleTokens",["a","b","h","K","k","t","T"])}parse(e,t,r){switch(t){case"H":return f(y.hour23h,e);case"Ho":return r.ordinalNumber(e,{unit:"hour"});default:return h(t.length,e)}}validate(e,t){return t>=0&&t<=23}set(e,t,r){return e.setHours(r,0,0,0),e}}class Ve extends c{constructor(){super(...arguments);o(this,"priority",70);o(this,"incompatibleTokens",["h","H","k","t","T"])}parse(e,t,r){switch(t){case"K":return f(y.hour11h,e);case"Ko":return r.ordinalNumber(e,{unit:"hour"});default:return h(t.length,e)}}validate(e,t){return t>=0&&t<=11}set(e,t,r){return e.getHours()>=12&&r<12?e.setHours(r+12,0,0,0):e.setHours(r,0,0,0),e}}class je extends c{constructor(){super(...arguments);o(this,"priority",70);o(this,"incompatibleTokens",["a","b","h","H","K","t","T"])}parse(e,t,r){switch(t){case"k":return f(y.hour24h,e);case"ko":return r.ordinalNumber(e,{unit:"hour"});default:return h(t.length,e)}}validate(e,t){return t>=1&&t<=24}set(e,t,r){const a=r<=24?r%24:r;return e.setHours(a,0,0,0),e}}class Je extends c{constructor(){super(...arguments);o(this,"priority",60);o(this,"incompatibleTokens",["t","T"])}parse(e,t,r){switch(t){case"m":return f(y.minute,e);case"mo":return r.ordinalNumber(e,{unit:"minute"});default:return h(t.length,e)}}validate(e,t){return t>=0&&t<=59}set(e,t,r){return e.setMinutes(r,0,0),e}}class Se extends c{constructor(){super(...arguments);o(this,"priority",50);o(this,"incompatibleTokens",["t","T"])}parse(e,t,r){switch(t){case"s":return f(y.second,e);case"so":return r.ordinalNumber(e,{unit:"second"});default:return h(t.length,e)}}validate(e,t){return t>=0&&t<=59}set(e,t,r){return e.setSeconds(r,0),e}}class et extends c{constructor(){super(...arguments);o(this,"priority",30);o(this,"incompatibleTokens",["t","T"])}parse(e,t){const r=a=>Math.trunc(a*Math.pow(10,-t.length+3));return x(h(t.length,e),r)}set(e,t,r){return e.setMilliseconds(r),e}}class tt extends c{constructor(){super(...arguments);o(this,"priority",10);o(this,"incompatibleTokens",["t","T","x"])}parse(e,t){switch(t){case"X":return D(g.basicOptionalMinutes,e);case"XX":return D(g.basic,e);case"XXXX":return D(g.basicOptionalSeconds,e);case"XXXXX":return D(g.extendedOptionalSeconds,e);case"XXX":default:return D(g.extended,e)}}set(e,t,r){return t.timestampIsSet?e:b(e,e.getTime()-te(e)-r)}}class rt extends c{constructor(){super(...arguments);o(this,"priority",10);o(this,"incompatibleTokens",["t","T","X"])}parse(e,t){switch(t){case"x":return D(g.basicOptionalMinutes,e);case"xx":return D(g.basic,e);case"xxxx":return D(g.basicOptionalSeconds,e);case"xxxxx":return D(g.extendedOptionalSeconds,e);case"xxx":default:return D(g.extended,e)}}set(e,t,r){return t.timestampIsSet?e:b(e,e.getTime()-te(e)-r)}}class nt extends c{constructor(){super(...arguments);o(this,"priority",40);o(this,"incompatibleTokens","*")}parse(e){return se(e)}set(e,t,r){return[b(e,r*1e3),{timestampIsSet:!0}]}}class st extends c{constructor(){super(...arguments);o(this,"priority",20);o(this,"incompatibleTokens","*")}parse(e){return se(e)}set(e,t,r){return[b(e,r),{timestampIsSet:!0}]}}const at={G:new ke,y:new Me,Y:new Ye,R:new Ne,u:new _e,Q:new Pe,q:new Oe,M:new Ie,L:new He,w:new qe,I:new Ce,d:new ve,D:new We,E:new Fe,e:new Be,c:new Ge,i:new Ae,a:new Xe,b:new Ue,B:new Ze,h:new $e,H:new Ke,K:new Ve,k:new je,m:new Je,s:new Se,S:new et,X:new tt,x:new rt,t:new nt,T:new st},ot=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,it=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ut=/^'([^]*?)'?$/,ct=/''/g,lt=/\S/,dt=/[a-zA-Z]/;function At(s,n,e,t){var B,G,z,A,X,U,Z,$;const r=me(),a=(t==null?void 0:t.locale)??r.locale??he,i=(t==null?void 0:t.firstWeekContainsDate)??((G=(B=t==null?void 0:t.locale)==null?void 0:B.options)==null?void 0:G.firstWeekContainsDate)??r.firstWeekContainsDate??((A=(z=r.locale)==null?void 0:z.options)==null?void 0:A.firstWeekContainsDate)??1,d=(t==null?void 0:t.weekStartsOn)??((U=(X=t==null?void 0:t.locale)==null?void 0:X.options)==null?void 0:U.weekStartsOn)??r.weekStartsOn??(($=(Z=r.locale)==null?void 0:Z.options)==null?void 0:$.weekStartsOn)??0;if(n==="")return s===""?m(e):b(e,NaN);const l={firstWeekContainsDate:i,weekStartsOn:d,locale:a},p=[new De],M=n.match(it).map(u=>{const w=u[0];if(w in J){const T=J[w];return T(u,a.formatLong)}return u}).join("").match(ot),Y=[];for(let u of M){!(t!=null&&t.useAdditionalWeekYearTokens)&&ye(u)&&S(u,n,s),!(t!=null&&t.useAdditionalDayOfYearTokens)&&xe(u)&&S(u,n,s);const w=u[0],T=at[w];if(T){const{incompatibleTokens:K}=T;if(Array.isArray(K)){const V=Y.find(j=>K.includes(j.token)||j.token===w);if(V)throw new RangeError(`The format string mustn't contain \`${V.fullToken}\` and \`${u}\` at the same time`)}else if(T.incompatibleTokens==="*"&&Y.length>0)throw new RangeError(`The format string mustn't contain \`${u}\` and any other token at the same time`);Y.push({token:w,fullToken:u});const q=T.run(s,u,a.match,l);if(!q)return b(e,NaN);p.push(q.setter),s=q.rest}else{if(w.match(dt))throw new RangeError("Format string contains an unescaped latin alphabet character `"+w+"`");if(u==="''"?u="'":w==="'"&&(u=ft(u)),s.indexOf(u)===0)s=s.slice(u.length);else return b(e,NaN)}}if(s.length>0&&lt.test(s))return b(e,NaN);const P=p.map(u=>u.priority).sort((u,w)=>w-u).filter((u,w,T)=>T.indexOf(u)===w).map(u=>p.filter(w=>w.priority===u).sort((w,T)=>T.subPriority-w.subPriority)).map(u=>u[0]);let k=m(e);if(isNaN(k.getTime()))return b(e,NaN);const N={};for(const u of P){if(!u.validate(k,l))return b(e,NaN);const w=u.set(k,N,l);Array.isArray(w)?(k=w[0],Object.assign(N,w[1])):k=w}return b(e,k)}function ft(s){return s.match(ut)[1].replace(ct,"'")}function Xt(s,n){const e=(n==null?void 0:n.additionalDigits)??2,t=xt(s);let r;if(t.date){const l=mt(t.date,e);r=bt(l.restDateString,l.year)}if(!r||isNaN(r.getTime()))return new Date(NaN);const a=r.getTime();let i=0,d;if(t.time&&(i=pt(t.time),isNaN(i)))return new Date(NaN);if(t.timezone){if(d=Tt(t.timezone),isNaN(d))return new Date(NaN)}else{const l=new Date(a+i),p=new Date(0);return p.setFullYear(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate()),p.setHours(l.getUTCHours(),l.getUTCMinutes(),l.getUTCSeconds(),l.getUTCMilliseconds()),p}return new Date(a+i+d)}const O={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},wt=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,ht=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,yt=/^([+-])(\d{2})(?::?(\d{2}))?$/;function xt(s){const n={},e=s.split(O.dateTimeDelimiter);let t;if(e.length>2)return n;if(/:/.test(e[0])?t=e[0]:(n.date=e[0],t=e[1],O.timeZoneDelimiter.test(n.date)&&(n.date=s.split(O.timeZoneDelimiter)[0],t=s.substr(n.date.length,s.length))),t){const r=O.timezone.exec(t);r?(n.time=t.replace(r[1],""),n.timezone=r[1]):n.time=t}return n}function mt(s,n){const e=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+n)+"})|(\\d{2}|[+-]\\d{"+(2+n)+"})$)"),t=s.match(e);if(!t)return{year:NaN,restDateString:""};const r=t[1]?parseInt(t[1]):null,a=t[2]?parseInt(t[2]):null;return{year:a===null?r:a*100,restDateString:s.slice((t[1]||t[2]).length)}}function bt(s,n){if(n===null)return new Date(NaN);const e=s.match(wt);if(!e)return new Date(NaN);const t=!!e[4],r=_(e[1]),a=_(e[2])-1,i=_(e[3]),d=_(e[4]),l=_(e[5])-1;if(t)return Yt(n,d,l)?gt(n,d,l):new Date(NaN);{const p=new Date(0);return!kt(n,a,i)||!Mt(n,r)?new Date(NaN):(p.setUTCFullYear(n,a,Math.max(r,i)),p)}}function _(s){return s?parseInt(s):1}function pt(s){const n=s.match(ht);if(!n)return NaN;const e=L(n[1]),t=L(n[2]),r=L(n[3]);return Nt(e,t,r)?e*H+t*E+r*1e3:NaN}function L(s){return s&&parseFloat(s.replace(",","."))||0}function Tt(s){if(s==="Z")return 0;const n=s.match(yt);if(!n)return 0;const e=n[1]==="+"?-1:1,t=parseInt(n[2]),r=n[3]&&parseInt(n[3])||0;return _t(t,r)?e*(t*H+r*E):NaN}function gt(s,n,e){const t=new Date(0);t.setUTCFullYear(s,0,4);const r=t.getUTCDay()||7,a=(n-1)*7+e+1-r;return t.setUTCDate(t.getUTCDate()+a),t}const Dt=[31,null,31,30,31,30,31,31,30,31,30,31];function ie(s){return s%400===0||s%4===0&&s%100!==0}function kt(s,n,e){return n>=0&&n<=11&&e>=1&&e<=(Dt[n]||(ie(s)?29:28))}function Mt(s,n){return n>=1&&n<=(ie(s)?366:365)}function Yt(s,n,e){return n>=1&&n<=53&&e>=0&&e<=6}function Nt(s,n,e){return s===24?n===0&&e===0:e>=0&&e<60&&n>=0&&n<60&&s>=0&&s<25}function _t(s,n){return n>=0&&n<=59}export{Wt as a,Qt as b,Xt as c,Rt as d,vt as e,Ct as f,Et as g,re as h,Lt as i,Q as j,It as k,Ht as l,qt as m,v as n,Bt as o,At as p,Gt as q,zt as r,Ft as s};
