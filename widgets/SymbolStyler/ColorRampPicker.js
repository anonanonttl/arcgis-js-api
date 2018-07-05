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

define(["./_DelayedUpdate","./support/colorRampUtils","./support/schemeUtils","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","dijit/a11yclick","dojo/dom-class","dojo/dom-construct","dojo/dom-style","dojo/on","dojo/query","dojo/i18n!./nls/SymbolStyler","dojo/text!./templates/ColorRampPicker.html","dojo/NodeList-dom","dijit/form/Button"],function(e,t,s,i,o,r,c,h,a,n,l,d,m,p){var _={root:"esri-color-ramp-picker",item:"esri-item",text:"esri-icon-font-fallback-text",selected:"esri-selected",container:"esri-container",list:"esri-list",preview:"esri-preview",flipper:"esri-flipper",flipIcon:"esri-icon-up-down-arrows",viewport:"esri-viewport"},u={default:{height:70,width:20},preview:{height:180,width:20}};return o.createSubclass([i,r,e],{baseClass:_.root,declaredClass:"esri.widgets.SymbolStyler.ColorRampPicker",templateString:p,labels:m,css:_,constructor:function(){this._colorRampSurfaces=[],this._commitPropsTrigger=this.createUpdateTrigger(this._commitProperties,this)},postCreate:function(){this.inherited(arguments),this._addHandlers()},destroy:function(){this.inherited(arguments),this._colorRampSurfaces.forEach(function(e){e.destroy()}),this._previewRampSurface&&this._previewRampSurface.destroy()},_schemesChanged:!1,_selectedChanged:!1,_numStopsChanged:!1,_orientationChanged:!1,_commitPropsTrigger:null,_colorRampSurfaces:null,_previewRampSurface:null,_rampsAndSchemes:null,numStops:0,_setNumStopsAttr:function(e){e=e>0?e:0,this._numStopsChanged=!0,this._set("numStops",e),this._buildRampsAndSchemes(),this._commitPropsTrigger()},schemes:null,_setSchemesAttr:function(e){this._schemesChanged=!0,this._set("schemes",e),this._buildRampsAndSchemes(),this._commitPropsTrigger()},selected:null,_getSelectedAttr:function(){var e=this.selected;return{colors:s.createColors(e.colors)}},_setSelectedAttr:function(e){Array.isArray(e)&&(e={colors:e}),e.colors||(e.colors=this._rampsAndSchemes[0].colors),this._selectedChanged=!0,this._set("selected",e),this._commitPropsTrigger(),this.emit("color-ramp-change",this.get("selected"))},flipColors:function(){var e=this._rampsAndSchemes,t=this.selected;-1===this._getSuggestions().indexOf(t.colors)&&t.colors.reverse(),e.forEach(function(e){s.flipColors(e.scheme)}),this._orientationChanged=!0,this.set("selected",t),this._commitPropsTrigger()},_buildRampsAndSchemes:function(){this.schemes&&(this._rampsAndSchemes=s.getColorRampsWithSchemes(this.schemes,this.numStops))},_commitProperties:function(){var e,t;(this._schemesChanged||this._numStopsChanged)&&(this._schemesChanged=!1,this._numStopsChanged=!1,e=this._rampsAndSchemes,t=this._hasStops(),a.empty(this.dap_colorRampPicker),this._colorRampSurfaces=[],e.forEach(function(e){this._createColorRampItem({colors:e.colors,hasStops:t})},this),this._renderSuggestions()),this._selectedChanged&&(this._selectedChanged=!1,this._renderSelected()),this._orientationChanged&&(this._orientationChanged=!1,this._renderSelected(),this._renderSuggestions()),this.selected||this.set("selected",this._rampsAndSchemes[0])},_hasStops:function(){return this.numStops>0},_createColorRampItem:function(e){var s=e.colors,i=e.numClasses,o=a.create("div",{className:_.item,tabIndex:0},this.dap_colorRampPicker),r=n.get(o,"height")||u.default.height,c=n.get(o,"width")||u.default.width,h=t.createColorRamp({node:o,width:c,height:r,colors:s,numClasses:i});this._colorRampSurfaces.push(h)},_renderSuggestions:function(){var e=this._colorRampSurfaces,s=this._rampsAndSchemes,i=this._hasStops();e.forEach(function(e,o){t.updateColorRamp({ramp:e,colors:s[o].colors,hasStops:i})})},_renderSelected:function(){var e=this.selected.colors,s=this.dap_previewRamp,i=n.get(s,"height")||u.preview.height,o=n.get(s,"width")||u.preview.width,r=e,c=this._hasStops();this._previewRampSurface?t.updateColorRamp({ramp:this._previewRampSurface,colors:r,hasStops:c}):this._previewRampSurface=t.createColorRamp({node:s,height:i,width:o,colors:r,hasStops:c})},_getSuggestions:function(){return this._rampsAndSchemes.map(function(e){return e.colors})},_addHandlers:function(){var e="."+_.item,t=this;this.own(l(this.dap_colorRampPicker,l.selector(e,c),function(){t._rampClickHandler.call(this,t)})),this.own(l(this.dap_colorFlipper,c,function(){this.flipColors()}.bind(this)))},_rampClickHandler:function(e){var t=_.selected,s="."+_.item,i=this,o=d("."+_.item,e.dap_colorRampPicker).indexOf(i);d(s,e.dap_colorRampPicker).removeClass(t),h.add(i,t),e.set("selected",e._rampsAndSchemes[o])}})});