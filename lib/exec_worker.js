/**
 * Created by Jun.li on 2015/8/27.
 */
"use strict";

require('./exec_types');
require('./index_child');
var modules = require('./modules/mgr');

process.on('message', function (data) {
    if (data && typeof  data === 'object' && data._type) {
        modules[data._type](data);
    }
});