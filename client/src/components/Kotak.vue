<template>
    <div class="kotak">
        <div v-if="player" class="mt-3">
            <img v-if="player.type == 'genk' && player.direction == 'up'" src="@/assets/police-up.jpeg" alt="" style="height:90px; width:50px">
            <img v-if="player.type == 'genk' && player.direction == 'down'" src="@/assets/police-down.jpeg" alt="" style="height:90px; width:50px">
            <img v-if="player.type == 'genk' && player.direction == 'right'" src="@/assets/police-right.jpeg" alt="" style="height:50px; width:90px">
            <img v-if="player.type == 'genk' && player.direction == 'left'" src="@/assets/police-left.jpeg" alt="" style="height:50px; width:90px">

            <img v-if="player.type == 'police' && player.direction == 'up'" src="@/assets/yellow-up.jpeg" alt="" style="height:90px; width:90px">
            <img v-if="player.type == 'police' && player.direction == 'down'" src="@/assets/yellow-down.jpeg" alt="" style="height:90px; width:90px">
            <img v-if="player.type == 'police' && player.direction == 'right'" src="@/assets/yellow-right.jpeg" alt="" style="height:50px; width:90px">
            <img v-if="player.type == 'police' && player.direction == 'left'" src="@/assets/yellow-left.jpeg" alt="" style="height:50px; width:90px">

            <!-- <img src="@/assets/tank.jpg" alt="" style="height:90px; width:90px"> -->
        </div>
        <div v-else>
            {{tile}}
        </div>
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
        height: 90px;
        width: 100px;
        border: 1px solid black;
        box-sizing: border-box;
        margin: auto
        /* background-color: rgb(219, 219, 219); */
    }
</style>
