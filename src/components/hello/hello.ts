import Vue from 'components/base'
import { Component, Watch, Prop } from 'vue-property-decorator'
import template from './hello.vue'


@Component({
  mixins: [template]
})
export default class Hello extends Vue {
  msg = 'Welcome to Your Vue.js App'
}
