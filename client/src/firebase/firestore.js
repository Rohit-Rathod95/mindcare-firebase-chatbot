import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { app } from "./firebaseConfig";

export const db = getFirestore(app);

// Save a message
export const sendMessage = async (userId, sender, text) => {
  const messagesRef = collection(db, "chats", userId, "messages");

  await addDoc(messagesRef, {
    sender,
    text,
    createdAt: serverTimestamp(),
  });
};

// Listen to messages in real-time
export const listenToMessages = (userId, callback) => {
  const messagesRef = collection(db, "chats", userId, "messages");
  const q = query(messagesRef, orderBy("createdAt"));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(messages);
  });
};
