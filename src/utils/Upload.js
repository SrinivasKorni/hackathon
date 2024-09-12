import React, { useState } from "react";

const Upload = () => {
  return (
    <div>
      <input type="file" id="file" name="file" accept=".ipynb" />
    </div>
  );
};

export default Upload;
