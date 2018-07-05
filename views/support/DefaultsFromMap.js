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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/arrayUtils","../../core/Handles","../../core/Logger","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/support/heightModelInfoUtils","../../geometry/support/webMercatorUtils","../../portal/support/geometryServiceUtils"],function(e,t,i,n,o,r,s,a,l,d,p,c,u){function h(e){return e?JSON.stringify(e.toJSON()):"undefined"}function f(e){switch(e){case 0:return"Waiting";case 1:return"Found";case 2:return"Exhausted"}return"Unknown: "+e}var g=a.getLogger("esri.views.support.DefaultsFromMap");return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new s,t._waitTask=null,t._isStarted=!1,t._spatialReferenceCandidates=null,t._extentCandidates=null,t.logDebugInformation=!1,t.isSpatialReferenceDone=!1,t.isTileInfoDone=!1,t.isHeightModelInfoSearching=!1,t.spatialReference=null,t.extent=null,t.heightModelInfo=null,t.vcsWkid=null,t.latestVcsWkid=null,t.mapCollectionPaths=o.DefaultMapCollectionPaths.slice(),t.tileInfo=null,t}i(t,e),o=t,t.prototype.initialize=function(){var e=this;this.watch("mapCollectionPaths",function(){e._isStarted&&(e.reset(),e.start())})},t.prototype.destroy=function(){this._set("view",null),this._handles&&(this._handles.destroy(),this._handles=null,this._isStarted=!1),this._cancelLoading()},t.prototype.reset=function(){this._handles.removeAll(),this._isStarted=!1,this._set("isSpatialReferenceDone",!1),this._set("isTileInfoDone",!1),this._set("isHeightModelInfoSearching",!1),this._set("spatialReference",null),this._set("extent",null),this._set("heightModelInfo",null),this._set("vcsWkid",null),this._set("latestVcsWkid",null),this._set("tileInfo",null),this._spatialReferenceCandidates=null,this._extentCandidates=null},t.prototype.start=function(){this._handles.removeAll(),this._isStarted=!0;for(var e=this._updateLayerChange.bind(this),t=0,i=this.mapCollectionPaths;t<i.length;t++){var n=i[t];this._handles.add(l.on(this.view,"map."+n,"change",e,e,e,!0))}},t.prototype._ownerNameFromCollectionName=function(e){var t=e.lastIndexOf(".");return-1===t?"view":"view."+e.slice(0,t)},t.prototype._ensureLoadedOwnersFromCollectionName=function(e){for(var t,i=this._ownerNameFromCollectionName(e),n=i.split("."),o=0;o<n.length&&(t=this.get(n.slice(0,o+1).join(".")));o++)if(t.load&&!t.isFulfilled())return{owner:null,loading:t.load()};return{owner:t}},t.prototype._cancelLoading=function(){this._waitTask=null,this._extentProjectTask&&(this._extentProjectTask.cancel(),this._extentProjectTask=null)},t.prototype._updateWhen=function(e){var t=this,i=!0,n=!1,o=e.always(function(){i?n=!0:o===t._waitTask&&t._update()});return i=!1,n||(this._waitTask=o),n},t.prototype._updateLayerChange=function(){this.isSpatialReferenceDone&&!this.spatialReference&&this._set("isSpatialReferenceDone",!1),this._update()},t.prototype._update=function(){var e=this;if(this._cancelLoading(),this.view){if(!this.isSpatialReferenceDone){this._debugLog("Starting search for spatial reference...");var t=this._processMapCollections(function(t){return e._processSpatialReferenceSource(t)});if(this._debugLog("Search ended with status '"+f(t)+"'"),0!==t){var i=null,n=this._spatialReferenceCandidates;if(!n||n.length<1?(i=this.defaultSpatialReference,this._debugLog("No spatial reference found, locking to default ("+h(i)+")")):(this.defaultSpatialReference&&n.length>1&&r.findIndex(n,function(t){return t.equals(e.defaultSpatialReference)})>-1&&(n=[this.defaultSpatialReference]),i=n[0],this._debugLog("Locking to "+h(i))),this._set("spatialReference",i),this._set("isSpatialReferenceDone",!0),i){var o=this.logDebugInformation;this.logDebugInformation=!1,this._processMapCollections(function(t){return e._findExtent(t,i)}),this.extent||this._projectExtentCandidate(),this.logDebugInformation=o}}}if(null==this.heightModelInfo&&this.view.isHeightModelInfoRequired){this._debugLog("Starting search for height model info...");var s=this._processMapCollections(function(t){return e._processHeightModelInfoSource(t)},function(e){return p.mayHaveHeightModelInfo(e)});this._debugLog("Search ended with status "+f(s)),this._set("isHeightModelInfoSearching",0===s)}if(null==this.tileInfo){var a=!1;this.view.isTileInfoRequired()&&(a=this._deriveTileInfo()),a||this._set("isTileInfoDone",!0)}}},t.prototype._processMapCollections=function(e,t){for(var i=0,n=this.mapCollectionPaths;i<n.length;i++){var o=n[i],r="map."+o,s=this._ensureLoadedOwnersFromCollectionName(r);if(this._debugLog("Processing collection "+r+"..."),s.loading&&!this._updateWhen(s.loading))return this._debugLog("Collection "+r+" owner is loading -> wait"),0;var a=s.owner;if(!a||a.isRejected&&a.isRejected())this._debugLog("Collection "+r+" owner is invalid or rejected -> skip");else{var l=this.view.get(r);if(l){var d=this._processMapCollection(l,e,t);if(2!==d)return d}else this._debugLog("Collection "+r+" does not exist -> skip")}}return 2},t.prototype._processMapCollection=function(e,t,i){for(var n=0;n<e.length;n++){var o=e.getItemAt(n);if(null!=i&&!i(o))this._debugLog("Source "+o.id+" is skipped due to predicate");else{if(o.load&&!o.isFulfilled()&&!this._updateWhen(o.load()))return this._debugLog("Source "+o.id+" is loading -> wait"),0;if(!o.load||o.isResolved()){if(t(o))return 1;var r=o;if(r.layers){var s=this._processMapCollection(r.layers,t);if(2!==s)return s}}}}return 2},t.prototype._processSpatialReferenceSource=function(e){var t=this._getSupportedSpatialReferences(e);return 0!==t.length&&(this._spatialReferenceCandidates?(t=r.intersect(t,this._spatialReferenceCandidates,function(e,t){return e.equals(t)}),t.length>0?this._spatialReferenceCandidates=t:this._debugLog("Layer "+e.id+" is ignored because its supported spatial\n          references are not compatible with the previous candidates")):this._spatialReferenceCandidates=t,1===this._spatialReferenceCandidates.length)},t.prototype._findExtent=function(e,t){var i=e.fullExtents||(e.fullExtent?[e.fullExtent]:[]),n=r.find(i,function(e){return e.spatialReference.equals(t)});if(n)return this._set("extent",n),!0;if(this._getSupportedSpatialReferences(e).length>0){var o=i.map(function(t){return{extent:t,layer:e}}),s=this._extentCandidates||[];this._extentCandidates=s.concat(o)}return!1},t.prototype._projectExtentCandidate=function(){var e=this;if(this._extentCandidates&&this._extentCandidates.length){var t=this.spatialReference,i=r.find(this._extentCandidates,function(e){return c.canProject(e.extent.spatialReference,t)});if(i)this._set("extent",c.project(i.extent,t));else{var n=this._extentCandidates[0];this._extentProjectTask=u.projectGeometry(n.extent,t,n.layer.portalItem).then(function(t){e._set("extent",t)})}}},t.prototype._getSupportedSpatialReferences=function(e){var t=this,i=e.supportedSpatialReferences||(e.spatialReference?[e.spatialReference]:[]);if(0===i.length)return this._debugLog("Layer "+e.id+" is ignored because it does not have any spatial references"),[];var n=i.filter(function(i){return t.view.isSpatialReferenceSupported(i,e,function(e){return t._debugLog(e)})});return 0===n.length?this._debugLog("Layer "+e.id+" has spatial references but none of them are supported (or layer doesn't require locking)"):this._debugLog("Layer "+e.id+" has spatial references. Resulting candidate set: "+n.map(h).join(", ")),n},t.prototype._processHeightModelInfoSource=function(e){var t=p.deriveHeightModelInfoFromLayer(e);return!!t&&(this._set("heightModelInfo",t),this._set("isHeightModelInfoSearching",!1),e.spatialReference&&(this._set("vcsWkid",e.spatialReference.vcsWkid),this._set("latestVcsWkid",e.spatialReference.latestVcsWkid)),!0)},t.prototype._deriveTileInfo=function(){if(!this.isSpatialReferenceDone)return!0;var e=this.get("view.map");if(!e)return!0;var t=e.basemap,i=t&&t.get("baseLayers.0"),n=e.get("layers.0"),o=!1,r=null;return t&&"failed"!==t.loadStatus?t.loaded?i&&"failed"!==i.loadStatus?i.loaded?r=i.tileInfo:(this._updateWhen(i.load()),o=!0):n&&"failed"!==n.loadStatus?n.loaded?r=n.tileInfo:(this._updateWhen(n.load()),o=!0):o=!0:(this._updateWhen(t.load()),o=!0):n&&"failed"!==n.loadStatus&&(n.loaded?r=n.tileInfo:(this._updateWhen(n.load()),o=!0)),r&&!r.spatialReference.equals(this.spatialReference)&&(r=null),o||this._set("tileInfo",r),o},t.prototype._debugLog=function(e){this.logDebugInformation&&g.info(e)};var o;return t.DefaultMapCollectionPaths=["basemap.baseLayers","layers","ground.layers","basemap.referenceLayers"],n([d.property()],t.prototype,"logDebugInformation",void 0),n([d.property({readOnly:!0})],t.prototype,"isSpatialReferenceDone",void 0),n([d.property({readOnly:!0})],t.prototype,"isTileInfoDone",void 0),n([d.property({readOnly:!0})],t.prototype,"isHeightModelInfoSearching",void 0),n([d.property({constructOnly:!0})],t.prototype,"view",void 0),n([d.property({readOnly:!0})],t.prototype,"spatialReference",void 0),n([d.property({readOnly:!0})],t.prototype,"extent",void 0),n([d.property({readOnly:!0})],t.prototype,"heightModelInfo",void 0),n([d.property({readOnly:!0})],t.prototype,"vcsWkid",void 0),n([d.property({readOnly:!0})],t.prototype,"latestVcsWkid",void 0),n([d.property()],t.prototype,"mapCollectionPaths",void 0),n([d.property()],t.prototype,"defaultSpatialReference",void 0),n([d.property({readOnly:!0})],t.prototype,"tileInfo",void 0),t=o=n([d.subclass("esri.views.support.DefaultsFromMap")],t)}(d.declared(o))});