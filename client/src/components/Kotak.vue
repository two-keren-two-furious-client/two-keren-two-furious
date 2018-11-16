<template>
    <div class="kotak">
        <div v-if="tileValue">
            <img src="@/assets/tank.jpg" alt="" style="height:90px; width:90px">
        </div>
        <div v-else>
            {{tile}}
        </div>
    </div>
</template>

<script>
export default {
    name: 'kotak',
    props: ['tile', 'players'],
    data(){
        return{
            tileValue: ''
        }
    },
    mounted(){
        this.getPlayer()
    },
    methods: {
        getPlayer(){            
        this.players.forEach( player => {
          if(player.position == this.tile){
            this.tileValue = player
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
        /* background-color: rgb(219, 219, 219); */
    }
</style>
