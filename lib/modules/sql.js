/**
 * Created by Jun.li on 2015/8/27.
 */
"use strict";
function SqlExecMgr() {
    var tree_obj = {};
    setInterval(function () {
        for (var dbPoolName in  tree_obj) {
            var db_type = tree_obj[dbPoolName];
            (db_type.sql_set.length > 0) && _BatchSQL(db_type.sql_set, function (result, params) {
                if (result) {
                    params.db_type.sql_set = [];
                    params.db_type.column_set = [];
                } else {
                    _Log.error('SqlExecMgr _BatchSQL执行失败。')
                }
            }, {dbPoolName: dbPoolName, columns: db_type.column_set, db_type: db_type});
        }
    }, 1000 * 2);
    return function (params) {
        var sql = params.sql;
        var columns = params.columns || [];
        var dbPoolName = params.dbPoolName;
        if (!(dbPoolName && dbPoolName)) {
            return _Log.error('SqlExecMgr.addInfo 参数错误');
        }
        var db_type = tree_obj[dbPoolName];
        (!db_type) && (db_type = {sql_set: [], column_set: []}) && (tree_obj[dbPoolName] = db_type);
        (typeof  sql === 'string' && Array.isArray(columns)) && (db_type.sql_set.push(sql) && db_type.column_set.push(columns));
    }

}

module.exports = SqlExecMgr();