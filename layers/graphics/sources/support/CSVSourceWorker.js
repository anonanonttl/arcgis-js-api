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

define(["require","exports","../../../../core/tsSupport/generatorHelper","@dojo/shim/Set","dojo/has","dojo/number","dstore/Csv","../../../../geometry","../../../../request","../../../../core/Error","../../../../core/promiseUtils","../../../../core/urlUtils","../../../../geometry/projection","../../../../geometry/support/spatialReferenceUtils","../../../../geometry/support/webMercatorUtils","../../optimizedFeatures","../../data/FeatureStore","../../../../tasks/support/Query"],function(e,t,r,i,n,o,l,a,u,s,d,f,c,p,m,y,g,h){Object.defineProperty(t,"__esModule",{value:!0});var F=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong"],v=["lat","latitude","y","ycenter","latitude83","latdecdeg","POINT-Y"],N=["lon","lng","long","longitude","x","xcenter","longitude83","longdecdeg","POINT-X"],_=[","," ",";","|","\t"],b=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,I=[0,0],x=function(){function e(e,t){this.x=e,this.y=t}return e}(),T=function(){var e=o._parseInfo(),t=new RegExp("^"+e.regexp+"$"),r=new RegExp("["+e.group+"\\s\\xa0]","g"),i=e.factor;return function(n){var o=t.exec(n);if(e.factor=i,!o)return NaN;var l=o[1];if(!o[1]){if(!o[2])return NaN;l=o[2],e.factor*=-1}return+(l=l.replace(r,"").replace(e.decimal,"."))*e.factor}}(),D=function(){function e(){this._store=null}return e.prototype.load=function(e){var t=this;return d.all([this._fetch(e.url),this._checkProjection(e)]).then(function(r){var i=r[0],n=t._parse(i,e.parsing);return t._store=t._createStore(i,n),t._store.executeQueryForExtent().then(function(e){return n.layerDefinition.extent=e.extent,n})})},e.prototype.queryFeatures=function(e){return this._store.executeQuery(h.fromJSON(e))},e.prototype.queryFeatureCount=function(e){return this._store.executeQueryForCount(h.fromJSON(e))},e.prototype.queryObjectIds=function(e){return this._store.executeQueryForIds(h.fromJSON(e))},e.prototype.queryExtent=function(e){return this._store.executeQueryForExtent(h.fromJSON(e))},e.prototype._fetch=function(e){if(!e)return d.reject(new s("csv-source:invalid-source","url not defined"));var t=f.urlToObject(e);return u(t.path,{query:t.query,responseType:"text"}).then(function(e){return e.data})},e.prototype._parse=function(e,t){var r={columnDelimiter:t.columnDelimiter,layerDefinition:null,locationInfo:{latitudeFieldName:t.latitudeField,longitudeFieldName:t.longitudeField}},i=this._readFirstLine(e);if(!i)throw new s("csv","CSV is empty");if(!t.columnDelimiter){var n=this._inferDelimiter(i);if(!n)throw new s("csv","Unable to detect the delimiter from CSV");r.columnDelimiter=n}var o=i.split(r.columnDelimiter),l=r.layerDefinition={name:"csv",geometryType:"esriGeometryPoint",objectIdField:null,fields:[],extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:t.spatialReference||{wkid:102100}}};if(!t.latitudeField||!t.longitudeField){var a=this._inferLocationInfo(o);if(!t.longitudeField&&!a.longitudeFieldName||!t.latitudeField&&!a.latitudeFieldName)throw new s("csv","Unable to identify latitudeField and/or longitudeField from CSV");r.locationInfo={longitudeFieldName:t.longitudeField||a.longitudeFieldName,latitudeFieldName:t.latitudeField||a.latitudeFieldName}}return t.fields&&t.fields.length?l.fields=t.fields:l.fields=this._inferFields(e,r.columnDelimiter,o,r.locationInfo),l.fields.some(function(e){return"esriFieldTypeOID"===e.type&&(l.objectIdField=e.name,!0)})||(l.objectIdField="__OBJECTID",l.fields.unshift({name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",domain:null})),r},e.prototype._inferLocationInfo=function(e){var t=null,r=null;return e.forEach(function(e){var i,n=e.toLowerCase();i=v.indexOf(n),-1===i||r||(r=e),-1===(i=N.indexOf(n))||t||(t=e)}),{longitudeFieldName:t,latitudeFieldName:r}},e.prototype._inferFields=function(e,t,r,i){for(var n=[],o=this._sampleLines(e).map(function(e){return e.split(t).map(function(e){return e.trim()})}),l=this,a=0;a<r.length;a++)!function(e){var t=r[e];if(t===i.longitudeFieldName||t===i.latitudeFieldName)n.push({name:t,alias:t,type:"esriFieldTypeDouble",domain:null});else{var a=o.map(function(t){return t[e]}),u=l._inferFieldType(a),s={name:t.replace(/[\s\'’‘\.\-\/\(\)]+/g,"_"),type:null,alias:t,domain:null,editable:!0,nullable:!0};switch(u){case"integer":s.type="esriFieldTypeInteger";break;case"double":s.type="esriFieldTypeDouble";break;case"date":s.type="esriFieldTypeDate",s.length=36;break;default:s.type="esriFieldTypeString",s.length=255}n.push(s)}}(a);return n},e.prototype._inferFieldType=function(e){var t=this,r=/[^+-.,0-9]/;return e.map(function(e){var i=!1;if(""===e||r.test(e))i=!0;else{var n=T(e);if(!isNaN(n))return/[.,]/.test(e)?"double":n>214783647||n<-214783648?"double":"integer";if(-1===e.indexOf("E"))i=!0;else{if(n=Number(e),!isNaN(n))return"double";if(-1===e.indexOf(","))i=!0;else{if(e=e.replace(",","."),n=Number(e),!isNaN(n))return"double";i=!0}}}if(i){if(/^[-]?\d*[.,]?\d*$/.test(e))return"string";var o=new Date(e);return t._isValidDate(o,e)?"date":"string"}return"string"}).reduce(function(e,t){return e===t?t:"string"===e||"string"===t?"string":"double"===e||"double"===t?"double":void 0})},e.prototype._isValidDate=function(e,t){if(!e||"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))return!1;var r=!0;if(n("chrome")&&/\d+\W*$/.test(t)){var i=t.match(/[a-zA-Z]{2,}/);if(i){for(var o=!1,l=0;!o&&l<=i.length;)o=!b.test(i[l]),l++;r=!o}}return r},e.prototype._readFirstLine=function(e){return e.substring(0,e.indexOf("\n")).trim()},e.prototype._sampleLines=function(e,t){void 0===t&&(t=10);for(var r=!1,i=[],n=e.indexOf("\n")+1;!r&&i.length<t;){var o=e.indexOf("\n",n);-1===o&&(r=!0);var l=void 0;l=-1===o&&n<e.length-1?e.substring(n).trim():e.substring(n,o).trim(),l&&i.push(l),n=o+1}return i},e.prototype._inferDelimiter=function(e){var t=0,r="";return _.forEach(function(i){var n=e.split(i).length;n>t&&(t=n,r=i)}),""===r?null:r},e.prototype._createStore=function(e,t){for(var r,n=t.locationInfo,o=n.latitudeFieldName,u=n.longitudeFieldName,s=t.layerDefinition,d=s.objectIdField,f=s.fields,h=s.extent,v=[],N=[],_=new i.Set,b=new i.Set,D=[],O=0,w=f;O<w.length;O++){var S=w[O],j=S.name,E=S.type;"esriFieldTypeDate"===E?_.add(j):F.indexOf(E)>-1&&b.add(j),j!==d&&D.push(j)}var C=new l;C.delimiter=t.columnDelimiter,C.fieldNames=D,C.newline="\n";var R=C.parse(e),V=0;R.shift();for(var P=0,k=R;P<k.length;P++){var q=k[P],L=this._parseCoordinateValue(q[o]),G=this._parseCoordinateValue(q[u]);if(null!=G&&null!=L&&!isNaN(L)&&!isNaN(G)){for(var J in q)if(J!==o&&J!==u)if(_.has(J)){var Q=new Date(q[J]);q[J]=this._isValidDate(Q,q[J])?Q.getTime():null}else if(b.has(J)){var M=T(q[J]);isNaN(M)?q[J]=null:q[J]=M}q[d]=V,V++,v.push(new x(G,L)),N.push(q)}}if(!p.equals({wkid:4326},h.spatialReference))if(p.isWebMercator(h.spatialReference))for(var U=0,Y=v;U<Y.length;U++){var z=Y[U];r=m.lngLatToXY(z.x,z.y,I),z.x=r[0],z.y=r[1]}else v=c.projectMany(v,a.SpatialReference.WGS84,h.spatialReference,null,!0);for(var W=new g.default({fields:t.layerDefinition.fields,geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,objectIdField:d,spatialReference:h.spatialReference||{wkid:4326},cacheSpatialQueries:!0}),$=[],A=0;A<v.length;A++){var B=v[A],X=B.x,Z=B.y,H=N[A];H[d]=A+1,$.push(new y.OptimizedFeature(new y.OptimizedGeometry([],[X,Z]),H))}return W.load($),W},e.prototype._parseCoordinateValue=function(e){if(null==e||""===e)return null;var t=T(e);return(isNaN(t)||Math.abs(t)>181)&&(t=parseFloat(e)),t},e.prototype._checkProjection=function(e){var t=e.parsing.spatialReference;return!t||m.canProject(a.SpatialReference.WGS84,t)?d.resolve():c.isSupported()?c.load():d.reject(new s("csv-layer","Projection not supported"))},e}();t.default=D});