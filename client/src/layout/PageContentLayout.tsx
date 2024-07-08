import React from "react";

const PageContentLayout = ({ children, maxWidth }:any) => {
  return (
    <div className="flex justify-center p-4">
      <div className={`w-full max-w-${maxWidth || "860px"} flex`}>
        <div className="w-full md:w-2/3 mr-6">{children[0]}</div>
        <div className="hidden md:block w-1/3">{children[1]}</div>
      </div>
    </div>
  );
};

export default PageContentLayout;
