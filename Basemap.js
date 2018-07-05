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

define(["require","exports","./core/tsSupport/assignHelper","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/Collection","./core/collectionUtils","./core/Evented","./core/JSONSupport","./core/lang","./core/Loadable","./core/Logger","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./layers/Layer","./portal/Portal","./portal/PortalItem","./support/basemapDefinitions"],function(e,r,t,o,a,n,i,s,p,l,c,u,f,y,d,h,m,b,L){var v=0,I=n.ofType(h),g=u.getLogger("esri.Basemap");return function(r){function n(e){var t=r.call(this)||this;t.id=null,t.portalItem=null,t.thumbnailUrl=null,t.title="Basemap",t.id=Date.now().toString(16)+"-basemap-"+v++,t.baseLayers=new I,t.referenceLayers=new I;var o=function(e){e.parent&&e.parent!==t&&"remove"in e.parent&&e.parent.remove(e),e.parent=t,"elevation"===e.type&&g.error("Layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"' is not supported as a basemap layer and will therefore be ignored.")},a=function(e){e.parent=null};return t.baseLayers.on("after-add",function(e){return o(e.item)}),t.referenceLayers.on("after-add",function(e){return o(e.item)}),t.baseLayers.on("after-remove",function(e){return a(e.item)}),t.referenceLayers.on("after-remove",function(e){return a(e.item)}),t}o(n,r),s=n,n.prototype.initialize=function(){var e=this;this.when().catch(function(r){g.error("#load()","Failed to load basemap (title: '"+e.title+"', id: '"+e.id+"')",r)}),this.resourceInfo&&this.read(this.resourceInfo.data,this.resourceInfo.context)},n.prototype.normalizeCtorArgs=function(e){return e&&"resourceInfo"in e&&(this._set("resourceInfo",e.resourceInfo),e=t({},e),delete e.resourceInfo),e},Object.defineProperty(n.prototype,"baseLayers",{set:function(e){this._set("baseLayers",i.referenceSetter(e,this._get("baseLayers"),I))},enumerable:!0,configurable:!0}),n.prototype.writeBaseLayers=function(e,r,o,a){var n=[];if(!e)return void(r[o]=n);a=t({},a,{layerContainerType:"basemap"}),this.baseLayers.forEach(function(e){if(e.write){var r={};e.write(r,a)&&n.push(r)}}),this.referenceLayers.forEach(function(e){if(e.write){var r={isReference:!0};e.write(r,a)&&n.push(r)}}),r[o]=n},Object.defineProperty(n.prototype,"referenceLayers",{set:function(e){this._set("referenceLayers",i.referenceSetter(e,this._get("referenceLayers"),I))},enumerable:!0,configurable:!0}),n.prototype.writeTitle=function(e,r){r.title=e||"Basemap"},n.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this.when()},n.prototype.clone=function(){var e={id:this.id,title:this.title,portalItem:this.portalItem,baseLayers:this.baseLayers.slice(),referenceLayers:this.referenceLayers.slice()};return this.loaded&&(e.loadStatus="loaded"),new s({resourceInfo:this.resourceInfo}).set(e)},n.prototype.read=function(e,r){return this.resourceInfo||this._set("resourceInfo",{data:e,context:r}),this.inherited(arguments)},n.prototype.write=function(e,r){return e=e||{},r&&r.origin||(r=t({origin:"web-map"},r)),this.inherited(arguments,[e,r]),!this.loaded&&this.resourceInfo&&this.resourceInfo.data.baseMapLayers&&(e.baseMapLayers=this.resourceInfo.data.baseMapLayers.map(function(e){var r=l.clone(e);return r.url&&y.isProtocolRelative(r.url)&&(r.url="https:"+r.url),r.templateUrl&&y.isProtocolRelative(r.templateUrl)&&(r.templateUrl="https:"+r.templateUrl),r})),e},n.prototype._loadFromSource=function(){var e=this.resourceInfo,r=this.portalItem;return e?this._loadLayersFromJSON(e.data,e.context?e.context.url:null):r?this._loadFromItem(r):f.resolve(null)},n.prototype._loadLayersFromJSON=function(r,t){var o=this,a=this.resourceInfo&&this.resourceInfo.context,n=this.portalItem&&this.portalItem.portal||a&&a.portal||null,i=a&&"web-scene"===a.origin?"web-scene":"web-map";return f.create(function(r){return e(["./portal/support/layersCreator"],r)}).then(function(e){var a=[];if(r.baseMapLayers&&Array.isArray(r.baseMapLayers)){var s={context:{origin:i,url:t,portal:n,layerContainerType:"basemap"},defaultLayerType:"DefaultTileLayer"},p=e.populateOperationalLayers(o.baseLayers,r.baseMapLayers.filter(function(e){return!e.isReference}),s);a.push.apply(a,p);var l=e.populateOperationalLayers(o.referenceLayers,r.baseMapLayers.filter(function(e){return e.isReference}),s);a.push.apply(a,l)}return f.eachAlways(a)}).then(function(){})},n.prototype._loadFromItem=function(e){var r=this;return e.load().then(function(e){return e.fetchData()}).then(function(t){var o=y.urlToObject(e.itemUrl);return r._set("resourceInfo",{data:t.baseMap,context:{origin:"web-map",portal:e.portal||m.getDefault(),url:o}}),r.read(r.resourceInfo.data,r.resourceInfo.context),r.read({title:e.title,thumbnailUrl:e.thumbnailUrl},{origin:"portal-item",portal:e.portal||m.getDefault(),url:o}),r._loadLayersFromJSON(r.resourceInfo.data,o)})},n.fromId=function(e){var r=L[e];return r?s.fromJSON(r):null};var s;return a([d.property({type:I,json:{write:{ignoreOrigin:!0,target:"baseMapLayers"}}}),d.cast(i.castForReferenceSetter)],n.prototype,"baseLayers",null),a([d.writer("baseLayers")],n.prototype,"writeBaseLayers",null),a([d.property({type:String,json:{origins:{"web-scene":{write:!0}}}})],n.prototype,"id",void 0),a([d.property({type:b})],n.prototype,"portalItem",void 0),a([d.property({type:I}),d.cast(i.castForReferenceSetter)],n.prototype,"referenceLayers",null),a([d.property({readOnly:!0})],n.prototype,"resourceInfo",void 0),a([d.property()],n.prototype,"thumbnailUrl",void 0),a([d.property({type:String,json:{origins:{"web-scene":{write:{isRequired:!0}}}}})],n.prototype,"title",void 0),a([d.writer("title")],n.prototype,"writeTitle",null),n=s=a([d.subclass("esri.Basemap")],n)}(d.declared(p,s,c))});