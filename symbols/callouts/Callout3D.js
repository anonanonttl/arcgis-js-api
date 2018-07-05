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

define(["require","exports","../../core/tsSupport/assignHelper","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/JSONSupport","../../core/accessorSupport/decorators"],function(e,r,t,o,p,n,i){return function(e){function r(r){var t=e.call(this)||this;return t.visible=!0,t}return o(r,e),r.prototype.normalizeCtorArgs=function(e){if(e&&e.type){var r=t({},e);return delete r.type,r}return e},r.prototype.clone=function(){},p([i.property({type:String,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],r.prototype,"type",void 0),p([i.property({readOnly:!0})],r.prototype,"visible",void 0),r=p([i.subclass("esri.symbols.callouts.Callout3D")],r)}(i.declared(n))});