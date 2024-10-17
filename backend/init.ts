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
    //定数値を入れる
  };
}
