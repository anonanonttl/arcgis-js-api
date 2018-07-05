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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Handles","../../../core/watchUtils","../../../core/accessorSupport/decorators","./handlers/DoubleClickZoom","./handlers/DragRotate","./handlers/DragZoom","./handlers/KeyPan","./handlers/MouseWheelZoom","./handlers/PinchAndPanNavigation","./handlers/PointerDownCancelAnimation","./handlers/SingleKeyResetHeading","./handlers/SingleKeyResetTilt","./handlers/TwoFingerTilt","../../input/BrowserEventSource","../../input/InputManager","../../input/ViewEvents","../../input/handlers/PreventContextMenu"],function(e,t,n,r,o,a,i,s,p,d,c,l,u,h,g,y,m,w,_,v,D,f){var A=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new a,t}return n(t,e),t.prototype.initialize=function(){var e=this;this.viewEvents=new D.ViewEvents(this.view),this._handles.add([i.whenNot(this.view,"ready",function(){return e._disconnect()}),i.when(this.view,"ready",function(){return e._connect()})])},t.prototype.destroy=function(){this._handles&&(this._handles.removeAll(),this._handles=null),this._disconnect()},Object.defineProperty(t.prototype,"primaryDragAction",{get:function(){return this._get("primaryDragAction")},set:function(e){"pan"!==e&&"rotate"!==e||e===this._get("primaryDragAction")||(this._set("primaryDragAction",e),this._updateMode())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mode",{get:function(){return this._get("mode")},set:function(e){"default"!==e&&"pro"!==e||e===this._get("mode")||(this._set("mode",e),this._updateMode())},enumerable:!0,configurable:!0}),t.prototype._disconnect=function(){this.viewEvents.disconnect(),this._source&&(this._source.destroy(),this._source=null),this._inputManager&&(this._inputManager.destroy(),this._inputManager=null)},t.prototype._connect=function(){var e=this.view;this._source=new _.BrowserEventSource(this.view.surface);var t=new v.InputManager(this._source);this._inputManager=t,t.installHandlers("prevent-context-menu",[new f.PreventContextMenu]),this._modeDragPan=new h.PinchAndPanNavigation(e,"primary"),this._modeDragRotate=new d.DragRotate(e,"secondary","center"),this._modeDragZoom=new c.DragZoom(e,"tertiary");var n={lookAround:"b",pan:{left:"ArrowLeft",right:"ArrowRight",forward:"ArrowUp",backward:"ArrowDown",up:"u",down:"j"},resetHeading:"n",resetTilt:"p"};t.installHandlers("navigation",[new g.PointerDownCancelAnimation(e),new p.DoubleClickZoom(e),new l.KeyPan(e,n.pan),new u.MouseWheelZoom(e),new m.SingleKeyResetTilt(e,n.resetTilt),new y.SingleKeyResetHeading(e,n.resetHeading),new d.DragRotate(e,"primary","eye",[n.lookAround]),new d.DragRotate(e,"secondary","center",[n.lookAround]),new h.PinchAndPanNavigation(e,"tertiary",[n.lookAround]),this._modeDragRotate,this._modeDragZoom,this._modeDragPan,new w.TwoFingerTilt(e)]),this.viewEvents.connect(t),this._updateMode()},t.prototype._updateMode=function(){var e=this.mode,t=this.primaryDragAction,n=M.get(e).get(t);this._modeDragPan&&(this._modeDragPan.pointerAction=n.pan),this._modeDragRotate&&(this._modeDragRotate.pointerAction=n.rotate),this._modeDragZoom&&(this._modeDragZoom.pointerAction=n.zoom)},r([s.property()],t.prototype,"view",void 0),r([s.property({value:"pan"})],t.prototype,"primaryDragAction",null),r([s.property({value:"default"})],t.prototype,"mode",null),r([s.property({readOnly:!0,aliasOf:"_inputManager.latestPointerType"})],t.prototype,"latestPointerType",void 0),r([s.property()],t.prototype,"_inputManager",void 0),t=r([s.subclass("esri.views.3d.input.SceneInputManager")],t)}(s.declared(o)),M=new Map,P=new Map,R=new Map;return P.set("pan",{pan:"primary",rotate:"secondary",zoom:"tertiary"}),P.set("rotate",{pan:"secondary",rotate:"primary",zoom:"tertiary"}),R.set("pan",{pan:"primary",rotate:"tertiary",zoom:"secondary"}),R.set("rotate",{pan:"tertiary",rotate:"primary",zoom:"secondary"}),M.set("default",P),M.set("pro",R),A});