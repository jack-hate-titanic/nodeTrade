import moment from "moment";
import { StockType } from "../../common/interface/stock";
import { command } from "../../app/db";

export async function addStockToMonitor(stock: StockType) {
  const { code, name, close, close_pct, profit = 0 } = stock;
  const date = moment(stock.date).format("YYYY-MM-DD HH:mm:ss");
  const init_price = close;
  
  const result = await command(
    `insert into stock (code, name, date, close, close_pct, profit, init_price) values ('${code}', '${name}','${date}', '${close}', '${close_pct}', '${profit}', '${init_price}')`
  )
  return result;
}
 
export async function getStocks() {
  const result = await command(
    `select * from stock`
  );
  if (result.msg === 'ok') {
    const stocks = result.results as StockType[];
    const newStocks = stocks.map((stock) => {
      const { close, init_price } = stock;
      // 计算收益率
      stock.profit = Number(Number((close - init_price) / init_price).toFixed(2));
      return stock;
    })
    return newStocks;
  }
}