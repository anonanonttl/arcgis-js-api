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

define(["require","exports","../../../../../core/tsSupport/assignHelper","@dojo/shim/Map","../../../../../core/Logger","../../../../../core/libs/gl-matrix/mat2d","../../../../../core/libs/gl-matrix/vec2","../definitions","./CollisionBucket","../util/iterator","../../../../2d/tiling/TileKey","../../../../3d/support/mathUtils","../../../../vectorTiles/GeometryUtils"],function(e,t,o,i,r,n,s,l,a,c,h,u,f){Object.defineProperty(t,"__esModule",{value:!0});var g=r.getLogger("esri/views/2d/engine/webgl/collisions/CollisionEngine"),_=l.TILE_SIZE/l.COLLISION_BUCKET_SIZE,d=_,m=function(){function e(e){this._layers=new i.default,this._collisionBuckets=new i.default,this._v3Buf1=s.create(),this._v3Buf2=s.create(),this._mat2dBuf=n.create(),this._tileInfo=e}return e.prototype.registerLayer=function(e,t){if(e&&!this._layers.has(e.uid)){var o=this._createInfo(t,e.labelingInfo);this._layers.set(e.uid,o),this._collisionBuckets.forEach(function(e){return e.onRegisterLayer(o.index)})}},e.prototype.unregisterLayer=function(e){var t=this;if(e&&this._layers.has(e.uid)){var o=this._layers.get(e.uid);this._deleteInfo(o),this._layers.delete(e.uid),this._collisionBuckets.forEach(function(e,i){var r=e.getTile(o.index);r&&(r.dirty=!1,e.onUnregisterLayer(o.index),e.canDelete()&&t._collisionBuckets.delete(i))})}},e.prototype.addTile=function(e,t){var o=t.key.id;if(this._layers.has(e)){this._collisionBuckets.has(o)||this._collisionBuckets.set(o,new a.default(this._layers.size));this._collisionBuckets.get(o).getTile(this._getIndex(e)).reference=t}},e.prototype.removeTile=function(e,t){if(this._layers.has(e)&&this._collisionBuckets.has(t)){this._collisionBuckets.get(t).getTile(this._getIndex(e)).reference=null}},e.prototype.run=function(e,t){var o=[],i=h.pool.acquire(0,0,0,0);c.forEachIter(this._collisionBuckets.keys(),function(e){i.set(e),i.level===t&&o.push(e)}),h.pool.release(i),o=h.sort(o);for(var r=e.state.rotation,n=this._checkRotation(r),s=0,l=o;s<l.length;s++){var a=l[s];this._computeNeighbors(a)}for(var u=0,f=o;u<f.length;u++){var a=f[u];n=n||this._collisionBuckets.get(a).isDirty;for(var g=0;g<this._layers.size;g++){var _=this._getCollisionInfo(g);this._resetCollisionBucket(_,a,e,n)}}for(var d=0,m=o;d<m.length;d++)for(var a=m[d],g=0;g<this._layers.size;g++){var p=this._getCollisionInfo(g).zoomRanges;this._runCollisionBucket(g,a,t,!!r,p)}for(var v=0,y=o;v<y.length;v++){var a=y[v];this._cleanCollisionBucket(a)}},e.prototype._computeNeighbors=function(e){var t=this._collisionBuckets.get(e),o=h.from(e);t.neighbors=[this._getNeighboringBucket(o,-1,-1),this._getNeighboringBucket(o,0,-1),this._getNeighboringBucket(o,1,-1),this._getNeighboringBucket(o,-1,0),t,this._getNeighboringBucket(o,1,0),this._getNeighboringBucket(o,-1,1),this._getNeighboringBucket(o,0,1),this._getNeighboringBucket(o,1,1)]},e.prototype._getNeighboringBucket=function(e,t,o){var i=e.col+t,r=e.row+o,n=e.level,s=e.world,l=h.getId(n,r,i,s);return this._collisionBuckets.has(l)?this._collisionBuckets.get(l):null},e.prototype._checkRotation=function(e){if(!this._lastRotation)return this._lastRotation=e,!1;var t=e!==this._lastRotation;return this._lastRotation=e,t},e.prototype._collectCollisionInfos=function(){var e=[];return c.forEachIter(this._layers.values(),function(t){return e.push(t)}),e},e.prototype._createInfo=function(e,t){for(var o=this,i=this._collectCollisionInfos().sort(function(e,t){return e.order-t.order}),r=!1,n=-1,s=0,l=i;s<l.length;s++){var a=l[s];!r&&a.order>e&&(n=a.index,r=!0),r&&a.index++}return r||(n=i.length),{index:n,order:e,zoomRanges:t.map(function(e){return o._convertLabelClass(e)})}},e.prototype._convertLabelClass=function(e){var t=!!e.minScale,o=!!e.maxScale,i=t&&this._tileInfo.scaleToZoom(e.minScale)||0,r=o&&this._tileInfo.scaleToZoom(e.maxScale)||255;return{minZoom:Math.floor(10*i),maxZoom:Math.floor(10*r)}},e.prototype._deleteInfo=function(e){for(var t=e.order,o=this._collectCollisionInfos().sort(function(e,t){return e.order-t.order}),i=!1,r=0,n=o;r<n.length;r++){var s=n[r];s.order>t&&(i=!0),i&&s.index--}},e.prototype._resetCollisionBucket=function(e,t,o,i){var r=this._collisionBuckets.get(t),s=r.getTile(e.index);if(!s)return!1;var l=s.reference;if(!l)return!1;var a=this._v3Buf1,c=this._mat2dBuf,h=o.state;if(h.toScreen(a,l.coords),l.tileTransform.screenCoord[0]=a[0],l.tileTransform.screenCoord[1]=a[1],n.identity(c),n.rotate(c,c,h.rotation*f.C_DEG_TO_RAD),l.tileTransform.screenTransform.set(c),i&&(l.isDirty=!0),!l.isDirty)return!1;for(var u=0,g=l.displayObjects;u<g.length;u++)for(var _=g[u],d=0,m=_.metrics;d<m.length;d++){var p=m[d];p.maxZoom=0}return!0},e.prototype._runCollisionBucket=function(e,t,o,i,r){var n=this._collisionBuckets.get(t),s=n.getTile(e);if(s){var l=s.reference;if(l&&l.isDirty)for(var a=0;a<l.displayObjects.length;a++)for(var c=l.displayObjects[a],h=c.id,u=0;u<c.metrics.length;u++){var f=c.metrics[u],g=r[f.index],_=this._computeLabelVisibility(e,a,u,h,n,s,c,c.anchor,f,o,l,i,g);f.minZoom=_,f.maxZoom=g.maxZoom,l.setVisibilityRange(h,u,f.minZoom,f.maxZoom)}}},e.prototype._cleanCollisionBucket=function(e){this._collisionBuckets.get(e).clean()},e.prototype._computeLabelVisibility=function(e,t,o,i,r,n,l,a,c,h,u,f,g){for(var m=g.minZoom,p=u.tileTransform.screenTransform,v=f?s.transformMat2d(this._v3Buf1,a,p):a,y=c.bounds.center,b=u.tileTransform.screenCoord,B=v[0]+y[0]+b[0],k=v[1]+y[1]+b[1],x=l.xBucket,T=l.yBucket,I=l.xOverflow,C=l.yOverflow,L=x-I,Z=x+I+1,M=T-C,N=T+C+1,O=M;O<N;O++)for(var R=L;R<Z;R++)if(!(R<-_||O<-d||R>_||O>d))for(var E=0;E<=e;E++){var S=e===E,w=this._getRelativeSubBucket(E,r,u,R,O);if(w)for(var D=w.bucket,j=w.neighborTile,z=0,U=D;z<U.length;z++){var A=U[z];S&&A.id===i||(m=Math.max(this._compareLabelToDisplayObject(i,c,B,k,A,h,j,f,g),m))}}return m},e.prototype._getRelativeSubBucket=function(e,t,o,i,r){var n=u.sign(Math.floor(i/4)),s=u.sign(Math.floor(r/4)),l=this._getNeighboringTile(e,t,o,n,s);return l&&l.index?{bucket:l.index[r-4*s][i-4*n],neighborTile:l.reference}:null},e.prototype._getNeighboringTile=function(e,t,o,i,r){var n=1+r,s=1+i,l=3*n+s,a=t.neighbors[l],c=a&&a.getTile(e);return c&&c.reference&&c.reference.hasData?c:null},e.prototype._compareLabelToDisplayObject=function(e,t,o,i,r,n,a,c,h){for(var u=h.minZoom,f=10*(n+l.COLLISION_MAX_ZOOM_DELTA),g=a.tileTransform.screenTransform,_=c?s.transformMat2d(this._v3Buf2,r.anchor,g):r.anchor,d=0,m=r.metrics;d<m.length;d++){var p=m[d];if(p.maxZoom&&!(p.minZoom>f||u>=p.maxZoom)){var v=p.bounds.center,y=a.tileTransform.screenCoord,b=_[0]+v[0]+y[0],B=_[1]+v[1]+y[1],k=this._updateMinZoom(o,i,t.bounds,b,B,p.bounds),x=Math.min(Math.max(Math.ceil(10*(k+n)),0),255);if(!(p.minZoom>=x)){if(x>=255){u=255;break}u=Math.max(u,x)}}}return u},e.prototype._updateMinZoom=function(e,t,o,i,r,n){var s=Math.abs(i-e),l=Math.abs(r-t),a=(n.width+o.width)/2,c=a/s,h=(n.height+o.height)/2,f=h/l,g=Math.min(c,f);return u.log2(g)},e.prototype.onLabelsRendered=function(){this._collisionBuckets.forEach(function(e){e.onLabelsRendered()})},e.prototype._getIndex=function(e){return this._layers.get(e).index},e.prototype._getCollisionInfo=function(e){for(var t=this._collectCollisionInfos(),o=0,i=t;o<i.length;o++){var r=i[o];if(r.index===e)return r}return g.error("Tried to get a LayerCollisionInfo for an index that doesn't exist!"),null},e}();t.default=m});