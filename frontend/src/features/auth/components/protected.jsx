import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";

const Protected=({children})=>{
    const {loading,user}=useAuth()
    const navigate = useNavigate()
    if(loading){
        return(<main></main>)
    }
    if(!user){
        navigate('/login')
    }


    return children

}

export default Protected


