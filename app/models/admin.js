var md5 = require("md5");
const { sequelize } = require("@core/db");
const { Model, DataTypes } = require("sequelize");

class Admin extends Model {}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            comment: "管理员id",
        },
        email: {
            type: DataTypes.STRING(50),
            unique: "admin_email_unique",
            allowNull: false,
            comment: "登录邮箱",
        },
        password: {
            type: DataTypes.STRING,
            set(val) {
                const salt = "salt123";
                const psw = md5(salt + val);
                this.setDataValue("password", psw);
            },
            allowNull: false,
            comment: "登录密码",
        },
        nickname: {
            type: DataTypes.STRING(50),
            allowNull: false,
            comment: "管理员昵称",
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            get() {
                // 待写
                return this.getDataValue("created_at");
            },
        },
    },
    {
        sequelize,
        modelName: "admin",
    }
);
module.exports = {
    Admin,
};
