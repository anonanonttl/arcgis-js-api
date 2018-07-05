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

define(["require","exports","../../../core/libs/gl-matrix/mat3","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","./vtShaderSnippets","../../webgl/ShaderVariations","../../webgl/VertexArrayObject"],function(t,e,i,r,o,l,a,n,s,f,u){return function(){function t(){this._fillAttributeLocations={a_pos:0},this._fillAttributeLocationsDD={a_pos:0,a_color:1},this._outlineAttributeLocations={a_pos:0,a_offset:1,a_xnormal:2},this._outlineAttributeLocationsDD={a_pos:0,a_offset:1,a_xnormal:2,a_color:3},this._initialized=!1,this._viewProjMat=r.create(),this._offsetVector=o.create(),this._patternMatrix=i.create(),this._color=l.create(),this._outlineColor=l.create()}return t.prototype.dispose=function(){},t.prototype.render=function(t,e,i,o,l,s,f,u,_,c,h){if(0!==e.triangleElementCount){this._initialized||this._initialize(t);var d=f.getPaintValue("fill-pattern",i),D=void 0!==d,m=f.hasDataDrivenColor?[1,1,1,1]:f.getPaintValue("fill-color",i),v=f.hasDataDrivenOpacity?1:f.getPaintValue("fill-opacity",i),V=v*m[3]*h;this._color[0]=V*m[0],this._color[1]=V*m[1],this._color[2]=V*m[2],this._color[3]=V;var x,p=3===l;p&&(x=n.int32To4Bytes(e.layerID));var y=s.tileTransform.transform,b=s.coordRange/512,A=f.getPaintValue("fill-translate",i);if(0!==A[0]||0!==A[1]){r.copy(this._viewProjMat,s.tileTransform.transform);var g=A[0],O=A[1],M=0,P=0,j=(1<<s.key.level)/Math.pow(2,i)*b;if(1===f.getPaintValue("fill-translate-anchor",i)){var z=-a.C_DEG_TO_RAD*o,C=Math.sin(z),w=Math.cos(z);M=j*(g*w-O*C),P=j*(g*C+O*w)}else M=j*g,P=j*O;this._offsetVector[0]=M,this._offsetVector[1]=P,this._offsetVector[2]=0,r.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),y=this._viewProjMat}this._drawFill(t,e,i,l,s,f,u,y,c,h,p,x);if(f.getPaintValue("fill-antialias",i)&&!D&&e.outlineElementCount>0&&(1===l||3===l)){var U=f.hasDataDrivenOutline;if(f.outlineUsesFillColor){if(1!==this._color[3])return;this._outlineColor[0]=this._color[0],this._outlineColor[1]=this._color[1],this._outlineColor[2]=this._color[2],this._outlineColor[3]=this._color[3]}else{var S=f.hasDataDrivenOutlineColor?[1,1,1,1]:f.getPaintValue("fill-outline-color",i),E=v*S[3]*h;this._outlineColor[0]=E*S[0],this._outlineColor[1]=E*S[1],this._outlineColor[2]=E*S[2],this._outlineColor[3]=E}var I=.75/c,L=this._getOutlineVAO(t,s,U);if(L){t.bindVAO(L);var T=this._outlineShaderVariations.getProgram([U,p],void 0,void 0,U?this._outlineAttributeLocationsDD:this._outlineAttributeLocations);t.bindProgram(T),T.setUniformMatrix4fv("u_transformMatrix",y),T.setUniformMatrix4fv("u_extrudeMatrix",_),T.setUniform2fv("u_normalized_origin",s.tileTransform.displayCoord),T.setUniform1f("u_depth",f.z+1/65536),T.setUniform1f("u_outline_width",I),T.setUniform4fv("u_color",this._outlineColor),p&&T.setUniform4f("u_id",x[0],x[1],x[2],x[3]),t.drawElements(4,e.outlineElementCount,5125,12*e.outlineElementStart),t.bindVAO()}}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var e=new f("fill",["fillVS","fillFS"],[],s,t);e.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),e.addDefine("DD","DD",[!0,!1],"DD"),e.addDefine("ID","ID",[!0,!0],"ID"),this._fillShaderVariations=e,this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};var i=new f("outline",["outlineVS","outlineFS"],[],s,t);return i.addDefine("DD","DD",[!0,!1],"DD"),i.addDefine("ID","ID",[!0,!0],"ID"),this._outlineShaderVariations=i,this._outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]},this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]},this._initialized=!0,!0},t.prototype._drawFill=function(t,e,r,o,l,a,n,s,f,u,_,c){var h=a.getPaintValue("fill-pattern",r),d=void 0!==h,D=a.hasDataDrivenOpacity?1:u*a.getPaintValue("fill-opacity",r),m=a.hasDataDrivenColor?[1,1,1,1]:a.getPaintValue("fill-color",r),v=D*m[3]*u;this._color[0]=v*m[0],this._color[1]=v*m[1],this._color[2]=v*m[2],this._color[3]=v;var V=a.hasDataDrivenFill,x=!V&&1===v,p=!1;if(!d&&x&&(p=!0),(!d||0!==o)&&(!p||1!==o)&&(d||p||0!==o)){var y=this._getFillVAO(t,l,V);if(y){t.bindVAO(y);var b=this._fillShaderVariations.getProgram([d,V,_],void 0,void 0,V?this._fillAttributeLocationsDD:this._fillAttributeLocations);if(t.bindProgram(b),d){var A=n.getMosaicItemPosition(h,!0);if(A){var g=l.coordRange/512,O=g/Math.pow(2,Math.round(r)-l.key.level)/f;i.identity(this._patternMatrix);var M=1/(A.size[0]*O),P=1/(A.size[1]*O);this._patternMatrix[0]=M,this._patternMatrix[4]=P,n.bind(t,9729,A.page,1),b.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),b.setUniform2f("u_pattern_tl",A.tl[0],A.tl[1]),b.setUniform2f("u_pattern_br",A.br[0],A.br[1]),b.setUniform1i("u_texture",1)}}b.setUniformMatrix4fv("u_transformMatrix",s),b.setUniform2fv("u_normalized_origin",l.tileTransform.displayCoord),b.setUniform1f("u_depth",a.z+1/65536),b.setUniform4fv("u_color",this._color),_&&b.setUniform4f("u_id",c[0],c[1],c[2],c[3]),t.drawElements(4,e.triangleElementCount,5125,12*e.triangleElementStart),t.bindVAO()}}},t.prototype._getFillVAO=function(t,e,i){if(i){if(e.fillDDVertexArrayObject)return e.fillDDVertexArrayObject;var r=e.fillDDVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillDDVertexArrayObject=new u(t,this._fillAttributeLocationsDD,this._fillVertexAttributesDD,{geometry:r},o),e.fillDDVertexArrayObject):null}if(e.fillVertexArrayObject)return e.fillVertexArrayObject;var r=e.fillVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillVertexArrayObject=new u(t,this._fillAttributeLocations,this._fillVertexAttributes,{geometry:r},o),e.fillVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,e,i){if(i){if(e.outlineDDVertexArrayObject)return e.outlineDDVertexArrayObject;var r=e.outlineDDVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineDDVertexArrayObject=new u(t,this._outlineAttributeLocationsDD,this._outlineVertexAttributesDD,{geometry:r},o),e.outlineDDVertexArrayObject):null}if(e.outlineVertexArrayObject)return e.outlineVertexArrayObject;var r=e.outlineVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineVertexArrayObject=new u(t,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:r},o),e.outlineVertexArrayObject):null},t}()});