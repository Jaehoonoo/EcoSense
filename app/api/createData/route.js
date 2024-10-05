import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

export async function POST(request) {

    try {
      // create a userData entry in the backend if it doesn't already exist
      const eventData = await request.json();
      const userId = eventData.userId;
      const userRef = doc(db, "users", userId);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {

        const initialData = {
          devices: 0,
          totalWatts: 0,
          budget: 0,
          threshold: 0,
          schedule: [], 
        };

        await setDoc(userRef, initialData);
        console.log("User data created successfully!");
      }
      else {
        console.log('user data already exists')
      }
      
      return new Response(JSON.stringify({ success: true, message: "Successfully created user data" }), { status: 200 });

    } catch (error) {
      console.error("Error creating user data: ", error);
      return new Response(JSON.stringify({ success: false, message: "Failed to create user data" }), { status: 500 });
    }
}