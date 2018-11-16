<template>
  <div class="container" id="game">
    <health-bar-component :player1="players[0]" :player2="players[1]"/>

    <div id="boardcontainer" style="background-image: url('https://00e9e64bac0c01098c4ee85ae1225b4a2ca7e03cf01a1f86ef-apidata.googleusercontent.com/download/storage/v1/b/e-commerce-storage/o/asphalt.png?qk=AD5uMEtjtL8p9V1xglLca3gdkBCMp_wAu-OwteXeS2Dhi3mCe93R5bsEQZYFdCfc7_mha-HI1bqJFPuyDvsfjzBIaooQlga9OUsltZqIGxd4ECRcJ_qMO_xGyK_vrJS38X4-AMVE1FbKaIRzZOvJb6SpE_9pysuS493tdLmepQqhJtFFlnebIlZuMJc6UifNot-rPpt6E8FXyqcfl-a3DsHd1jjJerkomgVREJwbLx0EZ0OHytBZ8N5i8U7w9eFFgG1WCXV4h0bemhpU9CtSvJauY-hjwyRH2JVDxo5HQFdI8bQmtRhieZzNxuxbpZUzHh46OJwa0bEyu3diNCZIaonklHu07qpNllzpa7yvCcmstXwQ9Aq5x2NBW7cyyQ3o9YIAdA71QVnsCL2pbNCFs-ETY3LH9rdzWqTT_xek9FgwWPOlU1netwLRKSQbBDcAHY7Nbc5E8A4CfqpJy7xOtNTwL4yiJIRTCmnyBG5NNATlITYErk6f5MB95NJRV9HqKVIHVvbRbDXsJwu2DzrRNPfzqgJY6E1e3SIUKFC7RqZdTfwHF2bqu_mAhKvhJNrxlHuygatqOoL0c4rfJhQT63NpLSQNgZMjelZ4E1FyokR-kzNtdMa69bckYHrWr0pm-cLYo-_rZlxtvgceo8eoPgIFtuTR2KhSgS6BXIL2JUMzoVi5QyyVEvBE0usUM6iqG2vJTeHkQTppDhVirEP36LZ5uGRy3Tmffq4lgmfGIpZRjPrh81LAuRZLHKRHHunG_wJDDfPFRgSO');">
        <div v-if="show" v-for="tile in tiles" :key="tile">
            <kotak :tile="tile" :players="players" :myPlayerNumber="myPlayerNumber"></kotak>
        </div>

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
                  //get Current Player positions from DB
                  db.ref(`/db/rooms/` + roomId + `/player`).once('value', snapshot => {
                    //if no ammo
                    if(snapshot.val()[attackerId].amo !== 0) {

                      let attackerId= self.myPlayerNumber;
                      let targetId;
                      if(attackerId=='p1') {targetId='p2';}
                      if (attackerId=='p2') {targetId='p1'};

                      let attackPosition=snapshot.val()[attackerId].position;
                      let targetPosition=snapshot.val()[targetId].position;
                      
                      let attackRow=Math.floor(attackPosition/10);
                      let attackCol=attackPosition%10;

                      let targetRow=Math.floor(targetPosition/10);
                      let targetCol=targetPosition%10;
                      
                      let attackDirection=snapshot.val()[attackerId].direction;
                      let hit=false;

                      //check if target is in attacker line of fire
                      let attackerAmo=snapshot.val()[attackerId].amo;
                      let targetHp=snapshot.val()[targetId].hp;
                      console.log(targetRow,attackRow,attackCol,targetCol,attackDirection)
                      if(attackRow ==targetRow) {
                        if(attackDirection=='left'){
                          if(attackCol > targetCol) hit=true;
                        }
                        else if (attackDirection =='right'){
                          if(attackCol < targetCol) hit=true;
                        }
                      }
                      if(attackCol == targetCol){
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
                      //if no ammo, cannot hit
                      db.ref(`/db/rooms/` + roomId + `/player/` + targetId + '/hp').set(targethp-50)
                      }
                      db.ref(`/db/rooms/` + roomId + `/player/` + attackerId + '/amo').set(attackerAmo-50)
                    }
                  })
                }
        })
      this.shoot()
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
