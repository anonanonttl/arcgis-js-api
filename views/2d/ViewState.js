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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../Viewpoint","../../core/JSONSupport","../../core/accessorSupport/decorators","../../geometry/Extent","./viewpointUtils","./libs/gl-matrix/mat2d","./libs/gl-matrix/vec2"],function(e,t,r,n,o,i,p,s,a,l,u){var y=[0,0];return function(e){function t(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var n=e.apply(this,t)||this;return n.pixelRatio=1,n.size=[0,0],n}r(t,e),i=t,Object.defineProperty(t.prototype,"center",{get:function(){var e=this.viewpoint.targetGeometry;return u.set(u.create(),e.x,e.y)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"extent",{get:function(){return a.getExtent(new s,this.viewpoint,this.size)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"height",{get:function(){return this.size?this.size[1]:0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"id",{get:function(){return this._get("id")+1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"inverseTransform",{get:function(){return l.invert(l.create(),this.transform)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"latitude",{get:function(){return this.viewpoint.targetGeometry.latitude},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"longitude",{get:function(){return this.viewpoint.targetGeometry.longitude},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"resolution",{get:function(){return a.getResolution(this.viewpoint)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rotation",{get:function(){return this.viewpoint.rotation},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scale",{get:function(){return this.viewpoint.scale},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"screenCenter",{get:function(){return u.scale(u.create(),this.size,.5)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"spatialReference",{get:function(){return this.viewpoint.targetGeometry.spatialReference},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transform",{get:function(){return a.getTransform(l.create(),this.viewpoint,this.size,this.pixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"transformNoRotation",{get:function(){return a.getTransformNoRotation(l.create(),this.viewpoint,this.size,this.pixelRatio)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"clippedExtent",{get:function(){return a.getClippedExtent(new s,this.viewpoint,this.size)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"width",{get:function(){return this.size?this.size[0]:0},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"worldScreenWidth",{get:function(){return a.getWorldScreenWidth(this.spatialReference,this.resolution)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"worldWidth",{get:function(){return a.getWorldWidth(this.spatialReference)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"wrappable",{get:function(){return!!this.spatialReference&&this.spatialReference.isWrappable},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this.center[0]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this.center[1]},enumerable:!0,configurable:!0}),t.prototype.copy=function(e){return this.viewpoint&&this.size?(this._set("viewpoint",a.copy(this.viewpoint,e.viewpoint)),this._set("size",u.copy(this.size,e.size))):(this.viewpoint=e.viewpoint.clone(),u.copy(this.size,e.size)),this._set("pixelRatio",e.pixelRatio),this},t.prototype.clone=function(){return new i({viewpoint:this.viewpoint.clone(),size:u.clone(this.size)})},t.prototype.toMap=function(e,t,r){return Array.isArray(t)?u.transformMat2d(e,t,this.inverseTransform):(y[0]=t,y[1]=r,u.transformMat2d(e,y,this.inverseTransform))},t.prototype.toScreen=function(e,t,r){return Array.isArray(t)?u.transformMat2d(e,t,this.transform):(y[0]=t,y[1]=r,u.transformMat2d(e,y,this.transform))},t.prototype.toScreenNoRotation=function(e,t,r){return Array.isArray(t)?u.transformMat2d(e,t,this.transformNoRotation):(y[0]=t,y[1]=r,u.transformMat2d(e,y,this.transformNoRotation))},t.prototype.pixelSizeAt=function(e){var t=this.viewpoint;return a.pixelSizeAt(e,t,this.size)};var i;return n([p.property({dependsOn:["viewpoint"]})],t.prototype,"center",null),n([p.property({readOnly:!0,dependsOn:["viewpoint","size"]})],t.prototype,"extent",null),n([p.property({readOnly:!0,dependsOn:["size"]})],t.prototype,"height",null),n([p.property({value:0,readOnly:!0,dependsOn:["transform"]})],t.prototype,"id",null),n([p.property({readOnly:!0,dependsOn:["transform"]})],t.prototype,"inverseTransform",null),n([p.property({readOnly:!0,dependsOn:["viewpoint"]})],t.prototype,"latitude",null),n([p.property({readOnly:!0,dependsOn:["viewpoint"]})],t.prototype,"longitude",null),n([p.property({type:Number,json:{write:!0}})],t.prototype,"pixelRatio",void 0),n([p.property({readOnly:!0,dependsOn:["viewpoint"]})],t.prototype,"resolution",null),n([p.property({readOnly:!0,dependsOn:["viewpoint"]})],t.prototype,"rotation",null),n([p.property({readOnly:!0,dependsOn:["viewpoint"]})],t.prototype,"scale",null),n([p.property({readOnly:!0,dependsOn:["size"]})],t.prototype,"screenCenter",null),n([p.property({json:{write:!0}})],t.prototype,"size",void 0),n([p.property({readOnly:!0,dependsOn:["viewpoint"]})],t.prototype,"spatialReference",null),n([p.property({readOnly:!0,dependsOn:["viewpoint","size","pixelRatio"]})],t.prototype,"transform",null),n([p.property({readOnly:!0,dependsOn:["viewpoint","size","pixelRatio"]})],t.prototype,"transformNoRotation",null),n([p.property({type:o,json:{write:!0}})],t.prototype,"viewpoint",void 0),n([p.property({readOnly:!0,dependsOn:["viewpoint","size"]})],t.prototype,"clippedExtent",null),n([p.property({readOnly:!0,dependsOn:["size"]})],t.prototype,"width",null),n([p.property({readOnly:!0,dependsOn:["worldWidth","resolution"]})],t.prototype,"worldScreenWidth",null),n([p.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"worldWidth",null),n([p.property({readOnly:!0,dependsOn:["spatialReference"]})],t.prototype,"wrappable",null),n([p.property({readOnly:!0,dependsOn:["center"]})],t.prototype,"x",null),n([p.property({readOnly:!0,dependsOn:["center"]})],t.prototype,"y",null),t=i=n([p.subclass("esri.views.2d.ViewState")],t)}(p.declared(i))});