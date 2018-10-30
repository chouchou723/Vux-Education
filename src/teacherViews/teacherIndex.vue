<template>
    <div class="teacherIndex">
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
        },
        beforeCreate () {
          let inf = JSON.parse(localStorage.getItem('teacherInfo'))
          if (inf.status.name !== 'PASS') {
          this.$router.replace({
            path:`/applyFirst`,
          })
        }else{
             this.$router.replace({
            path:`/teacherHome`,
          })
        }
        },
        created() {
        },
    }
</script>

<style lang="less">
</style>
