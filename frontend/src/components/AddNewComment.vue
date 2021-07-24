<template>
  <div class="container">
    <!-- <div class="row">
      <div class="col">
        <h1>POSTS</h1>
      </div>
    </div> -->
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="card">
          <div class="card-body">
            <p class="card-text"></p>
            <p class="card-text"></p>
            <p class="card-text"></p>
            <h5 class="card-title"></h5>
            <p class="card-text"></p>
            <p class="card-text"></p>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <button type="button" class="btn btn-info">Send</button>
              <!-- au click on appel la methode Submit
			on doit vérifier l'attribut disable grace à la variable isSubmitting -->
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <button type="button" class="btn btn-danger">
                Delete my post
              </button>
              <!-- au click on appel la methode Submit
			on doit vérifier l'attribut disable grace à la variable isSubmitting -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddNewComment",
  props: {
    post: {},
  },
};
</script>
