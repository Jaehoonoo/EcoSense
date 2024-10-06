'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image';
import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';
import styles from '@/app/page.module.css';


export default function Home() {
  const { isSignedIn, userId } = useAuth();
  const router = useRouter();

  const [numDevices, setNumDevices] = useState(0);
  const [totalWatts, setTotalWatts] = useState(0);
  const [budget, setBudget] = useState(0);
  const [threshold, setThreshold] = useState(0);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    if (isSignedIn) {
      getUserData(userId);
    }
  }, [isSignedIn, userId])

  const getUserData = async (userId) => {
    try{
      const response = await axios.get("/api/userData", {
        params: { user: userId }
      })

      if (!response.data.exists) {
        createUserData(userId); // Call create only if user data doesn't exist
      }

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

  const handleGetStarted = async () => {
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div>
      {/*Header Section*/}
      <header className={styles.header}>
        <nav className={styles.nav}>
        <div className={styles.logo}>
            <Image width={50} height={50} src="/logo.png" alt="EcoSense Logo" className={styles.logoImage} />
            <a href="#" className={styles.logoText}>EcoSense</a>
          </div>

          <SignedOut>
            <div className={styles.authButtons}>
              <a href="/sign-in" className={styles.loginButton}>Login</a>
              <a href="/sign-up" className={styles.registerButton}>Register</a>
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton appearance={
                  {
                    elements: {
                      userButtonAvatarBox: {
                        width: 45,
                        height: 45,
                      },
                    }
                  }
                }/>
          </SignedIn>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Welcome to EcoSense</h1>
          <p>Discover the best cost-efficient solutions for your home</p>
          <button onClick={handleGetStarted} className={styles.ctaButton}>Get Started!</button>
        </div>
      </section>

      <button onClick={() => createUserData(userId)}>
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
};
