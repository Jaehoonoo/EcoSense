"use client"; // Marking this component as a Client Component

import { useState } from 'react';

export default function Bills() {
    const [devices, setDevices] = useState([{ power: '', hours: '' }]);
    const [rate, setRate] = useState('');
    const [totalCost, setTotalCost] = useState(0);

    const handleDeviceChange = (index, event) => {
        const newDevices = [...devices];
        newDevices[index][event.target.name] = event.target.value;
        setDevices(newDevices);
    };

    const addDevice = () => {
        setDevices([...devices, { power: '', hours: '' }]);
    };

    const calculateCost = () => {
        let totalEnergy = 0;
        devices.forEach(device => {
            const powerInKw = parseFloat(device.power) / 1000; // Convert W to kW
            const hours = parseFloat(device.hours);
            if (!isNaN(powerInKw) && !isNaN(hours)) {
                totalEnergy += powerInKw * hours; // Energy in kWh
            }
        });
        const cost = totalEnergy * parseFloat(rate);
        const monthlyCost = cost * 30; // Assuming 30 days in a month
        setTotalCost(monthlyCost);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Calculate Monthly Energy Bills</h1>
            {devices.map((device, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <input
                        type="number"
                        name="power"
                        placeholder="Power (W)"
                        value={device.power}
                        onChange={event => handleDeviceChange(index, event)}
                        style={{ marginRight: '10px' }}
                    />
                    <input
                        type="number"
                        name="hours"
                        placeholder="Hours Used Per Day"
                        value={device.hours}
                        onChange={event => handleDeviceChange(index, event)}
                        min="0"
                        max="24"
                        style={{ marginRight: '10px' }}
                    />
                </div>
            ))}
            <button onClick={addDevice} style={{ marginBottom: '20px' }}>
                Add Device
            </button>
            <br />
            <input
                type="number"
                placeholder="Rate ($/kWh)"
                value={rate}
                onChange={event => setRate(event.target.value)}
                style={{ marginBottom: '10px' }}
            />
            <br />
            <button onClick={calculateCost} style={{ marginBottom: '20px' }}>
                Calculate Cost
            </button>
            <h2>Total Monthly Cost: ${totalCost.toFixed(2)}</h2>
        </div>
    );
}
