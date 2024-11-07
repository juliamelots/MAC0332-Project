import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-red p-4">
        <div className="container-fluid">
            <Link className="navbar-brand" id="navbar-logo" to="/"><b>absolute</b>cinema</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i className="bi bi-list navbar-item"></i>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <Link
                        className="nav-item d-flex align-items-center mx-2 text-decoration-none"
                        to="/"
                    >
                        <span className="btn navbar-item btn-light nav-link px-2 text-center d-flex align-items-center">
                            <i className="bi bi-house me-2"></i>
                            Início
                        </span>
                    </Link>
                    <Link
                        className="nav-item d-flex align-items-center mx-2 text-decoration-none"
                        to="/movies"
                    >
                        <span className="btn navbar-item btn-light nav-link px-2 text-center d-flex align-items-center">
                            <i className="bi bi-film me-2"></i>
                            Filmes
                        </span>
                    </Link>
                </ul>
            </div>            
        </div>
    </nav>
  )
}

export default Navbar;