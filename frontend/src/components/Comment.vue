<template>
  <li class="list-group-item">
    {{ comment.username }}<br />
    <br />
    <div class="d-flex align-items-center justify-content-around">

      <!--Bouton Admine supprime commentaires -->
      <div class="row">
        <div class="col-12 col-lg-12" v-if="mycomment">
          <button @click="openModal" type="button" class="btn btn-warning">
            Modifier mon commentaire
          </button>
        </div>

        <!--Chargement fentetre modale pour modifier son commentaire -->
        <OldComment
          v-if="isOpen"
          :defaultComment="comment.comment"
          :commentId="comment.id"
          :postId="postId"
          @sendCommentData="editComment"
          @back="closeModal"
        />
      </div>

      <!--Bouton user supprime son commentaire -->
      <div class="row">
        <div class="col-12 col-lg-12" v-if="mycomment">
          <button
            @click="$emit('deleteComment', comment.id)"
            type="button"
            class="btn btn-danger"
          >
            Supprimer mon commentaire
          </button>
        </div>
      </div>

      <!--Bouton Admine supprime commentaires -->
      <div class="row">
        <div class="col-12 col-lg-12" v-if="isAdmin">
          <!--si true-->
          <button @click="deleteComment" type="button" class="btn btn-info">
            Admin sup. commentaire
          </button>
        </div>
      </div>
    </div>
    <br />

    {{ comment.createdAt }} {{ comment.updatedAt }}<br /><br />
    <!-- le comment vient de la Bdd est chaque comment a un champ pour le texte du commentaire-->
    {{ comment.comment }}<br />

    
  </li>
</template>

<script>
import { mapState } from "vuex"; // On recupere tous les states
import adminApi from "../api/admin";
import OldComment from "./AddNewComment.vue";
import commentApi from "../api/comment";

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
    editComment({ commentId, ...credentials }) {
      commentApi.modifyMyComment(commentId, credentials).then(() => {
        this.closeModal();
        this.$emit("modifyComment"); // on genere l evenement pour Post.vue qui fait mise a jour de la page
      });
    },
  },

  components: {
    OldComment,
  },
};
</script>