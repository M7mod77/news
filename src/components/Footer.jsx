import { Link } from 'react-router-dom'
import { NAV_LINKS } from './Navbar.jsx'
import logo from '../assets/techifly-logo.png'
import { NEWS_SOURCE_NOTE, SITE_NAME, SITE_TAGLINE } from '../data/site.js'

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="site-footer__top">
                    <div className="brand">
                        <img className="brand__logo" src={logo} alt={SITE_NAME} width="44" height="44" />
                        <span>
                            <span className="brand__name">{SITE_NAME}</span>
                            <span className="brand__tagline">{SITE_TAGLINE}</span>
                        </span>
                    </div>

                    <nav className="footer-nav" aria-label="روابط الموقع">
                        {NAV_LINKS.map((link) => (
                            <Link key={link.key} to={link.to}>
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="site-footer__bottom">
                    <p>© {new Date().getFullYear()} {SITE_NAME}. جميع الحقوق محفوظة.</p>
                    <p>{NEWS_SOURCE_NOTE}</p>
                </div>
            </div>
        </footer>
    )
}
