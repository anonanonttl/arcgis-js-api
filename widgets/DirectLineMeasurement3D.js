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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./DirectLineMeasurement3D/nls/DirectLineMeasurement3D","../core/accessorSupport/decorators","./Widget","./DirectLineMeasurement3D/DirectLineMeasurement3DViewModel","./support/widget"],function(e,t,i,s,n,r,a,l,u){var o={button:"esri-button esri-button--secondary",base:"esri-direct-line-measurement-3d esri-widget esri-widget--panel",container:"esri-direct-line-measurement-3d__container",hint:"esri-direct-line-measurement-3d__hint",panelError:"esri-direct-line-measurement-3d__panel--error",measurement:"esri-direct-line-measurement-3d__measurement",measurementItem:"esri-direct-line-measurement-3d__measurement-item",measurementItemDisabled:"esri-direct-line-measurement-3d__measurement-item--disabled",measurementItemTitle:"esri-direct-line-measurement-3d__measurement-item-title",measurementItemValue:"esri-direct-line-measurement-3d__measurement-item-value",units:"esri-direct-line-measurement-3d__units",unitsLabel:"esri-direct-line-measurement-3d__units-label",unitsSelect:"esri-direct-line-measurement-3d__units-select esri-select",unitsSelectWrapper:"esri-direct-line-measurement-3d__units-select-wrapper",clearButton:"esri-direct-line-measurement-3d__clear-button"};return function(e){function t(t){var i=e.call(this)||this;return i.view=null,i.visible=null,i.viewModel=new l,i.unitOptions=null,i.unit=null,i}return i(t,e),t.prototype.clearMeasurement=function(){},t.prototype.render=function(){var e=this,t=!this.viewModel.isSupported,i="measuring"===this.viewModel.state,s="ready"===this.viewModel.state,r=this.viewModel.measurement,a=s?u.tsx("section",{key:"esri-direct-line-measurement-3d__hint",class:o.hint},u.tsx("p",null,n.hint)):null,l=t?u.tsx("section",{key:"esri-direct-line-measurement-3d__unsupported",class:o.panelError},u.tsx("p",null,n.unsupported)):null,c=function(t,i,s){switch(i.state){case"available":return u.tsx("div",{key:s+"-enabled",class:o.measurementItem},u.tsx("span",{class:o.measurementItemTitle},t),u.tsx("span",{class:o.measurementItemValue},i.text));case"unavailable":return u.tsx("div",{key:s+"-disabled",class:e.classes(o.measurementItem,o.measurementItemDisabled)},u.tsx("span",{class:o.measurementItemTitle},t))}},m=i?u.tsx("section",{key:"esri-direct-line-measurement-3d__measurement",class:o.measurement},c(n.direct,r.directDistance,"direct"),c(n.horizontal,r.horizontalDistance,"horizontal"),c(n.vertical,r.verticalDistance,"vertical")):null,d=this.id+"__units",p=u.tsx("label",{class:o.unitsLabel,for:d},n.unit),v=u.tsx("div",{class:o.unitsSelectWrapper},u.tsx("select",{class:o.unitsSelect,id:d,onchange:this._changeUnit,bind:this},this.viewModel.unitOptions.map(function(t){return t===e.viewModel.unit?u.tsx("option",{key:t,value:t,selected:!0},n.units[t]):u.tsx("option",{key:t,value:t},n.units[t])}))),_=i?u.tsx("section",{key:"esri-direct-line-measurement-3d__units",class:o.units},p,v):null,w=i?u.tsx("button",{class:this.classes(o.button,o.clearButton),bind:this,onclick:this._newMeasurement},n.newMeasurement):null,M=this.visible?u.tsx("div",{class:o.container},l,a,m,_,w):null;return u.tsx("div",{key:"",class:o.base,role:"presentation"},M)},t.prototype._newMeasurement=function(){this.clearMeasurement()},t.prototype._changeUnit=function(e){var t=e.target,i=t.options[t.selectedIndex];i&&(this.unit=i.value)},s([r.aliasOf("viewModel.view")],t.prototype,"view",void 0),s([r.aliasOf("viewModel.visible"),u.renderable()],t.prototype,"visible",void 0),s([r.property({type:l}),u.renderable(["viewModel.state","viewModel.unitOptions","viewModel.unit","viewModel.measurement"])],t.prototype,"viewModel",void 0),s([r.aliasOf("viewModel.unitOptions")],t.prototype,"unitOptions",void 0),s([r.aliasOf("viewModel.unit")],t.prototype,"unit",void 0),s([r.aliasOf("viewModel.clearMeasurement")],t.prototype,"clearMeasurement",null),s([u.accessibleHandler()],t.prototype,"_newMeasurement",null),s([u.accessibleHandler()],t.prototype,"_changeUnit",null),t=s([r.subclass("esri.widgets.DirectLineMeasurement3D")],t)}(r.declared(a))});