<template>
    <div class="container" id="boardcontainer">
        <div v-if="show" v-for="tile in tiles" :key="tile">
            <kotak :tile="tile" :players="players" :myPlayerNumber="myPlayerNumber"></kotak>
        </div>
        <div ></div>
    </div>
</template>

<script>
import firebaseApp from '@/assets/config.js'
import kotak from '../components/Kotak.vue'

const db = firebaseApp.database() 

export default {
    name: 'gameboard',
    components: {
        kotak
    },
    data(){
        return{
            tiles: [
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                11, 12, 13, 14, 15, 16, 17,18, 19, 20,
                21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
                31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
                51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
                61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
                71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
                91, 92, 93, 94, 95, 96, 97, 98, 99, 100
                ],
            myPlayerNumber: '',
            players: [],
            show: true
        }
    },
    created(){
        this.initGame()
    },
    mounted(){
      let roomId = localStorage.getItem('roomId')
      let self = this
      window.addEventListener('keyup', ev => {
          if (event.key == "w" || event.key == "W") {
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(self.myPlayerNumber);
              let x = previousPosition-10
              if (x > 0) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
              }
            })
          }else if(event.key == "a" || event.key == "A"){
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(previousPosition);
              let x = previousPosition-1
              if (x > 0) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
              }            })
          }else if(event.key == "s" || event.key == "S"){
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(previousPosition);
              let x = previousPosition+10
              if (x < 101) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
              }
            })
          }else if(event.key == "d" || event.key == "D"){
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(previousPosition);
              let x = previousPosition+1
              if (x < 101) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
              }
            })
          }else if(event.key == " "){
            console.log("fire")
          }
        })
    },
    watch: {
        players(){
            this.updateBoard()
        }
    },
    methods: {
        initGame(){
            let token = localStorage.getItem('token')
            let roomId = localStorage.getItem('roomId')
            db.ref(`/db/rooms/` + roomId + `/player`).once('value', snapshot => {
                if (token === snapshot.val().p1.id) {
                    this.myPlayerNumber = 'p1'
                } else if (token === snapshot.val().p2.id) {
                    this.myPlayerNumber = 'p2'
                }
                
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p1' + '/position').set(1)
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p1' + '/direction').set('right')
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p1' + '/type').set('genk')
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p1' + '/hp').set(100)
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p1' + '/amo').set(100)


                db.ref(`/db/rooms/` + roomId + `/player/` + 'p2' + '/position').set(100)
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p2' + '/direction').set('left')
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p2' + '/type').set('police')
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p2' + '/hp').set(100)
                db.ref(`/db/rooms/` + roomId + `/player/` + 'p2' + '/amo').set(100)

                db.ref(`/db/rooms/` + roomId + `/player`).on('value', snapshot => {
                    // console.log(Object.values(snapshot.val()));
                    this.players = Object.values(snapshot.val())
                    // console.log(this.players);
                })
            })
        
        },
        updateBoard(){
            this.show = false
            this.$nextTick(function() {
                this.show = true
            })
            // console.log('test')
        },
        updatePlayerPosition(){
          
        }
    }
}
</script>

<style>
#boardcontainer {
    margin-top: 30px;
    /* box-shadow: 0 0 30px rgb(241, 217, 0); */
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    /* width: 650px;
    height: 650px; */
    grid-gap: px;
    align-items: center;
    box-sizing: border-box;
}
</style>
