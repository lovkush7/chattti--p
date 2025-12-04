import { create } from "zustand"
import { api } from "../api/Api";

export const usechatstore = create((set,get)=>({
    messages: [],
    Users: [],
    selectedUsers:null,
    isuserloading: false,
    ismessageloadig:false,


    getusers: async()=>{
        try{
            set({isuserloading:true});

            const res = await api.get("/chat/user")
            console.log("response"+res.data)
            set({Users:res.data.users});

        }catch(err){
            console.log(err);
        }finally{
            set({isuserloading:false})
        }

    },

    getmessages: async(userid)=>{
        try{
            set({ismessageloadig:true})
            const res = await api.get(`/chat/${userid}`)
            set({messages:res.data})
        }catch(err){
            console.log("the error is "+err)
        }finally{
            set({ismessageloadig:false})
        }
    },
  
    sendmessage: async (messagedata)=>{
        try{
            const {messages,selectedUsers} = get();

            const res = await api.post(`/chat/send/${selectedUsers.id} `, messagedata);
            set({messages:[...messages , res.data]});

        }catch(err){
            console.log("the error is"+err);
        }
    },
setselecteduser:async(selectedUsers)=>{
    set({selectedUsers});
    console.log("Susers"+ selectedUsers)

}
    
}))