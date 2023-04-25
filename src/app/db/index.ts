/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-26 19:05:55
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-18 22:19:24
 * @FilePath: /koa2-ts-template/src/server/mysql/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/server/mysql/index.ts
import { Models } from '../../common/typings/model'
import pool from './pool'
import { DataBaseFailed } from '../HttpException'
import mysql from 'mysql'

/*
 * 数据库增删改查
 * @param command 增删改查语句
 * @param value 对应的值
 */
export async function command(command: string, value?: Array<any>): Promise<Models.Result> {
  try {
    return new Promise<Models.Result>((resolve, reject: (error: Models.MysqlError) => void) => {
      pool.getConnection((error: mysql.MysqlError, connection: mysql.PoolConnection) => {
       
        // 如果连接出错, 抛出错误
        if (error) {
          const result: Models.MysqlError = {
            error,
            msg: `数据库连接出错:${error.message}`,
          }
          reject(result)
        }

        const callback: mysql.queryCallback = (err, results?: any, fields?: mysql.FieldInfo[]) => {
          console.log(err);
          connection.release()
          if (err) {
            const result: Models.MysqlError = {
              error: err,
              msg: err.sqlMessage || '数据库增删改查出错',
            }

            reject(result)
          } else {
            const result: Models.Result = {
              msg: 'ok',
              state: 1,
              // 将数据库里的字段, 由下划线更改为小驼峰
              results: results,
              fields: fields || [],
            }
            resolve(result)
          }
        }
        // 执行mysql语句
        if (value) {
          pool.query(command, value, callback)
        } else {
          pool.query(command, callback)
        }
      })
    }).catch((error) => {
      throw new DataBaseFailed(error.msg)
    })
  } catch {
    throw new DataBaseFailed()
  }
}