import { appInit } from './init';
//データ側スプレッドシートIDはgetAppDataSpIdメソッドから取得に変更

function doGet(e: GoogleAppsScript.Events.DoGet) {
  const mode = e.parameter.mode;
  let htmlTemp: GoogleAppsScript.HTML.HtmlTemplate;
  if (mode == undefined) {
    htmlTemp = HtmlService.createTemplateFromFile('index');
  } //htmlTemp.QUERYLIST = buildSelectOptions(bucodeId);
  return htmlTemp.evaluate();
}
