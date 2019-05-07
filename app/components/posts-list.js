import Component from "@ember/component";

export default Component.extend({
  ajax: Ember.inject.service(),
  posts: [],
  current: 0,
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
          if (decOrInc == "inc") {
            this.current += data.length;
          } else if (decOrInc == "dec") {
            this.current -= data.length;
          }
        }
        this.set("onLoading", false);
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
