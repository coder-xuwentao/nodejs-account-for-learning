/**
 * @description 管理员的数据访问对象
 * @description Data Access Objects for User
 * @author 徐文韬, Shake Xu
 */
const md5 = require("md5");
const { User, salt } = require("@models/user");

class UserDao {
    // 创建用管理员
    static async create(params) {
        const { email, password, username } = params;
        const hasUser = await User.findOne({
            where: {
                email,
                deleted_at: null,
            },
        });

        if (hasUser) {
            throw new global.errs.Existing("用户已存在");
        }

        try {
            const res = await User.create({
                username,
                email,
                password,
            });

            const data = {
                email: res.email,
                username: res.username,
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
            const user = await User.findOne({
                where: {
                    email,
                },
            });
            if (!user) {
                throw new global.errs.AuthFailed("账号不存在");
            }

            // 验证密码是否正确
            const md5Password = md5(salt + plainPassword);
            const correct = md5Password === user.password;
            if (!correct) {
                throw new global.errs.AuthFailed("账号不存在或者密码不正确");
            }

            return user;
        } catch (err) {
            throw err;
        }
    }

    // 查询管理员信息
    static async detail(id) {
        const scope = "excPwdAndTime";
        try {
            // 查询管理员是否存在
            const user = await User.scope(scope).findOne({
                where: {
                    id,
                },
            });

            if (!user) {
                throw new global.errs.AuthFailed("账号不存在");
            }

            return user;
        } catch (err) {
            throw err;
        }
    }

    static async list(query = {}) {
        const { id, email, status, username, page = 1, page_size = 10 } = query;
        const filter = {};
        if (email) {
            filter.email = email;
        }
        if (id) {
            filter.id = id;
        }
        if (status) {
            filter.status = status;
        }
        if (username) {
            if (username) {
                filter.username = {
                    [Op.like]: `%${username}%`,
                };
            }
        }

        const scope = "excPwdAndTime";

        try {
            const user = await User.scope(scope).findAndCountAll({
                where: filter,
                limit: 10,
                offset: (page - 1) * page_size,
                order: [["created_at", "DESC"]],
            });

            const data = {
                data: user.rows,
                // 分页
                meta: {
                    current_page: parseInt(page),
                    per_page: 10,
                    count: user.count,
                    total: user.count,
                    total_pages: Math.ceil(user.count / 10),
                },
            };

            return data;
        } catch (err) {
            return err;
        }
    }

    // 查询管理员信息
    static async destroy(id) {
        // 检测是否存在用户
        const user = await User.findByPk(id);
        // 不存在抛出错误
        if (!user) {
            throw new global.errs.NotFound("没有找到相关用户");
        }

        try {
            // 软删除用户
            const res = await user.destroy();
            return { id: res.id, username: res.username, email: res.email };
        } catch (err) {
            throw err;
        }
    }

    // 更新用户
    static async update(id, body) {
        // 检测是否存在用户
        const user = await User.findByPk(id);
        // 不存在抛出错误
        if (!user) {
            throw new global.errs.NotFound("没有找到相关用户");
        }

        const { email, username, status } = body;
        user.email = email ? email : user.email;
        user.username = username ? username : user.username;
        user.status = status ? status : user.status;
        console.log(user);

        try {
            // 软删除用户
            const res = await user.save();
            return {
                id: res.id,
                username: res.username,
                email: res.email,
                status: res.status,
            };
        } catch (err) {
            throw err;
        }
    }
}

module.exports = {
    UserDao,
};
