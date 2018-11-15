<template>
  <div class="container">
    <div class="row">
      <div class="mx-auto my-auto">
        <div class="form">
          <div class="form-group">
            <label for="">Input Your Name</label>
            <input type="text" v-model="nickName">
            <div class="btn btn-primary" @click="enterGame">Enter Games</div>
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
