'use client';

import { useEffect, useState } from "react";
import axios from "axios";


export default function Home() {
  const [userId, setUserId] = useState("alden")

  const [numDevices, setNumDevices] = useState(0)
  const [totalWatts, setTotalWatts] = useState(0)
  const [budget, setBudget] = useState(0)
  const [threshold, setThreshold] = useState(0)
  const [schedule, setSchedule] = useState([])
  
  useEffect(() => {
    getUserData(userId)
  }, [userId])

  const getUserData = async (userId) => {
    try {
      const response = await axios.get("/api/userData", {
        params: { user: userId }
      })

      setNumDevices(response.data.data.devices)
    } catch (error) {
      console.error("Error getting user data: ", error);
      return {
        success: false,
        message: "Failed to get user data",
        status: 500
      };
    }
  }


  const createUserData = async (userId) => {
    try{
      const response = await axios.post("/api/createData", {
        userId: userId
      })
    } catch (error) {
      console.error("Error creating user data: ", error);
      return {
        success: false,
        message: "Failed to create user data",
        status: 500
      };
    }
  }
  
    const updateUserdata = async (userId, devices, totalWatts, budget, threshold, schedule) => {
      try {
        const response = await axios.post("/api/updateData", {
          userId,
          devices,
          totalWatts,
          budget,
          threshold,
          schedule
        })

      } catch (error) {
        console.error("Error updating user data: ", error);
        return {
          success: false,
          message: "Failed to update user data",
          status: 500
        };
      }
    }

    const addDevice = async () => {
      // Use the functional form to get the latest value
      setNumDevices((prevNumDevices) => {
        const newNumDevices = prevNumDevices + 1; // Increment the number of devices
  
        // Update user data with the incremented value
        updateUserdata(userId, newNumDevices, totalWatts, budget, threshold, schedule);
  
        return newNumDevices; // Return the new value to update the state
      });
    }

  return (
    <div>
      <button onClick={() => createUserData('Kyle')}>
        create profile
      </button>

      <div>
        <h4>Number of devices: {numDevices}</h4>
      </div>
      <button onClick={addDevice}>
        Add device
      </button>
    </div>
  );
}
