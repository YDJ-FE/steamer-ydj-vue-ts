import * as Vuex from 'vuex';
import { IState } from './state';
import { product } from './product';

export const createStore = () =>
    new Vuex.Store<IState>({
        modules: {
            product
        }
    });
