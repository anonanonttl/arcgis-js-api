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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Accessor","../../core/Handles","../../core/Logger","../../core/watchUtils","../../core/accessorSupport/decorators","../../views/3d/interactive/measurementTools/areaMeasurement3D/AreaMeasurement3DTool","../../views/3d/interactive/measurementTools/support/unitUtils"],function(e,t,r,i,n,o,s,l,a,u,p){var d=["metric","imperial","square-inches","square-feet","square-yards","square-miles","square-us-feet","square-meters","square-kilometers","acres","ares","hectares"],c=s.getLogger("esri.widgets.AreaMeasurement3D.AreaMeasurement3DViewModel");return function(e){function t(t){var r=e.call(this,t)||this;return r._handles=new o,r._userUnitOptions=null,r._userUnit=null,r.view=null,r.visible=!0,r.tool=null,r}return r(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([l.init(this,["view.ready","visible"],function(){e._toggleTool()}),l.init(this,"unit",function(t){e.tool&&(e.tool.unit=t)})])},t.prototype.destroy=function(){this.view=null,this._toggleTool(),this._handles.destroy(),this._handles=null},Object.defineProperty(t.prototype,"state",{get:function(){var e=!!this.get("view.ready"),t=this.get("view.type");return e&&"3d"===t?this.get("tool.isMeasuring")?"measuring":"ready":(e&&"3d"!==t&&c.error("AreaMeasurement3D widget is not implemented for MapView"),"disabled")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isSupported",{get:function(){return"3d"===this.get("view.type")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"measurement",{get:function(){if(!this.tool)return null;var e=this.tool.model,t=e.measurementMode,r=e.measurementData,i=e.validMeasurement,n="euclidean"===t?r.intersectingSegments:r.geodesicIntersectingSegments,o=0===n.size,s=o?i?"available":"unavailable":"invalid";return{mode:t,area:{text:o&&i?e.areaLabel:null,state:s},perimeterLength:{text:o&&i?e.perimeterLengthLabel:null,state:s}}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"defaultUnit",{get:function(){return this.defaultUnitFromPortal||this.defaultUnitFromSpatialReference||"metric"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"defaultUnitFromSpatialReference",{get:function(){return p.defaultUnitForSpatialReference(this.view&&this.view.spatialReference)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"defaultUnitFromPortal",{get:function(){var e=this.get("view.map.portalItem.portal");if(!e)return null;switch(e.user&&e.user.units||e.units){case"metric":return"metric";case"english":return"imperial";default:return null}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"unitOptions",{get:function(){return this._filteredOrAllUnits(this._userUnitOptions)},set:function(e){this._userUnitOptions=e,this._set("unitOptions",this._filteredOrAllUnits(this._userUnitOptions))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"unit",{get:function(){return this._userUnit?(this._userUnit=this._findSelectableUnit(this._userUnit,this.defaultUnit),this._userUnit):this._findSelectableUnit(this.defaultUnit)},set:function(e){this._userUnit=this._findSelectableUnit(e,this._userUnit),this.notifyChange("unit")},enumerable:!0,configurable:!0}),t.prototype.clearMeasurement=function(){this.tool&&this.tool.clearMeasurement()},t.prototype._toggleTool=function(){this.view&&this.view.ready&&!this.tool&&(this._set("tool",new u({view:this.view,unit:this.unit})),this.visible&&this.tool.start()),!this.tool||this.view&&this.view.ready||(this.tool.destroy(),this._set("tool",null)),this.tool&&(this.visible?this.tool.start():(this.tool.stop(),"measured"!==this.tool.model.state&&this.clearMeasurement()))},t.prototype._findSelectableUnit=function(e,t){var r=this.unitOptions;return-1!==r.indexOf(e)?e:t?this._findSelectableUnit(t):r[0]},t.prototype._filteredOrAllUnits=function(e){if(!e)return d.slice();var t=e.filter(function(e){return-1!==d.indexOf(e)});return 0===t.length?d.slice():t},i([a.property({dependsOn:["view.ready","tool.isMeasuring"],readOnly:!0})],t.prototype,"state",null),i([a.property({dependsOn:["view.type"],readOnly:!0})],t.prototype,"isSupported",null),i([a.property()],t.prototype,"view",void 0),i([a.property({dependsOn:["view.ready","tool.area","tool.geodesicArea","tool.areaLabel","tool.perimeterLength","tool.geodesicPerimeterLength","tool.model.perimeterLengthLabel","tool.model.measurementMode","tool.model.measurementData"],readOnly:!0})],t.prototype,"measurement",null),i([a.property()],t.prototype,"visible",void 0),i([a.property({readOnly:!0})],t.prototype,"tool",void 0),i([a.property({readOnly:!0,dependsOn:["defaultUnitFromPortal","defaultUnitFromSpatialReference"]})],t.prototype,"defaultUnit",null),i([a.property({readOnly:!0,dependsOn:["view.spatialReference"]})],t.prototype,"defaultUnitFromSpatialReference",null),i([a.property({readOnly:!0,dependsOn:["view.map.portalItem.portal.units","view.map.portalItem.portal.user.units"]})],t.prototype,"defaultUnitFromPortal",null),i([a.property({dependsOn:["view.spatialReference"]})],t.prototype,"unitOptions",null),i([a.property({dependsOn:["unitOptions","defaultUnit"]})],t.prototype,"unit",null),i([a.property()],t.prototype,"clearMeasurement",null),t=i([a.subclass("esri.widgets.AreaMeasurement3D.AreaMeasurement3DViewModel")],t)}(a.declared(n))});