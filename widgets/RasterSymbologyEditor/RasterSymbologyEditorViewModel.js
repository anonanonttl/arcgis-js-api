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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","dojo/i18n!./nls/RasterSymbologyEditor","../../core/Accessor","../../core/colorUtils","../../core/lang","../../core/promiseUtils","../../core/accessorSupport/decorators","../../layers/support/RasterFunction"],function(e,t,r,a,o,n,i,s,l,u,d){return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.renderParameters={},t.stretchTypes=[{name:"none",filterType:0},{name:"minMax",filterType:5},{name:"percentClip",filterType:6},{name:"standardDeviation",filterType:3}],t._cachedKeyProperties={},t._defaultRenderParameters={minPercent:2,maxPercent:2,discreteNColors:256,uniqueValuesColorRampId:"uniqueValueColorRamp_default",uniqueValueColorRampType:"multipart",colorRamp:"blackToWhite_predefined",numberOfStandardDeviations:2,gamma:1.1,dra:!0,uniqueValueField:"Value",selectedBand:0},t}r(t,e),n=t,t.prototype.getSymbologyTypes=function(){var e=[n.SymbologyTypes.none,n.SymbologyTypes.stretch],t=this.layer,r=t.bandCount,a=t.hasRasterAttributeTable,o=t.pixelType;return r>=3&&e.push(n.SymbologyTypes.rgb),a&&1===r&&e.push(n.SymbologyTypes.uniqueValue),1===r&&o&&"u8"===o.toLowerCase()&&e.push(n.SymbologyTypes.discrete),e},t.prototype.isStretchColorRampApplicable=function(e){return e!==this.getStretchFilterType(n.StretchTypeNames.none)||this.layer.pixelType&&"u8"===this.layer.pixelType.toLowerCase()},t.prototype.getStretchFilterType=function(e){var t=0;return this.stretchTypes.some(function(r){if(r.name===e)return t=r.filterType,!0}),t},t.prototype.getDefaultRenderParameters=function(){var e={},t=this.layer;if(this.layer){var r,a,o=this._getRenderingRuleArguments("stretch")||{},i=this._getRenderingRuleArguments("colormap")||{},s={},l=this.layer.pixelType&&"u8"!==this.layer.pixelType.toLowerCase()?n.StretchTypeNames.minMax:n.StretchTypeNames.none;return this.stretchTypes.some(function(e){if(e.name===l)return a=e.filterType,!0}),e.symbologyType=this._getDefaultSymbologyType(),e.selectedBand=this._defaultRenderParameters.selectedBand,e.stretchType=o.stretchType||a,e.minPercent=o.MinPercent||this._defaultRenderParameters.minPercent,e.maxPercent=o.MaxPercent||this._defaultRenderParameters.maxPercent,e.numberOfStandardDeviations=o.NumberOfStandardDeviations||this._defaultRenderParameters.numberOfStandardDeviations,e.gamma=o.Gamma||this._defaultRenderParameters.gamma,e.dra=o.DRA||this._defaultRenderParameters.dra,e.colorRamp=i.colorRamp||this._defaultRenderParameters.colorRamp,t.bandIds&&(e.bandIds=t.bandIds),t.hasRasterAttributeTable&&t.rasterAttributeTable&&t.rasterAttributeTable.features&&t.rasterAttributeTable.features.length&&t.rasterAttributeTable.features[0].attributes.Red&&t.rasterAttributeTable.features[0].attributes.Green&&t.rasterAttributeTable.features[0].attributes.Blue&&(s.id=this._defaultRenderParameters.uniqueValuesColorRampId,s.type=this._defaultRenderParameters.uniqueValueColorRampType,s.colorRamps=[],t.rasterAttributeTable.features.forEach(function(e){r=e.attributes,s.colorRamps.push({fromColor:[r.Red,r.Green,r.Blue],toColor:[r.Red,r.Green,r.Blue]})}),e.uniqueValuesColorRamp=s,e.uniqueValuesField=t.rasterAttributeTable.features[0].attributes.Value?this._defaultRenderParameters.uniqueValueField:null),t.bandCount&&1===t.bandCount&&t.pixelType&&"u8"===t.pixelType.toLowerCase()&&(e.discreteNColors=this._defaultRenderParameters.discreteNColors,e.discreteColorRamp=this._defaultRenderParameters.colorRamp),e}},t.prototype.getUniqueValueFields=function(){if(this.layer.hasRasterAttributeTable&&this.layer.rasterAttributeTable&&this.layer.rasterAttributeTable.fields&&this.layer.rasterAttributeTable.fields.length)return this.layer.rasterAttributeTable.fields.filter(function(e){if("esriFieldTypeOID"!==e.type)return!0})},t.prototype.getBandData=function(){var e=this;if(this.layer){var t,r,a=this.layer.bandCount,o=this.layer.id;return!this._cachedKeyProperties[o]&&a>1?this.layer.fetchKeyProperties().then(function(a){return e._cachedKeyProperties[o]=a,t=e._createBandLists(),r=e._getBandCombinationPresets(),{presets:r,lists:t}}):(t=this._createBandLists(),r=this._getBandCombinationPresets(),l.resolve({lists:t,presets:r}))}},t.prototype.getUniqueValueGridData=function(e,t){var r=this;if(this.layer.hasRasterAttributeTable&&this.layer.rasterAttributeTable&&e&&t){var a=this.layer.rasterAttributeTable.features,o=e.colorRamps?e.colorRamps.length:1,n=[],i=[];a=this._sortFeatures(a,t);var s,l,u,d,p,y=0,c=0;for(c=0;c<o;c++)n[c]={},n[c].start=y,n[c].end=y+1/o,y=n[c].end;return a.forEach(function(t,o){d=(o+.5)/a.length,n.forEach(function(a,o){d>=a.start&&d<a.end&&(p=(d-a.start)/(a.end-a.start),n.length>1?(s=r._getColorRGB(e.colorRamps[o].fromColor),l=r._getColorRGB(e.colorRamps[o].toColor)):(s=r._getColorRGB(e.fromColor),l=r._getColorRGB(e.toColor)),u=r._interpolateLab(s,l,p),i.push({esriRasterSymbologyEditorUniqueValueSymbol:r._correctRgbLimits(u),esriRasterSymbologyEditorUniqueValueValue:t.value,pixelValues:t.pixelValues,id:o+1}))})}),i}},t.prototype.updateRendering=function(e){e.symbologyType&&(e.symbologyType===n.SymbologyTypes.none?this._clearRendering():e.symbologyType===n.SymbologyTypes.stretch?this._applyStretchSingleBand(e):e.symbologyType===n.SymbologyTypes.rgb?this._applyStretchRgb(e):e.symbologyType!==n.SymbologyTypes.uniqueValue&&e.symbologyType!==n.SymbologyTypes.discrete||this._applyColormap(e))},t.prototype._sortFeatures=function(e,t){if(e&&t){e=s.clone(e);var r=[];return e.sort(function(e,r){return"string"==typeof e.attributes[t]?e.attributes[t]<r.attributes[t]?-1:1:e.attributes[t]-r.attributes[t]}),e.forEach(function(a,o){o>0&&a.attributes[t]===e[o-1].attributes[t]?r[r.length-1].pixelValues.push(a.attributes.Value):r.push({value:a.attributes[t],pixelValues:[a.attributes.Value]})}),r}},t.prototype._getDefaultSymbologyType=function(){if(this.layer&&this.layer.renderingRule&&this.layer.renderingRule.functionName){var e=this.layer.renderingRule,t=e.functionName,r=e.functionArguments;return t.toLowerCase()===n.RenderingRuleTypeNames.extractband||t.toLowerCase()===n.RenderingRuleTypeNames.stretch&&this.layer.bandCount&&1===this.layer.bandCount||t.toLowerCase()===n.RenderingRuleTypeNames.colormap&&r&&r.colorRamp&&this.layer.bandCount&&1===this.layer.bandCount?n.SymbologyTypes.stretch:this.layer.bandCount>=3&&t.toLowerCase()===n.RenderingRuleTypeNames.stretch?n.SymbologyTypes.rgb:n.SymbologyTypes.none}return n.SymbologyTypes.none},t.prototype._getRenderingRuleArguments=function(e){if(this.layer&&this.layer.renderingRule&&e){var t=this.layer.renderingRule;return t.functionName&&t.functionName.toLowerCase()===e?t.functionArguments:t.functionArguments&&t.functionArguments.Raster&&t.functionArguments.Raster.functionName&&t.functionArguments.Raster.functionName===e?t.functionArguments.Raster.functionArguments:null}},t.prototype._getBandCombinationPresets=function(){var e=this.layer.id,t=this._cachedKeyProperties[e];if(t){var r;return n.bandCombinationPresets.forEach(function(e){if(e.bandDefinitionKeyword===t.BandDefinitionKeyword)return r=e.presets,!0}),r||void 0}},t.prototype._validateProps=function(e){return!(null===e.stretchType||void 0===e.stretchType||6===e.stretchType&&(isNaN(e.minPercent)||isNaN(e.maxPercent))||3===e.stretchType&&isNaN(e.numberOfStandardDeviations))&&(e.noData&&!isNaN(e.noData)||(e.noData=0),this.renderParameters=e,!0)},t.prototype._clearRendering=function(){this.layer.bandIds=null,this.layer.noData=null,this.layer.renderingRule=null},t.prototype._applyStretchSingleBand=function(e){if(this._validateProps(e)){this.layer.noData=e.noData,this.layer.bandIds=null;var t=this._getStretchRasterFunctionArguments(e,1);if(this.layer.bandCount>1){var r={BandIDs:[e.selectedBand]},a=new d;a.functionArguments=r,a.functionName="ExtractBand",t.Raster=a}var o=new d;if(o.functionName="Stretch",o.functionArguments=t,e.colorRampName&&"none"!==e.colorRampName){var n=new d;n.functionName="Colormap",n.functionArguments={colorRamp:e.colorRampName,Raster:o},this.layer.renderingRule=n}else this.layer.renderingRule=o}},t.prototype._applyStretchRgb=function(e){if(this._validateProps(e)){this.layer.noData=e.noData,this.layer.bandIds=e.bandIds;var t=this._getStretchRasterFunctionArguments(e,3),r=new d;r.functionName="Stretch",r.functionArguments=t,this.layer.renderingRule=r}},t.prototype._getStretchRasterFunctionArguments=function(e,t){var r={DRA:e.dra,StretchType:e.stretchType,useGamma:!0};return 0!==e.stretchType&&(r.MinPercent=e.minPercent,r.MaxPercent=e.maxPercent,1===t?r.Gamma=[e.gamma]:3===t&&(r.Gamma=[e.gamma,e.gamma,e.gamma]),r.NumberOfStandardDeviations=e.numberOfStandardDeviations),r},t.prototype._getDiscreteColormap=function(e,t){var r=this;if(e&&t){var a,o,n,i,s,l,u=e.colorRamps?e.colorRamps.length:1,d=[],p=[],y=[],c=0,m=0;for(c=0;c<u;c++)d[c]={},d[c].start=m,d[c].end=m+1/u,m=d[c].end;for(c=0;c<t;c++)i=(c+.5)/t,d.forEach(function(t,l){i>=t.start&&i<t.end&&(s=(i-t.start)/(t.end-t.start),d.length>1?(a=r._getColorRGB(e.colorRamps[l].fromColor),o=r._getColorRGB(e.colorRamps[l].toColor)):(a=r._getColorRGB(e.fromColor),o=r._getColorRGB(e.toColor)),n=r._interpolateLab(a,o,s),y.push(n))});for(c=0;c<256;c++)l=y[c%t],p.push([c,l.r,l.g,l.b]);return p}},t.prototype._getColorRGB=function(e){return{r:e[0],g:e[1],b:e[2]}},t.prototype._applyColormap=function(e){var t=new d;t.functionName="Colormap",t.functionArguments={},e.symbologyType===n.SymbologyTypes.uniqueValue?t.functionArguments.Colormap=this._getUniqueValuesColormap(e.uniqueValuesSymbolData):e.symbologyType===n.SymbologyTypes.discrete&&(t.functionArguments.Colormap=this._getDiscreteColormap(e.discreteColorRamp,e.discreteNColors)),t.variableName="Raster",this.layer.noData=e.noData,this.layer.renderingRule=t},t.prototype._getUniqueValuesColormap=function(e){var t=[];return e.forEach(function(e){e.pixelValues.forEach(function(r){t.push([r,e.esriRasterSymbologyEditorUniqueValueSymbol.r,e.esriRasterSymbologyEditorUniqueValueSymbol.g,e.esriRasterSymbologyEditorUniqueValueSymbol.b])})}),t},t.prototype._createBandLists=function(){var e=this;if(this.layer){var t,r=this.layer.id,a=this.layer.bandCount,o=this._cachedKeyProperties[r],n=this.layer.bandIds||[0,1,2],i=[],s=["red","green","blue"];return o&&o.BandProperties&&o.BandProperties.length>0&&(t=o.BandProperties),n.forEach(function(r,o){t&&t[0].hasOwnProperty("BandName")?i.push(e._getBandIdList(a,t,e._getBandIndex(t,s[o]))):i.push(e._getBandIdList(a,t,r))}),this._cachedKeyProperties[r]=o,i}},t.prototype._getBandIndex=function(e,t){if(!this.layer||!e)return 0;var r;for(r=0;r<e.length;r++)if(e[r]&&e[r].hasOwnProperty("BandName")&&e[r].BandName.toLowerCase()===t)return r;return 0},t.prototype._getBandIdList=function(e,t,r){if(this.layer){var a=[],n={},i=!1;t&&e===t.length&&(i=!0);var s;for(s=0;s<e;s++){var l=s.toString(),u=s.toString();l=i&&t[s]&&t[s].BandName?t[s].BandName:o.bandPrefix+"_"+(s+1),n={},r===s&&(n.selected=!0),n.name=l,n.index=u,a.push(n)}return a}},t.prototype._interpolateLab=function(e,t,r){var a=i.toLAB(e),o=i.toLAB(t),n={l:a.l*(1-r)+r*o.l,a:a.a*(1-r)+r*o.a,b:a.b*(1-r)+r*o.b};return i.toRGB(n)},t.prototype._correctRgbLimits=function(e){var t=[e.r,e.g,e.b];return t.forEach(function(e,r){t[r]<0?t[r]=0:t[r]>255&&(t[r]=255),t[r]=Math.floor(t[r])}),{r:t[0],g:t[1],b:t[2]}};var n;return t.bandCombinationPresets=[{bandDefinitionKeyword:"LandsatTM",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]},{LandWater:[7,5,4]},{Vegetation:[5,4,3]}]},{bandDefinitionKeyword:"Landsat 8",presets:[{NaturalColor:[4,3,2]},{ColorInfrared:[5,4,3]},{Landuse:[5,4,2]},{LandWater:[7,6,5]},{Vegetation:[6,5,4]},{ShallowBathymetric:[3,2,1]}]},{bandDefinitionKeyword:"IKONOS",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"QuickBird",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"Pleiades",presets:[{NaturalColor:[1,2,3]},{ColorInfrared:[4,1,2]},{Landuse:[4,1,3]}]},{bandDefinitionKeyword:"GeoEye",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"OrbView",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[4,3,2]},{Landuse:[4,3,1]}]},{bandDefinitionKeyword:"LandsatMSS",presets:[{ColorInfrared:[4,3,2]}]},{bandDefinitionKeyword:"SPOT6",presets:[{NaturalColor:[1,2,3]},{ColorInfrared:[4,1,2]},{Landuse:[4,1,3]}]},{bandDefinitionKeyword:"FORMOSTAT",presets:[{NaturalColor:[1,2,3]},{ColorInfrared:[4,1,2]},{Landuse:[4,1,3]}]},{bandDefinitionKeyword:"SPOT1",presets:[{ColorInfrared:[1,2,3]},{Vegetation:[2,3,4]}]},{bandDefinitionKeyword:"WorldView",presets:[{NaturalColor:[5,3,2]},{ColorInfrared:[7,5,3]},{Landuse:[7,5,2]},{LandWater:[8,7,6]},{Vegetation:[7,6,5]},{ShallowBathymetric:[3,2,1]}]},{bandDefinitionKeyword:"RapidEye",presets:[{NaturalColor:[3,2,1]},{ColorInfrared:[5,3,2]},{Landuse:[5,3,1]},{Vegetation:[5,4,3]}]},{bandDefinitionKeyword:"DMCii",presets:[{ColorInfrared:[1,2,3]}]}],t.StretchTypeNames={none:"none",minMax:"minMax",percentClip:"percentClip",standardDeviation:"standardDeviation"},t.RenderingRuleTypeNames={extractband:"extractband",colormap:"colormap",stretch:"stretch"},t.SymbologyTypes={none:"none",stretch:"stretch",rgb:"rgb",uniqueValue:"unique-value",discrete:"discrete"},a([u.property()],t.prototype,"layer",void 0),a([u.property()],t.prototype,"renderParameters",void 0),t=n=a([u.subclass("esri.widgets.RasterSymbologyEditor.RasterSymbologyEditorViewModel")],t)}(u.declared(n))});