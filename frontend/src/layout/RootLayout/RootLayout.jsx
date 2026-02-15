import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Outlet } from 'react-router';

const RootLayout = () => {
    return (
        <>
            <nav> 
                <Navbar></Navbar>
            </nav>
            <section className="max-w-7xl mx-auto px-4 py-8"> 
                <Outlet></Outlet>
            </section>
            <footer>
                {/* Footer component goes here */}
            </footer>
        </>
    );
};

export default RootLayout;