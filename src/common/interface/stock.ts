/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-16 21:14:30
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-17 20:52:12
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
  ma_5: string;
  ma_10: string;
  ma_20: string;
  init_price: number;
}