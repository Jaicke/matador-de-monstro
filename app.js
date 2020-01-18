var app = new Vue({
  el: '#app',
  data: {
    playing: false,
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
        this.currentPlayerLife = 0
        this.playing = false
        this.winner = 'monster'
        this.hasWinner = true
      }
    },
    currentMonsterLife(current){
      if(current <= 0){
        this.currentMonsterLife = 0
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
      return {
        width: `${this.currentPlayerLife}%`,
        backgroundColor: this.currentPlayerLife < 20 ? '#ff0000c4' : '#087508'
      }
    },
    healthStyleMonster(){
      return {
        width: `${this.currentMonsterLife}%`,
        backgroundColor: this.currentMonsterLife < 20 ? '#ff0000c4' : '#087508'
      }
    }
  },
  methods: {
    randomNumber(min, max){
      return Math.floor(Math.random() * (max - min) ) + min;
    },
    attack(specialAttack){
      let currentPlayerPower = this.playerPower
      if(specialAttack) currentPlayerPower += 8
      let monsterAttack = this.randomNumber(5, this.monsterPower)
      let playerAttack = this.randomNumber(5, currentPlayerPower)
      this.currentPlayerLife -= monsterAttack
      this.currentMonsterLife -= playerAttack

      this.actionsLogs.unshift({ monsterAttack: `MONSTRO ATACOU JOGADOR COM ${monsterAttack}`,
                                 playerAttack: `JOGADOR ATACOU MONSTRO COM ${playerAttack}`})

    },
    heal(){
      let monsterAttack = this.randomNumber(5, this.monsterPower)
      let playerHeal = this.randomNumber(5, 13)
      this.currentPlayerLife -= monsterAttack
      this.currentPlayerLife += playerHeal

      if(this.currentPlayerLife > 100) this.currentPlayerLife = 100
      this.actionsLogs.unshift({ monsterAttack: `MONSTRO ATACOU JOGADOR COM ${monsterAttack}`,
                                 playerAttack: `JOGADOR CUROU COM ${playerHeal}`})
    },
    startGame(){
      this.playing = true
      this.currentPlayerLife = 100
      this.currentMonsterLife = 100
      this.actionsLogs = []
      this.hasWinner = false
    }
  }
})
