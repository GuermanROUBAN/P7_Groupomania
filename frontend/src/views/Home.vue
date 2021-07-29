<template>
  <div>
    <Navigation />
    <h1>Bienvenue {{ $store.state.auth.username }}</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <AddNewPost
            v-if="isOpen"
            @back="closeModal"
            @sendPostData="onPostCreated"
          />
          <!-- false au depart et true apres method -->
          <button @click="openModal" type="button" class="btn btn-success">
            Ajouter un nouveau post
          </button>
        </div>
      </div>
    </div>
    <Post
      v-for="item in $store.state.post.posts"
      :key="item.id"
      :post="item"
      @postDeleted="onPostDeleted"
      @adminDeletePost="onAdminDeletePost"
      @modifyPost="onModifyPost"
    />
  </div>
</template>


<script>
import Post from "../components/Post.vue";
import AddNewPost from "../components/AddNewPost.vue";
import Navigation from "../components/Topbar.vue";

export default {
  name: "Home",
  components: {
    Post,
    AddNewPost, // Enregistrement du composant
    Navigation,
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
    onPostCreated(postData) {
      this.$store.dispatch("createNewPost", postData).then(() => {
        this.getPosts();
        this.closeModal();
      });
    },
    onPostDeleted() {
      console.log("onPostDeleted");
      this.getPosts();
    },
    getPosts() {
      this.$store.dispatch("post/getPosts");
    },
    onModifyPost() {
      this.getPosts();
    },

    onCommentDeleted() {
      console.log("onCommentDeleted");
      this.getPosts();
    },
    onAdminDeletePost() {
      console.log("onAdminDeletePost");
      this.getPosts();
    },
  },
  mounted() {
    if (this.$store.state.auth.user === null) {
      return this.$router.push("/");
    }

    this.getPosts();
  },
};
</script>

<style>
h1{align-content: center;}
</style>