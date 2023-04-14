/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-14 22:16:26
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-14 22:21:46
 * @FilePath: /nodeTrade/src/controller/stock/stock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import KoaRouter from 'koa-router';
import { Models } from '../../common/typings/model'
import { readCsvData } from '../../common/utils/utils';
import Config from '../../config/config.default';


const router = new KoaRouter({
  prefix: `${Config.API_PREFIX}v1/stock`
})

router.get('/stocks', async (ctx: Models.Ctx) => {
  const stocks = await readCsvData('code/code.csv')
  ctx.success(stocks)
})

export default router;