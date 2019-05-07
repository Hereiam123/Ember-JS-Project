import Controller from "@ember/controller";
import EmberObject from "@ember/object";

export default Controller.extend({
  ajax: Ember.inject.service(),
  showLeftSlideMenu: false,
  currentPost: EmberObject.create(),
  currentPostUser: EmberObject.create(),
  notClick: false,
  actions: {
    getPost(post) {
      this.get("ajax")
        .request(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
        .then(data => {
          data ? this.currentPostUser.setProperties({ ...data }) : null;
          this.currentPost.setProperties({ ...post });
          this.toggleProperty("showLeftSlideMenu");
          this.set("notClick", true);
        });
    },
    hideMenu() {
      this.toggleProperty("showLeftSlideMenu");
      this.set("notClick", false);
    }
  }
});
