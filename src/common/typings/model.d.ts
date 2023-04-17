/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-03-09 21:43:01
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-16 21:14:41
 * @FilePath: /nodeTrade/src/common/typings/model.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Koa from 'koa';
import mysql from 'mysql';

export namespace Models {
  type Ctx = Koa.Context;


  

  // mysql相关错误
  interface MysqlError {
    msg: string
    error?: mysql.MysqlError
  }
  

  // mysql 连接数据库返回值
  interface Result {
    /** `state===1`时为成功 */
    state: number
    /** 结果数组 或 对象 */
    results: any
    /** 状态 */
    fields?: Array<mysql.FieldInfo>
    /** 错误信息 */
    error?: mysql.MysqlError
    /** 描述信息 */
    msg: string
  }
}