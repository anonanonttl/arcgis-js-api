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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/Deferred","dojo/i18n!./nls/Directions","../../Color","../../Graphic","../../symbols","../../core/Accessor","../../core/Collection","../../core/Error","../../core/Evented","../../core/Handles","../../core/Logger","../../core/promiseUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../geometry/support/graphicsUtils","../../geometry/support/scaleUtils","../../layers/GraphicsLayer","../../tasks/RouteTask","../../tasks/support/FeatureSet","../../tasks/support/RouteParameters","./support/directionsUtils","../support/GoTo"],function(e,t,r,o,i,s,n,a,u,l,p,c,d,h,y,v,m,f,g,b,w,_,T,S,C,R,D){var L=v.getLogger("esri.widgets.Directions.DirectionsViewModel"),M={first:new l.SimpleMarkerSymbol({color:[105,220,255,1],size:19,outline:{color:[51,51,51,1],width:3}}),middle:new l.SimpleMarkerSymbol({color:[51,51,51,1],size:12,outline:{color:[105,220,255,1],width:3}}),last:new l.PictureMarkerSymbol({width:23,height:23,url:"data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='nonzero' fill='none'%3E%3Cpath d='M15.15.3C6.9.3.3 6.9.3 15.15S6.9 29.7 15.15 29.7 29.7 23.1 29.7 15.15C29.7 6.9 23.25.3 15.15.3z' fill='%23333'/%3E%3Cpath d='M15 4.8C9.3 4.8 4.8 9.45 4.8 15c0 5.55 4.65 10.2 10.2 10.2 5.55 0 10.2-4.5 10.2-10.2 0-5.55-4.5-10.2-10.2-10.2z' fill='%2369DCFF'/%3E%3Cpath fill='%23333' d='M10.5 10.5h9v9h-9z'/%3E%3C/g%3E%3C/svg%3E"}),unlocated:new l.PictureMarkerSymbol({height:18,width:18,url:"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M10.1.2C4.6.2.2 4.6.2 10.1s4.4 9.7 9.9 9.7 9.7-4.4 9.7-9.7c0-5.5-4.3-9.9-9.7-9.9z' fill='%23333' fill-rule='nonzero'/%3E%3Cpath d='M10 2.7c-4.08 0-7.3 3.328-7.3 7.3s3.328 7.3 7.3 7.3 7.3-3.22 7.3-7.3c0-3.972-3.22-7.3-7.3-7.3z' fill='%2369DCFF' fill-rule='nonzero'/%3E%3Cpath d='M11.414 10l5.304-5.303-1.415-1.415L10 8.586 4.697 3.282 3.282 4.697 8.586 10l-5.304 5.303 1.415 1.415L10 11.414l5.303 5.304 1.415-1.415L11.414 10z' fill='%23333'/%3E%3C/g%3E%3C/svg%3E"}),waypoint:new l.SimpleMarkerSymbol({color:[255,255,255,1],size:10,outline:{color:[20,89,127,1],width:2.5}})};return function(e){function t(t){var r=e.call(this,t)||this;return r._handles=new y,r._routeLayer=new _({listMode:"hide"}),r._highlightLayer=new _({listMode:"hide"}),r._stopId=9999,r._stopLayer=new _({listMode:"hide"}),r._serviceDescriptionLoadStatus=0,r.departureTime="now",r.lastRoute=null,r.routeSymbol=new l.SimpleLineSymbol({color:[105,220,255,1],width:7,cap:"round",join:"round"}),r.routeParameters=new C({doNotLocateOnRestrictedElements:!0,ignoreInvalidLocations:!0,directionsOutputType:"complete",findBestSequence:!1,preserveFirstStop:!0,preserveLastStop:!0,restrictUTurns:"at-dead-ends-and-intersections",directionsLengthUnits:"kilometers",returnBarriers:!1,returnDirections:!0,returnPolygonBarriers:!1,returnPolylineBarriers:!1,returnRoutes:!1,returnStops:!0,returnZ:!0,startTime:null,startTimeIsUTC:!0,stops:null,useHierarchy:!0,useTimeWindows:!1}),r.routeServiceUrl="https://route.arcgis.com/arcgis/rest/services/World/Route/NAServer/Route_World",r.serviceDescription=null,r.error=null,r.stops=new c,r.view=null,r}return o(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([f.on(this,"stops","change",function(t){e.clearResults(),e._addStopsToLayer()}),f.watch(this,"view.map",function(t,r){var o=[e._routeLayer,e._stopLayer,e._highlightLayer];r&&r.removeMany(o),t&&t.addMany(o)}),f.watch(this,"lastRoute",function(){return e._addRouteToLayer()})])},t.prototype.destroy=function(){this.stops.destroy()},Object.defineProperty(t.prototype,"impedanceAttribute",{get:function(){var e=this.get("routeParameters.travelMode.impedanceAttributeName")||this.get("routeParameters.impedanceAttribute")||this.get("serviceDescription.impedance");return this.getCostAttribute(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"maxStops",{set:function(e){e=e<=2?2:e>50?50:e,this._set("maxStops",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_routeTask",{get:function(){return new T(this.routeServiceUrl)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selectedTravelMode",{get:function(){var e=this.serviceDescription;if(!e)return null;for(var t=e.defaultTravelMode,r=e.supportedTravelModes,o=void 0===r?[]:r,i=null,s=0;s<o.length;s++)o[s].id===t&&(i=o[s]);return i||o[0]||null},set:function(e){if(void 0===e)return void this._clearOverride("selectedTravelMode");this._override("selectedTravelMode",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){var e=this._serviceDescriptionLoadStatus;return 4===e?"unauthenticated":0===e?"disabled":1===e?"initializing":this._activeRoute?"routing":3===e||this.error?"error":"ready"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"stopSymbols",{set:function(e){var t=r({},M,e);this._set("stopSymbols",t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"timeAttribute",{get:function(){var e=this.get("routeParameters.travelMode.timeAttributeName")||this.get("routeParameters.directionsTimeAttribute")||this.get("serviceDescription.directionsTimeAttribute");return this.getCostAttribute(e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"travelModes",{get:function(){return this.get("serviceDescription.supportedTravelModes")||[]},enumerable:!0,configurable:!0}),t.prototype.load=function(){var e=this;return this.serviceDescription?m.resolve():m.resolve().then(function(){return e._serviceDescriptionLoadStatus=1,e.notifyChange("state"),e._loadServiceDescription()}).then(function(){e._serviceDescriptionLoadStatus=2,e.notifyChange("state")}).catch(function(t){var r="identity-manager:user-aborted"===t.name;if(e._serviceDescriptionLoadStatus=r?4:3,e.notifyChange("state"),!r)throw new d("directions-view-model:failed-to-fetch-service-description","Cannot load route service metadata.",{error:t})})},t.prototype.highlightSegment=function(e){var t=this,r=t.view,o=t._highlightLayer;if(r){this.clearHighlights();var i=e.symbol.clone();i.color=new a([0,0,0,.8]),i.width=Math.ceil(i.width/2);var s=new u({geometry:e.geometry,symbol:i});o.graphics.add(s)}},t.prototype.clearHighlights=function(){this._highlightLayer.graphics.removeAll()},t.prototype.centerAt=function(e){this.view&&this.callGoTo({target:e})},t.prototype.clearResults=function(){this._set("lastRoute",null)},t.prototype.getDirections=function(){var e=this;if("initializing"===this.state||"disabled"===this.state)return m.reject(new d("directions:disabled-state","Cannot get directions when disabled"));this._set("error",null),this._activeRoute&&(this._activeRoute.cancel(),this._activeRoute=null);var t=this.departureTime,r="now"===t?new Date:t,o="now"===t;if(this.routeParameters.set({startTime:r,startTimeIsUTC:o}),this.selectedTravelMode&&this.routeParameters.set({travelMode:this.selectedTravelMode}),this.stops.length<=1){var i=new d("directionsviewmodel:not-enough-stops",n.messages.errors.notEnoughStops);return this._set("error",i),m.reject(i)}return this._activeRoute=this._enqueue(function(){var t=e.stops.clone().toArray(),r={},o=function(e){var o=e&&e.routeResults&&e.routeResults[0]&&e.routeResults[0].stops||[];(e&&e.routeResults&&e.routeResults[0]&&e.routeResults[0].directions&&e.routeResults[0].directions.features||[]).map(function(e){for(var o=0;o<t.length;o++)if(e.attributes.text.indexOf(t[o].attributes.Name)>-1){var i=t[o].attributes.Name;e.attributes.text=e.attributes.text.replace(i,r[i]),e._associatedStop=t[o];break}}),t.map(function(e){return e.attributes.Name=r[e.attributes.Name]}),o.map(function(e){e.attributes.Name=r[e.attributes.Name]})},i=function(t){if(t&&t.routeResults&&t.routeResults[0]){var r=t.routeResults[0],o=r.stops||[],i=e.stops.clone().toArray(),s=r.directions&&r.directions.routeName||r.routeName||"";o.map(function(e,t){var r=e.attributes,o=i[t].attributes;s=s.replace(r.Name,o.Name),Object.keys(r).forEach(function(e){0===e.indexOf("Cumul_")&&(o[e]=r[e])}),o.ArriveCurbApproach=r.ArriveCurbApproach,o.ArriveTime=r.ArriveTime,o.ArriveTimeUTC=r.ArriveTimeUTC,o.DepartCurbApproach=r.DepartCurbApproach,o.DepartTime=r.DepartTime,o.DepartTimeUTC=r.DepartTimeUTC,o.Sequence=r.Sequence,o.Status=r.Status}),r.directions&&(r.directions.routeName=s),null!==r.route&&(r.route.attributes.Name=s),r.routeName=s}},s=function(t){for(var o=t&&t.routeResults&&t.routeResults[0]&&t.routeResults[0].stops||[],i=e.stops.toArray(),s=o.length===i.length,n=0;s&&n<o.length;)s=s&&r[o[n].attributes.Name]===i[n++].attributes.Name;return s};return function(){t.map(function(t){var o=t.attributes,i=(o.Name||"[not yet geocoded]").substr(0,100)+"_#"+ ++e._stopId;r[i]=o.Name,o.Name=i})}(),e.routeParameters.set({stops:new S({features:t})}),e._routeTask.solve(e.routeParameters).then(function(t){return s(t)?(i(t),o(t),e._set("lastRoute",t),t):(L.warn("Response stops don't match current stops of the ViewModel, invalidating the results."),e._set("lastRoute",null),null)}).catch(function(e){throw o(null),e})}).then(function(t){return e._activeRoute=null,e.notifyChange("state"),e.zoomToRoute(),t}).catch(function(t){if(e._activeRoute=null,e.notifyChange("state"),"cancel"!==t.dojoType)throw e._set("error",t),t}),this.notifyChange("state"),this._activeRoute},t.prototype.getCostAttribute=function(e){for(var t=this.serviceDescription&&this.serviceDescription.networkDataset.networkAttributes||[],r="",o=0;o<t.length;o++)if(t[o].name===e&&"esriNAUTCost"===t[o].usageType){r=t[o];break}return r},t.prototype.reset=function(){this.stops.removeAll(),this._set("lastRoute",null)},t.prototype.zoomToRoute=function(){var e=this,t=e.directionLines,r=e.view;if(t&&r){var o=b.graphicsExtent(t).expand(2),i=w.getScale(r,o);this.callGoTo({target:{target:o,scale:i}})}},t.prototype._loadServiceDescription=function(){var e=this;return this._routeTask.getServiceDescription().then(function(t){e._set("serviceDescription",t)})},t.prototype._enqueue=function(e,t){var r=this,o=new s;return this._requestQueueTail||(this._requestQueueTail=new s,this._requestQueueTail.resolve()),this._requestQueueTail.promise.always(function(){try{var t=e.call(r);t&&"object"==typeof t&&t.hasOwnProperty("isFulfilled")?t.then(o.resolve,o.reject):o.resolve(t)}catch(e){o.reject(e)}}),this._requestQueueTail=o,o.promise},t.prototype._addStopsToLayer=function(){var e=this;this._stopLayer.graphics.removeAll();var t=this.stops.map(function(t,r){var o=e.stopSymbols,i=o.first,s=o.middle,n=o.last,a=o.unlocated,u=o.waypoint;return R.isWaypoint(t)?t.symbol=u:void 0===t.attributes.Status?t.symbol=0===r?i:r===e.stops.length-1?n:s:t.symbol=R.isWaypoint(t)?u:R.isStopLocated(t)?R.isFirstStop(t)?i:R.isLastStop(t)?n:s:a,t.clone()});this._stopLayer.graphics.addMany(t)},t.prototype._addRouteToLayer=function(){var e=this;this._routeLayer.graphics.removeAll();var t=this.directionLines;t&&(t.forEach(function(t){t.symbol=e.routeSymbol}),this._routeLayer.graphics.addMany(t))},i([g.property()],t.prototype,"departureTime",void 0),i([g.property({aliasOf:"lastRoute.routeResults.0.directions.features"})],t.prototype,"directionLines",void 0),i([g.property({readOnly:!0,dependsOn:["routeParameters","serviceDescription"]})],t.prototype,"impedanceAttribute",null),i([g.property({readOnly:!0})],t.prototype,"lastRoute",void 0),i([g.property({value:50})],t.prototype,"maxStops",null),i([g.property()],t.prototype,"routeSymbol",void 0),i([g.property({type:C})],t.prototype,"routeParameters",void 0),i([g.property()],t.prototype,"routeServiceUrl",void 0),i([g.property({dependsOn:["routeServiceUrl"],type:T})],t.prototype,"_routeTask",null),i([g.property({dependsOn:["serviceDescription"]})],t.prototype,"selectedTravelMode",null),i([g.property({readOnly:!0})],t.prototype,"serviceDescription",void 0),i([g.property({dependsOn:["error"],readOnly:!0})],t.prototype,"state",null),i([g.property()],t.prototype,"error",void 0),i([g.property({type:c})],t.prototype,"stops",void 0),i([g.property({value:M})],t.prototype,"stopSymbols",null),i([g.property({readOnly:!0,dependsOn:["routeParameters","serviceDescription"]})],t.prototype,"timeAttribute",null),i([g.property({dependsOn:["serviceDescription"]})],t.prototype,"travelModes",null),i([g.property()],t.prototype,"view",void 0),i([g.property()],t.prototype,"getDirections",null),i([g.property()],t.prototype,"zoomToRoute",null),t=i([g.subclass("esri.widgets.Directions.DirectionsViewModel")],t)}(g.declared(p,h,D))});