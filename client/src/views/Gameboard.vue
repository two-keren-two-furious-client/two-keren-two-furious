<template>
  <div class="container" id="game">
    <health-bar-component :player1="players[0]" :player2="players[1]"/>


     <div style="font-size: 50px" v-if="dead" class="mt-5 alert alert-block alert-info" role="alert">
          WINNER IS... {{winner}}!!
        </div>
    <div id="boardcontainer" style="background-image: url('https://ubisafe.org/images/asphaltus-clipart-blacktop-1.jpg');">
        <div v-if="show && !dead" v-for="tile in tiles" :key="tile">
            <kotak :tile="tile" :players="players" :myPlayerNumber="myPlayerNumber"></kotak>
        </div>
        <!-- <h1></h1> -->
    </div>
  </div>
</template>

<script>
import firebaseApp from '@/assets/config.js'
import kotak from '../components/Kotak.vue'
import healthBarComponent from '../components/healthBar.vue'

const db = firebaseApp.database() 

export default {
    name: 'gameboard',
    components: {
        kotak, healthBarComponent
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
            show: true,
            dead:false,
            winner:''
        }
    },
    created(){
        this.initGame()
    },
    mounted(){
      let roomId = localStorage.getItem('roomId')
      let self = this;

      this.reloadShootBar(roomId);

      window.addEventListener('keyup', ev => {
          if (event.key == "w" || event.key == "W") {
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(self.myPlayerNumber);
              let x = previousPosition-10
              if (x > 0) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/direction').set('up')
              }
            })
          }else if(event.key == "a" || event.key == "A"){
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(previousPosition);
              let x = previousPosition-1
              if (x > 0) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/direction').set('left')
              }            
            })
          }else if(event.key == "s" || event.key == "S"){
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(previousPosition);
              let x = previousPosition+10
              if (x < 101) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/direction').set('down')
              }
            })
          }else if(event.key == "d" || event.key == "D"){
            db.ref(`/db/rooms/` + roomId + `/player/`+ self.myPlayerNumber).once('value', snapshot => {
              let previousPosition = snapshot.val().position
              console.log(previousPosition);
              let x = previousPosition+1
              if (x < 101) {
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/position').set(x)
                db.ref(`/db/rooms/` + roomId + `/player/` + self.myPlayerNumber + '/direction').set('right')
              }
            })
          } else if(event.keyCode == 32){
              event.preventDefault();

                  //get Current Player positions from DB
                  db.ref(`/db/rooms/` + roomId + `/player`).once('value', snapshot => {

                    //if no ammo
                    if(snapshot.val()[self.myPlayerNumber].amo !== 0) {
                      console.log('heloo')
                      this.soundShoot()
                      let attackerId= self.myPlayerNumber;
                      
                      let targetId;
                      if(attackerId=='p1') {targetId='p2';}
                      if (attackerId=='p2') {targetId='p1'};

                      let attackPosition=snapshot.val()[attackerId].position;
                      let targetPosition=snapshot.val()[targetId].position;
                      
                      let attackRow=Math.ceil(attackPosition/10);
                      let attackCol=attackPosition%10;


                      let targetRow=Math.ceil(targetPosition/10);
                      let targetCol=targetPosition%10;
                      
                      if(targetCol==0) targetCol=10;
                      if(attackCol==0) attackCol=10;

                      let attackDirection=snapshot.val()[attackerId].direction;
                      let hit=false;

                      //check if target is in attacker line of fire
                      let attackerAmo=snapshot.val()[attackerId].amo;
                      let targetHp=snapshot.val()[targetId].hp;
                      console.log('targetrow',targetRow,'attackrow',attackRow);
                      console.log('attackCol',attackCol,'targetCol',targetCol,attackDirection)
                      if(attackRow ==targetRow) {
                        console.log('same row')
                        if(attackDirection=='left'){
                          if(attackCol > targetCol) hit=true;
                        }
                        else if (attackDirection =='right'){
                          if(attackCol < targetCol) hit=true;
                        }
                      }
                      if(attackCol == targetCol){
                        console.log('same col')
                        if(attackDirection =='up'){
                          if(attackRow > targetRow) hit=true;
                        }
                        else if (attackDirection == 'down'){
                          if(attackRow < targetRow) hit=true;
                        }
                      } 
                    //update firebase daata
                      if(hit == true){
                        console.log('hit!!!!!!!!!!!')
                        this.shootTarget()
                        //if no ammo, cannot hit
                        db.ref(`/db/rooms/` + roomId + `/player/` + targetId + '/hp').set(targetHp-50);
                      }
                      console.log('attacker.........',attackerAmo)

                      db.ref(`/db/rooms/` + roomId + `/player/` + attackerId + '/amo').set(attackerAmo-50);

                    }
                  })
                }
        })
        
    },
    watch: {
        players(){
            this.updateBoard();
            this.isDead(this.players);
        }
    },
    methods: {
      soundShoot(){
        let audioShoot = new Audio(require('../assets/shot2.wav'))
        audioShoot.play()
      },
      shootTarget(){
        let audioShoot = new Audio(require('../assets/shot.wav'))  
        audioShoot.play()
      },
        isDead(target) {
          console.log('---',target)
          let self=this;
          let player1=target[0].name;
          let player2=target[1].name;
          target.forEach(player => { 
            if(player.hp==0) {
              self.dead=true;
              if(player==target[0]) self.winner=player2;
              else self.winner=player1;
            }
          })
        },
        reloadShootBar(roomId) {
                console.log('xxx')
              let reload=setInterval(() => {
                console.log('yyy')
                if(this.players[0].amo<100 ){
                  db.ref(`/db/rooms/` + roomId + `/player/` + 'p1' + '/amo').set(this.players[0].amo+50);
                }
                if(this.players[1].amo<100 ){
                  db.ref(`/db/rooms/` + roomId + `/player/` + 'p2' + '/amo').set(this.players[0].amo+50);
                }
              }, 4000);
        },
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
        },
     shoot() {
          //listen to key 
        
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
