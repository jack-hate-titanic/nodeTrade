/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-28 20:33:34
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-02-28 22:14:55
 * @FilePath: /koa2-ts-template/src/api/v1/system/auth/register.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import KoaRouter from 'koa-router';
import { Models } from '../../../../common/typings/model'
import { command } from '../../../../server/mysql';
import { Success } from '../../../../core/HttpException';
import { format } from '../../../../common/utils/date';
import Config from '../../../../config/Config';

interface Register {
  password: string,
  userName: string,
  email: string,
}

const router = new KoaRouter({
  prefix: `${Config.API_PREFIX}v1/system/auth`
})



router.post('/register', async (ctx: Models.Ctx) => {
  const { password, userName, email } = ctx.request.body as Register;
  const date = format(new Date());
  // 注册
  await command(`
    insert into system_user(user_name, email, password, created_at, updated_at) values ('${userName}', '${email}', '${password}', '${date}', '${date}');
  `)

  ctx.body = new Success();
})

export default router;