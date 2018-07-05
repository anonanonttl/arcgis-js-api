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

define(["require","exports","../../../core/tsSupport/assignHelper","dojo/i18n","dojo/i18n!../nls/CoordinateConversion","dojo/number","dojo/_base/config","../../../geometry","../../../core/Error","../../../core/promiseUtils","../../../geometry/support/webMercatorUtils","./Format"],function(t,e,n,i,r,o,a,u,s,c,d,p){function l(t,e){var n=f(e);return[t[0].toFixed(n),t[1].toFixed(n)]}function f(t){return t>=500?6:t<500&&t>=50?7:t<50&&t>=5?8:9}function b(t,e,n){var i,r;return function(){i&&(clearTimeout(i),i=null),r&&r.cancel(null);var o=arguments;return r=c.create(function(r,a){i=setTimeout(function(){i=null,t.apply(e,o).then(function(t){return r(t)}).catch(function(t){return a(t)})},n)})}}function g(t){var e=t.geometryServicePromise,n=t.coordinate,i=t.spatialReference,r=t.formatName;return e.then(function(t){return t.fromGeoCoordinateString({strings:[n],sr:i,conversionType:r}).then(function(t){var e=new u.Point({x:t[0][0],y:t[0][1],spatialReference:i});if(!w(e))throw t;return e}).catch(function(t){throw new s("coordinate-conversion:from-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:t})})})}function h(t,e){var n=t.indexOf(",")>=0?",":" ",i=t.split(n).map(function(t){var e=t.trim();return e?Number(e):null}),r=i[0],o=i[1],a=i[2];if(!v(r)||!v(o))return null;var s=new u.Point({x:r,y:o,spatialReference:e||u.SpatialReference.WGS84});return a&&(s.z=a,s.hasZ=!0),s}function m(t){return[new p({name:"basemap",coordinateSegments:[{alias:"X",description:"easting",searchPattern:z,substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"Y",description:"northing",searchPattern:z,substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}}],defaultPattern:"X, Y",viewModel:t}),new p({name:"dd",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+N+"]?\\d*(?=\\D*?[N|S|"+W+"|"+M+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:r.abbreviatedDirections.north,description:"north/south indicator",searchPattern:G,substitution:{input:function(t){return C[t]},output:function(t){return r.abbreviatedDirections[F[t]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}[\\.|\\"+N+"]?\\d*(?=\\D*?[E|W|"+j+"|"+$+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:r.abbreviatedDirections.east,description:"east/west indicator",searchPattern:Z,substitution:{input:function(t){return C[t]},output:function(t){return r.abbreviatedDirections[F[t]]}}}],defaultPattern:"Y°"+r.abbreviatedDirections.north+", X°"+r.abbreviatedDirections.east,viewModel:t}),new p({name:"ddm",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?\\s+.*?[N|S|"+W+"|"+M+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}[\\.\\"+N+"]?\\d*(?=.*?[N|S|"+W+"||"+M+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:r.abbreviatedDirections.north,description:"north/south indicator",searchPattern:G,substitution:{input:function(t){return C[t]},output:function(t){return r.abbreviatedDirections[F[t]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?=\\D*?\\s+.*?[E|W|"+j+"|"+$+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"B",description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\|"+N+"]?\\d*(?=.*?[E|W|"+j+"|"+$+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:r.abbreviatedDirections.east,description:"east/west indicator",searchPattern:Z,substitution:{input:function(t){return C[t]},output:function(t){return r.abbreviatedDirections[F[t]]}}}],defaultPattern:"Y° A'"+r.abbreviatedDirections.north+", X° B'"+r.abbreviatedDirections.east,viewModel:t}),new p({name:"dms",coordinateSegments:[{alias:"Y",description:"degrees latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?\\s+.*?[N|S|"+W+"|"+M+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"A",description:"minutes latitude",searchPattern:new RegExp("\\d{1,2}(?=.*?[N|S|"+W+"|"+M+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"B",description:"seconds latitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+N+"]?\\d*(?=.*?[N|S|"+W+"|"+M+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:r.abbreviatedDirections.north,description:"north/south indicator",searchPattern:G,substitution:{input:function(t){return C[t]},output:function(t){return r.abbreviatedDirections[F[t]]}}},{alias:"X",description:"degrees longitude",searchPattern:new RegExp("\\d{1,3}(?=.*?\\s+.*?[E|W|"+j+"|"+$+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"C",description:"minutes longitude",searchPattern:new RegExp("\\d{1,2}(?=.*?[E|W|"+j+"|"+$+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"D",description:"seconds longitude",searchPattern:new RegExp("\\d{1,2}[\\.|\\"+N+"]?\\d*(?=.*?[E|W|"+j+"|"+$+"])","i"),substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:r.abbreviatedDirections.east,description:"east/west indicator",searchPattern:Z,substitution:{input:function(t){return C[t]},output:function(t){return r.abbreviatedDirections[F[t]]}}}],defaultPattern:"Y° A' B\""+r.abbreviatedDirections.north+", X° C' D\""+r.abbreviatedDirections.east,viewModel:t}),new p({name:"xy",coordinateSegments:[{alias:"X",description:"longitude",searchPattern:z,substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}},{alias:"Y",description:"latitude",searchPattern:z,substitution:{input:function(t){return x(t)},output:function(t){return D(t)}}}],defaultPattern:"X°, Y°",viewModel:t}),new p({name:"mgrs",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y",viewModel:t}),new p({name:"usng",coordinateSegments:[{alias:"Z",description:"grid zone",searchPattern:/\d{1,2}\w|[abyz]/i},{alias:"S",description:"grid square",searchPattern:/\w{2}/},{alias:"X",description:"easting",searchPattern:/^\d{5}(?=.?\d{5}$)|^\d{4}(?=.?\d{4}$)|^\d{3}(?=.?\d{3}$)|^\d{2}(?=.?\d{2}$)|^\d(?=.?\d$)/},{alias:"Y",description:"northing",searchPattern:/^\d{1,5}/}],defaultPattern:"Z S X Y",viewModel:t}),new p({name:"utm",coordinateSegments:[{alias:"Z",description:"zone number",searchPattern:/\d{1,2}|[abyz]/i},{alias:"B",description:"latitude band",searchPattern:/^\D/},{alias:"X",description:"easting",searchPattern:/\d{1,7}(?=\s*\d{7}$)/},{alias:"Y",description:"northing",searchPattern:/\d{1,7}/}],defaultPattern:"ZB X Y",viewModel:t})]}function v(t){return"number"==typeof t&&isFinite(t)}function w(t){return t&&v(t.x)&&v(t.y)}function P(t,e){if(t.spatialReference.isGeographic&&e){var n=l([t.x,t.y],e);return n[0]+", "+n[1]}return t.x.toFixed(3)+", "+t.y.toFixed(3)}function S(t){var e=t.spatialReference,n=t.geometryServicePromise,i=t.location,r=t.scale;if(!e||i.spatialReference.wkid===e.wkid)return c.resolve({location:i,coordinate:P(i,r)});if((i.spatialReference.isWGS84||i.spatialReference.isWebMercator)&&(e.isWGS84||e.isWebMercator))return c.resolve({location:d.project(i,e),coordinate:P(i,r)});if(X[0]===i&&X[1]===e.wkid)return X[2];X[0]=i,X[1]=e.wkid;var o=n.then(function(t){return t.project({geometries:[i],outSpatialReference:e}).then(function(t){if(!w(t[0]))throw t[0];return{location:t[0],coordinate:P(t[0],r)}}).catch(function(t){throw new s("coordinate-conversion:projection-failed","Failed to project point",{projectionResult:t})})});return X[2]=o,o}function D(t){var e=t.match(B),n=e?e[0]:"",i=t.indexOf(".")>=0?t.split(".")[1].length:0;return n+o.format(Number(t),{pattern:"###0.###",places:i,round:-1})}function x(t){return o.parse(t)}function R(t){var e=t.formatName,i=t.location,r=t.geometryServicePromise,o=y[e]||{},a=n({coordinates:[[i.x,i.y]],sr:i.spatialReference,conversionType:e},o);return r.then(function(t){return t.toGeoCoordinateString(a).then(function(t){var e=t[0];if(!e)throw t;return e}).catch(function(t){throw new s("coordinate-conversion:to-geo-coordinate-string-failed","Failed to convert coordinate notation",{notationResult:t})})})}function E(t){return"dd"===t||"dms"===t||"ddm"===t||"mgrs"===t||"usng"===t||"utm"===t}Object.defineProperty(e,"__esModule",{value:!0});var y={utm:{conversionMode:"utmDefault",addSpaces:!0},usng:{numOfDigits:5,rounding:!1,addSpaces:!1},mgrs:{rounding:!1}},X=new Array(3),Y=a.locale,N=i.getLocalization("dojo.cldr","number",Y).decimal,W=r.abbreviatedDirections.north,M=r.abbreviatedDirections.south,j=r.abbreviatedDirections.east,$=r.abbreviatedDirections.west,F={N:"north",S:"south",E:"east",W:"west"},C={};C[W]="N",C[M]="S",C[j]="E",C[$]="W";var z=new RegExp("-?\\d+[\\.|\\"+N+"]?\\d*"),G=new RegExp("N|S|"+W+"|"+M,"i"),Z=new RegExp("E|W|"+j+"|"+$,"i"),B=/^[\\0]+(?=\d)/;e.clipLonLat=l,e.getDegreePrecision=f,e.debounceDeferred=b,e.fromGeoCoordinateString=g,e.fromXY=h,e.generateDefaultFormats=m,e.isValidPoint=w,e.pointToCoordinate=P,e.project=S,e.toGeoCoordinateString=R,e.isSupportedNotation=E});