import Vue from 'vue'
import api from 'util/api'

export default class Base extends Vue {

  readonly api = api

  readonly state = this.$store.state

}
