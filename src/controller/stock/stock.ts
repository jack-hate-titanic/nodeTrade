/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-14 22:16:26
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-05-08 22:59:14
 * @FilePath: /nodeTrade/src/controller/stock/stock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import KoaRouter from 'koa-router';
import { Models } from '../../common/typings/model'
import { readCsvData } from '../../common/utils/utils';
import { getStocksByMA, getStockByCode, getStocksByMACDB, getStocksByMACD0 } from '../../service/stock/stock';
import Config from '../../config.default';


const router = new KoaRouter({
  prefix: `${Config.API_PREFIX}v1/stock`
})

// 获取所有股票代码
router.get('/stocks', async (ctx: Models.Ctx) => {
  const stocks = await readCsvData('code/code.csv')
  ctx.success(stocks)
})

// 根据策略获取股票
router.get('/stocksByMA', async (ctx: Models.Ctx) => {
  const result = await getStocksByMA();
  ctx.success(result)
})

// 获取macd金叉的股票
router.get('/stocksByMACDBuy', async (ctx: Models.Ctx) => {
  const result = await getStocksByMACDB();
  ctx.success(result);
})

// 获取macd金叉的股票
router.get('/stocksByMACD0', async (ctx: Models.Ctx) => {
  const result = await getStocksByMACD0();
  ctx.success(result);
})

// 获取单个股票
router.get('/stock', async (ctx: Models.Ctx) => {
  const code = ctx.request.query['code'];
  const result = await getStockByCode(code as string);
  ctx.success(result)
})

export default router;