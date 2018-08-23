<template>
  <div style="display:flex;align-items:flex-start" >
        <img src="../assets/star.png" alt="" v-for="(item,index) in rank" :key="index+'a'" class="star" @click="cancelR(index)">
        <img src="../assets/starg.png" alt="" v-for="(item,index) in (5-rank)" :key="index+'b'" v-if="item" class="star" @click="addR(index)">

  </div>
</template>

<script>
export default {
     props: {
 rank: {
  type: Number, 
  default: 5
 },
 numb: {
  type: String, 
  default: ''
 } 
 }, 
  data () {
    return {
    }
  },
  methods:{
      cancelR(index){
         this.$emit('reduceRank',{type:'reduce',id:index,numb:this.numb})
      },
      addR(index){
           this.$emit('reduceRank',{type:'add',id:index,numb:this.numb})
      },
  },
  created(){
  },
  mounted(){
  
  },
  computed: {
    },
}
</script>

<style>
.star{
				width: 18px;
		        height: 18px;
		        margin-right:.1rem;
			}
</style>
