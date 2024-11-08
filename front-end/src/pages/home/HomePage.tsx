import SearchBar from "@/components/layout/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";

function HomePage() {

  let navigate = useNavigate(); 
  const routeChange = () => { 
    let path = "/movies"; 
    navigate(path);
  }

  return (
    <div className="d-flex flex-column vh-100 vw-100">
      {/* Top Section */}
      <div 
        className="bg-red text-white text-center d-flex flex-column justify-content-center py-5 flex-grow-1"
      >
        <h1 className="display-1 fw-bold mb-2">absolute<span className="fw-light">cinema</span></h1>
        <p className="fs-5 opacity-75">Descubra filmes em cartaz perto de você.</p>
        <button 
          className="btn btn-dark mt-3 mx-auto px-4 py-2" 
          style={{ maxWidth: '250px', width: '100%' }}
          onClick={routeChange}
        >
          <i className="bi bi-film me-2"></i>
          Veja todos os filmes
        </button>
      </div>

      {/* Bottom Section */}
      <div 
        className="bg-black text-white text-center py-4 flex-grow-1"
      >
        <h2 className="fs-3 py-4">Busca por filmes</h2>
        <div className="d-flex mx-auto" style={{ maxWidth: '600px' }}>
          <SearchBar placeholder="Procure filmes por título..."/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
