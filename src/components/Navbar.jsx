import { NavLink } from 'react-router-dom'
import { CATEGORIES } from '../data/categories.js'

/** Every link points at a route that exists. */
export const NAV_LINKS = [
    { key: 'home', label: 'الرئيسية', to: '/', end: true },
    { key: 'latest', label: 'أحدث الأخبار', to: '/latest' },
    ...CATEGORIES.map((category) => ({
        key: category.slug,
        label: category.label,
        to: `/category/${category.slug}`
    }))
]

const linkClassName = ({ isActive }) => `main-nav__link${isActive ? ' is-active' : ''}`

/**
 * Main navigation. On small screens the same list becomes the dropdown panel,
 * driven by the `isOpen` flag the header owns.
 */
export default function Navbar({ isOpen, onNavigate }) {
    return (
        <nav
            className={`main-nav${isOpen ? ' is-open' : ''}`}
            id="main-nav"
            aria-label="أقسام الموقع"
        >
            <ul className="main-nav__list container">
                {NAV_LINKS.map((link) => (
                    <li key={link.key}>
                        <NavLink to={link.to} end={link.end} className={linkClassName} onClick={onNavigate}>
                            {link.label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
