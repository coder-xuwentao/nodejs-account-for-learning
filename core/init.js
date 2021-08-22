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
        const apiDirectory = `${process.cwd()}/app/controller`
        const hash = requireDirectory(module,apiDirectory,{
            visit: whenLoadModule
        })
        function whenLoadModule(obj){
            if(obj instanceof Router){
                InitManager.app.use(obj.routes())
            }
        }
    }
    // 保存全局配置
    static loadConfig(path = ''){
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }
    // 保存全局错误类型
    static loadHttpException(){
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager