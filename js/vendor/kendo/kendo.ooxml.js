/** 
 * Kendo UI v2017.3.1026 (http://www.telerik.com/kendo-ui)                                                                                                                                              
 * Copyright 2017 Telerik AD. All rights reserved.                                                                                                                                                      
 *                                                                                                                                                                                                      
 * Kendo UI commercial licenses may be obtained at                                                                                                                                                      
 * http://www.telerik.com/purchase/license-agreement/kendo-ui-complete                                                                                                                                  
 * If you do not own a commercial license, this file shall be governed by the trial license terms.                                                                                                      
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       
                                                                                                                                                                                                       

*/
(function (f, define) {
    define('ooxml/utils', ['kendo.core'], f);
}(function () {
    (function () {
        kendo.ooxml = kendo.ooxml || {};
        kendo.ooxml.createZip = function () {
            if (typeof JSZip === 'undefined') {
                throw new Error('JSZip not found. Check http://docs.telerik.com/kendo-ui/framework/excel/introduction#requirements for more details.');
            }
            return new JSZip();
        };
    }());
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('ooxml/kendo-ooxml', [
        'kendo.core',
        'ooxml/utils'
    ], f);
}(function () {
    (function ($) {
        window.kendo.ooxml = window.kendo.ooxml || {};
        var ooxml = kendo.ooxml;
        var map = $.map;
        var createZip = ooxml.createZip;
        var current = {
            toString: function (value) {
                return value;
            }
        };
        var IntlService = kendo.Class.extend({});
        IntlService.register = function (userImplementation) {
            current = userImplementation;
        };
        IntlService.toString = function (value, format) {
            return current.toString(value, format);
        };
        var DATA_URL_PREFIX = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
        var DATA_URL_OPTIONS = {
            compression: 'DEFLATE',
            type: 'base64'
        };
        var MS_PER_MINUTE = 60000;
        var MS_PER_DAY = 86400000;
        function toDataURL(content) {
            return DATA_URL_PREFIX + content;
        }
        function indexOf(thing, array) {
            return array.indexOf(thing);
        }
        var parseJSON = JSON.parse.bind(JSON);
        function ESC(val) {
            return String(val).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;').replace(/\'/g, '&#39;');
        }
        function repeat(count, func) {
            var str = '';
            for (var i = 0; i < count; ++i) {
                str += func(i);
            }
            return str;
        }
        function foreach(arr, func) {
            var str = '';
            for (var i = 0; i < arr.length; ++i) {
                str += func(arr[i], i);
            }
            return str;
        }
        var XMLHEAD = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\r';
        var RELS = XMLHEAD + '\n            <Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n               <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>\n               <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>\n               <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>\n            </Relationships>';
        var CORE = function (ref) {
            var creator = ref.creator;
            var lastModifiedBy = ref.lastModifiedBy;
            var created = ref.created;
            var modified = ref.modified;
            return XMLHEAD + '\n <cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"\n   xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/"\n   xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n   <dc:creator>' + ESC(creator) + '</dc:creator>\n   <cp:lastModifiedBy>' + ESC(lastModifiedBy) + '</cp:lastModifiedBy>\n   <dcterms:created xsi:type="dcterms:W3CDTF">' + ESC(created) + '</dcterms:created>\n   <dcterms:modified xsi:type="dcterms:W3CDTF">' + ESC(modified) + '</dcterms:modified>\n</cp:coreProperties>';
        };
        var APP = function (ref) {
            var sheets = ref.sheets;
            return XMLHEAD + '\n<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">\n  <Application>Microsoft Excel</Application>\n  <DocSecurity>0</DocSecurity>\n  <ScaleCrop>false</ScaleCrop>\n  <HeadingPairs>\n    <vt:vector size="2" baseType="variant">\n      <vt:variant>\n        <vt:lpstr>Worksheets</vt:lpstr>\n      </vt:variant>\n      <vt:variant>\n        <vt:i4>' + sheets.length + '</vt:i4>\n      </vt:variant>\n    </vt:vector>\n  </HeadingPairs>\n  <TitlesOfParts>\n    <vt:vector size="' + sheets.length + '" baseType="lpstr">' + foreach(sheets, function (sheet, i) {
                return sheet.options.title ? '<vt:lpstr>' + ESC(sheet.options.title) + '</vt:lpstr>' : '<vt:lpstr>Sheet' + (i + 1) + '</vt:lpstr>';
            }) + '</vt:vector>\n  </TitlesOfParts>\n  <LinksUpToDate>false</LinksUpToDate>\n  <SharedDoc>false</SharedDoc>\n  <HyperlinksChanged>false</HyperlinksChanged>\n  <AppVersion>14.0300</AppVersion>\n</Properties>';
        };
        var CONTENT_TYPES = function (ref) {
            var count = ref.count;
            return XMLHEAD + '\n<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">\n  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />\n  <Default Extension="xml" ContentType="application/xml" />\n  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml" />\n  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>\n  <Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>\n  ' + repeat(count, function (idx) {
                return '<Override PartName="/xl/worksheets/sheet' + (idx + 1) + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml" />';
            }) + '\n  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml" />\n  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml" />\n</Types>';
        };
        var WORKBOOK = function (ref) {
            var sheets = ref.sheets;
            var filterNames = ref.filterNames;
            var userNames = ref.userNames;
            return XMLHEAD + '\n<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">\n  <fileVersion appName="xl" lastEdited="5" lowestEdited="5" rupBuild="9303" />\n  <workbookPr defaultThemeVersion="124226" />\n  <bookViews>\n    <workbookView xWindow="240" yWindow="45" windowWidth="18195" windowHeight="7995" />\n  </bookViews>\n  <sheets>\n  ' + foreach(sheets, function (ref, i) {
                var options = ref.options;
                var name = options.name || options.title || 'Sheet' + (i + 1);
                return '<sheet name="' + ESC(name) + '" sheetId="' + (i + 1) + '" r:id="rId' + (i + 1) + '" />';
            }) + '\n  </sheets>\n  ' + (filterNames.length || userNames.length ? '\n    <definedNames>\n      ' + foreach(filterNames, function (f) {
                return '\n          <definedName name="_xlnm._FilterDatabase" hidden="1" localSheetId="' + f.localSheetId + '">' + ESC(f.name) + '!$' + ESC(f.from) + ':$' + ESC(f.to) + '</definedName>';
            }) + '\n      ' + foreach(userNames, function (f) {
                return '\n         <definedName name="' + f.name + '" hidden="' + (f.hidden ? 1 : 0) + '"' + (f.localSheetId != null ? 'localSheetId="' + f.localSheetId + '"' : '') + '</definedName>';
            }) + '\n    </definedNames>' : '') + '\n  <calcPr fullCalcOnLoad="1" calcId="145621" />\n</workbook>';
        };
        var WORKSHEET = function (ref) {
            var frozenColumns = ref.frozenColumns;
            var frozenRows = ref.frozenRows;
            var columns = ref.columns;
            var defaults = ref.defaults;
            var data = ref.data;
            var index = ref.index;
            var mergeCells = ref.mergeCells;
            var autoFilter = ref.autoFilter;
            var filter = ref.filter;
            var showGridLines = ref.showGridLines;
            var hyperlinks = ref.hyperlinks;
            var validations = ref.validations;
            var defaultCellStyleId = ref.defaultCellStyleId;
            var rtl = ref.rtl;
            return XMLHEAD + '\n<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac" mc:Ignorable="x14ac">\n   <dimension ref="A1" />\n\n   <sheetViews>\n     <sheetView ' + (rtl ? 'rightToLeft="1"' : '') + ' ' + (index === 0 ? 'tabSelected="1"' : '') + ' workbookViewId="0" ' + (showGridLines === false ? 'showGridLines="0"' : '') + '>\n     ' + (frozenRows || frozenColumns ? '\n       <pane state="frozen"\n         ' + (frozenColumns ? 'xSplit="' + frozenColumns + '"' : '') + '\n         ' + (frozenRows ? 'ySplit="' + frozenRows + '"' : '') + '\n         topLeftCell="' + (String.fromCharCode(65 + (frozenColumns || 0)) + ((frozenRows || 0) + 1)) + '"\n       />' : '') + '\n     </sheetView>\n   </sheetViews>\n\n   <sheetFormatPr x14ac:dyDescent="0.25" defaultRowHeight="' + (defaults.rowHeight ? defaults.rowHeight * 0.75 : 15) + '"\n     ' + (defaults.columnWidth ? 'defaultColWidth="' + toWidth(defaults.columnWidth) + '"' : '') + ' />\n\n   ' + (defaultCellStyleId != null || columns && columns.length > 0 ? '\n     <cols>\n       ' + (!columns || !columns.length ? '\n         <col min="1" max="16384" style="' + defaultCellStyleId + '"\n              ' + (defaults.columnWidth ? 'width="' + toWidth(defaults.columnWidth) + '"' : '') + ' /> ' : '') + '\n       ' + foreach(columns, function (column, ci) {
                var columnIndex = typeof column.index === 'number' ? column.index + 1 : ci + 1;
                if (column.width === 0) {
                    return '<col ' + (defaultCellStyleId != null ? 'style="' + defaultCellStyleId + '"' : '') + '\n                        min="' + columnIndex + '" max="' + columnIndex + '" hidden="1" customWidth="1" />';
                }
                return '<col ' + (defaultCellStyleId != null ? 'style="' + defaultCellStyleId + '"' : '') + '\n                      min="' + columnIndex + '" max="' + columnIndex + '" customWidth="1"\n                      ' + (column.autoWidth ? 'width="' + (column.width * 7 + 5) / 7 * 256 / 256 + '" bestFit="1"' : 'width="' + toWidth(column.width) + '"') + ' />';
            }) + '\n     </cols>' : '') + '\n\n   <sheetData>\n     ' + foreach(data, function (row, ri) {
                var rowIndex = typeof row.index === 'number' ? row.index + 1 : ri + 1;
                return '\n         <row r="' + rowIndex + '" x14ac:dyDescent="0.25"\n              ' + (row.height === 0 ? 'hidden="1"' : row.height ? 'ht="' + toHeight(row.height) + '" customHeight="1"' : '') + '>\n           ' + foreach(row.data, function (cell) {
                    return '\n             <c r="' + cell.ref + '" ' + (cell.style ? 's="' + cell.style + '"' : '') + ' ' + (cell.type ? 't="' + cell.type + '"' : '') + '>\n               ' + (cell.formula != null ? '<f>' + ESC(cell.formula) + '</f>' : '') + '\n               ' + (cell.value != null ? '<v>' + ESC(cell.value) + '</v>' : '') + '\n             </c>';
                }) + '\n         </row>\n       ';
            }) + '\n   </sheetData>\n\n   ' + (autoFilter ? '<autoFilter ref="' + autoFilter.from + ':' + autoFilter.to + '"/>' : filter ? spreadsheetFilters(filter) : '') + '\n\n   ' + (mergeCells.length ? '\n     <mergeCells count="' + mergeCells.length + '">\n       ' + foreach(mergeCells, function (ref) {
                return '<mergeCell ref="' + ref + '"/>';
            }) + '\n     </mergeCells>' : '') + '\n\n   ' + (validations.length ? '\n     <dataValidations>\n       ' + foreach(validations, function (val) {
                return '\n         <dataValidation sqref="' + val.sqref.join(' ') + '"\n                         showErrorMessage="' + val.showErrorMessage + '"\n                         type="' + ESC(val.type) + '"\n                         ' + (val.type !== 'list' ? 'operator="' + ESC(val.operator) + '"' : '') + '\n                         allowBlank="' + val.allowBlank + '"\n                         showDropDown="' + val.showDropDown + '"\n                         ' + (val.error ? 'error="' + ESC(val.error) + '"' : '') + '\n                         ' + (val.errorTitle ? 'errorTitle="' + ESC(val.errorTitle) + '"' : '') + '>\n           ' + (val.formula1 ? '<formula1>' + ESC(val.formula1) + '</formula1>' : '') + '\n           ' + (val.formula2 ? '<formula2>' + ESC(val.formula2) + '</formula2>' : '') + '\n         </dataValidation>';
            }) + '\n     </dataValidations>' : '') + '\n\n   ' + (hyperlinks.length ? '\n     <hyperlinks>\n       ' + foreach(hyperlinks, function (link, hi) {
                return '\n         <hyperlink ref="' + link.ref + '" r:id="rId' + hi + '"/>';
            }) + '\n     </hyperlinks>' : '') + '\n\n   <pageMargins left="0.7" right="0.7" top="0.75" bottom="0.75" header="0.3" footer="0.3" />\n</worksheet>';
        };
        var WORKBOOK_RELS = function (ref) {
            var count = ref.count;
            return XMLHEAD + '\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  ' + repeat(count, function (idx) {
                return '\n    <Relationship Id="rId' + (idx + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + (idx + 1) + '.xml" />';
            }) + '\n  <Relationship Id="rId' + (count + 1) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml" />\n  <Relationship Id="rId' + (count + 2) + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml" />\n</Relationships>';
        };
        var WORKSHEET_RELS = function (ref) {
            var hyperlinks = ref.hyperlinks;
            return XMLHEAD + '\n<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">\n  ' + foreach(hyperlinks, function (link, i) {
                return '\n    <Relationship Id="rId' + i + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink" Target="' + ESC(link.target) + '" TargetMode="External" />';
            }) + '\n</Relationships>';
        };
        var SHARED_STRINGS = function (ref) {
            var count = ref.count;
            var uniqueCount = ref.uniqueCount;
            var indexes = ref.indexes;
            return XMLHEAD + '\n<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="' + count + '" uniqueCount="' + uniqueCount + '">\n  ' + foreach(Object.keys(indexes), function (index) {
                return '\n    <si><t>' + ESC(index.substring(1)) + '</t></si>';
            }) + '\n</sst>';
        };
        var STYLES = function (ref) {
            var formats = ref.formats;
            var fonts = ref.fonts;
            var fills = ref.fills;
            var borders = ref.borders;
            var styles = ref.styles;
            return XMLHEAD + '\n<styleSheet\n    xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"\n    xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"\n    mc:Ignorable="x14ac"\n    xmlns:x14ac="http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac">\n  <numFmts count="' + formats.length + '">\n  ' + foreach(formats, function (format, fi) {
                return '\n    <numFmt formatCode="' + ESC(format.format) + '" numFmtId="' + (165 + fi) + '" />';
            }) + '\n  </numFmts>\n  <fonts count="' + (fonts.length + 1) + '" x14ac:knownFonts="1">\n    <font>\n       <sz val="11" />\n       <color theme="1" />\n       <name val="Calibri" />\n       <family val="2" />\n       <scheme val="minor" />\n    </font>\n    ' + foreach(fonts, function (font) {
                return '\n    <font>\n      <sz val="' + (font.fontSize || 11) + '" />\n      ' + (font.bold ? '<b/>' : '') + '\n      ' + (font.italic ? '<i/>' : '') + '\n      ' + (font.underline ? '<u/>' : '') + '\n      ' + (font.color ? '<color rgb="' + ESC(font.color) + '" />' : '<color theme="1" />') + '\n      ' + (font.fontFamily ? '\n        <name val="' + ESC(font.fontFamily) + '" />\n        <family val="2" />\n      ' : '\n        <name val="Calibri" />\n        <family val="2" />\n        <scheme val="minor" />\n      ') + '\n    </font>';
            }) + '\n  </fonts>\n  <fills count="' + (fills.length + 2) + '">\n      <fill><patternFill patternType="none"/></fill>\n      <fill><patternFill patternType="gray125"/></fill>\n    ' + foreach(fills, function (fill) {
                return '\n      ' + (fill.background ? '\n        <fill>\n          <patternFill patternType="solid">\n              <fgColor rgb="' + ESC(fill.background) + '"/>\n          </patternFill>\n        </fill>\n      ' : '');
            }) + '\n  </fills>\n  <borders count="' + (borders.length + 1) + '">\n    <border><left/><right/><top/><bottom/><diagonal/></border>\n    ' + foreach(borders, borderTemplate) + '\n  </borders>\n  <cellStyleXfs count="1">\n    <xf borderId="0" fillId="0" fontId="0" />\n  </cellStyleXfs>\n  <cellXfs count="' + (styles.length + 1) + '">\n    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" />\n    ' + foreach(styles, function (style) {
                return '\n      <xf xfId="0"\n          ' + (style.fontId ? 'fontId="' + style.fontId + '" applyFont="1"' : '') + '\n          ' + (style.fillId ? 'fillId="' + style.fillId + '" applyFill="1"' : '') + '\n          ' + (style.numFmtId ? 'numFmtId="' + style.numFmtId + '" applyNumberFormat="1"' : '') + '\n          ' + (style.textAlign || style.verticalAlign || style.wrap ? 'applyAlignment="1"' : '') + '\n          ' + (style.borderId ? 'borderId="' + style.borderId + '" applyBorder="1"' : '') + '>\n        ' + (style.textAlign || style.verticalAlign || style.wrap ? '\n        <alignment\n          ' + (style.textAlign ? 'horizontal="' + ESC(style.textAlign) + '"' : '') + '\n          ' + (style.verticalAlign ? 'vertical="' + ESC(style.verticalAlign) + '"' : '') + '\n          ' + (style.wrap ? 'wrapText="1"' : '') + ' />\n        ' : '') + '\n      </xf>\n    ';
            }) + '\n  </cellXfs>\n  <cellStyles count="1">\n    <cellStyle name="Normal" xfId="0" builtinId="0"/>\n  </cellStyles>\n  <dxfs count="0" />\n  <tableStyles count="0" defaultTableStyle="TableStyleMedium2" defaultPivotStyle="PivotStyleMedium9" />\n</styleSheet>';
        };
        function numChar(colIndex) {
            var letter = Math.floor(colIndex / 26) - 1;
            return (letter >= 0 ? numChar(letter) : '') + String.fromCharCode(65 + colIndex % 26);
        }
        function ref(rowIndex, colIndex) {
            return numChar(colIndex) + (rowIndex + 1);
        }
        function $ref(rowIndex, colIndex) {
            return numChar(colIndex) + '$' + (rowIndex + 1);
        }
        function filterRowIndex(options) {
            var frozenRows = options.frozenRows || (options.freezePane || {}).rowSplit || 1;
            return frozenRows - 1;
        }
        function toWidth(px) {
            return (px / 7 * 100 + 0.5) / 100;
        }
        function toHeight(px) {
            return px * 0.75;
        }
        function stripFunnyChars(value) {
            return String(value).replace(/[\x00-\x08]/g, '').replace(/\n/g, '\r\n');
        }
        var DATE_EPOCH = new Date(1900, 0, 0);
        var Worksheet = kendo.Class.extend({
            init: function (options, sharedStrings, styles, borders) {
                this.options = options;
                this._strings = sharedStrings;
                this._styles = styles;
                this._borders = borders;
                this._validations = {};
            },
            relsToXML: function () {
                var hyperlinks = this.options.hyperlinks || [];
                if (!hyperlinks.length) {
                    return '';
                }
                return WORKSHEET_RELS({ hyperlinks: hyperlinks });
            },
            toXML: function (index) {
                var this$1 = this;
                var mergeCells = this.options.mergedCells || [];
                var rows = this.options.rows || [];
                var data = inflate(rows, mergeCells);
                this._readCells(data);
                var autoFilter = this.options.filter;
                var filter;
                if (autoFilter && typeof autoFilter.from === 'number' && typeof autoFilter.to === 'number') {
                    autoFilter = {
                        from: ref(filterRowIndex(this.options), autoFilter.from),
                        to: ref(filterRowIndex(this.options), autoFilter.to)
                    };
                } else if (autoFilter && autoFilter.ref && autoFilter.columns) {
                    filter = autoFilter;
                    autoFilter = null;
                }
                var validations = [];
                for (var i in this._validations) {
                    if (Object.prototype.hasOwnProperty.call(this$1._validations, i)) {
                        validations.push(this$1._validations[i]);
                    }
                }
                var defaultCellStyleId = null;
                if (this.options.defaultCellStyle) {
                    defaultCellStyleId = this._lookupStyle(this.options.defaultCellStyle);
                }
                var freezePane = this.options.freezePane || {};
                var defaults = this.options.defaults || {};
                return WORKSHEET({
                    frozenColumns: this.options.frozenColumns || freezePane.colSplit,
                    frozenRows: this.options.frozenRows || freezePane.rowSplit,
                    columns: this.options.columns,
                    defaults: defaults,
                    data: data,
                    index: index,
                    mergeCells: mergeCells,
                    autoFilter: autoFilter,
                    filter: filter,
                    showGridLines: this.options.showGridLines,
                    hyperlinks: this.options.hyperlinks || [],
                    validations: validations,
                    defaultCellStyleId: defaultCellStyleId,
                    rtl: this.options.rtl !== undefined ? this.options.rtl : defaults.rtl
                });
            },
            _lookupString: function (value) {
                var key = '$' + value;
                var index = this._strings.indexes[key];
                var result;
                if (index !== undefined) {
                    result = index;
                } else {
                    result = this._strings.indexes[key] = this._strings.uniqueCount;
                    this._strings.uniqueCount++;
                }
                this._strings.count++;
                return result;
            },
            _lookupStyle: function (style) {
                var json = JSON.stringify(style);
                if (json === '{}') {
                    return 0;
                }
                var index = indexOf(json, this._styles);
                if (index < 0) {
                    index = this._styles.push(json) - 1;
                }
                return index + 1;
            },
            _lookupBorder: function (border) {
                var json = JSON.stringify(border);
                if (json === '{}') {
                    return;
                }
                var index = indexOf(json, this._borders);
                if (index < 0) {
                    index = this._borders.push(json) - 1;
                }
                return index + 1;
            },
            _readCells: function (rowData) {
                var this$1 = this;
                for (var i = 0; i < rowData.length; i++) {
                    var row = rowData[i];
                    var cells = row.cells;
                    row.data = [];
                    for (var j = 0; j < cells.length; j++) {
                        var cellData = this$1._cell(cells[j], row.index, j);
                        if (cellData) {
                            row.data.push(cellData);
                        }
                    }
                }
            },
            _cell: function (data, rowIndex, cellIndex) {
                if (!data || data === EMPTY_CELL) {
                    return null;
                }
                var value = data.value;
                var border = {};
                if (data.borderLeft) {
                    border.left = data.borderLeft;
                }
                if (data.borderRight) {
                    border.right = data.borderRight;
                }
                if (data.borderTop) {
                    border.top = data.borderTop;
                }
                if (data.borderBottom) {
                    border.bottom = data.borderBottom;
                }
                border = this._lookupBorder(border);
                var defStyle = this.options.defaultCellStyle || {};
                var style = { borderId: border };
                (function (add) {
                    add('color');
                    add('background');
                    add('bold');
                    add('italic');
                    add('underline');
                    if (!add('fontFamily')) {
                        add('fontName', 'fontFamily');
                    }
                    add('fontSize');
                    add('format');
                    if (!add('textAlign')) {
                        add('hAlign', 'textAlign');
                    }
                    if (!add('verticalAlign')) {
                        add('vAlign', 'verticalAlign');
                    }
                    add('wrap');
                }(function (prop, target) {
                    var val = data[prop];
                    if (val === undefined) {
                        val = defStyle[prop];
                    }
                    if (val !== undefined) {
                        style[target || prop] = val;
                        return true;
                    }
                }));
                var columns = this.options.columns || [];
                var column = columns[cellIndex];
                var type = typeof value;
                if (column && column.autoWidth) {
                    var displayValue = value;
                    if (type === 'number') {
                        displayValue = IntlService.toString(value, data.format);
                    }
                    column.width = Math.max(column.width || 0, String(displayValue).length);
                }
                if (type === 'string') {
                    value = stripFunnyChars(value);
                    value = this._lookupString(value);
                    type = 's';
                } else if (type === 'number') {
                    type = 'n';
                } else if (type === 'boolean') {
                    type = 'b';
                    value = Number(value);
                } else if (value && value.getTime) {
                    type = null;
                    var offset = (value.getTimezoneOffset() - DATE_EPOCH.getTimezoneOffset()) * MS_PER_MINUTE;
                    value = (value - DATE_EPOCH - offset) / MS_PER_DAY + 1;
                    if (!style.format) {
                        style.format = 'mm-dd-yy';
                    }
                } else {
                    type = null;
                    value = null;
                }
                style = this._lookupStyle(style);
                var cellName = ref(rowIndex, cellIndex);
                if (data.validation) {
                    this._addValidation(data.validation, cellName);
                }
                return {
                    value: value,
                    formula: data.formula,
                    type: type,
                    style: style,
                    ref: cellName
                };
            },
            _addValidation: function (v, ref) {
                var tmp = {
                    showErrorMessage: v.type === 'reject' ? 1 : 0,
                    formula1: v.from,
                    formula2: v.to,
                    type: MAP_EXCEL_TYPE[v.dataType] || v.dataType,
                    operator: MAP_EXCEL_OPERATOR[v.comparerType] || v.comparerType,
                    allowBlank: v.allowNulls ? 1 : 0,
                    showDropDown: v.showButton ? 0 : 1,
                    error: v.messageTemplate,
                    errorTitle: v.titleTemplate
                };
                var json = JSON.stringify(tmp);
                if (!this._validations[json]) {
                    this._validations[json] = tmp;
                    tmp.sqref = [];
                }
                this._validations[json].sqref.push(ref);
            }
        });
        var MAP_EXCEL_OPERATOR = {
            greaterThanOrEqualTo: 'greaterThanOrEqual',
            lessThanOrEqualTo: 'lessThanOrEqual'
        };
        var MAP_EXCEL_TYPE = { number: 'decimal' };
        var defaultFormats = {
            'General': 0,
            '0': 1,
            '0.00': 2,
            '#,##0': 3,
            '#,##0.00': 4,
            '0%': 9,
            '0.00%': 10,
            '0.00E+00': 11,
            '# ?/?': 12,
            '# ??/??': 13,
            'mm-dd-yy': 14,
            'd-mmm-yy': 15,
            'd-mmm': 16,
            'mmm-yy': 17,
            'h:mm AM/PM': 18,
            'h:mm:ss AM/PM': 19,
            'h:mm': 20,
            'h:mm:ss': 21,
            'm/d/yy h:mm': 22,
            '#,##0 ;(#,##0)': 37,
            '#,##0 ;[Red](#,##0)': 38,
            '#,##0.00;(#,##0.00)': 39,
            '#,##0.00;[Red](#,##0.00)': 40,
            'mm:ss': 45,
            '[h]:mm:ss': 46,
            'mmss.0': 47,
            '##0.0E+0': 48,
            '@': 49,
            '[$-404]e/m/d': 27,
            'm/d/yy': 30,
            't0': 59,
            't0.00': 60,
            't#,##0': 61,
            't#,##0.00': 62,
            't0%': 67,
            't0.00%': 68,
            't# ?/?': 69,
            't# ??/??': 70
        };
        function convertColor(value) {
            var color = value;
            if (color.length < 6) {
                color = color.replace(/(\w)/g, function ($0, $1) {
                    return $1 + $1;
                });
            }
            color = color.substring(1).toUpperCase();
            if (color.length < 8) {
                color = 'FF' + color;
            }
            return color;
        }
        var Workbook = kendo.Class.extend({
            init: function (options) {
                var this$1 = this;
                this.options = options || {};
                this._strings = {
                    indexes: {},
                    count: 0,
                    uniqueCount: 0
                };
                this._styles = [];
                this._borders = [];
                this._sheets = map(this.options.sheets || [], function (options) {
                    options.defaults = this$1.options;
                    return new Worksheet(options, this$1._strings, this$1._styles, this$1._borders);
                });
            },
            toZIP: function () {
                var this$1 = this;
                var zip = createZip();
                var docProps = zip.folder('docProps');
                docProps.file('core.xml', CORE({
                    creator: this.options.creator || 'Kendo UI',
                    lastModifiedBy: this.options.creator || 'Kendo UI',
                    created: this.options.date || new Date().toJSON(),
                    modified: this.options.date || new Date().toJSON()
                }));
                var sheetCount = this._sheets.length;
                docProps.file('app.xml', APP({ sheets: this._sheets }));
                var rels = zip.folder('_rels');
                rels.file('.rels', RELS);
                var xl = zip.folder('xl');
                var xlRels = xl.folder('_rels');
                xlRels.file('workbook.xml.rels', WORKBOOK_RELS({ count: sheetCount }));
                var sheetIds = {};
                xl.file('workbook.xml', WORKBOOK({
                    sheets: this._sheets,
                    filterNames: map(this._sheets, function (sheet, index) {
                        var options = sheet.options;
                        var sheetName = options.name || options.title || 'Sheet' + (index + 1);
                        sheetIds[sheetName.toLowerCase()] = index;
                        var filter = options.filter;
                        if (filter && typeof filter.from !== 'undefined' && typeof filter.to !== 'undefined') {
                            return {
                                localSheetId: index,
                                name: sheetName,
                                from: $ref(filterRowIndex(options), filter.from),
                                to: $ref(filterRowIndex(options), filter.to)
                            };
                        }
                    }),
                    userNames: map(this.options.names || [], function (def) {
                        return {
                            name: def.localName,
                            localSheetId: def.sheet ? sheetIds[def.sheet.toLowerCase()] : null,
                            value: def.value,
                            hidden: def.hidden
                        };
                    })
                }));
                var worksheets = xl.folder('worksheets');
                var sheetRels = worksheets.folder('_rels');
                for (var idx = 0; idx < sheetCount; idx++) {
                    var sheet = this$1._sheets[idx];
                    var sheetName = 'sheet' + (idx + 1) + '.xml';
                    var relsXml = sheet.relsToXML();
                    if (relsXml) {
                        sheetRels.file(sheetName + '.rels', relsXml);
                    }
                    worksheets.file(sheetName, sheet.toXML(idx));
                }
                var borders = map(this._borders, parseJSON);
                var styles = map(this._styles, parseJSON);
                var hasFont = function (style) {
                    return style.underline || style.bold || style.italic || style.color || style.fontFamily || style.fontSize;
                };
                var fonts = map(styles, function (style) {
                    if (style.color) {
                        style.color = convertColor(style.color);
                    }
                    if (hasFont(style)) {
                        return style;
                    }
                });
                var formats = map(styles, function (style) {
                    if (style.format && defaultFormats[style.format] === undefined) {
                        return style;
                    }
                });
                var fills = map(styles, function (style) {
                    if (style.background) {
                        style.background = convertColor(style.background);
                        return style;
                    }
                });
                xl.file('styles.xml', STYLES({
                    fonts: fonts,
                    fills: fills,
                    formats: formats,
                    borders: borders,
                    styles: map(styles, function (style) {
                        var result = {};
                        if (hasFont(style)) {
                            result.fontId = indexOf(style, fonts) + 1;
                        }
                        if (style.background) {
                            result.fillId = indexOf(style, fills) + 2;
                        }
                        result.textAlign = style.textAlign;
                        result.verticalAlign = style.verticalAlign;
                        result.wrap = style.wrap;
                        result.borderId = style.borderId;
                        if (style.format) {
                            if (defaultFormats[style.format] !== undefined) {
                                result.numFmtId = defaultFormats[style.format];
                            } else {
                                result.numFmtId = 165 + indexOf(style, formats);
                            }
                        }
                        return result;
                    })
                }));
                xl.file('sharedStrings.xml', SHARED_STRINGS(this._strings));
                zip.file('[Content_Types].xml', CONTENT_TYPES({ count: sheetCount }));
                return zip;
            },
            toDataURL: function () {
                var zip = this.toZIP();
                return zip.generateAsync ? zip.generateAsync(DATA_URL_OPTIONS).then(toDataURL) : toDataURL(zip.generate(DATA_URL_OPTIONS));
            }
        });
        function borderStyle(width) {
            var alias = 'thin';
            if (width === 2) {
                alias = 'medium';
            } else if (width === 3) {
                alias = 'thick';
            }
            return alias;
        }
        function borderSideTemplate(name, style) {
            var result = '';
            if (style) {
                result += '<' + name + ' style="' + borderStyle(style.size) + '">';
                if (style.color) {
                    result += '<color rgb="' + convertColor(style.color) + '"/>';
                }
                result += '</' + name + '>';
            }
            return result;
        }
        function borderTemplate(border) {
            return '<border>' + borderSideTemplate('left', border.left) + borderSideTemplate('right', border.right) + borderSideTemplate('top', border.top) + borderSideTemplate('bottom', border.bottom) + '</border>';
        }
        var EMPTY_CELL = {};
        function inflate(rows, mergedCells) {
            var rowData = [];
            var rowsByIndex = [];
            indexRows(rows, function (row, index) {
                var data = {
                    _source: row,
                    index: index,
                    height: row.height,
                    cells: []
                };
                rowData.push(data);
                rowsByIndex[index] = data;
            });
            var sorted = sortByIndex(rowData).slice(0);
            var ctx = {
                rowData: rowData,
                rowsByIndex: rowsByIndex,
                mergedCells: mergedCells
            };
            for (var i = 0; i < sorted.length; i++) {
                fillCells(sorted[i], ctx);
                delete sorted[i]._source;
            }
            return sortByIndex(rowData);
        }
        function indexRows(rows, callback) {
            for (var i = 0; i < rows.length; i++) {
                var row = rows[i];
                if (!row) {
                    continue;
                }
                var index = row.index;
                if (typeof index !== 'number') {
                    index = i;
                }
                callback(row, index);
            }
        }
        function sortByIndex(items) {
            return items.sort(function (a, b) {
                return a.index - b.index;
            });
        }
        function pushUnique(array, el) {
            if (array.indexOf(el) < 0) {
                array.push(el);
            }
        }
        function getSpan(mergedCells, ref) {
            for (var i = 0; i < mergedCells.length; ++i) {
                var range = mergedCells[i];
                var a = range.split(':');
                var topLeft = a[0];
                if (topLeft === ref) {
                    var bottomRight = a[1];
                    topLeft = parseRef(topLeft);
                    bottomRight = parseRef(bottomRight);
                    return {
                        rowSpan: bottomRight.row - topLeft.row + 1,
                        colSpan: bottomRight.col - topLeft.col + 1
                    };
                }
            }
        }
        function parseRef(ref) {
            function getcol(str) {
                var upperStr = str.toUpperCase();
                var col = 0;
                for (var i = 0; i < upperStr.length; ++i) {
                    col = col * 26 + upperStr.charCodeAt(i) - 64;
                }
                return col - 1;
            }
            function getrow(str) {
                return parseInt(str, 10) - 1;
            }
            var m = /^([a-z]+)(\d+)$/i.exec(ref);
            return {
                row: getrow(m[2]),
                col: getcol(m[1])
            };
        }
        function fillCells(data, ctx) {
            var row = data._source;
            var rowIndex = data.index;
            var cells = row.cells;
            var cellData = data.cells;
            if (!cells) {
                return;
            }
            for (var i = 0; i < cells.length; i++) {
                var cell = cells[i] || EMPTY_CELL;
                var rowSpan = cell.rowSpan || 1;
                var colSpan = cell.colSpan || 1;
                var cellIndex = insertCell(cellData, cell);
                var topLeftRef = ref(rowIndex, cellIndex);
                if (rowSpan === 1 && colSpan === 1) {
                    var tmp = getSpan(ctx.mergedCells, topLeftRef);
                    if (tmp) {
                        colSpan = tmp.colSpan;
                        rowSpan = tmp.rowSpan;
                    }
                }
                spanCell(cell, cellData, cellIndex, colSpan);
                if (rowSpan > 1 || colSpan > 1) {
                    pushUnique(ctx.mergedCells, topLeftRef + ':' + ref(rowIndex + rowSpan - 1, cellIndex + colSpan - 1));
                }
                if (rowSpan > 1) {
                    for (var ri = rowIndex + 1; ri < rowIndex + rowSpan; ri++) {
                        var nextRow = ctx.rowsByIndex[ri];
                        if (!nextRow) {
                            nextRow = ctx.rowsByIndex[ri] = {
                                index: ri,
                                cells: []
                            };
                            ctx.rowData.push(nextRow);
                        }
                        spanCell(cell, nextRow.cells, cellIndex - 1, colSpan + 1);
                    }
                }
            }
        }
        function insertCell(data, cell) {
            var index;
            if (typeof cell.index === 'number') {
                index = cell.index;
                insertCellAt(data, cell, cell.index);
            } else {
                index = appendCell(data, cell);
            }
            return index;
        }
        function insertCellAt(data, cell, index) {
            data[index] = cell;
        }
        function appendCell(data, cell) {
            var index = data.length;
            for (var i = 0; i < data.length + 1; i++) {
                if (!data[i]) {
                    data[i] = cell;
                    index = i;
                    break;
                }
            }
            return index;
        }
        function spanCell(cell, row, startIndex, colSpan) {
            for (var i = 1; i < colSpan; i++) {
                var tmp = {
                    borderTop: cell.borderTop,
                    borderRight: cell.borderRight,
                    borderBottom: cell.borderBottom,
                    borderLeft: cell.borderLeft
                };
                insertCellAt(row, tmp, startIndex + i);
            }
        }
        var SPREADSHEET_FILTERS = function (ref$1) {
            var ref = ref$1.ref;
            var columns = ref$1.columns;
            var generators = ref$1.generators;
            return '\n<autoFilter ref="' + ref + '">\n  ' + foreach(columns, function (col) {
                return '\n    <filterColumn colId="' + col.index + '">\n      ' + generators[col.filter](col) + '\n    </filterColumn>\n  ';
            }) + '\n</autoFilter>';
        };
        var SPREADSHEET_CUSTOM_FILTER = function (ref) {
            var logic = ref.logic;
            var criteria = ref.criteria;
            return '\n<customFilters ' + (logic === 'and' ? 'and="1"' : '') + '>\n' + foreach(criteria, function (f) {
                var op = spreadsheetFilters.customOperator(f);
                var val = spreadsheetFilters.customValue(f);
                return '<customFilter ' + (op ? 'operator="' + op + '"' : '') + ' val="' + val + '"/>';
            }) + '\n</customFilters>';
        };
        var SPREADSHEET_DYNAMIC_FILTER = function (ref) {
            var type = ref.type;
            return '<dynamicFilter type="' + spreadsheetFilters.dynamicFilterType(type) + '" />';
        };
        var SPREADSHEET_TOP_FILTER = function (ref) {
            var type = ref.type;
            var value = ref.value;
            return '<top10 percent="' + (/percent$/i.test(type) ? 1 : 0) + '"\n       top="' + (/^top/i.test(type) ? 1 : 0) + '"\n       val="' + value + '" />';
        };
        var SPREADSHEET_VALUE_FILTER = function (ref) {
            var blanks = ref.blanks;
            var values = ref.values;
            return '<filters ' + (blanks ? 'blank="1"' : '') + '>\n    ' + foreach(values, function (value) {
                return '\n      <filter val="' + value + '" />';
            }) + '\n  </filters>';
        };
        function spreadsheetFilters(filter) {
            return SPREADSHEET_FILTERS({
                ref: filter.ref,
                columns: filter.columns,
                generators: {
                    custom: SPREADSHEET_CUSTOM_FILTER,
                    dynamic: SPREADSHEET_DYNAMIC_FILTER,
                    top: SPREADSHEET_TOP_FILTER,
                    value: SPREADSHEET_VALUE_FILTER
                }
            });
        }
        spreadsheetFilters.customOperator = function (f) {
            return {
                eq: 'equal',
                gt: 'greaterThan',
                gte: 'greaterThanOrEqual',
                lt: 'lessThan',
                lte: 'lessThanOrEqual',
                ne: 'notEqual',
                doesnotstartwith: 'notEqual',
                doesnotendwith: 'notEqual',
                doesnotcontain: 'notEqual',
                doesnotmatch: 'notEqual'
            }[f.operator.toLowerCase()];
        };
        spreadsheetFilters.customValue = function (f) {
            function esc(str) {
                return str.replace(/([*?])/g, '~$1');
            }
            switch (f.operator.toLowerCase()) {
            case 'startswith':
            case 'doesnotstartwith':
                return esc(f.value) + '*';
            case 'endswith':
            case 'doesnotendwith':
                return '*' + esc(f.value);
            case 'contains':
            case 'doesnotcontain':
                return '*' + esc(f.value) + '*';
            default:
                return f.value;
            }
        };
        spreadsheetFilters.dynamicFilterType = function (type) {
            return {
                quarter1: 'Q1',
                quarter2: 'Q2',
                quarter3: 'Q3',
                quarter4: 'Q4',
                january: 'M1',
                february: 'M2',
                march: 'M3',
                april: 'M4',
                may: 'M5',
                june: 'M6',
                july: 'M7',
                august: 'M8',
                september: 'M9',
                october: 'M10',
                november: 'M11',
                december: 'M12'
            }[type.toLowerCase()] || type;
        };
        kendo.deepExtend(kendo.ooxml, {
            IntlService: IntlService,
            Workbook: Workbook,
            Worksheet: Worksheet
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('ooxml/main', [
        'kendo.core',
        'ooxml/kendo-ooxml'
    ], f);
}(function () {
    (function ($) {
        var Workbook = kendo.ooxml.Workbook;
        kendo.ooxml.IntlService.register({ toString: kendo.toString });
        kendo.ooxml.Workbook = Workbook.extend({
            toDataURL: function () {
                var result = Workbook.fn.toDataURL.call(this);
                if (typeof result !== 'string') {
                    throw new Error('The toDataURL method can be used only with jsZip 2. Either include jsZip 2 or use the toDataURLAsync method.');
                }
                return result;
            },
            toDataURLAsync: function () {
                var deferred = $.Deferred();
                var result = Workbook.fn.toDataURL.call(this);
                if (typeof result === 'string') {
                    result = deferred.resolve(result);
                } else if (result && result.then) {
                    result.then(function (dataURI) {
                        deferred.resolve(dataURI);
                    }, function () {
                        deferred.reject();
                    });
                }
                return deferred.promise();
            }
        });
    }(window.kendo.jQuery));
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));
(function (f, define) {
    define('kendo.ooxml', ['ooxml/main'], f);
}(function () {
    var __meta__ = {
        id: 'ooxml',
        name: 'XLSX generation',
        category: 'framework',
        advanced: true,
        depends: ['core']
    };
}, typeof define == 'function' && define.amd ? define : function (a1, a2, a3) {
    (a3 || a2)();
}));