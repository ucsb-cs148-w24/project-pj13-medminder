import { useAuthContext } from './AuthContext';
import { ref } from 'firebase/database';
import { database } from '../utils/firebase.utils';

export default function EditAlert(props) {

    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const dataRef = ref(database, 'Users/' + userId + '/UserData' + props.timestamp);

    const editAlert = () => {
        alert("you hit the edit button")
    }




    return (
        <button onClick={editAlert}>Alert</button>
    )
}