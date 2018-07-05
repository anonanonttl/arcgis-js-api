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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../geometry","../../../../Graphic","../../../../core/Accessor","../../../../core/Handles","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/geometryEngine","../../../../geometry/support/boundsUtils","../../../../geometry/support/coordsUtils","../../../../layers/GraphicsLayer","../../../../symbols/SimpleFillSymbol","../../../../symbols/SimpleLineSymbol","../../../../symbols/SimpleMarkerSymbol","./drawUtils","./GraphicMover"],function(t,e,i,a,r,o,h,s,n,c,l,p,y,u,G,_,v,m,d){var g=function(){function t(t,e,i,a){this.graphic=t,this.targetGraphic=e,this.dx=i,this.dy=a,this.type="move-start"}return t}(),f=function(){function t(t,e,i,a){this.graphic=t,this.targetGraphic=e,this.dx=i,this.dy=a,this.type="move"}return t}(),b=function(){function t(t,e,i,a){this.graphic=t,this.targetGraphic=e,this.dx=i,this.dy=a,this.type="move-stop"}return t}(),w=function(){function t(t,e,i){this.graphic=t,this.targetGraphic=e,this.angle=i,this.type="rotate-start"}return t}(),x=function(){function t(t,e,i){this.graphic=t,this.targetGraphic=e,this.angle=i,this.type="rotate"}return t}(),S=function(){function t(t,e,i){this.graphic=t,this.targetGraphic=e,this.angle=i,this.type="rotate-stop"}return t}(),R=function(){function t(t,e,i,a){this.graphic=t,this.targetGraphic=e,this.xScale=i,this.yScale=a,this.type="scale-start"}return t}(),M=function(){function t(t,e,i,a){this.graphic=t,this.targetGraphic=e,this.xScale=i,this.yScale=a,this.type="scale"}return t}(),k=function(){function t(t,e,i,a){this.graphic=t,this.targetGraphic=e,this.xScale=i,this.yScale=a,this.type="scale-stop"}return t}();return function(t){function e(e){var i=t.call(this,e)||this;return i._centerGraphicSymbol=new v({type:"simple-marker",style:"circle",size:4,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),i._defaultFillSymbol=new G({type:"simple-fill",color:[12,207,255,.075],outline:{join:"round",color:[0,12,207],width:2}}),i._dashedFillSymbol=new G({type:"simple-fill",color:[0,0,0,0],outline:{style:"dash",color:[150,150,150,.5],width:2}}),i._defaultGraphicSymbol=new v({type:"simple-marker",style:"square",size:8,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),i._handles=new s,i._initialGeometry=null,i._initialBoxGeometry=null,i._initialRotateGeometry=null,i._mover=null,i._activeHandleGraphic=null,i._rotateGraphicOffset=20,i._rotateGraphicHoverSymbol=new v({type:"simple-marker",style:"circle",size:10,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),i._rotateGraphicSymbol=new v({type:"simple-marker",style:"circle",size:8,color:[255,255,255,1],outline:{color:[0,12,207],width:1}}),i._rotationAngle=0,i._rotateLineGraphic=null,i._rotateLineGraphicSymbol=new _({color:[0,12,207],width:2}),i._startBox=null,i._totalDx=0,i._totalDy=0,i._xScale=1,i._yScale=1,i.callbacks={onMoveStart:function(t){},onMove:function(t){},onMoveStop:function(t){},onScaleStart:function(t){},onScale:function(t){},onScaleStop:function(t){},onRotateStart:function(t){},onRotate:function(t){},onRotateStop:function(t){}},i.centerGraphic=null,i.boxGraphic=null,i.enableMovement=!0,i.enableRotation=!0,i.enableScaling=!0,i.graphic=null,i.handleGraphics=[],i.layer=new u({listMode:"hide"}),i.rotateGraphic=null,i.showCenterGraphic=!0,i.uniformScaling=!1,i.view=null,i}return i(e,t),e.prototype.initialize=function(){var t=this;this.graphic&&(this._setUpGraphics(),this._setUpMover(),this._updateGraphics()),this._handles.add([n.whenOnce(this,"view.ready",function(){t.view&&t.view.map&&t.view.map.add(t.layer)}),n.pausable(this,"uniformScaling",function(){t._activeHandleGraphic&&(t._scaleGraphic(t._activeHandleGraphic),t._updateGraphics())}),n.pausable(this,"view.scale",function(){t._updateRotateGraphic(),t._updateRotateLineGraphic()}),n.pausable(this,"graphic",function(){t.refresh()})])},e.prototype.destroy=function(){this._reset(),this._handles.removeAll(),this._handles=null,this.view&&this.view.map&&this.view.map.remove(this.layer),this.layer.destroy(),this._set("layer",null)},e.prototype.move=function(t,e){if(this._mover&&this.graphic){var i=this.graphic.geometry,a=m.move(i,t,e,this.view);this.graphic.set("geometry",a),this.refresh()}},e.prototype.scale=function(t,e){if(this._mover&&this.graphic){var i=this.graphic.geometry,a=m.scale(i,t,e,this.view);this.graphic.set("geometry",a),this.refresh()}},e.prototype.rotate=function(t,e){if(this._mover&&this.graphic){if(!e){var i=this.handleGraphics[1].geometry.x,a=this.handleGraphics[3].geometry.y;e=new r.Point(i,a,this.view.spatialReference)}var o=this.graphic.geometry,h=l.rotate(o,t,e);this.graphic.set("geometry",h),this.refresh()}},e.prototype.refresh=function(){this._reset(),this.graphic&&(this._setUpGraphics(),this._setUpMover(),this._updateGraphics())},e.prototype._reset=function(){this._startBox=null,this._activeHandleGraphic=null,this._initialGeometry=null,this._initialBoxGeometry=null,this._initialRotateGeometry=null,this._totalDx=0,this._totalDy=0,this._xScale=1,this._yScale=1,this._rotationAngle=0,this.layer&&this.layer.removeMany(this.handleGraphics),this.handleGraphics=[],this.layer&&this.layer.remove(this.boxGraphic),this.boxGraphic=null,this.layer&&this.layer.remove(this.centerGraphic),this.centerGraphic=null,this.layer&&this.layer.remove(this.rotateGraphic),this.rotateGraphic=null,this.layer&&this.layer.remove(this._rotateLineGraphic),this._rotateLineGraphic=null,this._mover&&this._mover.destroy(),this._mover=null},e.prototype._setUpMover=function(){var t=this,e=this.handleGraphics;this.enableMovement&&(e=e.concat(this.boxGraphic)),this.enableRotation&&(e=e.concat(this.rotateGraphic));var i=new d({view:this.view,graphics:e,callbacks:{onGraphicMoveStart:function(e){var i=e.graphic,a=t.graphic.geometry;if(t._activeHandleGraphic=i,t._initialGeometry=a,t._initialBoxGeometry=t.boxGraphic.geometry,t._initialRotateGeometry=t.rotateGraphic.geometry,i===t.boxGraphic){t.centerGraphic.visible=!1,t.rotateGraphic.visible=!1,t._rotateLineGraphic.visible=!1,t.handleGraphics.forEach(function(t){t.visible=!1});var r=e.dx,o=e.dy;t._totalDx=0,t._totalDy=0,t.callbacks.onMoveStart(new g(t.graphic,i,r,o))}else{var h=i.geometry,s=p.getRingsOrPathsBounds(t.boxGraphic.geometry.rings),n=s[0],c=s[1],l=s[2],y=s[3],u=Math.abs(l-n),G=Math.abs(y-c),_=(l+n)/2,v=(y+c)/2;t._startBox={width:u,height:G,centerX:_,centerY:v,startX:h.x,startY:h.y},t._xScale=1,t._yScale=1,i===t.rotateGraphic?(t.rotateGraphic.visible=!1,t._rotateLineGraphic.visible=!1,t.handleGraphics.forEach(function(t){t.visible=!1}),t.boxGraphic.symbol=t._dashedFillSymbol,t.rotateGraphic.symbol=t._rotateGraphicHoverSymbol,t.callbacks.onRotateStart(new w(t.graphic,i,0))):(t.rotateGraphic.visible=!1,t._rotateLineGraphic.visible=!1,t.handleGraphics.forEach(function(t){t.visible=!1}),t.callbacks.onScaleStart(new R(t.graphic,i,1,1)))}},onGraphicMove:function(e){var i=e.graphic;if(i===t.boxGraphic){var a=e.dx,o=e.dy;t._totalDx+=a,t._totalDy+=o;var h=t.graphic.geometry,s=m.move(h,a,o,t.view);t.graphic.set("geometry",s),t.callbacks.onMove(new f(t.graphic,i,a,o))}else if(i===t.rotateGraphic){var n=new r.Point(t._startBox.startX,t._startBox.startY,t.view.spatialReference),c=new r.Point(t._startBox.centerX,t._startBox.centerY,t.view.spatialReference),p=t._getAngle(c,n,i.geometry),s=l.rotate(t._initialGeometry,p,c);t.graphic.set("geometry",s);var y=l.rotate(t._initialBoxGeometry,p,c);t.boxGraphic.set("geometry",y);var u=l.rotate(t._initialRotateGeometry,p,c);t.rotateGraphic.set("geometry",u),t._rotationAngle=p,t.callbacks.onRotate(new x(t.graphic,i,p))}else t._scaleGraphic(i),t._updateBoxGraphic(),t._updateCenterGraphic(),t.callbacks.onScale(new M(t.graphic,i,t._xScale,t._yScale))},onGraphicMoveStop:function(e){var i=e.graphic;i===t.boxGraphic?(t._updateGraphics(),t.showCenterGraphic&&(t.centerGraphic.visible=!0),t.enableRotation&&(t._rotateLineGraphic.visible=!0,t.rotateGraphic.visible=!0),t.enableScaling&&t.handleGraphics.forEach(function(t){t.visible=!0}),t.callbacks.onMoveStop(new b(t.graphic,i,t._totalDx,t._totalDy))):i===t.rotateGraphic?(t._updateGraphics(),t._rotateLineGraphic.visible=!0,t.rotateGraphic.visible=!0,t.enableScaling&&t.handleGraphics.forEach(function(t){t.visible=!0}),t.rotateGraphic.symbol=t._rotateGraphicSymbol,t.boxGraphic.symbol=t._defaultFillSymbol,t.callbacks.onRotateStop(new S(t.graphic,i,t._rotationAngle))):(t._updateGraphics(),t.enableRotation&&(t._rotateLineGraphic.visible=!0,t.rotateGraphic.visible=!0),t.handleGraphics.forEach(function(t){t.visible=!0}),t.callbacks.onScaleStop(new k(t.graphic,i,t._xScale,t._yScale))),t._startBox=null,t._activeHandleGraphic=null,t._initialGeometry=null,t._initialBoxGeometry=null,t._initialRotateGeometry=null,t._totalDx=0,t._totalDy=0,t._xScale=1,t._yScale=1},onGraphicPointerOver:function(e){var i,a=t.view.rotation,r=e.index;switch(e.graphic===t.rotateGraphic&&(t.rotateGraphic.symbol=t._rotateGraphicHoverSymbol),r<8&&(a>=0&&a<45?r%=8:r=a>=45&&a<90?(r+1)%8:a>=90&&a<135?(r+2)%8:a>=135&&a<180?(r+3)%8:a>=180&&a<225?(r+4)%8:a>=225&&a<270?(r+5)%8:a>=270&&a<315?(r+6)%8:(r+7)%8),r){case 0:i="nwse-resize";break;case 1:i="ns-resize";break;case 2:i="nesw-resize";break;case 3:i="ew-resize";break;case 4:i="nwse-resize";break;case 5:i="ns-resize";break;case 6:i="nesw-resize";break;case 7:i="ew-resize";break;case 8:case 9:i="pointer";break;default:i="default"}t.view.container.style.cursor=i},onGraphicPointerOut:function(e){e.graphic===t.rotateGraphic&&(t.rotateGraphic.symbol=t._rotateGraphicSymbol),"default"!==t.view.container.style.cursor&&(t.view.container.style.cursor="default")}}});this._mover=i},e.prototype._getBoxCoordinates=function(t){var e=new r.Point(t.xmin,t.ymax,this.view.spatialReference),i=new r.Point(t.xmax,t.ymin,this.view.spatialReference),a=(e.x+i.x)/2,o=(e.y+i.y)/2;return[[e.x,e.y],[a,e.y],[i.x,e.y],[i.x,o],[i.x,i.y],[a,i.y],[e.x,i.y],[e.x,o]]},e.prototype._scaleGraphic=function(t){var e=this.handleGraphics.indexOf(t),i=this._startBox,a=i.centerX,r=i.centerY,o=i.startX,h=i.startY;1!==e&&5!==e||this._updateX(t,a),3!==e&&7!==e||this._updateY(t,r);var s=t.geometry,n=this.view.toScreen(s),c=n.x,l=n.y;if(this.uniformScaling)this._xScale=this._yScale=this._getScaleRatio(a,r,c,l,o,h),this.graphic.set("geometry",m.scale(this._initialGeometry,this._xScale,this._yScale,this.view));else{var p=this._startBox,y=p.width,u=p.height,G=o>a,_=h<r,v=s.x-o,d=h-s.y;if(1===e||5===e?v=0:3!==e&&7!==e||(d=0),0===v&&0===d)return;var g=G?v:-1*v,f=_?d:-1*d,b=y+g,w=u+f,x=a+v/2,S=r+d/2;this._xScale=b/y||1,this._yScale=w/u||1,1===e||5===e?this._xScale=1:3!==e&&7!==e||(this._yScale=1);var R=m.scale(this._initialGeometry,this._xScale,this._yScale,this.view),M=(x-a)/this.view.state.resolution,k=(S-r)/this.view.state.resolution;this.graphic.set("geometry",m.move(R,M,k,this.view,!1))}},e.prototype._setUpGraphics=function(){this.centerGraphic=new o(null,this._centerGraphicSymbol),this.showCenterGraphic&&this.layer.add(this.centerGraphic),this.boxGraphic=new o(null,this._defaultFillSymbol),this.layer.add(this.boxGraphic),this._rotateLineGraphic=new o(null,this._rotateLineGraphicSymbol),this.enableRotation&&this.layer.add(this._rotateLineGraphic),this.rotateGraphic=new o(null,this._rotateGraphicSymbol),this.enableRotation&&this.layer.add(this.rotateGraphic);for(var t=0;t<8;t++)this.handleGraphics.push(new o(null,this._defaultGraphicSymbol));this.enableScaling&&this.layer.addMany(this.handleGraphics)},e.prototype._updateGraphics=function(){this._updateBoxGraphic(),this._updateHandleGraphics(),this._updateCenterGraphic(),this._updateRotateGraphic(),this._updateRotateLineGraphic()},e.prototype._updateHandleGraphics=function(){var t=this;if(this.graphic&&this.graphic.geometry){var e=y.geometryToCoordinates(this.graphic.geometry),i=p.getRingsOrPathsBounds(e),a=i[0],r=i[1],o=i[2],h=i[3],s=this._getBoxCoordinates({xmin:a,ymin:r,xmax:o,ymax:h});this.handleGraphics.forEach(function(e,i){var a=s[i],r=a[0],o=a[1];t._updateXY(e,r,o)})}},e.prototype._updateBoxGraphic=function(){if(this.graphic&&this.graphic.geometry){var t=y.geometryToCoordinates(this.graphic.geometry),e=p.getRingsOrPathsBounds(t),i=e[0],a=e[1],o=e[2],h=e[3],s=this._getBoxCoordinates({xmin:i,ymin:a,xmax:o,ymax:h});this.boxGraphic.set("geometry",new r.Polygon({rings:s,spatialReference:this.view.spatialReference}))}},e.prototype._updateCenterGraphic=function(){if(this.graphic&&this.graphic.geometry){var t=y.geometryToCoordinates(this.graphic.geometry),e=p.getRingsOrPathsBounds(t),i=e[0],a=e[1],o=e[2],h=e[3],s=(o+i)/2,n=(h+a)/2;this.centerGraphic.set("geometry",new r.Point(s,n,this.view.spatialReference))}},e.prototype._updateRotateGraphic=function(){if(this.handleGraphics.length){var t=this.handleGraphics[1].geometry,e=t.x,i=t.y,a=i+this.view.state.resolution*this._rotateGraphicOffset;this.rotateGraphic.set("geometry",new r.Point(e,a,this.view.spatialReference))}},e.prototype._updateRotateLineGraphic=function(){if(this.handleGraphics.length&&this.rotateGraphic&&this.rotateGraphic.geometry){var t=this.handleGraphics[1].geometry,e=this.rotateGraphic.geometry;this._rotateLineGraphic.set("geometry",new r.Polyline({paths:[[t.x,t.y],[e.x,e.y]],spatialReference:this.view.spatialReference}))}},e.prototype._updateXY=function(t,e,i){t.set("geometry",new r.Point(e,i,this.view.spatialReference))},e.prototype._updateX=function(t,e){var i=t.geometry.y;t.set("geometry",new r.Point(e,i,this.view.spatialReference))},e.prototype._updateY=function(t,e){var i=t.geometry.x;t.set("geometry",new r.Point(i,e,this.view.spatialReference))},e.prototype._getScaleRatio=function(t,e,i,a,r,o){var h=Math.sqrt((r-t)*(r-t)+(o-e)*(o-e));return Math.sqrt((i-t)*(i-t)+(a-e)*(a-e))/h},e.prototype._getAngle=function(t,e,i){var a=180*Math.atan2(t.y-e.y,t.x-e.x)/Math.PI;return 180*Math.atan2(t.y-i.y,t.x-i.x)/Math.PI-a},a([c.property()],e.prototype,"callbacks",void 0),a([c.property()],e.prototype,"centerGraphic",void 0),a([c.property()],e.prototype,"boxGraphic",void 0),a([c.property()],e.prototype,"enableMovement",void 0),a([c.property()],e.prototype,"enableRotation",void 0),a([c.property()],e.prototype,"enableScaling",void 0),a([c.property()],e.prototype,"graphic",void 0),a([c.property()],e.prototype,"handleGraphics",void 0),a([c.property({readOnly:!0})],e.prototype,"layer",void 0),a([c.property()],e.prototype,"rotateGraphic",void 0),a([c.property()],e.prototype,"showCenterGraphic",void 0),a([c.property()],e.prototype,"uniformScaling",void 0),a([c.property()],e.prototype,"view",void 0),e=a([c.subclass("esri.views.2d.draw.support.Box")],e)}(c.declared(h))});