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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","dojo/on","../../../Graphic","../../../core/Accessor","../../../core/Handles","../../../core/Logger","../../../core/accessorSupport/decorators","../../../geometry/Point","../../../geometry/support/aaBoundingRect","../../../symbols/SimpleMarkerSymbol","../lib/glMatrix","../state/utils/viewUtils","../support/debugFlags","../support/debugFlags","../support/earthUtils","../support/mathUtils","../support/projectionUtils","../webgl-engine/lib/Selector","../webgl-engine/lib/Util"],function(e,t,r,i,a,n,s,o,l,h,c,d,v,y,u,p,_,g,f,w,O,S){function x(e,t){var r=Math.max(e,t);return r+=256,r=S.nextHighestPowerOfTwo(r),r=Math.min(r,2048)}function R(e,t){for(var r=p.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS?0:I.EXTENTS_DIFFER_THRESHOLD*Math.max(e[2]-e[0],e[3]-e[1],t[2]-t[0],t[3]-t[1]),i=0;i<4;i++)if(Math.abs(t[i]-e[i])>r)return!0;return!1}var T,m=[[-.1,-2,3.9,2],[-.1,-3.9,3.9,.1],[-2,-3.9,2,.1],[-3.9,-3.9,.1,.1],[-3.9,-2,.1,2],[-3.9,-.1,.1,3.9],[-2,-.1,2,3.9],[-.1,-.1,3.9,3.9]],M=l.getLogger("esri.views.3d.OverlayManager"),I=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new o,t._overlaySR=null,t._renderSR=null,t._overlaySREqualsRenderSR=!0,t._connectedLayers={},t._scale=0,t._dirty=!1,t._isSpherical=!1,t._latestOriginId=0,t.opacity=0,t}return r(t,e),Object.defineProperty(t.prototype,"hasHighlights",{get:function(){return this._renderer.hasHighlights},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this._stage=this.view._stage,this._renderer=this._stage.getDrapedTextureRenderer(),this._renderer.onHasHighlightsChanged=function(){return e.onHasHighlightsChanged()},this._renderer.onContentChanged=function(){return e.setOverlayDirty()},this.groundSelector=new O(this.view.viewingMode),this.groundSelector.enableBackfacesTerrain=!0,this.groundSelector.enableInvisibleTerrain=!0,this.groundSelector.enableHUDSelection=!1,this._handles.add(this.view.watch(["pointsOfInterest.renderPointOfView","pointsOfInterest.centerOnSurfaceFrequent.location"],function(){return e.setOverlayDirty()})),this._handles.add(this.view.on("resize",function(){return e.setOverlayDirty()}))},t.prototype.destroy=function(){for(var e in this._connectedLayers)this.unregisterLayerView(this._connectedLayers[e].layerView);this._disposeOverlays(),this._handles&&(this._handles.destroy(),this._handles=null)},t.prototype.onHasHighlightsChanged=function(){this.setOverlayDirty(),this.notifyChange("hasHighlights")},t.prototype.hasOverlays=function(){return!!this._overlays},t.prototype.setSpatialReference=function(e,t){this._overlaySR=e,e?(this._renderSR=this.view.renderSpatialReference,this._overlaySREqualsRenderSR=this._overlaySR.equals(this._renderSR),this._isSpherical=t,this._longitudeCyclical=t?e.isWebMercator?new f.Cyclical(-20037508.342788905,20037508.342788905):new f.Cyclical(-180,180):null):(this._disposeOverlays(),this._longitudeCyclical=null)},t.prototype.registerLayerView=function(e){var t=this,r=e.layer.uid;if(this._connectedLayers[r])return void M.warn("[OverlayManager#registerLayerView]: Layer "+r+" is already connected");var i=a(e,"draped-data-change",function(){return t.setOverlayDirty()});this._connectedLayers[r]={eventHandles:[i],layerView:e},e.setDrapingExtent&&this._overlays&&[this._overlays.inner,this._overlays.outer].forEach(function(r,i){e.setDrapingExtent(i,r.extent,t._overlaySR,r.resolution,r.renderLocalOrigin)}),this.setOverlayDirty(),this._setLayerViewOverlayUpdating(e,this._dirty)},t.prototype.unregisterLayerView=function(e){for(var t in this._connectedLayers){var r=this._connectedLayers[t];if(r.layerView===e){if(r.eventHandles)for(var i=0;i<r.eventHandles.length;i++)r.eventHandles[i].remove();delete this._connectedLayers[t],this.setOverlayDirty(),e.destroyed||(e.overlayUpdating=!1)}}},t.prototype.setOverlayDirty=function(){this._dirty||(this._setOverlayUpdating(!0),this._dirty=!0)},t.prototype._setLayerViewOverlayUpdating=function(e,t){(!t||!e.suspended&&e.hasDraped)&&(e.overlayUpdating=t)},t.prototype._setOverlayUpdating=function(e){for(var t in this._connectedLayers){var r=this._connectedLayers[t].layerView;this._setLayerViewOverlayUpdating(r,e)}var i=this.view.graphicsView;i&&(i.overlayUpdating=e)},t.prototype.updateOverlays=function(){if(this._overlaySR){var e=x(this.view.width,this.view.height);this._computeOverlayExtents(e,b),this._overlays||this._initOverlays(),this._updateOverlay(this._overlays.inner,0,b.inner,e),this._updateOverlay(this._overlays.outer,1,b.outer,e),this.opacity=1,this._setOverlayUpdating(!1),this._drawOverlays(),this.terrainSurface._updateTileOverlayParams(),this._dirty=!1}},t.prototype._updateOverlay=function(e,t,r,i){if(R(r,e.extent)||i!==e.resolution){d.set(e.extent,r),e.resolution=i,e.renderLocalOrigin={id:"OV_"+this._latestOriginId++,vec3:d.center(e.extent,y.vec3d.create())};for(var a in this._connectedLayers){var n=this._connectedLayers[a].layerView;n.setDrapingExtent&&n.setDrapingExtent(t,r,this._overlaySR,i,e.renderLocalOrigin)}}},t.prototype.overlaysNeedUpdate=function(){return this._dirty&&!!this._overlaySR},t.prototype.updateOpacity=function(e){var t=1;if(this._overlays){var r=this._scale,i=e;3.5*i<r&&(t=(i-r/10)/(r/3.5-r/10),t=Math.sqrt(f.clamp(t,0,1)))}return t},t.prototype.setOverlayParamsOfTile=function(e,t,r){var i=this._overlays.inner,a=this._overlays.outer,n=d.intersection(e.extent,e.parentSurface.extent,V);this._rectInsideRect(n,i.extent)?(this._setTileOverlayData(n,i,t.overlays[0]),this._invalidateTileOverlayData(t.overlays[1])):this._rectanglesOverlap(n,i.extent)?(this._setTileOverlayData(n,i,t.overlays[0]),this._setTileOverlayData(n,a,t.overlays[1])):this._rectanglesOverlap(n,a.extent)?(this._setTileOverlayData(n,a,t.overlays[0]),this._invalidateTileOverlayData(t.overlays[1])):(this._invalidateTileOverlayData(t.overlays[0]),this._invalidateTileOverlayData(t.overlays[1])),t.overlayOpacity=void 0!==r?r:1},t.prototype._setTileOverlayData=function(e,t,r){var i=t.extent;r.texScale[0]=(e[2]-e[0])/(i[2]-i[0]),r.texScale[1]=(e[3]-e[1])/(i[3]-i[1]);var a=e[0];if(this._longitudeCyclical){a=this._longitudeCyclical.minimalMonotonic(i[0],a);var n=this._longitudeCyclical.minimalMonotonic(i[0],e[2]);a>n&&(a=n-(e[2]-e[0]))}r.texOffset[0]=(a-i[0])/(i[2]-i[0]),r.texOffset[1]=(e[1]-i[1])/(i[3]-i[1]),r.renderTargetId=t.valid?t.renderTargetId:null,r.highlightRenderTargetId=t.highlightValid?t.highlightRenderTargetId:null},t.prototype._invalidateTileOverlayData=function(e){e.renderTargetId=null,e.highlightRenderTargetId=null},t.prototype.overlayPixelSizeInMapUnits=function(e){var t;return this._overlays&&(t=this._pointIsInExtent(e,this._overlays.inner.extent)?this._overlays.inner:this._overlays.outer),t?(t.extent[2]-t.extent[0])/t.resolution:0},t.prototype._createEmptyOverlay=function(e){var t=this._renderer.createRenderTarget("overlay"+e),r=this._renderer.createHighlightRenderTarget("overlayHighlight"+e);return{extent:d.create(),resolution:0,renderTargetId:t,valid:!1,highlightRenderTargetId:r,highlightValid:!1,renderLocalOrigin:{id:"O",vec3:[0,0,0]}}},t.prototype._initOverlays=function(){this._overlays={inner:this._createEmptyOverlay(0),outer:this._createEmptyOverlay(1)}},t.prototype._disposeOverlays=function(){this._overlays&&(this._renderer.disposeRenderTarget(this._overlays.inner.renderTargetId),this._renderer.disposeRenderTarget(this._overlays.inner.highlightRenderTargetId),this._renderer.disposeRenderTarget(this._overlays.outer.renderTargetId),this._renderer.disposeRenderTarget(this._overlays.outer.highlightRenderTargetId),this._overlays=null)},t.prototype._intersectGroundFromView=function(e,t,r,i){var a=y.vec3d.createFrom(t*this.view.width,r*this.view.height,1);y.vec3d.unproject(a,e.viewMatrix,e.projectionMatrix,e.fullViewport,a);var n=y.vec3d.createFrom(t*this.view.width,r*this.view.height,0);return y.vec3d.unproject(n,e.viewMatrix,e.projectionMatrix,e.fullViewport,n),this.groundSelector.init([],n,a,null,e,null,!1),this.view.basemapTerrain.intersect(this.groundSelector,n,a),this.groundSelector.minResult.getIntersectionPoint(i)},t.prototype._findHorizonBasedPointOfInterest=function(e,t,r){var i=.5;if("global"===this.view.viewingMode){var a=y.vec3d.create(e.eye);y.vec3d.normalize(a),y.vec3d.negate(a);var n=y.vec3d.length(t),s=Math.asin(n/y.vec3d.length(e.eye)),o=Math.acos(y.vec3d.dot(e.viewForward,a)),l=s-(o-.5*e.fovY),h=f.clamp(l/e.fovY,0,1),c=-s-(o-.5*e.fovY),d=f.clamp(c/e.fovY,0,1);i=1===h&&0===d?.5:d+.55*(h-d)}else{var v=.5*Math.PI-Math.acos(-e.viewForward[2]),u=Math.tan(v),p=y.mat4d.multiplyVec4(e.projectionMatrix,y.vec4d.createFrom(0,u,1,0))[1],_=f.clamp(.5+.5*p,0,1);i=1===_||0===_?.5:e.eye[2]>0?.55*_:1-.55*(1-_)}return!!this._intersectGroundFromView(e,.5,i,r)},t.prototype._computeOverlayExtents=function(e,t){var r=this.view.state.camera,i=this.terrainSurface.extent,a=y.vec3d.create(),s=this.view.pointsOfInterest.centerOnSurfaceFrequent.renderLocation;this._findHorizonBasedPointOfInterest(r,this.view.pointsOfInterest.centerOnSurfaceFrequent.renderLocation,a)||y.vec3d.set(s,a),this._scale=this.view.renderCoordsHelper.getAltitude(r.eye);var o=y.vec3d.dist(r.eye,a),l=u.viewAngle(this.view.renderCoordsHelper,s,r.eye),h=Math.PI/2-Math.abs(l-Math.PI/2);if(_.OVERLAY_SHOW_CENTER){var p=new v({color:[255,0,0],outline:{color:[255,255,255],width:2}}),O=new c;w.vectorToPoint(a,this._renderSR,O,this._overlaySR);var S=new n({geometry:O,symbol:p});void 0!==T&&this.view.graphics.remove(T),this.view.graphics.add(S),T=S}this._overlaySREqualsRenderSR||w.vectorToVector(a,this._renderSR,a,this._overlaySR);var x=.5*e*r.perPixelRatio*o*2,R=!1,M=1/0;this._isSpherical&&(this._overlaySR.isWebMercator?(x/=Math.cos(w.webMercator.y2lat(a[1])),M=this.terrainSurface.extent[3],M*=.999):(R=!0,x/=g.metersPerDegree,M=90),x>=M&&(x=M,a[1]=0,this._overlaySR.isWebMercator&&(a[0]=0)));var I=1;R&&(I=1/Math.max(.2,Math.cos(Math.abs(f.deg2rad(a[1])))),x*I>180&&(I=180/x));var C=x*I,E=t.inner;E[0]=a[0]-C,E[1]=a[1]-x,E[2]=a[0]+C,E[3]=a[1]+x,this._isSpherical&&this._shiftExtentToFitBounds(E,1/0,M);var H=t.outer;if(d.set(H,E),6*C>i[2]-i[0])d.set(H,i);else if(h<=.25*Math.PI)H[0]-=C,H[1]-=x,H[2]+=C,H[3]+=x;else{w.vectorToVector(r.eye,this._renderSR,D,this._overlaySR),y.vec2d.subtract(a,D,L);var b=-Math.atan2(L[1],L[0])+.125*Math.PI;b<0&&(b+=2*Math.PI);var F=Math.floor(b/(.25*Math.PI));y.vec4d.scale(m[F],2*x,L),L[0]*=I,L[2]*=I,y.vec4d.add(H,L,H)}if(this._isSpherical&&(H[0]=this._longitudeCyclical.clamp(H[0]),H[2]=this._longitudeCyclical.clamp(H[2]),H[1]=Math.max(H[1],-M),H[3]=Math.min(H[3],M)),!this._isSpherical&&i){var U=d.intersection(E,i,V),q=d.intersection(H,i,P);d.contains(U,q)&&(H[2]=H[0],H[3]=H[1])}},t.prototype._drawOverlays=function(){var e=this._overlays.inner.extent[2]-this._overlays.inner.extent[0];this._drawOverlay(this._overlays.inner,0,e),this._drawOverlay(this._overlays.outer,1,e)},t.prototype._drawOverlay=function(e,t,r){var i=this._renderer,a=e.extent,n=e.resolution,s=!!this._longitudeCyclical&&a[2]>this._longitudeCyclical.max,o=!!this._longitudeCyclical&&a[0]<this._longitudeCyclical.min;if(s||o){C.views=H;var l=void 0;l=s?this._longitudeCyclical.max-a[0]:this._longitudeCyclical.min-a[0];var h=Math.round(l/(a[2]-a[0])*n),c=C.views[0];y.vec4d.set4(0,0,h,n,c.viewport),y.vec4d.set4(a[0],a[1],this._longitudeCyclical.max,a[3],c.extent),s||(c.extent[0]+=this._longitudeCyclical.range);var v=C.views[1];y.vec4d.set4(h,0,n-h,n,v.viewport),y.vec4d.set4(this._longitudeCyclical.min,a[1],a[2],a[3],v.extent),s&&(v.extent[2]-=this._longitudeCyclical.range)}else C.views=E,d.set(C.views[0].extent,a),y.vec4d.set4(0,0,n,n,C.views[0].viewport);C.width=n,C.height=n,C.pixelRatio=r/(a[2]-a[0]),C.index=t,e.valid=i.draw(e.renderTargetId,C),e.highlightValid=i.drawHighlights(e.highlightRenderTargetId,C)},t.prototype._rectanglesOverlap=function(e,t){return this._longitudeCyclical?(this._longitudeCyclical.contains(t[0],t[2],e[0])||this._longitudeCyclical.contains(t[0],t[2],e[2])||this._longitudeCyclical.contains(e[0],e[2],t[0]))&&!(e[1]>t[3]||e[3]<t[1]):d.intersects(e,t)},t.prototype._rectInsideRect=function(e,t){return this._longitudeCyclical?this._longitudeCyclical.contains(t[0],t[2],e[0])&&this._longitudeCyclical.contains(t[0],t[2],e[2])&&e[1]>t[1]&&e[3]<t[3]:d.contains(t,e)},t.prototype._pointIsInExtent=function(e,t){if(this._longitudeCyclical)return this._longitudeCyclical.contains(t[0],t[2],e.x)&&e.y>=t[1]&&e.y<=t[3];var r=e.x,i=e.y;return r>t[0]&&r<t[2]&&i>t[1]&&i<t[3]},t.prototype._shiftExtentToFitBounds=function(e,t,r){var i=0,a=0;e[0]<-t?i=e[0]+t:e[2]>t&&(i=t-e[2]),e[1]<-r?a=e[1]+r:e[3]>r&&(a=r-e[3]),d.offset(e,i,a)},t.EXTENTS_DIFFER_THRESHOLD=1e-5,i([h.property()],t.prototype,"view",void 0),i([h.property()],t.prototype,"terrainSurface",void 0),i([h.property({type:Boolean})],t.prototype,"hasHighlights",null),t=i([h.subclass("esri.views.3d.terrain.OverlayManager")],t)}(h.declared(s)),C={width:0,height:0,pixelRatio:0,views:null,index:0},E=[{viewport:d.create(),extent:d.create()}],H=[E[0],{viewport:d.create(),extent:d.create()}],L=y.vec4d.create(),D=y.vec3d.create(),b={inner:d.create(),outer:d.create()},V=d.create(),P=d.create();return I});