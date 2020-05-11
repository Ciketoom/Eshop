/*
七牛云配置
*/
const qiniu = require('qiniu')

// 创建上传凭证
const accessKey = 'MzzqzT_xgSezVzXbB3lfUij4YcLnZNlzDZzJKMs4'
const secretKey = 'V85w76r0aW93759nNldByoHP45Bo8CMtxgK31HS6'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
  scope: 'eshopzjh',
  expires: 7200
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.exports = {
  uploadToken
}