import Koa from 'koa'
import koaBodyParser from 'koa-bodyparser'
import path from 'path'
import Router from 'koa-router'
import { getAllFilesExport } from '../common/utils/utils'
import { catchError } from '../middlewares/catchError'

class Init {
  public static app: Koa
  public static initCore(app: Koa) {
    Init.app = app
    Init.loadBodyParser()
    Init.initLoadRouters()
    Init.initCatchError()
  }

  static loadBodyParser() {
    Init.app.use(koaBodyParser())
  }

  static async initLoadRouters() {
    const dirPath = path.join(`${process.cwd()}/src/api/`)
    getAllFilesExport(dirPath, (file: Router) => {
      Init.app.use(file.routes())
    })
  }

  // 错误监听和日志处理
  static initCatchError() {
    Init.app.use(catchError)
  }
}

export default Init.initCore
