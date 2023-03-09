/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-25 19:38:25
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-02-28 21:47:39
 * @FilePath: /koa2-ts-template/src/config/config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/config/Config.ts
const isDev = process.env.NODE_ENV === 'development'

export default class Config {
  // 服务器端口
  public static readonly HTTP_PORT = 9001;
  // 接口前缀
  public static readonly API_PREFIX = '/api/';
  // 根目录
  public static readonly BASE = isDev ? 'src' : 'dist/src';
  // mysql配置
  public static readonly MYSQL = {
    DB_NAME: 'admin',
    HOST: '127.0.0.1',
    PORT: 3306,
    USER_NAME: 'root',
    PASSWORD: '123456',
    CONNECTION_LIMIT: 60 * 60 * 1000,
    CONNECT_TIMEOUT: 1000 * 60 * 60 * 1000,
    ACQUIRE_TIMEOUT: 60 * 60 * 1000,
    TIMEOUT: 1000 * 60 * 60 * 1000,
  }

  // 默认时间格式
  public static readonly DEFAULT_DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss'
}