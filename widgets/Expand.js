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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!../nls/common","../core/accessorSupport/decorators","./Widget","./Expand/ExpandViewModel","./support/widget"],function(e,n,o,t,a,i,s,r,d){var p={base:"esri-expand esri-widget",modeAuto:"esri-expand--auto",modeDrawer:"esri-expand--drawer",modeFloating:"esri-expand--floating",container:"esri-expand__container",containerExpanded:"esri-expand__container--expanded",panel:"esri-expand__panel",button:"esri-widget--button",text:"esri-icon-font-fallback-text",icon:"esri-collapse__icon",iconExpanded:"esri-expand__icon--expanded",iconNumber:"esri-expand__icon-number",iconNumberExpanded:"esri-expand__icon-number--expanded",expandIcon:"esri-icon-expand",collapseIcon:"esri-icon-collapse",content:"esri-expand__content",contentExpanded:"esri-expand__content--expanded",expandMask:"esri-expand__mask",expandMaskExpanded:"esri-expand__mask--expanded"};return function(e){function n(n){var o=e.call(this)||this;return o.autoCollapse=null,o.collapseTooltip="",o.content="",o.expanded=null,o.expandTooltip="",o.group=null,o.iconNumber=0,o.mode="auto",o.view=null,o.viewModel=new r,o}return o(n,e),Object.defineProperty(n.prototype,"collapseIconClass",{get:function(){return p.collapseIcon},set:function(e){if(!e)return void this._clearOverride("collapseIconClass");this._override("collapseIconClass",e)},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"expandIconClass",{get:function(){return d.isWidget(this.content)?this.content.iconClass:p.expandIcon},set:function(e){if(!e)return void this._clearOverride("expandIconClass");this._override("expandIconClass",e)},enumerable:!0,configurable:!0}),n.prototype.expand=function(){this.viewModel.expanded=!0},n.prototype.collapse=function(){this.viewModel.expanded=!1},n.prototype.toggle=function(){this.viewModel.expanded=!this.viewModel.expanded},n.prototype.render=function(){var e,n,o,t,i,s=this.viewModel.expanded,r=this.mode,l=this.expandTooltip||a.expand,c=this.collapseTooltip||a.collapse,x=s?c:l,u=this.collapseIconClass,v=this.expandIconClass,b=(e={},e[p.iconExpanded]=s,e[u]=s,e[v]=!s,e),h=(n={},n[p.containerExpanded]=s,n),_=(o={},o[p.contentExpanded]=s,o),y=(t={},t[p.expandMaskExpanded]=s,t),g=this.iconNumber,f=g&&!s?d.tsx("span",{key:"expand__icon-number",class:p.iconNumber},g):null,m=g&&s?d.tsx("span",{key:"expand__expand-icon-number",class:this.classes(p.iconNumber,p.iconNumberExpanded)},g):null,w=(i={},i[p.modeAuto]="auto"===r,i[p.modeDrawer]="drawer"===r,i[p.modeFloating]="floating"===r,i);return d.tsx("div",{class:this.classes(p.base,w)},d.tsx("div",{bind:this,onclick:this._toggle,class:this.classes(p.expandMask,y)}),d.tsx("div",{class:this.classes(p.container,h)},d.tsx("div",{class:p.panel},d.tsx("div",{bind:this,onclick:this._toggle,onkeydown:this._toggle,"aria-label":x,title:x,role:"button",tabindex:"0",class:p.button},f,d.tsx("span",{"aria-hidden":"true",class:this.classes(p.icon,b)}),d.tsx("span",{class:p.text},x)),m),d.tsx("div",{class:this.classes(p.content,_),bind:this},this._renderContent())))},n.prototype._toggle=function(){this.toggle()},n.prototype._renderContent=function(){var e=this.content;return"string"==typeof e?d.tsx("div",{innerHTML:e}):d.isWidget(e)?e.render():e instanceof HTMLElement?d.tsx("div",{bind:e,afterCreate:this._attachToNode}):d.isWidgetBase(e)?d.tsx("div",{bind:e.domNode,afterCreate:this._attachToNode}):null},n.prototype._attachToNode=function(e){var n=this;e.appendChild(n)},t([i.aliasOf("viewModel.autoCollapse")],n.prototype,"autoCollapse",void 0),t([i.property({dependsOn:["content"]}),d.renderable()],n.prototype,"collapseIconClass",null),t([i.property(),d.renderable()],n.prototype,"collapseTooltip",void 0),t([i.property(),d.renderable()],n.prototype,"content",void 0),t([i.aliasOf("viewModel.expanded"),d.renderable()],n.prototype,"expanded",void 0),t([i.property({dependsOn:["content"]}),d.renderable()],n.prototype,"expandIconClass",null),t([i.property(),d.renderable()],n.prototype,"expandTooltip",void 0),t([i.aliasOf("viewModel.group")],n.prototype,"group",void 0),t([i.property(),d.renderable()],n.prototype,"iconNumber",void 0),t([i.property(),d.renderable()],n.prototype,"mode",void 0),t([i.aliasOf("viewModel.view"),d.renderable()],n.prototype,"view",void 0),t([i.property({type:r}),d.renderable("viewModel.state")],n.prototype,"viewModel",void 0),t([d.accessibleHandler()],n.prototype,"_toggle",null),n=t([i.subclass("esri.widgets.Expand")],n)}(i.declared(s))});