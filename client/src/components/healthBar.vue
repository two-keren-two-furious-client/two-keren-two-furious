<template>
<div class="container">
  <div class="row healthrow">
    <div class="player1 mt-4 mb-4">
      <h2 style="color: #fff">Player 1</h2>
      <div class="healthbars">
        <p style="color: #fff">hp</p>
       <canvas class=" bar healthbar col-2" ref="healthbar" v-for="n in player1.hp/10"></canvas> {{player1.hp}}
      </div>    
    </div>
    <div class="player2">
      <h2 style="color: #fff">Player 2</h2>
      <div class="healthbars">
        {{player2.hp}}<canvas class=" bar healthbar col-2" ref="healthbar" v-for="n in player2.hp/10"></canvas> <p style="color: #fff">hp</p>
      </div>    
    </div>
  </div>
    <div class="shootrow row">
      <div class="player1">  
        <div class="shootbars">
          <p style="color: #fff">ammo</p>
          <canvas class=" bar shootbar col-2" ref="shootbar" v-for="n in player1.amo/10"></canvas>
        </div>
      </div>
      <div class="player2">
        <div class="shootbars">
          <canvas class=" bar shootbar col-2" ref="shootbar" v-for="n in player2.amo/10"></canvas><p style="color: #fff">ammo</p>
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
   
    }
  }
</script>
