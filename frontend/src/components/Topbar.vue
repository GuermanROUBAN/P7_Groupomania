<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <div
        class="row logo-and-massage d-flex align-items-center col-12 col-lg-4"
      >
        <div class="icone-logo d-flex justify-content-center" width="30">
          <img
            :src="require('/src/assets/icon.svg')"
            alt="Logo de l'entreprise"
          />
        </div>
        <div class="message">
          <a class="navbar-brand" href="#">GROUPOMANIA VOUS ATTENDAIT</a>
        </div>
      </div>
      <div class="row champs-btn">
        <button @click="logout" type="button" class="btn btn-warning">
          Se deconnecter
        </button>
        <br />
        <button
          @click="deleteMyAccount"
          type="button"
          class="btn btn-danger float-right"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import authApi from "../api/auth";

export default {
  name: "AppTopbar",
  methods: {
    // le click declenche un deleteMyAccount apres valifation de l'alerte
    deleteMyAccount() {
      const isConfirm = confirm(
        "Are you sure you want to delete your account?"
      );

      if (isConfirm) {
        authApi // on contact endpoint dans auth
          .deleteMyAccount()
          .then(() => {
            this.logout();
          });
      }
    },
    // le click declenche un logout
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="postcss" scoped>
.icone-logo {
  width: 50%;
  margin: auto;
}

.logo-and-massage {
  margin: auto;
}

.champs-btn {
  margin: auto;
}

button{
 
  margin-bottom:10px;
}

.message {
  text-align: center;
  width: 100%;
}
.message a {
  white-space: normal;
}
</style>





