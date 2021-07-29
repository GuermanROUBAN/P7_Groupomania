<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link
              :to="{ name: 'Home' }"
              class="nav-link"
              active-class="active"
              exact
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a
              class="nav-link disabled"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Disabled</a
            >
          </li>
        </ul>

        <!-- <form class="d-flex">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form> -->
      </div>
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
            this.logout()
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
