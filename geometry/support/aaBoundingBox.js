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

define(["require","exports","../Extent","./aaBoundingRect"],function(n,t,i,a){function r(n){return n}function e(n){return void 0===n&&(n=t.ZERO),r([n[0],n[1],n[2],n[3],n[4],n[5]])}function u(n,t,i,a,e,u){return r([n,t,i,a,e,u])}function m(n,t){return void 0===t&&(t=e()),t[0]=n.xmin,t[1]=n.ymin,t[2]=n.zmin,t[3]=n.xmax,t[4]=n.ymax,t[5]=n.zmax,t}function o(n,t){var a=isFinite(n[2])||isFinite(n[5]);return new i(a?{xmin:n[0],xmax:n[3],ymin:n[1],ymax:n[4],zmin:n[2],zmax:n[5],spatialReference:t}:{xmin:n[0],xmax:n[3],ymin:n[1],ymax:n[4],spatialReference:t})}function f(n,t,i){return void 0===i&&(i=e()),i[0]=n[0],i[1]=n[1],i[2]=n[2],i[3]=t[0],i[4]=t[1],i[5]=t[2],i}function h(n,t){t[0]<n[0]&&(n[0]=t[0]),t[0]>n[3]&&(n[3]=t[0]),t[1]<n[1]&&(n[1]=t[1]),t[1]>n[4]&&(n[4]=t[1]),t[2]<n[2]&&(n[2]=t[2]),t[2]>n[5]&&(n[5]=t[2])}function M(n,t,i){return void 0===i&&(i=n),Y(t)?(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[2]=Math.min(n[2],t[2]),i[3]=Math.max(n[3],t[3]),i[4]=Math.max(n[4],t[4]),i[5]=Math.max(n[5],t[5])):a.is(t)?(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[3]=Math.max(n[3],t[2]),i[4]=Math.max(n[4],t[3])):2===t.length?(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[3]=Math.max(n[3],t[0]),i[4]=Math.max(n[4],t[1])):3===t.length&&(i[0]=Math.min(n[0],t[0]),i[1]=Math.min(n[1],t[1]),i[2]=Math.min(n[2],t[2]),i[3]=Math.max(n[3],t[0]),i[4]=Math.max(n[4],t[1]),i[5]=Math.max(n[5],t[2])),i}function c(n,t,i,a,r){void 0===r&&(r=n);for(var e=n[0],u=n[1],m=n[2],o=n[3],f=n[4],h=n[5],M=0;M<a;M++)e=Math.min(e,t[i+3*M]),u=Math.min(u,t[i+3*M+1]),m=Math.min(m,t[i+3*M+2]),o=Math.max(o,t[i+3*M]),f=Math.max(f,t[i+3*M+1]),h=Math.max(h,t[i+3*M+2]);return r[0]=e,r[1]=u,r[2]=m,r[3]=o,r[4]=f,r[5]=h,r}function x(n,t,i,a){void 0===a&&(a=n);var r=t.length,e=n[0],u=n[1],m=n[2],o=n[3],f=n[4],h=n[5];if(i)for(var M=0;M<r;M++){var c=t[M];e=Math.min(e,c[0]),u=Math.min(u,c[1]),m=Math.min(m,c[2]),o=Math.max(o,c[0]),f=Math.max(f,c[1]),h=Math.max(h,c[2])}else for(var M=0;M<r;M++){var c=t[M];e=Math.min(e,c[0]),u=Math.min(u,c[1]),o=Math.max(o,c[0]),f=Math.max(f,c[1])}return a[0]=e,a[1]=u,a[2]=m,a[3]=o,a[4]=f,a[5]=h,a}function s(n){for(var t=0;t<6;t++)if(!isFinite(n[t]))return!1;return!0}function d(n){return n[0]>=n[3]?0:n[3]-n[0]}function v(n){return n[1]>=n[4]?0:n[4]-n[1]}function l(n){return n[2]>=n[5]?0:n[5]-n[2]}function I(n){var t=d(n),i=l(n),a=v(n);return Math.sqrt(t*t+i*i+a*a)}function E(n,t){return void 0===t&&(t=[0,0,0]),t[0]=n[0]+d(n)/2,t[1]=n[1]+v(n)/2,t[2]=n[2]+l(n)/2,t}function N(n,t){return void 0===t&&(t=[0,0,0]),t[0]=d(n),t[1]=v(n),t[2]=l(n),t}function p(n){return Math.max(d(n),l(n),v(n))}function g(n,t){return t[0]>=n[0]&&t[1]>=n[1]&&t[2]>=n[2]&&t[0]<=n[3]&&t[1]<=n[4]&&t[2]<=n[5]}function y(n,t,i){return t[0]>=n[0]-i&&t[1]>=n[1]-i&&t[2]>=n[2]-i&&t[0]<=n[3]+i&&t[1]<=n[4]+i&&t[2]<=n[5]+i}function F(n,t){return t[0]>=n[0]&&t[1]>=n[1]&&t[2]>=n[2]&&t[3]<=n[3]&&t[4]<=n[4]&&t[5]<=n[5]}function T(n,t){return Math.max(t[0],n[0])<=Math.min(t[3],n[3])&&Math.max(t[1],n[1])<=Math.min(t[4],n[4])&&Math.max(t[2],n[2])<=Math.min(t[5],n[5])}function P(n,t,i,a,r){return void 0===r&&(r=n),r[0]=n[0]+t,r[1]=n[1]+i,r[2]=n[2]+a,r[3]=n[3]+t,r[4]=n[4]+i,r[5]=n[5]+a,r}function R(n,t,i){return void 0===i&&(i=n),i[0]=t[0],i[1]=t[1],i[2]=t[2],i!==n&&(i[3]=n[3],i[4]=n[4],i[5]=n[5]),i}function _(n,t,i){return void 0===i&&(i=n),i[3]=t[0],i[4]=t[1],i[5]=t[2],i!==n&&(i[0]=n[0],i[1]=n[1],i[2]=n[2]),n}function z(n,t){return n[0]=t[0],n[1]=t[1],n[2]=t[2],n[3]=t[3],n[4]=t[4],n[5]=t[5],n}function V(n){return n?z(n,t.NEGATIVE_INFINITY):e(t.NEGATIVE_INFINITY)}function A(n,t){return t||(t=a.create()),t[0]=n[0],t[1]=n[1],t[2]=n[3],t[3]=n[4],t}function O(n,t){return n[0]=t[0],n[1]=t[1],n[3]=t[2],n[4]=t[3],n}function Y(n){return 6===n.length}function q(n){return 0===d(n)&&0===v(n)&&0===l(n)}function G(n,t,i){if(null==n||null==t)return n===t;if(!Y(n)||!Y(t))return!1;if(i){for(var a=0;a<n.length;a++)if(!i(n[a],t[a]))return!1}else for(var a=0;a<n.length;a++)if(n[a]!==t[a])return!1;return!0}Object.defineProperty(t,"__esModule",{value:!0}),t.create=e,t.fromValues=u,t.fromExtent=m,t.toExtent=o,t.fromMinMax=f,t.expandPointInPlace=h,t.expand=M,t.expandWithBuffer=c,t.expandWithNestedArray=x,t.allFinite=s,t.width=d,t.depth=v,t.height=l,t.diameter=I,t.center=E,t.size=N,t.maximumDimension=p,t.containsPoint=g,t.containsPointWithMargin=y,t.contains=F,t.intersects=T,t.offset=P,t.setMin=R,t.setMax=_,t.set=z,t.empty=V,t.toRect=A,t.fromRect=O,t.is=Y,t.isPoint=q,t.equals=G,t.POSITIVE_INFINITY=r([-1/0,-1/0,-1/0,1/0,1/0,1/0]),t.NEGATIVE_INFINITY=r([1/0,1/0,1/0,-1/0,-1/0,-1/0]),t.ZERO=r([0,0,0,0,0,0])});