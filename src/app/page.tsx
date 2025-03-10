import Image from "next/image";
import Header from "@/components/header";
import { fetchWeatherApi } from 'openmeteo';
import React from 'react';
import WeatherPage from '@/components/weatherapi';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import CallToAction from "@/components/calltoaction";


export default function Home() {
  return (
    <div className="grid">
      <Header />
      <CallToAction/>
      <WeatherPage />
    </div>
  );
}
