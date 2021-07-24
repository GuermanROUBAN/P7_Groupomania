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
            <p class="card-text">{{ post.username }}</p>
            <p class="card-text">{{ post.createdAt }}</p>
            <p class="card-text">{{ post.updatedAt }}</p>
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content }}</p>
            <p class="card-text" src="">{{ post.attachement }}</p>
          </div>
          <div class="row">
            <div class="col-12 col-lg-12">
              <button type="button" class="btn btn-info">Show Comments</button>
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
  name: "Post",
  props: {
    post: {},
  },
};
</script>
