// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup
import { FirebaseApp, initializeApp } from "firebase/app";

// https://firebase.google.com/docs/auth/web/start
import { getAuth, createUserWithEmailAndPassword, Auth, signInWithEmailAndPassword } from "firebase/auth";

// https://firebase.google.com/docs/firestore/quickstart
import { Firestore, getFirestore, collection, addDoc, getDocs, query, where, limit, CollectionReference, DocumentData } from "firebase/firestore";

class FirebaseAPI {
  private app: FirebaseApp;
  private db: Firestore;
  private auth: Auth;
  private usersCollection: CollectionReference<DocumentData>;

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
    this.usersCollection = collection(this.db, "users");
  }

  /**
   * Create the user with email and password
   * @param email User email
   * @param password User password
   * @throws object: {code: string, message: string}
   * @returns The user ID
   */
  public async createUser (email: string, password: string): Promise<string> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user.uid;

    // implement error handling:
    // const errorCode = error.code;
    // const errorMessage = error.message;
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
    const docRef = await addDoc(this.usersCollection, {
      uid: uid,
      firstName: firstName,
      lastName: lastName
    });

    // console.log("Document written with ID: ", docRef.id);

    // implement error handling:
    // console.error("Error adding document: ", e);

    return docRef.id;
  }

  /**
   * Login the user with email and password
   * @param email User email
   * @param password User password
   * @throws object: {code: string, message: string}
   * @returns The user ID
   */
  public async loginUser (email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user.uid;

    // implement error handling:
    // const errorCode = error.code;
    // const errorMessage = error.message;
  }

  /**
   * Read the user information from database
   * @param uid User unique ID
   * @throws An error string
   * @returns object: {uid: string, firstName: string, lastName: string}
   */
  public async readUser (uid: string) {
    const querySnapshot = await getDocs(
      query(
        this.usersCollection,
        where("uid", "==", uid),
        limit(1)
      )
    );

    if (querySnapshot.size === 0) {
      throw new Error("User not found");
    }

    const userData = querySnapshot.docs[0].data();

    return {
      uid: uid,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
  }
}

export default new FirebaseAPI();
