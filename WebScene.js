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

define(["require","exports","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/tsSupport/paramHelper","./core/tsSupport/assignHelper","dojo/has","./kernel","./Map","./Viewpoint","./core/Collection","./core/Error","./core/JSONSupport","./core/lang","./core/Loadable","./core/Logger","./core/promiseUtils","./core/urlUtils","./core/accessorSupport/decorators","./core/accessorSupport/originUtils","./core/accessorSupport/read","./geometry/Extent","./geometry/HeightModelInfo","./geometry/SpatialReference","./geometry/support/heightModelInfoUtils","./geometry/support/jsonUtils","./portal/Portal","./portal/PortalItem","./support/webSceneUtils","./webscene/ApplicationProperties","./webscene/Environment","./webscene/InitialViewProperties","./webscene/Presentation","./webscene/Version"],function(e,t,r,i,n,o,a,p,s,l,c,u,d,y,f,h,v,g,w,m,b,S,A,I,M,V,_,R,L,O,j,P,U,E){var W=h.getLogger("esri.WebScene"),N=a("dojo-debug-messages"),J=new E.default(1,11);return function(t){function a(e){var r=t.call(this)||this;return r.applicationProperties=null,r.clippingArea=null,r.clippingEnabled=!1,r.heightModelInfo=null,r.sourceVersion=null,r.supportsHeightModelInfo=!0,r.presentation=null,r.initialViewProperties=null,r.portalItem=null,r.resourceInfo=null,r.authoringApp=null,r.authoringAppVersion=null,r._isAuthoringAppSetByUser=!1,r._isAuthoringAppVersionSetByUser=!1,r}return r(a,t),a.prototype.initialize=function(){if(this.when().catch(function(e){W.error("#load()","Failed to load web scene",e)}),this.resourceInfo){var e=void 0;try{e=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(v.reject(e))}this.read(e),this.addResolvingPromise(this._validateSpatialReference()),this.addResolvingPromise(this._validateHeightModelInfo())}},a.prototype.getDefaults=function(e){return o({},this.inherited(arguments),{presentation:{},initialViewProperties:{}})},a.prototype.writeClippingArea=function(e,t){t.clippingArea||(t.clippingArea={}),t.clippingArea.geometry=e.toJSON()},a.prototype.readClippingEnabled=function(e,t){return!!t.clippingArea&&!!t.clippingArea.clip},a.prototype.writeClippingEnabled=function(e,t){this.clippingArea&&(t.clippingArea||(t.clippingArea={}),t.clippingArea.clip=e)},a.prototype.writeLayers=function(e,t,r,i){var n=this,a=o({},i,{layerContainerType:"operational-layers"}),p=e.filter(function(e){return n.verifyWriteLayer(e,a)}).map(function(e){return e.write(null,a)}).filter(function(e){return!!e});t[r]=p.toArray()},a.prototype.verifyWriteLayer=function(e,t){return!!e.write||(t&&t.messages&&t.messages.push(new u("layer:unsupported","Layers ("+e.title+", "+e.id+") of type '"+e.declaredClass+"' cannot be persisted in web scenes",{layer:e})),!1)},a.prototype.readSourceVersion=function(e,t){var r=t.version.split("."),i=r[0],n=r[1];return new E.default(parseInt(i,10),parseInt(n,10))},a.prototype.writeSourceVersion=function(e,t,r){t[r]=J.major+"."+J.minor},Object.defineProperty(a.prototype,"authoringApp",{set:function(e){this._isAuthoringAppSetByUser=!0,this._set("authoringApp",e)},enumerable:!0,configurable:!0}),a.prototype.writeAuthoringApp=function(e,t){e&&this._isAuthoringAppSetByUser?t.authoringApp=e:t.authoringApp="ArcGIS API for JavaScript"},Object.defineProperty(a.prototype,"authoringAppVersion",{set:function(e){this._isAuthoringAppVersionSetByUser=!0,this._set("authoringAppVersion",e)},enumerable:!0,configurable:!0}),a.prototype.writeAuthoringAppVersion=function(e,t){e&&this._isAuthoringAppVersionSetByUser?t.authoringAppVersion=e:t.authoringAppVersion=p.version},a.prototype.writeGround=function(e,t,r,i){t[r]=e?e.write(null,i):{transparency:0,layers:[]}},a.prototype.readInitialViewProperties=function(e,t){var r={};return t.initialState&&t.initialState.environment&&(r.environment=j.fromJSON(t.initialState.environment)),t.spatialReference&&(r.spatialReference=I.fromJSON(t.spatialReference)),r.viewingMode=t.viewingMode||"global",t.initialState&&t.initialState.viewpoint&&(r.viewpoint=l.fromJSON(t.initialState.viewpoint)),new P(r)},a.prototype.writeInitialViewProperties=function(e,t,r,i){if(e){var n={};e.environment&&(n.environment=e.environment.write({},i)),e.viewpoint&&(n.viewpoint=e.viewpoint.write({},i)),0!==Object.keys(n).length&&(t.initialState=n),t.spatialReference=e.spatialReference?e.spatialReference.write({},i):I.WebMercator.toJSON(),t.viewingMode=null!=e.viewingMode?e.viewingMode:"global"}},a.prototype.load=function(){return this.addResolvingPromise(this._loadFromSource()),this.when()},a.prototype.read=function(e,t){var r=this;t=o({},t,{origin:"web-scene"});var i=this._isAuthoringAppVersionSetByUser,n=this._isAuthoringAppSetByUser,a=arguments;if(b.readLoadable(this,e,function(t){return r.inherited(a,[e,t])},t),n||(this._isAuthoringAppSetByUser=!1),i||(this._isAuthoringAppVersionSetByUser=!1),e.baseMap&&Array.isArray(e.baseMap.elevationLayers)&&this.sourceVersion.supportsVisibleElevationLayersInSlides){var p=e.baseMap.elevationLayers.map(function(e){return{id:e.id}}),s=this.presentation.slides,l=function(e,t){return e.visibleLayers.some(function(e){return e.id===t})},c=p.filter(function(e){return!s.some(function(t){return l(t,e.id)})});s.forEach(function(e){e.visibleLayers.addMany(c)})}return this},a.prototype._writeBasemapElevationLayers=function(e){var t=e.ground&&e.ground.layers;!e.baseMap&&t&&t.length&&(e.baseMap={title:"Basemap",baseMapLayers:[]}),e.baseMap&&(e.baseMap.elevationLayers=y.clone(t))},a.prototype.write=function(e,t){if("loaded"!==this.loadStatus){var r=new u("webscene:not-loaded","Web scene must be loaded before it can be serialized");throw W.error("#toJSON()","Web scene must be loaded before it can be serialized",this.loadError||this.loadStatus),r}t=o({},t,{origin:"web-scene"});var i=this.inherited(arguments,[e,t]);return this._writeBasemapElevationLayers(i),i},a.prototype.save=function(e){var t=this;if(!this.portalItem)return W.error("save(): requires the .portalItem property to be set"),v.reject(new u("webscene:portal-item-not-set","Portal item to save to has not been set on the WebScene"));if("Web Scene"!==this.portalItem.type)return v.reject(new u("webscene:portal-item-wrong-type",'Portal item needs to have type "Web Scene"'));var r,i;return this.load().then(function(){return t._loadObjectsWithLayers()}).then(function(){return r=t._enableVerifyItemRelativeUrls({origin:"web-scene",url:t.portalItem.itemUrl&&g.urlToObject(t.portalItem.itemUrl),messages:[],portal:t.portalItem.portal||_.getDefault(),writtenProperties:[],blockedRelativeUrls:[]}),i=t.write(null,r),t._verifySave(i,r,e).then(function(){return t._updateTypeKeywords(t.portalItem),t.portalItem.update({data:i})})}).then(function(){return m.updateOrigins(r),v.resolve(t.portalItem)})},a.prototype.saveAs=function(e,t){var r=this;if(!e)return W.error("saveAs(portalItem): requires a portal item parameter"),v.reject(new u("webscene:portal-item-required","saveAs requires a portal item to save to"));if(e.type&&"Web Scene"!==e.type||e.id)return v.reject(new u("webscene:portal-item-already-exists","WebScene can only saveAs to a new and empty portal item"));var i,n,o=e.portal||_.getDefault();return this.load().then(function(){return r._loadObjectsWithLayers()}).then(function(){return i=r._enableVerifyItemRelativeUrls({origin:"web-scene",url:null,messages:[],portal:o,writtenProperties:[],blockedRelativeUrls:[]}),n=r.write(null,i),r._verifySaveAs(n,i,t).then(function(){return o._signIn()})}).then(function(){return e.type="Web Scene",e.portal=o,r._updateTypeKeywords(e),o.user.addItem({item:e,folder:t&&t.folder,data:n})}).then(function(){return r.portalItem=e,d.prototype.read.call(r,{version:n.version,authoringApp:n.authoringApp,authoringAppVersion:n.authoringAppVersion},{name:"web-scene",url:e.itemUrl&&g.urlToObject(e.itemUrl)}),m.updateOrigins(i),v.resolve(e)})},a.prototype._verifySave=function(t,r,i,n){void 0===n&&(n=!1);var o=r.messages.filter(function(e){return"error"===e.type}).map(function(e){return new u(e.name,e.message,e.details)});r.blockedRelativeUrls&&(o=o.concat(r.blockedRelativeUrls.map(function(e){return new u("url:unsupported","Relative url '"+e+"' is not supported in Web Scene")}))),i&&i.ignoreUnsupported&&(o=o.filter(function(e){return"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name})),i&&i.strictSchemaValidationEnabled||(o=o.filter(function(e){return"web-document-write:property-required"!==e.name}));var a,p=i&&i.strictSchemaValidationEnabled;return a=N||p?v.create(function(t){return e(["./webscene/validator"],t)}).then(function(e){var r=e.validate(t);if(r.length>0){var i="webscene did not validate:\n"+r.join("\n");W.error((n?"saveAs":"save")+"(): "+i)}return r.map(function(e){return new u("webscene:schema-validation",e)})}).then(function(e){if(p&&e.length>0){var t=L.createSchemaValidationError(e.concat(o));return v.reject(t)}return o}):v.resolve(o),a.then(function(e){if(e.length>0)return v.reject(new u("webscene:save","Failed to save webscene due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:e}))})},a.prototype._verifySaveAs=function(e,t,r){return this.canSaveAs(t)?v.reject(L.createCopyError()):this._verifySave(e,t,r,!0)},a.prototype.verifySaveAs=function(e){var t=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),r=this.write(null,t);return this._verifySaveAs(r,t,e)},a.prototype.canSaveAs=function(e){return e||(e=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),this.write(null,e)),e.verifyItemRelativeUrls&&e.verifyItemRelativeUrls.writtenUrls.length>0},a.prototype.updateFrom=function(e,t){void 0===t&&(t={}),t.environmentExcluded||(this.initialViewProperties.environment=j.prototype.clone.apply(e.environment)),t.viewpointExcluded||(this.initialViewProperties.viewpoint=e.viewpoint.clone()),this.initialViewProperties.spatialReference=e.spatialReference.clone(),this.initialViewProperties.viewingMode=e.viewingMode,e.clippingArea?e.clippingArea!==this.clippingArea&&(this.clippingArea=e.clippingArea.clone(),this.clippingEnabled=!0):this.clippingEnabled=!1,e.heightModelInfo&&(this.heightModelInfo=e.heightModelInfo.clone()),e.map===this&&e.allLayerViews.forEach(function(e){e.layer.visible=e.visible})},a.prototype._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-scene"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):this._loadObjectsWithLayers()},a.prototype._readAndLoadFromJSON=function(e,t){var r=this._validateJSON(e,t&&t.url&&t.url.path);return this.read(r,t),this._loadFromJSON(r,t)},a.prototype._extractOperationalLayers=function(e){var t=this,r=[];if(!this.sourceVersion.supportsGround&&e.baseMap&&Array.isArray(e.baseMap.elevationLayers))for(var i=0,n=e.baseMap.elevationLayers;i<n.length;i++){var o=n[i];r.push(o)}var a=[],p=function(e){return e.layers&&(e.layers=e.layers.filter(p)),"ArcGISTiledElevationServiceLayer"!==e.layerType||(t.sourceVersion.supportsGround||a.push(e),!1)};return{operationalLayers:e.operationalLayers?e.operationalLayers.filter(p):[],operationalElevationLayers:a,basemapElevationLayers:r}},a.prototype._loadFromJSON=function(t,r){var i=this,n=new c;return this._validateSpatialReference().then(function(){return i._validateHeightModelInfo()}).then(function(){return v.create(function(t){return e(["./portal/support/layersCreator"],t)})}).then(function(e){var a=i._extractOperationalLayers(t),p=a.operationalLayers,s=a.operationalElevationLayers,l=a.basemapElevationLayers,c=[],u={context:o({},r,{layerContainerType:"operational-layers"})};if(i.portalItem&&(u.context.portal=i.portalItem.portal||_.getDefault()),l.length>0){var d=o({},u,{context:o({},u.context,{layerContainerType:"ground"})});d.defaultLayerType="ArcGISTiledElevationServiceLayer",c.push.apply(c,e.populateOperationalLayers(i.ground.layers,l,d))}if(s.length>0){var d=o({},u,{context:o({},u.context,{layerContainerType:"ground"})});d.defaultLayerType="ArcGISTiledElevationServiceLayer",c.push.apply(c,e.populateOperationalLayers(n,s,d))}return p&&p.length>0&&c.push.apply(c,e.populateOperationalLayers(i.layers,p,u)),v.eachAlways(c).then(function(){})}).then(function(){return i._loadObjectsWithLayers()}).then(function(){i.ground.layers.addMany(n)})},a.prototype._loadObjectsWithLayers=function(){var e=[];return this.ground&&e.push(this.ground.load()),this.basemap&&e.push(this.basemap.load()),this.presentation.slides.forEach(function(t){t.basemap&&e.push(t.basemap.load())}),v.eachAlways(e).then(function(){})},a.prototype._loadFromItem=function(e){var t=this;return e.load().catch(function(e){throw new u("webscene:load-portal-item","Failed to load portal item",{error:e})}).then(function(){if("Web Scene"!==e.type)throw new u("webscene:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Scene'",{type:e.type})}).then(function(){return e.fetchData()}).then(function(r){return t.resourceInfo=r,t._readAndLoadFromJSON(r,{origin:"web-scene",url:g.urlToObject(e.itemUrl),portal:e.portal||_.getDefault()})})},a.prototype._validateSpatialReference=function(){var e,t=this.initialViewProperties,r=this._sceneSpatialReference,i="local"!==t.viewingMode;if(i){if(!r.isWGS84&&!r.isWebMercator)return v.reject(new u("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in global mode, only Web Mercator or WGS84 GCS are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.isWGS84||e.isWebMercator}}else{if(r.isGeographic)return v.reject(new u("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in local mode, only projected coordinate systems are supported",{spatialReference:r,viewingMode:t.viewingMode}));e=function(e){return!e||e.equals(r)}}var n=function(e){return e&&(e.camera&&e.camera.position&&e.camera.position.spatialReference||e.targetGeometry&&e.targetGeometry.spatialReference)},o=t.viewpoint,a=n(o);if(a&&!e(a))return v.reject(new u("webscene:incompatible-camera-spatial-reference","Camera spatial reference (${cameraSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{cameraSpatialReference:a,sceneSpatialReference:r,viewingMode:t.viewingMode}));var p=this.presentation.slides.find(function(t){return!e(n(t.viewpoint))});if(p){var s=n(p.viewpoint);return v.reject(new u("webscene:incompatible-slide-spatial-reference","Slide spatial reference (${slideSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{slideSpatialReference:s,sceneSpatialReference:r,viewingMode:t.viewingMode}))}return v.resolve()},a.prototype._validateHeightModelInfo=function(){var e=this._sceneSpatialReference,t=M.validateWebSceneError(this.heightModelInfo,e);return t?v.reject(t):v.resolve()},a.prototype._validateJSON=function(e,t){void 0===t&&(t=null);var r=this._sanitizeJSON(e,t),i=E.default.parse(r.version,"webscene");return J.validate(i),r.version=i.major+"."+i.minor,1===i.major&&i.minor<=2&&(r.spatialReference=I.WebMercator.toJSON()),r},a.prototype._sanitizeJSON=function(e,t){return void 0===t&&(t=null),{version:e.version||"",baseMap:e.baseMap,ground:e.ground,operationalLayers:e.operationalLayers,authoringApp:e.authoringApp||"",authoringAppVersion:e.authoringAppVersion||"",viewingMode:e.viewingMode||"global",presentation:e.presentation&&U.sanitizeJSON(e.presentation)||{},initialState:e.initialState,spatialReference:e.spatialReference||I.WebMercator.toJSON(),heightModelInfo:e.heightModelInfo||null,clippingArea:e.clippingArea,applicationProperties:e.applicationProperties}},a.prototype._updateTypeKeywords=function(e){"local"===this.initialViewProperties.viewingMode?e.typeKeywords?-1===e.typeKeywords.indexOf("ViewingMode-Local")&&e.typeKeywords.push("ViewingMode-Local"):e.typeKeywords=["ViewingMode-Local"]:"global"===this.initialViewProperties.viewingMode&&e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e){return"ViewingMode-Local"!==e})),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(function(e,t,r){return r.indexOf(e)===t}))},Object.defineProperty(a.prototype,"_sceneSpatialReference",{get:function(){return this.initialViewProperties.spatialReference||I.WebMercator},enumerable:!0,configurable:!0}),Object.defineProperty(a.prototype,"_verifyItemRelativeRootPath",{get:function(){return this.portalItem&&this.portalItem.itemUrl?g.urlToObject(this.portalItem.itemUrl).path:null},enumerable:!0,configurable:!0}),a.prototype._enableVerifyItemRelativeUrls=function(e){var t=this._verifyItemRelativeRootPath;return t&&(e.verifyItemRelativeUrls={rootPath:t,writtenUrls:[]}),e},a.fromJSON=function(e){if(!e)throw new u("webscene:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:e})},a.VERSION=J,i([w.property({type:O,json:{write:!0}})],a.prototype,"applicationProperties",void 0),i([w.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],a.prototype,"basemap",void 0),i([w.property({type:S,json:{read:{source:"clippingArea.geometry",reader:V.fromJSON},write:{target:"clippingArea.geometry"}}})],a.prototype,"clippingArea",void 0),i([w.writer("clippingArea")],a.prototype,"writeClippingArea",null),i([w.property({type:Boolean,json:{write:{target:"clippingArea.clip"}}})],a.prototype,"clippingEnabled",void 0),i([w.reader("clippingEnabled",["clippingArea"])],a.prototype,"readClippingEnabled",null),i([w.writer("clippingEnabled")],a.prototype,"writeClippingEnabled",null),i([w.property({type:A,json:{write:!0}})],a.prototype,"heightModelInfo",void 0),i([w.property({json:{write:{target:"operationalLayers"}}})],a.prototype,"layers",void 0),i([w.writer("layers")],a.prototype,"writeLayers",null),i([w.property({readOnly:!0,type:E.default,json:{type:String,write:{allowNull:!0,target:"version",isRequired:!0}}})],a.prototype,"sourceVersion",void 0),i([w.reader("sourceVersion",["version"])],a.prototype,"readSourceVersion",null),i([w.writer("sourceVersion")],a.prototype,"writeSourceVersion",null),i([w.property({type:String,json:{write:{allowNull:!0}}})],a.prototype,"authoringApp",null),i([w.writer("authoringApp")],a.prototype,"writeAuthoringApp",null),i([w.property({type:String,json:{write:{allowNull:!0}}})],a.prototype,"authoringAppVersion",null),i([w.writer("authoringAppVersion")],a.prototype,"writeAuthoringAppVersion",null),i([w.property({json:{write:{isRequired:!0,allowNull:!0,enabled:!0}}})],a.prototype,"ground",void 0),i([w.writer("ground")],a.prototype,"writeGround",null),i([w.property({type:U,json:{write:function(e,t,r,i){if(e.slides&&e.slides.length>0){var n=o({},i,{isPresentation:!0});t.presentation=e.write(null,n)}}}})],a.prototype,"presentation",void 0),i([w.property({type:P})],a.prototype,"initialViewProperties",void 0),i([w.reader("initialViewProperties",["initialState.environment","spatialReference","viewingMode","initialState.viewpoint"])],a.prototype,"readInitialViewProperties",null),i([w.writer("initialViewProperties",{"initialState.environment":{type:j},spatialReference:{type:I},viewingMode:{type:String},"initialState.viewpoint":{type:l}})],a.prototype,"writeInitialViewProperties",null),i([w.property({type:R})],a.prototype,"portalItem",void 0),i([w.property()],a.prototype,"resourceInfo",void 0),i([n(0,w.cast(R))],a.prototype,"saveAs",null),i([w.property()],a.prototype,"_sceneSpatialReference",null),i([w.property()],a.prototype,"_verifyItemRelativeRootPath",null),a=i([w.subclass("esri.WebScene")],a)}(w.declared(s,f,d))});