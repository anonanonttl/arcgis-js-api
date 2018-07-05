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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/extendsHelper","dojo/when","dojo/errors/CancelError","../../../../Color","../../../../core/Error","../../../../core/lang","../../../../core/screenUtils","../../../../core/sniff","../../../../core/urlUtils","../../../../symbols/support/symbolUtils","./ElevationAligners","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./SignedDistanceFunctions","../support/FastSymbolUpdates","../../lib/glMatrix","../../support/projectionUtils","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/GeometryUtil","../../webgl-engine/lib/RenderGeometry","../../webgl-engine/lib/Texture","../../webgl-engine/materials/HUDMaterial"],function(e,t,i,r,a,s,o,n,l,u,c,h,d,p,_,f,m,g,v,y,S,b,x,z,R,C,M,I,P){function O(e){return"cross"===e||"x"===e}function V(e){var t,i=j,r=i*q;switch("primitive:"===e.substring(0,10)&&(e=e.substring(10)),e){case W.PRIM_CIRCLE:t=y.computeSignedDistancefieldCicle(i,r);break;case W.PRIM_SQUARE:t=y.computeSignedDistancefieldSquare(i,r,!1);break;case W.PRIM_KITE:t=y.computeSignedDistancefieldSquare(i,r,!0);break;case W.PRIM_CROSS:t=y.computeSignedDistancefieldCrossAndX(i,r,!1);break;case W.PRIM_X:t=y.computeSignedDistancefieldCrossAndX(i,r,!0)}return new I(t,"sdf_"+e,{mipmap:!1,wrapClamp:!0,width:j,height:j,components:4})}var A=b.vec3d,U=b.vec4d,D=b.mat4d,E=D.identity(),T=[0,0,1],G=[0,0,0,0],w=[0,0,0],L=[1,1,1],F=["center","bottom","top","left","right","bottom-left","bottom-right","top-left","top-right"],j=128,q=.5,B=[q/2,q/2,1-q/2,1-q/2],W={PRIM_CIRCLE:"circle",PRIM_SQUARE:"square",PRIM_CROSS:"cross",PRIM_X:"x",PRIM_KITE:"kite"},k=[j*q,j*q],H=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._elevationOptions={supportsOffsetAdjustment:!0,supportsOnTheGround:!0},t}return r(t,e),t.prototype._prepareResources=function(){var e=this.symbol,t=Math.round(null!=e.size?u.pt2px(e.size):16);this._size=null,this._symbolTextureRatio=1,this._primitive=null;var i=this._getStageIdHint();if(!this._isPropertyDriven("size")){var r=v.validateSymbolLayerSize(t);if(r)return this._logWarning(r),void this.reject()}this._isPropertyDriven("size")&&t<64&&(t=64);var a=e.resource||{primitive:"circle",href:void 0},s={anchorPos:this._getAnchorPos(e)},o=this.symbolContainer;if(this._hasVisibleVerticalOffset(o)){var n=o.verticalOffset,l=n.screenLength,c=n.minWorldLength,h=n.maxWorldLength;s.verticalOffset={screenLength:u.pt2px(l),minWorldLength:c||0,maxWorldLength:null!=h?h:1/0}}if(this._context.screenSizePerspectiveEnabled&&(s.screenSizePerspective=this._context.sharedResources.screenSizePerspectiveSettings),a.href)this._outlineSize=this._getOutlineSize(e,null),s.color=this._getFillColor(e,null),s.outlineColor=this._getOutlineColor(e),s.outlineSize=this._outlineSize,s.textureIsSignedDistanceField=!1,this._prepareImageResources(t,s,i);else{var d=a.primitive||"circle",p="primitive:"+d;if(this._primitive=d,this._outlineSize=this._getOutlineSize(e,d),s.color=this._getFillColor(e,d),s.outlineColor=this._getOutlineColor(e),s.outlineSize=this._outlineSize,O(d)&&0===s.outlineSize)return void this.reject();this.texture=this._context.sharedResources.textures.acquire(p,V),this._textureURI=p,s.textureIsSignedDistanceField=!0,s.distanceFieldBoundingBox=B,s.textureId=this.texture.id,this._size=[t,t],this._symbolTextureRatio=1/q,this._createMaterialsAndAddToStage(s,this._context.stage,i),this.resolve()}},t.prototype._getOutlineSize=function(e,t){var i=0;return i=e.outline&&null!=e.outline.size?u.pt2px(e.outline.size):O(t)?1.5:0,Math.max(i,0)},t.prototype._getOutlineColor=function(e){var t=this._getLayerOpacity();if(e.outline){if(null!=e.outline.color){var i=o.toUnitRGB(e.outline.color),r=e.outline.color.a*t;return[i[0],i[1],i[2],r]}return[0,0,0,t]}return[0,0,0,t]},t.prototype._getFillColor=function(e,t){return O(t)?G:this._getMaterialOpacityAndColor()},t.prototype._getAnchorPos=function(e){return F.indexOf(e.anchor)>-1?e.anchor:"center"},t.prototype._prepareImageResources=function(e,t,i){var r=this,o=function(a){if(!r.isRejected()){var s=a.params,o=s.width/s.height;r._size=e?o>1?[e,Math.round(e/o)]:[Math.round(e*o),e]:[s.width,s.height],t.textureId=a.id,r._createMaterialsAndAddToStage(t,r._context.stage,i),r.resolve()}},l=d.getIconHref(this.symbolContainer,this.symbol);if(!c("esri-canvas-svg-support")&&h.isSVG(l)){var u="IconSymbol3DLayer failed to load (SVG symbols are not supported in IE11)";return this._logWarning(u),void this.reject(new n("SVG Not Supported",u))}a(this._context.sharedResources.textures.acquire(l,null,e),o,function(e){if(e instanceof s)r.reject();else{var t="IconSymbol3DLayer failed to load (Request for icon resource failed: "+l+")";r._logWarning(t),r.reject(new n("Request Failed",t))}}),this._textureURI=l},t.prototype._createMaterialsAndAddToStage=function(e,t,r){this._fastUpdates=S.initFastSymbolUpdatesState(this._context.renderer,this._supportsShaderVisualVariables(),this._fastVisualVariableConvertOptions()),this._fastUpdates.enabled&&l.mixin(e,this._fastUpdates.materialParameters);var a=i({},e);a.verticalOffset=null,a.screenSizePerspective=null,a.occlusionTest=!1,a.shaderPolygonOffset=0,this._drapedMaterial=new P(a,r+"_iconDraped"),t.add(z.ModelContentType.MATERIAL,this._drapedMaterial),e.occlusionTest=!0,this._material=new P(e,r+"_icon"),t.add(z.ModelContentType.MATERIAL,this._material)},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(z.ModelContentType.MATERIAL,this._material.id),this._material=null),this._drapedMaterial&&(this._context.stage.remove(z.ModelContentType.MATERIAL,this._drapedMaterial.id),this._drapedMaterial=null),this._textureURI&&(this._context.sharedResources.textures.release(this._textureURI),this._textureURI=null)},t.prototype._getScaleFactor=function(e){if(this._isPropertyDriven("size")&&e.size){for(var t=0;t<3;t++){var i=e.size[t];i&&"symbolValue"!==i&&"proportional"!==i&&(e.size[t]=u.pt2px(i))}var r=this._size[0]>this._size[1]?this._size[0]:this._size[1];if("symbolValue"===e.size[0])return 1;if(isFinite(+e.size[0]))return+e.size[0]/r;if(isFinite(+e.size[2]))return+e.size[2]/r}return 1},t.prototype.createGraphics3DGraphic=function(e){var t=e.renderingInfo,i=e.graphic;if(!this._validateGeometry(i.geometry))return null;var r=m.placePointOnGeometry(i.geometry);if(!r)return this._logWarning("unsupported geometry type for icon symbol: "+i.geometry.type),null;var a="graphic"+i.uid,s=this._getVertexOpacityAndColor(t),o=1;this._fastUpdates.enabled&&this._fastUpdates.visualVariables.size||(o=this._getScaleFactor(t)),o*=this._symbolTextureRatio;var n=[this._size[0]*o,this._size[1]*o],l=this.getGraphicElevationContext(i);return"on-the-ground"===l.mode?this._createAsOverlay(i,r,s,n,l,a,i.uid):this._createAs3DShape(i,r,s,n,l,a,i.uid)},t.prototype.layerPropertyChanged=function(e,t,i){if("opacity"===e){var r=this._getFillColor(this.symbol,this._primitive);this._drapedMaterial.setParameterValues({color:r}),this._material.setParameterValues({color:r});var a=this._getOutlineColor(this.symbol);return this._drapedMaterial.setParameterValues({outlineColor:a}),this._material.setParameterValues({outlineColor:a}),!0}if("elevationInfo"===e){var s=this._elevationContext.mode;this._updateElevationContext();var o=this._elevationContext.mode;if("on-the-ground"===s&&"on-the-ground"===o)return!0;if(s!==o&&("on-the-ground"===s||"on-the-ground"===o))return!1;var n=m.needsElevationUpdates2D(o)||"absolute-height"===o;for(var l in t){var u=t[l],c=i(u);if(c&&"object3d"===c.type){var h=u.graphic,d=this.getGraphicElevationContext(h);c.needsElevationUpdates=n,c.elevationContext.set(d)}}return!0}return!1},t.prototype.applyRendererDiff=function(e,t,i,r){for(var a in e.diff)switch(a){case"visualVariables":if(!S.updateFastSymbolUpdatesState(this._fastUpdates,t,this._fastVisualVariableConvertOptions()))return!1;this._material.setParameterValues(this._fastUpdates.materialParameters),this._drapedMaterial.setParameterValues(this._fastUpdates.materialParameters);break;default:return!1}return!0},t.prototype.setDrawOrder=function(e,t,i){this.updateSymbolLayerOrder(e,t),this._drapedMaterial&&(this._drapedMaterial.renderPriority=e,i.add(this._drapedMaterial.id))},Object.defineProperty(t.prototype,"numberOfVertices",{get:function(){return 6},enumerable:!0,configurable:!0}),t.prototype._defaultElevationInfoNoZ=function(){return N},t.prototype._createAs3DShape=function(e,t,i,r,a,s,o){var n=this,l=this.getFastUpdateAttrValues(e),u=l?function(e){return S.evaluateModelTransform(n._fastUpdates.materialParameters,l,e)}:null,c=C.createPointGeometry(T,null,i,r,X,null,l),h=new R(c,s),d=[h],_=m.createStageObjectForPoint.call(this,t,d,[[this._material]],null,null,a,s,this._context.layer.uid,o,!0,u);if(null===_)return null;var g=p.perObjectElevationAligner,v=new f(this,_.object,d,null,null,g,a);return v.alignedTerrainElevation=_.terrainElevation,v.needsElevationUpdates=m.needsElevationUpdates2D(a.mode)||"absolute-height"===a.mode,v.getScreenSize=this._createScreenSizeGetter(r,u),v.calculateRelativeScreenBounds=function(e){return n._material.calculateRelativeScreenBounds(v.getScreenSize(),1,e)},m.extendPointGraphicElevationContext(v,t,this._context.elevationProvider),v},t.prototype._createAsOverlay=function(e,t,i,r,a,s,o){var n=this;this._drapedMaterial.renderPriority=this._symbolLayerOrder;var l=A.create();x.pointToVector(t,l,this._context.overlaySR),l[2]=this._getDrapedZ();var u=this._context.clippingExtent;if(u&&!m.pointInBox2D(l,u))return null;var c=this.getFastUpdateAttrValues(e),h=c?function(e){return S.evaluateModelTransform(n._fastUpdates.materialParameters,c,e)}:null,d=C.createPointGeometry(T,l,i,r,null,null,c),p=new M(d);p.material=this._drapedMaterial,p.center=l,p.bsRadius=0,p.transformation=E,p.name=s,p.uniqueName=s+"#"+d.id;var f=new _(this,[p],null);return f.getScreenSize=this._createScreenSizeGetter(r,h),f.calculateRelativeScreenBounds=function(e){return n._drapedMaterial.calculateRelativeScreenBounds(f.getScreenSize(),1,e)},f},t.prototype._createScreenSizeGetter=function(e,t){var i=this._outlineSize+2;if(this._fastUpdates.enabled){var r=e[0]/this._symbolTextureRatio,a=e[1]/this._symbolTextureRatio;return function(e){void 0===e&&(e=new Array(2));var s=t(E);return e[0]=s[0]*r+i,e[1]=s[5]*a+i,e}}var s=e[0]/this._symbolTextureRatio+i,o=e[1]/this._symbolTextureRatio+i;return function(e){return void 0===e&&(e=new Array(2)),e[0]=s,e[1]=o,e}},t.prototype._supportsShaderVisualVariables=function(){return!0},t.prototype._fastVisualVariableConvertOptions=function(){var e=this._size[0]>this._size[1]?this._size[0]:this._size[1],t=[e,e,e],i=u.px2pt(1),r=e*i;return{modelSize:t,symbolSize:[r,r,r],unitInMeters:i,transformation:{anchor:w,scale:L,rotation:w}}},t.prototype._hasVisibleVerticalOffset=function(e){return this.symbolContainer&&"point-3d"===this.symbolContainer.type&&this.symbolContainer.hasVisibleVerticalOffset()},t.PRIMITIVE_SIZE=k,t.VALID_ANCHOR_STRINGS=F,t}(g),N={mode:"relative-to-ground",offset:0},X=U.createFrom(0,0,0,1);return H});