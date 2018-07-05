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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/Error","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../layers/graphics/dehydratedFeatures","../../../layers/graphics/QueryEngine","../../../renderers/support/renderingInfoUtils","./LayerView3D","./graphics/Graphics3DFeatureLikeLayerView","./graphics/stats","./support/projectExtentUtils"],function(e,t,r,i,n,s,o,p,a,c,u,h,l,d,y,g,f){return function(e){function t(t){var r=e.call(this)||this;return r.controller=null,r.asyncGraphicsUpdates=!1,r.suspendResumeExtentMode="computed",r.supportsDraping=!0,r.overlayUpdating=!1,r.fullExtentInLocalViewSpatialReference=null,r.suspendResumeExtent=null,r._queryEngine=null,r._controllerCreated=!1,r._controllerClientSideFiltering=!1,r.clippingExtent=null,r.supportsHeightUnitConversion=!0,r}return r(t,e),t.prototype.initialize=function(){var e=this;this._set("graphics3d",new y({owner:this,layer:this.layer,frustumVisibilityEnabled:!0,scaleVisibilityEnabled:!0,elevationAlignmentEnabled:!0,elevationFeatureExpressionEnabled:!0,asyncGraphicsUpdates:this.asyncGraphicsUpdates,suspendResumeExtentMode:this.suspendResumeExtentMode,updateClippingExtent:function(t){return e.updateClippingExtent(t)}})),this.handles.add([this.watch("asyncGraphicsUpdates",function(t){e.graphics3d.graphicsCore.asyncUpdates=t}),this.watch("suspendResumeExtentMode",function(t){e.graphics3d.suspendResumeExtentMode=t})]),this.drawingOrder=this.view.getDrawingOrder(this.layer.uid),this.addResolvingPromise(this.graphics3d.setup().then(function(){return e.validateGeometryType()}).then(function(){return f.toViewIfLocal(e)}).then(function(t){e.fullExtentInLocalViewSpatialReference=t}).then(function(){return e.initializeController()})),this.notifyChange("updating")},t.prototype.destroy=function(){this.controller&&(this.controller.destroy(),this.controller=null),this.graphics3d&&(this.graphics3d.destroy(),this._set("graphics3d",null)),this.loadedGraphics=null},Object.defineProperty(t.prototype,"drawingOrder",{set:function(e){this.graphics3d.graphicsCore.setDrawingOrder(e),this._set("drawingOrder",e)},enumerable:!0,configurable:!0}),t.prototype.getRenderingInfo=function(e){var t=l.getRenderingInfo(e,{renderer:this.layer.renderer});if(t&&t.color){var r=t.color;r[0]=r[0]/255,r[1]=r[1]/255,r[2]=r[2]/255}return t},t.prototype.getGraphicFromGraphicUid=function(e){var t=this,r=null;return this.loadedGraphics&&this.loadedGraphics.some(function(i){return i.uid===e&&(r=u.hydrateGraphic(i,t.layer),!0)}),p.create(function(e,t){null!==r?e(r):t()})},Object.defineProperty(t.prototype,"graphics3DGraphics",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.graphics3DGraphics:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"graphics3DGraphicsKeys",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.graphics3DGraphicsKeys:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"symbolUpdateType",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.symbolUpdateType:null},enumerable:!0,configurable:!0}),t.prototype.whenGraphicBounds=function(e,t){return this.graphics3d?this.graphics3d.graphicsCore.whenGraphicBounds(e,t):null},t.prototype.queryFeatures=function(e){return this._queryEngine?this._queryEngine.queryFeatures(e):this._rejectQuery()},t.prototype.queryObjectIds=function(e){return this._queryEngine?this._queryEngine.queryObjectIds(e):this._rejectQuery()},t.prototype.queryFeatureCount=function(e){return this._queryEngine?this._queryEngine.queryFeatureCount(e):this._rejectQuery()},t.prototype.queryExtent=function(e){return this._queryEngine?this._queryEngine.queryExtent(e):this._rejectQuery()},t.prototype.highlight=function(e,t){return this.graphics3d.highlight(e,t,this.layer.objectIdField)},t.prototype.getStats=function(){var e=g.stats(this,this.graphics3d.graphicsCore);return e.elevationUpdating=this.graphics3d.elevationAlignment.updating,e.visibilityFrustum=!this.graphics3d.frustumVisibility.suspended,e.visibilityScale=!this.graphics3d.scaleVisibility.suspended,e},t.prototype.canResume=function(){return!!this.inherited(arguments)&&(!this.graphics3d||!this.graphics3d.suspended)},t.prototype.isUpdating=function(){return!(!this.graphics3d||this.graphics3d.destroyed)&&(!this._controllerCreated||this.controller&&this.controller.updating||this.overlayUpdating||!(this.view.basemapTerrain&&this.view.basemapTerrain.ready)||this.graphics3d.updating)},t.prototype.initializeController=function(){return s(this,void 0,void 0,function(){var e;return n(this,function(t){switch(t.label){case 0:return[4,this.createController()];case 1:return e=t.sent(),[4,e.when()];case 2:return t.sent(),this.setControllerWhenInitialized(e),[2]}})})},t.prototype.setControllerWhenInitialized=function(e){return s(this,void 0,void 0,function(){var t;return n(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,this.when()];case 1:return r.sent(),[3,3];case 2:return t=r.sent(),[3,3];case 3:return this._controllerCreated=!0,this.notifyChange("updating"),this.isResolved()?[4,a.whenTrueOnce(this.view,"basemapTerrain.ready")]:[2];case 4:return r.sent(),this.controller=e,this.loadedGraphics=e.graphics,this._queryEngine=new h({layer:this.layer,features:this.loadedGraphics,objectIdField:this.layer.objectIdField,dataSpatialReference:this.view.spatialReference}),this.notifyChange("updating"),[2]}})})},t.prototype.updateClippingExtent=function(e){if(this.clippingExtent=e,!this.controller)return!1;switch(this.controller.type){case"memory":case"stream":return!1;case"snapshot":return!this._controllerClientSideFiltering&&(this.controller.extent?(this.controller.extent=null,this._controllerClientSideFiltering=!0,!0):(this.controller.extent=e,!0));case"feature-tile-3d":return this.controller.extent=e,!0}},t.prototype.validateGeometryType=function(){var e=this.layer;switch(e.geometryType){case"multipatch":case"multipoint":return p.reject(new o("featurelayerview3d:unsupported-geometry-type","Unsupported geometry type ${geometryType}",{geometryType:e.geometryType}))}},t.prototype._rejectQuery=function(){return p.reject(new o("featurelayerview3d:query","Not ready to execute query"))},i([c.property()],t.prototype,"loadedGraphics",void 0),i([c.property({dependsOn:["graphics3d.suspended"]})],t.prototype,"suspended",void 0),i([c.property({dependsOn:["graphics3d.updating","controller.updating","overlayUpdating"]})],t.prototype,"updating",void 0),i([c.property()],t.prototype,"controller",void 0),i([c.property()],t.prototype,"graphics3d",void 0),i([c.property({readOnly:!0})],t.prototype,"asyncGraphicsUpdates",void 0),i([c.property({readOnly:!0})],t.prototype,"suspendResumeExtentMode",void 0),i([c.property({aliasOf:"graphics3d.graphicsCore.hasDraped"})],t.prototype,"hasDraped",void 0),i([c.property({readOnly:!0,type:Boolean})],t.prototype,"supportsDraping",void 0),i([c.property({type:Boolean})],t.prototype,"overlayUpdating",void 0),i([c.property()],t.prototype,"drawingOrder",null),t=i([c.subclass("esri.views.3d.layers.FeatureLikeLayerView3D")],t)}(c.declared(d))});