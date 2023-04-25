import moment from "moment";
import schedule from 'node-schedule';
import fs from 'fs-extra';
import { StockType } from "../../common/interface/stock";
import { readCsvData, calculateProfit } from "../../common/utils/utils";
import { sendMail } from "../../common/utils/sendMail";
import { command } from "../../app/db";
import { Models } from "../../common/typings/model";

const { spawn } = require('child_process');


// 添加要监听的股票
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
      stock.profit = calculateProfit(close, init_price);
      return stock;
    })
    return newStocks;
  }
}

// 执行获取最新价格
export async function updateStocks() {
  // 首先删除price文件夹，在重新创建
  fs.emptyDirSync('/Users/wson/Desktop/Trader/data/price');
  const pythonProcess = spawn('python3', ['/Users/wson/Desktop/Trader/script/test.py']);
  pythonProcess.stdout.on('data', (data: unknown) => {
    console.log(`stdout: ${data}`);
  });
  
  pythonProcess.stderr.on('data', (data: unknown) => {
    console.error(`stderr: ${data}`);
  });
  
  pythonProcess.on('close', () => {
    console.log('执行完毕');
    updateMonitorStocks();
  });
}

// 更新监控数据
export async function updateMonitorStocks() {
  const result = await command(
    `select * from stock`
  );
  if (result.msg === 'ok') {
    const stocks = result.results as StockType[];
    for (let i = 0; i < stocks.length; i++){
      const data = await readCsvData(`price/${stocks[i].code}.csv`);
      const lastData = (data as StockType[]) [(data as StockType[]).length - 1];
      const { close, close_pct, update_time } = lastData;
      // 更新时间
      const date = moment(update_time).format("YYYY-MM-DD HH:mm:ss");
      // 更新表中的值
      await command(`update stock set close='${close}',close_pct='${close_pct}',date='${date}' where code=${stocks[i].code};`)
      // 是否复合卖出条件
      sellStock({
        ...lastData,
        init_price: stocks[i].init_price
      });
      // wbsocket 提醒浏览器刷新
    }
    return;
  }
}


// 看是否符合卖出条件
export async function sellStock(stock: StockType) {
  const { close, init_price, ma_5, ma_10, code } = stock;
    // 收益率
    const profit = calculateProfit(close, init_price);
    let signal = '';
    if (profit > 10) {
      signal = '收益大于10%';
      sendMail(code, signal);
    }
    if (profit < -10) {
      signal = '跌幅达到10%';
      sendMail(code, signal);
    }
    if (ma_10 > ma_5) {
      signal = '5日均线下穿10日均线';
      sendMail(code, signal);
    }
    
}

// 根据code删除股票
export async function deleteStockByCode(code: string) {
  const result = await command(`delete from stock where code='${code}'`);
  return result;
}