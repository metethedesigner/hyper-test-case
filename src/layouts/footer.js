import React from "react";

const footer = () => (
  <div className="border-t-2 border-gray-400 flex flex-col md:flex-row md:justify-beetween text-center justify-between py-5 text-sm">
    <div className="mb-4">
      <a href="/" className="mx-2.5">
        Hakkında
      </a>
      <a href="/" className="mx-2.5">
        Gizlilik Sözleşmesi
      </a>
    </div>
    <p>
      2025 - <span className="font-bold">Hyper Teknoloji</span> React Project, Tüm
      Hakları Saklıdır.
    </p>
  </div>
);

export default footer;
