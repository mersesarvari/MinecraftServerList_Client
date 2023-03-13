import axios from "axios";
import { SERVERIP } from '../LOCAL';



//Loader function
export const serverDetailsLoader = async ({params}) => { 
    const{id} = params;
    console.log(SERVERIP+"server/"+id);
    const response = await axios.get(SERVERIP+"server/"+id);
    console.log(response);
    if(response.status !==200)
    {
        throw Error('Could not find that server');
    }
    console.log(response.data)
    return response.data;
    
}