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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/text!./LineCalloutMaterial.xml","../lib/GLMaterial","../lib/Material","../lib/RenderSlot","../lib/ShaderVariations","../lib/Util","./internal/MaterialUtil","../../../webgl/Util"],function(e,t,r,i,n,o,a,s,l,f,d){function p(e,t,r){3===r.length?e.setUniform4f(t,r[0],r[1],r[2],1):e.setUniform4fv(t,r)}var u=l.VertexAttrConstants,c=[{name:"position",count:3,type:5126,offset:0,stride:48,normalized:!1},{name:"normal",count:3,type:5126,offset:12,stride:48,normalized:!1},{name:"uv0",count:2,type:5126,offset:24,stride:48,normalized:!1},{name:"auxpos1",count:4,type:5126,offset:32,stride:48,normalized:!1}],h={verticalOffset:null,screenSizePerspective:null,screenOffset:[0,0],color:[0,0,0,1],size:1,borderColor:null,occlusionTest:!1,shaderPolygonOffset:1e-5,depthHUDAlignStart:!1,centerOffsetUnits:"world"},m=function(e){function t(r,i){var n=e.call(this,i)||this;return n.params=f.copyParameters(r,h),n._uniqueMaterialIdentifier=t.uniqueMaterialIdentifier(n.params),n}return r(t,e),Object.defineProperty(t.prototype,"uniqueMaterialIdentifier",{get:function(){return this._uniqueMaterialIdentifier},enumerable:!0,configurable:!0}),t.prototype.dispose=function(){},t.prototype.getGLMaterials=function(){return{color:g,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:void 0}},t.prototype.getAllTextureIds=function(){return[]},t.prototype.fillAttributeData=function(e,t,r,i,n,o){var a=e.indices[t],s=e.vertexAttr[t].data;if(a&&s)for(var l=r+d.findAttribute(c,t).offset/4,p=0;p<a.length;p++)for(var u=i*a[p],h=0;h<6;h++)f.fill(s,u,o,l,n,i),l+=12},t.prototype.fillInterleaved=function(e,t,r,i,n,o,a){this.fillAttributeData(e,u.POSITION,o,3,t,n),this.fillAttributeData(e,u.NORMAL,o,3,r,n),this.fillAttributeData(e,u.AUXPOS1,o,4,null,n);for(var s=o+d.findAttribute(c,u.UV0).offset/4,l=0,f=v;l<f.length;l++){var p=f[l];n[s+0]=p[0],n[s+1]=p[1],s+=12}},t.prototype.getOutputAmount=function(e){return 48*e*6},t.prototype.getInstanceBufferLayout=function(){},t.prototype.getVertexBufferLayout=function(){return c},t.prototype.intersect=function(e,t,r,i,n,o,a,s){},t.prototype.getParameterValues=function(){var e=this.params;return{verticalOffset:e.verticalOffset,screenSizePerspective:e.screenSizePerspective,screenOffset:e.screenOffset,centerOffsetUnits:e.centerOffsetUnits,color:[e.color[0],e.color[1],e.color[2],e.color[3]],size:e.size,borderColor:e.borderColor,occlusionTest:e.occlusionTest,shaderPolygonOffset:e.shaderPolygonOffset,depthHUDAlignStart:e.depthHUDAlignStart}},t.prototype.setParameterValues=function(e){f.updateParameters(this.params,e)&&(this._uniqueMaterialIdentifier=t.uniqueMaterialIdentifier(this.params),this.notifyDirty("matChanged"))},t.uniqueMaterialIdentifier=function(e){return JSON.stringify({screenOffset:e.screenOffset||[0,0],centerOffsetUnits:e.centerOffsetUnits||"world"})},t.loadShaders=function(e,t,r){e._parse(i);var n=new s("lineCallout",["vertexShaderLineCallout","fragmentShaderLineCallout"],null,t,e,r);n.addDefine("occlTest","OCCL_TEST"),n.addDefine("verticalOffset","VERTICAL_OFFSET"),n.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),n.addDefine("depthHud","DEPTH_HUD"),n.addDefine("depthHudAlignStart","DEPTH_HUD_ALIGN_START"),n.addDefine("centerOffsetUnitsScreen","CENTER_OFFSET_UNITS_SCREEN"),t.addShaderVariations("line-callout-material-shader-variations",n)},t}(o),g=function(e){function t(t,r,i){var n=e.call(this,t,r)||this;return n.isRenderSlot=!0,n.updateParameters(),n}return r(t,e),t.prototype.updateParameters=function(){this.params=this.material.getParameterValues(),this.selectProgram()},t.prototype.selectProgram=function(){var e=this.params;this.renderProgram=this.programRep.getShaderVariationsProgram("line-callout-material-shader-variations",[!!e.occlusionTest,!!e.verticalOffset,!!e.screenSizePerspective,!1,!!e.depthHUDAlignStart,"screen"===e.centerOffsetUnits]),this.depthProgram=this.programRep.getShaderVariationsProgram("line-callout-material-shader-variations",[!!e.occlusionTest,!!e.verticalOffset,!!e.screenSizePerspective,!0,!!e.depthHUDAlignStart,"screen"===e.centerOffsetUnits])},t.prototype.beginSlot=function(e){switch(e){case a.LINE_CALLOUTS:return this.isRenderSlot=!0,!0;case a.LINE_CALLOUTS_HUD_DEPTH:return this.isRenderSlot=!1,!0}return!1},Object.defineProperty(t.prototype,"program",{get:function(){return this.isRenderSlot?this.renderProgram:this.depthProgram},enumerable:!0,configurable:!0}),t.prototype.getProgram=function(){return this.program},t.prototype.getPrograms=function(){return[this.renderProgram,this.depthProgram]},t.prototype.getDrawMode=function(e){return e.gl.TRIANGLES},t.prototype.bind=function(e,t){var r=t.cameraAboveGround?1:-1,i=this.program,n=this.params;e.bindProgram(i),i.setUniform1f("cameraGroundRelative",r),i.setUniform1f("polygonOffset",n.shaderPolygonOffset),i.setUniform4fv("viewport",t.viewport),i.setUniformMatrix4fv("viewNormal",t.viewInvTransp),i.setUniform1i("hudVisibilityTexture",0),e.bindTexture(t.hudVisibilityTexture,0),p(i,"color",n.color),i.setUniform2f("screenOffset",n.screenOffset[0],n.screenOffset[1]),this.bindBorder(e,t),f.bindVerticalOffset(n.verticalOffset,t,i),this.bindSizing(e,t),f.bindScreenSizePerspective(n.screenSizePerspective,i),this.isRenderSlot?this.bindRender(e,t):this.bindHUDDepth(e,t)},t.prototype.bindRender=function(e,t){e.setBlendFunctionSeparate(1,771,770,771),e.setBlendingEnabled(!0),e.setDepthWriteEnabled(!1)},t.prototype.bindHUDDepth=function(e,t){e.setColorMask(!1,!1,!1,!1),e.setDepthWriteEnabled(!0),e.setBlendingEnabled(!1),e.setDepthTestEnabled(!0)},t.prototype.bindView=function(e,t){var r=this.program;f.bindView(t.origin,t.view,r),f.bindCamPos(t.origin,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.release=function(e,t){this.isRenderSlot?this.releaseRender(e,t):this.releaseHUDDepth(e,t)},t.prototype.releaseRender=function(e,t){e.setBlendingEnabled(!1),e.setBlendFunction(770,771),e.setDepthWriteEnabled(!0)},t.prototype.releaseHUDDepth=function(e,t){e.setColorMask(!0,!0,!0,!0)},t.prototype.bindSizing=function(e,t){var r=this.program,i=this.params;r.setUniform2f("pixelToNDC",2/t.viewport[2],2/t.viewport[3]),r.setUniform1f("lineSize",Math.ceil(i.size))},t.prototype.bindBorder=function(e,t){var r=this.program,i=this.params;null!==i.borderColor?(p(r,"borderColor",i.borderColor),r.setUniform1f("borderSize",1)):(r.setUniform4f("borderColor",0,0,0,0),r.setUniform1f("borderSize",0))},t}(n),v=[[0,0],[1,0],[0,1],[1,0],[1,1],[0,1]];return m});