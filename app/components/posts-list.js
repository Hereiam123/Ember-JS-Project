import Component from "@ember/component";
import { inject } from "@ember/service";

export default Component.extend({
  ajax: inject(),
  posts: [],
  current: 0,
  end: 0,
  paginateLength: 0,
  onLoading: false,
  getPosts(start = 0, decOrInc = "") {
    this.set("onLoading", true);
    this.get("ajax")
      .request(
        `http://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=10`
      )
      .then(data => {
        if (data.length > 0) {
          this.set("posts", data);
          this.paginateLength = data.length;
          let current = 0;
          if (decOrInc == "inc") {
            current = this.current + data.length;
          } else if (decOrInc == "dec") {
            current = this.current - data.length;
          }
          this.set("current", current);
          this.set("end", current + 10);
        }

        setTimeout(() => this.set("onLoading", false), 700);
      });
  },
  init() {
    this._super(...arguments);
    this.getPosts();
  },
  actions: {
    getNext() {
      this.getPosts(this.current + this.paginateLength, "inc");
    },
    getPrev() {
      if (this.current > 0) {
        this.getPosts(this.current - this.paginateLength, "dec");
      }
    },
    setPost(post) {
      this.clickPost(post);
    }
  }
});
