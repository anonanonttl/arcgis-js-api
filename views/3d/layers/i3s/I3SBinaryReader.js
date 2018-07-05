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

define(["require","exports","../../../../core/Error","../../../../core/lang","../../../../core/Logger","./LEPCC"],function(e,t,r,n,a,u){function o(e,t,n){for(var a="",u=0;u<n;){var o=e[t+u];if(o<128)a+=String.fromCharCode(o),u++;else if(o>=192&&o<224){if(u+1>=n)throw new r("utf8-decode-error","UTF-8 Decode failed. Two byte character was truncated.");var i=e[t+u+1],f=(31&o)<<6|63&i;a+=String.fromCharCode(f),u+=2}else if(o>=224&&o<240){if(u+2>=n)throw new r("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");var i=e[t+u+1],l=e[t+u+2],f=(15&o)<<12|(63&i)<<6|63&l;a+=String.fromCharCode(f),u+=3}else{if(!(o>=240&&o<248))throw new r("utf8-decode-error","UTF-8 Decode failed. Invalid multi byte sequence.");if(u+3>=n)throw new r("utf8-decode-error","UTF-8 Decode failed. Multi byte character was truncated.");var i=e[t+u+1],l=e[t+u+2],y=e[t+u+3],f=(7&o)<<18|(63&i)<<12|(63&l)<<6|63&y;if(f>=65536){var s=55296+(f-65536>>10),c=56320+(1023&f);a+=String.fromCharCode(s,c)}else a+=String.fromCharCode(f);u+=4}}return a}function i(e,r){for(var n={byteOffset:0,byteCount:0,fields:Object.create(null)},a=0,u=0;u<r.length;u++){var o=r[u],i=o.valueType||o.type,f=t.valueType2ArrayBufferReader[i];n.fields[o.property]=f(e,a),a+=t.valueType2TypedArrayClassMap[i].BYTES_PER_ELEMENT}return n.byteCount=a,n}function f(e,t,n){var a,u,i=[],f=0;for(u=0;u<e;u+=1){if((a=t[u])>0){if(i.push(o(n,f,a-1)),0!==n[f+a-1])throw new r("string-array-error","Invalid string array: missing null termination.")}else i.push(null);f+=a}return i}function l(e,r){return new(0,t.valueType2TypedArrayClassMap[r.valueType])(e,r.byteOffset,r.count*r.valuesPerElement)}function y(e,t){return new Uint8Array(e,t.byteOffset,t.byteCount)}function s(e,t,a){for(var u=null!=t.header?i(e,t.header):{byteOffset:0,byteCount:0,fields:{count:a}},o={header:u,byteOffset:u.byteCount,byteCount:0,entries:Object.create(null)},f=u.byteCount,l=0;l<t.ordering.length;l++){var y=t.ordering[l],s=n.clone(t[y]);if(s.count=u.fields.count,"String"===s.valueType){if(s.byteOffset=f,s.byteCount=u.fields[y+"ByteCount"],"UTF-8"!==s.encoding)throw new r("unsupported-encoding","Unsupported String encoding.",{encoding:s.encoding})}else{if(!g(s.valueType))throw new r("unsupported-value-type","Unsupported binary valueType",{valueType:s.valueType});var c=v(s.valueType);f+=f%c!=0?c-f%c:0,s.byteOffset=f,s.byteCount=c*s.valuesPerElement*s.count}f+=s.byteCount,o.entries[y]=s}return o.byteCount=f-o.byteOffset,o}function c(e,t,n){if(t!==e&&p.error("Invalid "+n+" buffer size\n expected: "+e+", actual: "+t+")"),t<e)throw new r("buffer-too-small","Binary buffer is too small",{expectedSize:e,actualSize:t})}function d(e,t,r){var a=i(e,t&&t.header),u=a.byteCount,o={header:a,byteOffset:a.byteCount,byteCount:0,vertexAttributes:n.clone(t.vertexAttributes)},f=o.vertexAttributes;r||null==f.region||delete f.region;for(var l=a.fields,y=null!=l.vertexCount?l.vertexCount:l.count,s=0;s<t.ordering.length;s++){var d=t.ordering[s];null!=f[d]&&(f[d].byteOffset=u,f[d].count=y,u+=v(f[d].valueType)*f[d].valuesPerElement*y)}var b=l.faceCount;if(t.faces&&b){o.faces=n.clone(t.faces);for(var g=o.faces,s=0;s<t.ordering.length;s++){var p=t.ordering[s];null!=g[p]&&(g[p].byteOffset=u,g[p].count=b,u+=v(g[p].valueType)*g[p].valuesPerElement*b)}}var w=l.featureCount;if(t.featureAttributes&&t.featureAttributeOrder&&w){o.featureAttributes=n.clone(t.featureAttributes);for(var C=o.featureAttributes,s=0;s<t.featureAttributeOrder.length;s++){var T=t.featureAttributeOrder[s];C[T].byteOffset=u,C[T].count=w;var h=v(C[T].valueType);"UInt64"===C[T].valueType&&(h=8),u+=h*C[T].valuesPerElement*w}}return c(u,e.byteLength,"geometry"),o.byteCount=u-o.byteOffset,o}function b(e,t,n){if("lepcc-rgb"===e.encoding)return u.decodeRGB(t);if("lepcc-intensity"===e.encoding)return u.decodeIntensity(t);if(null!=e.encoding&&""!==e.encoding)throw new r("unknown-attribute-storage-info-encoding","Unknown Attribute Storage Info Encoding");e["attributeByteCounts "]&&!e.attributeByteCounts&&(p.warn("Warning: Trailing space in 'attributeByteCounts '."),e.attributeByteCounts=e["attributeByteCounts "]),"ObjectIds"===e.ordering[0]&&e.hasOwnProperty("objectIds")&&(p.warn("Warning: Case error in objectIds"),e.ordering[0]="objectIds");var a=s(t,e,n);c(a.byteOffset+a.byteCount,t.byteLength,"attribute");var o=a.entries.attributeValues||a.entries.objectIds;if(o){if("String"===o.valueType){var i=a.entries.attributeByteCounts,d=l(t,i),b=y(t,o);return f(i.count,d,b)}return l(t,o)}throw new r("bad-attribute-storage-info","Bad attributeStorageInfo specification.")}function g(e){return t.valueType2TypedArrayClassMap.hasOwnProperty(e)}function v(e){return g(e)&&t.valueType2TypedArrayClassMap[e].BYTES_PER_ELEMENT}Object.defineProperty(t,"__esModule",{value:!0});var p=a.getLogger("esri.views.3d.layers.i3s.I3SBinaryReader");t.readHeader=i,t.readStringArray=f,t.createTypedView=l,t.createRawView=y,t.createAttributeDataIndex=s,t.createGeometryDataIndex=d,t.readBinaryAttribute=b,t.valueType2TypedArrayClassMap={Float32:Float32Array,Float64:Float64Array,UInt8:Uint8Array,Int8:Int8Array,UInt16:Uint16Array,Int16:Int16Array,UInt32:Uint32Array,Int32:Int32Array},t.valueType2ArrayBufferReader={Float32:function(e,t){return new DataView(e,0).getFloat32(t,!0)},Float64:function(e,t){return new DataView(e,0).getFloat64(t,!0)},UInt8:function(e,t){return new DataView(e,0).getUint8(t)},Int8:function(e,t){return new DataView(e,0).getInt8(t)},UInt16:function(e,t){return new DataView(e,0).getUint16(t,!0)},Int16:function(e,t){return new DataView(e,0).getInt16(t,!0)},UInt32:function(e,t){return new DataView(e,0).getUint32(t,!0)},Int32:function(e,t){return new DataView(e,0).getInt32(t,!0)}},t.isValueType=g,t.getBytesPerValue=v});