<template>
  <div class="addNewPost">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>{{ $store.state.auth.username }}</h1>
        </div>
      </div>

      <!--Contenu de la fenetre modale-->
      <form v-on:submit="addNewPost">
        <div class="mb-3">
          <label for="exampleInputTitle" class="form-label">Titre</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="exampleInputTitle"
            required
          />
          <div id="Titre du post" class="form-text"></div>
        </div>

        <div class="form-group">
          <label for="exampleInputContent" class="form-label">Contenu</label>
          <abbr title="Parlez nous de vous"></abbr>
          <textarea
            v-model="content"
            type="text"
            class="form-control"
            id="exampleInputContent"
            name="user_content"
            rows="4"
            cols="50"
            required
          ></textarea>
        </div>

        <div class="mb-3">
          <label for="exampleInputUrl" class="form-label"
            >Inserez ici l'url</label
          >
          <input
            v-model="attachement"
            type="text"
            class="form-control"
            id="exampleInputUrl"
            required
          />
        </div>

        <!--Bouton Poster-->
        <div class="row">
          <div class="btn-add-post col-12 col-lg-12">
            <button type="submit" class="btn btn-info">Poster</button>
          </div>

          <!--Bouton Retour-->
          <div class="btn-add-post col-12 col-lg-12">
            <button @click="$emit('back')" type="button" class="btn btn-danger">
              Retour
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
const validUrl = require("valid-url");

export default {
  name: "AddNewPost", // nom de la page
  computed: {
    isSubmittingPost() {
      // variable interactive de submutting sous forme de fonction
      return this.$store.state.post.isSubmittingPost; // on s'adresse via vuex à son etat, son module auth et son champs isSubmitting
    },
  },
  methods: {
    // Creation d'un nouveau post
    addNewPost() {
      console.log(this.attachement);
      if (validUrl.isUri(this.attachement)) {
        this.$emit("sendPostData", {
          userId: this.$store.state.auth.userId,
          title: this.title,
          content: this.content,
          attachement: this.attachement,
          postId: this.postId,
        });
      } else {
        alert("Veilliez saisir un URL valable");
      }
    },
  },

  // Le composant doit recevoir des props de Post.vue de Oldpost
  props: {
    defaultTitle: {
      default: "",
    },
    defaultContent: {
      default: "",
    },
    defaultAttachement: {
      default: "",
    },
    postId: {},
  },
  data() {
    // La valeur des datas est prise dans les props
    // console.log("default title value", this.defaultTitle);
    return {
      title: this.defaultTitle,
      attachement: this.defaultAttachement,
      content: this.defaultContent,
    };
  },

  components: {},
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

.btn-add-post {
  margin-bottom: 10px;
}
</style>