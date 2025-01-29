import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { db } from ".";

interface Preferences {
    theme: string
    language: string
}

interface Profiles {
    picture: string
    bio: string
    role: string
}

interface User {
    id?: string
    fullname: string
    email: string
    password: string
    profile: Profiles
    preferences: Preferences
    createdAt: string
}

export async function createUser(user: User) {
    try {
        const q = query(
            collection(db, 'users'), 
            where('email', '==', user.email), 
            limit(1)
        )
        const snapshot = await getDocs(q)
        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        if (users.length > 0) {
            return { status: false, statusCode: 404, message: 'Email already exists' }
        } else {
            try {
                await addDoc(collection(db, 'users'), user)
                return { status: true, statusCode: 200, message: 'Register success' } 
            } catch (err) {
                return { status: false, statusCode: 400, message: 'Register failed' }
            }
        }
    } catch (err) {
        console.error(err)
        return { status: false, statusCode: 404, message: 'Check your connections'}
    }
}

export async function signIn(email: string) {
    try {
        const q = query(collection(db, 'users'), where('email', '==', email))
        const snapshot = await getDocs(q)

        if (snapshot.empty) {
            return null
        }

        const users = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        return users[0]
    } catch (err) {
        throw new Error("Error fetching user data")
    }
}

export async function getProfile(id: string) {
    const userRef = doc(db, 'users', id)
    const userDoc = await getDoc(userRef)
    return userDoc.data()
}

