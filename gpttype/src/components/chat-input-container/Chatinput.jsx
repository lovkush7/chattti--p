import React, { useRef, useState } from 'react'
import "./Chatinput.css"
import { Image, Send, SendIcon } from "lucide-react"
import { usechatstore } from '../../Auth/messages';

const Chatinput = () => {
    const [imagepreview, setImagepreview] = useState(null);
    const [Text , setText]= useState("");
    const fileinputref = useRef();

    const { sendmessage} = usechatstore()

    const handlemessages= (e)=>{
        // console.log(e.target.value);
        setText(e.target.value);

    

    }
    const handleimages = (e)=>{
        const file = e.target.files[0];
        if(!file.type.startsWith("image/")){
         return;
        }
        const reader = new FileReader();
        reader.onload =()=>{
            setImagepreview(reader.result)
        }
        reader.readAsDataURL(file);
    }
    const removeImages =()=>{
        setImagepreview(null)
        if(fileinputref.current){
            fileinputref.current.value="";
        }
    }
    const handlesendmessages = async()=>{
        if(!Text && !imagepreview){
            return;
        }
        try{
            await sendmessage({
                text: Text.trim(),
                image: imagepreview
            });
            //clear 
            setText("")
            setImagepreview(null);
            if(fileinputref.current){
                fileinputref.current.value = ""
            }

        }catch(err){
            console.log("the error is "+err);
        }
    }
  return (
    <div className='message-input'>
        {imagepreview && (
            <div className='previewe-wrapper'>
                <div className="preview-box">
                    <img src={imagepreview} alt="preview" className='preview-images' />
                    <button type='submit' className='remove-btn' >
                        <span onClick={removeImages} className="remove-icon">X</span>
                        </button>
                </div>
            </div>
        )}
        <form onSubmit={handlesendmessages} className='form-row' action="">
            <div className="grow">
                <input type="text " 
                className='input-text'
                name='text'
                placeholder='Type a messages .....'
                value={Text} 
                onChange={handlemessages}
                />
                <input type="file" 
                accept='image/*'
                ref={fileinputref}
                className='hidden'
                onChange={handleimages}
                
                />
                <button type='button' 
                className={`btn btn-circle btn-sm-hidden ${imagepreview ? 'text-emerald-500' : 'text-zinc-500'}`
              } onClick={()=>
              {fileinputref.current?.click();
                console.log("button clicked")
              }
              }>
                  <Image size={22}/>
                </button>
                
            </div>
            <button type='submit'
            className='bttn btn-sm btn-circle' 
            disabled={!Text.trim() && !imagepreview}
            > <SendIcon size={22}/> </button>
        </form>
      
    </div>
  )
}

export default Chatinput
