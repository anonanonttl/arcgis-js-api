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

define(["require","exports"],function(n,t){function r(n){return n&&"upperLeft"===n.originPosition}function e(n){return{originPosition:"upperLeft",scale:[n.tolerance,n.tolerance],translate:[n.extent.xmin,n.extent.ymax]}}function a(n,t){if(n===t||null==n&&null==t)return!0;if(null==n||null==t)return!1;var e,a,u,i,o,l;return r(n)?(e=n.translate[0],a=n.translate[1],u=n.scale[0]):(e=n.extent.xmin,a=n.extent.ymax,u=n.tolerance),r(t)?(i=t.translate[0],o=t.translate[1],l=t.scale[0]):(i=t.extent.xmin,o=t.extent.ymax,l=t.tolerance),e===i&&a===o&&u===l}function u(n,t){var r=n.scale,e=n.translate;return Math.round((t-e[0])/r[0])}function i(n,t){var r=n.scale,e=n.translate;return Math.round((e[1]-t)/r[1])}function o(n,t,r){for(var e,a,o,l,m=[],s=0;s<r.length;s++){var f=r[s];s>0?(o=u(n,f[0]),l=i(n,f[1]),o===e&&l===a||(m.push(t(f,o-e,l-a)),e=o,a=l)):(e=u(n,f[0]),a=i(n,f[1]),m.push(t(f,e,a)))}return m.length>0?m:null}function l(n,t,r){return t[0]=u(n,r[0]),t[3]=i(n,r[1]),t[2]=u(n,r[2]),t[1]=i(n,r[3]),t}function m(n,t,r,e){return o(n,r?e?O:C:e?C:Q,t)}function s(n,t,r,e){for(var a=[],u=r?e?O:C:e?C:Q,i=0;i<t.length;i++){var l=o(n,u,t[i]);l&&l.length>=3&&a.push(l)}return a.length?a:null}function f(n,t,r,e){for(var a=[],u=r?e?O:C:e?C:Q,i=0;i<t.length;i++){var l=o(n,u,t[i]);l&&l.length>=2&&a.push(l)}return a.length?a:null}function c(n,t){var r=n.scale,e=n.translate;return t*r[0]+e[0]}function h(n,t){var r=n.scale;return n.translate[1]-t*r[1]}function x(n,t,r){var e=new Array(r.length);if(!r.length)return e;var a=n.scale,u=a[0],i=a[1],o=c(n,r[0][0]),l=h(n,r[0][1]);e[0]=t(r[0],o,l);for(var m=1;m<r.length;m++){var s=r[m];o+=s[0]*u,l-=s[1]*i,e[m]=t(s,o,l)}return e}function y(n,t,r){for(var e=new Array(r.length),a=0;a<r.length;a++)e[a]=x(n,t,r[a]);return e}function d(n,t,r){return r?(t[0]=c(n,r[0]),t[1]=h(n,r[3]),t[2]=c(n,r[2]),t[3]=h(n,r[1]),t):[c(n,t[0]),h(n,t[3]),c(n,t[2]),h(n,t[1])]}function g(n,t,r,e){return x(n,r?e?O:C:e?C:Q,t)}function z(n,t,r,e){return y(n,r?e?O:C:e?C:Q,t)}function I(n,t,r,e){return y(n,r?e?O:C:e?C:Q,t)}function v(n,t,r){for(var e=r[0],a=e[0],u=e[1],i=Math.min(a,t[0]),o=Math.min(u,t[1]),l=Math.max(a,t[2]),m=Math.max(u,t[3]),s=1;s<r.length;s++){var f=r[s],c=f[0],h=f[1];a+=c,u+=h,c<0&&(i=Math.min(i,a)),c>0&&(l=Math.max(l,a)),h<0?o=Math.min(o,u):h>0&&(m=Math.max(m,u))}return n[0]=i,n[1]=o,n[2]=l,n[3]=m,n}function N(n,t){if(!t.length)return null;n[0]=n[1]=Number.POSITIVE_INFINITY,n[2]=n[3]=Number.NEGATIVE_INFINITY;for(var r=0;r<t.length;r++)v(n,n,t[r]);return n}function p(n){var t=[Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY];return v(t,t,n)}function P(n){return N([0,0,0,0],n)}function q(n){return N([0,0,0,0],n)}function M(n,t,r,e,a){return t.xmin=u(n,r.xmin),t.ymin=i(n,r.ymin),t.xmax=u(n,r.xmax),t.ymax=i(n,r.ymax),t!==r&&(e&&(t.zmin=r.zmin,t.zmax=r.zmax),a&&(t.mmin=r.mmin,t.mmax=r.mmax)),t}function T(n,t,r,e,a){return t.points=m(n,r.points,e,a),t}function A(n,t,r,e,a){return t.x=u(n,r.x),t.y=i(n,r.y),t!==r&&(e&&(t.z=r.z),a&&(t.m=r.m)),t}function E(n,t,r,e,a){var u=s(n,r.rings,e,a);return u?(t.rings=u,t):null}function Y(n,t,r,e,a){var u=f(n,r.paths,e,a);return u?(t.paths=u,t):null}function _(n,t,r,e,a){return t.xmin=c(n,r.xmin),t.ymin=h(n,r.ymin),t.xmax=c(n,r.xmax),t.ymax=h(n,r.ymax),t!==r&&(e&&(t.zmin=r.zmin,t.zmax=r.zmax),a&&(t.mmin=r.mmin,t.mmax=r.mmax)),t}function b(n,t,r,e,a){return t.points=g(n,r.points,e,a),t}function B(n,t,r,e,a){return t.x=c(n,r.x),t.y=h(n,r.y),t!==r&&(e&&(t.z=r.z),a&&(t.m=r.m)),t}function F(n,t,r,e,a){return t.rings=I(n,r.rings,e,a),t}function V(n,t,r,e,a){return t.paths=z(n,r.paths,e,a),t}Object.defineProperty(t,"__esModule",{value:!0});var Q=function(n,t,r){return[t,r]},C=function(n,t,r){return[t,r,n[2]]},O=function(n,t,r){return[t,r,n[2],n[3]]};t.toTransform=e,t.equals=a,t.quantizeX=u,t.quantizeY=i,t.quantizeBounds=l,t.quantizePoints=m,t.quantizeRings=s,t.quantizePaths=f,t.hydrateX=c,t.hydrateY=h,t.hydrateCoordsArray=x,t.hydrateCoordsArrayArray=y,t.hydrateBounds=d,t.hydratePoints=g,t.hydratePaths=z,t.hydrateRings=I,t.getQuantizedBoundsCoordsArray=v,t.getQuantizedBoundsCoordsArrayArray=N,t.getQuantizedBoundsPoints=p,t.getQuantizedBoundsPaths=P,t.getQuantizedBoundsRings=q,t.quantizeExtent=M,t.quantizeMultipoint=T,t.quantizePoint=A,t.quantizePolygon=E,t.quantizePolyline=Y,t.hydrateExtent=_,t.hydrateMultipoint=b,t.hydratePoint=B,t.hydratePolygon=F,t.hydratePolyline=V});