
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