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

define(["../../core/Accessor","../../core/kebabDictionary","../../core/lang","../../geometry/support/graphicsUtils"],function(e,t,i,r){var s=t({esriNAOutputLineNone:"none",esriNAOutputLineStraight:"straight",esriNAOutputLineTrueShape:"true-shape",esriNAOutputLineTrueShapeWithMeasure:"true-shape-with-measure"}),a=t({esriNAUCentimeters:"centimeters",esriNAUDecimalDegrees:"decimal-degrees",esriNAUDecimeters:"decimeters",esriNAUFeet:"feet",esriNAUInches:"inches",esriNAUKilometers:"kilometers",esriNAUMeters:"meters",esriNAUMiles:"miles",esriNAUMillimeters:"millimeters",esriNAUNauticalMiles:"nautical-miles",esriNAUPoints:"points",esriNAUYards:"yards"}),n=t({esriNFSBAllowBacktrack:"allow-backtrack",esriNFSBAtDeadEndsOnly:"at-dead-ends-only",esriNFSBNoBacktrack:"no-backtrack",esriNFSBAtDeadEndsAndIntersections:"at-dead-ends-and-intersections"}),u=t({esriNATravelDirectionFromFacility:"from-facility",esriNATravelDirectionToFacility:"to-facility"}),l=t({esriCentimeters:"centimeters",esriDecimalDegrees:"decimal-degrees",esriDecimeters:"decimeters",esriFeet:"feet",esriInches:"inches",esriKilometers:"kilometers",esriMeters:"meters",esriMiles:"miles",esriMillimeters:"millimeters",esriNauticalMiles:"nautical-miles",esriPoints:"points",esriYards:"yards"});return e.createSubclass({declaredClass:"esri.tasks.support.ClosestFacilityParameters",properties:{accumulateAttributes:null,attributeParameterValues:null,defaultCutoff:null,defaultTargetFacilityCount:null,directionsLanguage:null,directionsLengthUnits:null,directionsOutputType:null,directionsStyleName:null,directionsTimeAttribute:null,doNotLocateOnRestrictedElements:!0,facilities:null,impedanceAttribute:null,incidents:null,outputGeometryPrecision:null,outputGeometryPrecisionUnits:null,outputLines:null,outSpatialReference:null,pointBarriers:null,polygonBarriers:null,polylineBarriers:null,restrictionAttributes:null,restrictUTurns:null,returnDirections:!1,returnFacilities:!1,returnIncidents:!1,returnPointBarriers:!1,returnPolygonBarriers:!1,returnPolylineBarriers:!1,returnRoutes:!0,travelDirection:null,useHierarchy:!1,timeOfDay:null,timeOfDayUsage:null},toJSON:function(e){var t={returnDirections:this.returnDirections,returnFacilities:this.returnFacilities,returnIncidents:this.returnIncidents,returnBarriers:this.returnPointBarriers,returnPolygonBarriers:this.returnPolygonBarriers,returnPolylineBarriers:this.returnPolylineBarriers,returnCFRoutes:this.returnRoutes,useHierarchy:this.useHierarchy,attributeParameterValues:this.attributeParameterValues&&JSON.stringify(this.attributeParameterValues),defaultCutoff:this.defaultCutoff,defaultTargetFacilityCount:this.defaultTargetFacilityCount,directionsLanguage:this.directionsLanguage,directionsLengthUnits:a.toJSON(this.directionsLengthUnits),directionsTimeAttributeName:this.directionsTimeAttribute,impedanceAttributeName:this.impedanceAttribute,outputGeometryPrecision:this.outputGeometryPrecision,outputGeometryPrecisionUnits:l.toJSON(this.outputGeometryPrecisionUnits),outputLines:s.toJSON(this.outputLines),outSR:this.outSpatialReference?this.outSpatialReference.wkid||JSON.stringify(this.outSpatialReference.toJSON()):null,restrictionAttributeNames:this.restrictionAttributes?this.restrictionAttributes.join(","):null,restrictUTurns:n.toJSON(this.restrictUTurns),accumulateAttributeNames:this.accumulateAttributes?this.accumulateAttributes.join(","):null,travelDirection:u.toJSON(this.travelDirection),timeOfDay:this.timeOfDay&&this.timeOfDay.getTime(),directionsStyleName:this.directionsStyleName};if(this.directionsOutputType)switch(this.directionsOutputType.toLowerCase()){case"complete":t.directionsOutputType="esriDOTComplete";break;case"complete-no-events":t.directionsOutputType="esriDOTCompleteNoEvents";break;case"instructions-only":t.directionsOutputType="esriDOTInstructionsOnly";break;case"standard":t.directionsOutputType="esriDOTStandard";break;case"summary-only":t.directionsOutputType="esriDOTSummaryOnly";break;default:t.directionsOutputType=this.directionsOutputType}if(this.timeOfDayUsage){var o;switch(this.timeOfDayUsage.toLowerCase()){case"start":o="esriNATimeOfDayUseAsStartTime";break;case"end":o="esriNATimeOfDayUseAsEndTime";break;default:o=this.timeOfDayUsage}t.timeOfDayUsage=o}var c=this.incidents;"esri.tasks.support.FeatureSet"===c.declaredClass&&c.features.length>0?t.incidents=JSON.stringify({type:"features",features:r._encodeGraphics(c.features,e&&e["incidents.features"]),doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}):"esri.tasks.support.DataLayer"===c.declaredClass?t.incidents=c:"esri.tasks.support.DataFile"===c.declaredClass&&(t.incidents=JSON.stringify({type:"features",url:c.url,doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}));var d=this.facilities;"esri.tasks.support.FeatureSet"===d.declaredClass&&d.features.length>0?t.facilities=JSON.stringify({type:"features",features:r._encodeGraphics(d.features,e&&e["facilities.features"]),doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}):"esri.tasks.support.DataLayer"===d.declaredClass?t.facilities=d:"esri.tasks.support.DataFile"===d.declaredClass&&(t.facilities=JSON.stringify({type:"features",url:d.url,doNotLocateOnRestrictedElements:this.doNotLocateOnRestrictedElements}));var p=function(t,i){return t?"esri.tasks.support.FeatureSet"===t.declaredClass?t.features.length>0?JSON.stringify({type:"features",features:r._encodeGraphics(t.features,e&&e[i])}):null:"esri.tasks.support.DataLayer"===t.declaredClass?t:"esri.tasks.support.DataFile"===t.declaredClass?JSON.stringify({type:"features",url:t.url}):JSON.stringify(t):null};return this.pointBarriers&&(t.barriers=p(this.pointBarriers,"pointBarriers.features")),this.polygonBarriers&&(t.polygonBarriers=p(this.polygonBarriers,"polygonBarriers.features")),this.polylineBarriers&&(t.polylineBarriers=p(this.polylineBarriers,"polylineBarriers.features")),i.filter(t,function(e){if(null!==e)return!0})}})});