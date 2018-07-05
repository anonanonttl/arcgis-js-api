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

define(["require","exports","../../core/Error","../../core/Logger","../../core/pbf","../../layers/graphics/optimizedFeatures"],function(e,r,t,a,s,n){function E(e){return M[e]}function T(e){return b[e]}function i(e){return k[e]}function o(e){if(e>=F.length){var r=new t("query:parsing-pbf","Error while parsing FeatureSet PBF payload. Unknown GeometryType");O.error(r)}return F[e]}function c(e){for(var r=new n.OptimizedGeometry,t=r.coords;e.next();)switch(e.tag()){case D.COORDS:for(var a=e.getUInt32(),s=e.pos()+a,E=0;e.pos()<s;)t[E++]=e.getSInt32();break;case D.TYPE:case D.LENGTHS:default:e.skip()}return r}function u(e){for(var r=new n.OptimizedGeometry,t=r.coords,a=r.lengths;e.next();)switch(e.tag()){case D.LENGTHS:for(var s=e.getUInt32(),E=e.pos()+s;e.pos()<E;)a.push(e.getUInt32());break;case D.COORDS:for(var T=e.getUInt32(),E=e.pos()+T,i=0;e.pos()<E;)t[i++]=e.getSInt32();break;case D.TYPE:default:e.skip()}return r}function l(e){for(;e.next();)switch(e.tag()){case U.STRING:return e.getString();case U.FLOAT:return e.getFloat();case U.DOUBLE:return e.getDouble();case U.SINT32:return e.getSInt32();case U.UINT32:return e.getUInt32();case U.INT64:return e.getInt64();case U.UINT64:return e.getUInt64();case U.SINT64:return e.getSInt64();case U.BOOL:return e.getBool();default:return e.skip(),null}return null}function g(e){for(var r={type:E(0)};e.next();)switch(e.tag()){case d.NAME:r.name=e.getString();break;case d.TYPE:r.type=E(e.getEnum());break;case d.ALIAS:r.alias=e.getString();break;case d.SQL_TYPE:r.sqlType=T(e.getEnum());break;case d.DOMAIN:case d.DEFAULT_VALUE:e.skip();break;default:e.skip()}return r}function S(e,r){for(var t=new n.OptimizedFeature,a=0;e.next();)switch(e.tag()){case G.ATTRIBUTES:var s=e.getMessage(),E=r[a++].name;t.attributes[E]=l(s);break;case G.GEOMETRY:t.geometry=u(e.getMessage());break;case G.CENTROID:t.centroid=c(e.getMessage());break;default:e.skip()}return t}function I(e){for(var r=[0,0];e.next();)switch(e.tag()){case m.X:r[0]=e.getDouble();break;case m.Y:r[1]=e.getDouble();break;case m.M:case m.Z:r.push(e.getDouble());break;default:e.skip()}return r}function p(e){for(var r=[0,0];e.next();)switch(e.tag()){case m.X:r[0]=e.getDouble();break;case m.Y:r[1]=e.getDouble();break;case m.M:case m.Z:r.push(e.getDouble());break;default:e.skip()}return r}function A(e){for(var r,t,a=i(0);e.next();)switch(e.tag()){case h.ORIGIN_POSTION:a=i(e.getEnum());break;case h.SCALE:r=I(e.getMessage());break;case h.TRANSLATE:t=p(e.getMessage());break;default:e.skip()}return{originPosition:a,scale:r,translate:t}}function N(e){for(var r={};e.next();)switch(e.tag()){case v.AREA_FIELD_NAME:r.shapeAreaFieldName=e.getString();break;case v.LENGTH_FIELD_NAME:r.shapeLengthFieldName=e.getString();break;case v.UNITS:r.units=e.getString();break;default:e.skip()}return r}function _(e){for(var r={};e.next();)switch(e.tag()){case P.WKID:r.wkid=e.getUInt32();break;case P.WKT:r.wkt=e.getString();break;case P.LASTEST_WKID:case P.VCS_WKID:case P.LATEST_VCS_WKID:default:e.skip()}return r}function R(e){var r=new n.OptimizedFeatureSet;for(r.geometryType=o(0);e.next();)switch(e.tag()){case q.OBJECT_ID_NAME:r.objectIdFieldName=e.getString();break;case q.GLOBAL_ID_NAME:r.globalIdFieldName=e.getString();break;case q.GEOHASH_NAME:r.geohashFieldName=e.getString();break;case q.GEOMETRY_PROPERTIES:r.geometryProperties=N(e.getMessage());break;case q.GEOMETRY_TYPE:r.geometryType=o(e.getEnum());break;case q.SPATIAL_REFERENCE:r.spatialReference=_(e.getMessage());break;case q.HAS_Z:r.hasZ=e.getBool();break;case q.HAS_M:r.hasM=e.getBool();break;case q.TRANSFORM:var t=e.getMessage();r.transform=A(t);break;case q.EXCEEDED_TRANSFER_LIMIT:var a=e.getBool();r.exceededTransferLimit=a;break;case q.FIELDS:var s=e.getMessage();r.fields.push(g(s));break;case q.FEATURES:var E=e.getMessage();r.features.push(S(E,r.fields));break;case q.UNIQUE_ID_NAME:case q.SERVER_GENS:default:e.skip()}return r}function L(e){for(var r={};e.next();)switch(e.tag()){case w.FEATURE_RESULT:r.featureResult=R(e.getMessage());break;default:e.skip()}return r}function f(e){for(var r=new s(new Uint8Array(e),new DataView(e)),t={};r.next();)switch(r.tag()){case Y.QUERY_RESULT:t.queryResult=L(r.getMessage());break;default:r.skip()}return t}function y(e){try{return f(e).queryResult.featureResult}catch(e){var r=new t("query:parsing-pbf","Error while parsing FeatureSet PBF payload",{error:e});return O.error(r),new n.OptimizedFeatureSet}}Object.defineProperty(r,"__esModule",{value:!0});var D,O=a.getLogger("esri.tasks.operations.pbfQueryUtils"),M=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeString","esriFieldTypeDate","esriFieldTypeOID","esriFieldTypeGeometry","esriFieldTypeBlob","esriFieldTypeRaster","esriFieldTypeGUID","esriFieldTypeGlobalID","esriFieldTypeXML"],b=["sqlTypeBigInt","sqlTypeBinary","sqlTypeBit","sqlTypeChar","sqlTypeDate","sqlTypeDecimal","sqlTypeDouble","sqlTypeFloat","sqlTypeGeometry","sqlTypeGUID","sqlTypeInteger","sqlTypeLongNVarchar","sqlTypeLongVarbinary","sqlTypeLongVarchar","sqlTypeNChar","sqlTypeNVarchar","sqlTypeOther","sqlTypeReal","sqlTypeSmallInt","sqlTypeSqlXml","sqlTypeTime","sqlTypeTimestamp","sqlTypeTimestamp2","sqlTypeTinyInt","sqlTypeVarbinary","sqlTypeVarchar"],F=["esriGeometryPoint","esriGeometryMultipoint","esriGeometryPolyline","esriGeometryPolygon"],k=["upperLeft","lowerLeft"];!function(e){e[e.TYPE=1]="TYPE",e[e.LENGTHS=2]="LENGTHS",e[e.COORDS=3]="COORDS"}(D||(D={}));var U;!function(e){e[e.STRING=1]="STRING",e[e.FLOAT=2]="FLOAT",e[e.DOUBLE=3]="DOUBLE",e[e.SINT32=4]="SINT32",e[e.UINT32=5]="UINT32",e[e.INT64=6]="INT64",e[e.UINT64=7]="UINT64",e[e.SINT64=8]="SINT64",e[e.BOOL=9]="BOOL"}(U||(U={}));var d;!function(e){e[e.NAME=1]="NAME",e[e.TYPE=2]="TYPE",e[e.ALIAS=3]="ALIAS",e[e.SQL_TYPE=4]="SQL_TYPE",e[e.DOMAIN=5]="DOMAIN",e[e.DEFAULT_VALUE=6]="DEFAULT_VALUE"}(d||(d={}));var G;!function(e){e[e.ATTRIBUTES=1]="ATTRIBUTES",e[e.GEOMETRY=2]="GEOMETRY",e[e.CENTROID=4]="CENTROID"}(G||(G={}));var m;!function(e){e[e.X=1]="X",e[e.Y=2]="Y",e[e.M=3]="M",e[e.Z=4]="Z"}(m||(m={}));var h;!function(e){e[e.ORIGIN_POSTION=1]="ORIGIN_POSTION",e[e.SCALE=2]="SCALE",e[e.TRANSLATE=3]="TRANSLATE"}(h||(h={}));var v;!function(e){e[e.AREA_FIELD_NAME=1]="AREA_FIELD_NAME",e[e.LENGTH_FIELD_NAME=2]="LENGTH_FIELD_NAME",e[e.UNITS=3]="UNITS"}(v||(v={}));var P;!function(e){e[e.WKID=1]="WKID",e[e.LASTEST_WKID=2]="LASTEST_WKID",e[e.VCS_WKID=3]="VCS_WKID",e[e.LATEST_VCS_WKID=4]="LATEST_VCS_WKID",e[e.WKT=5]="WKT"}(P||(P={}));var q;!function(e){e[e.OBJECT_ID_NAME=1]="OBJECT_ID_NAME",e[e.UNIQUE_ID_NAME=2]="UNIQUE_ID_NAME",e[e.GLOBAL_ID_NAME=3]="GLOBAL_ID_NAME",e[e.GEOHASH_NAME=4]="GEOHASH_NAME",e[e.GEOMETRY_PROPERTIES=5]="GEOMETRY_PROPERTIES",e[e.SERVER_GENS=6]="SERVER_GENS",e[e.GEOMETRY_TYPE=7]="GEOMETRY_TYPE",e[e.SPATIAL_REFERENCE=8]="SPATIAL_REFERENCE",e[e.EXCEEDED_TRANSFER_LIMIT=9]="EXCEEDED_TRANSFER_LIMIT",e[e.HAS_Z=10]="HAS_Z",e[e.HAS_M=11]="HAS_M",e[e.TRANSFORM=12]="TRANSFORM",e[e.FIELDS=13]="FIELDS",e[e.FEATURES=15]="FEATURES"}(q||(q={}));var w;!function(e){e[e.FEATURE_RESULT=1]="FEATURE_RESULT"}(w||(w={}));var Y;!function(e){e[e.QUERY_RESULT=2]="QUERY_RESULT"}(Y||(Y={})),r.parsePBFFeatureQuery=y});