<template>
  <footer>
    <section class="row justify-content-around py-5">
      <div class="col-11 col-md-4 col-lg-3 pb-5">
        <span>{{ $t('developed_by')}} Kevin Graham</span>
        <br />
        <br />
        <span><i class="fa fa-phone"></i> 470-880-7049</span>
        <br />
        <span><i class="far fa-envelope"></i> kevingrahamtech@gmail.com</span>
        <br />
      </div>
      <div class="col-11 col-md-4 col-lg-3 pb-4">
        <div id="social-links">
          <a class="pr-5" href="https://www.linkedin.com/in/kevin-gram/"
            ><i class="fab fa-linkedin-in"></i
          ></a>
          <a href="https://github.com/thecompoundingdev"
            ><i class="fab fa-github"></i
          ></a>
        </div>
      </div>
      <div class="col-5 col-md-4 col-lg-3 text-center">
        <div class="mb-2">
          <span>{{ $t('powered_by')}}</span>
        </div>
        <div>
          <img id="tmdb-logo" src="../assets/primary-short.svg" />
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
export default {
  name: "MainFooter"
};
</script>

<style scoped>
footer {
  border-top: 1px solid #42b983;
  text-align: center;
}
#social-links {
  font-size: 3rem;
}
</style>
