// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup
import {
  FirebaseApp,
  initializeApp
} from "firebase/app";

// https://firebase.google.com/docs/auth/web/start
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword
} from "firebase/auth";

// https://firebase.google.com/docs/firestore/quickstart
import {
  Firestore,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  limit,
  CollectionReference,
  DocumentData,
  getDoc,
  doc,
  deleteDoc
} from "firebase/firestore";

export interface FirebaseUserData {
  uid: string;
  firstName: string;
  lastName: string;
}

export interface FirebaseProductData {
  uid?: string;
  name: string;
  description: string;
  price: number;
}

class FirebaseAPI {
  private app: FirebaseApp;
  private db: Firestore;
  private auth: Auth;
  private usersCollection: CollectionReference<DocumentData>;
  private productsCollection: CollectionReference<DocumentData>;

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
    this.productsCollection = collection(this.db, "products");
  }

  /**
   * Create the user with email and password
   * @param email User email
   * @param password User password
   * @throws object: {code: string, message: string}
   * @returns The user ID
   */
  public async insertUser (email: string, password: string): Promise<string> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    return userCredential.user.uid;
  }

  /**
   * Save the user in the database
   * @param uid User unique ID
   * @param firstName First name
   * @param lastName Last name
   * @throws An error string
   * @returns The written document ID
   */
  public async insertUserData (userData: FirebaseUserData): Promise<string> {
    const docRef = await addDoc(this.usersCollection, {
      uid: userData.uid,
      firstName: userData.firstName,
      lastName: userData.lastName
    });
    return docRef.id;
  }

  /**
   * Login the user with email and password
   * @param email User email
   * @param password User password
   * @throws object: {code: string, message: string}
   * @returns The user ID
   */
  public async getUserId (email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user.uid;
  }

  /**
   * Read the user information from database
   * @param uid User unique ID
   * @throws An error string
   * @returns FirebaseUserData object
   */
  public async getUserDataById (uid: string): Promise<FirebaseUserData> {
    const querySnapshot = await getDocs(
      query(
        this.usersCollection,
        where("uid", "==", uid),
        limit(1)
      )
    );

    if (querySnapshot.size === 0) {
      throw new Error("User data not found");
    }

    const userData = querySnapshot.docs[0].data();

    return {
      uid: uid,
      firstName: userData.firstName,
      lastName: userData.lastName
    };
  }

  /**
   * Save the product in the database
   * 
   * @param data FirebaseProductData object
   * @throws An error string
   * @returns The written document ID
   */
  public async saveProduct (data: FirebaseProductData): Promise<string> {
    const docRef = await addDoc(this.productsCollection, {
      name: data.name,
      description: data.description,
      price: data.price
    });
    return docRef.id;
  }

  /**
   * Read the product information from database
   * @param uid Product unique ID
   * @throws An error string
   * @returns FirebaseProductData object
   */
  public async getProductById (uid: string): Promise<FirebaseProductData> {
    const result = await getDoc(
      doc(this.db, `${this.productsCollection.path}/${uid}`)
    );

    if (!result.exists()) {
      throw new Error("Product not found");
    }

    const userData = result.data();

    return {
      uid: uid,
      name: userData.name,
      description: userData.description,
      price: userData.price
    };
  }

  /**
   * Delete the product from database
   * @param uid Product unique ID
   */
  public async deleteProductById (uid: string): Promise<void> {
    await deleteDoc(
      doc(this.db, `${this.productsCollection.path}/${uid}`)
    );
  }

  /**
   * Read all the products from database
   * @returns FirebaseProductData array
   */
  public async getAllProducts (): Promise<FirebaseProductData[]> {
    const products: FirebaseProductData[] = [];

    const result = await getDocs(
      query(this.productsCollection)
    );

    result.forEach(doc => {
      const docData = doc.data();
      products.push({
        uid: doc.id,
        name: docData.name,
        description: docData.description,
        price: docData.price
      });
    })

    return products;
  }
}

export default new FirebaseAPI();
