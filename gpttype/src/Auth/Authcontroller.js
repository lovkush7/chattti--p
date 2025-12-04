import {create} from "zustand"
import { api } from "../api/Api"

export const useauthstore = create((set,get)=>({
authUser: null,
isLoggingup: false,
isSigningup: false,
isCheckingauth: true,
Onlineuser:[],
isupdatingprofile: false,

check:async ()=>{
try{
    const res = await api.get("/auth/check");
    console.log("check response:", res.data);
    set({authUser:res.data});

}catch(err){
    console.error("auth check error:", {
        message: err?.message,
        status: err?.response?.status,
        data: err?.response?.data,
    });
}finally{
    set({isCheckingauth:false})
}
},
login: async(data)=>{
    set({isLoggingup:true});
    try{
        const res = await api.post("/auth/login", data);
        set({authUser:res.data})
        console.log(res.data);

    }catch(err){
        console.error("the error is"+err)
    }
},
signup:async (data)=>{
    set({isSigningup:true});
    try{
        const res = await api.post("/auth/signup",data
        );
        set({authUser:res.data});

    }catch(err){
        console.error("the error is"+err);
    }
},
logout: async()=>{
    try{
        const res = await api.post("/auth/logout");
        set({authUser:null})

    }catch(err){
        console.error("the error is "+err)
    }
},
profile: async(data)=>{
    try{
        set({isupdatingprofile: true});

        const res = await api.put("/auth/updateprofile",data);
        console.log(res.data)
        set({authUser:res.data})

    }catch(err){
        console.log("the error is "+err)
    }finally{
        set({isupdatingprofile:false})
    }
}
}))