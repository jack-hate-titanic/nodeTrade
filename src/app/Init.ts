/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-03-09 21:43:01
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-14 22:14:12
 * @FilePath: /nodeTrade/src/core/Init.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import path from 'path'
import Router from 'koa-router'
import cors from 'koa2-cors';
import { getAllFilesExport } from '../common/utils/utils'
import { catchError } from '../middlewares/catchError'
import { responseBody } from '../middlewares/responseBody';

class Init {
  public static app: Koa
  public static initCore(app: Koa) {
    Init.app = app
    Init.loadBodyParser()
    Init.loadResponseBody();
    Init.initCatchError()
    Init.initCors()
    Init.initLoadRouters()
  }

  static loadBodyParser() {
    Init.app.use(koaBodyParser())
  }

  static async initLoadRouters() {
    const dirPath = path.join(`${process.cwd()}/src/controller/`)
    getAllFilesExport(dirPath, (file: Router) => {
      Init.app.use(file.routes())
    })
  }

  // 错误监听和日志处理
  static initCatchError() {
    Init.app.use(catchError)
  }

  // 跨域请求
  static initCors() {
    Init.app.use(cors())
  }

  static loadResponseBody() {
    Init.app.use(responseBody())
  }
}

export default Init.initCore
