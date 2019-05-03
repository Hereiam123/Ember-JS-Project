import Component from "@ember/component";

export default Component.extend({
  ajax: Ember.inject.service(),
  posts: [],
  current: 0,
  getData() {
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
    this.getData();
  },
  actions: {
    getNext() {
      this.current += 15;
      this.getData();
    },
    getPrev() {
      this.current -= 15;
      this.getData();
    },
    setPost(post) {
      this.clickPost(post);
    }
  }
});
