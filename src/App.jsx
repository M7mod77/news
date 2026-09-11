import { Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HomePage from './pages/HomePage.jsx'
import LatestNewsPage from './pages/LatestNewsPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
    return (
        <>
            <Header />
            <main className="main-content">
                <div className="container">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/latest" element={<LatestNewsPage />} />
                        <Route path="/category/:slug" element={<CategoryPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </main>
            <Footer />
        </>
    )
}
