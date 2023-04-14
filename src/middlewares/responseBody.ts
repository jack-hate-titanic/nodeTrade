/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-04-12 21:13:48
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-13 23:06:21
 * @FilePath: /koa2-ts-template/src/middlewares/responseBody.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import koa from 'koa';

export const responseBody = () => {
  return async (ctx: koa.Context, next: Function) => {
    
    ctx.success = (data: any, msg?: string, success = true) => {
      ctx.type = 'json'
      ctx.body = {
        code: 200,
        data,
        msg,
        success
      };
    }
    ctx.fail = (msg: string) => { 
      ctx.type = 'json'
      ctx.body = {
        code: 500,
        msg,
        success: false
      };
    }
    await next();
  }
}