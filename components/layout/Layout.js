import React, { useState } from 'react'
import MetaHead from '../MetaHead'
import SideBar from './SideBar'

export default function Layout({ isDark, toggleMode, screen, info, children }) {

    return <div className={`${isDark && 'dark'}`}>
        <div className={`bg-gradient-to-r bg-white dark:from-stone-900 dark:via-stone-500 dark:to-stone-900
            `}>
        <MetaHead />
        <SideBar screen={screen} info={info} isDark={isDark} toggleMode={toggleMode}>
            {children}
        </SideBar>
        </div>
    </div>
}
