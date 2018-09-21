
// export const increment = ({commit}) => {
//     commit('INCREMENT')
// }
// export const decrement = ({commit}) => {
//     commit('DECREMENT')
// }
// export const clear = ({commit}) =>{
// 	commit('CLEAR')
// }

export const setMyF = ({commit},data) =>{
	commit('SENDMYF',data)
}
export const setMyInfo = ({commit},data) =>{
	commit('changeInfo',data)
}
export const setTeacherInfo = ({commit},data) =>{
	commit('changeTeacherInfo',data)
}
export const setStep = ({commit},data) =>{
	commit('changeStep',data)
}