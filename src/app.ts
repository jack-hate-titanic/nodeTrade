/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-03-09 21:43:01
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-10 22:15:56
 * @FilePath: /nodeTrade/src/app.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Koa from 'koa';
import initCore from './app/Init';
import Config from './config.default';


// 创建app实例
const app = new Koa();

// 执行初始化
initCore(app);

// app.use(async (ctx) => {
//   ctx.body = 'hello koa'
// });

app.listen(Config.HTTP_PORT, () => {
  console.log('run success');
  console.log(`app start at port ${Config.HTTP_PORT}`);
  console.log(process.env.NODE_ENV);
})