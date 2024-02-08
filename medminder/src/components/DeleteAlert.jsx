import { useAuthContext } from './AuthContext';
import { ref, remove } from 'firebase/database';
import { database } from '../utils/firebase.utils';

export default function DeleteAlert(props) {

    const auth = useAuthContext();
    const userId = auth.currentUser.uid;
    const dataRef = ref(database, 'Users/' + userId + '/UserData' + props.timestamp);

    const deleteAlert = () => {
        remove(dataRef)
          .then(() => {
            console.log('Data deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      }



    return (
      <button onClick={deleteAlert}>DeleteAlert</button>
    )
}