"use client";
import React, { useState } from "react";
import IconComponent from "./IconComponent";

const DrawerButtonCategory = ({ title, type, uid, children }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <IconComponent title={title} type={type} />

        {title}
      </div>
    </>
  );
};

export default DrawerButtonCategory;
