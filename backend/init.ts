/**
 * @description 定数を呼び出すクラス
 * @description ウェブアプリのID等定数情報のカラムをINFOでもつ
 * @author yoshitaka <sato-yoshitaka@aktio.co.jp>
 * @date 27/07/2023
 * @class appInit
 */
export class appInit {
  static sp = SpreadsheetApp.getActiveSpreadsheet();
  static spId = this.sp.getId();
  static SETTINGSHEETINFO = {
    SHEETNAME: 'setting',
    SETTINGINFOAREA: 'A:E',
    SETTINGINFOCOLUMN: 2,
    SETTINGINFOFOLDERCOLUMN: 1,
    SETTINGINFOFOLDERROW: 2,
    SETTINGINFOSTARTROW: 0,
    TEMPFOLDER: 'A2',
    DISTFOLDER: 'B2',
    DATASPREADSHEETID: 'C2',
    WEBAPPURL: 'D2',
    FORMURL: 'E2',
    REPORTFOLDER: 'B6',
  };
  static getSaveFolderId() {
    const rootFolderId = appInit.sp
      .getSheetByName(this.SETTINGSHEETINFO.SHEETNAME)
      ?.getRange(appInit.SETTINGSHEETINFO.REPORTFOLDER)
      .getValue();
    return rootFolderId;
  }
  static getRootFolderId() {
    const rootFolderId = appInit.sp
      .getSheetByName(this.SETTINGSHEETINFO.SHEETNAME)
      ?.getRange(appInit.SETTINGSHEETINFO.DISTFOLDER)
      .getValue();
    return rootFolderId;
  }
  /**
   * getSpId
   */
  static getAppDataSpId() {
    const appSpId = appInit.sp
      .getSheetByName(this.SETTINGSHEETINFO.SHEETNAME)
      ?.getRange(appInit.SETTINGSHEETINFO.DATASPREADSHEETID)
      .getValue();
    return appSpId;
  }

  static getWebAppURL() {
    const appURL = appInit.sp
      .getSheetByName(this.SETTINGSHEETINFO.SHEETNAME)
      ?.getRange(appInit.SETTINGSHEETINFO.WEBAPPURL)
      .getValue();
    return appURL;
  }
  static getFormURL() {
    const formURL = appInit.sp
      .getSheetByName(this.SETTINGSHEETINFO.SHEETNAME)
      ?.getRange(this.SETTINGSHEETINFO.FORMURL)
      .getValue();
    return formURL;
  }
}
