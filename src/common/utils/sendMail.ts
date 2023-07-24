import Config from "../../config.default"

const nodemailer = require('nodemailer')

//创建一个SMTP客户端配置对象
const transporter = nodemailer.createTransport({
    // 默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等
    service: "QQ",
    auth: {
        // 发件人邮箱账号
        user: '1002783067@qq.com',
        //发件人邮箱的授权码 需要在自己的邮箱设置中生成,并不是邮件的登录密码
        pass: Config.MAIL_CODE
    }
})



export const sendMail = (html: string) => {
  // 配置收件人信息
  const receiver = {
    // 发件人 邮箱  '昵称<发件人邮箱>'
    from: `股市小A<1002783067@qq.com>`,
    // 主题
    subject: '卖出提醒',
    // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
    to: '1002783067@qq.com',
    // 可以使用html标签
    html
  }
  // 发送邮件 
  transporter.sendMail(receiver, (error:string, info: any) => {
    if (error) {
        return console.log('发送失败:', error);
    }
    transporter.close()
    console.log('发送成功:', info.response)
  })
}
