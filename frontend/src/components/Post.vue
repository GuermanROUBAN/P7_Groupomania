<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h1>POSTS</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-12">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{post.title}}</h5>
            <p class="card-text">CONTENT</p>
            <p class="card-text">ATTACHEMENT</p>
            <p class="card-text">USER</p>
            <p class="card-text">CreatedAT</p>
            <p class="card-text">ModifiedAT</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>





export default {
  name: 'Post',
  props: {
    post: {

    }
  }
}
</script>
