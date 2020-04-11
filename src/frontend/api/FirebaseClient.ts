import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

import configSecret from '@common/config/config-secret.json';

import AppState from '@frontend/state/AppState';
import { ITescoProduct } from '@frontend/interface/ITescoProduct';

firebase.initializeApp(configSecret.firebase);

const database = firebase.firestore();
const auth = firebase.auth();

export const FirebaseClient = {

    async login(username: string, password: string): Promise<any | Error> {
        try {
            const login = await auth.signInWithEmailAndPassword(
                    username,
                    password);

            AppState.setUser(login.user);

            return login.user;
        }
        catch (exception) {
            return new Error('Failed to log in.');
        }
    },

    async logout(): Promise<boolean> {
        try {
            await auth.signOut();

            AppState.setUser(null);

            return true;
        }
        catch (exception) {
            return false;
        }
    },

    async createUser(username: string, password: string) {
        try {
            const createUser = await auth.createUserWithEmailAndPassword(
                    username,
                    password);

            const userID = createUser.user?.uid;

            if (userID) {
                await database.collection('users').doc(userID).set({
                    username,
                    uncheckedList: {},
                    checkedList: {},
                });
            }

            return createUser.user;
        }
        catch (exception) {
            return new Error('Unable to create a new user.');
        }
    },

    formatProduct(product: ITescoProduct) {
        return {
            ...product,
            productData: {
                ...product.productData,
                ingredients: product.productData?.ingredients || null,
                nutritionalValue: product.productData?.nutritionalValue || null,
            },
        }
    },

    async saveShoppingList() {
        const user = AppState.getUser();

        if (user === null) {
            return;
        }

        const uncheckedList = AppState.getUncheckedShoppingList();
        const checkedList = AppState.getCheckedShoppingList();

        await database.collection('users').doc(user.uid).update({
            backupTimestamp: Date.now(),
            uncheckedList,
            checkedList,
        });
    },

    async loadUserData() {
        const user = AppState.getUser();

        if (user === null) {
            return null;
        }

        try {
            return await database.collection('users').doc(user.uid).get();
        }
        catch (exception) {
            return new Error('Unable to load user data');
        }
    },
}
