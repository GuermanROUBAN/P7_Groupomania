<template>
  <div>
    {{ error }}
    <form>
      <div class="mb-3">
        <label for="exampleInputUsername" class="form-label">Username</label>
        <input
          v-model="username"
          type="text"
          class="form-control"
          id="exampleInputUsername"
          aria-describedby="usernameHelp"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          v-model="email"
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
          v-model="password"
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
    // liste des variables qui appellent qq'un
    // variable interactive
    isSubmitting() {
      // variable interactive de submutting sous forme de fonction
      return this.$store.state.auth.isSubmitting; // on s'adresse via vuex à son etat, son module auth et son champs isSubmitting
    },
    error() {
      return this.$store.state.auth.error;
    },
  },
  methods: {
    // on analyse les methodes de notre page locole
    Submit() {
      // 1 methode locale
      // on appelle l'action de register depuis Aut
      this.$store.dispatch("register", {
        username: this.username,
        email: this.email,
        password: this.password,
      });
    },
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
};
</script>
