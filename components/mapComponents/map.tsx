"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import { Hackathons } from "@prisma/client";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

const MapComponent = () => {
  const [position, setPosition] = useState([51.505, -0.09]);
  const [hackathons, setHackathons] = useState<Hackathons[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false); // Force re-render

  async function fetchHackathons() {
    try {
      const response = await axios.get("/api/hackathons");
      if (response.status === 200) {
        setHackathons(response.data.results.hackathons);
      }
    } catch (error) {
      console.error("Error fetching hackathons:", error);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.log("Geolocation error:", err)
      );
    }
    fetchHackathons();
    setTimeout(() => setMapLoaded(true), 500); // Delay to ensure Leaflet initializes
  }, []);

  const customIcon = L.icon({
    iconUrl: "/location-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -20],
  });

  const hackathonIcon = L.icon({
    iconUrl: "/hack-pin.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -20],
  });

  return (
    <div className="flex justify-center p-3 w-full min-h-[60vh]">
      {mapLoaded && (
        <MapContainer
          className="rounded-lg border-4 border-purple-800 shadow-lg"
          key={position.toString()} // Forces re-render
          center={position}
          zoom={13}
          style={{ height: "60vh", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={customIcon}>
            <Popup>Your current location</Popup>
          </Marker>

          {hackathons.length > 0 &&
            hackathons.map((hackathon: Hackathons, index) => (
              <Marker key={index} position={[hackathon.lat, hackathon.long]} icon={hackathonIcon}>
                <Popup>
                  <strong>{hackathon.hackathon_name}</strong>
                </Popup>
              </Marker>
            ))}
        </MapContainer>
      )}
    </div>
  );
};

export default MapComponent;
