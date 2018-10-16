
  export const  getInfoTeacherF = (next,to,getInfoTeacher,store)=> {
    getInfoTeacher().then(res => {
      let data = res.data;
      let inf = {
        id: data.id,
        img: data.picId?data.picId:'',
        experience: data.experience ? data.experience : {
          label: '',
          name: ''
        },
        skill: data.skill ? data.skill.split(',') : [],
        realName: data.realName?data.realName:'',
        gender: data.gender ? data.gender.name : '',
        // birthday: data.birthday ? data.birthday : '',
        // address: data.address ? data.address : '',
        // mobilePhone: data.mobilePhone ? data.mobilePhone : '',
        description: data.description ? data.description : '',
        edus: data.edus,
        exps: data.exps,
        cerIds: data.cerIds?data.cerIds:'',
        status: data.status,
        rejectReason: data.rejectReason?data.rejectReason: '资料审核未通过'
      }
      localStorage.setItem('teacherInfo', JSON.stringify(inf))
      store.commit('changeTeacherInfo', { ...inf
      })
      if (inf.status.name !== 'PASS' && to.path !== '/applyFirst') {
        next('/applyFirst')
      } else  if (inf.status.name === 'PASS' && to.path === '/applyFirst') {
        next('/teacher')
      } else {
        next()
      }
    })
  }
  
  export const getStudentInfoF = (next,getStudentInfo,store)=> {
    getStudentInfo().then(res => {
      let data = res.data;
      let inf = {
        img: data.avatarId?data.avatarId:'',
        nickname: data.nickName ? data.nickName : '',
        name: data.realName ? data.realName : '',
        sex: data.gender ? data.gender.label : '男',
        birthday: data.birthday ? data.birthday.slice(0, 10) : '',
        address: data.address ? data.address : '',
        cell: data.mobilePhone ? data.mobilePhone : '',
        id: data.id
      }
      localStorage.setItem('info', JSON.stringify(inf))
      store.commit('changeInfo', { ...inf
      })
    }).then(() => {
      next()
    })
  }
  export const setUuid = ()=>{
    let d = new Date().getTime();
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
  }
 