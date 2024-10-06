'use client'

import styles from "./page.module.css";
import { useState } from "react";
import axios from "axios";


export default function Hub() {
  const [deviceStatus, setDeviceStatus] = useState("Off");
  const [message, setMessage] = useState("");

  const date = new Date().toLocaleString() // Set a valid timestamp;

	const toggleDevice = async () => {
    const newStatus = deviceStatus === "On" ? "Off" : "On";
    setDeviceStatus(newStatus);

    try {
      const response = await axios.post("/api/devices", {
        deviceStatus: newStatus,
        appliance: "lights", // change to dependent appliances
        timestamp: date
      })

      console.log(response.data.message);
			alert(response.data.message);

    } catch (error) {
      console.error("Error toggling power: ", error);
      return {
        success: false,
        message: "Failed to toggle power",
        status: 500
      };  
    }
  }

	return (
		<div className={styles.container}>

			<div className={styles.top}>

				<div className={styles.assistantsContainer}>
					<h1>Personal Assistants</h1>
					<div className={styles.assistants}>
						<div className={styles.box}>
							Amazon Alexa
						</div>


						<div className={styles.box}>
							Google
						</div>
					</div>
				</div>

				<div className={styles.groupsContainer}>
					<h1>Groups</h1>
					<div className={styles.groups}>
						<div className={styles.box}>
							Bedroom
						</div>

						<div className={styles.box}>
							Living Room
						</div>

						<div className={styles.box}>
							Kitchen
						</div>
					</div>
				</div>
			</div>

			<h1>Smart Devices</h1>
			<div className={styles.devices}>
				<div className={styles.box} onClick={toggleDevice}>
					Lights {deviceStatus}
				</div>

				<div className={styles.box}>
					Cameras
				</div>

				<div className={styles.box}>
					Thermostats
				</div>
			</div>

			<h1>Smart Plugs</h1>
			<div className={styles.smartPlugs}>
				<div className={styles.box}>
					T.V.
				</div>

				<div className={styles.box}>
					Fan
				</div>

				<div className={styles.box}>
					Coffee Maker
				</div>

			</div>
		</div>
	)
}
