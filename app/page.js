'use client';

import axios from "axios";

const createUserData = async (userId) => {
  const response = await axios.post("/api/createData", {
    userId: userId
  })

}

export default function Home() {
  return (
    <div>
      <button onClick={() => createUserData('jhoon')}>
        create profile
      </button>
    </div>
  );
}
