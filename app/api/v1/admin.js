const Router = require("koa-router");

const {
    RegisterValidator,
    // AdminLoginValidator
} = require('@validators/admin')

// const { AdminDao } = require("@dao/admin");
// const { Auth } = require('@middlewares/auth')
// const { LoginManager } = require('@service/login')
const { Resolve } = require("@lib/helper");
const res = new Resolve()

const AUTH_ADMIN = 16
const router = new Router({
    prefix:'/api/v1/admin'
})

router.post('/register',async(ctx) =>{
    console.log(ctx);
    const vld = await new RegisterValidator().validate(ctx)
    console.log(vld);
    // const [err,data] = await AdminDao.create({
    //     email:vld.get('body.email'),
    //     password:vld.get('body.password2'),
    //     nickname:vld.get('body.nickname')
    // })

    // if(!err){
    //     ctx.response.status = 200
    //     ctx.body = res.json(data)
    // }else{
    //     ctx.body = res.fail(err)
    // }
})

module.exports = router
