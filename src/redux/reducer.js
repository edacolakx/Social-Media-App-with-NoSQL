const INITIAL_STATE={
    kullaniciadi:"Eda",token:"fd",posts:[],refreshing:false,refreshingmy:false,myposts:[],
    draweropen:false,isFollowingPerson:false,toast:[],modalVisible:false
}
const genelResponseReducer= (state=INITIAL_STATE,action)=>{
    switch (action.type) {
        case "SET_NAME":
                return {...state,kullaniciadi:action.payload}
        case "SET_TOKEN":
                return {...state,token:action.payload}
        case "SET_POSTS":
                return {...state,posts:action.payload,refreshing:false}
        case "REFRESH_POSTS":
                return {...state,refreshing:true}
        case "REFRESH_MYPOSTS":
                return {...state,refreshing:true}
        case "SET_MYPOSTS":
                return {...state,myposts:action.payload}
        case "SET_DRAWER":
                return {...state,draweropen:action.payload}
            
        case "IS_FOLLOWING":
                return {...state,isFollowingPerson:action.payload}
            
        case "TOAST":
                return {...state,toast:action.payload}
        case "MODAL_VISIBLE":
                return {...state,modalVisible:action.payload}
            
    
        default:
           return state
    }
}

export default genelResponseReducer