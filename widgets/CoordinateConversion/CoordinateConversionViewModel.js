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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/has","dojo/_base/config","../../Graphic","../../core/Accessor","../../core/Collection","../../core/Error","../../core/Evented","../../core/Handles","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/Point","../../geometry/projection","../../geometry/SpatialReference","../../portal/support/geometryServiceUtils","../../symbols/PictureMarkerSymbol","./support/Conversion","./support/coordinateConversionUtils","../support/GoTo"],function(e,t,o,n,r,i,a,s,c,l,h,p,u,d,v,f,m,_,g,y,w,C,b,P){var S={default:"default",crosshair:"crosshair"},L=new m([0,0,500]),M=window.location.pathname+"__coordinateConversionWidgetState",O=u.getLogger("esri.widgets.CoordinateConversion.CoordinateConversionViewModel"),j={conversions:"conversions",formats:"formats",view:"view",viewChange:"view-change"},F=0,A=[];return function(t){function s(o){var n=t.call(this,o)||this;return n._conversionPromise=null,n._handles=new p,n._locationGraphic=null,n._locale=i.locale,n._pointerCount=0,n.conversions=new c([]),n.formats=new c(b.generateDefaultFormats(n)),n.formatterAvailable=!1,n.geometryServicePromise=null,n.requestDelay=300,n.locationSymbol=new w({url:e.toUrl(r("trident")?"../../images/search/search-symbol-32.png":"../../images/search/search-symbol-32.svg"),size:12,width:12,height:12}),n.view=null,n._instanceNumber=F,F++,n._saveWidgetState=n._saveWidgetState.bind(n),n._handleFormatChange=n._handleFormatChange.bind(n),n._handleConversionChange=n._handleConversionChange.bind(n),n._handleViewChange=n._handleViewChange.bind(n),n._onClick=n._onClick.bind(n),n._onPointerMove=n._onPointerMove.bind(n),n._onPointerDown=n._onPointerDown.bind(n),n._onPointerUp=n._onPointerUp.bind(n),n}return o(s,t),s.prototype.initialize=function(){var e=this;if(this._loadWidgetState(),this.formats.forEach(function(t){e._handles.add(t.watch("currentPattern",e._saveWidgetState),t.name)}),this._handles.add(this.conversions.on("change",this._handleConversionChange),j.conversions),this._handles.add(this.formats.on("change",this._handleFormatChange),j.formats),this._handles.add(v.init(this,"view.map",function(t){e.geometryServicePromise=y.create(e.get("view.map.portalItem"))}),j.viewChange),_.isSupported()?_.load().then(function(){e.formatterAvailable=!0}).catch(function(t){O.error(new l("coordinate-conversion:projection-load-failed","Failed to load the projection module.",{error:t})),e.formatterAvailable=!1}).always(function(){return e._handles.add(v.init(e,"view",e._handleViewChange),j.viewChange)}):(this.formatterAvailable=!1,this._handles.add(v.init(this,"view",this._handleViewChange),j.viewChange)),0===this.conversions.length){var t=this.formats.find(function(e){return"xy"===e.name})||this.formats.getItemAt(0);this.conversions.add(new C({format:t}))}},s.prototype.destroy=function(){this._handles.removeAll(),this._cleanUpView(this.view),this.view=null},Object.defineProperty(s.prototype,"currentLocation",{get:function(){return this._get("currentLocation")||null},set:function(e){this._set("currentLocation",e),this._updateConversions()},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"mode",{get:function(){return this._get("mode")||"live"},set:function(e){switch(e){case"capture":this.currentLocation=null,this._startCaptureMode(),this._set("mode",e);break;case"live":this._startLiveMode(),this._set("mode",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"state",{get:function(){var e=this.get("view");return this.get("view.ready")?"ready":e?"loading":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"waitingForConversions",{get:function(){var e=this._conversionPromise;return!!e&&!e.isFulfilled()},enumerable:!0,configurable:!0}),Object.defineProperty(s.prototype,"_debouncedConvert",{get:function(){return b.debounceDeferred(function(e,t){return d.eachAlways(e.map(function(e){return e.convert(t)}))},this,this.requestDelay)},enumerable:!0,configurable:!0}),s.prototype.setLocation=function(e){if(this.view.graphics.remove(this._locationGraphic),e){var t=e.clone();t.hasZ&&(t.z=void 0),this._locationGraphic=new a({geometry:t,symbol:this.get("locationSymbol")}),this.view.graphics.add(this._locationGraphic)}},s.prototype.convert=function(e,t){return b.isValidPoint(t)?d.resolve().then(function(){return e.convert(t)}):d.reject(new l("coordinate-conversion:invalid-point","Invalid point cannot be converted.",{point:t}))},s.prototype.goToLocation=function(e){if(this.get("view.clippingArea")||this.get("view.map.basemap.baseLayers.length")>0){var t=this.get("view.clippingArea")||this.view.map.basemap.baseLayers.getItemAt(0).fullExtent;return t?t.contains(e)?this.callGoTo({target:e}):d.reject(new l("coordinate-conversion:go-to-failed","Point outside basemap extent.",{point:e})):this.callGoTo({target:e})}return this.callGoTo({target:e})},s.prototype.pause=function(){this.currentLocation=null,this._handles.remove(j.view),this.view&&(this.view.cursor=S.default,this.view.graphics.remove(this._locationGraphic))},s.prototype.previewConversion=function(e,t){return void 0===t&&(t=this.currentLocation||L),this._convertMany([e],t).then(function(t){return e.displayCoordinate})},s.prototype.resume=function(){"capture"===this.mode?this._startCaptureMode():this._startLiveMode()},s.prototype.reverseConvert=function(e,t,o){return void 0===o&&(o=this.get("view.spatialReference")||g.WGS84),t.reverseConvert(e)},s.prototype.updateConversions=function(e,t){return t&&t.type&&"point"===t.type?this._convertMany(e,t).then(function(e){return e.client.concat(e.server)}):(this._clearConversions(this.conversions),d.reject(new l("coordinate-conversion:invalid-input-point","Point is invalid, conversions cannot be updated.",{point:t})))},s.prototype._cleanUpView=function(e){e&&(e.graphics.remove(this._locationGraphic),this._handles.remove(j.view),e.cursor=S.default)},s.prototype._clearConversions=function(e){e.forEach(function(e){e.position={location:null,coordinate:null}})},s.prototype._convertMany=function(e,t){var o=this,n=e.reduce(function(e,o){return e[o.format.getConversionStrategy(t)].push(o),e},{client:[],server:[]}),r=n.client,i=n.server,a=d.all(r.map(function(e){return e.format.convert(t).then(function(t){return e.position=t,e}).catch(function(t){e.position=null})}));return this._conversionPromise=i.length>0?this._debouncedConvert(i.map(function(e){return e.format}),t).always(function(e){return e?(o.notifyChange("waitingForConversions"),e.map(function(e,t){var o=i[t];return e.error?(o.position=null,o):(o.position=e.value,o)})):[]}):d.resolve([]),this.waitingForConversions||this.notifyChange("waitingForConversions"),d.all([a,this._conversionPromise]).then(function(e){return{client:e[0],server:e[1]}})},s.prototype._handleConversionChange=function(e){var t=this;e.added.forEach(function(e){var o=e.format;o.viewModel=t,t.currentLocation&&(t._set("waitingForConversions",!0),t.convert(o,t.currentLocation).then(function(o){e.position=o,t._set("waitingForConversions",!1)}))}),this._saveWidgetState()},s.prototype._handleFormatChange=function(e){var t=this;e.added.forEach(function(e){t._handles.add(e.watch("currentPattern",t._saveWidgetState),e.name)}),e.removed.forEach(function(e){t._handles.remove(e.name)})},s.prototype._loadWidgetState=function(){if(0===this._instanceNumber)try{var e=JSON.parse(localStorage.getItem(M));e&&(A=e)}catch(e){O.error(new l("coordinate-conversion:invalid-local-storage-json","Could not read from localStorge.",{error:e}))}this._setWidgetState()},s.prototype._startCaptureMode=function(){this._handles.remove(j.view),this.view&&(this.view.cursor=S.crosshair,this.currentLocation&&this.setLocation(this.currentLocation),this._handles.add(this.view.on("click",this._onClick),j.view))},s.prototype._startLiveMode=function(){this._pointerCount=0,this._handles.remove(j.view),this.view&&(this.view.cursor=S.default,this.view.graphics.remove(this._locationGraphic),this._handles.add([this.view.on("pointer-down",this._onPointerDown),this.view.on("pointer-up",this._onPointerUp),this.view.on("pointer-move",this._onPointerMove)],j.view))},s.prototype._handleViewChange=function(e,t){t&&t!==e&&this._cleanUpView(t),e&&("capture"===this.mode&&this._startCaptureMode(),this._startLiveMode())},s.prototype._onClick=function(e){if(0===e.button){var t=this.view.toMap(e),o=t&&t.normalize();this.setLocation(o),this.currentLocation=o}},s.prototype._onPointerDown=function(e){var t=e.pointerType;if(this._pointerCount++,("touch"===t||"pen"===t)&&1===this._pointerCount){var o=this.view.toMap(e);this.currentLocation=o&&o.normalize()}},s.prototype._onPointerMove=function(e){if("mouse"===e.pointerType||1===this._pointerCount){var t=this.view.toMap(e);this.currentLocation=t&&t.normalize()}},s.prototype._onPointerUp=function(e){this._pointerCount--},s.prototype._setWidgetState=function(){var e=this,t=A[this._instanceNumber];if(!t)return void(A[this._instanceNumber]={formats:[],locale:this._locale});try{t.formats.forEach(function(o){var n=e.formats.find(function(e){return e.name===o.name});n.viewModel=e,t.locale===e._locale&&o.currentPattern&&(n.currentPattern=o.currentPattern),o.index>=0&&e.conversions.add(new C({format:e.formats.find(function(e){return e.name===o.name})}))})}catch(e){O.warn(new l("coordinate-conversion:local-storage-read-error","Could not get widget state from stored JSON.",{error:e})),A[this._instanceNumber]={formats:[],locale:this._locale}}},s.prototype._saveWidgetState=function(){var e=this._toJSON();A[this._instanceNumber]={formats:e,locale:this._locale};try{localStorage.setItem(M,JSON.stringify(A))}catch(e){O.error(new l("coordinate-conversion:local-storage-write-error","Could not write to localStorage.",{error:e}))}},s.prototype._updateConversions=function(){var e=this.conversions.toArray();return this.updateConversions(e,this.currentLocation)},s.prototype._toJSON=function(){var e=this;return this.formats.filter(function(e){var t=e.name;return"xy"===t||"basemap"===t||b.isSupportedNotation(t)}).map(function(t){return{name:t.name,currentPattern:t.currentPattern,index:e.conversions.findIndex(function(e){return e.format===t})}}).sort(function(e,t){return e.index-t.index}).toArray()},n([f.property()],s.prototype,"conversions",void 0),n([f.property({type:m})],s.prototype,"currentLocation",null),n([f.property()],s.prototype,"formats",void 0),n([f.property()],s.prototype,"mode",null),n([f.property()],s.prototype,"requestDelay",void 0),n([f.property({dependsOn:["view","view.ready"],readOnly:!0})],s.prototype,"state",null),n([f.property()],s.prototype,"locationSymbol",void 0),n([f.property({readOnly:!0})],s.prototype,"waitingForConversions",null),n([f.property()],s.prototype,"view",void 0),n([f.property({readOnly:!0,dependsOn:["requestDelay"]})],s.prototype,"_debouncedConvert",null),s=n([f.subclass("esri.widgets.CoordinateConversion.CoordinateConversionViewModel")],s)}(f.declared(s,h,P))});