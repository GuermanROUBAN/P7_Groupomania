<template>
  <div class="container">
    <!-- <div class="row">
      <div class="col">
        <h1>POSTS</h1>
      </div>
    </div> -->
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{ post.username }}</p>
            <p class="card-text">{{ post.createdAt }}</p>
            <p class="card-text">{{ post.updatedAt }}</p>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <div><img :src="post.attachement" /></div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12" v-if="seeComments">
              <button
                v-if="!commentsIsShow"
                @click="toggleComments"
                type="button"
                class="btn btn-info"
              >
                Show Comments
              </button>
              <button
                v-else
                @click="toggleComments"
                type="button"
                class="btn btn-info"
              >
                Hide Comments
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12" v-if="mypost">
              <button @click="deletePost" type="button" class="btn btn-danger">
                Delete my post
              </button>
              <!-- au click on appel la methode Submit
			on doit vérifier l'attribut disable grace à la variable isSubmitting -->
            </div>
          </div>
          <ul v-if="commentsIsShow && comments !== null" class="list-group">
            <li
              v-for="comment of comments"
              :key="comment.id"
              class="list-group-item"
            >
              {{ comment.comment }}
              <!-- le comment vient de la Bdd est chaque comment a un champ pour le texte du commentaire-->
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentApi from "../api/comment";

export default {
  name: "Post",
  data() {
    return {
      comments: null,
      commentsIsShow: false,
    };
  },
  computed: {
    mypost() {
      return this.post.idUSERS === Number(this.$store.state.auth.userId);
    },
    seeComments() {
      return this.comments !== null && this.comments.length > 0; // true or false
    },
  },
  methods: {
    deletePost() {
      console.log("deletePost");
      this.$store
        .dispatch("deleteMyPost", {
          postId: this.post.id,
          credentials: {
            userId: Number(this.$store.state.auth.userId),
          },
        })
        .then(() => {
          this.$emit("postDeleted");
        });
    },
    creatComment() {},
    getComments() {
      commentApi.getCommentsForPost(this.post.id).then((response) => {
        this.comments = response.data.comments;
      });
    },
    toggleComments() {
      this.commentsIsShow = !this.commentsIsShow;
    },
  },

  props: {
    post: {}, // Dans Home.vue
  },
  mounted() {
    this.getComments();
  },
};
</script>
