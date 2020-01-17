var app = new Vue({
  el: '#app',
  data: {
    playing: false,
    playerLife: '100%',
    monsterLife: '100%',
    currentPlayerLife: 100,
    currentMonsterLife: 100,
    playerPower: 10,
    monsterPower: 13,
    actionsLogs: [],
    winner: '',
    hasWinner: false
  },
  watch: {
   currentPlayerLife(current){
      if(current <= 0){
        this.playerLife = '0%'
        this.playing = false
        this.winner = 'monster'
        this.hasWinner = true
      }
    },
    currentMonsterLife(current){
      if(current <= 0){
        this.monsterLife = '0%'
        this.playing = false
        this.winner = 'player'
        this.hasWinner = true
      }
    },
    playing(){
      if (this.currentMonsterLife <= 0 && this.currentPlayerLife <= 0){
        this.winner = 'draw'
      }
    }
  },
  computed: {
    disable(){
      return this.currentPlayerLife >= 100 ? true : false
    },
    healthStylePlayer(){
      if(this.currentPlayerLife < 20){
        return {width: this.playerLife, backgroundColor: '#ff0000c4'}
      } else{
        return {width: this.playerLife, backgroundColor: '#087508'}
      }
    },
    healthStyleMonster(){
      if(this.currentMonsterLife < 20){
        return {width: this.monsterLife, backgroundColor: '#ff0000c4'}
      } else {
        return {width: this.monsterLife, backgroundColor: '#087508'}
      }
    }
  },
  methods: {
    attack(specialAttack){
      let currentPlayerPower = this.playerPower
      if(specialAttack){  currentPlayerPower += 8 }
      let monsterAttack = Math.floor(Math.random() * this.monsterPower) + 5
      let playerAttack = Math.floor(Math.random() * currentPlayerPower) + 5
      this.currentPlayerLife -= monsterAttack
      this.currentMonsterLife -= playerAttack
      this.playerLife  = `${this.currentPlayerLife}%`
      this.monsterLife = `${this.currentMonsterLife}%`

      this.actionsLogs.push({ monsterAttack: `MONSTRO ATACOU JOGADOR COM ${monsterAttack}`,
                             playerAttack: `JOGADOR ATACOU MONSTRO COM ${playerAttack}`})

    },
    heal(){
      let monsterAttack = Math.floor(Math.random() * 10) + 5
      let playerHeal = Math.floor(Math.random() * 10) + 5
      this.currentPlayerLife -= monsterAttack
      this.currentPlayerLife += playerHeal
      this.playerLife  = `${this.currentPlayerLife}%`
      this.monsterLife = `${this.currentMonsterLife}%`

      if(this.currentPlayerLife > 100){
        this.currentPlayerLife = 100
        this.playerLife = '100%'
      }
      this.actionsLogs.push({ monsterAttack: `MONSTRO ATACOU JOGADOR COM ${monsterAttack}`,
                             playerAttack: `JOGADOR CUROU COM ${playerHeal}`})
    },
    startGame(){
      this.playing = true
      this.currentPlayerLife = 100
      this.currentMonsterLife = 100
      this.playerLife = '100%'
      this.monsterLife = '100%'
      this.actionsLogs = []
      this.hasWinner = false
    }
  }
})
