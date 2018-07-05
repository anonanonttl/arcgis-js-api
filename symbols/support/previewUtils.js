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

define(["require","exports"],function(a,e){function t(a){var e=.5*a;return[{type:"path",path:[{command:"M",values:[0,22*.7*.5]},{command:"L",values:[6.6,22*.7]},{command:"L",values:[6.6,22*.7+e]},{command:"L",values:[0,22*.7+e-22*.7*.5]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[6.6,22*.7]},{command:"L",values:[6.6,22*.7+e]},{command:"L",values:[22,e]},{command:"L",values:[22,0]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[6.6,0]},{command:"L",values:[22,0]},{command:"L",values:[6.6,22*.7]},{command:"L",values:[0,22*.7*.5]},{command:"Z",values:[]}]}]}function m(a,e){var t=e?20:a,m=a,p=e?4:6;t-=t<=22?.5*p:p;var L=t,n=e?.35*t:.5*t;return[{type:"path",path:[{command:"M",values:[.5*L,0]},{command:"L",values:[L,.5*n]},{command:"L",values:[.5*L,n]},{command:"L",values:[0,.5*n]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,.5*n]},{command:"L",values:[.5*L,n]},{command:"L",values:[.5*L,m]},{command:"L",values:[0,m-.5*n]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.5*L,n]},{command:"L",values:[.5*L,m]},{command:"L",values:[L,m-.5*n]},{command:"L",values:[L,.5*n]},{command:"Z",values:[]}]}]}function p(a,e){var t=e?20:a,m=a,p=e?4:6;t-=t<=22?.5*p:p;var L=.5*t,n=.15*t,l=n,c=t,o=m-n;return[{type:"ellipse",cx:.5*c,cy:o,rx:L,ry:n},{type:"path",path:[{command:"M",values:[0,l]},{command:"L",values:[0,o]},{command:"L",values:[c,o]},{command:"L",values:[c,l]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*c,cy:l,rx:L,ry:n}]}function L(a,e){var t=e?20:a,m=a,p=e?4:6;t-=t<=22?.5*p:p;var L=.5*t,n=.15*t,l=t,c=m-n;return[{type:"ellipse",cx:.5*t,cy:c,rx:L,ry:n},{type:"path",path:[{command:"M",values:[.5*l,0]},{command:"L",values:[l,c]},{command:"L",values:[0,c]},{command:"Z",values:[]}]}]}function n(a){var e=a,t=a;e-=e<22?3:6;var m=.5*e,p=.15*e,L=e;return[{type:"path",path:[{command:"M",values:[0,0]},{command:"L",values:[L,0]},{command:"L",values:[.5*L,t-p]},{command:"Z",values:[]}]},{type:"ellipse",cx:.5*e,cy:0,rx:m,ry:p}]}function l(a){var e=a,t=a;e-=e<22?2:4;var m=e,p=t,L=Math.floor(a/10)-1||1;return[{type:"path",path:[{command:"M",values:[.45*m,0]},{command:"L",values:[m,.5*p-L]},{command:"L",values:[.45*m-L,.5*p+L]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*m,0]},{command:"L",values:[.45*m-L,.5*p+L]},{command:"L",values:[0,.5*p-L]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,.5*p-L]},{command:"L",values:[.45*m-L,.5*p+L]},{command:"L",values:[.45*m,t]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*m,t]},{command:"L",values:[m,.5*p-L]},{command:"L",values:[.45*m-L,.5*p+L]},{command:"Z",values:[]}]}]}function c(a){var e=a,t=a;t-=t<22?1:2;var m=e,p=t;return[{type:"path",path:[{command:"M",values:[.45*m,0]},{command:"L",values:[m,p]},{command:"L",values:[.45*m,.6*p]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[.45*m,0]},{command:"L",values:[.45*m,.6*p]},{command:"L",values:[0,p]},{command:"Z",values:[]}]},{type:"path",path:[{command:"M",values:[0,p]},{command:"L",values:[.45*m,.6*p]},{command:"L",values:[m,p]},{command:"Z",values:[]}]}]}Object.defineProperty(e,"__esModule",{value:!0}),e.shapes={fill:[{type:"path",path:"M -10,-10 L 10,0 L 10,10 L -10,10 L -10,-10 Z"}],pathSymbol3DLayer:[{type:"path",path:"M 3,12 L 12,0 L 11,-2 L -4,5 L -1,5 L 1,7 L 3,10 L 3,12 Z"},{type:"circle",cx:-2,cy:10,r:5}],extrudeSymbol3DLayer:[{type:"path",path:"M -7,-5 L -2,0 L -2,7 L -7,3 L -7,-5 Z"},{type:"path",path:"M -2,0 L -2,7 L 10,-3 L 10,-10 L -2,0 Z"},{type:"path",path:"M -7,-5 L -2,0 L 10,-10 L -2,-10 L -7,-5 Z"}],cone:[{type:"path",path:"M 0,-10 L -8,5 L -4,6.5 L 0,7 L 4,6.5 L 8,5 Z"}],tallCone:[{type:"path",path:"M 0,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 0,-9 Z"}],invertedCone:[{type:"path",path:"M 0,7 L -8,-8 L 8,-8 Z"},{type:"path",path:"M -8,-8 L -4,-9.5 L 0,-10 L 4,-9.5 L 8,-8 L 4,-6.5 L 0,-6 L -4,-6.5 Z"}],cube:[{type:"path",path:"M -10,-7 L 0,-12 L 10,-7 L 0,-2 L -10,-7 Z"},{type:"path",path:"M -10,-7 L 0,-2 L 0,12 L -10,7 L -10,-7 Z"},{type:"path",path:"M 0,-2 L 10,-7 L 10,7 L 0,12 L 0,-2 Z"}],tallCube:[{type:"path",path:"M -3.5,-8.5 L 0,-9.5 L 3.5,-8.5 L 0,-7.5 L -3.5,-8.5 Z"},{type:"path",path:"M -3.5,-8.5 L 0,-7.5 L 0,9 L -3.5,8 L -3.5,-8.5 Z"},{type:"path",path:"M 0,-7.5 L 3.5,-8.5 L 3.5,8 L 0,9 L 0,-7.5 Z"}],cylinder:[{type:"path",path:"M -8,-9 L -8,7 L -4,8.5 L 0,9 L 4,8.5 L 8,7 L 8,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:8,ry:2}],tallCylinder:[{type:"path",path:"M -3.5,-9 L -3.5,7 L -1.5,7.8 L 0,8 L 1.5,7.8 L 3.5,7 L 3.5,-9 Z"},{type:"ellipse",cx:0,cy:-9,rx:3.5,ry:1}],diamond:[{type:"path",path:"M 0,-10 L 10,-1 L -1,1 L 0,-10 Z"},{type:"path",path:"M 0,-10 L -1,1 L -8,-1 L 0,-10 Z"},{type:"path",path:"M -1,1 L 0,10 L -8,-1 L -1,1 Z"},{type:"path",path:"M -1,0 L 0,10 L 10,-1 L -1,1 Z"}],tetrahedron:[{type:"path",path:"M 0,-10 L 10,7 L 0,0 L 0,-10 Z"},{type:"path",path:"M 0,-10 L 0,0 L -8,7 L 0,-10 Z"},{type:"path",path:"M 10,7 L 0,0 L -8,7 L 10,7 Z"}]},e.getExtrudeSymbolShapes=t,e.getCubeShapes=m,e.getCylinderShapes=p,e.getConeShapes=L,e.getInvertedConeShapes=n,e.getDiamondShapes=l,e.getTetrahedronShapes=c});