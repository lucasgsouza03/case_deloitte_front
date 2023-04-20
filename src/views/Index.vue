<template>
  <div class="center">

    <div v-if="user">
      <h1>Notas</h1>
      <infinite-scroll
        @infinite-scroll="loadDataFromServer"
        :message="message"
        :noResult="noResult"
      >
      <div class="grid">
        <div v-for="card in cards" v-bind:key="card.discipline" class="card blue-grey darken-1">
          <div class="card-content white-text">
            <h5 class="card-title">{{ card.discipline.name }}</h5>
          </div>
          <div class="card-action">
            <span>Carga Horária: </span>
            <a>{{ card.discipline.workload }}</a>
            <span>Data da Entrega: </span>
            <a>{{ card.report_card.due_date }}</a>
          </div>
          <div class="card-action">
            <span>Nota: </span>
            <a>{{ card.grade }}</a>
          </div>
        </div>
      </div>
      </infinite-scroll>
    </div>
    <div v-else>
      <h1>Home</h1>
    </div>
  </div>
    
</template>

<script>
import Api from '../service/api'
import InfiniteScroll from "infinite-loading-vue3";


export default {
  name: 'IndexView',
  data() {
    return {
      cards: [],
      pagination: null,
      page: 1,
      noResult: false,
      message: "",
      user: null
    }
  },
  components: {
    InfiniteScroll
  },
  methods: {
    loadDataFromServer() {
      if (this.pagination.next) {
        const url = this.pagination.next.replace('http://127.0.0.1:8000/', '')
        Api.paginate(url).then(res => {
          const result =  res.data.results
          if(result.length) {
              this.cards.push(...result);
              this.page++;
              this.pagination = res.data
            }
      })
    } else {

      this.noResult = true;
      this.message = "Sem mais resultados";
    }
    
  }
},
  updated() {
    Api.listCards().then(
      res => {
        this.pagination = res.data
        this.cards = res.data.results
        if (this.$store.state.user){
          this.user = this.$store.state.user
        } else {
          this.user = null
        }
      }
    )

  },
  mounted() {
    if (this.$store.state.user){
        this.user = this.$store.state.user
      } else {
        this.user = null
      }
  }
  
}
</script>

<style scoped>
  div.container {
    margin: 0;
    width: 50%;
    padding: 10px;

  }
  div.row {
    margin: auto;
    width: 70%;
    padding: 10px;

  }
  h5 span {
    font-weight: bold;
    color: white;
  }
</style>
