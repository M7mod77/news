import { Link } from 'react-router-dom'

/** Section heading with an optional link to the full listing. */
export default function SectionHead({ title, headingId, to, linkLabel }) {
    return (
        <div className="section__head">
            <h2 className="section__title" id={headingId}>
                {title}
            </h2>
            {to && linkLabel && (
                <Link className="section__link" to={to}>
                    {linkLabel} ←
                </Link>
            )}
        </div>
    )
}
