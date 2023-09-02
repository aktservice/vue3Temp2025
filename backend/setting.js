/**
 * スクリプトプロパティを設定するための関数。
 */
function setProperty() {
  const property = PropertiesService.getScriptProperties();
  const props = {};
  property.setProperties(props);
}

/**
 * スクリプトプロパティを確認するための関数。
 */
function showProperty() {
  const property = PropertiesService.getScriptProperties();
  const str = JSON.stringify(property.getProperties());
  Logger.log(str);
}
