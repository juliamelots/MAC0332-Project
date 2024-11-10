import { useState } from 'react';

interface props {
    plot: string,
    cast: string,
    genre: string
};

const MovieInfoContent = ({ plot, cast, genre }: props) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const actors = cast.split(",");
    return (
        <div>
            <ul className="nav nav-tabs">
            <li className="nav-item">
              <span 
                role="button"
                className={`cursor-pointer nav-link ${activeTab === 'tab1' ? 'active' : ''}`}
                onClick={() => setActiveTab('tab1')}
              >
                Sinopse
              </span>
            </li>
            <li className="nav-item">
              <span 
                role="button"
                className={`nav-link ${activeTab === 'tab2' ? 'active' : ''}`}
                onClick={() => setActiveTab('tab2')}
              >
                Elenco
              </span>
            </li>
            <li className="nav-item">
              <span 
                role="button"
                className={`nav-link ${activeTab === 'tab3' ? 'active' : ''}`}
                onClick={() => setActiveTab('tab3')}
              >
                Gênero
              </span>
            </li>
          </ul>

        <div className="tab-content mt-3">
            {activeTab === 'tab1' && <div className="text-ac-white">{plot}</div>}
            {activeTab === 'tab2' && 
                <div className="text-ac-white d-flex flex-wrap">
                    { actors.map((actor) => (
                        <p className="movie-card-cast">{actor}</p>
                    )) }
                </div>
            }
            {activeTab === 'tab3' && <div className="text-ac-white">{genre}</div>}
        </div>
    </div>
  )
}

export default MovieInfoContent