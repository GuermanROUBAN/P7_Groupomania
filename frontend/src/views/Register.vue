<template>
  <div>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
        <div id="emailHelp" class="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button
        type="submit"
        class="btn btn-primary"
        v-on:click="Submit"
        :disabled="isSubmitting"
      >
        <!-- au click on appel la methode Submit
			on doit vérifier l'attribut disable grace à la variable isSubmitting -->
        Submit
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Register", // nom de la page
  computed: {
    // variable interactive
    isSubmitting() {
      // variable interactive de submutting sous forme de fonction
      return this.$store.state.auth.isSubmitting; // on s'adresse via vuex à son etat, son module auth et son champs isSubmitting
    },
  },
  methods: {
    // on analyse les methodes de notre page locole
    Submit() {
      // 1 methode locale
      this.$store.dispatch("register"); // on appelle l'action de register depuis Auth
    },
  },
};
</script>
