<template>
  <div class="addNewPost">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $store.state.auth.username }}</h1>
        </div>
      </div>
      <form v-on:submit="Submit">
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
            <button @click="$emit('back')" type="button" class="btn btn-danger">Back to home</button>
            <!-- au click on appel la methode Submit
	on doit vérifier l'attribut disable grace à la variable isSubmitting -->
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewPost",
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