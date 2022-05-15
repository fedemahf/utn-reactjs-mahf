// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

class FirebaseAPI {
  constructor () {
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyBaqHA1ZIdAraX8FCxTkSIZufKxD0vsJm0",
      authDomain: "utn-reactjs-8ddb3.firebaseapp.com",
      projectId: "utn-reactjs-8ddb3",
      storageBucket: "utn-reactjs-8ddb3.appspot.com",
      messagingSenderId: "749649779873",
      appId: "1:749649779873:web:8ef6c4b40e57c3765ca4e0"
    };
    
    // Initialize Firebase
    // const app = initializeApp(firebaseConfig);
    initializeApp(firebaseConfig);
  }

  async createUser (email: string, password: string) {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log('user:');
    console.log(user);

    // if(user.uid) {
    //     // firebase.firestore().collection("usuarios")
    //     const document = await firebase.db.collection("usuarios")
    //     .add({
    //         name:data.nombre,
    //         lastname:data.apellido,
    //         userId:responseUser.user.uid
    //     })
    //     console.log("document",document)
    // }

    // implement error handling:
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log('error', errorCode);
    // console.error(errorMessage);
  }
}

export default new FirebaseAPI();
