/**
 * Created by Jun.li on 2015/8/27.
 */
"use strict";
setTimeout(function () {
    _AsyncExec(EXEC_TYPES.sql, {
        sql: 'INSERT INTO t_data_preference(partner_id)VALUES(?);',
        columns: [99],
        dbPoolName: 'db_open_data'
    });
}, 3000);