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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Handles","../../../../core/accessorSupport/decorators","../../../../geometry/Point","../../lib/glMatrix","../PropertiesPool","./CameraOnSurface","./CenterOnSurface","./ContentGeometryUpdates","./disposeMembers","./Focus","./StableSurfaceCenter","./SurfaceGeometryUpdates","../../webgl-engine/lib/Selector"],function(e,t,r,n,i,a,s,o,u,c,d,f,p,l,h,y,O,C){Object.defineProperty(t,"__esModule",{value:!0});var A=Array,S=function(e){function t(t){var r=e.call(this,t)||this;return r.handles=new a,r.surfaceAltitudeAtCenter=0,r.surfaceAltitudeAtCenterDirty=!0,r.surfaceAltitudeAtCenterWithContent=0,r.surfaceAltitudeAtCenterWithContentDirty=!0,r.propertiesPool=new c.default({pointOfView:o,renderPointOfView:A},r),r.updateSurfaceAltitudeFrequentInterval=m,r.updateSurfaceAltitudeInfrequentInterval=w,r.renderPointOfView=[0,0,0],r}return r(t,e),t.prototype.initialize=function(){var e=this,t=this.view,r=t.state,n=t.basemapTerrain,i=t.renderCoordsHelper,a=t.map;this.surfaceSelector=new C(r.mode),r.isGlobal?this.surfaceSelector.enableBackfacesTerrain=!1:this.surfaceSelector.enableBackfacesTerrain=!0,this.surfaceSelector.enableInvisibleTerrain=!1,this.contentSelector=new C(r.mode),this.contentSelector.enableTerrain=!1;var s=this.estimateSurfaceAltitudeAtCenter.bind(this);this._set("centerOnSurfaceInfrequent",new f.default({state:r,surface:n,renderCoordsHelper:i,estimateSurfaceAltitudeAtCenter:s,altitudeEstimationInterval:this.updateSurfaceAltitudeInfrequentInterval})),this._set("centerOnSurfaceFrequent",new f.default({state:r,surface:n,renderCoordsHelper:i,estimateSurfaceAltitudeAtCenter:s,altitudeEstimationInterval:this.updateSurfaceAltitudeFrequentInterval})),this._set("centerOnContent",new f.default({state:r,surface:n,renderCoordsHelper:i,estimateSurfaceAltitudeAtCenter:this.estimateSurfaceAltitudeAtCenterWithContent.bind(this),altitudeEstimationInterval:this.updateSurfaceAltitudeFrequentInterval})),this._set("cameraOnSurface",new d.default({state:r,surface:n,renderCoordsHelper:i,altitudeEstimationInterval:this.updateSurfaceAltitudeInfrequentInterval,map:a})),this._set("surfaceGeometryUpdates",new O.default({state:r,surface:n,renderCoordsHelper:i,centerOnSurfaceInstances:[this.centerOnSurfaceFrequent,this.centerOnContent,this.centerOnSurfaceInfrequent]})),this._set("contentGeometryUpdates",new p.default({contentLayerViews:this.view.allLayerViews,renderCoordsHelper:i})),this._set("surfaceOrigin",new y.default({view:this.view})),this._set("focus",new h.default({state:r,surface:n,renderCoordsHelper:i,centerOnSurface:this.centerOnSurfaceFrequent})),this.handles.add(r.watch("camera",function(t){return e.cameraChanged(t)},!0)),this.handles.add(this.surfaceGeometryUpdates.events.on("request-update",function(){return e.updateCenterPointsOfInterest()})),this.handles.add(n.watch("extent",function(){return e.updateCenterPointsOfInterest()})),this.handles.add(this.contentGeometryUpdates.events.on("request-update",function(){return e.updateCenterOnContent()})),this.cameraChanged(this.view.state.camera),this.forceUpdate()},t.prototype.destroy=function(){l.default(this,"handles","centerOnSurfaceInfrequent","centerOnSurfaceFrequent","cameraOnSurface","centerOnContent","surfaceOrigin","focus","propertiesPool")},Object.defineProperty(t.prototype,"pointOfView",{get:function(){var e=this.propertiesPool.get("pointOfView");return this.view.renderCoordsHelper.fromRenderCoords(this.renderPointOfView,e,this.view.state.spatialReference),e},enumerable:!0,configurable:!0}),t.prototype.forceUpdate=function(){this.surfaceGeometryUpdates.forceUpdate(),this.centerOnSurfaceInfrequent.forceUpdate(),this.centerOnSurfaceFrequent.forceUpdate(),this.cameraOnSurface.forceUpdate(),this.centerOnContent.forceUpdate(),this.focus.forceUpdate()},t.prototype.hasPendingUpdates=function(){return this.surfaceGeometryUpdates.hasPendingUpdates()||this.centerOnContent.hasPendingUpdates()||this.centerOnSurfaceInfrequent.hasPendingUpdates()||this.cameraOnSurface.hasPendingUpdates()||this.centerOnSurfaceFrequent.hasPendingUpdates()||this.focus.hasPendingUpdates()},t.prototype.estimateSurfaceAltitudeAtCenterWithContent=function(){if(!this.surfaceAltitudeAtCenterWithContentDirty)return this.surfaceAltitudeAtCenterWithContent;this.surfaceAltitudeAtCenterWithContentDirty=!1;var e=this.view.state.camera;return this.view._stage.pickRay(e.eye,e.center,null,null,null,!1,this.contentSelector),this.contentSelector.minResult.getIntersectionPoint(v)?this.surfaceAltitudeAtCenterWithContent=this.view.renderCoordsHelper.getAltitude(v):this.surfaceAltitudeAtCenterWithContent=this.estimateSurfaceAltitudeAtCenter(),this.surfaceAltitudeAtCenterWithContent},t.prototype.estimateSurfaceAltitudeAtCenter=function(){if(!this.view.basemapTerrain)return 0;if(!this.surfaceAltitudeAtCenterDirty)return this.surfaceAltitudeAtCenter;this.surfaceAltitudeAtCenterDirty=!1;var e=this.view.state.camera;return this.surfaceSelector.init(null,e.eye,e.center,null,e,null,!1),this.view.basemapTerrain.intersect(this.surfaceSelector,e.eye,e.center),this.surfaceSelector.minResult.getIntersectionPoint(v)&&(this.surfaceAltitudeAtCenter=this.view.renderCoordsHelper.getAltitude(v)),this.surfaceAltitudeAtCenter},t.prototype.cameraChanged=function(e){this.updateCenterPointsOfInterest(e);var t=e.eye;this.renderPointOfView[0]===t[0]&&this.renderPointOfView[1]===t[1]&&this.renderPointOfView[2]===t[2]||this._set("renderPointOfView",u.vec3d.set(t,this.propertiesPool.get("renderPointOfView")))},t.prototype.updateCenterPointsOfInterest=function(e){void 0===e&&(e=this.view.state.camera),this.surfaceAltitudeAtCenterDirty=!0,this.surfaceAltitudeAtCenterWithContentDirty=!0,this.centerOnSurfaceFrequent.update(e),this.centerOnSurfaceInfrequent.update(e),this.cameraOnSurface.update(e),this.centerOnContent.update(e),this.focus.update(e)},t.prototype.updateCenterOnContent=function(){this.surfaceAltitudeAtCenterWithContentDirty=!0,this.centerOnContent.update(this.view.state.camera)},n([s.property({constructOnly:!0})],t.prototype,"updateSurfaceAltitudeFrequentInterval",void 0),n([s.property({constructOnly:!0})],t.prototype,"updateSurfaceAltitudeInfrequentInterval",void 0),n([s.property({readOnly:!0})],t.prototype,"centerOnContent",void 0),n([s.property({readOnly:!0})],t.prototype,"centerOnSurfaceFrequent",void 0),n([s.property({readOnly:!0})],t.prototype,"centerOnSurfaceInfrequent",void 0),n([s.property({readOnly:!0})],t.prototype,"cameraOnSurface",void 0),n([s.property({readOnly:!0})],t.prototype,"focus",void 0),n([s.property({readOnly:!0})],t.prototype,"surfaceOrigin",void 0),n([s.property({readOnly:!0})],t.prototype,"contentGeometryUpdates",void 0),n([s.property({readOnly:!0,dependsOn:["renderPointOfView"]})],t.prototype,"pointOfView",null),n([s.property({readOnly:!0})],t.prototype,"renderPointOfView",void 0),n([s.property({readOnly:!0})],t.prototype,"surfaceGeometryUpdates",void 0),n([s.property({constructOnly:!0})],t.prototype,"view",void 0),t=n([s.subclass("esri.views.3d.support.PointsOfInterest")],t)}(s.declared(i));t.PointsOfInterest=S;var v=u.vec3d.create(),m=200,w=3e3;t.default=S});