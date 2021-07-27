<template>
  <div>
    <h1>HOME PAGE OF {{ $store.state.auth.username }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <AddNewPost
            v-if="isOpen"
            @back="closeModal"
            @postCreated="onPostCreated"
          />
          <!-- false au depart et true apres method -->
          <button @click="openModal" type="button" class="btn btn-success">
            Add New Post
          </button>
        </div>
      </div>
    </div>
    <Post
      v-for="item in $store.state.post.posts"
      :key="item.id"
      :post="item"
      @postDeleted="onPostDeleted"

    />
  </div>
</template>


<script>
import Post from "../components/Post.vue";
import AddNewPost from "../components/AddNewPost.vue";

export default {
  name: "Home",
  components: {
    Post,
    AddNewPost, // Enregistrement du composant
  },
  data() {
    return {
      isOpen: false, // State intial
    };
  },
  methods: {
    openModal() {
      console.log(this.isOpen); // false
      this.isOpen = true;
      console.log(this.isOpen); // true
    },
    closeModal() {
      this.isOpen = false;
    },
    onPostCreated() {
      console.log("onPostCreated");

      this.getPosts();
    },
    onPostDeleted() {
      console.log("onPostDeleted");

      this.getPosts();
    },
    getPosts() {
      this.$store.dispatch("post/getPosts");
    },
    onCommentDeleted() {
      console.log("onCommentDeleted");
      this.getPosts();
    },
  },
  mounted() {
    this.getPosts();
    console.log(this.$store);
  },
};
</script>