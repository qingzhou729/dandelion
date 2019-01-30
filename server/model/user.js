const mysql = require('../common/mysql');
const select = async () => {
    const sql = `SELECT * FROM user_info`;
    let result = await mysql.bindSql(sql, valueArr, this.dbName)
        .catch((e) => {
            console.log(e)
        });

    return result;
}