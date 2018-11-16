<template>
    <div id="home">
    <div class="container mt-5">
    <div class="d-flex mt-5 justify-content-center">
      <div class="card mt-5">
        <div class="card-header bg-secondary">
          <span style="color: #fff">Welcome to the game, let's have fun !!</span>
        </div>
        <div class="card-body">
           <div class="">
            <div class="form-group">
              <label for="exampleInputEmail1">Enter Your Name</label>
              <input type="text" class="form-control" placeholder="Enter Your Name" v-model="nickName">
            </div>       
           <button class="btn btn-block btn-info" @click="enterGame">Enter The Game</button>
          </div>
        </div>
    </div>     
    </div>
  </div>
</div>

</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import firebaseApp from '@/assets/config.js'

const db = firebaseApp.database()

export default {
  name: 'home',
  components: {
    
  },
  data(){
    return{
      nickName: ''
    }
  },
  methods: {
    enterGame(){
      var newKey = db.ref().child('posts').push().key;
      db.ref(`/db/globalRoom/` + newKey).set({
        nickName: this.nickName
      })
      // console.log(newKey);
      localStorage.setItem('token', newKey)
      localStorage.setItem('name', this.nickName)
      this.$router.push('lobby')
    }
  },
  created(){
    let token = localStorage.getItem('token')
    if (token) {
      db.ref(`/db/globalRoom/` + token).remove()
      localStorage.removeItem('token')
      localStorage.removeItem('name')
    }
  }
}
</script>

<style>
  /* #home{
    background-image: url('../assets/bg-home.jpg');
   background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-color: aqua
  } */

    #home{
    background-image: url('../assets/bg-home.jpg');
   background-repeat: no-repeat;
  
    height: 100vh;
  }
</style>

