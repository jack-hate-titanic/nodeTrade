import moment from "moment";

import fs from 'fs-extra';
import { StockType } from "../../common/interface/stock";
import { readCsvData, calculateProfit } from "../../common/utils/utils";
import { sendMail } from "../../common/utils/sendMail";
import { command } from "../../app/db";
import { Models } from "../../common/typings/model";

const { spawn } = require('child_process');


// 添加要监听的股票
export async function addStockToMonitor(stock: StockType) {
  const { code, name, close, close_pct, profit = 0, ma_5, ma_7, ma_10, ma_13, ma_20, ma_60 } = stock;
  const date = moment(stock.date).format("YYYY-MM-DD HH:mm:ss");
  const init_price = close;
  
  const result = await command(
    `insert into stock (code, name, date, close, close_pct, profit, init_price, ma_5, ma_7, ma_10, ma_13, ma_20, ma_60) values ('${code}', '${name}','${date}', '${close}', '${close_pct}', '${profit}', '${init_price}', '${ma_5}', '${ma_7}', '${ma_10}', '${ma_13}', '${ma_20}', '${ma_60}')`
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

// 整合信息
export async function integrateInfo(stocks: StockType[]) {
  // 为空不执行
  if (!stocks.length) { 
    return;
  }
  
  // 开始编写html内容
  const htmlPre = `
  <table border="1"  style="width: 600px">
    <thead>${stocks[0].date.toLocaleString()}股票复盘</thead>
    <tbody>
      <tr>
        <td>股票名</td>
        <td>7日</td>
        <td>13日</td>
        <td>20日</td>
        <td>买卖建议</td>
      </tr>
  `;

  let htmlContent = '';

  stocks.forEach((stock) => {
    const is7Buy = stock.close > stock.ma_7;
    const is13Buy = stock.close > stock.ma_13;
    const is20Buy = stock.close > stock.ma_20;
    let advice = '';

    if (is7Buy) {
      advice = '买入三分之一'
    }

    if (is13Buy) {
      advice = '买入三分之二'
    }
    
    if (is20Buy) {
      advice = '买入全部'
    }
    if (!is20Buy){
      advice = '卖出三分之一'
    }

    if (!is13Buy){
      advice = '卖出三分之二'
    }

    if (!is7Buy) {
      advice = '卖出全部'
    }



    htmlContent += `
      <tr>
        <td>${stock.name}</td>
        <td>${is7Buy?'是':'否'}</td>
        <td>${is13Buy?'是':'否'}</td>
        <td>${is20Buy?'是':'否'}</td>
        <td>${advice}</td>
      </tr>
    `
  })

  const htmlAfter = `
    </ tbody>
  </table>
  `
  const html = htmlPre + htmlContent + htmlAfter;

  sendMail(html);
}

// 更新监控数据
export async function updateMonitorStocks() {
  const result = await command(
    `select * from stock`
  );
  if (result.msg === 'ok') {
    const stocks = result.results as StockType[];
    for (let i = 0; i < stocks.length; i++){
      if (!stocks[i].code) {
        continue;
      }
      const data = await readCsvData(`price/${stocks[i].code}.csv`);
      const lastData = (data as StockType[])[(data as StockType[]).length - 1];
      const { close, close_pct, update_time, ma_5, ma_10, ma_13, ma_20, ma_7, ma_60 } = lastData;
      // 更新时间
      const date = moment(update_time).format("YYYY-MM-DD HH:mm:ss");
      // 更新表中的值
      await command(`update stock set close='${close}',close_pct='${close_pct}',date='${date}',ma_5='${ma_5}',ma_7='${ma_7}',ma_10='${ma_10}',ma_13='${ma_13}',ma_20='${ma_20}',ma_60='${ma_60}' where code=${stocks[i].code};`)
      // 整合信息
      // 是否复合卖出条件
      // sellStock({
      //   ...lastData,
      //   init_price: stocks[i].init_price
      // });
     
      // wbsocket 提醒浏览器刷新
    }
    integrateInfo(result.results);
    return;
  }
} 


// 看是否符合卖出条件
// export async function sellStock(stock: StockType) {
//   const { close, init_price, ma_5, ma_10, code } = stock;
//     // 收益率
//     const profit = calculateProfit(close, init_price);
//     let signal = '';
//     if (profit > 10) {
//       signal = '收益大于10%';
//       sendMail(code, signal);
//     }
//     if (profit < -10) {
//       signal = '跌幅达到10%';
//       sendMail(code, signal);
//     }
//     if (ma_10 > ma_5) {
//       signal = '5日均线下穿10日均线';
//       sendMail(code, signal);
//     }
    
// }

// 根据code删除股票
export async function deleteStockByCode(code: string) {
  const result = await command(`delete from stock where code='${code}'`);
  return result;
}