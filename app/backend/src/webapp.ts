/**
 * @description doGet
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 04/07/2025
 * @export
 * @param {GoogleAppsScript.Events.DoGet} e
 * @returns {*}
 */
export function doGet(e: GoogleAppsScript.Events.DoGet) {
  const mode = e.parameter.mode;
  let htmlTemp: GoogleAppsScript.HTML.HtmlTemplate;
  if (mode == undefined) {
    htmlTemp = HtmlService.createTemplateFromFile("index");
  } //htmlTemp.QUERYLIST = buildSelectOptions(bucodeId);
  return htmlTemp.evaluate();
}
