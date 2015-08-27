/**
 * Created by Jun.li on 2015/8/27.
 */
"use strict";
var fs = require('fs');

function ModuleMgr() {
    var modules = {};
    var path = __dirname;
    var files = fs.readdirSync(path);
    files.forEach(function (e) {
        if (e !== 'mgr.js' && e.lastIndexOf('.js') !== -1) {
            var type = e.split('.')[0];
            modules[type] = require(path + '/' + e);
            EXEC_TYPES[type] = type;
        }
    });
    return function () {
        return modules;
    }
}

module.exports = ModuleMgr()();