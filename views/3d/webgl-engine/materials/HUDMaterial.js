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

define(["require","exports","../../../../core/tsSupport/extendsHelper","dojo/text!./HUDMaterial.xml","../../../../geometry/support/aaBoundingRect","../lib/ComponentUtils","../lib/gl-matrix","../lib/GLMaterialTexture","../lib/Material","../lib/RenderPass","../lib/RenderSlot","../lib/screenSizePerspectiveUtils","../lib/ShaderVariations","../lib/Util","./internal/MaterialUtil","../../../webgl/Util"],function(e,t,r,i,n,o,a,s,l,c,f,d,v,u,p,S){function m(e,t){return void 0===t&&(t=T),e.textureIsSignedDistanceField?g(e.anchorPos,e.distanceFieldBoundingBox,t):O.set(e.anchorPos,t),t}function h(e,t,r,i){return void 0===i&&(i=T),O.set(e.anchorPos,i),i[0]*=-t[0],i[1]*=-t[1],i[0]+=e.screenOffset[0]*r,i[1]+=e.screenOffset[1]*r,i}function g(e,t,r){r[0]=e[0]*(t[2]-t[0])+t[0],r[1]=e[1]*(t[3]-t[1])+t[1]}function x(e){var t=e[0],r=e[1],i=e[2],n=e[3],o=e[4],a=e[5],s=e[6],l=e[7],c=e[8],f=1/Math.sqrt(t*t+r*r+i*i),d=1/Math.sqrt(n*n+o*o+a*a),v=1/Math.sqrt(s*s+l*l+c*c);return e[0]=t*f,e[1]=r*f,e[2]=i*f,e[3]=n*d,e[4]=o*d,e[5]=a*d,e[6]=s*v,e[7]=l*v,e[8]=c*v,e}var O=a.vec2d,P=a.vec3d,A=a.mat3d,z=a.mat4d,C={"bottom-left":[0,0],bottom:[.5,0],"bottom-right":[1,0],left:[0,.5],center:[.5,.5],right:[1,.5],"top-left":[0,1],top:[.5,1],"top-right":[1,1]},y=[{name:"position",count:3,type:5126,offset:0,stride:76,normalized:!1},{name:"normal",count:3,type:5126,offset:12,stride:76,normalized:!1},{name:"uv0",count:2,type:5126,offset:24,stride:76,normalized:!1},{name:"color",count:4,type:5121,offset:32,stride:76,normalized:!1},{name:"size",count:2,type:5126,offset:36,stride:76,normalized:!1},{name:"auxpos1",count:4,type:5126,offset:44,stride:76,normalized:!1},{name:"auxpos2",count:4,type:5126,offset:60,stride:76,normalized:!1}],V={texCoordScale:[1,1],occlusionTest:!0,binaryHighlightOcclusion:!0,drawInSecondSlot:!1,color:[1,1,1,1],outlineColor:[1,1,1,1],outlineSize:0,textureIsSignedDistanceField:!1,distanceFieldBoundingBox:null,vvSizeEnabled:!1,vvSizeMinSize:[1,1,1],vvSizeMaxSize:[100,100,100],vvSizeOffset:[0,0,0],vvSizeFactor:[1,1,1],vvColorEnabled:!1,vvColorValues:[0,0,0,0,0,0,0,0],vvColorColors:[1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],screenOffset:[0,0],verticalOffset:null,screenSizePerspective:null,screenSizePerspectiveAlignment:null,anchorPos:C.center,shaderPolygonOffset:1e-5,polygonOffset:!1,textureId:null,centerOffsetUnits:"world",debugDrawBorder:!1},b=function(e){function t(t,r){var i=e.call(this,r)||this;return i._textureDirty=!1,i.params=p.copyParameters(t,V),"string"==typeof i.params.anchorPos&&(i.params.anchorPos=C[i.params.anchorPos]),i}return r(t,e),t.prototype.dispose=function(){},t.prototype.getParameterValues=function(){var e=this.params;return{color:e.color,texCoordScale:e.texCoordScale,polygonOffset:e.polygonOffset,anchorPos:e.anchorPos,screenOffset:e.screenOffset,verticalOffset:e.verticalOffset,screenSizePerspective:e.screenSizePerspective,screenSizePerspectiveAlignment:e.screenSizePerspectiveAlignment,shaderPolygonOffset:e.shaderPolygonOffset,textureIsSignedDistanceField:e.textureIsSignedDistanceField,outlineColor:e.outlineColor,outlineSize:e.outlineSize,distanceFieldBoundingBox:e.distanceFieldBoundingBox,vvSizeEnabled:e.vvSizeEnabled,vvSizeMinSize:e.vvSizeMinSize,vvSizeMaxSize:e.vvSizeMaxSize,vvSizeOffset:e.vvSizeOffset,vvSizeFactor:e.vvSizeFactor,vvColorEnabled:e.vvColorEnabled,vvColorValues:e.vvColorValues,vvColorColors:e.vvColorColors,textureId:e.textureId,occlusionTest:e.occlusionTest,binaryHighlightOcclusion:e.binaryHighlightOcclusion,centerOffsetUnits:e.centerOffsetUnits,debugDrawBorder:e.debugDrawBorder,drawInSecondSlot:e.drawInSecondSlot}},t.prototype.setParameterValues=function(e){for(var t in e)"textureId"===t&&u.assert(!!this.params.textureId,"Can only change texture of material that already has a texture"),this.params[t]=e[t];this.notifyDirty("matChanged")},t.prototype.getParams=function(){return this.params},t.prototype.getOutputAmount=function(e){return 19*e*6},t.prototype.getInstanceBufferLayout=function(){},t.prototype.getVertexBufferLayout=function(){return y},t.prototype.fillInterleaved=function(e,t,r,i,n,o){for(var a=4*o,s=e.indices[u.VertexAttrConstants.POSITION],l=e.vertexAttr[u.VertexAttrConstants.POSITION].data,c=o+S.findAttribute(y,u.VertexAttrConstants.POSITION).offset/4,f=0;f<s.length;++f){var d=3*s[f];p.fill(l,d,n,c,t,3),c+=19,p.fill(l,d,n,c,t,3),c+=19,p.fill(l,d,n,c,t,3),c+=19,p.fill(l,d,n,c,t,3),c+=19,p.fill(l,d,n,c,t,3),c+=19,p.fill(l,d,n,c,t,3),c+=19}for(var v=e.indices[u.VertexAttrConstants.NORMAL],m=e.vertexAttr[u.VertexAttrConstants.NORMAL].data,h=o+S.findAttribute(y,u.VertexAttrConstants.NORMAL).offset/4,f=0;f<v.length;++f){var d=3*v[f];p.fill(m,d,n,h,r,3),h+=19,p.fill(m,d,n,h,r,3),h+=19,p.fill(m,d,n,h,r,3),h+=19,p.fill(m,d,n,h,r,3),h+=19,p.fill(m,d,n,h,r,3),h+=19,p.fill(m,d,n,h,r,3),h+=19}var g,x,O,P,A=e.vertexAttr[u.VertexAttrConstants.UV0].data;null==A||A.length<=3?(g=0,x=0,O=this.params.texCoordScale[0],P=this.params.texCoordScale[1]):(g=e.vertexAttr[u.VertexAttrConstants.UV0].data[0],x=e.vertexAttr[u.VertexAttrConstants.UV0].data[1],O=e.vertexAttr[u.VertexAttrConstants.UV0].data[2],P=e.vertexAttr[u.VertexAttrConstants.UV0].data[3]),O=Math.min(1.99999,O+1),P=Math.min(1.99999,P+1);for(var z=o+S.findAttribute(y,u.VertexAttrConstants.UV0).offset/4,f=0;f<s.length;++f)n[z]=g,n[z+1]=x,z+=19,n[z]=O,n[z+1]=x,z+=19,n[z]=O,n[z+1]=P,z+=19,n[z]=O,n[z+1]=P,z+=19,n[z]=g,n[z+1]=P,z+=19,n[z]=g,n[z+1]=x,z+=19;for(var C=e.indices[u.VertexAttrConstants.COLOR],V=e.vertexAttr[u.VertexAttrConstants.COLOR].data,b=a+S.findAttribute(y,u.VertexAttrConstants.COLOR).offset,I=new Uint8Array(n.buffer),f=0;f<C.length;++f){var d=4*C[f];p.fillColor(V,d,I,b,4),b+=76,p.fillColor(V,d,I,b,4),b+=76,p.fillColor(V,d,I,b,4),b+=76,p.fillColor(V,d,I,b,4),b+=76,p.fillColor(V,d,I,b,4),b+=76,p.fillColor(V,d,I,b,4),b+=76}for(var E=e.indices[u.VertexAttrConstants.SIZE],U=e.vertexAttr[u.VertexAttrConstants.SIZE].data,D=o+S.findAttribute(y,u.VertexAttrConstants.SIZE).offset/4,f=0;f<E.length;++f){var T=U[2*E[f]],R=U[2*E[f]+1];n[D]=T,n[D+1]=R,D+=19,n[D]=T,n[D+1]=R,D+=19,n[D]=T,n[D+1]=R,D+=19,n[D]=T,n[D+1]=R,D+=19,n[D]=T,n[D+1]=R,D+=19,n[D]=T,n[D+1]=R,D+=19}if(null!=e.indices[u.VertexAttrConstants.AUXPOS1]&&null!=e.vertexAttr[u.VertexAttrConstants.AUXPOS1])for(var M=e.indices[u.VertexAttrConstants.AUXPOS1],F=e.vertexAttr[u.VertexAttrConstants.AUXPOS1].data,L=o+S.findAttribute(y,"auxpos1").offset/4,f=0;f<M.length;++f){var d=4*M[f];p.fill(F,d,n,L,null,4),L+=19,p.fill(F,d,n,L,null,4),L+=19,p.fill(F,d,n,L,null,4),L+=19,p.fill(F,d,n,L,null,4),L+=19,p.fill(F,d,n,L,null,4),L+=19,p.fill(F,d,n,L,null,4),L+=19}if(null!=e.indices[u.VertexAttrConstants.AUXPOS2]&&null!=e.vertexAttr[u.VertexAttrConstants.AUXPOS2])for(var w=e.indices[u.VertexAttrConstants.AUXPOS2],_=e.vertexAttr[u.VertexAttrConstants.AUXPOS2].data,N=o+S.findAttribute(y,"auxpos2").offset/4,f=0;f<w.length;++f){var d=4*w[f];p.fill(_,d,n,N,null,4),N+=19,p.fill(_,d,n,N,null,4),N+=19,p.fill(_,d,n,N,null,4),N+=19,p.fill(_,d,n,N,null,4),N+=19,p.fill(_,d,n,N,null,4),N+=19,p.fill(_,d,n,N,null,4),N+=19}},t.prototype.intersect=function(e,t,r,i,n,a,s,l){if(i.isSelection&&i.enableHUDSelection&&!o.isAllHidden(t.componentVisibilities,e.data.componentOffsets)){var c=e.getData(),f=this.params,v=1,p=1;if(z.toMat3(r,_),l){var S=l(H);v=S[0],p=S[5],x(_)}var h=c.getVertexAttr()[u.VertexAttrConstants.POSITION],g=c.getVertexAttr()[u.VertexAttrConstants.SIZE],O=c.getVertexAttr()[u.VertexAttrConstants.NORMAL];u.assert(h.size>=3);for(var A=i.point,C=i.camera,y=m(f),V=0;V<h.data.length/h.size;V++){var b=V*h.size;P.set3(h.data[b],h.data[b+1],h.data[b+2],R),z.multiplyVec3(r,R,R);var I=V*g.size;X[0]=g.data[I]*v,X[1]=g.data[I+1]*p,z.multiplyVec3(C.viewMatrix,R);var E=V*O.size;if(P.set3(O.data[E],O.data[E+1],O.data[E+2],M),this.applyVerticalOffsetTransformation(R,M,_,C,D),C.applyProjection(R,F),F[0]>-1){var U=Math.floor(F[0]),T=Math.floor(F[1]);d.applyPrecomputedScaleFactorVec2(X,D.factor,X);var L=U-G-(y[0]>0?X[0]*y[0]:0),B=L+X[0]+2*G,Z=T-G-(y[1]>0?X[1]*y[1]:0),j=Z+X[1]+2*G;if(f.textureIsSignedDistanceField){var q=f.outlineSize/2,Q=f.distanceFieldBoundingBox;L+=X[0]*Q[0],Z+=X[1]*Q[1],B-=X[0]*(1-Q[2]),j-=X[1]*(1-Q[3]),L-=q,B+=q,Z-=q,j+=q}if(A[0]>L&&A[0]<B&&A[1]>Z&&A[1]<j){var W=i.p0,Y=i.p1;z.multiplyVec3(z.inverse(C.viewMatrix,N),R,w),F[0]=A[0],F[1]=A[1],C.unprojectPoint(F,R);var k=P.negate(i.getDirection(),P.create());s(P.dist(W,R)/P.dist(W,Y),k,-1,1,!0,w)}}}}},t.prototype.normalAndViewAngle=function(e,t,r,i){return void 0===i&&(i=B),A.multiplyVec3(t,e,i.normal),z.multiplyVec3(r.viewInverseTransposeMatrix,i.normal),i.cosAngle=P.dot(L,Z),i},t.prototype.updateScaleInfo=function(e,t,r){var i=this.params;i.screenSizePerspective?e.factor=d.precomputeScaleFactor(B.cosAngle,r,i.screenSizePerspective,e.factor):(e.factor.scale=1,e.factor.factor=0,e.factor.minPixelSize=0,e.factor.paddingPixels=0),i.screenSizePerspectiveAlignment?(e.scaleAlignment=d.precomputeScale(B.cosAngle,r,i.screenSizePerspectiveAlignment),e.minPixelSizeAlignment=i.screenSizePerspectiveAlignment.parameters.minPixelSize):(e.scaleAlignment=e.factor.scale,e.minPixelSizeAlignment=e.factor.minPixelSize)},t.prototype.applyVerticalOffsetTransformation=function(e,t,r,i,n,o){var a=this.params;if(16===r.length&&(r=z.toMat3(r,_)),!a.verticalOffset||!a.verticalOffset.screenLength){if(n&&(a.screenSizePerspective||a.screenSizePerspectiveAlignment)){var s=this.normalAndViewAngle(t,r,i),l=P.length(e);this.updateScaleInfo(n,s.cosAngle,l)}else n&&(n.factor.scale=1,n.scaleAlignment=1);return o?P.set(e,o):e}var c=this.normalAndViewAngle(t,r,i),f=P.length(e),d=a.screenSizePerspectiveAlignment||a.screenSizePerspective,v=p.verticalOffsetAtDistance(i,f,a.verticalOffset,c.cosAngle,d);return n&&this.updateScaleInfo(n,c.cosAngle,f),P.add(e,P.scale(c.normal,v),o)},t.prototype.getGLMaterials=function(){return{color:E,depthShadowMap:void 0,normal:void 0,depth:void 0,highlight:U}},t.prototype.getAllTextureIds=function(){return[this.params.textureId]},t.prototype.setTextureDirty=function(){this._textureDirty=!0},t.prototype.calculateRelativeScreenBounds=function(e,t,r){return void 0===r&&(r=n.create()),h(this.params,e,t,r),r[2]=r[0]+e[0],r[3]=r[1]+e[1],r},t.prototype.calculateAnchorPosForRendering=function(e){return m(this.params,e)},t.loadShaders=function(e,t,r){e._parse(i);var n=function(e){e.addDefine("OcclTest","OCCL_TEST"),e.addDefine("SDF","SIGNED_DISTANCE_FIELD"),e.addDefine("vvSize","VV_SIZE"),e.addDefine("vvColor","VV_COLOR"),e.addDefine("verticalOffset","VERTICAL_OFFSET"),e.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),e.addDefine("centerOffsetUnitsScreen","CENTER_OFFSET_UNITS_SCREEN")},o=new v("hud",["vertexShaderHUD","fragmentShaderHUD"],null,t,e,r);n(o),o.addDefine("debugDrawBorder","DEBUG_DRAW_BORDER"),t.addShaderVariations("hud-material-shader-variations",o);var a=new v("hudHighlight",["vertexShaderHUD","fragmentShaderHUDHighlight"],null,t,e,r);n(a),a.addDefine("binaryHighlightOcclusion","BINARY_HIGHLIGHT_OCCLUSION"),t.addShaderVariations("hud-material-highlight-shader-variations",a);var s=new v("hudOcclusionTestPixel",["vertexShaderOcclusionTestPixel","fragmentShaderSimple"],null,t,e,r);s.addDefine("verticalOffset","VERTICAL_OFFSET"),s.addDefine("screenSizePerspective","SCREEN_SIZE_PERSPECTIVE"),s.addDefine("centerOffsetUnitsScreen","CENTER_OFFSET_UNITS_SCREEN"),t.addShaderVariations("hud-material-occlusion-test-pixel-shader-variations",s)},t.shouldRenderVisibilityDuringRenderPass=function(e){return e===c.MATERIAL||c.MATERIAL_HIGHLIGHT},t}(l),I=function(e){function t(t,r,i){var n=e.call(this,t,r,i,t.getParams().textureId)||this;return n.params=p.copyParameters(t.getParams()),n.selectProgram(),n.selectSlot(),n}return r(t,e),t.prototype.selectSlot=function(){this.mainSlot=this.params.drawInSecondSlot?f.HUDMATERIAL2:f.HUDMATERIAL1},t.prototype.beginSlot=function(e){return e===this.mainSlot},t.prototype.getProgram=function(){return this.program},t.prototype.updateParameters=function(){var e=this.material.getParams(),t=this.params;t.color=e.color,t.texCoordScale=e.texCoordScale,t.polygonOffset=e.polygonOffset,t.anchorPos=e.anchorPos,t.screenOffset=e.screenOffset,t.verticalOffset=e.verticalOffset,t.screenSizePerspective=e.screenSizePerspective,t.screenSizePerspectiveAlignment=e.screenSizePerspectiveAlignment,t.shaderPolygonOffset=e.shaderPolygonOffset,t.textureIsSignedDistanceField=e.textureIsSignedDistanceField,t.outlineColor=e.outlineColor,t.outlineSize=e.outlineSize,t.vvSizeEnabled=e.vvSizeEnabled,t.vvSizeMinSize=e.vvSizeMinSize,t.vvSizeMaxSize=e.vvSizeMaxSize,t.vvSizeOffset=e.vvSizeOffset,t.vvSizeFactor=e.vvSizeFactor,t.vvColorEnabled=e.vvColorEnabled,t.vvColorValues=e.vvColorValues,t.vvColorColors=e.vvColorColors,this.updateTexture(e.textureId),this.selectProgram(),this.selectSlot()},t.prototype.bindRender=function(e,t){var r=this.params,i=this.getProgram();this.bindTexture(e,i),i.setUniform1i("hudVisibilityTexture",1),e.bindTexture(t.hudVisibilityTexture,1),e.setActiveTexture(0),i.setUniform1f("uRenderTransparentlyOccludedHUD","occluded"===t.renderTransparentlyOccludedHUD?1:"notOccluded"===t.renderTransparentlyOccludedHUD?0:.75),i.setUniform4fv("overrideColor",r.color),i.setUniform1f("pixelRatio",t.pixelRatio),r.textureIsSignedDistanceField&&(i.setUniform4fv("outlineColor",r.outlineColor),i.setUniform1f("outlineSize",r.outlineSize)),r.vvSizeEnabled&&(i.setUniform3fv("vvSizeMinSize",r.vvSizeMinSize),i.setUniform3fv("vvSizeMaxSize",r.vvSizeMaxSize),i.setUniform3fv("vvSizeOffset",r.vvSizeOffset),i.setUniform3fv("vvSizeFactor",r.vvSizeFactor)),r.vvColorEnabled&&(i.setUniform1fv("vvColorValues",r.vvColorValues),i.setUniform4fv("vvColorColors",r.vvColorColors)),i.setUniform2fv("texScale",r.texCoordScale),i.setUniform2f("screenOffset",2*r.screenOffset[0],2*r.screenOffset[1]),i.setUniform2fv("anchorPos",m(r)),r.polygonOffset&&(e.setPolygonOffsetFillEnabled(!0),e.setPolygonOffset(0,-4)),e.setBlendingEnabled(!0),e.setBlendFunction(1,771)},t.prototype.bindProjection=function(e,t){this.material._textureDirty&&(this.renderTexture(e),this.material._textureDirty=!1);var r=t.cameraAboveGround?1:-1,i=this.getProgram(),n=this.params;e.bindProgram(i),i.setUniform1f("cameraGroundRelative",r),i.setUniform1f("polygonOffset",n.shaderPolygonOffset),i.setUniform4fv("viewport",t.viewport),p.bindVerticalOffset(n.verticalOffset,t,i),i.setUniformMatrix4fv("viewNormal",t.viewInvTransp),n.screenSizePerspective&&(p.bindScreenSizePerspective(n.screenSizePerspective,i,"screenSizePerspective"),p.bindScreenSizePerspective(n.screenSizePerspectiveAlignment||n.screenSizePerspective,i,"screenSizePerspectiveAlignment"))},t.prototype.releaseRender=function(e){e.setPolygonOffsetFillEnabled(!1),e.setBlendFunction(770,771),e.setBlendingEnabled(!1)},t.prototype.bindView=function(e,t){var r=t.origin,i=this.getProgram();p.bindView(r,t.view,i),p.bindCamPos(r,t.viewInvTransp,i)},t.prototype.bindInstance=function(e,t){var r=this.getProgram();r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(e){return e.gl.TRIANGLES},t}(s),E=function(e){function t(t,r,i){var n=e.call(this,t,r,i)||this;return n.isOcclusionSlot=!1,n}return r(t,e),t.prototype.selectProgram=function(){var e=this.params;this.programOcclusionTestPixel=this.programRep.getShaderVariationsProgram("hud-material-occlusion-test-pixel-shader-variations",[!!e.verticalOffset,!!e.screenSizePerspective,"screen"===e.centerOffsetUnits]),this.program=this.programRep.getShaderVariationsProgram("hud-material-shader-variations",[e.occlusionTest,e.textureIsSignedDistanceField,!!e.vvSizeEnabled,!!e.vvColorEnabled,!!e.verticalOffset,!!e.screenSizePerspective,"screen"===e.centerOffsetUnits,!!e.debugDrawBorder])},t.prototype.getDrawMode=function(e){var t=e.gl;return this.isOcclusionSlot?t.POINTS:t.TRIANGLES},t.prototype.release=function(e){var t=e.gl;e.setDepthFunction(t.LESS),this.isOcclusionSlot||this.releaseRender(e)},t.prototype.bind=function(e,t){var r=e.gl;this.bindProjection(e,t);var i=this.getProgram();e.setDepthTestEnabled(!0),e.setDepthFunction(r.LEQUAL),this.isOcclusionSlot?i.setUniform4f("color",1,1,1,1):(this.bindRender(e,t),this.bindTexture(e,i))},t.prototype.getProgram=function(){return this.isOcclusionSlot?this.programOcclusionTestPixel:this.program},t.prototype.getPrograms=function(){return[this.programOcclusionTestPixel,this.program]},t.prototype.beginSlot=function(e){return this.params.occlusionTest?(this.isOcclusionSlot=e===f.OCCLUSION_PIXELS,e===f.OCCLUSION_PIXELS||e===this.mainSlot):(this.isOcclusionSlot=!1,e===this.mainSlot)},t}(I),U=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return r(t,e),t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getShaderVariationsProgram("hud-material-highlight-shader-variations",[e.occlusionTest,e.textureIsSignedDistanceField,!!e.vvSizeEnabled,!!e.vvColorEnabled,!!e.verticalOffset,!!e.screenSizePerspective,"screen"===e.centerOffsetUnits,e.binaryHighlightOcclusion])},t.prototype.bind=function(e,t){this.bindProjection(e,t),this.bindRender(e,t)},t.prototype.release=function(e){this.releaseRender(e)},t}(I),D={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},scaleAlignment:0,minPixelSizeAlignment:0},T=[0,0],R=P.create(),M=P.create(),F=P.create(),L=P.create(),w=P.create(),_=A.create(),N=z.create(),B={normal:L,cosAngle:0},H=z.create();z.identity(H);var G=1,X=[0,0],Z=[0,0,1];return b});