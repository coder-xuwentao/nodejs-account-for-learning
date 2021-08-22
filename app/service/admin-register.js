const { Service } = require("@core/service");
const { Admin } = require("@models/admin");
const { AdminDao } = require("@dao/admin");
const validator = require("validator");
const { ParameterException: ParamErr } = require("@core/http-exception");

class RegisterService extends Service {
    // 注意属性没有顺序
    async doMain() {
        const email = this.get("body.email");
        const password1 = this.get("body.password1");
        const password2 = this.get("body.password2");
        const nickname = this.get("body.nickname");
        try {
            await this._validate({ nickname, email, password1, password2 });
            const data = await AdminDao.create({
                email,
                password: password1,
                nickname,
            });
            this.saveReqData(data);
            this.saveError("");
        } catch (error) {
            this.saveError(error);
        }
    }

    async _validate(obj) {
        const { nickname, email, password1, password2 } = obj;
        this._validatePassword(password1, password2);
        await this._validateEmail(email);
        await this._validateName(nickname);
    }
    _validatePassword(pwd1, pwd2) {
        if (!validator.isLength(pwd1 + "", { min: 6, max: 22 })) {
            throw new ParamErr("密码长度必须在6~22位之间");
        }
        
        if (!validator.matches(pwd1 + "", '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')) {
            throw new ParamErr("密码格式错误，包含字符、数字和 _");
        }

        if (pwd1 !== pwd2) {
            throw new ParamErr("两次输入的密码不一致，请重新输入");
        }
    }
    async _validateEmail(email) {
        if (!validator.isEmail(email + "")){
            throw new ParamErr("电子邮箱不符合规范，请输入正确的邮箱");
        }
           
        const admin = await Admin.findOne({
            where: { email },
        });
        if (admin) {
            throw new ParamErr("邮箱已被注册，请重新输入邮箱");
        }
    }
    async _validateName(nickname){
        const admin = await Admin.findOne({
            where: { nickname },
        });
        if (admin) {
            throw new ParamErr("此用户名已被注册");
        }
    }
}
const registerService = new RegisterService();
module.exports = { registerService };
