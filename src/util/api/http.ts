/**
 * http 请求模块
 * @module
 * @author vega <vegawong@126.com>
 **/
import axios from 'axios';
import * as qs from 'qs';
import env from 'env';

// 默认配置
const DEFAULTCONFIG: Http.AxiosRequestConfig = {
    baseURL: env.apiUrlPrefix
};

// 判断返回结果是否符合正常数据处理约定
const isSuccess = res => res.code !== undefined && res.code !== null && Number(res.code) === 1;

// 返回结果的格式化处理
const resFormat = res => res.data || {};

const http: Http.IHttpRequest = {};
const methods = ['get', 'post', 'put', 'delete'];

// http 错误
enum HTTPERRORTYPE {
    /**
    * 逻辑错误
    */
    LOGICERROR,
    /**
    * 超时
    */
    TIMEOUTERROR,
    /**
    * 非超时网络错误
    */
    NETWORKERROR
}

methods.forEach(v => {
    http[v] = (url, data, urlPrefix?) => {
        const axiosConfig: Http.AxiosRequestConfig = {
            method: v,
            url,
            baseURL: urlPrefix || DEFAULTCONFIG.baseURL
        };
        const instance = axios.create(DEFAULTCONFIG);

        // Add a request interceptor
        instance.interceptors.request.use(
            cfg => {
                const ts = Date.now() / 1000;
                const queryData = {
                    ts
                };
                cfg.params = {
                    ...cfg.params,
                    ...queryData
                };
                return cfg;
            },
            error => Promise.reject(error)
        );
        // Add a response interceptor
        instance.interceptors.response.use(
            response => {
                if (!isSuccess(response.data)) {
                    const _err = {
                        msg: response.data.msg,
                        code: response.data.code,
                        type: HTTPERRORTYPE[HTTPERRORTYPE.LOGICERROR],
                        config: response.config
                    };
                    return Promise.reject(_err);
                }
                return resFormat(response.data);
            },
            error => {
                const _err = {
                    msg: error.message || '网络故障',
                    type: /^timeout of/.test(error.message)
                        ? HTTPERRORTYPE[HTTPERRORTYPE.TIMEOUTERROR]
                        : HTTPERRORTYPE[HTTPERRORTYPE.NETWORKERROR],
                    config: error.config
                };
                return Promise.reject(_err);
            }
        );
        if (v === 'get') {
            axiosConfig.params = data;
        } else if (data instanceof FormData) {
            axiosConfig.data = data;
        } else {
            axiosConfig.data = qs.stringify(data);
        }
        axiosConfig.startTime = new Date();
        return instance
            .request(axiosConfig)
            .then(res => res)
            .catch(err =>
                Promise.reject({
                    err,
                    stack: err.msg || err.stack || ''
                })
            );
    };
});

export default http;
