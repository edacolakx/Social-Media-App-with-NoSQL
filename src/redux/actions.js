export const setName=(kullaniciadi)=>{
return{
    type:"SET_NAME",
    payload:kullaniciadi
}
}
export const setToken=(token)=>{
return{
    type:"SET_TOKEN",
    payload:kullaniciadi
}
}
export const setPosts=(post)=>{
return{
    type:"SET_POSTS",
    payload:post
}
}
export const setMyPosts=(post)=>{
return{
    type:"SET_MYPOSTS",
    payload:post
}
}
export const refreshPosts=(post)=>{
return{
    type:"REFRESH_POSTS",
    payload:post
}
}
export const refresMyhPosts=(post)=>{
return{
    type:"REFRESH_MYPOSTS",
    payload:post
}
}
export const openDrawer=(post)=>{
return{
    type:"SET_DRAWER",
    payload:post
}
}
export const following=(post)=>{
return{
    type:"IS_FOLLOWING",
    payload:post
}
}
export const toastFunction=(post)=>{
return{
    type:"TOAST",
    payload:post
}
}
export const settingsModal=(post)=>{
return{
    type:"MODAL_VISIBLE",
    payload:post
}
}