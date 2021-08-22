class Resolve {
    static fail(err = {}, msg = "操作失败", errorCode = 10001) {
        if ("msg" in err) msg = err.msg;
        if ("errorCode" in err) errorCode = err.errorCode;
        return {
            msg,
            err,
            errorCode,
        };
    }

    static success(msg = "success", errorCode = 0, code = 200) {
        return {
            msg,
            code,
            errorCode,
        };
    }

    static json(data, msg = "success", errorCode = 0, code = 200) {
        return {
            code,
            msg,
            errorCode,
            data,
        };
    }
}

module.exports = {
    Resolve,
};
