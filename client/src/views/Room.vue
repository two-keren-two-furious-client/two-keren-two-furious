<template>
    <div>
        <div class="row">
        <!-- p1 -->
            <div class="card ml-2" style="width: 18rem; margin: 10px;" v-if="p1">
                <div class="card-body" >
                    <h4 class="card-title">Player 1</h4>
                    <h5 class="card-title">{{ p1.name }}</h5>
                    <div class="btn btn-dark" :class="{disabled: mytoken !== p1.id}" v-if="!p1.ready" @click="statusChanger('p1')"> Ready</div>
                    <div class="btn btn-dark" :class="{disabled: mytoken !== p1.id}" v-else @click="statusChanger('p1')">Cancel ready</div>        
                </div>
            </div>
        </div>
        <!-- p2 -->
        <div class="card ml-2" style="width: 18rem; margin: 10px;" v-if="p2">
            <div class="card-body" >
                <h4 class="card-title">Player 2</h4>
                <h5 class="card-title">{{ p2.name }}</h5>
                <div class="btn btn-dark" :class="{disabled: mytoken !== p2.id}" v-if="!p2.ready" @click="statusChanger('p2')"> Ready</div>
                <div class="btn btn-dark" :class="{disabled: mytoken !== p2.id}" v-else @click="statusChanger('p2')">Cancel ready</div>
            </div>
        </div>
        
        <div class="btn btn-dark" @click="exitRoom">Exit Room</div>
    </div>

</template>

<script>
import firebaseApp from '@/assets/config.js'

const db = firebaseApp.database() 

export default {
    data(){
        return{
            mytoken: localStorage.getItem('token'),
            myName: localStorage.getItem('name'),
            p1: {},
            p2: {},
            roomId: null,
            roomName: null,
            roomHost: null,
            roomStatus: 'waiting'
        }
    },
    created(){
        this.roomInit()
    },
    watch: {
        p1() {
            if (!this.p1) {
                this.closeRoom()
            }
        }
    },
    methods: {
        roomInit(){
            let token = localStorage.getItem('token')
            let name = localStorage.getItem('name')
            let roomId = localStorage.getItem('roomId')

            db.ref(`/db/rooms/` + roomId + `/player`).on('value', snapshot => {
                if (!snapshot.val()) {
                    this.p1 = null
                    this.p2 = null
                } else {
                    this.p1 = snapshot.val().p1
                    this.p2 = snapshot.val().p2
                }
            })

            db.ref(`/db/rooms/` + roomId).once('value', snapshot => {
                if (!snapshot.val()) {
                    this.roomName = null
                    this.roomId = null
                    this.roomHost = null
                } else {
                    this.roomName = snapshot.val().name
                    this.roomId = snapshot.val().id
                    this.roomHost = snapshot.val().host
                }
            })

            db.ref(`/db/rooms/` + roomId + `/status`).on('value', snapshot => {
                this.roomStatus = snapshot.val()
            })
            console.log(this.p1);
            
        },
        statusChanger(target){
            let val = ''
            if (target == 'p1') {
                val = !this.p1.ready
            } else if (target == 'p2') {
                val = !this.p2.ready
            }
            db.ref(`/db/rooms/` + this.roomId + `/player/${target}/ready`).set(val)
        },
        exitRoom() {
            let token = localStorage.getItem('token')
            let roomId = localStorage.getItem('roomId')
            db.ref(`/db/rooms/` + roomId + `/player`).on('value', snapshot => {
                for (let i = 0; i < Object.keys(snapshot.val()).length; i++) {
                    if (Object.values(snapshot.val())[i].id == token) {
                        if (Object.keys(snapshot.val())[i] == 'p1') {
                            localStorage.removeItem('roomId')
                            db.ref(`/db/rooms/` + roomId).remove()
                            this.roomInit()
                        } else {
                            db.ref(`/db/rooms/` + roomId + `/player/${Object.keys(snapshot.val())[i]}`).remove()
                            localStorage.removeItem('roomId')
                            this.$router.push('lobby')
                        }
                    }
                }
            })
        },
        closeRoom(){
            localStorage.removeItem('roomId')
            this.$router.push('lobby')
        }
    }
}

</script>

<style>

</style>
