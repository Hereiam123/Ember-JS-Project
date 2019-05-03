import Component from "@ember/component";

export default Component.extend({
  ajax: Ember.inject.service(),
  posts: [],
  current: 0,
  getPosts() {
    this.get("ajax")
      .request(
        `http://jsonplaceholder.typicode.com/posts?_start=${
          this.current
        }&_limit=15`
      )
      .then(data => (data.length > 0 ? this.set("posts", data) : null));
  },
  init() {
    this._super(...arguments);
    this.getPosts();
  },
  actions: {
    getNext() {
      this.current += 15;
      this.getPosts();
    },
    getPrev() {
      this.current -= 15;
      this.getPosts();
    },
    setPost(post) {
      this.clickPost(post);
    }
  }
});
