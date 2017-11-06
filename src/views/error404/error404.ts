
import Vue from 'components/base'
import { Component } from 'vue-property-decorator'
import template from './error404.vue'

@Component({
  mixins: [template]
})
export default class Error404 extends Vue {

}
