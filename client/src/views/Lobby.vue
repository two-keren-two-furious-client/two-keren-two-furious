<template>
  <div class="container">
   <div class="row">
     
   </div>
   <div class="row mt-5">
        <div class="col-8">
          <form @click.prevent class="form-inline">
                <input type="email" class="form-control" placeholder="Create a new room" v-model="nameNewRoom">
                <div class="btn btn-dark ml-3" @click="createRoom"> Create New Room </div>
          </form>
        </div>
   </div>
     <div class="row">
         <div class="card  mb-3 mt-5">
            <div class="card-header">Room List</div>
                 <div class="card-body text-dark">
                     <div class="">
                            <div class="row">
                                <div class="card ml-2 mt-3" style="width: 15rem;" v-for="room in listRooms" :key="room.id">
                                  <div class="card-body" >
                                      <h5 class="card-title">{{ room.name }}</h5>
                                      <h6 class="card-subtitle mb-2 text-muted">Room Master: {{ room.host }} </h6>
                                      <p> <i class="fas fa-users"></i> {{ Object.values(room.player).length }} players</p>                    
                                      <div class="btn btn-info" @click="joinRoom(room.id)">Join Room</div>
                                  </div>
                              </div>
                             </div>
                        </div>
                   </div>   
            </div>      
    </div>
  </div>
</template>

<script>
import firebaseApp from "@/assets/config.js";

const db = firebaseApp.database();

export default {
  name: "lobby",
  data() {
    return {
      listRooms: [],
      nameNewRoom: ""
    };
  },
  created() {
    let token = localStorage.getItem("token");
    let name = localStorage.getItem("name");
    if (token && name) {
      this.refreshLobby();
    } else {
      this.$router.push("home");
    }
  },
  methods: {
    refreshLobby() {
      db.ref("/db/rooms").on("value", snapshot => {
        if (snapshot.val()) {
          this.listRooms = Object.values(snapshot.val());
          console.log(this.listRooms);
        }
      });
    },
    joinRoom(roomId) {
      db.ref("/db/rooms/" + roomId).once("value", snapshot => {
        if (!snapshot.val().player.p2) {
          db.ref(`/db/rooms/` + roomId + `/player/p2`).set({
            id: localStorage.getItem("token"),
            name: localStorage.getItem("name"),
            ready: false
          });
        }
      });
      localStorage.setItem("roomId", roomId);
      this.$router.push("room");
    },
    createRoom() {
      if (this.nameNewRoom !== "") {
        let name = localStorage.getItem("name");
        let token = localStorage.getItem("token");
        let newKey = db
          .ref()
          .child(`/db/rooms/`)
          .push().key;

        db.ref(`/db/rooms/` + newKey).set({
          id: newKey,
          host: name,
          chat: {
            bot: {
              name: "bot",
              message: "chat room"
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
          status: "waiting"
        });
        localStorage.setItem("roomId", newKey);
        this.nameNewRoom = "";
        this.$router.push("room");
      }
    }
  }
};
</script>

<style>
</style>
