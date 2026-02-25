import { initializeApp } from "firebase/app";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const fallbackFirebaseConfig = {
  apiKey: "AIzaSyCyq6ZCEVH9TElFNzWhM31LOL7fjyh4ivM",
  authDomain: "totsandtrim-488500.firebaseapp.com",
  projectId: "totsandtrim-488500",
  storageBucket: "totsandtrim-488500.firebasestorage.app",
  messagingSenderId: "417889637967",
  appId: "1:417889637967:web:a434b4ca545f55413e7c3a",
};

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || fallbackFirebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || fallbackFirebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || fallbackFirebaseConfig.projectId,
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || fallbackFirebaseConfig.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ||
    fallbackFirebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || fallbackFirebaseConfig.appId,
};

const requiredConfigKeys = ["apiKey", "authDomain", "projectId", "appId"];
const missingRequiredConfig = requiredConfigKeys.filter((key) => !firebaseConfig[key]);

if (missingRequiredConfig.length > 0) {
  throw new Error(
    `Firebase config missing required keys: ${missingRequiredConfig.join(", ")}`
  );
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function saveSubscriber(email) {
  const normalizedEmail = email.trim().toLowerCase();
  const subscriberId = encodeURIComponent(normalizedEmail);
  const subscriberRef = doc(db, "subscribers", subscriberId);

  return setDoc(subscriberRef, {
    email: normalizedEmail,
    createdAt: serverTimestamp(),
    source: "website",
    status: "active",
  });
}

export async function saveWhatsappLead(phone) {
  const normalizedPhone = phone.replace(/[^\d+]/g, "");
  const leadId = encodeURIComponent(normalizedPhone);
  const leadRef = doc(db, "whatsapp_waitlist", leadId);

  return setDoc(leadRef, {
    phone: normalizedPhone,
    createdAt: serverTimestamp(),
    source: "website",
    status: "active",
  });
}
