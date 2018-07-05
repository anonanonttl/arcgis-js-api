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

define(["require","exports","../../../../core/tsSupport/extendsHelper","../../../../core/screenUtils","../../../../geometry/Polygon","../../../../geometry/support/aaBoundingBox","../../../../layers/graphics/dehydratedFeatures","./ElevationAligners","./Graphics3DDrapedGraphicLayer","./Graphics3DObject3DGraphicLayer","./Graphics3DSymbolCommonCode","./Graphics3DSymbolLayer","./graphicUtils","./lineUtils","../../lib/glMatrix","../../webgl-engine/Stage","../../webgl-engine/lib/Geometry","../../webgl-engine/lib/Object3D","../../webgl-engine/lib/RenderGeometry"],function(e,t,r,i,n,a,o,s,l,p,h,y,u,c,d,g,v,m,_){var f=d.vec3d,x=d.mat4d;return function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype._prepareResources=function(){var e=this.symbol,t=this._isPropertyDriven("size")||this._isPropertyDriven("color")||this._isPropertyDriven("opacity"),r={idHint:this._getStageIdHint(),width:this._getWidth(e),color:this._getMaterialOpacityAndColor()};if(!this._isPropertyDriven("size")){var i=u.validateSymbolLayerSize(r.width);if(i)return this._logWarning(i),void this.reject()}if(t||r.width>=1.5)this._isPropertyDriven("size")&&(r.width=0),this._material=c.createRibbonMaterial(r);else{if(!(r.width>0))return void this.reject();this._material=c.createNativeMaterial(r)}this._context.stage.add(g.ModelContentType.MATERIAL,this._material),this.resolve()},t.prototype._getWidth=function(e){return null!=e.size?i.pt2px(e.size):1},t.prototype.destroy=function(){e.prototype.destroy.call(this),this.isFulfilled()||this.reject(),this._material&&(this._context.stage.remove(g.ModelContentType.MATERIAL,this._material.id),this._material=null)},t.prototype.createGraphics3DGraphic=function(e){var t=e.renderingInfo,r=e.graphic,n=r.geometry;if("polyline"!==n.type&&"polygon"!==n.type&&"extent"!==n.type)return this._logWarning("unsupported geometry type for line symbol: "+n.type),null;if(!this._validateGeometry(n))return null;var a="polygon"===n.type||"extent"===n.type?"rings":"paths",o="graphic"+r.uid,s=this._getVertexOpacityAndColor(t,Float32Array,255),l=0;t.size&&this._isPropertyDriven("size")&&(l=h.getSingleSizeDriver(t.size),l=i.pt2px(l));var p=this.getGraphicElevationContext(r);return"on-the-ground"===p.mode?this._createAsOverlay(r,a,s,l,p,o):this._createAs3DShape(r,a,s,l,p,o,r.uid)},t.prototype.layerPropertyChanged=function(e,t,r){if("opacity"===e){var i=this._material.getColor();return this._material.setColor([i[0],i[1],i[2],this._getMaterialOpacity()]),!0}if("elevationInfo"===e){var n=this._elevationContext.mode;this._updateElevationContext();var a=this._elevationContext.mode;if(null==n||null==a)return!1;if("on-the-ground"===n&&"on-the-ground"===a)return!0;if(n!==a&&("on-the-ground"===n||"on-the-ground"===a))return!1;var o=h.needsElevationUpdates2D(a);for(var s in t){var l=t[s],p=r(l);if(p&&"object3d"===p.type){var y=l.graphic;p.needsElevationUpdates=o,p.elevationContext.set(this.getGraphicElevationContext(y))}}return!0}return!1},Object.defineProperty(t.prototype,"numberOfVertices",{get:function(){return 0},enumerable:!0,configurable:!0}),t.prototype._getOutlineGeometry=function(e,t){return t},t.prototype._getGeometry=function(e){var t=e.geometry;return"extent"===t.type&&(t=n.fromExtent(t)),t},t.prototype._createAs3DShape=function(e,t,r,i,n,a,l){var y=this._getGeometry(e),u=y[t],d=this._getOutlineGeometry(y,u),g=[],_=[],b=[],E=f.create(),D=new Array(6),G=h.getGeometryVertexData3D(d,o.hasZ(y),y.spatialReference,this._context.renderSpatialReference,this._context.elevationProvider,this._context.renderCoordsHelper,n);if(this._logGeometryCreationWarnings(G,u,t,"LineSymbol3DLayer"),d.length>0){for(var C=G.geometryData.outlines,w=G.eleVertexData,S=G.vertexData,A=0;A<C.length;++A){var P=C[A];if(!(P.count<=1)){var O=P.index,L=P.count;if(!this._context.clippingExtent||(h.computeBoundingBox(w,O,L,D),!h.boundingBoxClipped(D,this._context.clippingExtent))){h.chooseOrigin(S,O,L,E),h.subtractCoordinates(S,O,L,E);var M=new Float64Array(w.buffer,3*O*w.BYTES_PER_ELEMENT,3*L),R=new Float64Array(S.buffer,3*O*S.BYTES_PER_ELEMENT,3*L),B=c.createPolylineGeometry(R,M,"rings"===t,r,i),T=new v(B,a+"path"+A);T.singleUse=!0,g.push(T),_.push([this._material]);var z=x.identity();x.translate(z,E,z),b.push(z)}}}if(g.length>0){var U=new m({geometries:g,materials:_,transformations:b,castShadow:!1,metadata:{layerUid:this._context.layer.uid,graphicUid:l},idHint:a}),j=s.perVertexElevationAligner,F=new p(this,U,g,null,null,j,n);return F.alignedTerrainElevation=G.terrainElevation,F.needsElevationUpdates=h.needsElevationUpdates2D(n.mode),F}}return null},t.prototype._createAsOverlay=function(e,t,r,i,n,o){var s=this._getGeometry(e);this._material.renderPriority=this._symbolLayerOrder;var p=s[t],y=this._getOutlineGeometry(s,p),u=[],d=new Array(6),g=a.empty(),v=f.create(),m=h.getGeometryVertexDataDraped(y,s.spatialReference,this._context.overlaySR);if(this._logGeometryCreationWarnings(m,p,t,"LineSymbol3DLayer"),y.length>0){for(var b=m.vertexData,E=m.geometryData.outlines,D=0;D<E.length;++D){var G=E[D],C=G.index,w=G.count;if(h.computeBoundingBox(b,C,w,d),!h.boundingBoxClipped(d,this._context.clippingExtent)){a.expand(g,d),h.chooseOrigin(b,C,w,v),h.subtractCoordinates(b,C,w,v),h.setZ(b,C,w,this._getDrapedZ());var S=new Float64Array(b.buffer,3*C*b.BYTES_PER_ELEMENT,3*w),A=x.identity();x.translate(A,v,A);var P=c.createPolylineGeometry(S,null,"rings"===t,r,i),O=new _(P);O.material=this._material,O.center=[.5*(d[0]+d[3]),.5*(d[1]+d[4]),0],O.bsRadius=.5*Math.sqrt((d[3]-d[0])*(d[3]-d[0])+(d[4]-d[1])*(d[4]-d[1])),O.transformation=A,O.name=o,O.uniqueName=o+"#"+P.id,u.push(O)}}return new l(this,u,g)}return null},t}(y)});