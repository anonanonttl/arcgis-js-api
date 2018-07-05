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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Camera","../../../Viewpoint","../../../core/Accessor","../../../core/Error","../../../core/Handles","../../../core/Logger","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../geometry/Extent","../../../geometry/Point","../../../geometry/ScreenPoint","../../../geometry/support/webMercatorUtils","../camera/constraintUtils","../camera/intersectionUtils","../lib/glMatrix","./ConstraintsManager","./Frustum","./controllers/PointToPointAnimationController","./controllers/SurfaceCollisionCorrectionController","./helpers/PickingHelper","../support/cameraUtils","../support/PropertiesPool","../support/viewpointUtils","../webgl-engine/lib/Camera","../../animation/easing"],function(e,t,i,r,n,a,o,s,l,c,p,d,h,m,u,v,f,w,y,g,C,T,b,P,O,S,x,A,I,G,R){Object.defineProperty(t,"__esModule",{value:!0});var _=p.getLogger("esri.views.3d.state.ViewStateManager"),B=function(e){function t(t){var i=e.call(this)||this;return i.propertiesPool=new A.default({frustum:b.default},i),i.handles=new c,i.cameraSetByUser=!1,i.internalSetOrder=[],i.immediateGoToPromise=null,i.animatedGoToPromise=null,i.ready=!1,i}return r(t,e),Object.defineProperty(t.prototype,"camera",{get:function(){return this.ready?x.internalToExternal(this.view,this.view.state.camera):this._get("camera")},set:function(e){this.updatePropertyBeforeReady("camera",e)||this.setStateCamera(x.externalToInternal(this.view,e),{applyConstraints:!1})||_.error("#camera=","Invalid camera",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"center",{get:function(){return this.ready?this.view.pointsOfInterest.centerOnContent.location:this._get("center")},set:function(e){if(!this.updatePropertyBeforeReady("center",e))return e?this.isCompatible(e)?void(this.setStateCamera(this.centerToCamera(e),{applyConstraints:!0})?this.view.pointsOfInterest.centerOnContent.forceUpdate():_.error("#center=","Invalid center",e)):void _.error("#center=","Center has an incompatible spatial reference (center: "+(e.spatialReference?e.spatialReference.wkid:"none")+", view: "+this.view.spatialReference.wkid+")",e):void _.error("#center=","Center may not be null or undefined")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"extent",{get:function(){return this.ready?x.toExtent(this.view,null,null,null,z):this._get("extent")},set:function(e){if(!this.updatePropertyBeforeReady("extent",e))return e?this.isCompatible(e)?void(this.setStateCamera(this.extentToCamera(e),{applyConstraints:!0})||_.error("#extent=","Invalid extent",e)):void _.error("#extent=","Extent has an incompatible spatial reference (extent: "+(e.spatialReference?e.spatialReference.wkid:"none")+", view: "+this.view.spatialReference.wkid+")",e):void _.error("#extent=","Extent may not be null or undefined")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"frustum",{get:function(){var e=this.propertiesPool.get("frustum");return e.renderCoordsHelper=this.view.renderCoordsHelper,e.update(this.view.state.camera),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasInitialView",{get:function(){return!!this.view.get("map.initialViewProperties.viewpoint")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"scale",{get:function(){if(!this.ready)return this._get("scale");var e=this.view.pointsOfInterest.centerOnContent;return x.distanceToScale(this.view,e.distance,e.location.latitude)},set:function(e){this.updatePropertyBeforeReady("scale",e)||this.setStateCamera(this.scaleToCamera(e),{applyConstraints:!0})||_.error("#scale=","Invalid scale",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"padding",{get:function(){if(!this.ready)return this._get("padding");var e=this.view.state.camera.padding,t=this._get("padding");return null!==t&&t.top===e[0]&&t.right===e[1]&&t.bottom===e[2]&&t.left===e[3]?t:{top:e[0],right:e[1],bottom:e[2],left:e[3]}},set:function(e){this.updatePropertyBeforeReady("padding",e)||(e?C.vec4d.set4(e.top||0,e.right||0,e.bottom||0,e.left||0,j):C.vec4d.set4(0,0,0,0,j),this.view.state.updateCamera(function(e){e.padding=j}))},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"screenCenter",{get:function(){var e=this.padding;return new f((this.view.width-(e.left+e.right))/2+e.left,(this.view.height-(e.top+e.bottom))/2+e.top)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"viewpoint",{get:function(){return this.ready?I.fromCamera(this.view,this.camera):this._get("viewpoint")},set:function(e){if(!this.updatePropertyBeforeReady("viewpoint",e)){if(!e)return void _.error("#viewpoint=","Viewpoint may not be null or undefined");if(!this.isCompatible(e)){var t=e.camera?e.camera.position:e.targetGeometry,i=t&&t.spatialReference;return void _.error("#viewpoint=","Viewpoint has an incompatible spatial reference (viewpoint: "+(i?i.wkid:"none")+", view: "+this.view.spatialReference.wkid+")",e)}this.setStateCamera(this.viewpointToCamera(e),{applyConstraints:!e.camera})||_.error("#viewpoint=","Invalid viewpoint",e)}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"zoom",{get:function(){return this.ready?x.scaleToZoom(this.view,this.scale):this._get("zoom")},set:function(e){this.updatePropertyBeforeReady("zoom",e)||this.setStateCamera(this.zoomToCamera(e),{applyConstraints:!0})||_.error("#zoom=","Invalid zoom",e)},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.pickingHelper=new S.PickingHelper(this.view),this.handles.add(this.view.watch("state.camera",function(t){return e.cameraChangedSync(t)},!0),h.on(this.view,"state.events","before-camera-change",function(t){return e.beforeCameraChangeHandle(t.camera)})),this.handles.add(this.view.on("resize",function(t){return e.handleResize(t.width,t.height)})),this.handles.add(this.view.watch("state.cameraController",function(){e.cameraSetByUser=!0,e.handles.remove(F),e.cancelImmediateGoTo()})),this.handles.add(h.on(this.view,"state.events","camera-projection-changed",function(){return e.notifyChange("scale")}))},t.prototype.destroy=function(){this.handles&&(this.handles.destroy(),this.handles=null),this.propertiesPool&&(this.propertiesPool.destroy(),this.propertiesPool=null)},t.prototype.init=function(){var e=this;this.constraintsManager=new T.default({view:this.view}),this.handleResize(this.view.width,this.view.height);var t=this.getInitialProperties();this.cameraSetByUser=!1,this._set("ready",!0);for(var i=0,r=t;i<r.length;i++){var n=r[i];this.set(n.name,n.value)}if(!this.cameraSetByUser){var a=this.view.get("map.initialViewProperties.viewpoint")||this.view.initialExtent;a&&this.isCompatible(a)?this.setInitialView(a):"local"===this.view.state.mode&&this.handles.add(h.whenOnce(this.view.basemapTerrain,"ready",function(){e.handles.remove(F),e.setInitialView(e.view.groundExtent)}),F)}},t.prototype.deinit=function(){this.ready&&(this._override("padding",this.padding),this.cancelImmediateGoTo(),this.cancelAnimatedGoTo(),this._set("ready",!1),this._clearOverride("hasInitialView"),this.internalSetOrder.length=0,this.cameraSetByUser=!1,this.handles.remove(F),this.constraintsManager&&(this.constraintsManager.destroy(),this.constraintsManager=null))},t.prototype.goTo=function(e,t){var r=i({animate:!0},t);return r.animate?this.goToAnimated(e,r):this.goToImmediate(e,r)},t.prototype.debugSetCameraOnContent=function(){this.setStateCamera(g.cameraOnContentAlongViewDirection(this.view),{applyConstraints:!1})},t.prototype.step=function(e){var t=this.view.state,i=t&&this.view.state.cameraController;i&&(t.updateCamera(function(t){i.stepController(e,t)}),i.steppingFinished&&i.finishController())},t.prototype.cancelImmediateGoTo=function(){var e=this.immediateGoToPromise;e&&(this.immediateGoToPromise=null,e.cancel())},t.prototype.cancelAnimatedGoTo=function(){var e=this.animatedGoToPromise;e&&(this.animatedGoToPromise=null,e.cancel())},t.prototype.getInitialProperties=function(){for(var e=this,t=new Set,i=[],r=0,n=U;r<n.length;r++){var a=n[r],o=a.propertyName,s=a.overrides,l=t.has(o),c=this._isOverridden(o);!l&&c&&i.push({name:o,value:this._get(o)}),this._clearOverride(o),(l||c)&&s.forEach(function(e){return t.add(e)})}return i.sort(function(t,i){var r=e.internalSetOrder.indexOf(t.name),n=e.internalSetOrder.indexOf(i.name);return r<n?-1:r>n?1:0})},t.prototype.setInitialView=function(e){if(e&&!this.cameraSetByUser){var t,i={applyConstraints:!0};e instanceof a?(t=e,i.applyConstraints=!1):e instanceof o?e.targetGeometry instanceof u?t=x.fromExtent(this.view,e.targetGeometry,0,.5,{noReset:!0}):(e.camera&&(i.applyConstraints=!1),t=I.toCamera(this.view,e)):t=x.fromExtent(this.view,e,0,.5,{noReset:!0}),this.setStateCamera(x.externalToInternal(this.view,t),i)}},t.prototype.updatePropertyBeforeReady=function(e,t){if(this.ready)return!1;this._override(e,t);var i=this.internalSetOrder.indexOf(e);return-1!==i&&(this.internalSetOrder=this.internalSetOrder.splice(i,1)),t&&(this.internalSetOrder.push(e),-1!==H.indexOf(e)&&this._override("hasInitialView",!0)),!0},t.prototype.isCompatible=function(e){return!!e&&(e instanceof o?e.camera?this.isCompatible(e.camera):this.isCompatible(e.targetGeometry):e instanceof a?this.isCompatible(e.position):e.spatialReference&&w.canProject(e.spatialReference,this.view.spatialReference))},t.prototype.getPreservingHeadingTilt=function(e){return void 0===e&&(e=V),this.cameraSetByUser?(e.heading=this.camera.heading,e.tilt=this.camera.tilt):(e.heading=0,e.tilt=.5),e},t.prototype.centerPointAtDistanceToCamera=function(e,t,i){void 0===i&&(i=E);var r=this.getPreservingHeadingTilt(),n=x.eyeHeadingTiltForCenterPointAtDistance(this.view,r.heading,r.tilt,e,t);return n?(i.copyFrom(this.view.state.camera),i.eye=n.eye,i.center=n.center,i.up=n.up,i):null},t.prototype.centerToCamera=function(e){var t=this.view.pointsOfInterest.centerOnContent;t.forceUpdate();var i=t.distance;return this.centerPointAtDistanceToCamera(e,i)},t.prototype.extentToCamera=function(e){var t=this.getPreservingHeadingTilt(),i=x.fromExtent(this.view,e,t.heading,t.tilt,z);if(i)return x.externalToInternal(this.view,i)},t.prototype.scaleToCamera=function(e){if(null==e)return null;var t=this.view.pointsOfInterest.centerOnContent;t.forceUpdate();var i=t.renderLocation,r=t.location.latitude,n=x.scaleToDistance(this.view,e,r);return this.centerPointAtDistanceToCamera(i,n)},t.prototype.zoomToCamera=function(e){return this.scaleToCamera(x.zoomToScale(this.view,e))},t.prototype.viewpointToCamera=function(e){var t=I.toCamera(this.view,e);return t?x.externalToInternal(this.view,t):null},t.prototype.setStateCamera=function(e,t){var i=this;return!!e&&(!!this.view.state.stopActiveCameraController()&&(this.cameraSetByUser=!0,this.cancelImmediateGoTo(),this.view.state.updateCamera(function(r){r.copyFrom(e),t.applyConstraints&&y.applyAll(i.view,r)}),t.applyConstraints||(this.view.state.cameraController=new O.SurfaceCollisionCorrectionController({view:this.view,desiredCamera:e})),!0))},t.prototype.handleResize=function(e,t){var i=this.view.canvas;if(i&&(i.width===e&&i.height===t||(i.width=e,i.height=t)),this.view.state){var r=this.view.state.camera;r.fullWidth===e&&r.fullHeight===t||(E.copyFrom(r),E.fullWidth=e,E.fullHeight=t,this.view.state.camera=E)}},t.prototype.beforeCameraChangeHandle=function(e){this.updateCameraAboveGround(e)},t.prototype.cameraChangedSync=function(e){e&&this.view._stage&&this.view._stage.setCamera(e)},t.prototype.updateCameraAboveGround=function(e){var t=this.view.basemapTerrain,i=this.view.renderCoordsHelper.getAltitude(e.eye),r=t&&t.spatialReference?g.surfaceElevationBelowEye(this.view,e):0;e.relativeElevation=i-r},t.prototype.createGoToCamera=function(e){var t=this;return h.whenOnce(this,"ready",null,!0).then(function(){return I.create(t.view,e)}).then(function(i){var r=!!(e instanceof o&&e.camera||e instanceof a),n=i.camera;if(!t.isCompatible(n)){var s=n.position,c=s&&s.spatialReference,p=c?c.wkid:"none",d=t.view.spatialReference.wkid;throw new l("goto:incompatible-spatialreference","Resulting camera has an incompatible spatial reference (camera: "+p+", view: "+d+")",{camera:n})}var h=x.externalToInternal(t.view,n);if(!h)throw new l("goto:invalid-camera","Resulting camera is invalid");return{viewpoint:i,camera:h,isFullySpecified:r}})},t.prototype.cancellableGoTo=function(e){var t,i=this,r=function(){return i.view.state.cameraController===e&&e.active&&e.asyncResult===t},n=function(){r()&&e.stopController()};return d.create(function(i,r){t={resolve:i,reject:r},e.asyncResult=t},n)},t.prototype.goToImmediate=function(e,t){var i=this;this.cancelAnimatedGoTo(),this.cancelImmediateGoTo();var r=this.createGoToCamera(e),n=function(){i.immediateGoToPromise===a&&(i.immediateGoToPromise=null)},a=r.then(function(e){n(),i.setStateCamera(e.camera,{applyConstraints:!e.isFullySpecified})}).catch(function(e){throw n(),e instanceof l&&e.message&&_.error("#goTo()","Failed to create camera from target, "+e.message[0].toLowerCase()+e.message.slice(1)),e});return this.immediateGoToPromise=a,a},t.prototype.goToAnimatedBeforeReady=function(e,t){var i=this;this.cancelAnimatedGoTo();var r=h.whenOnce(this.view,"ready").then(function(){if(r===i.animatedGoToPromise)return i.animatedGoToPromise=null,i.goToAnimated(e,t);throw new l("view:goto-cancelled","Cancelled")});return this.animatedGoToPromise=r,r},t.prototype.goToAnimated=function(e,t){var i=this;if(this.cancelAnimatedGoTo(),!this.ready)return this.goToAnimatedBeforeReady(e,t);var r,n=this.view.state.cameraController;n instanceof P.PointToPointAnimationController&&(n.updateStateFromViewAnimation(),n.active&&(r=n)),null==r&&(r=new P.PointToPointAnimationController(this.view.state,this.pickingHelper));var a=r.viewAnimation,o=this.createGoToCamera(e),s=o.then(function(e){return e.viewpoint});if(a.update(s),r!==n&&!this.view.state.switchCameraController(r))return a.stop(),_.error("#goTo()","Cannot start an animation while interacting"),d.reject(new l("view:goto-cannot-interrupt","Cannot start an animation while interacting"));var c=a.target,p=function(){return i.view.state.cameraController===r&&r.viewAnimation.target===c&&r.active};return o.then(function(e){var n=e.viewpoint,o=e.camera,s=e.isFullySpecified;if(p()){r.viewAnimation.update(n),c=r.viewAnimation.target;var l;return s?(l=new O.SurfaceCollisionCorrectionController({view:i.view,desiredCamera:o}),y.applySurfaceCollision(i.view,o,1)):y.applyAll(i.view,o),r.begin(o,i.internalAnimateOptions(t)),a.when().then(function(){var e=i.view.state.cameraController;l&&(e&&e.active?e instanceof P.PointToPointAnimationController&&e.viewAnimation.target===c&&(i.view.state.cameraController=l):r.viewAnimation.target===c&&(i.view.state.cameraController=l))})}}).catch(function(e){if(e instanceof l&&e.message&&_.error("#goTo()","Failed to create camera from target, "+e.message[0].toLowerCase()+e.message.slice(1)),p())throw i.view.state.cameraController.stopController(),e}),this.cancellableGoTo(r)},t.prototype.internalAnimateOptions=function(e){var t={};return e&&(null!=e.speedFactor&&(t.speedFactor=e.speedFactor),null!=e.duration&&(t.duration=e.duration/1e3),null!=e.maxDuration&&(t.maxDuration=e.maxDuration/1e3),null!=e.easing&&("string"==typeof e.easing?t.easing=R.named[e.easing]:t.easing=e.easing)),t},n([m.property({type:a,dependsOn:["view.state.camera","ready"]})],t.prototype,"camera",null),n([m.property({type:v,dependsOn:["view.pointsOfInterest.centerOnContent.location","ready"]})],t.prototype,"center",null),n([m.property({type:u,dependsOn:["view.state.camera","ready"]})],t.prototype,"extent",null),n([m.property({readOnly:!0,dependsOn:["view.state.camera","ready"]})],t.prototype,"frustum",null),n([m.property({readOnly:!0,dependsOn:["view.map.initialViewProperties.viewpoint"]})],t.prototype,"hasInitialView",null),n([m.property({readOnly:!0,type:Boolean})],t.prototype,"ready",void 0),n([m.property({dependsOn:["view.pointsOfInterest.centerOnContent.distance","ready"],type:Number})],t.prototype,"scale",null),n([m.property({dependsOn:["view.state.camera","ready"]})],t.prototype,"padding",null),n([m.property({readOnly:!0,dependsOn:["view.width","view.height","padding"]})],t.prototype,"screenCenter",null),n([m.property({constructOnly:!0})],t.prototype,"view",void 0),n([m.property({type:o,dependsOn:["camera","ready"]})],t.prototype,"viewpoint",null),n([m.property({type:Number,dependsOn:["scale"]})],t.prototype,"zoom",null),t=n([m.subclass("esri.views.3d.state.ViewStateManager")],t)}(m.declared(s));t.ViewStateManager=B;var H=["camera","viewpoint","extent","scale","center","zoom"],U=[{propertyName:"camera",overrides:["viewpoint"]},{propertyName:"viewpoint",overrides:["extent"]},{propertyName:"extent",overrides:["center","scale"]},{propertyName:"scale",overrides:["zoom"]},{propertyName:"center",overrides:[]},{propertyName:"zoom",overrides:[]},{propertyName:"padding",overrides:[]}],V={heading:0,tilt:0},z=new a,E=new G,j=C.vec4d.create(),F="pending-initial-view";t.default=B});