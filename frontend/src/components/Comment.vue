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
import adminApi from "../api/admin"; // On communique avec le Back End
import OldComment from "./AddNewComment.vue"; // On se sert du modele de AddNewComment
import commentApi from "../api/comment"; // On communique avec le Back End

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
    // Controle si le commentaire est bien celui de l'utilisateur => affiche bouton
    mycomment() {
      return this.comment.idUSERS === Number(this.$store.state.auth.userId);
    },
    // on va chercer dans l'etat de la map si l'user est l'administrateur
    ...mapState({
      isAdmin: (state) => state.auth.user.isAdmin, // on creer la propriete isAdmin qui va chercher true or false dans objet user
    }),
  },
  methods: {

    // Commentaires

    // Suppression par l'utilisateur
    deleteComment() {
      adminApi.deleteUserComment(this.comment.id).then(() => {
        // on genere l evenement
        this.$emit("adminDeleteComment"); 
      });
    },

    // Actions universelles pour ouvrir/fermer une fenetre modale
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    },

    // Modification d'un commentaire
    editComment({ commentId, ...credentials }) {
      commentApi.modifyMyComment(commentId, credentials).then(() => {
        // on ferme la fenetre modale
        this.closeModal();
        // on genere l evenement pour Post.vue qui fait mise a jour de la page
        this.$emit("modifyComment");
      });
    },
  },

  components: {
    OldComment,
  },
};
</script>