const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const cors = require('koa2-cors')
const ratelimit = require('koa-ratelimit')


// 绝对路径前缀简化，如@
require('module-alias/register')

const catchError = require('./middlewares/exception')

const app = new Koa()

app.use(cors())
app.use(catchError)
app.use(parser())


// 接口调用频率限制（Rate-Limiting）
// Rate limiter middleware for koa.
// https://github.com/koajs/ratelimit
const db = new Map()
app.use(ratelimit({
    driver:'memory',
    db,
    duration:60000,
    errorMessage:'Sometimers You Just Have to Slow Down',
    id:(ctx)=>ctx.ip,
    headers:{
        remaining:'Rate-Limit-Remaining',
        reset:'Rate-Limit-Reset',
        total:'Rate-Limit-Total'
    },
    max:100,
    disableHeader:false,
    whitelist:(ctx)=>{},
    blacklist:(ctx)=>{}
}))

InitManager.initCore(app)

app.listen(5001, ()=>{
    console.log('Koa is listening in http://localhost:5001');
})

module.exports = app
