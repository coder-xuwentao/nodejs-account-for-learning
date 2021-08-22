/**
 * @description 管理员的数据访问对象
 * @description Data Access Objects for Administrators
 * @author 徐文韬, Shake Xu
 */
const md5 = require("md5");
const { Admin, salt } = require("@models/admin");

class AdminDao {
    // 创建用管理员
    static async create(params) {
        const { email, password, nickname } = params;

        const hasAdmin = await Admin.findOne({
            where: {
                email,
                deleted_at: null,
            },
        });

        if (hasAdmin) {
            throw new global.errs.Existing("管理员已存在");
        }

        try {
            const res = await Admin.create({
                nickname,
                email,
                password,
            });

            const data = {
                email: res.email,
                nickname: res.nickname,
            };

            return data;
        } catch (err) {
            throw err;
        }
    }

    // 验证密码
    static async verify(email, plainPassword) {
        try {
            // 查询用户是否存在
            const admin = await Admin.findOne({
                where: {
                    email,
                },
            });
            if (!admin) {
                throw new global.errs.AuthFailed("账号不存在");
            }

            // 验证密码是否正确
            const md5Password = md5(salt + plainPassword);
            const correct = md5Password === admin.password;
            if (!correct) {
                throw new global.errs.AuthFailed("账号不存在或者密码不正确");
            }

            return admin;
        } catch (err) {
            throw err;
        }
    }

    // 查询管理员信息
    static async detail(id) {
        const scope = "excPwdAndTime";
        try {
            // 查询管理员是否存在
            console.log(id);
            const admin = await Admin.scope(scope).findOne({
                where: {
                    id,
                },
            });

            if (!admin) {
                throw new global.errs.AuthFailed("账号不存在或者密码不正确");
            }

            return admin;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    AdminDao,
};
