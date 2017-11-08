/**
 * product module router
 */

import { RouteConfig } from 'vue-router';

function getView(name) {
    return (resolve, reject) => {
        require.ensure(
            [],
            require => {
                resolve(require(`views/${name}/index.ts`));
            },
            reject,
            'product'
        );
    };
}

let routes: RouteConfig[] = [
    {
        name: 'productList',
        path: '/product',
        component: getView('product')
    }
];

export default routes;
