/**
 * 全局模块声明
 * @module
 * @author vega <vegawong@126.com>
 **/

/**
 * For module import or split code use require
 */
interface NodeRequire {
    ensure(paths: string[], callback: (require) => void, chunkName?: string): void;
    ensure(
        paths: string[],
        callback: (require) => void,
        errorCallback?: (err) => void,
        chunkName?: string
    ): void;
}

/**
 * md5
 */
declare module 'md5' {
    const md5: (str: string) => string;
    export = md5;
}

declare module 'env' {
    import env from 'env/dev';
    export default env;
}
