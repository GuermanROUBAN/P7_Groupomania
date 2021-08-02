<template>
  <div class="container">
    <div
      class="
        row
        banner-logo
        col-12 col-lg-8
        d-flex
        justify-content-center
        align-items-center
      "
    >
      <img
        :src="require('/src/assets/icon-left-font-monochrome-white.svg')"
        alt="Logo de l'entreprise"
      />
    </div>
    <div>
      <form v-on:submit.prevent="Submit">
        <div class="champs mb-3 w-75">
          <label for="exampleInputEmail1" class="form-label"
            >Entrez votre email</label
          >
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" class="form-text">
            Ne communiquez jamais votre mot de passe à quelqu'un
          </div>
        </div>
        <div class="champs mb-3 w-75">
          <label for="exampleInputPassword1" class="form-label"
            >Entrez votre mot de passe</label
          >
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            aria-describedby="passwordHelp"
            required
          />
        </div>

        <div class="btn-validation d-flex justify-content-center">
          <!-- Bouton Valider -->
          <button
            type="submit"
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            <!-- au click on appel la methode Submit
			on doit vérifier l'attribut disable grace à la variable isSubmitting -->
            Valider
          </button>
        </div>
        <!-- nom de notre module -->
        <div class="message-error d-flex justify-content-center">
          <app-error :error="error" v-if="error" />
          <!-- nom attribut error donne le nom de la varainte locale -->
        </div>
      </form>
  </div></div>
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
  mounted() {
    if (this.$store.state.auth.user != null) {
      this.$router.push({
        name: "Home",
      });
    }
  },
};
</script>


<style lang="postcss" scoped>

.container{
    margin-top: 50px;
    align-items: center;
    justify-content: center;
}

.banner-logo {

  margin: auto;
}
.champs {
  margin: auto;
  width:80%;
}

.form-label {
  color: #454545;
  font-weight: 800;
  font-size: 1.2rem;
}

.form-text {
  color: #454545;
  font-weight: 900;
  font-style: italic;
}

.message-error {
  color: #333333;
  font-weight: 900;
}
</style>