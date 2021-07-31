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
          <label for="exampleInputEmail1" class="form-label">Laissez votre commentaire</label>
          <!--v-model lie l input avec la data comment-->
          <textarea
            v-model="comment"
            type="text"
            class="form-control"
            id="exampleInputComment"
            name="user_ccomment"
            rows="4"
            cols="50"
            required
          ></textarea>
        </div>

        <!--Bouton validant ajout d'un commentaire-->
        <div class="row">
          <div class="btn-add-comment col-12 col-lg-12">
            <button type="submit" class="btn btn-info">
              Envoyer
            </button>
          </div>

          <!--Bouton retour emitant-->
          <div class="btn-add-comment col-12 col-lg-12">
            <button @click="$emit('back')" type="button" class="btn btn-danger">
              Retour
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewComment", // nom de la page
  computed: {
    isSubmittingPost() {
      // variable interactive de submutting sous forme de fonction
      return this.$store.state.post.isSubmittingPost; // on s'adresse via vuex à son etat, son module auth et son champs isSubmitting
    },
  },
  methods: {
    // Ajour d'un nouveau comment
    addNewComment() {
      this.$emit("sendCommentData", {
        // envoie les données
        userId: Number(this.$store.state.auth.userId),
        postId: this.postId, // post au quel on ajoute le commentaire // on capte les données de props
        comment: this.comment, // on capte de l'imput
        commentId: this.commentId, // on capte les données de props
      });
    },
  },
  data() {
    // on prend des props
    return {
      comment: this.defaultComment, // on recoit des props
    };
  },

  components: {},
  props: {
    // on recoit les données des autres composants
    postId: {},
    defaultComment: {
      default: "",
    },
    commentId: {}, // ici arrive l'arrive l'id du commentaire que quand se composant s'utilise pour la redaction du commentaire
  },
};
</script>

<style >
.addNewComment {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgb(124, 160, 95);
}

.btn-add-comment{
  margin-bottom:10px;
}

</style>