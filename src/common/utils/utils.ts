/*
 * @Author: 悦者生存 1002783067@qq.com
 * @Date: 2023-02-25 19:34:42
 * @LastEditors: 悦者生存 1002783067@qq.com
 * @LastEditTime: 2023-04-15 13:08:32
 * @FilePath: /koa2-ts-template/src/common/utils/utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import fs from 'fs'
import path from 'path'
import { format } from './date'
const csv = require('csv-parser');
/**
 * 获取某个目录下所有文件的默认导出
 * @param filePath 需要遍历的文件路径
 */
export async function getAllFilesExport(filePath: string, callback: Function) {
  // 根据文件路径读取文件, 返回一个文件列表
  const files: string[] = fs.readdirSync(filePath)
  // 遍历读取到的文件列表
  files.forEach((fileName) => {
    // path.join得到当前文件的绝对路径
    const absFilePath: string = path.join(filePath, fileName)
    const stats: fs.Stats = fs.statSync(absFilePath)
    const isFile = stats.isFile() // 是否为文件
    const isDir = stats.isDirectory() // 是否为文件夹
    if (isFile) {
      const file = require(absFilePath)
      callback(file.default)
    }
    if (isDir) {
      getAllFilesExport(absFilePath, callback) // 递归, 如果是文件夹, 就继续遍历该文件夹里面的文件；
    }
  })
}


// src/common/utils/utils.ts
export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
  return key in object
}

/**
 * 下划线转驼峰
 * @param str
 * @returns
 */
export function lineToHump(str: string): string {
  if (str.startsWith('_')) {
    return str
  }
  return str.replace(/\_(\w)/g, (all, letter: string) => letter.toUpperCase())
}

/**
 * 驼峰转下划线
 * @param str
 * @returns
 */
export function humpToLine(str = ''): string {
  if (typeof str !== 'string') {
    return str
  }
  return str.replace(/([A-Z])/g, '_$1').toLowerCase()
}

/**
 * 将对象的所有属性由下划线转换成驼峰
 * @param obj
 * @returns
 */
export function lineToHumpObject(obj: Object) {
  let key: string
  const element: {
    [key: string]: any
  } = {}
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isValidKey(key, obj)) {
        const value = obj[key]
        if (typeof key === 'string' && (key as string).indexOf('_at') > -1) {
          element[lineToHump(key)] = format(value)
        } else {
          element[lineToHump(key)] = value
        }
      }
    }
  }
  return {
    ...element,
  }
}

/**
 * 将对象的所有属性由驼峰转换为下划线
 * @param obj
 * @returns
 */
export function humpToLineObject(obj: Object) {
  let key: string
  const element: {
    [key: string]: any
  } = {}
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (isValidKey(key, obj)) {
        const value = obj[key]
        element[humpToLine(key)] = value || null
      }
    }
  }
  return {
    ...element,
  }
}

// 读取数据
export const readCsvData = (fileName: string) => {
  const result: any[] = [];
  return new Promise((resolve) => {
    const file = `/Users/wson/Desktop/Trader/data/${fileName}`;
    // 判断文件是否存在
    if (!fs.existsSync(file)) return;
    fs.createReadStream(file)
    .pipe(csv())
    .on('data', (data: any) => result.push(data))
    .on('end', () => {
      resolve(result);
    });
  })
 
}
