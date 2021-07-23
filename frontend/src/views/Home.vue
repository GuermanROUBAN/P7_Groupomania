<template>
  <div>
    <h1>1 2 3</h1>
    <Post  v-for="item in $store.state.post.posts" :key="item.id" :post="item" />
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