<template>
  <li class="list-group-item">
    {{ comment.username }}<br />
    <div class="row">
      <div class="col-12 col-lg-12" v-if="mycomment">
        <button
          @click="$emit('deleteComment', comment.id)"
          type="button"
          class="btn btn-danger"
        >
          Delete my comment
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-12" v-if="mycomment">
        <button @click="openModal" type="button" class="btn btn-warning">
          Modify my comment
        </button>
      </div>
      <OldComment
        v-if="isOpen"
        :defaultComment="comment.comment"
        :commentId="comment.id"
        :postId="postId"
        @sendCommentData="editComment"
        @back="closeModal"
      />
    </div>
    <div class="row">
      <div class="col-12 col-lg-12" v-if="isAdmin">
        <!--si true-->
        <button @click="deleteComment" type="button" class="btn btn-info">
          Admin Delete user comment
        </button>
      </div>
    </div>
    {{ comment.createdAt }} {{ comment.updatedAt }}<br /><br />
    {{ comment.comment }}<br />

    <!-- le comment vient de la Bdd est chaque comment a un champ pour le texte du commentaire-->
  </li>
</template>

<script>
import { mapState } from "vuex"; // On recupere tous les states
import adminApi from "../api/admin";
import OldComment from "./AddNewComment.vue";
import commentApi from '../api/comment';


export default {
  props: {
    comment: {}, // recoit de Post.vue
    postId: {}, // recoit de Post.vue
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    mycomment() {
      // console.log("comment id user", this.comment.idUSERS);
      // console.log("authorized id user", Number(this.$store.state.auth.userId));
      return this.comment.idUSERS === Number(this.$store.state.auth.userId);
    },
    ...mapState({
      isAdmin: (state) => state.auth.user.isAdmin, // on creer la propriete isAdmin qui va chercher true or false dans objet user
    }),
  },
  methods: {
    deleteComment() {
      adminApi.deleteUserComment(this.comment.id).then(() => {
        this.$emit("adminDeleteComment"); // on genere l evenement
      });
    },
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },
    editComment({commentId, ...credentials}){
      commentApi.modifyMyComment(commentId, credentials)
      .then(()=> {
        this.closeModal();
        this.$emit('modifyComment'); // on genere l evenement pour Post.vue qui fait mise a jour de la page
      })
    }
    
  },

  components: {
    OldComment,
  },
};
</script>