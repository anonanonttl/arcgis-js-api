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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Graphic","../../../core/Collection","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","./LayerView3D","./graphics/Graphics3DFrustumVisibility","./graphics/Graphics3DGraphicLikeLayerView","./graphics/Graphics3DHighlights","./graphics/graphicUtils","./graphics/stats","./support/projectExtentUtils"],function(i,t,e,r,s,p,n,a,o,h,u,d,c,l,g,y){return function(i){function t(){var t=null!==i&&i.apply(this,arguments)||this;return t.highlights=new c,t.frustumVisibility=new u,t.supportsDraping=!0,t.overlayUpdating=!1,t.suspendResumeExtent=null,t.fullExtentInLocalViewSpatialReference=null,t.frameWorker=null,t}return e(t,i),t.prototype.initialize=function(){var i=this;this._set("graphics3d",new d({owner:this,layer:this.layer,scaleVisibilityEnabled:!0})),this.graphics3d.setup(),this.frustumVisibility.setup(this),this.highlights.setup(this.graphics3d.graphicsCore),this.setupSuspendResumeExtent(),this.handles.add(this.watch("fullOpacity",function(){return i.graphics3d.graphicsCore.opacityChange()})),this.handles.add(this.layer.on("graphic-update",function(t){return i.graphics3d.graphicsCore.graphicUpdateHandler(t)})),this.frameWorker=this.view.resourceController.registerIdleFrameWorker({needsUpdate:function(){return i.frustumVisibility.needsIdleUpdate()},idleFrame:function(t){return i.frustumVisibility.idleUpdate(t)}});var t=y.toViewIfLocal(this).then(function(t){i.fullExtentInLocalViewSpatialReference=t});t&&this.addResolvingPromise(t),this.drawingOrder=this.view.getDrawingOrder(this.layer.uid),this.handles.add(a.whenTrueOnce(this.view,"basemapTerrain.ready",function(){return i.notifyChange("updating")}))},t.prototype.destroy=function(){this.frameWorker&&(this.frameWorker.remove(),this.frameWorker=null),this.frustumVisibility&&(this.frustumVisibility.destroy(),this._set("frustumVisibility",null)),this.graphics3d&&(this.graphics3d.destroy(),this._set("graphics3d",null)),this.highlights&&(this.highlights.destroy(),this.highlights=null)},Object.defineProperty(t.prototype,"drawingOrder",{set:function(i){this.graphics3d.graphicsCore.setDrawingOrder(i),this._set("drawingOrder",i)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"graphics3DGraphics",{get:function(){return this.graphics3d.graphicsCore.graphics3DGraphics},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"graphics3DGraphicsKeys",{get:function(){return this.graphics3d.graphicsCore.graphics3DGraphicsKeys},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"symbolUpdateType",{get:function(){return this.graphics3d.graphicsCore.symbolUpdateType},enumerable:!0,configurable:!0}),t.prototype.getRenderingInfo=function(i){return{symbol:i.symbol||null}},t.prototype.getGraphicFromGraphicUid=function(i){return this.graphics3d.getGraphicFromGraphicUid(i)},t.prototype.whenGraphicBounds=function(i,t){return this.graphics3d.whenGraphicBounds(i,t)},t.prototype.queryGraphics=function(){return n.resolve(this.loadedGraphics)},t.prototype.highlight=function(i,t){if(i instanceof s)return this.highlight([i],t);if(i instanceof p&&(i=i.toArray()),Array.isArray(i)&&i.length>0&&i[0]instanceof s){var e=i,r=e.map(function(i){return i.uid}),n=this.highlights.acquireSet(t,null),a=n.set,o=n.handle;return this.highlights.setUids(a,r),o}return{remove:function(){}}},t.prototype.getStats=function(){var i=g.stats(this,this.graphics3d.graphicsCore);return i.elevationUpdating=this.graphics3d.elevationAlignment.updating,i.visibilityFrustum=!this.frustumVisibility.suspended,i.visibilityScale=!0,i},t.prototype.canResume=function(){return!!this.inherited(arguments)&&((!this.frustumVisibility||!this.frustumVisibility.suspended)&&!this.graphics3d.suspended)},t.prototype.isUpdating=function(){return!(!(this.overlayUpdating||this.graphics3d&&this.graphics3d.updating||this.frustumVisibility&&this.frustumVisibility.updating)&&this.view.basemapTerrain&&this.view.basemapTerrain.ready)},t.prototype.setupSuspendResumeExtent=function(){var i=this;a.init(this.graphics3d.graphicsCore,"computedExtent",function(t){i.suspendResumeExtent=l.enlargeExtent(t,i.suspendResumeExtent,1.2),i.frustumVisibility.setExtent(i.suspendResumeExtent)},!0)},r([o.property({aliasOf:"layer.graphics"})],t.prototype,"loadedGraphics",void 0),r([o.property({dependsOn:["frustumVisibility.suspended","graphics3d.suspended"]})],t.prototype,"suspended",void 0),r([o.property({dependsOn:["frustumVisibility.updating","graphics3d.updating","overlayUpdating"]})],t.prototype,"updating",void 0),r([o.property()],t.prototype,"layer",void 0),r([o.property()],t.prototype,"highlights",void 0),r([o.property({readOnly:!0})],t.prototype,"frustumVisibility",void 0),r([o.property({readOnly:!0})],t.prototype,"graphics3d",void 0),r([o.property({aliasOf:"graphics3d.graphicsCore.hasDraped"})],t.prototype,"hasDraped",void 0),r([o.property({type:Boolean})],t.prototype,"supportsDraping",void 0),r([o.property({type:Boolean})],t.prototype,"overlayUpdating",void 0),r([o.property()],t.prototype,"drawingOrder",null),t=r([o.subclass("esri.views.3d.layers.GraphicsLayerView3D")],t)}(o.declared(h))});