/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-15 09:57:43
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-16 21:17:00
 * @FilePath: /nodeTrade/src/service/StockType/StockType.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { readCsvData } from "../../common/utils/utils"
import { StockType, StockCodeType } from "../../common/interface/stock";

// 计算五日均线上穿十日均线
export const getStocksByMA = async() => {
  const stocks = await readCsvData('code/code.csv');
  const stockList: StockType[] = [];
  for (let i = 0; i < (stocks as StockCodeType[]).length; i++){
    const data = await readCsvData(`price/${(stocks as StockCodeType[])[i].code}.csv`);
    const lastData = (data as StockType[]) [(data as StockType[]).length - 1];
    const penultimateData = (data as StockType[])[(data as StockType[]).length - 2];
    if (lastData && penultimateData && !!penultimateData['ma_10']) {
      if ((Number(penultimateData['ma_5']) < Number(penultimateData['ma_10'])) && (Number(lastData['ma_5']) > Number(lastData['ma_10']))) {
        stockList.push(lastData);
      }
    } 
  }
  return stockList;
}