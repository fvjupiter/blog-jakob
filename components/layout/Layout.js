import React, { useState } from 'react'
import MetaHead from '../MetaHead'
import SideBar from './SideBar'

export default function Layout({ isDark, screen, info, children }) {

    return <div className={`${isDark && 'dark'}`}>
        <MetaHead />
        <SideBar screen={screen} info={info}>
            {children}
        </SideBar>
    </div>
}
