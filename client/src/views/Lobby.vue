<template>
  <div class="container">
    <input type="text" v-model="nameNewRoom">
    <div class="btn btn-dark" @click="createRoom"> Create New Room </div>
    <div class="row">
      <div class="card ml-2" style="width: 18rem; margin: 10px;" v-for="room in listRooms">
        <div class="card-body" >
          <h5 class="card-title">{{ room.name }}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Room Master: {{ room.host }} </h6>
          <p >{{ Object.values(room.player).length }} player</p>
          <div class="btn btn-dark" @click="joinRoom(room.id)">Join Room</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/assets/config.js'

const db = firebaseApp.database() 

export default {
  name: 'lobby',
  data(){
    return {
      listRooms: [],
      nameNewRoom: ''
    }
  },
  created(){
    let token = localStorage.getItem('token')
    let name = localStorage.getItem('name')
    if (token && name) {
      this.refreshLobby()
    } else {
      this.$router.push('home')
    }
  },
  methods: {
    refreshLobby(){
      db.ref('/db/rooms').on('value', snapshot => {        
        if (snapshot.val()) {
          this.listRooms = Object.values(snapshot.val())
          console.log(this.listRooms);
          
        }
      })
    },
    joinRoom(roomId){
      db.ref('/db/rooms/' + roomId).once('value', snapshot => {
        if (!snapshot.val().player.p2) {
          db.ref(`/db/rooms/` + roomId + `/player/p2`).set({
            id: localStorage.getItem('token'),
            name: localStorage.getItem('name'),
            ready: false
          })
        }
      })
      localStorage.setItem('roomId', roomId)
      this.$router.push('room')
    },
    createRoom(){
      if (this.nameNewRoom !== '') {
        let name = localStorage.getItem('name')
        let token = localStorage.getItem('token')
        let newKey = db
          .ref()
          .child(`/db/rooms/`)
          .push().key

        db.ref(`/db/rooms/` + newKey).set({
          id: newKey,
          host: name,
          chat: {
            bot: {
              name: 'bot',
              message: 'chat room'
            }
          },
          name: this.nameNewRoom,
          player: {
            p1: {
              id: token,
              name: name,
              ready: false
            }
          },
          status: 'waiting'
        })
        localStorage.setItem('roomId', newKey)
        this.nameNewRoom = ''
        this.$router.push('room')
      }
    }
  }
}
</script>

<style>

</style>
