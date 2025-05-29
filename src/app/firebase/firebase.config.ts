import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAqIsEKuw5LY21ju8Z5-u4WkIB5oBd5_Cc",
    authDomain: "angular-tasks-74b98.firebaseapp.com",
    projectId: "angular-tasks-74b98",
    storageBucket: "angular-tasks-74b98.firebasestorage.app",
    messagingSenderId: "425015199641",
    appId: "1:425015199641:web:68e993df544061c596b508"
};

export const firebaseProviders = [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
];