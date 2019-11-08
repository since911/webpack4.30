<template>
  <div>
    <span>{{test}}</span>
    {{JSON.stringify(items)}}
  </div>
</template>

<script>
export default {
  name: 'List',
  data(){
    return {
      message:'test'
    }
  },
  computed: {
    items () {
      console.log(222,this.$store.state.items)
      return this.$store.state.items
    },
    test(){
      return this.message
    }
  },
  // beforeMount () {
  //   if (this.asyncData) {
  //     this.asyncData(this.$store)
  //   }
  // },
  asyncData({ store }){
    return store.dispatch('fetchData')
  }
}
</script>
