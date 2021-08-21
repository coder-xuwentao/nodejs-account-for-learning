const jwt = require("jsonwebtoken");

const findKeyMembers = function (instance, { prefix, specifiedType, filter }) {
    // 递归
    function _find(instance) {
        if (instance.__proto__ === null) return [];
        let names = Reflect.ownKeys(instance);
        names = names.filter((name) => {
            return _shouldKeep(name);
        });

        return [...names, ..._find(instance.__proto__)];
    }
    function _shouldKeep(value) {
        if (filter) {
            if (filter(value)) return true;
        }
        if (prefix) {
            if (value.startsWith(prefix)) return true;
        }
        if(specifiedType){
            if(instance[value] instanceof specifiedType) return true
        }
    }

    return _find(instance)
};

module.exports = {
    findKeyMembers
}
