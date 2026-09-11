import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import logo from '../assets/techifly-logo.png'
import { formatLongDate } from '../utils/formatDate.js'
import { SITE_NAME, SITE_TAGLINE } from '../data/site.js'

const MOBILE_NAV_BREAKPOINT = 900

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const closeMenu = () => setIsMenuOpen(false)

    useEffect(() => {
        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeMenu()
        }
        const onResize = () => {
            if (window.innerWidth > MOBILE_NAV_BREAKPOINT) closeMenu()
        }

        document.addEventListener('keydown', onKeyDown)
        window.addEventListener('resize', onResize)
        return () => {
            document.removeEventListener('keydown', onKeyDown)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    return (
        <header className="site-header">
            <div className="container header-top">
                <Link className="brand" to="/" onClick={closeMenu}>
                    <img className="brand__logo" src={logo} alt={SITE_NAME} width="44" height="44" />
                    <span>
                        <span className="brand__name">{SITE_NAME}</span>
                        <span className="brand__tagline">{SITE_TAGLINE}</span>
                    </span>
                </Link>

                <p className="header-date">{formatLongDate(new Date())}</p>

                <button
                    type="button"
                    className="nav-toggle"
                    aria-expanded={isMenuOpen}
                    aria-controls="main-nav"
                    onClick={() => setIsMenuOpen((open) => !open)}
                >
                    <span className="nav-toggle__bars" />
                    القائمة
                </button>
            </div>

            <Navbar isOpen={isMenuOpen} onNavigate={closeMenu} />
        </header>
    )
}
