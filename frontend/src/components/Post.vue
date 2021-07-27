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
            <div class="row">
              <AddNewComment
                v-if="isOpen"
                v-bind:postId="post.id"
                @back="closeModal"
                @commentCreated="onCommentCreated"
              />
              <div class="col-12 col-lg-12">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="openModal"
                >
                  Add my comment
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-lg-12">
                <button type="button" class="btn btn-warning">
                  Modify my post
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-lg-12">
                <button type="button" class="btn btn-info">
                  Delete user post
                </button>
              </div>
            </div>
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
            <Comment
              v-for="comment of comments"
              :key="comment.id"
              :comment="comment"
              @deleteComment="deleteComment"
            />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentApi from "../api/comment";
import Comment from "./Comment";
import AddNewComment from "./AddNewComment.vue";

export default {
  name: "Post",
  data() {
    return {
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
    onCommentCreated() {
      // console.log("onCommentCreated");
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
    deleteuserAccount() {},
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
  },
};
</script>
