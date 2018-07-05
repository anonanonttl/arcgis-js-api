// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.8/esri/copyright.txt for details.

define(["require","exports","../../config","../../core/Error","../../core/Logger","../../core/promiseUtils","../Polygon","../Polyline","../SpatialReference","./spatialReferenceUtils","./webMercatorUtils","../../tasks/GeometryService"],function(e,r,n,t,i,a,o,s,f,l,u,p){function h(e){return"polygon"===e.type}function c(e){return"polygon"===e[0].type}function g(e){return"polyline"===e[0].type}function v(e){return h(e)?e.rings:e.paths}function m(e,r){return Math.ceil((e-r)/(2*r))}function x(e,r){for(var n=v(e),t=0,i=n;t<i.length;t++)for(var a=i[t],o=0,s=a;o<s.length;o++){var f=s[o];f[0]+=r}return e}function y(e){for(var r=[],n=0,t=0,i=0;i<e.length;i++){for(var a=e[i],o=null,s=0;s<a.length;s++)o=a[s],r.push(o),0===s?(n=o[0],t=n):(n=Math.min(n,o[0]),t=Math.max(t,o[0]));o&&r.push([(n+t)/2,0])}return r}function M(e,r){if(!(e instanceof s||e instanceof o)){var n="straightLineDensify: the input geometry is neither polyline nor polygon";throw P.error(n),new t(n)}for(var i=v(e),a=[],f=0,l=i;f<l.length;f++){var u=l[f],p=[];a.push(p),p.push([u[0][0],u[0][1]]);for(var c=0;c<u.length-1;c++){var g=u[c][0],m=u[c][1],x=u[c+1][0],y=u[c+1][1],M=Math.sqrt((x-g)*(x-g)+(y-m)*(y-m)),d=(y-m)/M,w=(x-g)/M,b=M/r;if(b>1){for(var R=1;R<=b-1;R++){var L=R*r,W=w*L+g,X=d*L+m;p.push([W,X])}var U=(M+Math.floor(b-1)*r)/2,z=w*U+g,A=d*U+m;p.push([z,A])}p.push([x,y])}}return h(e)?new o({rings:a,spatialReference:e.spatialReference}):new s({paths:a,spatialReference:e.spatialReference})}function d(e,r,n){if(r){var t=M(e,1e6);e=u.webMercatorToGeographic(t,!0)}return n&&(e=x(e,n)),e}function w(e,r,n){if(Array.isArray(e)){var t=e[0];if(t>r){var i=m(t,r);e[0]=t+i*(-2*r)}else if(t<n){var i=m(t,n);e[0]=t+i*(-2*n)}}else{var t=e.x;if(t>r){var i=m(t,r);e=e.clone().offset(i*(-2*r),0)}else if(t<n){var i=m(t,n);e=e.clone().offset(i*(-2*n),0)}}return e}function b(e,r){for(var n=-1,t=0;t<r.cutIndexes.length;t++)!function(t){for(var i=r.cutIndexes[t],a=r.geometries[t],o=v(a),s=0;s<o.length;s++)!function(e){var r=o[e];r.some(function(n){if(n[0]<180)return!0;for(var t=0,i=0;i<r.length;i++){var o=r[i][0];t=o>t?o:t}t=Number(t.toFixed(9));for(var s=m(t,180),f=-360*s,l=0;l<r.length;l++){var u=a.getPoint(e,l);a.setPoint(e,l,u.clone().offset(f,0))}return!0})}(s);if(i===n){if(c(e))for(var f=0,l=v(a);f<l.length;f++){var u=l[f];e[i]=e[i].addRing(u)}else if(g(e))for(var p=0,h=v(a);p<h.length;p++){var x=h[p];e[i]=e[i].addPath(x)}}else n=i,e[i]=a}(t);return e}function R(){return U||(U=new p({url:n.geometryServiceUrl})),U}function L(e,r){if(!Array.isArray(e))return L([e],r);r||(r=R());for(var n,t,i,f,p,h,c,g,v=0,y=[],M=[],W=0,P=e;W<P.length;W++){var U=P[W];if(U)if(n||(n=U.spatialReference,t=l.getInfo(n),i=n.isWebMercator,h=i?102100:4326,f=X[h].maxX,p=X[h].minX,c=X[h].plus180Line,g=X[h].minus180Line),t)if("mesh"===U.type)M.push(U);else if("point"===U.type)M.push(w(U.clone(),f,p));else if("multipoint"===U.type){var z=U.clone();z.points=z.points.map(function(e){return w(e,f,p)}),M.push(z)}else if("extent"===U.type){var A=U.clone(),I=A._normalize(!1,!1,t);M.push(I.rings?new o(I):I)}else if(U.extent){var A=U.extent,T=m(A.xmin,p),k=T*(2*f),D=0===k?U.clone():x(U.clone(),k);A.offset(k,0),A.intersects(c)&&A.xmax!==f?(v=A.xmax>v?A.xmax:v,D=d(D,i),y.push(D),M.push("cut")):A.intersects(g)&&A.xmin!==p?(v=A.xmax*(2*f)>v?A.xmax*(2*f):v,D=d(D,i,360),y.push(D),M.push("cut")):M.push(D)}else M.push(U.clone());else M.push(U);else M.push(U)}for(var S=m(v,f),_=-90,q=S,E=new s;S>0;){var G=360*S-180;E.addPath([[G,_],[G,-1*_]]),_*=-1,S--}if(y.length>0&&q>0)return r.cut(y,E).then(function(e){return b(y,e)}).then(function(n){for(var t=[],a=[],o=0;o<M.length;o++){var s=M[o];if("cut"!==s)a.push(s);else{var f=n.shift(),l=e[o];"polygon"===l.type&&l.rings&&l.rings.length>1&&f.rings.length>=l.rings.length?(t.push(f),a.push("simplify")):a.push(i?u.geographicToWebMercator(f):f)}}return t.length?r.simplify(t).then(function(e){for(var r=[],n=0;n<a.length;n++){var t=a[n];"simplify"!==t?r.push(t):r.push(i?u.geographicToWebMercator(e.shift()):e.shift())}return r}):a});for(var j=[],C=0;C<M.length;C++){var F=M[C];if("cut"!==F)j.push(F);else{var N=y.shift();j.push(!0===i?u.geographicToWebMercator(N):N)}}return a.resolve(j)}function W(e){var r;if(!e)return null;var n=e.extent;if(!n)return null;var t=e.spatialReference&&l.getInfo(e.spatialReference);if(!t)return n;var i=t.valid,a=i[0],o=i[1],s=2*o,f=n.width,u=n.xmin,p=n.xmax;if(r=[p,u],u=r[0],p=r[1],"extent"===e.type||0===f||f<=o||f>s||u<a||p>o)return n;var h;switch(e.type){case"polygon":if(!(e.rings.length>1))return n;h=y(e.rings);break;case"polyline":if(!(e.paths.length>1))return n;h=y(e.paths);break;case"multipoint":h=e.points}for(var c=n.clone(),g=0;g<h.length;g++){var v=h[g][0];v<0?(v+=o,p=Math.max(v,p)):(v-=o,u=Math.min(v,u))}return c.xmin=u,c.xmax=p,c.width<f?(c.xmin-=o,c.xmax-=o,c):n}Object.defineProperty(r,"__esModule",{value:!0});var P=i.getLogger("esri.geometry.support.normalizeUtils"),X={102100:{maxX:20037508.342788905,minX:-20037508.342788905,plus180Line:new s({paths:[[[20037508.342788905,-20037508.342788905],[20037508.342788905,20037508.342788905]]],spatialReference:f.WebMercator}),minus180Line:new s({paths:[[[-20037508.342788905,-20037508.342788905],[-20037508.342788905,20037508.342788905]]],spatialReference:f.WebMercator})},4326:{maxX:180,minX:-180,plus180Line:new s({paths:[[[180,-180],[180,180]]],spatialReference:f.WebMercator}),minus180Line:new s({paths:[[[-180,-180],[-180,180]]],spatialReference:f.WebMercator})}};r.straightLineDensify=M;var U;r.normalizeCentralMeridian=L,r.getDenormalizedExtent=W});