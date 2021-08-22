const { AdminDao } = require("@dao/admin");

class AuthService {
    // 注意属性没有顺序
    async run(ctx) {
        try {
            // 获取用户ID
            const id = ctx.auth.uid;
            const data = await AdminDao.detail(id);
            return [null,data];
        } catch (error) {
            return [error,null];
        }
    }
}
const authService = new AuthService();
module.exports = { authService };
