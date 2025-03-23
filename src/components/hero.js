import React from "react";
import HeroImage from "../assets/images/hero-img.png";

const hero = () => (
  <>
    <div class="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
      <div class="mr-auto place-self-center lg:col-span-7">
        <h1 class="xl:leading-tight max-w-2xl mb-4 text-4xl font-extrabold tracking-tight md:text-5xl xl:text-6xl text-gray-900">
          Alışverişin en güvenilir adresi,{" "}
          <span className="text-blue-600">Hyper Teknoloji</span>
        </h1>
        <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
          Hergün yenilenen markalarla ve en hesaplı fiyatlarla tüm ihtiyaçlarını
          tamamla.
        </p>
      </div>
      <div class="hidden w-full lg:mt-0 lg:col-span-5 lg:flex">
        <img src={HeroImage} className="object-contain" alt="hero" />
      </div>
    </div>
  </>
);

export default hero;
