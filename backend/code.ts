import { appInit } from './init';
var spId = appInit.getAppDataSpId(); //production
//データ側スプレッドシートIDはgetAppDataSpIdメソッドから取得に変更

/** @enum{number} */
//メインシートのカラム情報を記述

const MAINSHEET_COLUMN = {
  TRADER: 0,
  START_DATE: 1,
  DAYOFWEEK: 2,
  WEATHER: 3,
  REPORTER: 4,
  TODAY_PLACE: 5,
  TODAY_CONSTRUCTION_SCHEDULE: 6,
  TODAY_WORKERS: 7,
  NEXT_PLACE: 8,
  NEXT_CONSTRUCTION_SCHEDULE: 9,
  NEXT_WORKERS: 10,
  MACHINE: 11,
  SAFETY_INSTRUCTION: 12,
  END_CONSTRUCTION: 15,
  NEXT_SAFETY_NOTES: 13,
  FOREMAN: 14,
  USER_CHECK: 16,
  ETC: 17,
  USER_CHECK_CHECKBOX: 18,
  ADMIN_CHECK_CHECKBOX: 19,
};

//ウェブアプリスプシの必要シート名称を列挙
const SPREADSHEET_SHEETNAME = {
  INSPECTION_DATA: 'insp',
  MAIN: 'Main',
  LOG: 'log',
  CONFIG: 'config',
  ADMIN: 'admin',
};

global.doGet = (e: GoogleAppsScript.Events.DoGet) => {
  const mode = e.parameter.mode;
  const bucodeString = e.parameter.bucode;
  const bucodeId = decodeURI(bucodeString);

  let htmlTemp;
  if (mode == undefined) {
    htmlTemp = HtmlService.createTemplateFromFile('index');
  } else if (mode == 'admin') {
    //
  }
  //htmlTemp.QUERYLIST = buildSelectOptions(bucodeId);
  return htmlTemp?.evaluate();
};

/**
 * @description inputBoxへdatalistをセットする
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 24/07/2023
 * @param {number} [defaultIndex=1]
 * @param {string} [datalistId="safetylists"]
 * @returns {*}
 */
global.buildSelectOptions = function (
  bucode: number,
  defaultIndex: number = 1,
  datalistId: string = 'querylist',
  defaultListSheetIndex = 1,
  defaultReturnSheetIndex = 10,
  listSheetName = 'data'
) {
  let html = `<datalist id="${datalistId}">`;
  const member = getWordsFromList(
    defaultListSheetIndex,
    listSheetName,
    defaultReturnSheetIndex,
    bucode
  );
  const showValue = getWordsFromList(
    defaultListSheetIndex,
    listSheetName,
    7,
    bucode
  );
  for (let i = 0; i <= member.length - 1; i++) {
    const value1 = member[i];
    const value2 = showValue[i];
    if (i == defaultIndex) {
      //デフォルト処理
      const option = `<option value="${value1}" selected>${value1}:${value2}</option>\n`;
      html = html + option;
    } else {
      const option = `<option value="${value1}">${value1}:${value2}</option>\n`;
      html = html + option;
    }
  }
  html = html + `</datalist>`;
  return html;
};

/**
 * @description 安全指示事項のリストを取得
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 2023-04-17
 * @returns {string[]}
 */
function getWordsFromList(
  listIndex: number,
  sheetName: string,
  returnIndex: number,
  bucode: number | string
): string[] {
  const sp = SpreadsheetApp.openById(spId);
  const sh = sp.getSheetByName(sheetName);
  const data = sh?.getDataRange().getDisplayValues();
  let filterData;
  if (data == undefined) {
    return ['nodata'];
  }
  if (bucode != '') {
    filterData = data.filter((element) => {
      const condition = element[listIndex] == bucode;
      if (condition) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    filterData = data;
  }
  let memberJson = [];
  for (let i = 0; i < filterData.length; i++) {
    const element = filterData[i][returnIndex];
    memberJson.push(element);
  }
  return memberJson;
}
