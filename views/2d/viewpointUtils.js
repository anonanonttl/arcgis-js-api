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

define(["require","exports","../../Viewpoint","../../core/Error","../../core/promiseUtils","../../geometry/Extent","../../geometry/Geometry","../../geometry/Point","../../geometry/SpatialReference","../../geometry/support/scaleUtils","../../geometry/support/spatialReferenceUtils","../../geometry/support/webMercatorUtils","../../geometry/support/webMercatorUtils","./libs/gl-matrix/common","./libs/gl-matrix/mat2d","./libs/gl-matrix/vec2"],function(e,t,r,n,a,o,c,i,u,s,l,f,y,g,m,p){function v(e,t,r){var n=g.toDegree(t[0]/F);return p.set(e,r?n:n-360*Math.floor((n+180)/360),g.toDegree(.5*Math.PI-2*Math.atan(Math.exp(-1*t[1]/F))))}function x(e,t){var r=t[1];return r>89.99999?r=89.99999:r<-89.99999&&(r=-89.99999),r=Math.sin(g.toRadian(r)),p.set(e,g.toRadian(t[0])*F,.5*F*Math.log((1+r)/(1-r)))}function d(e,t,r,n){return n&&r&&!n.equals(r)&&f.canProject(n,r)&&n.isWebMercator?n.isWebMercator?x(e,t):v(e,t):p.copy(e,t)}function h(e){return e.wkid?e:e.spatialReference||u.WGS84}function b(e,t){return t.type?p.set(e,t.x,t.y):p.copy(e,t)}function R(e){return s.getMetersPerUnitForSR(e)}function M(e,t){return Math.max(e.width/t[0],e.height/t[1])*k(e.spatialReference)}function w(e,t,r){var n;if(!e)return null;if(Array.isArray(e)&&2===e.length&&"number"==typeof e[0]&&"number"==typeof e[1])return new i(e);if(e.reduce)return e.reduce(function(e,r){return w(r,t,e)},r);if(e instanceof c?n=e:e.geometry&&(n=e.geometry),!n)return null;var a;if(!(a="point"===n.type?new o({xmin:n.x,ymin:n.y,xmax:n.x,ymax:n.y,spatialReference:n.spatialReference}):n.extent))return null;var u=f.canProject(a,t);if(!a.spatialReference.equals(t)&&u)a=f.project(a,t);else if(!u)return null;return r=r?r.union(a):a.clone()}function G(e,t){if(!e)return new r({targetGeometry:new i,scale:0,rotation:0});var n=t.spatialReference,a=t.size,c=t.viewpoint,u=t.constraints,s=null;"esri.Viewpoint"===e.declaredClass?s=e:e.viewpoint?s=e.viewpoint:e.target&&"esri.Viewpoint"===e.target.declaredClass&&(s=e.target);var l=null;s&&s.targetGeometry?l=s.targetGeometry:e instanceof o?l=e:(e||e&&(e.hasOwnProperty("center")||e.hasOwnProperty("extent")||e.hasOwnProperty("target")))&&(l=w(e.center,n)||w(e.extent,n)||w(e.target,n)||w(e,n)),!l&&c&&c.targetGeometry?l=c.targetGeometry:!l&&t.extent&&(l=t.extent);var g=h(l);if(n||(n=h(t.spatialReference||t.extent||l)),!y.canProject(l,n)&&g&&!g.equals(n))return null;var m=b(p.create(),l.center?l.center:l),v=new i(d(m,m,g,n),n),x=null;x=s&&s.targetGeometry&&"point"===s.targetGeometry.type?s.scale:e.hasOwnProperty("scale")&&e.scale?e.scale:e.hasOwnProperty("zoom")&&-1!==e.zoom&&u&&u.effectiveLODs?u.zoomToScale(e.zoom):Array.isArray(l)||"point"===l.type||"extent"===l.type&&0===l.width&&0===l.height?t.extent&&f.canProject(t.extent,n)?M(f.project(t.extent,n),a):t.extent?M(t.extent,a):c.scale:f.canProject(l.extent,n)?M(f.project(l.extent,n),a):M(l.extent,a);var R=0;s?R=s.rotation:e.hasOwnProperty("rotation")?R=e.rotation:c&&(R=c.rotation);var G=new r({targetGeometry:v,scale:x,rotation:R});return u&&(G=u.fit(G),u.rotationEnabled||(G.rotation=R)),G}function P(e,t){var r=e.targetGeometry,n=t.targetGeometry;return r.x=n.x,r.y=n.y,r.spatialReference=n.spatialReference,e.scale=t.scale,e.rotation=t.rotation,e}function S(e,t,r){return r?p.set(e,.5*(t[0]-r.right+r.left),.5*(t[1]-r.bottom+r.top)):p.scale(e,t,.5)}function A(e,r,n,a,o){return t.centerAt(e,r,n.center),e.scale=M(n,a),o&&o.constraints&&o.constraints.constrain(e),e}function T(e,r,n,a){return t.getTransform(e,r,n,a),m.invert(e,e)}function j(e,t,r){var n=O(t),a=Math.abs(Math.cos(n)),o=Math.abs(Math.sin(n));return p.set(e,Math.round(r[1]*o+r[0]*a),Math.round(r[1]*a+r[0]*o))}function B(e){return e.scale*z(e.targetGeometry.spatialReference)}function z(e){return 1/(R(e)*I*96)}function O(e){return g.toRadian(e.rotation)||0}function k(e){return R(e)*I*96}function W(e,t){return p.scale(e,t,.5)}function E(e){if(e.isWrappable){var t=l.getInfo(e);return t.valid[1]-t.valid[0]}return 0}function N(e,t){return Math.round(E(e)/t)}function U(e,t){var r=G(e,t);if(r)return a.resolve(r);var o=new n("viewpointUtils-createAsync:different-spatialReference","Target spatialReference cannot be projected and is different from out spatialReference");return a.reject(o)}function q(e,t,r){return B(t)}function V(e,t,r){return P(e,t),e.rotation+=r,e}function C(e,t,r){return P(e,t),e.rotation=r,e}function D(e,t,r){return P(e,t),e.scale=r,e}Object.defineProperty(t,"__esModule",{value:!0});var I=39.37,F=6378137,_=180/Math.PI;t.extentToScale=M,t.create=G,t.copy=P,t.getAnchor=S,t.getExtent=function(){var e=p.create();return function(t,r,n){var a=r.targetGeometry;b(e,a);var o=.5*B(r);return t.xmin=e[0]-o*n[0],t.ymin=e[1]-o*n[1],t.xmax=e[0]+o*n[0],t.ymax=e[1]+o*n[1],t.spatialReference=a.spatialReference,t}}(),t.setExtent=A,t.getOuterExtent=function(){var e=p.create(),t=p.create();return function(r,n,a){b(e,n.targetGeometry),j(t,n,a);var o=.5*B(n),c=e[0]-o*t[0],i=e[1]-o*t[1],u=e[0]+o*t[0],s=e[1]+o*t[1],l=n.targetGeometry.spatialReference;return r.set({xmin:c,ymin:i,xmax:u,ymax:s,spatialReference:l}),r}}(),t.getClippedExtent=function(){var e=p.create(),t=p.create();return function(r,n,a){var o=B(n),c=n.targetGeometry.spatialReference,i=N(c,o);b(e,n.targetGeometry),j(t,n,a),c.isWrappable&&t[0]>i&&(t[0]=i);var u=.5*o,s=e[0]-u*t[0],l=e[1]-u*t[1],f=e[0]+u*t[0],y=e[1]+u*t[1];return r.set({xmin:s,ymin:l,xmax:f,ymax:y,spatialReference:c}),r}}(),t.getOuterSize=j,t.getPaddingScreenTranslation=function(){var e=p.create();return function(t,r,n){return p.sub(t,W(t,r),S(e,r,n))}}();var L=function(){var e=m.create(),r=p.create();return function(n,a,o,c){var i=B(a),u=O(a);return p.set(r,i,i),m.fromScaling(e,r),m.rotate(e,e,u),m.translate(e,e,t.getPaddingScreenTranslation(r,o,c)),m.translate(e,e,[0,c.top-c.bottom]),p.set(n,e[4],e[5])}}();t.getResolution=B,t.getResolutionToScaleFactor=k,t.getMatrix=function(){var e=p.create(),t=p.create(),r=p.create();return function(n,a,o,c,i,u){return p.negate(e,a),p.scale(t,o,.5*u),p.set(r,1/c*u,-1/c*u),m.identity(n),m.translate(n,n,t),i&&m.rotate(n,n,i),m.scale(n,n,r),m.translate(n,n,e),n}}(),t.getTransform=function(){var e=p.create();return function(r,n,a,o){var c=B(n),i=O(n);return b(e,n.targetGeometry),t.getMatrix(r,e,a,c,i,o)}}(),t.getTransformNoRotation=function(){var e=p.create();return function(r,n,a,o){var c=B(n);return b(e,n.targetGeometry),t.getMatrix(r,e,a,c,0,o)}}(),t.getWorldWidth=E,t.getWorldScreenWidth=N,t.createAsync=U,t.angleBetween=function(){var e=p.create(),t=p.create(),r=p.create();return function(n,a,o){p.subtract(e,n,a),p.normalize(e,e),p.subtract(t,n,o),p.normalize(t,t),p.cross(r,e,t);var c=Math.acos(p.dot(e,t)/(p.length(e)*p.length(t)))*_;return r[2]<0&&(c=-c),isNaN(c)&&(c=0),c}}(),t.addPadding=function(){var e=p.create();return function(t,r,n,a){var o=t.targetGeometry;return P(t,r),L(e,r,n,a),o.x+=e[0],o.y+=e[1],t}}(),t.removePadding=function(){var e=p.create();return function(t,r,n,a){var o=t.targetGeometry;return P(t,r),L(e,r,n,a),o.x-=e[0],o.y-=e[1],t}}(),t.centerAt=function(){var e=p.create();return function(t,r,n){P(t,r);var a=t.targetGeometry,o=h(n),c=h(a);return b(e,n),d(e,e,o,c),a.x=e[0],a.y=e[1],t}}(),t.pixelSizeAt=q,t.resize=function(){var e=p.create();return function(r,n,a,o,c){c||(c="center"),p.sub(e,a,o),p.scale(e,e,.5);var i=e[0],u=e[1];switch(c){case"center":p.set(e,0,0);break;case"left":p.set(e,-i,0);break;case"top":p.set(e,0,u);break;case"right":p.set(e,i,0);break;case"bottom":p.set(e,0,-u);break;case"top-left":p.set(e,-i,u);break;case"bottom-left":p.set(e,-i,-u);break;case"top-right":p.set(e,i,u);break;case"bottom-right":p.set(e,i,-u)}return t.translateBy(r,n,e),r}}(),t.rotateBy=V,t.rotateTo=C,t.scaleBy=function(){var e=p.create();return function(r,n,a,o,c){return P(r,n),isNaN(a)||0===a||(t.toMap(e,o,n,c),r.scale=n.scale*a,t.toScreen(e,e,r,c),t.translateBy(r,r,p.set(e,e[0]-o[0],o[1]-e[1]))),r}}(),t.scaleTo=D,t.scaleAndRotateBy=function(){var e=p.create();return function(r,n,a,o,c,i){return P(r,n),isNaN(a)||0===a||(t.toMap(e,c,n,i),r.scale=n.scale*a,r.rotation+=o,t.toScreen(e,e,r,i),t.translateBy(r,r,p.set(e,e[0]-c[0],c[1]-e[1]))),r}}(),t.padAndScaleAndRotateBy=function(){var e=p.create(),r=p.create();return function(n,a,o,c,i,u,s){return t.getPaddingScreenTranslation(r,u,s),p.add(e,i,r),c?t.scaleAndRotateBy(n,a,o,c,e,u):t.scaleBy(n,a,o,e,u)}}(),t.toMap=function(){var e=m.create();return function(t,r,n,a){return p.transformMat2d(t,r,T(e,n,a,1))}}(),t.toScreen=function(){var e=m.create();return function(r,n,a,o){return p.transformMat2d(r,n,t.getTransform(e,a,o,1))}}(),t.translateBy=function(){var e=p.create(),t=m.create();return function(r,n,a){P(r,n);var o=B(n),c=r.targetGeometry;return m.fromRotation(t,O(n)),m.scale(t,t,p.fromValues(o,o)),p.transformMat2d(e,a,t),c.x+=e[0],c.y+=e[1],r}}()});