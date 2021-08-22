const Router = require("koa-router");
const { registerService } = require("@service/user-register");
const { loginService } = require("@service/user-login");
const { authService } = require("@service/user-auth");
const { userService } = require("@service/user");
const { Resolve } = require("@extend/helper");
const { Auth } = require('@middlewares/auth');

const router = new Router({
    prefix: "/api/user",
});

// 注册
router.post("/register", async (ctx) => {
    const [err, data] = await registerService.run(ctx);

    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data);
    } else {
        ctx.body = await Resolve.fail(err);
    }
});

// 登录
router.post("/login", async (ctx) => {
    const [err, data] = await loginService.run(ctx);

    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data);
    } else {
        ctx.body = Resolve.fail(err);
    }
});

const AUTH_USER = 8;
const AUTH_ADMIN = 16;
// 获取用户信息
router.get("/auth", new Auth(AUTH_USER).verify,async (ctx) => {
    const [err, data] = await authService.run(ctx);
    console.log(err);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data);
    } else {
        ctx.body = Resolve.fail(err);
    }
});


// 获取用户列表
// 需要管理员及以上才能操作
router.get('/list', new Auth(AUTH_ADMIN).verify, async (ctx) => {
    // 查询用户信息
    let [err, data] = await userService.list(ctx.query);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data)
    } else {
        ctx.body = Resolve.fail(err)
    }
})

// 获取用户信息
// 需要管理员及以上才能操作
router.get('/detail/:id', new Auth(AUTH_ADMIN).verify, async (ctx) => {
    let [err, data] = await userService.detail(ctx.params.id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data)
    } else {
        ctx.body = Resolve.fail(err)
    }
})

// 删除用户信息
// 需要管理员及以上才能操作
router.delete('/delete/:id', new Auth(AUTH_ADMIN).verify, async (ctx) => {
    let [err, data] = await userService.delete(ctx.params.id);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data)
    } else {
        ctx.body = Resolve.fail(err)
    }
})

// 更新用户信息
// 需要管理员及以上才能操作
router.put('/update/:id', new Auth(AUTH_ADMIN).verify, async (ctx) => {
    let [err, data] = await userService.update(ctx.params.id,ctx.request.body);
    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data)
    } else {
        ctx.body = Resolve.fail(err)
    }
})

module.exports = router;
