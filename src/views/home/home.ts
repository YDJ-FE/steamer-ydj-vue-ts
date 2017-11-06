import Vue from "components/base";
import Hello from "components/hello";
import { Component, Prop, Watch } from "vue-property-decorator";
import template from "./home.vue";

@Component({
  components: {
    Hello
  },
  mixins: [template]
})
export default class Home extends Vue {
  private async created() {
    // api example
    const res = await this.api.getPackage();

    //
    // console.log(res.content);
  }
}
