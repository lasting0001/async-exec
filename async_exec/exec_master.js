/**
 * Created by Jun.li on 2015/8/27.
 */
"use strict";
var path = require('path');
function ExecMaser() {
    var child_process = require('child_process');
    var child = child_process.fork(path.join(__dirname, 'exec_worker.js'));
    var types = EXEC_TYPES;
    return function (type, params) {
        type = type || '';
        params = params || {};
        if (!types[type]) {
            return _Log.error('_AsyncExec type error:' + type);
        }
        if (params['_type']) {
            return _Log.error('_AsyncExec params has key _type,error');
        }
        params._type = type;
        child.send(params);
    }
}

global._AsyncExec = ExecMaser();