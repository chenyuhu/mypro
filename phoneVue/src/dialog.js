export default {
    state: {
        connectStatus: false,
        info: true,
        message: 'nothing'
    },
    getters: {
        not_connectStatus(state){
            return !state.connectStatus
        }
    },
    mutations: {
        SOCKET_CONNECT(state){
            state.connectStatus = true
        },
        changeContent(state, val) {
            state.message = val
        },
        changeInfo: (state, val) => {
            state.info = val
        }
    },
    actions: {
        SOCKET_LOGIN: ({commit}, val) => {
            commit('SOCKET_LOGIN', val)
        },
        changeContent: ({commit}, val) => {
            commit('changeContent', val)
        },
        changeInfo: ({commit}, val) => {
            commit('changeInfo', val)
        },
    }
}
