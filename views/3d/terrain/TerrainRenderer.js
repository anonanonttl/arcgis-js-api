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

define(["require","exports","../../../core/tsSupport/extendsHelper","dojo/text!./TerrainMaterial.xml","../../../Color","../../../core/ObjectPool","../../../core/PooledArray","../../../core/promiseUtils","../../../geometry/support/aaBoundingBox","../lib/glMatrix","../support/imageUtils","./ResourceCounter","./TerrainConst","./TileGeometryFactory","./TileRenderData","./TileRenderer","./tileUtils","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/DefaultVertexBufferLayouts","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/RenderPass","../webgl-engine/lib/RenderSlot","../webgl-engine/lib/screenSizePerspectiveUtils","../webgl-engine/lib/ShaderVariations","../webgl-engine/lib/tracer","../webgl-engine/lib/Util","../webgl-engine/materials/internal/MaterialUtil","../../webgl/BufferObject","../../webgl/Util","../../webgl/VertexArrayObject"],function(e,t,r,i,n,s,a,o,l,d,h,c,u,p,f,g,v,m,T,b,y,R,S,_,x,O,D,w,P,E){function I(e){return function(t,r){var i=t.screenDepth,n=r.screenDepth;return i<n?-e:i>n?e:0}}function A(e){var t=I(e);return function(r,i){return 0===r.tiles.length?-e:0===i.tiles.length?e:t(r.tiles.data[0],i.tiles.data[0])}}function B(e,t,r){var i=e[0]*t[2]+t[0],n=e[1]*t[3]+t[1],s=e[2]*t[2],a=e[3]*t[3];d.vec4d.set4(i,n,s,a,r)}var U=O.assert,k=d.mat4d.identity(),L=R.OPAQUE_TERRAIN,N=R.TRANSPARENT_TERRAIN,M=d.vec3d.create(),H=d.vec2d.create(),z=l.create(),V=d.vec4d.create(),j=d.vec4d.create(),C=d.vec4d.create(),Q=function(){function e(){this.extent=d.vec4d.create(),this.minLevel=0,this.maxLevel=0,this.callback=null}return e}(),G=function(){function e(e,t){this.initialized=!1,this.rctx=null,this.renderDataPool=new s(f.TileRenderData),this.perOriginTileData=new a({initialSize:10,allocator:function(){return{root:null,origin:null,tiles:new a({initialSize:300})}}}),this.perOriginTileDataDirty=!0,this.tileIterator=new v.IteratorPreorder,this.highestVisibleLODTile=null,this.visible=!0,this.debugScreenSizePerspective=!1,this.wireframe=D.copyParameters(F),this._opaque=!0,this._skirtScale=1,this._drawBorders=!1,this._disableRendering=!1,this._cullBackFaces=!1,this._renderOrder=1,this._velvetOverground=!0,this._hasOverlays=!1,this.castShadows=!0,this.receiveShadows=!1,this.emptyTex=null,this.tileRenderer=null,this.backgroundPromise=null,this.tileBackgroundInitialized=!1,this.stencilEnabledLayerExtents=[],this.numTrianglesRendered=0,this.numTilesRendered=0,this.numTilesCulled=0,this.numOriginsRendered=0,this.resourceCounter=new c,this.clippingExtent=null,this.loaded=null,this._loaded=!1,this.needsRender=!0,this.didRender=!1,this.needsHighlight=!1,this.visibleScaleRangeQueries=new a({initialSize:10}),this.visibleScaleRangeQueriesInvPtr=0,this.visibleScaleRangeQueryQueue=new a({initialSize:30}),this.visibleScaleRangeQueryPool=new s(Q,!1),this.manifold=e,this.tileSize=t||256}return e.prototype.destroy=function(e){this.uninstall(e),this.backgroundPromise&&(this.backgroundPromise.cancel(),this.backgroundPromise=null)},e.prototype.install=function(e){e.addExternalRenderer([L,N],this),this.drapedRenderer=e.getDrapedTextureRenderer()},e.prototype.uninstall=function(e){e.removeExternalRenderer(this)},Object.defineProperty(e.prototype,"disableRendering",{set:function(e){this._disableRendering=!!e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"opaque",{set:function(e){this._opaque=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"skirtScale",{set:function(e){this._skirtScale=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"drawBorders",{set:function(e){this._drawBorders!==e&&(this._drawBorders=e,this._updatePrograms())},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"cullBackFaces",{set:function(e){this._cullBackFaces=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"renderOrder",{set:function(e){this._renderOrder=e,this.setNeedsRender()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"velvetOverground",{set:function(e){this._velvetOverground!==e&&(this._velvetOverground=e,this._updatePrograms())},enumerable:!0,configurable:!0}),e.prototype.setRootTiles=function(e){this.rootTiles=e,this.setNeedsRender()},e.prototype.setNeedsHighlight=function(e){this.needsHighlight=e,this.setNeedsRender()},e.prototype.setStencilEnabledLayerExtents=function(e){this.stencilEnabledLayerExtents=e,this.setNeedsRender()},e.prototype.setTileSize=function(e){this.tileSize=e,this.tileRenderer&&(this.tileRenderer.tileSize=e),this.setNeedsRender()},e.prototype.loadTile=function(e){U(null===e.renderData),e.renderData=this.renderDataPool.acquire(),e.renderData.init();var t=this.getLocalOriginOfTile(e);e.createGeometry(e.renderData.updateGeometryState(e),t,"debug"===this.wireframe.mode),e.renderData.localOrigin=t,this._updateTileGeometryBuffers(e),this.tileBackgroundInitialized&&this.tileRenderer.updateTileTexture(e)},e.prototype.queryVisibleLevelRange=function(e,t,r,i){var n=this.visibleScaleRangeQueryPool.acquire();d.vec4d.set(e,n.extent),n.minLevel=t||-Number.MAX_VALUE,n.maxLevel=null!=r?r:Number.MAX_VALUE,n.callback=i,this.visibleScaleRangeQueryQueue.push(n),this.setNeedsRender()},e.prototype.updateTileTexture=function(e){this.tileRenderer&&this.tileBackgroundInitialized&&this.tileRenderer.updateTileTexture(e)},e.prototype.updateTileGeometryNeedsUpdate=function(e){return e.renderData.updateGeometryState(e).needsUpdate},e.prototype._updateTileGeometry=function(e){for(var t=e.renderData.geometryState,r=e.layerInfo[u.LayerClass.ELEVATION],i=0;i<r.length;i++)r[i].pendingUpdates&=~u.TileUpdateTypes.UPDATE_GEOMETRY;return!!t.needsUpdate&&(e.renderData.vao&&this._releaseTileGeometry(e),e.createGeometry(t,e.renderData.localOrigin,"debug"===this.wireframe.mode),this._updateTileGeometryBuffers(e),!0)},e.prototype.updateTileGeometry=function(e){return e.renderData.updateGeometryState(e),this._updateTileGeometry(e)},e.prototype.unloadTile=function(e){this._releaseTileGeometry(e),e.renderData.texture&&e.renderData.texture.dispose(),this.renderDataPool.release(e.renderData),e.renderData=null,e.updateMemoryUsed()},e.prototype.getLocalOriginOfTile=function(e){if(e.lij[0]>=10){for(;e.lij[0]>7;)e=e.parent;return e.centerAtSeaLevel}if("spherical"===this.manifold)return M;for(;e.parent;)e=e.parent;return e.centerAtSeaLevel},e.prototype.setVisibility=function(e){this.visible=e,this.setNeedsRender()},e.prototype.getStats=function(){return{numTilesRendered:this.numTilesRendered,numTilesCulled:this.numTilesCulled,numTrianglesRendered:this.numTrianglesRendered,numOriginsRendered:this.numOriginsRendered}},e.prototype.getWireframeEnabled=function(){return"shader"===this.wireframe.mode},e.prototype.setDebugScreenSizePerspective=function(e){e!==this.debugScreenSizePerspective&&(this.debugScreenSizePerspective=e,this._updatePrograms())},e.prototype.setWireframe=function(e){var t=this;!1!==e&&!0!==e||(e={mode:e?"shader":"none"});var r=this.wireframe;if(void 0!==e.mode&&r.mode!==e.mode){var i="debug"===r.mode,n="debug"===e.mode;r.mode=e.mode,this._updatePrograms(),i!==n&&this.rootTiles&&v.traverseTilesPreorder(this.rootTiles,function(e){e.renderData&&(e.renderData.vao&&t._releaseTileGeometry(e),e.createGeometry(e.renderData.updateGeometryState(e),e.renderData.localOrigin,n),t._updateTileGeometryBuffers(e))})}for(var s in e)r.hasOwnProperty(s)&&(r[s]=e[s]),this.setNeedsRender();r.resolution&&(r.resolution=Math.min(r.resolution,this.tileSize),r.resolution=1<<Math.round(Math.log(r.resolution)/Math.LN2))},e.prototype.setNeedsRender=function(){this.needsRender=!0,this.didRender=!1,this.perOriginTileDataDirty=!0},e.prototype.resetNeedsRender=function(){this.didRender&&(this.needsRender=0!==this.visibleScaleRangeQueryQueue.length,this.didRender=!1)},e.prototype.isOpaque=function(){var e=this.wireframe,t="shader"===e.mode&&(e.wireOpacity<1||e.surfaceOpacity<1);return this._opaque&&!t},e.prototype.updateTileBackground=function(e){this.backgroundPromise&&this.backgroundPromise.cancel(),this.backgroundPromise="string"==typeof e?h.requestImage(e).catch(function(){return null}):null!=e?o.resolve(n.toUnitRGBA(e)):o.resolve(null),this._renderTileBackground()},e.prototype.initializeRenderContext=function(e){var t=this,r=this.rctx=e.rctx,n=function(e){o.when(e).then(function(){t.initialized=!0,t.setNeedsRender()}).catch(n)};n(this._renderTileBackground());var s=e.shaderSnippets,a=e.programRep;s.vsTerrain||s._parse(i);var l=new _("terrain",["vsTerrain","fsTerrain"],null,a,s,r);l.addDefine("Spherical","SPHERICAL"),l.addDefine("Overlay","OVERLAY"),l.addDefine("Atmosphere","ATMOSPHERE"),l.addDefine("Wireframe","WIREFRAME"),l.addDefine("TileBorders","TILE_BORDERS"),l.addBinaryShaderSnippetSuffix("Wireframe","Wireframe",[!1,!0]),l.addDefine("ReceiveShadows","RECEIVE_SHADOWS"),l.addDefine("ScreenSizePerspective","SCREEN_SIZE_PERSPECTIVE");var d=new _("terrainNormal",["vsTerrainNormal","fsNormal"],null,a,s,r);d.addDefine("Spherical","SPHERICAL"),d.addDefine("AlphaZero","ALPHA_ZERO");var h=new _("terrainDepth",["vsTerrainDepth","fsDepth"],null,a,s,r);h.addDefine("Spherical","SPHERICAL"),h.addDefine("ShadowMap","BIAS_SHADOWMAP");var c=new _("terrainHighlight",["vsTerrainHighlight","fsTerrainHighlight"],null,a,s,r);c.addDefine("Spherical","SPHERICAL"),this.programs={color:null,normal:null,depth:null,depthShadowMap:null,highlight:null},this.programVariations={color:l,normal:d,depth:h,highlight:c},this._updatePrograms(),this.tileRenderer=new g(r,this.tileSize,a,this.resourceCounter,this.setNeedsRender.bind(this)),this._renderTileBackground(),this.emptyTex=b.createEmptyTexture(r)},e.prototype.uninitializeRenderContext=function(e){null!=this.emptyTex&&(this.emptyTex.dispose(),this.emptyTex=null),this.tileRenderer&&(this.tileRenderer.dispose(),this.tileRenderer=null)},e.prototype.render=function(e){var t=e.rctx,r=t.gl;if(!this.initialized||this._disableRendering||!this.visible||!this.rootTiles||!this.tileBackgroundInitialized)return!1;var i=this.isOpaque()?L:N;if(e.slot!==i)return!1;x.trace("# BEGIN RENDER TERRAIN");var n=e.pass;t.setFaceCullingEnabled(this._cullBackFaces);var s=1===e.lightingData.helper.globalFactor;return n===y.MATERIAL?this._renderMaterialPass(e,this._updatePerOriginTileData()):n===y.MATERIAL_DEPTH_SHADOWMAP&&this.castShadows&&s?this._renderDepthPass(e,this.programs.depthShadowMap,this._updatePerOriginTileData()):n===y.MATERIAL_DEPTH?this._renderDepthPass(e,this.programs.depth,this._updatePerOriginTileData()):n===y.MATERIAL_NORMAL?this._renderNormalPass(e,this._updatePerOriginTileData()):n===y.MATERIAL_HIGHLIGHT&&this.needsHighlight&&(this._renderHighlightPass(e,this._updatePerOriginTileData()),t.clear(r.DEPTH_BUFFER_BIT)),this._cullBackFaces&&t.setFaceCullingEnabled(!1),x.trace("# END RENDER TERRAIN"),!0},e.prototype.intersect=function(e,t,r,i){if(this.rootTiles){var n=this.clippingExtent;if((!e.isSelection||this.isOpaque())&&e.enableTerrain){var s=q,a=Y;d.vec3d.subtract(r,t,s),d.vec3d.set3(1/s[0],1/s[1],1/s[2],a);var o=e.getMinResult(),h=e.getMaxResult(),c=this.tileIterator;c.reset(this.rootTiles);for(var u=this;!c.done;)!function(){var i=c.next();if(null===i.renderData)return"continue";if(e.enableInvisibleTerrain){if(!i.visible&&n&&!i.intersectsExtent(n))return"continue"}else if(!i.visible)return"continue";var p=i.renderData,f=p.geometryInfo,g=p.localOrigin,m=Z,T=X;d.vec3d.subtract(t,g,m),d.vec3d.subtract(r,g,T);var b=-u._skirtScale*p.geometryInfo.skirtLength;if(0!==b){var y=i.tileUp;l.offset(f.boundingBox,b*y[0],b*y[1],b*y[2],z),l.expandWithBuffer(z,f.boundingBox,0,2)}var R=0!==b?z:f.boundingBox;if(!D.intersectAabbInvDir(R,m,a,e.tolerance))return"continue";var S=function(t,r,n){if(t>=0&&(e.enableBackfacesTerrain||d.vec3d.dot(r,s)<0)){var a=void 0;(void 0===o.dist||t<o.dist)&&(a=v.lij2str(i.lij[0],i.lij[1],i.lij[2]),o.set(void 0,a,t,r,void 0),o.setIntersector("TerrainRenderer")),(void 0===h.dist||t>h.dist)&&(a=v.lij2str(i.lij[0],i.lij[1],i.lij[2]),h.set(void 0,a,t,r,void 0),h.setIntersector("TerrainRenderer"))}},_=f.indices,x={data:f.vertexAttributes,size:3,offsetIdx:0,strideIdx:5},O=f.numWithoutSkirtIndices/3;if(D.intersectTriangles(m,T,0,O,_,x,null,S),0!==b){var w="spherical"===u.manifold?function(e){return d.vec3d.scale(e,b/d.vec3d.length(e))}:function(e){return d.vec3d.set3(0,0,b,e)},P=_.length/3;v.intersectSkirts(m,T,O,P,_,x,null,w,S)}}()}}},e.prototype._renderTileBackground=function(){var e=this;if(this.rctx&&this.backgroundPromise&&this.tileRenderer)return this.backgroundPromise.then(function(t){e.tileRenderer&&(e.tileBackgroundInitialized=!0,e.tileRenderer.setBackground(t),e.rootTiles&&v.traverseTilesPreorder(e.rootTiles,function(t){e.tileRenderer.updateTileTexture(t)}))})},e.prototype._updatePrograms=function(){var e="spherical"===this.manifold,t="shader"===this.wireframe.mode;this.programs.color=this.programVariations.color.getProgram([e,this._hasOverlays,e&&this._velvetOverground,t,this._drawBorders,t||this._drawBorders,this.receiveShadows,this.debugScreenSizePerspective]),this.programs.normal=this.programVariations.normal.getProgram([e,!0]),this.programs.depth=this.programVariations.depth.getProgram([e,!1]),this.programs.depthShadowMap=this.programVariations.depth.getProgram([e,!0]),this.programs.highlight=this.programVariations.highlight.getProgram([e]),this.setNeedsRender()},e.prototype._renderMaterialPass=function(e,t){var r=this,i=e.shadowMap&&e.shadowMap.enabled,n=e.rctx;this.receiveShadows!==i&&(this.receiveShadows=i,this._updatePrograms());var s=!this.drapedRenderer.isEmpty();s!==this._hasOverlays&&(this._hasOverlays=s,this._updatePrograms());var a=e.camera;n.setDepthTestEnabled(!0);var o=this.wireframe,l=this.programs.color;n.bindProgram(l),("shader"===o.mode||this._drawBorders)&&(l.setUniform1f("wireframe.width",this.wireframe.width),l.setUniform1f("wireframe.falloff",Math.min(o.width,o.falloff)),l.setUniform1f("wireframe.wireOpacity",o.wireOpacity),l.setUniform1f("wireframe.surfaceOpacity",o.surfaceOpacity),l.setUniform4fv("wireframe.color",o.color)),e.shadowMap&&e.shadowMap.bind(l),e.ssaoHelper&&e.ssaoHelper.setUniforms(l),l.setUniform1i("tex",0),l.setUniform1i("overlay0Tex",1),l.setUniform1i("overlay1Tex",2),l.setUniformMatrix4fv("viewNormal",a.viewInverseTransposeMatrix),l.setUniformMatrix4fv("proj",a.projectionMatrix),e.lightingData.helper.setUniforms(l,!0);var h=a.viewMatrix;d.vec3d.set3(h[12],h[13],h[14],W),d.vec3d.normalize(W),l.setUniform3fv("viewDirection",W),this.numTilesRendered=0,this.numTilesCulled=0,this.numTrianglesRendered=0,this.numOriginsRendered=0,this._prepareScaleRangeQueries(),this.isOpaque()?this._renderTiles(e,l,t):e.offscreenRenderingHelper.renderToTargets(function(){return r._renderTiles(e,l,t)},e.offscreenRenderingHelper.tmpColor,e.offscreenRenderingHelper.mainDepth,[0,0,0,0]),this._processScaleRangeQueries(),this.numTilesRendered>0&&!this._loaded&&(this._loaded=!0,this.loaded&&this.loaded())},e.prototype._renderDepthPass=function(e,t,r){var i=e.rctx,n=e.camera;i.bindProgram(t),i.setBlendingEnabled(!1),i.setDepthTestEnabled(!0),t.setUniformMatrix4fv("model",k),t.setUniformMatrix4fv("viewNormal",n.viewInverseTransposeMatrix),H[0]=n.near,H[1]=n.far,t.setUniform2fv("nearFar",H),this._renderTilesAuxiliary(e,t,r,!1)},e.prototype._renderNormalPass=function(e,t){var r=e.rctx,i=e.camera,n=this.programs.normal;r.bindProgram(n),r.setBlendingEnabled(!1),r.setDepthTestEnabled(!0),n.setUniformMatrix4fv("viewNormal",i.viewInverseTransposeMatrix),this._renderTilesAuxiliary(e,n,t,!1)},e.prototype._renderHighlightPass=function(e,t){var r=e.rctx,i=this.programs.highlight;r.bindProgram(i),r.setBlendingEnabled(!1),r.setDepthTestEnabled(!0);var n=e.offscreenRenderingHelper;r.bindTexture(n.depthTexture,3),i.setUniform1i("depthTex",3),i.setUniform4f("highlightViewportPixelSz",0,0,1/n.width,1/n.height),this._renderTilesAuxiliary(e,i,t,!0)},e.prototype._updatePerOriginTileData=function(){var e=this.perOriginTileData;if(!this.perOriginTileDataDirty)return e;if(this.highestVisibleLODTile=null,this._renderCollectOrigins(),0!==this._renderOrder){for(var t=I(this._renderOrder),r=0;r<e.length;r++)this._sortFrontToBack(e.data[r].tiles,t);var i=A(this._renderOrder);this._sortFrontToBack(e,i)}return this.perOriginTileDataDirty=!1,e},e.prototype._renderCollectOrigins=function(){var e=this.perOriginTileData,t=this.rootTiles,r="spherical"===this.manifold;e.clear();for(var i=0;i<t.length;i++){var n=t[i],s=e.pushNew();s.root=n,s.origin=r?M:n.centerAtSeaLevel,s.tiles.clear(),this._renderCollectOriginsForRoot(s)}return!0},e.prototype._renderCollectOriginsForRoot=function(e){var t=this.tileIterator,r=this.perOriginTileData;for(t.reset(e.root);!t.done;){var i=t.next(),n=i.renderData;if(!n||i.visible){var s=r.back();if(7===i.lij[0]&&(s!==e&&0===s.tiles.length||(s=r.pushNew(),s.tiles.clear()),s.root=i,s.origin=i.centerAtSeaLevel),n){i.lij[0]>=10?r.back().tiles.push(i):e.tiles.push(i),(!this.highestVisibleLODTile||i.vlevel>this.highestVisibleLODTile.vlevel)&&(this.highestVisibleLODTile=i),t.skip()}}else this.numTilesCulled++,t.skip()}},e.prototype._sortFrontToBack=function(e,t){e.sort(t)},e.prototype._scaleQueriesForTile=function(e){for(var t=e.extent,r=e.lij[0],i=0;i<this.visibleScaleRangeQueriesInvPtr;){var n=this.visibleScaleRangeQueries.data[i],s=n.extent;r>=n.minLevel&&r<=n.maxLevel&&s[0]<=t[2]&&s[2]>=t[0]&&s[1]<=t[3]&&s[3]>=t[1]?(this.visibleScaleRangeQueries.swapElements(i,this.visibleScaleRangeQueriesInvPtr-1),this.visibleScaleRangeQueriesInvPtr--):i++}},e.prototype._updateStencilReadStateForTile=function(e,t){if(e.stencilRenderingHelper&&e.stencilRenderingHelper.enabled){for(var r=this.stencilEnabledLayerExtents,i=!1,n=0;n<r.length;n++)if(t.intersectsExtent(r[n])){i=!0;break}i?e.stencilRenderingHelper.enableStencilRead():e.stencilRenderingHelper.disableStencilRead()}},e.prototype._renderTilesAuxiliary=function(e,t,r,i){var n=e.rctx,s=n.gl,a=e.camera,o=a.viewMatrix;t.setUniformMatrix4fv("proj",a.projectionMatrix),t.setUniform1f("skirtScale",this._skirtScale),i&&(t.setUniform1i("overlay0Tex",1),t.setUniform1i("overlay1Tex",2));for(var l=0;l<r.length;l++){var d=r.data[l];t.setUniform3fv("origin",d.origin),D.bindView(d.origin,o,t);for(var h=0;h<d.tiles.length;h++){var c=d.tiles.data[h],u=c.renderData;i&&(this._bindOverlayTextures(t,u.overlays,!0),t.setUniform1f("overlayOpacity",u.overlayOpacity)),this._updateStencilReadStateForTile(e,c),n.bindVAO(u.vao),P.assertCompatibleVertexAttributeLocations(u.vao,t);var p=0!==this._skirtScale?u.vao.indexBuffer.size:u.geometryInfo.numWithoutSkirtIndices;n.drawElements(s.TRIANGLES,p,u.vao.indexBuffer.indexType,0)}}n.bindVAO(null),e.stencilRenderingHelper&&e.stencilRenderingHelper.disableStencilRead()},e.prototype._renderTiles=function(e,t,r){var i=e.rctx,n=i.gl,s=e.camera,a=s.viewMatrix;if(this.debugScreenSizePerspective&&this.pointsOfInterest){var o=S.getSettings("spherical"===this.manifold?"global":"local");o.update({distance:this.pointsOfInterest.centerOnSurfaceFrequent.distance,fovY:s.fovY}),D.bindScreenSizePerspective(o,t,"screenSizePerspective")}t.setUniform1f("skirtScale",this._skirtScale);for(var l=0;l<r.length;l++){var d=r.data[l];t.setUniform3fv("origin",d.origin),D.bindView(d.origin,a,t),e.shadowMap&&e.shadowMap.bindView(t,d.origin),this.numOriginsRendered++;var h=d.tiles;if(0!==h.length){var c="debug"===this.wireframe.mode?n.LINES:n.TRIANGLES,u=this.highestVisibleLODTile,p=void 0,f=void 0;u?(p=u.vlevel,f=this.tileSize/this.wireframe.resolution):(p=16,f=this.tileSize/64);for(var g=0;g<h.length;g++){var v=h.data[g],m=v.renderData;this._updateStencilReadStateForTile(e,v),x.trace("# RENDER TILE "+v.lij[0]+"/"+v.lij[1]+"/"+v.lij[2]+", screenDepth:"+v.screenDepth),B(m.geometryInfo.uvOffsetAndScale,m.texOffsetAndScale,C),t.setUniform4fv("texOffsetAndScale",C);var T=m.textureReference||m.texture;if(i.bindTexture(T,0),t.setUniform1f("opacity",m.opacity),this._bindOverlayTextures(t,m.overlays,!1),t.setUniform1f("overlayOpacity",m.overlayOpacity),"shader"===this.wireframe.mode||this._drawBorders){var b=f*(1<<p-v.vlevel);t.setUniform1f("wireframe.subdivision",b)}var y=0!==this._skirtScale?m.vao.indexBuffer.size:m.geometryInfo.numWithoutSkirtIndices;i.bindVAO(m.vao),P.assertCompatibleVertexAttributeLocations(m.vao,t),i.drawElements(c,y,m.vao.indexBuffer.indexType,0),v.renderOrder=this.numTilesRendered,this.numTilesRendered++,this.numTrianglesRendered+=y/3,this._scaleQueriesForTile(v)}}}i.bindVAO(null),e.stencilRenderingHelper&&e.stencilRenderingHelper.disableStencilRead()},e.prototype._bindOverlayTextures=function(e,t,r){for(var i=0;i<2;i++){var n=2*i,s=t[i],a=r?s.highlightRenderTargetId:s.renderTargetId;if(a){var o=this.drapedRenderer.getRenderTargetTexture(a);V[n]=s.texOffset[0],V[n+1]=s.texOffset[1],j[n]=s.texScale[0],j[n+1]=s.texScale[1],this.rctx.bindTexture(o,1+i)}else V[n]=0,V[n+1]=0,j[n]=0,j[n+1]=0,this.rctx.bindTexture(this.emptyTex,1+i)}e.setUniform4fv("overlayTexOffset",V),e.setUniform4fv("overlayTexScale",j)},e.prototype._updateTileGeometryBuffers=function(e){var t=this.rctx,r=t.gl,i=e.renderData,n=i.geometryInfo.vertexAttributes,s=i.geometryInfo.indices;i.vao=new E(t,m.Default3D,{geometry:T.Pos3Tex},{geometry:w.createVertex(t,r.STATIC_DRAW,n)},w.createIndex(t,r.STATIC_DRAW,s)),this.setNeedsRender()},e.prototype._releaseTileGeometry=function(e){var t=e.renderData;t.vao.dispose(!0),t.vao=null,p.releaseGeometry(t.geometryInfo),this.setNeedsRender()},e.prototype._prepareScaleRangeQueries=function(){for(var e=this.visibleScaleRangeQueries,t=this.visibleScaleRangeQueryQueue;e.length<e.data.length&&t.length>0;){var r=t.pop();e.push(r)}this.visibleScaleRangeQueriesInvPtr=e.length},e.prototype._processScaleRangeQueries=function(){for(var e=this.visibleScaleRangeQueries,t=this.visibleScaleRangeQueryPool,r=0;r<e.length;r++){var i=e.data[r];t.release(i),i.callback(r>=this.visibleScaleRangeQueriesInvPtr),i.callback=null}e.clear()},e}(),F={mode:"none",width:1.5,falloff:1.5,wireOpacity:1,surfaceOpacity:0,color:[1,1,1,0],resolution:64},W=d.vec3d.create(),q=d.vec3d.create(),Y=d.vec3d.create(),Z=d.vec3d.create(),X=d.vec3d.create();return G});