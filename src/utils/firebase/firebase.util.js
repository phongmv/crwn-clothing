import {initializeApp} from 'firebase/app';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import {collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch} from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD2j2K0JLjv0CoeZfKjN1jEcrM7fz9UjKg",
    authDomain: "cwrn-clothing-f2e25.firebaseapp.com",
    projectId: "cwrn-clothing-f2e25",
    storageBucket: "cwrn-clothing-f2e25.appspot.com",
    messagingSenderId: "736399081533",
    appId: "1:736399081533:web:ae59878b5743505cb7ea54",
    measurementId: "G-F52NNV0H72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(app);
provider.setCustomParameters({
    prompt: "select_account"
})

const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const addCollectionAndDocuments = async (
    collectionKey,
    objectsToAdd
) => {
    const batch = writeBatch(db);
    const collectionRef = collection(db, collectionKey);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });
    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories')
    const q = query(collectionRef)

    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.reduce((acc, docSnapshot) => {
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)
    const userSnapShot = await getDoc(userDocRef)

    if (!userSnapShot.exists()) {
        const {displayName, email} = userAuth
        const createdAt = new Date()
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (e) {
            console.log("Error creating the user", e.message)
        }
    }

    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
}

export const  signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)