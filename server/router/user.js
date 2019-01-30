const router = require('koa-router')();
const db = require('../db');

router.post('/oa/login', async (ctx, next) => {
    const sql = `SELECT * FROM user_info`;
    await db.query(sql, value).then(res => {
        if (res && res.length > 0) {
           console.log(res)
        } else {
            ctx.body = 'text';
        }
    }).catch(e => {
        ctx.body = 'error';
    })
});
