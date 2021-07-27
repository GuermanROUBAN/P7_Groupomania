<template>
  <div class="addNewComment">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $store.state.auth.username }}</h1>
        </div>
      </div>
      <form v-on:submit="addNewComment">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Comment</label>
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
          <div class="col-12 col-lg-12">
            <button type="submit" class="btn btn-info">Send my comment</button>
          </div>
          <div class="col-12 col-lg-12">
            <button @click="$emit('back')" type="button" class="btn btn-danger">
              Back to home
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
      this.$store
        .dispatch("createNewComment", {
          userId: Number(this.$store.state.auth.userId), // on reception userId de auth state
          postId: this.postId,
          comment: this.comment,
        })
        .then(() => {
          this.$emit("commentCreated");
          this.$emit("back");
        });
    },
  },
  data() {
    return {
      comment: "",
    };
  },

  mounted() {
    console.log(this.$store.state);
  },
  components: {
    AppError,
  },
  props: {
    postId: {},
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