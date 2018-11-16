<template>
<div class="container">
  <div class="row healthrow">
    <div class="player1">
      <h2>Player 1</h2>
      <div class="healthbars">
       hp <canvas class=" bar healthbar col-2" ref="healthbar" v-for="n in player1.hp/10"></canvas> {{player1.hp}}
      </div>    
    </div>
    <div class="player2">
      <h2>Player 2</h2>
      <div class="healthbars">
        {{player2.hp}}<canvas class=" bar healthbar col-2" ref="healthbar" v-for="n in player2.hp/10"></canvas> hp
      </div>    
    </div>
  </div>
    <div class="shootrow row">
      <div class="player1">  
        <div class="shootbars">
          ammo<canvas class=" bar shootbar col-2" ref="shootbar" v-for="n in player1.amo/10"></canvas>
        </div>
      </div>
      <div class="player2">
        <div class="shootbars">
          <canvas class=" bar shootbar col-2" ref="shootbar" v-for="n in player2.amo/10"></canvas>ammo
        </div>
      </div>
    </div>      

</div>
  
</template>
<style>
  .bar {
    border: rgb(34, 24, 43) solid 5px;
  }
  .healthrow {
    display: flex;
    justify-content: space-between
  }
  .shootrow {
    display: flex;
    justify-content: space-between
  }
  .shootbar{
    height:30px;
    max-width: 40px;
    background-color:rgb(238, 107, 20);
    margin: 0 1px;
    border: none;
    flex: none;
  }
  .shootbars {
    width:auto;
    justify-content: flex-start;
    display:flex;
    margin: 10px 0;
  }
 
  .healthbars {
    width:auto;
    justify-content: flex-start;
    display:flex;
  }
   .healthbar{
    height:30px;
    width: 40px;
    background-color:rgb(20, 238, 38);
    margin: 0 1px;
    border: none;
    flex: none;
  }
</style>
<script>
  export default {
    name: "health-bar",
    props:['player1','player2'],
    data (){
   
    },
    mounted() {
      // this.reloadShootBar();
    },
    methods: {
    
    }
  }
</script>
