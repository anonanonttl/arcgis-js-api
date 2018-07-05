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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../Color","./support/utils"],function(o,a,e,i,r){function t(o,a){var e;if(o)switch(a){case"point":case"multipoint":var r=o;e={color:new i(r.color),noDataColor:new i(r.noDataColor),outline:{color:new i(r.outline.color),width:r.outline.width},size:r.size,noDataSize:r.noDataSize,minSize:r.minSize,maxSize:r.maxSize,opacity:r.opacity||1};break;case"polyline":var t=o;e={color:new i(t.color),noDataColor:new i(t.noDataColor),width:t.width,noDataWidth:t.noDataWidth,minWidth:t.minWidth,maxWidth:t.maxWidth,opacity:t.opacity||1};break;case"polygon":var n=o,c=n.marker,l=n.background;e={marker:{color:new i(c.color),noDataColor:new i(c.noDataColor),outline:{color:new i(c.outline.color),width:c.outline.width},size:c.size,noDataSize:c.noDataSize,minSize:c.minSize,maxSize:c.maxSize},background:{color:new i(l.color),outline:{color:new i(l.outline.color),width:l.outline.width}},opacity:o.opacity||1}}return e}function n(o){var a;return o&&(a=e({},o),a.color&&(a.color=new i(a.color)),a.noDataColor&&(a.noDataColor=new i(a.noDataColor)),a.outline&&(a.outline={color:a.outline.color&&new i(a.outline.color),width:a.outline.width})),a}function c(o,a){return o.size&&(o.size=r.toWorldScale(o.size,a)),o.noDataSize&&(o.noDataSize=r.toWorldScale(o.noDataSize,a)),o.minSize&&(o.minSize=r.toWorldScale(o.minSize,a)),o.maxSize&&(o.maxSize=r.toWorldScale(o.maxSize,a)),o}function l(o,a){return o.width&&(o.width=r.toWorldScale(o.width,a)),o.noDataWidth&&(o.noDataWidth=r.toWorldScale(o.noDataWidth,a)),o.minWidth&&(o.minWidth=r.toWorldScale(o.minWidth,a)),o.maxWidth&&(o.maxWidth=r.toWorldScale(o.maxWidth,a)),o}function p(o,a){return o.marker&&(o.marker=c(o.marker,a)),o}function d(o,a){var e=w.default,i=r.getStorageType(a),t=e&&e[i];return t&&t[o]}var m=[128,128,128,1],s=[128,128,128,1],h={primary:{color:[227,139,79,1],noDataColor:m,outline:{color:[255,255,255,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[128,128,128,1],noDataColor:m,outline:{color:[255,255,255,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[255,255,255,1],noDataColor:m,outline:{color:[128,128,128,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},x={primary:{color:[227,139,79,1],noDataColor:s,outline:{color:[92,92,92,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},secondary:[{color:[178,178,178,1],noDataColor:s,outline:{color:[92,92,92,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8},{color:[26,26,26,1],noDataColor:s,outline:{color:[128,128,128,.25],width:"1px"},noDataSize:"4px",size:"12px",minSize:"8px",maxSize:"50px",opacity:.8}]},u={r:0,g:0,b:0,a:0},y={color:u,outline:{color:{r:166,g:166,b:166,a:.25},width:"1px"}},S={color:u,outline:{color:{r:153,g:153,b:153,a:.25},width:"1px"}},z={default:{name:"default",label:"Default",description:"Default theme for visualizing features by varying their size to show data.",basemapGroups:{light:["streets","gray","topo","terrain","national-geographic","oceans","osm","gray-vector","streets-vector","topo-vector","streets-relief-vector","streets-navigation-vector"],dark:["satellite","hybrid","dark-gray","dark-gray-vector","streets-night-vector"]},pointSchemes:{light:h,dark:x},lineSchemes:{light:{primary:{color:[226,119,40,1],noDataColor:m,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[77,77,77,1],noDataColor:m,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:m,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]},dark:{primary:{color:[226,119,40,1],noDataColor:s,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},secondary:[{color:[255,255,255,1],noDataColor:s,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"},{color:[153,153,153,1],noDataColor:s,noDataWidth:"1px",width:"1px",minWidth:"1px",maxWidth:"18px"}]}},polygonSchemes:{light:{primary:{marker:h.primary,background:S,opacity:h.primary.opacity},secondary:[{marker:h.secondary[0],background:S,opacity:h.secondary[0].opacity},{marker:h.secondary[1],background:S,opacity:h.secondary[1].opacity}]},dark:{primary:{marker:x.primary,background:y,opacity:x.primary.opacity},secondary:[{marker:x.secondary[0],background:y,opacity:x.secondary[0].opacity},{marker:x.secondary[1],background:y,opacity:x.secondary[1].opacity}]}}}},w={};!function(){for(var o in z){var a=z[o],e=a.basemapGroups,i=w[o]={basemaps:[].concat(e.light).concat(e.dark),point:{},polyline:{},polygon:{}};for(var r in e)for(var t=e[r],n=0;n<t.length;n++){var c=t[n];a.pointSchemes&&(i.point[c]=a.pointSchemes[r]),a.lineSchemes&&(i.polyline[c]=a.lineSchemes[r]),a.polygonSchemes&&(i.polygon[c]=a.polygonSchemes[r])}}}();var D={getThemes:function(o){var a=[];for(var e in z){var i=z[e],t=w[e],n=r.getBasemapId(o,t.basemaps);n&&-1===t.basemaps.indexOf(n)||a.push({name:i.name,label:i.label,description:i.description,basemaps:t.basemaps.slice(0)})}return a},getSchemes:function(o){if("mesh"===o.geometryType)return null;var a,e=o.geometryType,i=o.worldScale,n=o.view,c=r.getBasemapId(o.basemap,w.default.basemaps),l=d(c,e);if(l){var p=t(l.primary,e);a={primaryScheme:i?D.toWorldScale({scheme:p,view:n}):p,secondarySchemes:l.secondary.map(function(o){var a=t(o,e);return i?D.toWorldScale({scheme:a,view:n}):a}),basemapId:c}}return a},cloneScheme:function(o){var a;return o&&(a=n(o),a.marker&&(a.marker=n(a.marker)),a.background&&(a.background=n(a.background))),a},toWorldScale:function(o){if(o.scheme&&o.view){var a=o.scheme,e=o.scheme,i=o.scheme,r=null;return a.hasOwnProperty("size")?r=c(a,o.view):e.hasOwnProperty("width")?r=l(e,o.view):i.hasOwnProperty("marker")&&(r=p(i,o.view)),r}}};return D});