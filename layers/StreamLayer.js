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

define(["require","../core/sniff","../core/Collection","../core/lang","../core/Logger","../core/promiseUtils","../Graphic","../geometry/SpatialReference","../geometry/Extent","./FeatureLayer","./support/arcgisLayerUrl"],function(e,t,r,i,n,o,s,a,l,c,u){var h=n.getLogger("esri.layers.StreamLayer");return c.createSubclass({declaredClass:"esri.layers.StreamLayer",constructor:function(e){e&&(e.definitionExpression&&console.warn("StreamLayer.definitionExpression is deprecated. Use the filter.where property"),e.geometryDefinition&&console.warn("StreamLayer.geometryDefinition is deprecated. Use the filter.geometry property")),this._set("type","stream"),this._set("operationalLayerType","ArcGISStreamLayer"),"WebSocket"in window||(this.loadError=new Error("WebSocket is not supported in this browser"),console.log("WebSocket is not supported in this browser. StreamLayer will not have real-time connection with the stream service."))},normalizeCtorArgs:function(e,t){return"string"==typeof e?i.mixin({},{url:e},t):e&&e.layerDefinition?i.mixin({},{collectionLayer:e},t):(e&&e.filter&&(e.filter=this._makeFilter({where:e.filter.where||null,geometry:e.filter.geometry||null}),delete e.geometryDefinition,delete e.definitionExpression),e)},getDefaults:function(e){return i.mixin(this.inherited(arguments)||{},{outFields:["*"]})},properties:{definitionExpression:{value:null,get:function(){return this.loaded&&console.warn("StreamLayer.definitionExpression is deprecated. Access the filter.where property"),this.filter.where},set:function(e){this.loaded&&console.warn("StreamLayer.definitionExpression is deprecated. Use the updateFilter method to change the attribute filter");var t=this._makeFilter({where:e});this._set("filter",t)}},geometryDefinition:{value:null,get:function(){return this.loaded&&console.warn("StreamLayer.geometryDefinition is deprecated. Access the filter.geometry property"),this.filter.geometry},set:function(e){this.loaded&&console.warn("StreamLayer.geometryDefinition is deprecated. Use the updateFilter method to change the spatial filter");var t=this._makeFilter({geometry:e});this._set("filter",t)}},filter:{value:{geometry:null,where:null},constructOnly:!0},maxReconnectAttempts:10,maximumTrackPoints:1,operationalLayerType:"ArcGISStreamLayer",purgeOptions:{value:{},set:function(e){var t=this._get("purgeOptions"),r={},i=!1;if(e&&"object"==typeof e&&t!==e)return e.hasOwnProperty("displayCount")&&e.displayCount>0&&(r.displayCount=e.displayCount,i=!0),e.hasOwnProperty("age")&&e.age>=0&&(r.age=e.age,i=!0),i?this._set("purgeOptions",r):void 0}},socketDirection:"subscribe",spatialReference:{value:a.WGS84,type:a,json:{origins:{service:{read:{source:"spatialReference"}}}}},type:{value:"stream",json:{read:!1}},url:{set:function(e){var t=u.sanitizeUrlWithLayerId(this,e,h);this._set("url",t.url),null!=t.layerId&&this._set("layerId",t.layerId)}}},createGraphicsSource:function(){return o.create(function(t){e(["./graphics/sources/StreamLayerSource"],t)}).then(function(e){var t=new e({layer:this});return t.when(function(){return this.emit("graphics-source-create",{graphicsSource:t}),t}.bind(this))}.bind(this))},createGraphicsController:function(t){var n=t.layerView,a=n.view.map,l=r.ofType(s),c=a.view===n.view?this.graphics:new l,u=i.mixin(t.options||{},{layer:this,layerView:n,graphics:c});return o.create(function(t){e(["./graphics/controllers/StreamController"],t)}).then(function(e){var t=new e(u);return t.when(function(){return this.emit("graphics-controller-create",{graphicsController:t}),t}.bind(this))}.bind(this))},loadFromPortal:function(e){return e=i.mixin(e,{supportedTypes:["Stream Service"]}),this.inherited(arguments,[e])},updateFilter:function(e){return o.create(function(t,r){try{var i=this._makeFilter(e);this._set("filter",i),t({filter:this.filter})}catch(e){r(e)}}.bind(this))},importLayerViewModule:function(t){switch(t.type){case"2d":return o.create(function(t){e(["../views/2d/layers/StreamLayerView2D"],t)});case"3d":return o.create(function(t){e(["../views/3d/layers/StreamLayerView3D"],t)})}},_initLayerProperties:function(e){this.source=e;var r=this.source.relatedFeaturesInfo;r&&(this.objectIdField=r.joinField,this.source.relatedFeaturesInfo.outFields=this.outFields?this.outFields.splice(0):null);var i=e.layerDefinition;if(this.read(i,{origin:"service",url:this.parsedUrl}),r&&r.outFields&&"*"!==r.outFields[0]){var n=r.outFields.map(function(e){return e.toLowerCase()});(this.requiredFields||[]).forEach(function(e){-1===n.indexOf(e.toLowerCase())&&r.outFields.push(e)})}i._ssl&&(this.url=this.url.replace(this.reHttp,"https:")),this._verifyFields(),this._addSymbolUrlTokens(),this.useQueryTimestamp=t("ie")||t("safari")},_makeFilter:function(e){var t;if(e){var r,i=e.hasOwnProperty("where")?e.where:this.filter.where;if(e.hasOwnProperty("geometry")){if((r=e.geometry)&&!r.hasOwnProperty("xmin"))throw console.log("geometry is not an extent: ",r),new Error("Cannot set filter. Only Extent is supported for the geometry filter");r&&!r.declaredClass&&(r=new l(r))}else r=this.filter.geometry;t={where:i,geometry:r}}else t={geometry:null,where:null};return t},_readObjectIdField:function(e){if(e.objectIdField)return e.objectIdField;if(e.fields){for(var t,r=e.fields,i=0,n=r.length;i<n;i++){var o=r[i];if("esriFieldTypeOID"===o.type){t=o.name;break}}if(!t){var s=1,a=[];if(r.forEach(function(e){"objectid"===e.name.split("_")[0]&&a.push(e.name)}),a.length)for(;-1!==a.indexOf("objectid_"+s);)s+=1;t="objectid_"+s}return t}},_verifyFields:function(){}})});