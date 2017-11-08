import { ActionContext, Store } from 'vuex';
import { getStoreAccessors } from 'vuex-typescript';
import { IProductState } from './state';
import { IState as IRootState } from '../state';

type ProductActionContext = ActionContext<IProductState, IRootState>;

export const product = {
    namespaced: true,

    state: {
        productNum: '',
        price: 0.0
    },

    getters: {
        getProductPrice(state: IProductState) {
            return state.price.toFixed(2);
        }
    },

    mutations: {
        setProductPrice(state: IProductState, price: number) {
            state.price = price;
        }
    },

    actions: {
        async computeTotalAmount(
            context: ProductActionContext,
            products: Array<IProductState>
        ): Promise<number> {
            let totalAmount = 0;

            await new Promise((resolve, _) => setTimeout(() => resolve(), 500));
            products.forEach(v => {
                totalAmount += v.price;
            });

            return totalAmount;
        }
    }
};

const { read, commit, dispatch } = getStoreAccessors<IProductState, IRootState>('product');

const getters = product.getters;
export const getProductPrice = read(getters.getProductPrice);

const mutations = product.mutations;
export const commitProductPrice = commit(mutations.setProductPrice);

const actions = product.actions;
export const dispatchComputeTotalAmount = dispatch(actions.computeTotalAmount);
