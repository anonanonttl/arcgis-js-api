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

define(["require","exports","../../kernel","../kernel","../languageUtils","./centroid","../../geometry/Extent","../../geometry/Geometry","../../geometry/Multipoint","../../geometry/Point","../../geometry/Polygon","../../geometry/Polyline","../../geometry/support/jsonUtils"],function(e,n,r,t,o,u,i,l,a,f,c,s,g){function m(e){return C?e.clone():g.fromJSON(e.toJSON())}function d(e){return 0===r.version.indexOf("4.")?c.fromExtent(e):new c({spatialReference:e.spatialReference,rings:[[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]]]})}function h(e){p=e}function w(e,n){function r(e){if(o.pcCheck(e,2,2),e[0]instanceof l&&e[1]instanceof l);else if(e[0]instanceof l&&null===e[1]);else if(e[1]instanceof l&&null===e[0]);else if(null!==e[0]||null!==e[1])throw new Error("Illegal Argument")}e.disjoint=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null===t[0]||null===t[1]||p.disjoint(t[0],t[1])})},e.intersects=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&p.intersects(t[0],t[1])})},e.touches=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&p.touches(t[0],t[1])})},e.crosses=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&p.crosses(t[0],t[1])})},e.within=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&p.within(t[0],t[1])})},e.contains=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&p.contains(t[0],t[1])})},e.overlaps=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&p.overlaps(t[0],t[1])})},e.equals=function(e,r){return n(e,r,function(e,n,r){return o.pcCheck(r,2,2),r[0]===r[1]||(r[0]instanceof l&&r[1]instanceof l?p.equals(r[0],r[1]):!(!o.isDate(r[0])||!o.isDate(r[1]))&&r[0].getTime()===r[1].getTime())})},e.relate=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,3,3),r[0]instanceof l&&r[1]instanceof l)return p.relate(r[0],r[1],o.toString(r[2]));if(r[0]instanceof l&&null===r[1])return!1;if(r[1]instanceof l&&null===r[0])return!1;if(null===r[0]&&null===r[1])return!1;throw new Error("Illegal Argument")})},e.intersection=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null===t[0]||null===t[1]?null:p.intersect(t[0],t[1])})},e.union=function(e,r){return n(e,r,function(n,r,t){t=o.autoCastFeatureToGeometry(t);var u=[];if(0===t.length)throw new Error("Function called with wrong number of Parameters");if(1===t.length)if(o.isArray(t[0])){for(var i=o.autoCastFeatureToGeometry(t[0]),a=0;a<i.length;a++)if(null!==i[a]){if(!(i[a]instanceof l))throw new Error("Illegal Argument");u.push(i[a])}}else{if(!o.isImmutableArray(t[0])){if(t[0]instanceof l)return o.fixSpatialReference(m(t[0]),e.spatialReference);if(null===t[0])return null;throw new Error("Illegal Argument")}for(var f=o.autoCastFeatureToGeometry(t[0].toArray()),a=0;a<f.length;a++)if(null!==f[a]){if(!(f[a]instanceof l))throw new Error("Illegal Argument");u.push(f[a])}}else for(var a=0;a<t.length;a++)if(null!==t[a]){if(!(t[a]instanceof l))throw new Error("Illegal Argument");u.push(t[a])}return 0===u.length?null:p.union(u)})},e.difference=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null===t[1]?m(t[0]):null===t[0]?null:p.difference(t[0],t[1])})},e.symmetricdifference=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null===t[0]&&null===t[1]?null:null===t[0]?m(t[1]):null===t[1]?m(t[0]):p.symmetricDifference(t[0],t[1])})},e.clip=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,2),!(r[1]instanceof i)&&null!==r[1])throw new Error("Illegal Argument");if(null===r[0])return null;if(!(r[0]instanceof l))throw new Error("Illegal Argument");return null===r[1]?null:p.clip(r[0],r[1])})},e.cut=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,2),!(r[1]instanceof s)&&null!==r[1])throw new Error("Illegal Argument");if(null===r[0])return[];if(!(r[0]instanceof l))throw new Error("Illegal Argument");return null===r[1]?[m(r[0])]:p.cut(r[0],r[1])})},e.area=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,2),null===r[0])return 0;if(!(r[0]instanceof l))throw new Error("Illegal Argument");return p.planarArea(r[0],t.convertSquareUnitsToCode(o.defaultUndefined(r[1],-1)))})},e.areageodetic=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,2),null===r[0])return 0;if(!(r[0]instanceof l))throw new Error("Illegal Argument");return p.geodesicArea(r[0],t.convertSquareUnitsToCode(o.defaultUndefined(r[1],-1)))})},e.length=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,2),null===r[0])return 0;if(!(r[0]instanceof l))throw new Error("Illegal Argument");return p.planarLength(r[0],t.convertLinearUnitsToCode(o.defaultUndefined(r[1],-1)))})},e.lengthgeodetic=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,2),null===r[0])return 0;if(!(r[0]instanceof l))throw new Error("Illegal Argument");return p.geodesicLength(r[0],t.convertLinearUnitsToCode(o.defaultUndefined(r[1],-1)))})},e.distance=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),!(r[0]instanceof l))throw new Error("Illegal Argument");if(!(r[1]instanceof l))throw new Error("Illegal Argument");return p.distance(r[0],r[1],t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)))})},e.densify=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof l))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");if(u<=0)throw new Error("Illegal Argument");return r[0]instanceof c||r[0]instanceof s?p.densify(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]instanceof i?p.densify(d(r[0]),u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]})},e.densifygeodetic=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof l))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");if(u<=0)throw new Error("Illegal Argument");return r[0]instanceof c||r[0]instanceof s?p.geodesicDensify(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]instanceof i?p.geodesicDensify(d(r[0]),u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]})},e.generalize=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,4),null===r[0])return null;if(!(r[0]instanceof l))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");return p.generalize(r[0],u,o.toBoolean(o.defaultUndefined(r[2],!0)),t.convertLinearUnitsToCode(o.defaultUndefined(r[3],-1)))})},e.buffer=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof l))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");return 0===u?m(r[0]):p.buffer(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)))})},e.buffergeodetic=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof l))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");return 0===u?m(r[0]):p.geodesicBuffer(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)))})},e.offset=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,6),null===r[0])return null;if(!(r[0]instanceof c||r[0]instanceof s))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");var i=o.toNumber(o.defaultUndefined(r[4],10));if(isNaN(i))throw new Error("Illegal Argument");var l=o.toNumber(o.defaultUndefined(r[5],0));if(isNaN(l))throw new Error("Illegal Argument");return p.offset(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)),o.toString(o.defaultUndefined(r[3],"round")).toLowerCase(),i,l)})},e.rotate=function(e,r){return n(e,r,function(e,n,r){r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3);var t=r[0];if(null===t)return null;if(!(t instanceof l))throw new Error("Illegal Argument");t instanceof i&&(t=c.fromExtent(t));var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");var a=o.defaultUndefined(r[2],null);if(null===a)return p.rotate(t,u);if(a instanceof f)return p.rotate(t,u,a);throw new Error("Illegal Argument")})},e.centroid=function(e,r){return n(e,r,function(n,r,t){if(t=o.autoCastFeatureToGeometry(t),o.pcCheck(t,1,1),null===t[0])return null;if(!(t[0]instanceof l))throw new Error("Illegal Argument");return t[0]instanceof f?o.fixSpatialReference(m(t[0]),e.spatialReference):t[0]instanceof c?C?t[0].centroid:t[0].getCentroid():t[0]instanceof s?u.centroidPolyline(t[0]):t[0]instanceof a?u.centroidMultiPoint(t[0]):t[0]instanceof i?C?t[0].center:t[0].getExtent().getCenter():null})},e.multiparttosinglepart=function(e,r){return n(e,r,function(n,r,t){t=o.autoCastFeatureToGeometry(t),o.pcCheck(t,1,1);var u=[];if(null===t[0])return null;if(!(t[0]instanceof l))throw new Error("Illegal Argument");if(t[0]instanceof f)return[o.fixSpatialReference(m(t[0]),e.spatialReference)];if(t[0]instanceof i)return[o.fixSpatialReference(m(t[0]),e.spatialReference)];var d=p.simplify(t[0]);if(d instanceof c){for(var h=[],w=[],y=0;y<d.rings.length;y++)if(d.isClockwise(d.rings[y])){var T=g.fromJSON({rings:[d.rings[y]],hasZ:!!C&&d.hasZ,hasM:!!C&&d.hasM,spatialReference:C?d.spatialReference.toJSON():d.spatialReference.toJson()});h.push(T)}else w.push({ring:d.rings[y],pt:d.getPoint(y,0)});for(var E=0;E<w.length;E++)for(var A=0;A<h.length;A++)if(h[A].contains(w[E].pt)){h[A].addRing(w[E].ring);break}return h}if(d instanceof s){for(var v=[],y=0;y<d.paths.length;y++){var I=g.fromJSON({paths:[d.paths[y]],hasZ:!!C&&d.hasZ,hasM:!!C&&d.hasM,spatialReference:C?d.spatialReference.toJSON():d.spatialReference.toJson()});v.push(I)}return v}if(t[0]instanceof a){for(var F=o.fixSpatialReference(m(t[0]),e.spatialReference),y=0;y<F.points.length;y++)u.push(F.getPoint(y));return u}return null})},e.issimple=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,1),null===r[0])return!0;if(r[0]instanceof l)return p.isSimple(r[0]);throw new Error("Illegal Argument")})},e.simplify=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,1),null===r[0])return null;if(r[0]instanceof l)return p.simplify(r[0]);throw new Error("Illegal Argument")})}}Object.defineProperty(n,"__esModule",{value:!0});var p=null,C=0===r.version.indexOf("4.");n.setGeometryEngine=h,n.registerFunctions=w});