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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../support/Evented","../../../support/buffer/BufferView","../gl-matrix","../../../../webgl/Util"],function(t,e,i,n,r,o,a){Object.defineProperty(e,"__esModule",{value:!0});var s,c=a.assert;!function(t){t[t.ALLOCATED=1]="ALLOCATED",t[t.ACTIVE=2]="ACTIVE",t[t.VISIBLE=4]="VISIBLE",t[t.HIGHLIGHT=8]="HIGHLIGHT",t[t.HIGHLIGHT_ACTIVE=16]="HIGHLIGHT_ACTIVE",t[t.REMOVE=32]="REMOVE",t[t.TRANSFORM_CHANGED=64]="TRANSFORM_CHANGED"}(s=e.StateFlags||(e.StateFlags={}));var f=function(){function t(t,e,i){var n=0;this.modelOrigin=new r.BufferViewVec3f64(t,n,i),n+=24,this.model=new r.BufferViewMat3f(t,n,i),n+=36,this.modelNormal=new r.BufferViewMat3f(t,n,i),n+=36,this.modelScaleFactor=new r.BufferViewFloat(t,n,i),n+=4,this.boundingSphere=new r.BufferViewVec4f(t,n,i),n+=16,e.indexOf("color")>=0&&(this.color=new r.BufferViewVec4f(t,n,i),n+=16),e.indexOf("featureAttribute")>=0&&(this.featureAttribute=new r.BufferViewVec4f(t,n,i),n+=16),this.state=new r.BufferViewUint8(t,n,i),n+=1,this.lodLevel=new r.BufferViewUint8(t,n,i)}return t}();e.View=f;var u=function(t){function e(i){var n=t.call(this)||this;return n._capacity=0,n._size=0,n._next=0,n._optionalFields=i,n._elementSize=e.BASE_ELEMENT_SIZE,n._optionalFields.indexOf("color")>=0&&(n._elementSize+=16),n._optionalFields.indexOf("featureAttribute")>=0&&(n._elementSize+=16),n}return i(e,t),Object.defineProperty(e.prototype,"elementSize",{get:function(){return this._elementSize},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"capacity",{get:function(){return this._capacity},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"buffer",{get:function(){return this._buffer},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"view",{get:function(){return this._view},enumerable:!0,configurable:!0}),e.prototype.addInstance=function(){this._size+1>this._capacity&&this.grow();var t=this.findSlot();return this._view.state.set(t,s.ALLOCATED),this._size++,this.emit("instance-added",{index:t}),t},e.prototype.removeInstance=function(t){var e=this._view.state;c(t>=0&&t<this._capacity&&e.get(t)&s.ALLOCATED,"invalid instance handle"),this.getStateFlag(t,s.ACTIVE)?this.setStateFlags(t,s.REMOVE):this.notifyRemoved(t)},e.prototype.notifyRemoved=function(t){var e=this._view.state;c(t>=0&&t<this._capacity&&e.get(t)&s.ALLOCATED,"invalid instance handle"),e.set(t,0),this._size--,this.emit("instance-removed",{index:t})},e.prototype.setTransform=function(t,e){var i=this._view,n=p,r=g;o.vec3d.set3(e[12],e[13],e[14],n),i.modelOrigin.setVec(t,n),o.mat4d.toMat3(e,r),i.model.setMat(t,r),i.modelScaleFactor.set(t,o.mat4d.maxScale(e)),o.mat3d.inverse(r,r),o.mat3d.transpose(r,r),i.modelNormal.setMat(t,r),this.setStateFlags(t,s.TRANSFORM_CHANGED),this.emit("instance-transform-changed",{index:t})},e.prototype.getTransform=function(t,e){var i=this._view;i.model.getMat(t,g),i.modelOrigin.getVec(t,p),e[0]=g[0],e[1]=g[1],e[2]=g[2],e[3]=0,e[4]=g[3],e[5]=g[4],e[6]=g[5],e[7]=0,e[8]=g[6],e[9]=g[7],e[10]=g[8],e[11]=0,e[12]=p[0],e[13]=p[1],e[14]=p[2],e[15]=0},e.prototype.setTranslation=function(t,e){this._view.modelOrigin.setVec(t,e),this.emit("instance-transform-changed",{index:t})},e.prototype.getTranslation=function(t,e){this._view.modelOrigin.getVec(t,e)},e.prototype.getModel=function(t,e){this._view.model.getMat(t,e)},e.prototype.getScaleFactor=function(t){return this._view.modelScaleFactor.get(t)},e.prototype.setFeatureAttribute=function(t,e){this._view.featureAttribute.setVec(t,e)},e.prototype.setColor=function(t,e){this._view.color.setVec(t,e)},e.prototype.getColor=function(t,e){this._view.color.getVec(t,e)},e.prototype.getFeatureAttribute=function(t,e){this._view.featureAttribute.getVec(t,e)},e.prototype.setVisible=function(t,e){e!==this.getVisible(t)&&(this.setStateFlag(t,s.VISIBLE,e),this.emit("instance-visibility-changed",{index:t}))},e.prototype.getVisible=function(t){return this.getStateFlag(t,s.VISIBLE)},e.prototype.setHighlight=function(t,e){e!==this.getHighlight(t)&&(this.setStateFlag(t,s.HIGHLIGHT,e),this.emit("instance-highlight-changed",{index:t}))},e.prototype.getHighlight=function(t){return this.getStateFlag(t,s.HIGHLIGHT)},e.prototype.getState=function(t){return this._view.state.get(t)},e.prototype.getLodLevel=function(t){return this._view.lodLevel.get(t)},e.prototype.countFlags=function(t){for(var e=0,i=0;i<this._capacity;++i){this.getState(i)&t&&++e}return e},e.prototype.setStateFlags=function(t,e){var i=this._view.state;e=i.get(t)|e,i.set(t,e)},e.prototype.clearStateFlags=function(t,e){var i=this._view.state;e=i.get(t)&~e,i.set(t,e)},e.prototype.setStateFlag=function(t,e,i){i?this.setStateFlags(t,e):this.clearStateFlags(t,e)},e.prototype.getStateFlag=function(t,e){return!!(this._view.state.get(t)&e)},e.prototype.grow=function(){var t=Math.max(l,Math.floor(this._capacity*h)),e=new ArrayBuffer(t*this.elementSize);if(this._buffer){var i=new Uint8Array(this._buffer);new Uint8Array(e).set(i)}this._capacity=t,this._buffer=e,this._view=new f(this._buffer,this._optionalFields,this.elementSize)},e.prototype.findSlot=function(){for(var t=this._view.state,e=this._next;t.get(e)&s.ALLOCATED;)e=(e+1)%this._capacity;return this._next=(e+1)%this._capacity,e},e.BASE_ELEMENT_SIZE=120,e}(n.Evented);e.InstanceData=u;var l=1024,h=2,p=o.vec3d.create(),g=o.mat3d.create()});