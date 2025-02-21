import admin from 'firebase-admin'
import { readFileSync } from 'fs'
import path from 'path'

const serviceAccountPath = path.resolve(process.cwd(), './lib/firebase/app-notes-d9585-firebase-adminsdk-fbsvc-19a6cf9959.json')
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf-8'))

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    })
}

export const db = admin.firestore()
export const auth = admin.auth()
