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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/text!./ColorMaterial.xml","../lib/DefaultVertexBufferLayouts","../lib/GLMaterial","../lib/Material","../lib/RenderSlot","../lib/ShaderVariations","../lib/Util","./internal/MaterialUtil","../../../webgl/Util"],function(t,r,e,o,a,n,i,s,l,p,u,f){var g=a.Pos3Col,c=f.getStride(g)/4,m={color:[1,1,1,1],transparent:!1,vertexColors:!1,polygonOffset:!1},d=function(t){function r(r,e){var o=t.call(this,e)||this;return o.supportsEdges=!0,o.params=u.copyParameters(r,m),o}return e(r,t),r.prototype.getParams=function(){return this.params},r.prototype.getParameterValues=function(){return u.copyParameters(this.params)},r.prototype.setColor=function(t){this.params.color=t,this.notifyDirty("matChanged")},r.prototype.getColor=function(){return this.params.color},r.prototype.setTransparent=function(t){this.params.transparent=t,this.notifyDirty("matChanged")},r.prototype.getTransparent=function(){return this.params.transparent},r.prototype.getOutputAmount=function(t){return t*c*1},r.prototype.getVertexBufferLayout=function(){return g},r.prototype.getInstanceBufferLayout=function(){},r.prototype.fillInterleaved=function(t,r,e,o,a,n,i){u.fillInterleaved(t,r,e,o,g,a,n,i)},r.prototype.intersect=function(t,r,e,o,a,n,i,s){u.intersectTriangleGeometry(t,r,e,o,a,n,i)},r.prototype.getGLMaterials=function(){return{color:h,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:y}},r.prototype.getAllTextureIds=function(){return[]},r.loadShaders=function(t,r,e){t._parse(o);var a=new l("colorMaterial",["vertexShaderColorMaterial","fragmentShaderColorMaterial"],null,r,t,e);a.addDefine("Color","VERTEXCOLORS"),r.addShaderVariations("colorMaterial",a)},r}(i),h=function(t){function r(r,e,o){var a=t.call(this,r,e)||this;return a.updateParameters(),a}return e(r,t),r.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},r.prototype.selectProgram=function(){this.program=this.programRep.getShaderVariationsProgram("colorMaterial",[this.params.vertexColors])},r.prototype.beginSlot=function(t){return t===(this.params.color[3]<1?s.TRANSPARENT_MATERIAL:s.OPAQUE_MATERIAL)},r.prototype.getProgram=function(){return this.program},r.prototype.bind=function(t,r){var e=this.program,o=this.params;t.bindProgram(e),e.setUniform4fv("eColor",o.color),t.setFaceCullingEnabled(!1),o.polygonOffset&&(t.setPolygonOffsetFillEnabled(!0),t.setPolygonOffset(1,1)),o.transparent&&(t.setBlendingEnabled(!0),t.setBlendFunctionSeparate(t.gl.SRC_ALPHA,t.gl.ONE_MINUS_SRC_ALPHA,t.gl.ONE,t.gl.ONE_MINUS_SRC_ALPHA)),t.setDepthTestEnabled(!0)},r.prototype.release=function(t){var r=this.params;t.setPolygonOffsetFillEnabled(!1),r.transparent&&t.setBlendingEnabled(!1)},r.prototype.bindView=function(t,r){u.bindView(r.origin,r.view,this.program)},r.prototype.bindInstance=function(t,r){this.program.setUniformMatrix4fv("model",r.transformation)},r.prototype.getDrawMode=function(t){var r=t.gl;return r.TRIANGLES},r}(n),y=function(t){function r(r,e,o){var a=t.call(this,r,e)||this;return a.updateParameters(),a}return e(r,t),r.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},r.prototype.selectProgram=function(){this.program=this.programRep.getShaderVariationsProgram("colorMaterial",[this.params.vertexColors])},r.prototype.beginSlot=function(t){return t===s.OPAQUE_MATERIAL},r.prototype.getProgram=function(){return this.program},r.prototype.bind=function(t,r){var e=this.program,o=this.params;t.bindProgram(e),e.setUniform4fv("eColor",o.color),t.setFaceCullingEnabled(!1),o.polygonOffset&&(t.setPolygonOffsetFillEnabled(!0),t.setPolygonOffset(1,1))},r.prototype.release=function(t){t.setPolygonOffsetFillEnabled(!1)},r.prototype.bindView=function(t,r){u.bindView(r.origin,r.view,this.program)},r.prototype.bindInstance=function(t,r){this.program.setUniformMatrix4fv("model",r.transformation)},r.prototype.getDrawMode=function(t){var r=t.gl;return r.TRIANGLES},r}(n);return d});