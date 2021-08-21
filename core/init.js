const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }

    // 读取路由
    static initLoadRouters(){
        const apiDirectory = `${process.cwd()}/app/api`
        const hash = requireDirectory(module,apiDirectory,{
            visit: whenLoadModule
        })
        function whenLoadModule(obj){
            if(obj instanceof Router){
                // console.log(obj.routes());
                InitManager.app.use(obj.routes())
            }
        }
    }
    // 读取配置
    static loadConfig(path = ''){
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }

    static loadHttpException(){
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager