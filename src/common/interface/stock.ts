/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-16 21:14:30
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-07-24 23:22:08
 * @FilePath: /nodeTrade/src/common/interface/stock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface StockCodeType {
  code: string;
}

export interface StockType {
  name: string;
  code: string;
  date: string;
  close: number;
  close_pct: number;
  profit: number;
  ma_5: number;
  ma_7: number;
  ma_13: number;
  ma_60: number;
  ma_10: number;
  ma_20: number;
  init_price: number;
  update_time: string;
  diff: number;
  dea: number;
  macd: number;
}