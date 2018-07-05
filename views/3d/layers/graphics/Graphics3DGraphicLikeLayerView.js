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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/Accessor","../../../../core/Handles","../../../../core/promiseUtils","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../layers/Layer","../../../../layers/graphics/dehydratedFeatures","./constants","./Graphics3DCore","./Graphics3DElevationAlignment","./Graphics3DScaleVisibility","./Graphics3DSpatialIndex","./graphicUtils"],function(e,i,t,r,s,n,a,l,p,o,c,h,d,u,y,g,v,f){return function(e){function i(i){var t=e.call(this)||this;return t.graphicsCore=null,t.elevationAlignment=new y,t.handles=new a,t.suspendResumeExtent=null,t}return t(i,e),i.prototype.normalizeCtorArgs=function(e){var i=null;e.scaleVisibilityEnabled&&(i=new g);var t=new u({owner:e.owner,layer:e.layer,basemapTerrain:e.owner.view.basemapTerrain,asyncUpdates:!1});return s({},e,{graphicsCore:t,scaleVisibility:i})},i.prototype.initialize=function(){var e=this;this._set("spatialIndex",new v({spatialReference:this.owner.view.spatialReference})),this.scaleVisibility&&"minScale"in this.layer&&this.handles.add(this.layer.watch(["minScale","maxScale"],function(){return e.scaleVisibility.layerMinMaxScaleChangeHandler()})),this.idleClients=[this.scaleVisibility,this.elevationAlignment,this.graphicsCore]},i.prototype.setup=function(){var e=this;if(this.elevationAlignment.setup(this.owner,function(i,t,r){return e.spatialIndex.queryGraphicUIDsInExtent(i,t,r)},this.graphicsCore,this.view.elevationProvider),this.scaleVisibility&&"minScale"in this.layer){var i=this.owner.view.basemapTerrain;this.scaleVisibility.setup(this.owner,this.layer,function(i,t,r){return e.spatialIndex.queryGraphicUIDsInExtent(i,t,r)},this.graphicsCore,i)}this.graphicsCore.setup({elevationAlignment:this.elevationAlignment,spatialIndex:this.spatialIndex,scaleVisibility:this.scaleVisibility}),this.handles.add(this.view.watch("clippingArea",function(){return e.updateClippingExtent()})),this.updateClippingExtent(),this.setupSuspendResumeExtent(),this.handles.add(this.view.resourceController.registerIdleFrameWorker({needsUpdate:function(){return e.needsIdleUpdate()},idleFrame:function(i){return e.idleUpdate(i)}}))},i.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null),this.elevationAlignment&&(this.elevationAlignment.destroy(),this._set("elevationAlignment",null)),this.scaleVisibility&&(this.scaleVisibility.destroy(),this._set("scaleVisibility",null)),this.graphicsCore&&(this.graphicsCore.destroy(),this._set("graphicsCore",null)),this.spatialIndex&&(this.spatialIndex.destroy(),this._set("spatialIndex",null))},Object.defineProperty(i.prototype,"suspended",{get:function(){return!(!this.scaleVisibility||!this.scaleVisibility.suspended)},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"updating",{get:function(){return!!(this.graphicsCore&&this.graphicsCore.updating||this.scaleVisibility&&this.scaleVisibility.updating)},enumerable:!0,configurable:!0}),i.prototype.getGraphicFromGraphicUid=function(e){var i=this,t=null;return this.owner.loadedGraphics&&this.owner.loadedGraphics.some(function(r){if(r.uid===e){var s=i.layer instanceof c?i.layer:null;return t=h.hydrateGraphic(r,s),!0}return!1}),l.create(function(e,i){null!==t?e(t):i()})},i.prototype.whenGraphicBounds=function(e,i){return this.spatialIndex&&this.graphicsCore?this.graphicsCore.whenGraphicBounds(e,i):l.reject()},i.prototype.needsIdleUpdate=function(){for(var e=0,i=this.idleClients;e<i.length;e++){var t=i[e];if(t&&t.needsIdleUpdate())return!0}return!1},i.prototype.idleUpdate=function(e){for(var i=0,t=this.idleClients;i<t.length;i++){var r=t[i];r&&r.idleUpdate(e)}},i.prototype.updateClippingExtent=function(){var e=this.view.clippingArea;this.graphicsCore.setClippingExtent(e,this.view.spatialReference)&&this.graphicsCore.recreateAllGraphics()},i.prototype.setupSuspendResumeExtent=function(){var e=this;this.scaleVisibility&&p.init(this.graphicsCore,"computedExtent",function(i){e.suspendResumeExtent=f.enlargeExtent(i,e.suspendResumeExtent,d.SUSPEND_RESUME_EXTENT_OPTIMISM),e.scaleVisibility.setExtent(e.suspendResumeExtent)},!0)},r([o.property({constructOnly:!0})],i.prototype,"owner",void 0),r([o.property({constructOnly:!0})],i.prototype,"layer",void 0),r([o.property({readOnly:!0,aliasOf:"owner.view"})],i.prototype,"view",void 0),r([o.property({constructOnly:!0})],i.prototype,"graphicsCore",void 0),r([o.property({readOnly:!0})],i.prototype,"spatialIndex",void 0),r([o.property({constructOnly:!0})],i.prototype,"scaleVisibility",void 0),r([o.property({readOnly:!0})],i.prototype,"elevationAlignment",void 0),r([o.property({readOnly:!0,dependsOn:["scaleVisibility.suspended"]})],i.prototype,"suspended",null),r([o.property({readOnly:!0,dependsOn:["graphicsCore.updating","scaleVisibility.updating"]})],i.prototype,"updating",null),i=r([o.subclass("esri.views.3d.layers.graphics.Graphics3DGraphicLikeLayerView")],i)}(o.declared(n))});