import Link from 'next/link';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    setLoggedInUser((sessionStorage.getItem("loggedInUser")));
  }, []);

  const handleClick = () => {
    sessionStorage.removeItem("loggedInUser");
  };
    return (
        <header
            className="p-3 mb-4 border-bottom"
            style={{ background: 'linear-gradient(135deg, #2e2e2e, #3f3f3f)' }}
        >
            <div className="container d-flex align-items-center justify-content-between">
                <a
                    href="/"
                    className="fs-1 fw-bold text-white text-decoration-none"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        letterSpacing: '2px',
                        textShadow: '0px 2px 5px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Soccer App
                </a>
                <nav className="nav">
                    <Link
                        href="/"
                        className="nav-link px-3 fs-5 text-white"
                        style={{ transition: 'color 0.3s' }}
                    >
                        Home
                    </Link>
                    <Link
                        href="/competition"
                        className="nav-link px-3 fs-5 text-white"
                        style={{ transition: 'color 0.3s' }}
                    >
                        Competitions
                    </Link>
                    <Link
          href="/login"
          className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
        >
          Login
        </Link>
        {loggedInUser && (
        <>
          <a
            href="/login"
            className="px-4 text-white text-xl hover:bg-gray-600 rounded-lg"
            onClick={handleClick}
          >
            Logout
          </a>
          <div className="text-white ms-5 mt-2 md:mt-0 pt-1 md:pt-0 grow">
            Welcome, {loggedInUser}
          </div>
        </>
      )}
                </nav>
            </div>

            <style jsx>{`
                .nav-link:hover {
                    color: #d3d3d3;
                    text-decoration: underline;
                }
            `}</style>
        </header>
    );
};

export default Header;
