/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-26 19:09:51
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-02-26 19:10:05
 * @FilePath: /koa2-ts-template/src/common/utils/date.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/common/utils/date.ts
import moment from 'moment'
import Config from '../../config/config.default'

/**
 * 格式化时间
 * @param date
 * @param pattern
 * @returns
 */
export function format(date: Date, pattern = Config.DEFAULT_DATE_FORMAT) {
  return moment(date).format(pattern)
}