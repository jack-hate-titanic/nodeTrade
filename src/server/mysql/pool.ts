/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-26 19:04:58
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-02-28 21:05:12
 * @FilePath: /koa2-ts-template/src/server/mysql/pool.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/server/mysql/pool.ts
import mysql from 'mysql'
import mysqlConfig from './mysqlConfig';

const pool = mysql.createPool(mysqlConfig)
export default pool