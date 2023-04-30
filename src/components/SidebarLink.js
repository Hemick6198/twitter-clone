import React from "react";

function SidebarLink({ Icon, text, active }) {
  return (
      <div className={`side-bar-link__icon ${active && "font-bold"}`}>
    <Icon className=" h-7" />
    <span className="hidden xl:inline">{text}</span>
  </div>
  )
}

export default SidebarLink;
