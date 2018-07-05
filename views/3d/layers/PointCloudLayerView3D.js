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

define(["require","exports","../../../core/tsSupport/extendsHelper","../../../core/tsSupport/decorateHelper","dojo/errors/CancelError","dojo/promise/all","../../../request","../../../core/arrayUtils","../../../core/arrayUtils","../../../core/Handles","../../../core/Logger","../../../core/promiseUtils","../../../core/requireUtils","../../../core/screenUtils","../../../core/watchUtils","../../../core/workers","../../../core/accessorSupport/decorators","../../../geometry/support/aaBoundingBox","../../../geometry/support/scaleUtils","../../../symbols/support/unitConversionUtils","./LayerView3D","./PointCloudWorker","./i3s/I3SUtil","./i3s/IdleQueue","./i3s/LoDUtil","./i3s/PagedNodeIndex","./i3s/PointCloudRendererUtil","./i3s/PointRenderer","./support/layerViewUpdatingProperties","../lib/glMatrix","../support/geometryUtils","../support/orientedBoundingBox","../support/projectionUtils","../webgl-engine/lib/RenderSlot","module"],function(e,t,r,i,o,n,d,s,a,u,l,h,p,c,_,f,g,y,v,m,w,x,b,N,k,P,S,C,Q,W,O,R,U,L,I){var F=l.getLogger("esri.views.3d.layers.PointCloudLayerView3D"),V=O.plane.create();return function(t){function l(){var e=null!==t&&t.apply(this,arguments)||this;return e.maximumPointCount=4e6,e._renderer=null,e._rendererAdded=!1,e._renderedNodes=new Set,e._updateViewNeeded=!0,e._idleUpdatesEnabled=!0,e._lodFactor=1,e._worker=new x,e._workerThread=null,e._maxLoggedBoxWarnings=5,e._pageMultiplier=1,e._handles=new u,e._indexQueue=[],e._workQueue=[],e._idleQueue=new N.IdleQueue,e._indexPagesLoading=new Map,e._loadingNodes=new Map,e._layerIsVisible=!1,e._totalWork=0,e._index=null,e._loadingInitNodePage=!1,e._nodeIdArray=[],e}return r(l,t),Object.defineProperty(l.prototype,"pointScale",{get:function(){var e=S.getSplatSizeAlgorithm(this.layer.renderer);return e&&null!=e.scaleFactor?e.scaleFactor:1},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"useRealWorldSymbolSizes",{get:function(){var e=S.getFixedSizeAlgorithm(this.layer.renderer);return!(!e||null==e.useRealWorldSymbolSizes)&&e.useRealWorldSymbolSizes},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"pointSize",{get:function(){var e=S.getFixedSizeAlgorithm(this.layer.renderer);return e&&null!=e.size?e.size:0},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"inverseDensity",{get:function(){return this.layer.renderer?96/this.layer.renderer.pointsPerInch:5},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_clippingBox",{get:function(){var e=y.create(),t=this.view.renderSpatialReference;return U.extentToBoundingBox(this.view.clippingArea,e,t)?e:null},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"_elevationOffset",{get:function(){var e=this.layer.elevationInfo;if(e&&"absolute-height"===e.mode){var t=v.getMetersPerVerticalUnitForSR(this.layer.spatialReference),r=m.getMetersPerUnit(e.unit);return(e.offset||0)*r/t}return 0},enumerable:!0,configurable:!0}),l.prototype.initialize=function(){var t=this;b.checkPointCloudLayerValid(this.layer),b.checkPointCloudLayerCompatibleWithView(this.layer,this.view),this._initRenderer();var r=this._initNodePages(),i={idleBegin:function(){return t._idleBegin()},idleEnd:function(){return t._idleEnd()},needsUpdate:function(){return!0},idleFrame:function(e){return t._process(e)}},o={idleBegin:function(){return t._idleBegin()},idleEnd:function(){return t._idleEnd()},needsUpdate:function(){return t._updateViewNeeded||t._workQueue.length>0},idleFrame:function(e){return t._processWhileSuspended(e)}};f.open(p.getAbsMid("./PointCloudWorker",e,I),{client:this}).then(function(e){t.destroyed?e.close():t._workerThread=e}),this._handles.add(_.init(this,"_clippingBox",function(){return t._setUpdateViewNeeded()})),this._handles.add(_.init(this.layer,"elevationInfo",function(){return t._elevationInfoChanged()})),this._handles.add(_.init(this,"_elevationOffset",function(){return t._elevationOffsetChanged()})),this._handles.add(_.init(this.layer,"renderer",function(){return t._rendererChanged()})),this._handles.add(_.init(this,"clippingArea",function(){t._setUpdateViewNeeded()})),this._handles.add(this.view.state.watch("camera",function(){t._setUpdateViewNeeded()})),this.view.resourceController.memoryEvents.on("quality-changed",function(){return t._setUpdateViewNeeded()}),this.addResolvingPromise(r),this.when(function(){t._handles.add(t.view.resourceController.registerFrameWorker(function(e){return t._frame(e)})),t._handles.add(_.init(t,"suspended",function(e){t._idleFrameWorker&&(t._idleFrameWorker.remove(),t._idleFrameWorker=null),t._idleFrameWorker=e?t.view.resourceController.registerIdleFrameWorker(o):t.view.resourceController.registerIdleFrameWorker(i)}))})},l.prototype._setUpdateViewNeeded=function(){this._updateViewNeeded=!0,this._updateLoading()},l.prototype.destroy=function(){this._cancelNodeLoading(),this._workerThread&&(this._workerThread.close(),this._workerThread=null),this._idleFrameWorker&&(this._idleFrameWorker.remove(),this._idleFrameWorker=null),this._handles.destroy(),this._destroyRenderer()},l.prototype._initRenderer=function(){var e=this;this._renderer=new C,this._renderer.layerUid=this.layer.uid,this._handles.add(_.init(this,"_clippingBox",function(t){e._renderer.clippingBox=t})),this._handles.add(_.init(this,"_clippingBox",function(t){e._renderer.clippingBox=t})),this._handles.add(_.init(this,"suspended",function(t){e._setPointsVisible(!t)})),this._handles.add(_.init(this,"pointScale",function(t){e._renderer.scaleFactor=t})),this._renderer.minSizePx=Math.sqrt(2),this._handles.add(_.init(this,"useRealWorldSymbolSizes",function(t){e._renderer.useRealWorldSymbolSizes=t})),this._handles.add(_.init(this,"pointSize",function(t){var r=c.pt2px(t);e._renderer.size=t,e._renderer.sizePx=r})),this._handles.add(_.init(this,["inverseDensity","maximumPointCount"],function(){e._setUpdateViewNeeded()})),this._handles.add(_.init(this.view,"qualitySettings.sceneService.pointCloud.lodFactor",function(t){e._lodFactor=t,e._setUpdateViewNeeded()}))},l.prototype._destroyRenderer=function(){this._setPointsVisible(!1)},l.prototype._setPointsVisible=function(e){e&&!this._rendererAdded?(this.view._stage.addExternalRenderer([L.OPAQUE_EXTERNAL],this._renderer),this._rendererAdded=!0):!e&&this._rendererAdded&&(this.view._stage.removeExternalRenderer(this._renderer),this._rendererAdded=!1)},l.prototype._rendererChanged=function(){this._clearNodeState(),this._renderer.useFixedSizes=S.rendererUsesFixedSizes(this.layer.renderer),this._setUpdateViewNeeded()},l.prototype._elevationInfoChanged=function(){var e=this.layer.elevationInfo&&this.layer.elevationInfo.unit;e&&!m.supportsUnit(e)&&F.warn("elevationInfo.unit","'"+e+"' is not a valid unit")},l.prototype._elevationOffsetChanged=function(){this._clearNodeState(),this._initNodePages()},l.prototype.displayNodes=function(e){this._workQueue=k.nodeDiff(a.keysOfSet(this._renderedNodes),e,this._index),k.sortFrontToBack(this._workQueue,this.view.state.camera.viewForward,this._index),k.splitWorkEntries(this._workQueue,8,this._index),this._updateQueues(),this._totalWork=this._computeWork(),this._updateLoading(),this._layerIsVisible=e.length>0||this._loadingInitNodePage,this.notifyChange("suspended")},l.prototype.cancelLoading=function(){this._cancelNodeLoading(),this._cancelIndexLoading()},l.prototype._cancelNodeLoading=function(){var e=[];this._loadingNodes.forEach(function(t){return e.push(t)}),this._loadingNodes.clear();for(var t=0,r=e;t<r.length;t++){r[t].cancel()}this._workQueue=[],this._idleQueue.cancelAll(),this._totalWork=this._computeWork(),this._updateLoading()},l.prototype._updateQueues=function(){var e=this,t=new Set;this._workQueue.forEach(function(e){e.load.forEach(function(e){t.add(e)})});var r=[],i=new Map;this._loadingNodes.forEach(function(e,o){t.has(o)?i.set(o,e):r.push(e)}),this._loadingNodes=i;for(var o=0,n=r;o<n.length;o++){n[o].cancel()}this._workQueue=this._workQueue.filter(function(t){for(var r=0,i=t.load;r<i.length;r++){var o=i[r];if(e._loadingNodes.has(o))return!1}return!0}),this._totalWork=this._computeWork(),this._updateLoading()},l.prototype._cancelIndexLoading=function(){this._indexQueue=[],this._indexPagesLoading.forEach(function(e){return e.cancel()}),this._indexPagesLoading.clear(),this._totalWork=this._computeWork(),this._updateLoading()},l.prototype._clearNodeState=function(){var e=this;this._renderedNodes.forEach(function(t){return e._removeFromRenderer(t)}),this._cancelNodeLoading()},l.prototype._idleBegin=function(){this._setUpdateViewNeeded()},l.prototype._idleEnd=function(){this._setUpdateViewNeeded()},l.prototype._frame=function(e){this.suspended?this._processWhileSuspended(e):this._process(e)},l.prototype._process=function(e){if(this._idleUpdatesEnabled){for(this._updateViewNeeded&&!e.done()&&this._updateWorkQueues();this._indexQueue.length>0&&!e.done();)this._processIndexQueue();for(this._processWorkQueue(e);this._idleQueue.length()>0&&!e.done();)this._idleQueue.process()}},l.prototype._processWhileSuspended=function(e){if(this._idleUpdatesEnabled)for(this._cancelNodeLoading(),this._updateViewNeeded&&!e.done()&&this._updateWorkQueues();this._workQueue.length>0&&!e.done();)this._processWorkQueueRemoveOnly()},l.prototype._processIndexQueue=function(){var e=this,t=this._indexQueue.shift();this._indexPagesLoading.set(t,this._loadNodePage(t)),this._indexPagesLoading.get(t).then(function(r){e._index.addPage(t,r,e._elevationOffset),e._setUpdateViewNeeded()}).always(function(){e._indexPagesLoading.delete(t)})},l.prototype._processWorkQueue=function(e){for(;!e.done();){var t=this._scheduleWorkEntry();if(!t)return;this._processWorkEntry(t)}},l.prototype._scheduleWorkEntry=function(){var e=this;if(this._loadingNodes.size>=8)return null;for(var t=0;t<this._workQueue.length;++t){var r=this._workQueue[t];if(!s.find(r.remove,function(t){return!e._renderedNodes.has(t)})){for(var i=t;i>0;--i)this._workQueue[i]=this._workQueue[i-1];return this._workQueue.shift(),r}}return null},l.prototype._processWorkEntry=function(e){var t=this;if(0!==e.load.length)n(e.load.map(function(e){return t._loadingNodes.has(e)||t._loadingNodes.set(e,t.loadNode(e)),t._loadingNodes.get(e)})).then(function(r){for(var i=0;i<e.load.length;i++)t._addToRenderer(e.load[i],r[i]);for(var i=0;i<e.remove.length;i++)t._removeFromRenderer(e.remove[i])}).always(function(){for(var r=0;r<e.load.length;r++)t._loadingNodes.delete(e.load[r]);t._updateLoading()}),this._updateLoading();else for(var r=0;r<e.remove.length;r++)this._removeFromRenderer(e.remove[r])},l.prototype._processWorkQueueRemoveOnly=function(){for(var e=this._workQueue.shift(),t=0;t<e.remove.length;t++)this._removeFromRenderer(e.remove[t]);this._updateLoading()},l.prototype._computeWork=function(){for(var e=0,t=0;t<this._workQueue.length;t++)e+=this._workQueue[t].load.length;return e+=this._loadingNodes.size,e+=(this._indexQueue.length+this._indexPagesLoading.size)*this._index.pageSize,e+=this._loadingInitNodePage?100:0,e+=this._updateViewNeeded?100:0},Object.defineProperty(l.prototype,"updatingPercentageValue",{get:function(){var e=this._computeWork();return 100*Math.min(this._totalWork,e)/this._totalWork},enumerable:!0,configurable:!0}),l.prototype._updateLoading=function(){this.notifyChange("updating"),this.notifyChange("updatingPercentageValue")},l.prototype.canResume=function(){return this.inherited(arguments)&&this._layerIsVisible},l.prototype.isUpdating=function(){return this._computeWork()>0},l.prototype._initNodePages=function(){var e=this,t=this.layer.store.index,r=t.nodesPerPage||t.nodePerIndexBlock;return this._index=new P(this.layer.spatialReference,this.view.renderCoordsHelper.spatialReference,r),this._cancelIndexLoading(),this._traverseVisible=this._index.createVisibilityTraverse(),this._loadingInitNodePage=!0,this._layerIsVisible=!0,this.notifyChange("suspended"),this._updateLoading(),this._pageMultiplier=null!=t.nodesPerPage?1:t.nodePerIndexBlock,this._loadNodePage(0).then(function(t){e._index.addPage(0,t,e._elevationOffset),e._loadingInitNodePage=!1,e._setUpdateViewNeeded()})},l.prototype._loadNodePage=function(e){var t=this,r=this.baseUrl+"/nodepages/"+e*this._pageMultiplier;return this._requestJSON(r).then(function(r){return r.data.nodes.map(function(r,i){return{resourceId:null!=r.resourceId?r.resourceId:e*t._index.pageSize+i,obb:r.obb,firstChild:r.firstChild,childCount:r.childCount,vertexCount:null!=r.vertexCount?r.vertexCount:r.pointCount,lodThreshold:null!=r.lodThreshold?r.lodThreshold:r.effectiveArea}})})},l.prototype._updateWorkQueues=function(){for(var e=this.inverseDensity/this._lodFactor*this._getLodMemoryFactor(),t=this.maximumPointCount*this._lodFactor*this._getLodMemoryFactor(),r=this._computeNodesForMinimumDensity(e),i=this._computePointCount(r),o=Math.sqrt(i/(.75*t));i>t;)e*=o,r=this._computeNodesForMinimumDensity(e),i=this._computePointCount(r),o=Math.sqrt(2);this.displayNodes(r),this._updateViewNeeded=!1,this._updateLoading()},l.prototype._computePointCount=function(e){for(var t=0,r=0;r<e.length;r++){var i=this._index.getNode(e[r]);i&&(t+=i.vertexCount)}return t},l.prototype._getLodMemoryFactor=function(){return this.view.resourceController.memoryFactor},l.prototype._computeNodesForMinimumDensity=function(e){var t=this,r=this.view.state.camera,i=r.frustumPlanes,o=this._clippingBox,n=r.viewForward,d=W.vec3d.dot(n,r.eye),s=O.plane.fromNormalAndOffset(n,-d,V),a=r.perPixelRatio,u=e*e,l=this._nodeIdArray;return l.length=0,this._traverseVisible({frustumPlanes:i,clippingBox:o},{predicate:function(e,r,i){if(!i)return!1;if(0===r.childCount)return l.push(e),!1;var o=t._index.getRenderObb(e);return!(t._computeAveragePixelArea(o,r.lodThreshold,r.vertexCount,s,a)<=u&&(l.push(e),1))},pageMiss:function(e,r){l.push(e),t._indexQueue.indexOf(r)<0&&t._indexQueue.push(r)}}),l},l.prototype._computeAveragePixelArea=function(e,t,r,i,o){var n=Math.max(1e-7,R.minimumDistancePlane(e,i));return t/(n*n)/(4*o*o)/r},l.prototype.loadNode=function(e){var t=this,r=this._index.getNode(e),i=S.getRendererInfo(this.layer),d=[];return this._idleQueue.push().then(function(){var e=r.resourceId,o=t.loadGeometry(e),s=t.loadAttribute(e,i.primaryAttribute),a=t.loadAttribute(e,i.modulationAttribute);return d=[o,s,a],n(d)}).then(function(r){var o=r[0],n=r[1],d=r[2],s=[o];n&&s.push(n),d&&s.push(d);var a={geometryBuffer:o,primaryAttribute:n,modulationAttribute:d,schema:t.layer.store.defaultGeometrySchema,rendererInfo:i,obb:t._index.getRenderObb(e),elevationOffset:t._elevationOffset,inSR:t.layer.spatialReference.toJSON(),outSR:t.view.renderCoordsHelper.spatialReference.toJSON()};return t._workerThread?t._workerThread.invoke("process",a,s):h.resolve(t._worker.transform(a))}).catch(function(e){if(e instanceof o)for(var t=0,r=d;t<r.length;t++){var i=r[t];i.cancel()}else console.error(e);return h.reject(e)})},l.prototype.loadGeometry=function(e){var t=this.baseUrl+"/nodes/"+e+"/geometries/0";return this._requestBinary(t).then(function(e){return e.data})},l.prototype.loadAttribute=function(e,t){if(!t||!t.storageInfo)return h.resolve(null);var r=t.storageInfo.key,i=this.baseUrl+"/nodes/"+e+"/attributes/"+r;return this._requestBinary(i).then(function(e){return e.data})},l.prototype._requestJSON=function(e){return d(e,{query:{f:"json"},responseType:"json"})},l.prototype._requestBinary=function(e){return d(e,{responseType:"array-buffer"})},l.prototype._removeFromRenderer=function(e){this._renderedNodes.has(e)&&(this._renderer.removeNode(""+e),this._renderedNodes.delete(e))},l.prototype._addToRenderer=function(e,t){if(!this._renderedNodes.has(e)){this._renderedNodes.add(e);var r=this._index.getNode(e),i=this._index.getRenderObb(e);(t.obb.halfSize[0]>i.halfSize[0]||t.obb.halfSize[1]>i.halfSize[1]||t.obb.halfSize[2]>i.halfSize[2])&&(this._maxLoggedBoxWarnings>0&&(F.warn("Node",e,"reported bounding box too small, got",i,"but points cover",t.obb),0==--this._maxLoggedBoxWarnings&&F.warn("  Too many bounding box errors, stopping reporting for this layer.")),this._index.setRenderObb(e,t.obb));var o=Math.sqrt(r.lodThreshold/r.vertexCount);this._renderer.addNode({id:""+e,coordinates:t.points,origin:i.center,rgb:t.rgb,splatSize:o,obb:i,isLeaf:0===r.childCount})}},l.prototype.removeCachedData=function(){var e=this;this.suspended&&this._renderedNodes.forEach(function(t){return e._removeFromRenderer(t)})},l.prototype.getCachedMemory=function(){return 0},l.prototype.getUsedMemory=function(){var e=this;return a.keysOfSet(this._renderedNodes).reduce(function(t,r){return t+15*e._index.getNode(r).vertexCount+128},0)/1024/1024},l.prototype.getUnloadedMemory=function(){var e=this,t=this._renderedNodes.size;if(t<4)return 0;for(var r=a.keysOfSet(this._renderedNodes).reduce(function(t,r){return t+e._index.getNode(r).vertexCount}),i=this._loadingNodes.size,o=0;o<this._workQueue.length;o++)i+=this._workQueue[o].load.length,i-=this._workQueue[o].remove.length;return i<0?0:(i*r/t*15+128*i)/1024/1024},l.prototype.getStats=function(){var e=this;return{"Rendered Nodes":this._renderedNodes.size,"Rendered Points":a.keysOfSet(this._renderedNodes).reduce(function(t,r){return t+e._index.getNode(r).vertexCount},0),"Loading Nodes":this._loadingNodes.size,"Index Queue":this._indexQueue.length,"Work Queue":this._workQueue.length,"Idle Queue":this._idleQueue.length()}},i([g.property()],l.prototype,"layer",void 0),i([g.property({readOnly:!0,aliasOf:"layer.parsedUrl.path"})],l.prototype,"baseUrl",void 0),i([g.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"pointScale",null),i([g.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"useRealWorldSymbolSizes",null),i([g.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"pointSize",null),i([g.property({readOnly:!0,dependsOn:["layer.renderer"]})],l.prototype,"inverseDensity",null),i([g.property()],l.prototype,"maximumPointCount",void 0),i([g.property({readOnly:!0,dependsOn:["view.clippingArea"]})],l.prototype,"_clippingBox",null),i([g.property({readOnly:!0,dependsOn:["layer.elevationInfo"]})],l.prototype,"_elevationOffset",null),i([g.property(Q.updatingPercentage)],l.prototype,"updatingPercentage",void 0),i([g.property({readOnly:!0})],l.prototype,"updatingPercentageValue",null),l=i([g.subclass("esri.views.3d.layers.PointCloudLayerView3D")],l)}(g.declared(w))});