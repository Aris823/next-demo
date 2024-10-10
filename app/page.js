import * as React from "react";
import Box from "@mui/material/Box";
import Navbar from "./components/Navbar"; 

export default function BoxBasic() {
  return (
    <div>
    <Navbar />
    <main className="p-8 bg-gray-100 min-h-screen pt-20">
      <Box component="section" className="text-black border border-gray-800 m-5 text-center">
        <h1 className="font-bold">Car Management v.20</h1>
        <ul>
          <li><a href="/brand">Brand</a></li>
          <li><a href="/model">Model</a></li>
        </ul>
      </Box>
    </main>
    </div>
  );
}
