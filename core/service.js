const lodash = require("lodash");
const { findMembers } = require("./core-utils");

class Service {
    constructor() {
        this.dataTmp = {};
        this.parsed = { default: {} };
        this.reqData = {};
        this.err = {};
        this.ctx = {}
    }
    saveReqData(data){
        this.reqData = data
    }
    
    saveError(err){
        this.err = err
    }

    // 从data或parsed中获取值
    get(path, parsed = true) {
        if (parsed) {
            const value = lodash.get(this.parsed, path, null);
            if (value == null) {
                const keys = path.split(".");
                const key = lodash.last(keys);
                return lodash.get(this.parsed.default, key);
            }
            return value;
        } else {
            return lodash.get(this.data, path);
        }
    }

    async run(ctx) {
        this.ctx = ctx
        let params = this._assembleAllParams(ctx);
        this.dataTmp = lodash.cloneDeep(params);
        this.parsed = lodash.cloneDeep(params);

        // 获取属性和方法的名字的数组
        const methodKeys = findMembers(this, {
            filter: this._findMethodKeysFilter.bind(this),
        });
        for (let key of methodKeys) {
            await this[key](this.parsed);
        }
        return [this.err,this.reqData];
    }

    // 收集所有参数
    _assembleAllParams(ctx) {
        return {
            body: ctx.request.body,
            query: ctx.request.query,
            path: ctx.params,
            header: ctx.request.header,
        };
    }

    _findMethodKeysFilter(key) {
        return this[key] instanceof Function && /do([A-Z])\w+/g.test(key);
    }
}

module.exports = { Service };
