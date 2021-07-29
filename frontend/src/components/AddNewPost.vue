<template>
  <div class="addNewPost">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $store.state.auth.username }}</h1>
        </div>
      </div>
      <form v-on:submit="addNewPost">
        <div class="mb-3">
          <label for="exampleInputTitle" class="form-label">Titre</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="exampleInputTitle"
            aria-describedby="Titre du post"
            required
          />
          <div id="Titre du post" class="form-text"></div>
        </div>
        <div class="mb-3">
          <label for="exampleInputContent" class="form-label">Contenu</label>
          <input
            v-model="content"
            type="text"
            class="form-control"
            id="exampleInputContent"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputUrl" class="form-label"
            >Inserez ici l'url</label
          >
          <input
            v-model="attachement"
            type="text"
            class="form-control"
            id="exampleInputUrl"
            required
          />
        </div>
        <div class="row">
          <div class="col-12 col-lg-12">
            <button type="submit" class="btn btn-info">Poster</button>
            <!-- au click on appel la methode Submit
	on doit vérifier l'attribut disable grace à la variable isSubmitting -->
          </div>
          <div class="col-12 col-lg-12">
            <button @click="$emit('back')" type="button" class="btn btn-danger">
              Retour
            </button>
            <app-error :error="error" v-if="error" />
            <!-- au click on appel la methode Submit
	on doit vérifier l'attribut disable grace à la variable isSubmitting -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AppError from "@/components/Error";
export default {
  name: "AddNewPost", // nom de la page
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
    addNewPost() {
      this.$emit("sendPostData", {
        userId: this.$store.state.auth.userId,
        title: this.title,
        content: this.content,
        attachement: this.attachement,
        postId: this.postId,
      });
    },
  },
  props: {
    defaultTitle: {
      default: "",
    },
    defaultContent: {
      default: "",
    },
    defaultAttachement: {
      default: "",
    },
    postId: {},
  },
  data() {
    console.log("default title value", this.defaultTitle);
    return {
      title: this.defaultTitle,
      attachement: this.defaultAttachement,
      content: this.defaultContent,   
    };
  },
  mounted() {
    console.log(this.$store.state);
  },
  components: {
    AppError,
  },
};
</script>

<style>
.addNewPost {
  z-index: 2;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: cadetblue;
}
</style>