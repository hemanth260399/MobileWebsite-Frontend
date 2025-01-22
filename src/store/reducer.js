let userData = JSON.parse(localStorage.getItem("userData"))
let autenctionState = Boolean(userData)
const initalvalue = {
    userInfo: userData,
    autenctionState: autenctionState,
    totalproduct: 0,
}
export const Itemreducer = (state = initalvalue, action) => {
    switch (action.type) {
        case "SET_USER_INFO": {
            return {
                ...state,
                userInfo: action.payload,
                autenctionState: true
            }
        }
        case "currentCartvalue": {
            return {
                ...state,
                totalproduct: action.payload
            }
        }
        case "Cartcountinc": {
            return {
                ...state,
                totalproduct: state.totalproduct + 1
            }
        }
        case "cartcountdec": {
            return {
                ...state,
                totalproduct: state.totalproduct - 1
            }
        }
        case "LOGOUT": {
            return {
                userInfo: null,
                autenctionState: false,
                totalproduct: 0,
            }
        }
        default:
            return state
    }
}
