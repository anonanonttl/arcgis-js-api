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

define(["require","exports","../lib/glMatrix"],function(e,t,r){function c(e,t){var c=e.data,i=e.strideIdx,v=c.length/i;if(!(v<=0)){var s=new K(e);r.vec3d.add(s.minProj,s.maxProj,P),r.vec3d.scale(P,.5),r.vec3d.subtract(s.maxProj,s.minProj,j);var o=b(j),n=new L;n.quality=o,v<14&&(e={data:new Float64Array(s.buffer,112,42),size:3,offsetIdx:0,strideIdx:3});var m=r.vec3d.create(),x=r.vec3d.create(),I=r.vec3d.create(),z=r.vec3d.create(),V=r.vec3d.create(),N=r.vec3d.create(),y=r.vec3d.create();switch(a(s,e,y,m,x,I,z,V,N,n,t)){case 1:return void h(P,j,t);case 2:return void u(e,z,t)}d(e,y,m,x,I,z,V,N,n,t),f(e,n.b0,n.b1,n.b2,R,k);var F=r.vec3d.create();r.vec3d.subtract(k,R,F),n.quality=b(F),n.quality<o?l(n.b0,n.b1,n.b2,R,k,F,t):h(P,j,t)}}function a(e,t,c,a,d,s,n,m,h,u,f){return i(e,a,d),r.vec3d.dist2(a,d)<x?1:(r.vec3d.subtract(a,d,n),r.vec3d.normalize(n),v(t,a,n,s)<x?2:(r.vec3d.subtract(d,s,m),r.vec3d.normalize(m),r.vec3d.subtract(s,a,h),r.vec3d.normalize(h),r.vec3d.cross(m,n,c),r.vec3d.normalize(c),o(t,c,n,m,h,u),0))}function d(e,t,c,a,d,i,v,n,m,h){s(e,t,c,a,d,I,z),void 0!==I[0]&&(r.vec3d.subtract(I,c,V),r.vec3d.normalize(V),r.vec3d.subtract(I,a,N),r.vec3d.normalize(N),r.vec3d.subtract(I,d,y),r.vec3d.normalize(y),r.vec3d.cross(N,i,F),r.vec3d.normalize(F),r.vec3d.cross(y,v,g),r.vec3d.normalize(g),r.vec3d.cross(V,n,q),r.vec3d.normalize(q),o(e,F,i,N,V,m),o(e,g,v,y,N,m),o(e,q,n,V,y,m)),void 0!==z[0]&&(r.vec3d.subtract(z,c,V),r.vec3d.normalize(V),r.vec3d.subtract(z,a,N),r.vec3d.normalize(N),r.vec3d.subtract(z,d,y),r.vec3d.normalize(y),r.vec3d.cross(N,i,F),r.vec3d.normalize(F),r.vec3d.cross(y,v,g),r.vec3d.normalize(g),r.vec3d.cross(V,n,q),r.vec3d.normalize(q),o(e,F,i,N,V,m),o(e,g,v,y,N,m),o(e,q,n,V,y,m))}function i(e,t,c){for(var a=r.vec3d.dist2(e.maxVert[0],e.minVert[0]),d=0,i=1;i<7;++i){var v=r.vec3d.dist2(e.maxVert[i],e.minVert[i]);v>a&&(a=v,d=i)}r.vec3d.set(e.minVert[d],t),r.vec3d.set(e.maxVert[d],c)}function v(e,t,c,a){for(var d=e.data,i=e.offsetIdx,v=e.strideIdx,s=Number.NEGATIVE_INFINITY,o=0,n=i;n<d.length;n+=v){r.vec3d.set3(d[n]-t[0],d[n+1]-t[1],d[n+2]-t[2],M);var m=c[0]*M[0]+c[1]*M[1]+c[2]*M[2],h=r.vec3d.length2(c),u=r.vec3d.length2(M)-m*m/h;u>s&&(s=u,o=n)}return r.vec3d.set3(d[o],d[o+1],d[o+2],a),s}function s(e,t,c,a,d,i,v){m(e,t,T,v,i);var s=r.vec3.dot(c,t);T[1]-x<=s&&(i[0]=void 0),T[0]+x>=s&&(v[0]=void 0)}function o(e,t,c,a,d,i){if(!(r.vec3d.length2(t)<x)){r.vec3d.cross(c,t,w),r.vec3d.cross(a,t,A),r.vec3d.cross(d,t,E),n(e,t,T),p[1]=T[0],_[1]=T[1],Y[1]=_[1]-p[1];for(var v=[c,a,d],s=[w,A,E],o=0;o<3;++o){n(e,v[o],T),p[0]=T[0],_[0]=T[1],n(e,s[o],T),p[2]=T[0],_[2]=T[1],Y[0]=_[0]-p[0],Y[2]=_[2]-p[2];var m=b(Y);m<i.quality&&(r.vec3d.set(v[o],i.b0),r.vec3d.set(t,i.b1),r.vec3d.set(s[o],i.b2),i.quality=m)}}}function n(e,t,r){var c=e.data,a=e.offsetIdx,d=e.strideIdx;r[0]=Number.POSITIVE_INFINITY,r[1]=Number.NEGATIVE_INFINITY;for(var i=a;i<c.length;i+=d){var v=c[i]*t[0]+c[i+1]*t[1]+c[i+2]*t[2];r[0]=Math.min(r[0],v),r[1]=Math.max(r[1],v)}}function m(e,t,c,a,d){var i=e.data,v=e.offsetIdx,s=e.strideIdx;r.vec3d.set3(i[v],i[v+1],i[v+2],a),r.vec3d.set(a,d),c[0]=r.vec3d.dot(O,t),c[1]=c[0];for(var o=v+s;o<i.length;o+=s){r.vec3d.set3(i[o],i[o+1],i[o+2],O);var n=r.vec3d.dot(O,t);n<c[0]&&(c[0]=n,r.vec3d.set(O,a)),n>c[1]&&(c[1]=n,r.vec3d.set(O,d))}}function h(e,t,c){r.vec3d.set(e,c.center),r.vec3d.scale(t,.5,c.halfSize),r.quat4.identity(c.quaternion)}function u(e,t,c){r.vec3d.set(t,S),Math.abs(t[0])>Math.abs(t[1])&&Math.abs(t[0])>Math.abs(t[2])?S[0]=0:Math.abs(t[1])>Math.abs(t[2])?S[1]=0:S[2]=0,r.vec3d.length2(S)<x&&(S[0]=S[1]=S[2]=1),r.vec3d.cross(t,S,B),r.vec3d.normalize(B),r.vec3d.cross(t,B,G),r.vec3d.normalize(G),f(e,t,B,G,R,k),r.vec3d.subtract(k,R,C),l(t,B,G,R,k,C,c)}function f(e,t,r,c,a,d){n(e,t,T),a[0]=T[0],d[0]=T[1],n(e,r,T),a[1]=T[0],d[1]=T[1],n(e,c,T),a[2]=T[0],d[2]=T[1]}function l(e,t,c,a,d,i,v){H[0]=e[0],H[3]=e[1],H[6]=e[2],H[1]=t[0],H[4]=t[1],H[7]=t[2],H[2]=c[0],H[5]=c[1],H[8]=c[2],r.quat4.fromRotationMatrix(H,v.quaternion),r.vec3d.add(a,d,J),r.vec3d.scale(J,.5),r.vec3d.scale(e,J[0],v.center),r.vec3d.scale(t,J[1],D),r.vec3d.add(v.center,D),r.vec3d.scale(c,J[2],D),r.vec3d.add(v.center,D),r.vec3d.scale(i,.5,v.halfSize)}function b(e){return e[0]*e[1]+e[0]*e[2]+e[1]*e[2]}Object.defineProperty(t,"__esModule",{value:!0});var x=1e-6,P=r.vec3d.create(),j=r.vec3d.create();t.computeOBB=c;var I=r.vec3d.create(),z=r.vec3d.create(),V=r.vec3d.create(),N=r.vec3d.create(),y=r.vec3d.create(),F=r.vec3d.create(),g=r.vec3d.create(),q=r.vec3d.create(),M=r.vec3d.create(),T=r.vec2d.create(),w=r.vec3d.create(),A=r.vec3d.create(),E=r.vec3d.create(),_=r.vec3d.create(),p=r.vec3d.create(),Y=r.vec3d.create(),O=r.vec3d.create(),S=r.vec3d.create(),B=r.vec3d.create(),G=r.vec3d.create(),R=r.vec3d.create(),k=r.vec3d.create(),C=r.vec3d.create(),D=r.vec3d.create(),H=r.mat3d.create(),J=r.vec3d.create(),K=function(){function e(e){this.minVert=[],this.maxVert=[];this.buffer=new ArrayBuffer(448);var t=0;for(this.minProj=new Float64Array(this.buffer,t,7),t+=56,this.maxProj=new Float64Array(this.buffer,t,7),t+=56;this.minVert.length<7;)this.minVert.push(new Float64Array(this.buffer,t,3)),t+=24;for(;this.maxVert.length<7;)this.maxVert.push(new Float64Array(this.buffer,t,3)),t+=24;for(var c=0;c<7;++c)this.minProj[c]=Number.POSITIVE_INFINITY,this.maxProj[c]=Number.NEGATIVE_INFINITY;for(var a=[],d=[],i=e.data,v=e.offsetIdx,s=e.strideIdx,c=v;c<i.length;c+=s){var o=i[c];o<this.minProj[0]&&(this.minProj[0]=o,a[0]=c),o>this.maxProj[0]&&(this.maxProj[0]=o,d[0]=c),o=i[c+1],o<this.minProj[1]&&(this.minProj[1]=o,a[1]=c),o>this.maxProj[1]&&(this.maxProj[1]=o,d[1]=c),o=i[c+2],o<this.minProj[2]&&(this.minProj[2]=o,a[2]=c),o>this.maxProj[2]&&(this.maxProj[2]=o,d[2]=c),o=i[c]+i[c+1]+i[c+2],o<this.minProj[3]&&(this.minProj[3]=o,a[3]=c),o>this.maxProj[3]&&(this.maxProj[3]=o,d[3]=c),o=i[c]+i[c+1]-i[c+2],o<this.minProj[4]&&(this.minProj[4]=o,a[4]=c),o>this.maxProj[4]&&(this.maxProj[4]=o,d[4]=c),o=i[c]-i[c+1]+i[c+2],o<this.minProj[5]&&(this.minProj[5]=o,a[5]=c),o>this.maxProj[5]&&(this.maxProj[5]=o,d[5]=c),o=i[c]-i[c+1]-i[c+2],o<this.minProj[6]&&(this.minProj[6]=o,a[6]=c),o>this.maxProj[6]&&(this.maxProj[6]=o,d[6]=c)}for(var c=0;c<7;++c){var n=a[c];r.vec3d.set3(i[n],i[n+1],i[n+2],this.minVert[c]),n=d[c],r.vec3d.set3(i[n],i[n+1],i[n+2],this.maxVert[c])}}return e}(),L=function(){function e(){this.b0=r.vec3d.createFrom(1,0,0),this.b1=r.vec3d.createFrom(0,1,0),this.b2=r.vec3d.createFrom(0,0,1),this.quality=0}return e}()});