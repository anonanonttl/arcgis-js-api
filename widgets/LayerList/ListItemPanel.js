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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/Handles","../../core/Identifiable","../../core/requireUtils","../../core/watchUtils","../../core/accessorSupport/decorators","../../widgets/Widget","../support/widget"],function(e,t,n,r,i,o,s,l,a,d,c){var p={base:"esri-layer-list-panel",content:"esri-layer-list-panel__content",contentLegend:"esri-layer-list-panel__content--legend",contentString:"esri-layer-list-panel__content--string",contentElement:"esri-layer-list-panel__content--html-element",contentWidget:"esri-layer-list-panel__content--widget"};return function(t){function o(e){var n=t.call(this)||this;return n._legend=null,n._handles=new i,n.content=null,n.image=null,n.listItem=null,n.open=!1,n.visible=!0,n}return n(o,t),o.prototype.postInitialize=function(){var e=this;this.own([l.init(this,"content",function(t){return e._createLegend(t)})])},o.prototype.destroy=function(){var e=this._legend;e&&e.destroy(),this._legend=null},Object.defineProperty(o.prototype,"className",{get:function(){var e=this.image,t=this._getFirstWidget();return this._get("className")||!e&&t?t.iconClass:""},set:function(e){if(void 0===e)return void this._clearOverride("className");this._override("className",e)},enumerable:!0,configurable:!0}),Object.defineProperty(o.prototype,"title",{get:function(){var e=this._getFirstWidget();return this._get("title")||e?e.label:""},set:function(e){if(void 0===e)return void this._clearOverride("title");this._override("title",e)},enumerable:!0,configurable:!0}),o.prototype.render=function(){return c.tsx("div",{class:p.base},this._renderContents())},o.prototype._renderContent=function(e,t){var n=this,r=n._legend,i=n.listItem;return e?"legend"===e&&i&&i.view&&i.layer?c.tsx("div",{class:this.classes(p.content,p.contentLegend),key:e},r&&r.render()):"string"==typeof e?c.tsx("div",{class:this.classes(p.content,p.contentString),key:e,innerHTML:e}):c.isWidget(e)?c.tsx("div",{class:this.classes(p.content,p.contentWidget),key:e},e.render()):e instanceof HTMLElement?c.tsx("div",{class:this.classes(p.content,p.contentElement),key:e,bind:e,afterCreate:this._attachToNode}):null:null},o.prototype._renderContents=function(){var e=this,t=this.content;return Array.isArray(t)?t.map(function(t,n){return e._renderContent(t,n)}):this._renderContent(t,0)},o.prototype._getLegendOptions=function(e){if(e){var t=e.layer,n=e.view;if(t&&n)return{view:n,layerInfos:[{layer:t,title:""}]}}},o.prototype._createLegend=function(t){var n=this;this._hasLegend(t)&&!this._legend&&s.when(e,"../Legend").then(function(e){var t=n,r=t._handles,i=t.listItem,o=new e(n._getLegendOptions(i));n._legend=o,n.notifyChange("className"),n.notifyChange("title");var s=l.init(n,["listItem.view","listItem.layer"],function(){return n._updateLegend(o)});r.add(s,"legends"),n.scheduleRender()})},o.prototype._hasLegend=function(e){return"legend"===e||!!Array.isArray(e)&&e.some(function(e){return"legend"===e})},o.prototype._attachToNode=function(e){e.appendChild(this)},o.prototype._updateLegend=function(e){var t=this.listItem;if(t){var n=t.layer,r=t.view;e.view=r,e.layerInfos=[{layer:n,title:null}]}},o.prototype._getWidget=function(e){return"legend"===e?this._legend:c.isWidget(e)?e:null},o.prototype._getFirstWidget=function(){var e=this,t=this.content;if(Array.isArray(t)){var n=null;return t.some(function(t){var r=e._getWidget(t);return r&&(n=r),!!r}),n}return this._getWidget(t)},r([a.property({dependsOn:["content","image"]})],o.prototype,"className",null),r([a.property(),c.renderable()],o.prototype,"content",void 0),r([a.property()],o.prototype,"image",void 0),r([a.property()],o.prototype,"listItem",void 0),r([a.property({dependsOn:["content"]})],o.prototype,"title",null),r([a.property(),c.renderable()],o.prototype,"open",void 0),r([a.property()],o.prototype,"visible",void 0),o=r([a.subclass("esri.widgets.LayerList.ListItemPanel")],o)}(a.declared(d,o))});