const Router = require("koa-router");

const { Resolve } = require("@extend/helper");
const res = new Resolve()

const router = new Router()

router.get('/',async(ctx) =>{
    ctx.response.status = 200
    ctx.body = "欢迎使用博客后端api"
})

module.exports = router
