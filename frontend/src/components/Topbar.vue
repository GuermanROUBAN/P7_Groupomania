<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-md">
      <div class="banner d-flex justify-content-center" width="30">
        <img
          :src="require('/src/assets/icon.svg')"
          alt="Logo de l'entreprise"
        />
      </div>
      <a class="navbar-brand" href="#">Navbar</a>
      <div class="container">
        <div class="d-flex align-items-center justify-content-around">
          <div class="row">
            <div class="col-12 col-lg-12">
              <button @click="logout" type="button" class="btn btn-warning">
                Se deconnecter
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <button
                @click="deleteMyAccount"
                type="button"
                class="btn btn-danger float-right"
              >
                Supprimer mon compte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import authApi from "../api/auth";

export default {
  name: "AppTopbar",
  methods: {
    deleteMyAccount() {
      const isConfirm = confirm(
        "Are you sure you want to delete your account?"
      );

      if (isConfirm) {
        authApi
          .deleteMyAccount(Number(this.$store.state.auth.userId))
          .then(() => {
            this.logout();
          });
      }
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    },
  },
};
</script>

