/**
 * home module router
 */

import { RouteConfig } from 'vue-router';

function getView(viewName) {
    return (resolve, reject) => {
        require.ensure(
            [],
            require => {
                let map = {
                    home: require('views/home'),
                    defaultView: require('views/error404'),
                    error404: require('views/error404')
                };

                resolve(map[viewName]);
            },
            reject,
            'home'
        );
    };
}

let routes: RouteConfig[] = [
    {
        name: 'home',
        path: '/'
    },
    {
        name: 'defaultView',
        path: '*'
    },
    {
        name: 'error404',
        path: '/e404'
    }
];

routes.forEach(v => {
    if (!v.redirect && !v.component) {
        v.component = getView(v.name);
    }
});

export default routes;
