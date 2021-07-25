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
          <label for="exampleInputEmail1" class="form-label">Title</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Content</label>
          <input
            v-model="content"
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label"
            >Attachement</label
          >
          <input
            v-model="attachement"
            type="text"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div class="row">
          <div class="col-12 col-lg-12">
            <button type="submit" class="btn btn-info">Send my post</button>
            <!-- au click on appel la methode Submit
	on doit vérifier l'attribut disable grace à la variable isSubmitting -->
          </div>
          <div class="col-12 col-lg-12">
            <button @click="$emit('back')" type="button" class="btn btn-danger">
              Back to home
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
      this.$store.dispatch("createNewPost", {
        userId: this.$store.state.auth.userId, // on reception userId de auth state
        title: this.title,
        content: this.content,
        attachement: this.attachement,
      });

      this.$emit("back");
    },
  },
  data() {
    return {
      title: "",
      content: "",
      attachement: "",
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