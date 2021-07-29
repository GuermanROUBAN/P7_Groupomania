<template>
  <div class="container">
    <!-- <div class="row">
      <div class="col">
        <h1>POSTS</h1>
      </div>
    </div> -->
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{ post.username }}</p>
            <p class="card-text">{{ post.createdAt }}</p>
            <p class="card-text">{{ post.updatedAt }}</p>
            <div class="row">
              <AddNewComment
                v-if="isOpen"
                v-bind:postId="post.id"
                @back="closeModal"
                @sendCommentData="onCommentCreated"
              />
              <div class="col-12 col-lg-12">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="openModal"
                >
                  Ajouter un commentaire
                </button>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-end">
              <div class="row">
                <div class="col-12 col-lg-12" v-if="mypost">
                  <button
                    @click="modifyPost"
                    type="button"
                    class="btn btn-warning"
                  >
                    Modifier mon poste
                  </button>
                </div>
                <OldPost
                  v-if="postIsEdited"
                  :defaultTitle="post.title"
                  :defaultContent="post.content"
                  :defaultAttachement="post.attachement"
                  :postId="post.id"
                  @sendPostData="editPost"
                  @back="closeModifyPostModal"
                />
              </div>
              <div class="row">
                <div class="col-12 col-lg-12" v-if="mypost">
                  <button
                    @click="deletePost"
                    type="button"
                    class="btn btn-danger"
                  >
                    Supprimer mon poste
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-12 col-lg-12" v-if="isAdmin">
                  <button
                    @click="adminDeletePost"
                    type="button"
                    class="btn btn-info"
                  >
                    Admin sup. post
                  </button>
                </div>
              </div>
            </div>
            <p class="card-text">{{ post.updatedAt }}</p>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <div class="d-flex justify-content-center">
              <img :src="post.attachement" />
            </div>
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
            <Comment
              v-for="comment of comments"
              :key="comment.id"
              :comment="comment"
              :postId="post.id"
              @deleteComment="deleteComment"
              @adminDeleteComment="adminDeleteComment"
              @modifyComment="onModifyComment"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentApi from "../api/comment";
import adminApi from "../api/admin";
import Comment from "./Comment";
import AddNewComment from "./AddNewComment.vue";
import { mapState } from "vuex";
import OldPost from "./AddNewPost.vue";
import postApi from "../api/post";

export default {
  name: "Post",
  data() {
    return {
      postIsEdited: false,
      comments: null,
      commentsIsShow: false,
      isOpen: false,
    };
  },
  computed: {
    mypost() {
      return this.post.idUSERS === Number(this.$store.state.auth.userId);
    },

    seeComments() {
      // console.log(
      //   "seeComments",
      //   this.comments !== null && this.comments.length > 0
      // );
      return this.comments !== null && this.comments.length > 0; // true or false
    },
    mycomment() {
      return this.comments.id === Number(this.$store.state.auth.userId);
    },
    //   modifyMyComment() {
    //     return this.post.idUSERS === Number(this.$store.state.auth.userId);
    //   },
    //   adminDeleteComment() {
    //     return this.post.idUSERS === Number(this.$store.state.auth.userId);
    //   },
    ...mapState({
      // etat du state
      isAdmin: (state) => state.auth.user.isAdmin, // on creer la propriete isAdmin qui va chercher true or false dans objet user
    }),
  },
  methods: {
    deletePost() {
      // console.log("deletePost");
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
    modifyPost() {
      this.postIsEdited = true;
    },
    editPost({ postId, ...credentials }) {
      postApi.modifyMyPost(postId, credentials).then(() => {
        this.closeModifyPostModal();
        this.$emit("modifyPost");
      });
    },

    closeModifyPostModal() {
      this.postIsEdited = false;
    },
    onCommentCreated(commentData) {
      this.$store.dispatch("createNewComment", commentData).then(() => {
        this.getComments();
        this.closeModal();
      });
    },
    onModifyComment(){
      this.getComments();
    },
    
    openModal() {
      // console.log(this.isOpen); // false
      this.isOpen = true;
      // console.log(this.isOpen); // true
    },
    closeModal() {
      this.isOpen = false;
    },

    getComments() {
      commentApi.getCommentsForPost(this.post.id).then((response) => {
        this.comments = response.data.comments;
      });
    },
    toggleComments() {
      this.commentsIsShow = !this.commentsIsShow;
    },
    deleteComment(commentId) {
      // console.log("deleteComment");
      this.$store
        .dispatch("deleteMyComment", {
          commentId,
          credentials: {
            userId: Number(this.$store.state.auth.userId),
          },
        })
        .then(() => {
          this.getComments();
        });
    },
    modifyComment() {},

    adminDeleteComment() {
      this.getComments();
    },

    adminDeletePost() {
      adminApi.deleteUserPost(this.post.id).then(() => {
        this.$emit("adminDeletePost"); // on genere l evenement
      });
    },
  },

  props: {
    post: {}, // Dans Home.vue
  },
  mounted() {
    // console.log("mounted Comments");
    this.getComments();
  },
  components: {
    Comment,
    AddNewComment,
    OldPost,
  },
};
</script>

<style lang="postcss" scoped>
.btn {
  margin: 20px;
}

img {
  max-height: 400px;
  max-width: 100%;
}
</style>