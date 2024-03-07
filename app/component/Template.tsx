/* eslint-disable @next/next/no-sync-scripts */
"use client"
import 'bootstrap-select/dist/css/bootstrap-select.min.css'
import '../../public/tema/css/style.css'
import Menuadmin from './MenuAdmin';
import ScriptJs from './ScriptJs';
import Header from './Header';
import { useSession } from 'next-auth/react';

function Template({ children }: { children: React.ReactNode }) {
    const session = useSession()
    return (
        <div>
            <div id="preloader">
                <div className="dz-ripple">
                    <div />
                    <div />
                </div>
            </div>
            <div id="main-wrapper">
                <Header />
                {session?.data?.jenis === 'Admin' ? <Menuadmin /> :null}
                <div className="outer-body">
                    <div className="inner-body">
                        <div className="content-body">
                            <div className="container-fluid">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScriptJs />
        </div>
    )
}

export default Template