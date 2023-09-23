import { appInit } from './init';
//データ側スプレッドシートIDはgetAppDataSpIdメソッドから取得に変更

global.doGet = (e: GoogleAppsScript.Events.DoGet) => {
  const mode = e.parameter.mode;
  const bucodeString = e.parameter.bucode;
  const bucodeId = decodeURI(bucodeString);

  let htmlTemp: GoogleAppsScript.HTML.HtmlTemplate;
  if (mode == undefined) {
    htmlTemp = HtmlService.createTemplateFromFile('index');

    htmlTemp.SHOPCODE = bucodeId;
  } else if (mode == 'admin') {
    //

    htmlTemp = HtmlService.createTemplateFromFile('index');
  } else {
    htmlTemp = HtmlService.createTemplateFromFile('index');
  }
  //htmlTemp.QUERYLIST = buildSelectOptions(bucodeId);
  return htmlTemp.evaluate();
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
  bucode: number | string,
  defaultIndex: number = 1,
  datalistId: string = 'querylist',
  defaultListSheetIndex = 0,
  defaultReturnSheetIndex = 10,
  listSheetName = 'query'
) {
  let html = `<datalist id="${datalistId}">`;
  const member = global.getWordsFromList(
    defaultListSheetIndex,
    listSheetName,
    defaultReturnSheetIndex,
    bucode
  );
  const showValue = global.getWordsFromList(
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
global.getWordsFromList = (
  listIndex: number,
  sheetName: string,
  returnIndex: number,
  bucode: number | string
): string[] => {
  const spId = appInit.spId; //production
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
};

/**
 * document
 * @param mgrn
 * @param mgrnIndex
 * @param bucode
 * @param listIndex
 * @param sheetName
 * @returns
 */
global.getMachineDataArray = (
  mgrn: string,
  mgrnIndex: number,
  bucode: number | string,
  listIndex: number = 0,
  sheetName: string = 'query'
): string[] => {
  const spId = appInit.spId; //production
  const sp = SpreadsheetApp.openById(spId);
  const sh = sp.getSheetByName(sheetName);
  const data = sh?.getDataRange().getDisplayValues();
  if (data == undefined) {
    return ['nodata'];
  }

  for (let i = 0; i < data.length; i++) {
    const element = data[i][mgrnIndex];
    if (element === mgrn) {
      return data[i];
    }
  }

  return data[0];
};
const INSPSHEETCOLUMN = {
  ID: 0,
  MJCLASS: 1,
  CONTENTS: 2,
  CONFIRM: 3,
};
global.getInspDataArray = (
  mgrn: string,
  mgrnIndex: number,
  bucode: number | string,
  sheetName: string = 'insp'
): any[] => {
  const spId = appInit.spId; //production
  const sp = SpreadsheetApp.openById(spId);
  const sh = sp.getSheetByName(sheetName);
  const data = sh?.getDataRange().getDisplayValues();
  if (data == undefined) {
    return [['nodata']];
  }
  //data はあとでフィルター処理して単一機種コードのデータに変更
  let returnJson: object[] = [];
  let returnObj: { title: string; data: string[] | undefined };
  const titleArray = new Set<string>();
  const kish = new Set<string>();
  for (let i = 0; i < data.length; i++) {
    const element = data[i][INSPSHEETCOLUMN.MJCLASS];
    titleArray.add(element);
  }
  titleArray.forEach((element) => {
    const dataArray: string[] = [];
    data.forEach((elementArray) => {
      if (elementArray[INSPSHEETCOLUMN.MJCLASS] === element) {
        dataArray.push(
          `${elementArray[INSPSHEETCOLUMN.CONTENTS]}:【${
            elementArray[INSPSHEETCOLUMN.CONFIRM]
          }】`
        );
      }
    });
    returnObj = { title: element, data: dataArray };

    returnJson.push(returnObj);
  });
  return returnJson;
};
