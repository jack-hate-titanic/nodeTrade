/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-25 19:45:28
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-02-26 19:02:08
 * @FilePath: /koa2-ts-template/src/middlewares/catchError.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/middlewares/catchError.ts
import koa from 'koa';
import { Success, HttpException } from '../core/HttpException';

export async function catchError(ctx: koa.Context, next: Function) {
  const { method, path } = ctx
  try {
    await next()
  } catch (error: any) {
    // 当前错误是否是我们自定义的Http错误
    const isHttpException = error instanceof HttpException

    // 如果不是, 则抛出错误
    if (!isHttpException) {
      ctx.body = {
        msg: '未知错误',
        errorCode: 9999,
        requestUrl: `${method} ${path}`,
      }
      ctx.status = 500
    }
    // 如果是已知错误
    else {
      if (error.responseType) {
        ctx.response.type = error.responseType
      }
      // 如果是文件流, 则直接返回文件
      if (error.isBuffer) {
        ctx.body = error.data
      } else {
        ctx.body = {
          msg: error.message,
          errorCode: error.errorCode,
          data: error.data,
        }
      }

      ctx.status = error.code
    }
  }
}