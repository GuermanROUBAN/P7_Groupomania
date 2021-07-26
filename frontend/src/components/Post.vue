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
            <!-- <div class="row">
              <div class="col-12 col-lg-12">
                <button
                  @click="addComment"
                  type="button"
                  class="btn btn-success"
                >
                  Add my comment
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-lg-12">
                <button
                  @click="modifyPost"
                  type="button"
                  class="btn btn-warning"
                >
                  Modify my post
                </button>
              </div>
            </div> -->
            <div class="row">
              <div class="col-12 col-lg-12" v-if="mypost">
                <button
                  @click="deletePost"
                  type="button"
                  class="btn btn-danger"
                >
                  Delete my post
                </button>
              </div>
            </div>
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
                class="btn btn-primary"
              >
                Show Comments
              </button>
              <button
                v-else
                @click="toggleComments"
                type="button"
                class="btn btn-secondary"
              >
                Hide Comments
              </button>
            </div>
          </div>

          <ul v-if="commentsIsShow && comments !== null" class="list-group">
            <li
              v-for="comment of comments"
              :key="comment.id"
              class="list-group-item"
            >
              {{ $store.state.auth.username }}, {{ post.createdAt }}<br />
              {{ comment.comment }}<br />
              <div class="row">
                <div class="col-12 col-lg-12">
                  <button
                    @click="deleteComment"
                    type="button"
                    class="btn btn-danger"
                  >
                    Delete my comment
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-lg-12">
                  <button
                    @click="deletePost"
                    type="button"
                    class="btn btn-warning"
                  >
                    Modify my comment
                  </button>
                </div>
              </div>
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
