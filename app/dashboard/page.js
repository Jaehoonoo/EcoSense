import styles from "../ui/dashboard/dashboard.module.css"
import Card from "../ui/dashboard/card/card";
import React from 'react';
import { Line } from 'react-chartjs-2';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default function Dashboard(){

    return(

        
    <div className={styles.wrapper}>
        <div className={styles.main}>
            {/* First Card: Large Money Value */}
            <div className={styles.cards}>
                    <h1>$1000</h1>
                    <p>Estimated $/kwh</p>
                </div>

                {/* Second Card: Smaller Money Value */}
                <div className={styles.cards}>
                    <h1>$200</h1>
                    <p>Money Saved</p>
                </div>

                {/* Third Card: Temperature */}
                <div className={styles.cards}>
                    <h1>77°F</h1>
                    <p>Current Temperature</p>
                </div>

            
                
        </div>
      <div className={styles.imageSection}>
                <img
                    src="/assets/graph.jpg"
                    
                    className={styles.graphImage}
                />
            </div>

    </div>

    
    )
}