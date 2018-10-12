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
        getInfoTeacher
    } from '../api/api'
    export default {
        components: {
            Loading
        },
        data() {
            return {
                isLoading: false,
                teacherInf: {
                    id: '',
                    img: '',
                    experience: {
                        label: '',
                        name: ''
                    },
                    skill: [],
                    realName: '',
                    gender: '',
                    // birthday: data.birthday ? data.birthday : '',
                    // address: data.address ? data.address : '',
                    // mobilePhone: data.mobilePhone ? data.mobilePhone : '',
                    description: '',
                    edus: [],
                    exps: [],
                    cerIds: '',
                }
            }
        },
        created() {
            this.isLoading = true;
            const role = localStorage.getItem('role');
            getAT().then(res => {
                console.log(res)
            })
            this.getInfoTeacher()
        },
        methods: {
            getInfoTeacher() {
                getInfoTeacher().then(res => {
                    if (res.data === null) {
                        localStorage.setItem('info', JSON.stringify(this.teacherInf))
                        this.setTeacherInfo({ ...this.teacherInf
                        })
                    } else {
                        let data = res.data;
                        let inf = {
                            id: data.id,
                            img: data.picId,
                            experience: data.experience ? data.experience : {
                                label: '',
                                name: ''
                            },
                            skill: data.skill.split(','),
                            realName: data.realName,
                            gender: data.gender ? data.gender.name : '',
                            // birthday: data.birthday ? data.birthday : '',
                            // address: data.address ? data.address : '',
                            // mobilePhone: data.mobilePhone ? data.mobilePhone : '',
                            description: data.description ? data.description : '',
                            edus: data.edus,
                            exps: data.exps,
                            cerIds: data.cerIds,
                        }
                        localStorage.setItem('teacherInfo', JSON.stringify(inf))
                        this.setTeacherInfo({ ...inf
                        })
                    }
                }).then(() => {
                    this.isLoading = false;
                    this.$router.push('/teacher')
                })
            },
            ...mapActions(['setTeacherInfo']),
        },
        computed: {}
    }
</script>

<style lang="less">

</style>
