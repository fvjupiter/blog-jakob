import React from 'react'

export default function PaddingWrapper({ classN, children }) {
  return <div className={`${classN} px-2`}>{children}</div>
}
