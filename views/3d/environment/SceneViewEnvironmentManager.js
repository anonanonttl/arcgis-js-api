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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Color","../../../core/Accessor","../../../core/Evented","../../../core/Handles","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/Point","../../../geometry/SpatialReference","../../../geometry/support/webMercatorUtils","./EnvironmentRenderer","../lib/glMatrix","../support/earthUtils","../support/sunUtils","../webgl-engine/lighting/Lightsources","../../../webscene/background/ColorBackground"],function(e,t,i,n,r,o,s,a,c,d,h,p,l,u,f,_,v,g,P,m){Object.defineProperty(t,"__esModule",{value:!0});var w=[.5773502691896258,-.5773502691896258,.5773502691896258],y=function(e){function t(t){var i=e.call(this)||this;return i.referencePointUpdateDelay=200,i.referencePointUpdateInterval=3e3,i.referencePointUpdateDistThreshold=1e6,i._referencePosUpdateQuery=null,i._referencePosMapCoordsRequested=null,i._viewHandles=new a,i._preserveAbsoluteDateTime=!1,i._trackingEnabled=!1,i._viewConnected=!1,i._referencePosResetPreserveAbsoluteTime=!1,i._referencePosUpdateTimer=null,i._referencePosWGS84=null,i._referencePosMapCoords=null,i._mainLight=new P.MainLight,i._ambientLight=new P.AmbientLight,i._moonLight=new P.FillLight,i._environmentRenderer=null,i._resetReferencePosition(),i}return i(t,e),t.prototype.destroy=function(){this._viewHandles.destroy(),this.disposeRendering()},Object.defineProperty(t.prototype,"updating",{get:function(){return!(this.noReferencePositionQueries||!this._referencePosUpdateQuery&&!this._referencePosMapCoordsRequested)},enumerable:!0,configurable:!0}),t.prototype.updateReadyChange=function(e){e&&!this._viewConnected?(this._viewConnected=!0,this.connectView(this.view)):!e&&this._viewConnected&&(this._viewConnected=!1,this.disconnectView(this.view))},t.prototype.disposeRendering=function(){this._environmentRenderer&&(this._environmentRenderer.destroy(),this._environmentRenderer=null),this._resetReferencePosition(!0)},t.prototype.connectView=function(e){this._environmentRenderer=new f({view:e}),this._viewHandles.add([d.on(this.view,"environment.lighting","date-will-change",this._lightingDateHandler.bind(this)),this.view.watch("interacting,stationary",this._interactingStationaryHandler.bind(this)),this.view.watch(["environment.lighting.directShadowsEnabled","environment.lighting.ambientOcclusionEnabled","environment.background.color"],this._updateRenderParamsHandler.bind(this)),this.view.watch("spatialReference",this._spatialReferenceHandler.bind(this)),d.init(this.view,"viewingMode",this._viewingModeHandler.bind(this)),d.init(this.view,"environment.lighting.cameraTrackingEnabled",this._updateCameraTracking.bind(this),!0),this.watch("noReferencePositionQueries",this._cameraHandler.bind(this,null))]),this._updateRenderParamsHandler(),this._updateLightParams(),this._cameraHandler()},t.prototype._updateCameraTracking=function(e){if(this._trackingEnabled=e,e){var t=d.init(this,"view.state.camera",this._cameraHandler.bind(this,null),!0);this._viewHandles.add(t,"camera")}else{var i=this.get("view.environment.lighting");i&&(i.positionTimezoneInfo.autoUpdated=!1),this._viewHandles.remove("camera")}},t.prototype.disconnectView=function(e){this.disposeRendering(),this._viewHandles.removeAll()},t.prototype._lightingDateHandler=function(e){var t=e.date;if(t){var i=this.view.environment.lighting;if(!i.positionTimezoneInfo.autoUpdated){this._preserveAbsoluteDateTime=!0;var n=this.view.spatialReference;if(!n.isWGS84&&!n.isWebMercator){var r=this.view.camera.position;if(!this._referencePosMapCoords||!this._referencePosMapCoords.equals(r))return void this._requestReferencePositionUpdate(r)}if(this._preupdateTracking(t),this._referencePosWGS84){var o=v.positionToTimezone(this._referencePosWGS84,b);i.autoUpdate(null,o),this._trackingEnabled&&(i.positionTimezoneInfo.autoUpdated=!0)}}this._updateLightParams(t)}},t.prototype._preupdateTracking=function(e){!this._trackingEnabled&&this.get("view.environment.lighting.cameraTrackingEnabled")&&this._cameraHandler(e)},t.prototype._cameraHandler=function(e){if(void 0===e&&(e=null),this.view.ready){var t=this.view.camera;if(t){var i=this.view.spatialReference;i.isWGS84||i.isWebMercator?this._cameraHandlerGlobal(t,e):this._cameraHandlerLocal(t,e)}}},t.prototype._cameraHandlerGlobal=function(e,t){var i=e.position;this._referencePosWGS84||(this._referencePosWGS84=new p({spatialReference:l.WGS84})),i.spatialReference.isWebMercator?u.webMercatorToGeographic(i,!1,this._referencePosWGS84):(this._referencePosWGS84.x=i.x,this._referencePosWGS84.y=i.y),this._referencePosWGS84.z=i.z,this._autoUpdateTimezone(i,t)||this._updateLightParams(t)},t.prototype._cameraHandlerLocal=function(e,t){var i=e.position;(!this._referencePosMapCoords||this._referencePosMapCoordsRequested||this._exceedsReferencePosDistThreshold(i))&&this._requestReferencePositionUpdate(i,!0),this.view.mapCoordsHelper&&this._referencePosWGS84&&(this._referencePosWGS84.z=i.z*this.view.mapCoordsHelper.unitInMeters,this._referencePosChanged())},t.prototype._interactingStationaryHandler=function(){!this.view.interacting&&this.view.stationary&&this._executePendingReferencePositionUpdate()},t.prototype._updateLightParams=function(e){void 0===e&&(e=null);var t=this.view.environment.lighting;e=e||t.date;var i,n=this.view._stage;this._referencePosWGS84?(i=g.computeColorAndIntensity(e,this._referencePosWGS84),g.computeDirection(e,this._referencePosWGS84,this.view.viewingMode,i.diffuse.direction)):i={diffuse:{color:[1,1,1],intensity:.55,direction:w},ambient:{color:[1,1,1],intensity:.55},noonFactor:.5,globalFactor:0},_.vec3d.scale(i.diffuse.color,i.diffuse.intensity*Math.PI,this._mainLight.intensity),_.vec3d.negate(i.diffuse.direction,this._mainLight.direction),_.vec3d.scale(i.ambient.color,i.ambient.intensity,this._ambientLight.intensity),_.vec3d.lerp(U,C,i.globalFactor,this._moonLight.intensity);var r=(1-.5*i.globalFactor)*(1-.4*i.noonFactor*(1-i.globalFactor));_.vec3d.scale(this._moonLight.intensity,r),_.vec3d.set(i.diffuse.direction,this._moonLight.direction),n.setLighting({lights:[this._mainLight,this._ambientLight,this._moonLight],globalFactor:i.globalFactor,groundLightingFactor:1-i.noonFactor}),this._updateRenderParamsHandler()},t.prototype._autoUpdateTimezone=function(e,t){if(void 0===t&&(t=null),!this.view.get("environment.lighting.cameraTrackingEnabled"))return!1;var i=R;i.setTime((t||this.view.environment.lighting.date).getTime());var n=v.positionToTimezone(e,b),r=this.view.environment.lighting.positionTimezoneInfo;if(r.autoUpdated){if(r.hours===n.hours&&r.minutes===n.minutes&&r.seconds===n.seconds)return!1}else r=n;var o=i.getUTCHours()-(n.hours-r.hours),s=i.getUTCMinutes()-(n.minutes-r.minutes),a=i.getUTCSeconds()-(n.seconds-r.seconds);return i.setUTCHours(o),i.setUTCMinutes(s),i.setUTCSeconds(a),!t&&this.view.environment.lighting.autoUpdate(i,n)},t.prototype._updateRenderParamsHandler=function(){var e=this.view._stage,t=!0;this._referencePosWGS84&&(t=g.computeShadowsEnabled(this._referencePosWGS84,this.view.viewingMode));var i,n=this.view.environment.background;i=n instanceof m?{type:"color",color:r.toUnitRGBA(n.color)}:{type:"color",color:[0,0,0,1]},e&&e.setRenderParams({shadowMap:this.view.environment.lighting.directShadowsEnabled&&t,ssao:this.view.environment.lighting.ambientOcclusionEnabled,background:i})},t.prototype._spatialReferenceHandler=function(){this._resetReferencePosition()},t.prototype._viewingModeHandler=function(){this._resetReferencePosition()},t.prototype._resetReferencePosition=function(e){void 0===e&&(e=!1),this._cancelReferencePosUpdates(),this._referencePosMapCoords=null,this._referencePosMapCoordsRequested=null,this._referencePosResetPreserveAbsoluteTime=null,this._referencePosWGS84=null,e||this.notifyChange("updating")},t.prototype._requestReferencePositionUpdate=function(e,t){var i=this;if(void 0===t&&(t=!1),this.view.mapCoordsHelper.canProject()&&!this.noReferencePositionQueries&&(this._referencePosMapCoordsRequested?this._referencePosMapCoordsRequested.copy(e):this._referencePosMapCoordsRequested=e.clone(),this._referencePosResetPreserveAbsoluteTime=!!t,!this._referencePosUpdateQuery&&!this._referencePosUpdateTimer&&!this.view.interacting&&this.view.stationary)){var n=this._referencePosUpdateQuery=c.after(this.referencePointUpdateDelay).then(function(){if(i._referencePosUpdateQuery===n){var e=function(){return i._referencePosUpdateQuery!==n};return i._doReferencePositionUpdateQuery(e)}}).always(function(){i._referencePosUpdateQuery===n&&(i._referencePosUpdateQuery=null,i._referencePosUpdateTimer||i._executePendingReferencePositionUpdate(),i.notifyChange("updating"))}),r=this._referencePosUpdateTimer=c.after(this.referencePointUpdateInterval).then(function(){i._referencePosUpdateTimer===r&&(i._referencePosUpdateTimer=null,i._referencePosUpdateQuery||i._executePendingReferencePositionUpdate())});this.notifyChange("updating")}},t.prototype._doReferencePositionUpdateQuery=function(e){var t=this;return this._referencePosResetPreserveAbsoluteTime&&(this._preserveAbsoluteDateTime=!1),this._referencePosMapCoords?this._referencePosMapCoords.copy(this._referencePosMapCoordsRequested):this._referencePosMapCoords=this._referencePosMapCoordsRequested.clone(),this._referencePosResetPreserveAbsoluteTime=null,this._referencePosMapCoordsRequested=null,this.view.mapCoordsHelper.toGeographic(this._referencePosMapCoords).then(function(i){if(!e()&&!isNaN(i[0])&&!isNaN(i[1])){var n=t._referencePosMapCoords.z*t.view.mapCoordsHelper.unitInMeters;t._referencePosWGS84?(t._referencePosWGS84.x=i[0],t._referencePosWGS84.y=i[1],t._referencePosWGS84.z=n):t._referencePosWGS84=new p({x:i[0],y:i[1],z:n,spatialReference:l.WGS84}),t._referencePosChanged()}})},t.prototype._executePendingReferencePositionUpdate=function(){var e=this._referencePosMapCoordsRequested;e&&this._requestReferencePositionUpdate(e,this._referencePosResetPreserveAbsoluteTime)},t.prototype._referencePosChanged=function(){this._preserveAbsoluteDateTime?this._updateLightParams():this._autoUpdateTimezone(this._referencePosWGS84)||this._updateLightParams()},t.prototype._exceedsReferencePosDistThreshold=function(e){if(this._referencePosMapCoords){var t=this._referencePosMapCoords.distance(e);return this.view.mapCoordsHelper&&(t*=this.view.mapCoordsHelper.unitInMeters),t>this.referencePointUpdateDistThreshold}return!0},t.prototype._cancelReferencePosUpdates=function(){this._referencePosUpdateQuery=null,this._referencePosUpdateTimer=null},t.FIXED_LIGHT_DIRECTION=w,n([h.property({type:Boolean,dependsOn:["noReferencePositionQueries"],readOnly:!0})],t.prototype,"updating",null),n([h.property()],t.prototype,"noReferencePositionQueries",void 0),n([h.property({constructOnly:!0})],t.prototype,"view",void 0),n([h.property()],t.prototype,"_environmentRenderer",void 0),t=n([h.subclass("esri.views.3d.environment.SceneViewEnvironmentManager")],t)}(h.declared(o,s));t.SceneViewEnvironmentManager=y;var R=new Date,b={hours:0,minutes:0,seconds:0},U=_.vec3d.createFrom(.22,.22,.33),C=_.vec3d.createFrom(.22,.22,.22);t.default=y});