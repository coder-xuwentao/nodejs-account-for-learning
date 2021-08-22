const { Service } = require("@core/service");
const { AdminDao } = require("@dao/admin");
const validator = require("validator");
const { ParameterException: ParamErr } = require("@core/http-exception");
const { Auth } = require("@middlewares/auth");
const { generateToken } = require("@core/core-utils");

class LoginService extends Service {
    // 注意属性没有顺序
    async doMain() {
        const email = this.get("body.email");
        const password = this.get("body.password");

        try {
            await this._validate({ email, password });
            const admin = await AdminDao.verify(email, password);
            this.saveError("");
            const token = generateToken(admin.id, Auth.ADMIN)
            this.saveReqData({token});
        } catch (error) {
            this.saveError(error);
        }
    }

    async _validate(obj) {
        const { email, password } = obj;
        this._validatePassword(password);
        this._validateEmail(email);
    }
    _validatePassword(password) {
        if (!validator.isLength(password + "", { min: 6, max: 22 })) {
            throw new ParamErr("密码长度必须在6~22位之间");
        }

        if (
            !validator.matches(
                password + "",
                "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
            )
        ) {
            throw new ParamErr("密码格式错误，包含字符、数字和 _");
        }
    }
    async _validateEmail(email) {
        if (!validator.isEmail(email + "")) {
            throw new ParamErr("电子邮箱不符合规范，请输入正确的邮箱");
        }
    }
}

const loginService = new LoginService();
module.exports = { loginService };
