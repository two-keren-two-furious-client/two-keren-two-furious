<template>
<div class="container">
  <div class="row healthrow">
    <div class="player1">
      <h2>Player 1</h2>
      <div class="healthbars">
        <canvas class=" bar healthbar col-2" ref="healthbar" v-for="n in hpP1"></canvas> {{hpP1*100}}
      </div>    
    </div>
    <div class="player2">
      <h2>Player 2</h2>
      <div class="healthbars">
        {{hpP2*100}}<canvas class=" bar healthbar col-2" ref="healthbar" v-for="n in hpP2"></canvas>
      </div>    
    </div>
  </div>
    <div class="shootrow row">
      <div class="player1">  
        <div class="shootbars">
          <canvas class=" bar shootbar col-2" ref="shootbar" v-for="n in ammoP1"></canvas>
        </div>
      </div>
      <div class="player2">
        <div class="shootbars">
          <canvas class=" bar shootbar col-2" ref="shootbar" v-for="n in ammoP2"></canvas>
        </div>
      </div>
    </div>      
    <button @click="test">test</button>

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
    data (){
      return {
        ammoP1:10,
        hpP1:10,
        ammoP2:10,
        hpP2:10
        }
    },
    mounted() {
      this.reloadShootBar();

    },
 
    methods: {
      test() {
        this.ammoP1=3;
        this.hpP1=3;
      },
        // drawHealthBar (health) {
        //   let bar=this.$refs.healthbar;
        //   console.log('xx',health)
        //   var ctx = bar.getContext("2d");
        //   // Create gradient
        //   var grd = ctx.createLinearGradient(0, 0, 500, 0);
        //   grd.addColorStop(0, "red");
        //   grd.addColorStop(1, "white");

        //   // Fill with gradient
        //   ctx.fillStyle = grd;
        //   ctx.fillRect(10, 10, health, 80);
        // },
        reloadShootBar() {
          setTimeout(()=> {
            setInterval(() => {
                if(this.ammoP1<10) this.ammoP1++;
                if(this.ammoP2<10) this.ammoP1++;
            }, 2000)
          }, 1000);
        },
        
        shoot(){
          //reduce ammo ammo --5
          
          //if hit reduce hp target --5
          
        }
    }
  }
</script>
