<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <div class="card">
          <div class="card-body">
            <p class="card-text">{{ post.username }}</p>
            <p class="card-text">{{ post.createdAt }}</p>
            <p class="card-text">{{ post.updatedAt }}</p>
            <div class="row">

              <!--Fenêtre chargante nouveau comment-->
              <AddNewComment
                v-if="isOpen"
                v-bind:postId="post.id"
                @back="closeModal"
                @sendCommentData="onCommentCreated"
              />

              <!--Bouton ajouter mon comment-->
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

            <!--Bouton modifier mon post-->
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

                <!--Fenetre chargant vieux post-->
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

              <!--Bouton supprimer mon post-->
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

              <!--Bouton Admin supprime un post-->
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

            <!--Autres data du post-->
            <p class="card-text">{{ post.updatedAt }}</p>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <div class="d-flex justify-content-center">
              <!--Affichage image des caracteres-->
              <img :src="post.attachement" />
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

    // Création d'un comment
    onCommentCreated(commentData) {
      this.$store.dispatch("createNewComment", commentData).then(() => {
        // Mise a jour des comments
        this.getComments();
        // Fermeture de la fenetre modale
        this.closeModal();
      });
    },

    // Sur création d'un comment
    onModifyComment(){
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
.btn {
  margin: 20px;
}

img {
  max-height: 400px;
  max-width: 100%;
}
</style>