<template>
    <div>
        <loading v-model="isLoading"></loading>
    </div>
</template>

<script>
    import {
        Loading,
    } from 'vux'
    import {
        mapActions
    } from 'vuex'
    import {
        getAT,
        getStudentInfo
    } from '../api/api'
    export default {
        components: {
            Loading
        },
        data() {
            return {
                isLoading: false,
                inf: {
                    img: require('@/assets/0e3a716cf47f1eb695e5b62597dec807.jpg'),
                    nickname: '',
                    name: '',
                    sex: '男',
                    birthday: '',
                    address: '',
                    cell: ''
                },
            }
        },
        created() {
            this.isLoading = true;
            const role = localStorage.getItem('role');
            getAT().then(res => {
                console.log(res)
            })
            this.getStudentInfo()
        },
        methods: {
            getStudentInfo() {
                getStudentInfo().then(res => {
                    if (res.data === null) {
                        localStorage.setItem('info', JSON.stringify(this.inf))
                        this.setMyInfo({ ...this.inf
                        })
                    } else {
                        let data = res.data;
                        let inf = {
                            img: data.avatarId,
                            nickname: data.nickName ? data.nickName : '',
                            name: data.realName ? data.realName : '',
                            sex: data.gender ? data.gender.label : '男',
                            birthday: data.birthday ? data.birthday.slice(0, 10) : '',
                            address: data.address ? data.address : '',
                            cell: data.mobilePhone ? data.mobilePhone : '',
                            id: data.id
                        }
                        localStorage.setItem('info', JSON.stringify(inf))
                        this.setMyInfo({ ...inf
                        })
                    }
                }).then(() => {
                    this.isLoading = false;
                    this.$router.push('/student')
                })
            },
            ...mapActions([
                'setMyInfo'
            ]),
        },
        computed: {}
    }
</script>

<style lang="less">

</style>
