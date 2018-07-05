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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Evented","../../../../core/Handles","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","./drawUtils"],function(e,t,i,r,n,o,a,c,h,p){var s=function(){function e(e,t,i,r){this.graphic=e,this.index=t,this.screenPoint=i,this.viewEvent=r,this.type="graphic-click"}return e}(),l=function(){function e(e,t,i,r){this.graphic=e,this.index=t,this.screenPoint=i,this.viewEvent=r,this.type="graphic-double-click"}return e}(),v=function(){function e(e,t,i,r,n,o){this.graphic=e,this.index=t,this.dx=i,this.dy=r,this.screenPoint=n,this.viewEvent=o,this.defaultPrevented=!1,this.type="graphic-move-start"}return e.prototype.preventDefault=function(){this.defaultPrevented=!0},e}(),u=function(){function e(e,t,i,r,n,o){this.graphic=e,this.index=t,this.dx=i,this.dy=r,this.screenPoint=n,this.viewEvent=o,this.defaultPrevented=!1,this.type="graphic-move"}return e.prototype.preventDefault=function(){this.defaultPrevented=!0},e}(),d=function(){function e(e,t,i,r,n,o){this.graphic=e,this.index=t,this.dx=i,this.dy=r,this.screenPoint=n,this.viewEvent=o,this.defaultPrevented=!1,this.type="graphic-move-stop"}return e.prototype.preventDefault=function(){this.defaultPrevented=!0},e}(),f=function(){function e(e,t,i,r){this.graphic=e,this.index=t,this.screenPoint=i,this.viewEvent=r,this.type="graphic-pointer-over"}return e}(),g=function(){function e(e,t,i,r){this.graphic=e,this.index=t,this.screenPoint=i,this.viewEvent=r,this.type="graphic-pointer-out"}return e}();return function(e){function t(t){var i=e.call(this,t)||this;return i._activeGraphic=null,i._dragEvent=null,i._handles=new a,i._hoverGraphic=null,i._initialDragGeometry=null,i._pointerDownEvent=null,i._viewHandles=new a,i.callbacks={onGraphicClick:function(e){},onGraphicDoubleClick:function(e){},onGraphicMoveStart:function(e){},onGraphicMove:function(e){},onGraphicMoveStop:function(e){},onGraphicPointerOver:function(e){},onGraphicPointerOut:function(e){}},i.graphics=[],i.view=null,i}return i(t,e),t.prototype.initialize=function(){var e=this;this._handles.add([c.whenOnce(this,"view.ready",function(){e._viewHandles.add([e.view.on("click",function(t){return e._clickHandler(t)}),e.view.on("double-click",function(t){return e._doubleClickHandler(t)}),e.view.on("pointer-down",function(t){return e._pointerDownHandler(t)}),e.view.on("pointer-move",function(t){return e._pointerMoveHandler(t)}),e.view.on("pointer-up",function(t){return e._pointerUpHandler(t)}),e.view.on("drag",function(t){return e._dragHandler(t)}),e.view.on("key-down",function(t){return e._keyDownHandler(t)})])})])},t.prototype.destroy=function(){this.reset(),this._viewHandles.removeAll(),this._handles.removeAll()},Object.defineProperty(t.prototype,"state",{get:function(){var e=!!this.get("view.ready"),t=!!this.get("graphics.length"),i=this._activeGraphic;return e&&t?i?"moving":"active":e?"ready":"disabled"},enumerable:!0,configurable:!0}),t.prototype.reset=function(){this._activeGraphic=null,this._hoverGraphic=null,this._dragEvent=null},t.prototype.updateGeometry=function(e,t){var i=this.graphics[e];i&&i.set("geometry",t)},t.prototype._clickHandler=function(e){var t=this;this.view.hitTest(e).then(function(i){var r=i.results;if(r.length&&r[0].graphic){var n=r[0].graphic;if(t.graphics.indexOf(n)>-1){var o=new s(n,t.graphics.indexOf(n),i.screenPoint,e);t.emit("graphic-click",o),t.callbacks.onGraphicClick(o)}}})},t.prototype._doubleClickHandler=function(e){var t=this;this.view.hitTest(e).then(function(i){var r=i.results;if(r.length&&r[0].graphic){var n=r[0].graphic;if(t.graphics.indexOf(n)>-1){var o=new l(n,t.graphics.indexOf(n),i.screenPoint,e);t.emit("graphic-double-click",o),t.callbacks.onGraphicDoubleClick(o)}}})},t.prototype._pointerDownHandler=function(e){var t=this;this._pointerDownEvent=e,this.view.hitTest(e).then(function(e){var i=e.results;if(i.length&&i[0].graphic){var r=i[0].graphic;t.graphics.indexOf(r)>-1?t._activeGraphic=r:r!==t._activeGraphic&&(t._pointerDownEvent=null,t._activeGraphic=null)}else t._pointerDownEvent=null,t._activeGraphic=null})},t.prototype._pointerUpHandler=function(e){this._pointerDownEvent=null,this._dragEvent||(this._activeGraphic=null)},t.prototype._pointerMoveHandler=function(e){var t=this;this._dragEvent||this.view.hitTest(e).then(function(i){var r=i.results;if(r.length&&r[0].graphic){var n=r[0].graphic;if(n===t._hoverGraphic)return;if(t.graphics.indexOf(n)>-1){if(t._hoverGraphic){var o=t.graphics.indexOf(t._hoverGraphic),a=new g(t.graphics[o],o,i.screenPoint,e);t._hoverGraphic=null,t.emit("graphic-pointer-out",a),t.callbacks.onGraphicPointerOut(a)}var c=t.graphics.indexOf(n),h=new f(n,c,i.screenPoint,e);return t._hoverGraphic=n,t.emit("graphic-pointer-over",h),void t.callbacks.onGraphicPointerOver(h)}}if(t._hoverGraphic){var o=t.graphics.indexOf(t._hoverGraphic),h=new g(t.graphics[o],o,i.screenPoint,e);t._hoverGraphic=null,t.emit("graphic-pointer-out",h),t.callbacks.onGraphicPointerOut(h)}})},t.prototype._dragHandler=function(e){var t=this;this._pointerDownEvent&&(this._activeGraphic||this._hoverGraphic)&&e.stopPropagation(),this.view.hitTest(e).then(function(i){if(t._activeGraphic){var r=t.graphics.indexOf(t._activeGraphic),n=t._activeGraphic.geometry,o=t._dragEvent?e.x-t._dragEvent.x:0,a=t._dragEvent?e.y-t._dragEvent.y:0,c=n.clone();if(t._activeGraphic.set("geometry",p.move(c,o,a,t.view)),t._dragEvent=e,"start"===e.action){t._initialDragGeometry=n.clone();var h=new v(t._activeGraphic,r,o,a,i.screenPoint,e);t.emit("graphic-move-start",h),t.callbacks.onGraphicMoveStart(h),h.defaultPrevented&&t._activeGraphic.set("geometry",n)}else if("update"===e.action){var h=new u(t._activeGraphic,r,o,a,i.screenPoint,e);t.emit("graphic-move",h),t.callbacks.onGraphicMove&&t.callbacks.onGraphicMove(h),h.defaultPrevented&&t._activeGraphic.set("geometry",n)}else{t._activeGraphic=null,t._dragEvent=null;var h=new d(t.graphics[r],r,o,a,i.screenPoint,e);t.emit("graphic-move-stop",h),t.callbacks.onGraphicMoveStop(h),h.defaultPrevented&&t.graphics[r].set("geometry",t._initialDragGeometry),t._initialDragGeometry=null}}})},t.prototype._keyDownHandler=function(e){"a"!==e.key&&"d"!==e.key&&"n"!==e.key||"moving"!==this.state||e.stopPropagation()},r([h.property()],t.prototype,"_activeGraphic",void 0),r([h.property()],t.prototype,"callbacks",void 0),r([h.property()],t.prototype,"graphics",void 0),r([h.property({dependsOn:["view.ready","graphics.length","_activeGraphic"],readOnly:!0})],t.prototype,"state",null),r([h.property()],t.prototype,"view",void 0),t=r([h.subclass("esri.views.2d.draw.support.GraphicMover")],t)}(h.declared(n,o))});