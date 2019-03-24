import axios from 'axios';
const ajax = (opt) => new Promise((resolve, reject) => {
    let options = {
        url: `http://api.xue.com/api/${opt.url}`,
        method: opt.method || 'get',
        params: opt.params || {},
        data: opt.data || {},
        withCredentials: true,
    }
    console.log(options);
    axios(options).then(resp => {
        if (resp.data.err_code === 1) {
            window.location.href = `http://test.xue.com/login`;
            return;
        }
        resolve(resp.data);
    });
});

export default ajax; 