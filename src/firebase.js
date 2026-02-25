import { initializeApp } from "firebase/app";
import { doc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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
