import Koa from 'koa';
import initCore from './core/Init';
import Config from './config/Config';


// 创建app实例
const app = new Koa();

// 执行初始化
initCore(app);

app.use(async (ctx) => {
  ctx.body = 'hello koa'
});

app.listen(Config.HTTP_PORT, () => {
  console.log('run success');
  console.log(`app start at port ${Config.HTTP_PORT}`);
  console.log(process.env.NODE_ENV);
})