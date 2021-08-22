const Sequelize = require("sequelize");

const { dbName, host, port, user, password } =
    require("../config/config").database;

const sequelize = new Sequelize(dbName, user, password, {
    dialect: "mysql",
    host,
    port,
    logging: false,
    timezone: "+08:00",
    define: {
        timestamps: true,
        paranoid: true,
        createdAt: "created_at",
        updateAt: "updated_at",
        deleteAt: "deleted_at",
        underscored: true,
        scopes: {
            excPwdAndTime: {
                attributes: {
                    exclude: [
                        "password",
                        "update_at",
                        "deleted_at",
                        "created_at",
                        "updatedAt",
                        "deletedAt",
                        "createdAt",
                    ],
                },
            },
            iv: {
                attributes: {
                    exclude: ["content", 'password','updated_at','deleted_at'],
                },
            },
        },
        freezeTableName:true
    },
});

sequelize.sync({force:false})

sequelize.authenticate().then(res => {
    console.log('Mysql connection has been established succeseefully.');
}).catch(err => {
    console.error('Unable to connect to the database:' ,err)
})

module.exports = {
    sequelize
}
