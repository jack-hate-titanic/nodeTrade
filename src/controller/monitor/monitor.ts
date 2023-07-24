/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-16 20:58:38
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-07-24 23:52:45
 * @FilePath: /nodeTrade/src/controller/monitor/monitor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import KoaRouter from 'koa-router';
import schedule from 'node-schedule';
import { Models } from '../../common/typings/model'
import { StockType } from '../../common/interface/stock';
import { addStockToMonitor, getStocks, updateStocks, deleteStockByCode } from '../../service/monitor/monitor';
import Config from '../../config.default';


const router = new KoaRouter({
  prefix: `${Config.API_PREFIX}v1/monitor`
})

// 获取所有监控的股票
router.get('/stocks', async (ctx: Models.Ctx) => {
  const stocks = await getStocks();
  ctx.success(stocks)
})

// 添加到监控列表
router.post('/stock', async (ctx: Models.Ctx) => {
  const stock = ctx.request.body as StockType;
  const result = await addStockToMonitor(stock);
  if (result.msg === 'ok') {
    ctx.success('', '添加成功')
  }
})

// 更新数据
router.put('/stocks', async (ctx: Models.Ctx) => {
  schedule.scheduleJob('42 * * * * *', function(){
    updateStocks();
    console.log('The answer to life, the universe, and everything!');

  });
 
  ctx.success('更新数据成功，请耐心等待10分钟', '')
})

// 删除监控股票
router.delete('/stock', async (ctx: Models.Ctx) => { 
  const code = ctx.request.query['code'];
  const result = await deleteStockByCode(code as string);
  if (result.msg === 'ok') {
    ctx.success('删除成功');
  }
})

export default router;