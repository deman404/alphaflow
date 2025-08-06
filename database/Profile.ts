import { Profile } from "../types/type";
import { db } from "../src/utils/firebase";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const setProfile = async (data: Profile) => {
  try {
    const userRef = doc(db, "profiles", data.email);
    await setDoc(userRef, data);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const getProfile = async (email: string) => {
  try {
    const userRef = doc(db, "profiles", email);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      return { profile: docSnap.data() as Profile, error: null };
    } else {
      return { profile: null, error: "Profile not found" };
    }
  } catch (error: any) {
    return { profile: null, error: error.message };
  }
};

export const insertProfile = async (data: Profile) => {
  try {
    // First check if profile exists
    const existingProfile = await getProfile(data.email);
    if (existingProfile.profile) {
      return { success: false, error: "Profile already exists" };
    }

    const userRef = doc(db, "profiles", data.email);
    await setDoc(userRef, data);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

export const upsertProfile = async (data: Profile) => {
  try {
    const userRef = doc(db, "profiles", data.email);
    await setDoc(userRef, data, { merge: true }); // merge: true performs upsert
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
