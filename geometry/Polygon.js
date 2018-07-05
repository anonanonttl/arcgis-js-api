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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/lang","../core/accessorSupport/decorators","./Extent","./Geometry","./Point","./SpatialReference","./support/centroid","./support/contains","./support/coordsUtils","./support/intersects","./support/webMercatorUtils","./support/zmUtils"],function(e,t,r,n,i,s,a,o,p,l,c,h,u,f,y,m){function g(e){return function(t,r){return null==t?r:null==r?t:e(t,r)}}function v(e){return!Array.isArray(e[0])}var d=g(Math.min),x=g(Math.max),R=function(e){function t(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=e.call(this)||this;return n.rings=[],n.type="polygon",n}r(t,e),o=t,t.createEllipse=function(e){for(var t=e.center.x,r=e.center.y,n=e.center.z,i=e.center.m,s=e.center.hasZ,a=e.center.hasM,p=e.longAxis,l=e.shortAxis,c=e.numberOfPoints,h=e.view,u=[],f=2*Math.PI/c,y=s?3:2,m=0;m<c;m++){var g=Math.cos(m*f),v=Math.sin(m*f),d=h.toMap(p*g+t,l*v+r),x=[d.x,d.y];s&&(x[2]=n),a&&(x[y]=i),u.push(x)}u.push(u[0]);var R={rings:[u],spatialReference:h.spatialReference};return new o(R)},t.createCircle=function(e){return o.createEllipse({center:e.center,longAxis:e.r,shortAxis:e.r,numberOfPoints:e.numberOfPoints,view:e.view})},t.fromExtent=function(e){var t=e.clone().normalize(),r=e.spatialReference,n=!1,i=!1;t.map(function(e){e.hasZ&&(n=!0),e.hasM&&(i=!0)});var s={rings:t.map(function(e){var t=[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]];if(n&&e.hasZ)for(var r=e.zmin+.5*(e.zmax-e.zmin),s=0;s<t.length;s++)t[s].push(r);if(i&&e.hasM)for(var a=e.mmin+.5*(e.mmax-e.mmin),s=0;s<t.length;s++)t[s].push(a);return t}),spatialReference:r};return n&&(s.hasZ=!0),i&&(s.hasM=!0),new o(s)},t.prototype.normalizeCtorArgs=function(e,t){var r,n,i=null,s=null;return e&&!Array.isArray(e)?(i=e.rings?e.rings:null,t||(e.spatialReference?t=e.spatialReference:e.rings||(t=e)),r=e.hasZ,n=e.hasM):i=e,i=i||[],t=t||l.WGS84,i.length&&i[0]&&null!=i[0][0]&&"number"==typeof i[0][0]&&(i=[i]),s=i[0]&&i[0][0],s&&(void 0===r&&void 0===n?(r=s.length>2,n=!1):void 0===r?r=!n&&s.length>3:void 0===n&&(n=!r&&s.length>3)),{rings:i,spatialReference:t,hasZ:r,hasM:n}},Object.defineProperty(t.prototype,"centroid",{get:function(){var e=c.polygonCentroid(this);if(!e||isNaN(e[0])||isNaN(e[1])||this.hasZ&&isNaN(e[2]))return null;var t=new p;return t.x=e[0],t.y=e[1],t.spatialReference=this.spatialReference,this.hasZ&&(t.z=e[2]),t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"extent",{get:function(){var e=this,t=e.hasZ,r=e.hasM,n=e.spatialReference,i=e.rings,s=t?3:2;if(!i.length||!i[0].length)return null;for(var o=i[0][0],p=o[0],l=o[1],c=i[0][0],h=c[0],u=c[1],f=void 0,y=void 0,m=void 0,g=void 0,v=[],R=0;R<i.length;R++){for(var w=i[R],M=w[0],P=M[0],b=M[1],A=w[0],O=A[0],Z=A[1],z=void 0,S=void 0,C=void 0,I=void 0,N=0;N<w.length;N++){var _=w[N],j=_[0],E=_[1];if(p=d(p,j),l=d(l,E),h=x(h,j),u=x(u,E),P=d(P,j),b=d(b,E),O=x(O,j),Z=x(Z,E),t&&_.length>2){var J=_[2];f=d(f,J),y=x(y,J),z=d(z,J),S=x(S,J)}if(r&&_.length>s){var U=_[s];m=d(f,U),g=x(y,U),C=d(z,U),I=x(S,U)}}v.push(new a({xmin:P,ymin:b,zmin:z,mmin:C,xmax:O,ymax:Z,zmax:S,mmax:I,spatialReference:n}))}var k=new a;return k.xmin=p,k.ymin=l,k.xmax=h,k.ymax=u,k.spatialReference=n,t&&(k.zmin=f,k.zmax=y),r&&(k.mmin=m,k.mmax=g),k.cache._partwise=v.length>1?v:null,k},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isSelfIntersecting",{get:function(){return f.isSelfIntersecting(this.rings)},enumerable:!0,configurable:!0}),t.prototype.writePaths=function(e,t,r,n){t.rings=i.clone(this.rings)},t.prototype.addRing=function(e){if(e){this.clearCache();var t=this.rings,r=t.length;if(v(e)){for(var n=[],i=0,s=e.length;i<s;i++)n[i]=e[i].toArray();t[r]=n}else t[r]=e.concat();return this}},t.prototype.clone=function(){var e=new o;return e.spatialReference=this.spatialReference,e.rings=i.clone(this.rings),e.hasZ=this.hasZ,e.hasM=this.hasM,e},t.prototype.contains=function(e){return!!e&&(y.canProject(e,this.spatialReference)&&(e=y.project(e,this.spatialReference)),h.polygonContainsPoint(this,e))},t.prototype.isClockwise=function(e){var t,r=this;return t=v(e)?e.map(function(e){return r.hasZ?r.hasM?[e.x,e.y,e.z,e.m]:[e.x,e.y,e.z]:[e.x,e.y]}):e,u.isClockwise(t,this.hasM,this.hasZ)},t.prototype.getPoint=function(e,t){if(!this._validateInputs(e,t))return null;var r=this.rings[e][t],n=this.hasZ,i=this.hasM;return n&&!i?new p(r[0],r[1],r[2],void 0,this.spatialReference):i&&!n?new p(r[0],r[1],void 0,r[2],this.spatialReference):n&&i?new p(r[0],r[1],r[2],r[3],this.spatialReference):new p(r[0],r[1],this.spatialReference)},t.prototype.insertPoint=function(e,t,r){return this._validateInputs(e,t,!0)?(this.clearCache(),m.updateSupportFromPoint(this,r),Array.isArray(r)||(r=r.toArray()),this.rings[e].splice(t,0,r),this):this},t.prototype.removePoint=function(e,t){return this._validateInputs(e,t)?(this.clearCache(),new p(this.rings[e].splice(t,1)[0],this.spatialReference)):null},t.prototype.removeRing=function(e){if(!this._validateInputs(e,null))return null;this.clearCache();var t=this.rings.splice(e,1)[0],r=this.spatialReference;return t.map(function(e){return new p(e,r)})},t.prototype.setPoint=function(e,t,r){return this._validateInputs(e,t)?(this.clearCache(),m.updateSupportFromPoint(this,r),Array.isArray(r)||(r=r.toArray()),this.rings[e][t]=r,this):this},t.prototype._validateInputs=function(e,t,r){if(void 0===r&&(r=!1),null==e||e<0||e>=this.rings.length)return!1;if(null!=t){var n=this.rings[e];if(r&&(t<0||t>n.length))return!1;if(!r&&(t<0||t>=n.length))return!1}return!0},t.prototype.toJSON=function(e){return this.write(null,e)};var o;return n([s.property({dependsOn:["hasM","hasZ","rings"]})],t.prototype,"cache",void 0),n([s.property({readOnly:!0,dependsOn:["cache"]})],t.prototype,"centroid",null),n([s.property({dependsOn:["cache"],readOnly:!0})],t.prototype,"extent",null),n([s.property({dependsOn:["cache"],readOnly:!0})],t.prototype,"isSelfIntersecting",null),n([s.property({type:[[[Number]]],json:{write:{isRequired:!0}}})],t.prototype,"rings",void 0),n([s.writer("rings")],t.prototype,"writePaths",null),t=o=n([s.subclass("esri.geometry.Polygon")],t)}(s.declared(o));return R.prototype.toJSON.isDefaultToJSON=!0,R});