<template>
  <div>
    <h1>HOME PAGE</h1>
    <div class="container">
      <div class="row">
        <div class="col-12 col-lg-12">
          <button type="button" class="btn btn-success">Add New Post</button>
        </div>
      </div>
    </div>
    <Post v-for="item in $store.state.post.posts" :key="item.id" :post="item" />
  </div>
</template>


<script>
import Post from "../components/Post.vue";
export default {
  name: "Home",
  components: {
    Post,
  },
  mounted() {
    this.$store.dispatch("post/getPosts");
    console.log(this.$store);
  },
};
</script>