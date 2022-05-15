// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup
import { FirebaseApp, initializeApp } from "firebase/app";

// https://firebase.google.com/docs/auth/web/start
import { getAuth, createUserWithEmailAndPassword, Auth } from "firebase/auth";

// https://firebase.google.com/docs/firestore/quickstart
import { Firestore, getFirestore, collection, addDoc } from "firebase/firestore";

class FirebaseAPI {
  private app: FirebaseApp;
  private db: Firestore;
  private auth: Auth;

  constructor () {
    const firebaseConfig = {
      apiKey: "AIzaSyBaqHA1ZIdAraX8FCxTkSIZufKxD0vsJm0",
      authDomain: "utn-reactjs-8ddb3.firebaseapp.com",
      projectId: "utn-reactjs-8ddb3",
      storageBucket: "utn-reactjs-8ddb3.appspot.com",
      messagingSenderId: "749649779873",
      appId: "1:749649779873:web:8ef6c4b40e57c3765ca4e0"
    };

    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.auth = getAuth(this.app);
  }

  /**
   * Create a user with email and password
   * @param email User email
   * @param password User password
   * @throws object: {code: string, message: string}
   * @returns The user ID
   */
  public async createUser (email: string, password: string): Promise<string> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const user = userCredential.user;
    console.log('user:');
    console.log(user);
    return user.uid;

    // implement error handling:
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // console.log('error', errorCode);
    // console.error(errorMessage);
  }

  /**
   * Save the user in the database
   * @param uid User unique ID
   * @param firstName First name
   * @param lastName Last name
   * @throws An error string
   * @returns The written document ID
   */
  public async saveUser (uid: string, firstName: string, lastName: string): Promise<string> {
    const docRef = await addDoc(collection(this.db, "users"), {
      uid: uid,
      firstName: firstName,
      lastName: lastName
    });

    // console.log("Document written with ID: ", docRef.id);

    // implement error handling:
    // console.error("Error adding document: ", e);

    return docRef.id;
  }

}

export default new FirebaseAPI();
