const Router = require("koa-router");
const { registerService } = require("@service/admin-register");
const { loginService } = require("@service/admin-login");
const { authService } = require("@service/admin-auth");
const { Resolve } = require("@extend/helper");
const { Auth } = require('@middlewares/auth');

const router = new Router({
    prefix: "/api/admin",
});

// 注册
router.post("/register", async (ctx) => {
    const [err, data] = await registerService.run(ctx);

    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data);
    } else {
        ctx.body = Resolve.fail(err);
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

const AUTH_ADMIN = 16
// 获取用户信息
router.get("/auth", new Auth(AUTH_ADMIN).verify,async (ctx) => {
    const [err, data] = await authService.run(ctx);

    if (!err) {
        ctx.response.status = 200;
        ctx.body = Resolve.json(data);
    } else {
        ctx.body = Resolve.fail(err);
    }
});

module.exports = router;
