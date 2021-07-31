<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="card">
          <div class="card-body">
            <p class="card-text">
              par <span class="username">{{ post.username }}</span>
            </p>
            <div class="champs-date">
              <p class="card-text-date">
                <span class="dates">Créé le: {{ creationPostDate }}</span>
              </p>
              <p class="card-text-data">
                <span class="dates"
                  >Modifié le: {{ modificationPostDate }}</span
                >
              </p>
            </div>            <!--Autres data du post-->
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <div class="d-flex justify-content-center">
              <!--Affichage image des caracteres-->
              <img :src="post.attachement" />
            </div>
            <div class="row d-flex justify-content-center">
              <!--Fenêtre chargante nouveau comment-->
              <!-- : => v-bind => props -->
              <!-- @ => v-on => evenement-->
              <AddNewComment
                v-if="isOpen"
                :postId="post.id"
                @back="closeModal"
                @sendCommentData="onCommentCreated"
              />

              <!--Bouton ajouter mon comment-->
              <div class="col-12 col-lg-8 d-flex justify-content-center">
                <button
                  type="button"
                  class="btn btn-success"
                  @click="openModal"
                >
                  Ajouter un commentaire
                </button>
              </div>
            </div>

            <div class="row d-flex justify-content-center">
              <!--Bouton modifier mon post-->
              <div class="col-12 col-lg-4 d-flex justify-content-center" v-if="mypost">
                <button
                  @click="modifyPost"
                  type="button"
                  class="btn btn-warning"
                >
                  Modifier mon poste
                </button>
              </div>

              <!--Fenetre chargant vieux post-->
              <!--A l'interieur on met defaultTitle defaultContent defaultAttachement-->
              <!--A l'interieur il y a les données du vieux post qu'il faut changer-->
              <!--DefaultAttachement(props) recoit données qui sont dans post.Vue-->
              <!--Evenment sendPostData envoi données -->
              <OldPost
                v-if="postIsEdited"
                :defaultTitle="post.title"
                :defaultContent="post.content"
                :defaultAttachement="post.attachement"
                :postId="post.id"
                @sendPostData="editPost"
                @back="closeModifyPostModal"
              />

              <!--Bouton supprimer mon post-->

              <div class="col-12 col-lg-4 d-flex justify-content-center" v-if="mypost">
                <button
                  @click="deletePost"
                  type="button"
                  class="btn btn-danger"
                >
                  Supprimer mon poste
                </button>
              </div>

              <!--Bouton Admin supprime un post-->

              <div class="col-12 col-lg-4 d-flex justify-content-center" v-if="isAdmin">
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

          <!--Bouton afficher/masquer les commentaires -->
          <div class="row">
            <div class="col-12 col-lg-12" v-if="seeComments">
              <button
                v-if="!commentsIsShow"
                @click="toggleComments"
                type="button"
                class="btn btn-primary"
              >
                Afficher les commentaires
              </button>
              <button
                v-else
                @click="toggleComments"
                type="button"
                class="btn btn-secondary"
              >
                Cacher les commentaires
              </button>
            </div>
          </div>

          <!--Si commentaires presents affichage de la liste -->
          <ul v-if="commentsIsShow && comments !== null" class="list-group">
            <!--key est utilisé pour cycle dans vue pour faire differencer les elements dans les cycles-->
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
import dateTimeFormat from "../helpers/date";

export default {
  name: "Post",
  data() {
    return {
      // Pour creation OldPost controle si le post existe
      postIsEdited: false,
      comments: null,
      // quand on appuie sur Show comments devient true
      commentsIsShow: false,
      // Les v-if sont par defaut a false
      isOpen: false,
    };
  },
  computed: {
    // Controle si le post est bien celui de l'utilisateur => affiche bouton
    mypost() {
      return this.post.idUSERS === Number(this.$store.state.auth.userId);
    },

    // Controle s'il y a des comments pour un post
    seeComments() {
      return this.comments !== null && this.comments.length > 0; // true or false
    },

    // Controle si le comment est bien celui de l'utilisateur => affiche bouton
    mycomment() {
      return this.comments.id === Number(this.$store.state.auth.userId);
    },

    // etat du state
    // on creer la propriete isAdmin qui va chercher true or false dans objet user
    ...mapState({
      isAdmin: (state) => state.auth.user.isAdmin,
    }),

    creationPostDate() {
      return dateTimeFormat(this.post.createdAt);
    },

    modificationPostDate() {
      return dateTimeFormat(this.post.updatedAt);
    },
  },
  methods: {
    // Posts

    // Supression de posts
    deletePost() {
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

    // Modification de posts
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

    // Actions universelles pour ouvrir/fermer une fenetre modale
    openModal() {
      // console.log(this.isOpen); // false
      this.isOpen = true;
      // console.log(this.isOpen); // true
    },

    closeModal() {
      this.isOpen = false;
    },

    // Comments

    // Chargement des comments pour un post
    getComments() {
      // Affiche les comments d'un post
      commentApi.getCommentsForPost(this.post.id).then((response) => {
        this.comments = response.data.comments;
      });
    },

    // Permute l'apparition des comments au click sur le bouton Afficher/Masquer Commentairs
    toggleComments() {
      this.commentsIsShow = !this.commentsIsShow;
    },

    // Création d'un comment suite au click sur @sendCommentData dans AddNewComment
    onCommentCreated(commentData) {
      // on appelle l'action du store
      this.$store.dispatch("createNewComment", commentData).then(() => {
        // Mise a jour des comments
        this.getComments();
        // Fermeture de la fenetre modale
        this.closeModal();
      });
    },

    // Sur création d'un comment
    onModifyComment() {
      // Mise a jour des comments
      this.getComments();
    },

    modifyComment() {},

    // Supprimer un comment
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
          // Mise a jour des comments
          this.getComments();
        });
    },

    // Administrateur

    // Supprimer un comment
    adminDeleteComment() {
      // Mise a jour des comments
      this.getComments();
    },

    // Supprimer un post
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
.card-body {
  background-color: lightskyblue;
}

.btn {
  margin: 20px;
  width: 60%;
}

.username {
  font-size: 1.5rem;
  font-style: italic;
}

.champs-date {
  display: flex;
}

.dates {
  font-size: 0.8rem;
  font-style: italic;
}

img {
  max-height: 400px;
  max-width: 100%;
}
</style>