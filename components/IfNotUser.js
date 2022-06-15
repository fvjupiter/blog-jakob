import React from 'react'

export default function IfUser({ children }) {
    const user = true
  return <>{!user && children}</>
}
