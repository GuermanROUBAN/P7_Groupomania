<template>
  <div class="container">
    <div class="col-12 col-lg-12">
      <div class="card">
        <li class="list-group-item">
          <p class="card-text">
            Commenté par
            <span class="username">{{ comment.username }}</span>
          </p>
          <div class="champs-date">
            <p class="card-text-date">
              <span class="dates">Créé le: {{ creationDate }}</span>
            </p>
            <p class="card-text-data">
              <span class="dates">Modifié le: {{ modificationDate }}</span>
            </p>
          </div>
          <!-- le comment vient de la Bdd est chaque comment a un champ pour le texte du commentaire-->
          <p class="card-text">{{ comment.comment }}</p>
          <!--Bouton Admine supprime commentaires -->
          <div class="row d-flex justify-content-center">
            <div
              class="col-12 col-lg-4 d-flex justify-content-center"
              v-if="mycomment"
            >
              <button @click="openModal" type="button" class="btn btn-warning">
                Modifier
              </button>
            </div>

            <!-- le comment vient de la Bdd est chaque comment a un champ pour le texte du commentaire-->

            <!--Chargement fentetre modale pour modifier son commentaire -->
            <OldComment
              v-if="isOpen"
              :defaultComment="comment.comment"
              :commentId="comment.id"
              :postId="postId"
              @sendCommentData="editComment"
              @back="closeModal"
            />

            <!--Bouton user supprime son commentaire -->

            <div
              class="col-12 col-lg-4 d-flex justify-content-center"
              v-if="mycomment"
            >
              <button
                @click="$emit('deleteComment', comment.id)"
                type="button"
                class="btn btn-danger"
              >
                Supprimer
              </button>
            </div>

            <!--Bouton Admine supprime commentaires -->

            <div
              class="col-12 col-lg-4 d-flex justify-content-center"
              v-if="isAdmin"
            >
              <!--si true-->
              <button @click="deleteComment" type="button" class="btn btn-info">
                Admin sup. commentaire
              </button>
            </div>
          </div>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; // On recupere tous les states
import adminApi from "../api/admin"; // On communique avec le Back End
import OldComment from "./AddNewComment.vue"; // On se sert du modele de AddNewComment
import commentApi from "../api/comment"; // On communique avec le Back End
import dateTimeFormat from "../helpers/date";

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

    creationDate() {
      return dateTimeFormat(this.comment.createdAt);
    },

    modificationDate() {
      return dateTimeFormat(this.comment.updatedAt);
    },
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

<style lang="postcss" scoped>
.btn {
  margin: 20px;
  width: 60%;
}
.username {
  font-size: 1.2rem;
  font-style: italic;
}
.champs-date {
  display: flex;
}
.dates {
  font-size: 0.8rem;
  font-style: italic;
}

.card-text-date {
  margin-right: 20px;
}
</style>
