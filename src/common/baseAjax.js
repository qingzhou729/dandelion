import axios from 'axios';
const ajax = (opt) => new Promise((resolve, reject) => {
    let options = {
        url: `http://test.xue.com:3001/api/${opt.url}`,
        method: 'get' || opt.method,
        params: opt.params,
        withCredentials: true,
    }
    axios(options).then(resp => {
        if (resp.data.err_code === 1) {
            window.location.href = `http://test.xue.com/login`;
            return;
        }
        resolve(resp.data);
    });
});

export default ajax; 