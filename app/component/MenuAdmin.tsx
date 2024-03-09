import Link from "next/link";
import Buttonlogout from "./Buttonlogout";

export default function MenuAdmin() {

    return (
        <div className="deznav">
            <div className="deznav-scroll">
                <ul className="metismenu" id="menu">
                    <li className="menu-title">System</li>
                    <li>
                        <Link href="/" className="" aria-expanded="false">
                            <div className="menu-icon">
                                <svg width={25} height={24} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"  >
                                    <path d="M3.29077 9L12.2908 2L21.2908 9V20C21.2908 20.5304 21.0801 21.0391 20.705 21.4142C20.3299 21.7893 19.8212 22 19.2908 22H5.29077C4.76034 22 4.25163 21.7893 3.87656 21.4142C3.50149 21.0391 3.29077 20.5304 3.29077 20V9Z" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.29077 22V12H15.2908V22" stroke="#252525" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="nav-text">Dashboard</span>
                        </Link>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    width={25} height={24}
                                >
                                    <path d="M21 5 A9 3 0 0 1 12 8 A9 3 0 0 1 3 5 A9 3 0 0 1 21 5 z" />
                                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                                </svg>

                            </div>
                            <span className="nav-text">Master Data</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">Master Data</li>
                            <li>
                                <Link href="/admin/karyawan">Data Karyawan</Link>
                            </li>
                            <li>
                                <Link href="/admin/mobil">Data Mobil</Link>
                            </li>
                            <li>
                                <Link href="/admin/sesi">Data Sesi</Link>
                            </li>
                            <li>
                                <Link href="/admin/rute">Data Rute</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    fill="none"
                                    viewBox="0 0 16 16"
                                    width={25} height={24}

                                >
                                    <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 01-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 01.872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 012.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 012.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 01.872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 01-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 01-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 110-5.86 2.929 2.929 0 010 5.858z" />
                                </svg>

                            </div>
                            <span className="nav-text">Setup</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">Setup</li>
                            <li>
                                <Link href="/master/profil">Setting Akun</Link>
                            </li>
                            <li>
                                <Link href="/admin/jadwal">Jadwal Berangkat</Link>
                            </li>

                        </ul>
                    </li>

                    <li>
                        <a href="#master" className="has-arrow " aria-expanded="false">
                            <div className="menu-icon">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    width={25} height={24}
                                >
                                    <path d="M20 8l-6-6H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM9 19H7v-9h2v9zm4 0h-2v-6h2v6zm4 0h-2v-3h2v3zM14 9h-1V4l5 5h-4z" />
                                </svg>
                            </div>
                            <span className="nav-text">Laporan</span>
                        </a>
                        <ul aria-expanded="false" id="master">
                            <li className="mini-dashboard">Laporan</li>
                            <li>
                                <Link href="/admin/jadwal">Pemesanan Tiket</Link>
                            </li>
                        </ul>
                    </li>

                </ul>
                <div className="switch-btn">
                    <Link href="">
                        <svg
                            width={24}
                            height={24}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M18.36 6.63965C19.6184 7.89844 20.4753 9.50209 20.8223 11.2478C21.1693 12.9936 20.9909 14.803 20.3096 16.4474C19.6284 18.0918 18.4748 19.4972 16.9948 20.486C15.5148 21.4748 13.7749 22.0026 11.995 22.0026C10.2151 22.0026 8.47515 21.4748 6.99517 20.486C5.51519 19.4972 4.36164 18.0918 3.68036 16.4474C2.99909 14.803 2.82069 12.9936 3.16772 11.2478C3.51475 9.50209 4.37162 7.89844 5.63 6.63965"
                                stroke="#252525"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M12 2V12"
                                stroke="#252525"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span><Buttonlogout /></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
