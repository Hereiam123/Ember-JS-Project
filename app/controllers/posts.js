import Controller from "@ember/controller";

export default Controller.extend({
  actions: {
    getPost(post) {
      console.log(post);
    }
  }
});
