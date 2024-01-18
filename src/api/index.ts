import {http} from './http'

export const loginApi = (data:{username:string,password:string}) =>{
    return http.post('/park/login',data)
}


//侧边栏
export const getMenuList = () =>{
    return http.get('/park/sys/permision/all/tree')
}

//月卡管理
export const getCardList =(data:{page:string,pageSize:string}) =>{
    return http.get('/parking/card/list',data)
}

//删除月卡管理
export const delCard =(data:{ids:string}) =>{
    return http.delete(`parking/card/${data.ids}`,data)
}

//添加删除月卡
export const addCard =(data:any) =>{
    return http.post('/parking/card',data)
}

//回填
export const getCardInfo =(data:{id:string}) =>{
    return http.get(`/parking/card/detail/${data.id}`)
}

//编辑
export const editCard =(data:any) =>{
    return http.put(`//parking/card/edit/${data.id}`)
}

// 企业管理列表
export const getqylist = (data:{page?:string,pageSize?:string,name?:string}) =>{
    return http.get('/park/enterprise',data)
}