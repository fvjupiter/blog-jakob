import React from 'react'
import MetaHead from '../MetaHead'
import Footer from './Footer'
import Page from './Page'
import SideBar from './SideBar'
import TopBar from './TopBar'

export default function Layout({ children }) {

    const navItems = [
        {
            title: 'Home', //paste ReactIcon if wanted
            href: '/'
        },
        {
            title: 'About', //paste ReactIcon if wanted
            href: '/about'
        }
    ]

    return <div>
        <MetaHead />
        <SideBar navItems={navItems} isActive={true} setisActive={() => {}}/>
        <TopBar navItems={navItems} />
        <Page>
            {children}
        </Page>
        <Footer/>
    </div>
}
