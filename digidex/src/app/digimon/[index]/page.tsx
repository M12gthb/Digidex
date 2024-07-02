import React from "react";

function digimon({ params }: { params: { index: string } }) {
  return (
    <div className="min-h-[70vh]">
      <h1>Digimon</h1>
      <h2>{params.index}</h2>
    </div>
  );
}

export default digimon;
