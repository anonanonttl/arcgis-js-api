// COPYRIGHT © 201 Esri
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
// See http://js.arcgis.com/3.32/esri/copyright.txt for details.

define({toolDefine:"Создать растр тренда",outputLayerName:"${layername}_trend",dimensionLabel:"Выбрать измерение, по которому будут анализироваться тренд переменной",variablesLabel:"Выбрать переменные для анализа тренда",variablesListLabel:"Переменные [Dimension Info] (Описание)",trendLineTypeLabel:"Выбрать тип линии для подгонки значений вдоль измерения",linear:"Линейный",harmonic:"Гармонический",polynomial:"Полиномиальный",frequencyLabel:"Указать число встречаемости для подгонки гармонического тренда",polynomialOrderLabel:"Указать порядок полинома для подгонки тренда",ignoreNodataLabel:"Игнорировать пропущенные значения при вычислениях",ignore:"Игнорировать",analysisLayerLabel:"Выбрать многомерный слой изображений для анализа тренда",itemDescription:"Сервис анализа изображений, полученный после запуска функции Создать растр тренда",itemTags:"Результат анализа растра, Создать растр тренда, ${layername}",itemSnippet:"Сервис анализа изображений, полученный после запуска функции Создать растр тренда"});