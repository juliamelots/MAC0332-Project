import { useState } from 'react';

interface props {
    plot: string,
    cast: string,
    genre: string
};

const MovieInfoContent = ({ plot, cast, genre }: props) => {
    const [activeTab, setActiveTab] = useState('tabPlot');
    const actors = cast.split(",");
    return (
        <div>
            <ul className="nav nav-tabs">
                <li className="nav-item" key={1}>
                    <span 
                      role="button"
                      className={`cursor-pointer nav-link ${activeTab === 'tabPlot' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tabPlot')}
                    >
                      Sinopse
                    </span>
                </li>
                <li className="nav-item" key={2}>
                    <span 
                      role="button"
                      className={`nav-link ${activeTab === 'tabCast' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tabCast')}
                    >
                      Elenco
                    </span>
                </li>
                <li className="nav-item" key={3}>
                    <span 
                      role="button"
                      className={`nav-link ${activeTab === 'tabGenre' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tabGenre')}
                    >
                      Gênero
                    </span>
                </li>
          </ul>

          <div className="tab-content mt-3">
              {activeTab === 'tabPlot' && <div className="text-ac-white">{plot}</div>}
              {activeTab === 'tabCast' && 
                  <div className="text-ac-white d-flex flex-wrap">
                      { actors.map((actor, index) => (
                          <p key={index} className="movie-card-cast">{actor}</p>
                      )) }
                  </div>
              }
              {activeTab === 'tabGenre' && <div className="text-ac-white">{genre}</div>}
          </div>
    </div>
  )
}

export default MovieInfoContent