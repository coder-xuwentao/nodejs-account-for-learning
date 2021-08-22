const { UserDao } = require("@dao/user");
const { ParameterException: ParamErr } = require("@core/http-exception");
const validator = require("validator");

class UserService {
    async list(query) {
        try {
            const data = await UserDao.list(query);
            return [null,data];
        } catch (error) {
            return [error,null];
        }
    }

    async detail(id) {
        try {
            this._validateId(id)
            const data = await UserDao.detail(id);
            return [null,data];
        } catch (error) {
            return [error,null];
        }
    }

    async delete(id) {
        try {
            this._validateId(id)
            const data = await UserDao.destroy(id);
            return [null,data];
        } catch (error) {
            return [error,null];
        }
    }
    
    async update(id,body) {
        try {
            this._validateId(id)
            if("email" in body){
                this._validateEmail(body.email)
            }
            const data = await UserDao.update(id,body);
            
            return [null,data];
        } catch (error) {
            return [error,null];
        }
    }

    _validateId(id){
        if (!validator.isInt(id + "", { min: 1})) {
            throw new ParamErr("用户ID需要正整数");
        }
    }

    _validateEmail(email) {
        if (!validator.isEmail(email + "")) {
            throw new ParamErr("电子邮箱不符合规范，请输入正确的邮箱");
        }
    }
}
const userService = new UserService();
module.exports = { userService };
