<template>
  <div>
    <form v-on:submit="Submit">
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input
          v-model="email"
          type="email"
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
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          required
        />
      </div>
      <!-- <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div> -->
      <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
        <!-- au click on appel la methode Submit
			on doit vérifier l'attribut disable grace à la variable isSubmitting -->
        Submit
      </button>
      <!-- nom de notre module -->
      <app-error :error="error" v-if="error" />
      <!-- nom attribut error donne le nom de la varainte locale -->
    </form>
  </div>
</template>

<script>
import AppError from "@/components/Error";
const { isEmail } = require("@rearguard/is-email");

export default {
  name: "Register", // nom de la page
  computed: {
    // liste des variables qui appellent une variable interactive
    isSubmitting() {
      // variable interactive de submutting sous forme de fonction
      return this.$store.state.auth.isSubmitting; // on s'adresse via vuex à son etat, son module auth et son champs isSubmitting
    },
    error() {
      return this.$store.state.auth.error; // l.22 dans modules auth (local erreur fait appel a globale error)
    },
  },
  methods: {
    // on analyse les methodes de notre page locale
    Submit() {
      // 1 methode locale
      // on appelle l'action de register depuis Aut
      // vous envoyez l'action pour exécuter une tâche propager/dispatch

      if (isEmail(this.email)) {
        // controle de l'email grace à @rearguard/is-email
        this.$store
          .dispatch("login", {
            // on appelle l'action login
            // appel action
            email: this.email,
            password: this.password,
          })
          .then(() => {
            // quand le promise action sera OK la fonction demarrera
            this.$router.push({
              name: "Home",
            }); // on envoi le user sur la page Home
          });
      } else {
        alert("Le champs email est incorrect ex: test@test.fr");
      }
    },
  },
  data() {
    // variante locale
    // comment ?
    return {
      email: "",
      password: "",
    };
  },
  components: {
    AppError,
  },
};
</script>
