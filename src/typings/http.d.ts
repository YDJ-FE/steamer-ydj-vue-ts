/**
 * http 模块的声明
 * @module
 * @author vega <vegawong@126.com>
 **/

import * as axios from 'axios';

export as namespace Http;

export interface AxiosRequestConfig extends axios.AxiosRequestConfig {
    startTime?: Date;
}

export interface IHttpRequest {
    /**
     * @param {string} url the api url
     * @param {object} data params
     * @param {string} [urlPrefix] the prefix of the api url or the origin
     * @returns {Promise<T>}
     * @memberof IHttpRequest
     */
    get?<T>(url: string, data: object, urlPrefix?: string): Promise<T>;
    /**
     * @param {string} url the api url
     * @param {object} data params
     * @param {string} [urlPrefix] the prefix of the api url or the origin
     * @returns {Promise<T>}
     * @memberof IHttpRequest
     */
    post?<T>(url: string, data: object, urlPrefix?: string): Promise<T>;
    /**
     * @param {string} url the api url
     * @param {object} data params
     * @param {string} [urlPrefix] the prefix of the api url or the origin
     * @returns {Promise<T>}
     * @memberof IHttpRequest
     */
    put?<T>(url: string, data: object, urlPrefix?: string): Promise<T>;
    /**
     * @param {string} url the api url
     * @param {object} data params
     * @param {string} [urlPrefix] the prefix of the api url or the origin
     * @returns {Promise<T>}
     * @memberof IHttpRequest
     */
    delete?<T>(url: string, data: object, urlPrefix?: string): Promise<T>;
}
