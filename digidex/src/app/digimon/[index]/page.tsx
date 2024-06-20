import React from "react";

function digimon({ params }: { params: { index: string } }) {
  return (
    <div>
      <h1>Digimon</h1>
      <h2>{params.index}</h2>
    </div>
  );
}

export default digimon;
