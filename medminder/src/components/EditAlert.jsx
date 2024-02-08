import { useAuthContext } from './AuthContext';
import { ref } from 'firebase/database';
import { database } from '../utils/firebase.utils';
import { AiFillEdit } from "react-icons/ai";
import '../Dash-style.css';

export default function EditAlert(props) {

    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const dataRef = ref(database, 'Users/' + userId + '/UserData' + props.timestamp);

    const editAlert = () => {
        
    }




    return (
        <button className="edit"><AiFillEdit /></button>
    )
}