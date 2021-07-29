<template>
  <div class="addNewComment">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $store.state.auth.username }}</h1>
        </div>
      </div>
      <!--le click genere methode addNewComment-->
      <form v-on:submit="addNewComment">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Comment</label>
          <!--v-model lie l input avec la data comment-->
          <input  
            v-model="comment" 
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
        </div>
        <div class="row">
          <!--Bouton validant ajout d'un commentaire-->
          <div class="col-12 col-lg-12">
            <button type="submit" class="btn btn-info">Envoyer mon commentaire</button>
          </div>
          <!--Bouton retour emitant-->
          <div class="col-12 col-lg-12">
            <button @click="$emit('back')" type="button" class="btn btn-danger">
              Retour
            </button>
            <app-error :error="error" v-if="error" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppError from "@/components/Error";
export default {
  name: "AddNewComment", // nom de la page
  computed: {
    isSubmittingPost() {
      // variable interactive de submutting sous forme de fonction
      return this.$store.state.post.isSubmittingPost; // on s'adresse via vuex à son etat, son module auth et son champs isSubmitting
    },
    error() {
      return this.$store.state.auth.error; // l.22 dans modules auth (local erreur fait appel a globale error)
    },
  },
  methods: {
    addNewComment() {
      this.$emit("sendCommentData", { // envoie les données
        userId: Number(this.$store.state.auth.userId),
        postId: this.postId,
        comment: this.comment,
        commentId: this.commentId,
      });
    },
  },
  data() {
    return {
      comment: this.defaultComment, // on recoit des props
    };
  },

  components: {
    AppError,
  },
  props: {  // on recoit les données des autres composants
    postId: {},
    defaultComment: {
      default: "",
    },
    commentId: {},
  },
  
  mounted() {
    console.log(this.$store.state);
  },
};
</script>

<style>
.addNewComment {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(124, 160, 95);
}
</style>