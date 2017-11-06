
import Vue from 'components/base'
import { Component } from 'vue-property-decorator'
import template from './product.vue'
import * as productStore from 'store/product'

@Component({
  mixins: [template]
})
export default class Product extends Vue {

  list: Array<productStore.IProductState> = []

  commitHandle() {
    productStore.commitProductPrice(this.$store, 12)
  }

  async dispatchHandle() {
    const res = await productStore.dispatchComputeTotalAmount(this.$store, this.list)
    console.log(res)
  }

  mounted() {
    this.list = this.list.concat([{
      productCode: '001',
      price: 12.3
    }, {
      productCode: '002',
      price: 12.3
    }, {
      productCode: '003',
      price: 12.3
    }, {
      productCode: '004',
      price: 12.3
    }])
  }
}
