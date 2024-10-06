import styles from "../ui/dashboard/dashboard.module.css"
import Card from "../ui/dashboard/card/card";
import React from 'react';
import { Line } from 'react-chartjs-2';



export default function Dashboard(){

    

    return(

        
    <div className={styles.wrapper}>
        <div className={styles.main}>
            {/* First Card: Large Money Value */}
            <div className={styles.cards}>
                    <h1>$0.14</h1>
                    <p>Estimated $/kWh</p>
                </div>

                {/* Second Card: Smaller Money Value */}
                <div className={styles.cards}>
                    <h1>$129</h1>
                    <p>Money Saved</p>
                </div>

                {/* Third Card: Temperature */}
                <div className={styles.cards}>
                    <h1>77°F</h1>
                    <p>Indoor Thermostat</p>
                </div>

            
                
        </div>

    </div>

    
    )
}