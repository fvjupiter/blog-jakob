import React from 'react'

export default function Page({ children }) {
  //add pl-sidebarWidth add pt-topBarWidth if fixed bars
  return <>
    <div className={`min-h-screen w-screen`}>
      {children}
    </div>
  </>
}
