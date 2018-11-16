<template>
    <div class="kotak">
        <div v-if="player" class="mt-3">
            <img v-if="player.type == 'genk' && player.direction == 'up'" src="@/assets/police-up.png" alt="" style="height:60px; width:40px">
            <img v-if="player.type == 'genk' && player.direction == 'down'" src="@/assets/police-down.png" alt="" style="height:60px; width:40px">
            <img v-if="player.type == 'genk' && player.direction == 'right'" src="@/assets/police-right.png" alt="" style="height:40px; width:60px">
            <img v-if="player.type == 'genk' && player.direction == 'left'" src="@/assets/police-left.png" alt="" style="height:40px; width:60px">

            <img v-if="player.type == 'police' && player.direction == 'up'" src="@/assets/yellow-up.png" alt="" style="height:60px; width:40px">
            <img v-if="player.type == 'police' && player.direction == 'down'" src="@/assets/yellow-down.png" alt="" style="height:60px; width:40px">
            <img v-if="player.type == 'police' && player.direction == 'right'" src="@/assets/yellow-right.png" alt="" style="height:40px; width:60px">
            <img v-if="player.type == 'police' && player.direction == 'left'" src="@/assets/yellow-left.png" alt="" style="height:40px; width:60px">

            <!-- <img src="@/assets/tank.jpg" alt="" style="height:90px; width:90px"> -->
        </div>
        <!-- <div v-else>
            {{tile}}
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'kotak',
    props: ['tile', 'players', 'myPlayerNumber'],
    data(){
        return{
            player: ''
        }
    },
    created(){
        // console.log(this.myPlayerNumber);

    },
    mounted(){
        this.getPlayer()
    },
    methods: {
        getPlayer(){            
        this.players.forEach( player => {
          if(player.position == this.tile){
            this.player = player
            console.log(this.player);
            
          }
        })
      }
    }
}
</script>

<style>
    .kotak{
        height: 60px;
        width: 60px;
        /* border: 1px solid black; */
        box-sizing: border-box;
        margin: auto
        /* background-color: rgb(219, 219, 219); */
    }
</style>
