import Component from "@ember/component";

export default Component.extend({
  ajax: Ember.inject.service(),
  posts: [],
  current: 0,
  onLoading: "loading",
  hidePrev: true,
  hideNext: false,
  getPosts(current, decOrInc) {
    this.set("onLoading", "loading");
    this.get("ajax")
      .request(
        `http://jsonplaceholder.typicode.com/posts?_start=${current}&_limit=15`
      )
      .then(data => {
        if (data.length > 0) {
          this.set("posts", data);
          decOrInc();
        }
        if (data.length < 15) {
          this.set("hideNext", true);
        }
        this.set("onLoading", "notLoading");
      });
  },
  init() {
    this._super(...arguments);
    this.getPosts(this.current, () => (this.current += 0));
  },
  actions: {
    getNext() {
      this.getPosts(this.current, () => (this.current += 15));
      this.set("hidePrev", false);
    },
    getPrev() {
      this.getPosts(this.current, () => (this.current -= 15));
      if (this.current <= 0) {
        this.set("hidePrev", true);
      }
    },
    setPost(post) {
      this.clickPost(post);
    }
  }
});
