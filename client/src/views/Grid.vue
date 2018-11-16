<template>
    <div class="grid">
    <div class="row">
        <div class="box"><div class="inner">1</div></div>
        <div class="box"><div class="inner">2</div></div>
        <div class="box"><div class="inner">3</div></div>
        <div class="box"><div class="inner">4</div></div>
        <div class="box"><div class="inner">5</div></div>
         <div class="box"><div class="inner">6</div></div>
        <div class="box"><div class="inner">7</div></div>
        <div class="box"><div class="inner">8</div></div>
        <div class="box"><div class="inner">9</div></div>
        <div class="box"><div class="inner">10</div></div>
    </div>
    <div class="row">
        <div class="box"><div class="inner">11</div></div>
        <div class="box"><div class="inner">12</div></div>
        <div class="box"><div class="inner">13</div></div>
        <div class="box"><div class="inner">14</div></div>
        <div class="box"><div class="inner">15</div></div>
         <div class="box"><div class="inner">16</div></div>
        <div class="box"><div class="inner">17</div></div>
        <div class="box"><div class="inner">18</div></div>
        <div class="box"><div class="inner">19</div></div>
        <div class="box"><div class="inner">20</div></div>
    </div>    
    <div class="row">
        <div class="box"><div class="inner">21</div></div>
        <div class="box"><div class="inner">22</div></div>
        <div class="box"><div class="inner">23</div></div>
        <div class="box"><div class="inner">24</div></div>
        <div class="box"><div class="inner">25</div></div>
         <div class="box"><div class="inner">26</div></div>
        <div class="box"><div class="inner">27</div></div>
        <div class="box"><div class="inner">28</div></div>
        <div class="box"><div class="inner">29</div></div>
        <div class="box"><div class="inner">30</div></div>
    </div>
    <div class="row">
        <div class="box"><div class="inner">31</div></div>
        <div class="box"><div class="inner">32</div></div>
        <div class="box"><div class="inner">33</div></div>
        <div class="box"><div class="inner">34</div></div>
        <div class="box"><div class="inner">35</div></div>
         <div class="box"><div class="inner">36</div></div>
        <div class="box"><div class="inner">37</div></div>
        <div class="box"><div class="inner">38</div></div>
        <div class="box"><div class="inner">39</div></div>
        <div class="box"><div class="inner">30</div></div>
    </div>
</div>
</template>

<script>
export default {
    
}
</script>

<style>
    /* .grid {
    margin: 0 auto;
    width: 200vw;
    max-width: 200vh;
    height: 500vw;
    max-height: 60vh;
    font-size: 1rem;
} */

.grid {
    margin: 0 auto;
    width: 800px;
    max-width: 800px;
    height: 500px;
    max-height: 500px;
    font-size: 1rem;
}
    .row {
        display: flex;
    }
    .box {
        background: tomato;
        margin: 1px;
        color: white;
        font-weight: bold;
        flex: 1 0 auto;
        position: relative;
    }
    .box:after {
        content: "";
        float:left;
        display: block;
        padding-top: 100%;
    }
    .box .inner {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>


