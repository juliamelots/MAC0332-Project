import { useState } from 'react';

interface props {
    plot: string,
    directors: string,
    genre: string
};

const MovieInfoContent = ({ plot, directors, genre }: props) => {
    const [activeTab, setActiveTab] = useState('tabPlot');
    const director = directors.split(",");
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
                <li className="nav-item" key={3}>
                    <span 
                      role="button"
                      className={`nav-link ${activeTab === 'tabGenre' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tabGenre')}
                    >
                      Gênero
                    </span>
                </li>
                <li className="nav-item" key={2}>
                    <span 
                      role="button"
                      className={`nav-link ${activeTab === 'tabDirector' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tabDirector')}
                    >
                      Direção
                    </span>
                </li>
            </ul>

            <div className="tab-content mt-3">
                {activeTab === 'tabPlot' && <div className="text-ac-white">{plot}</div>}
                {activeTab === 'tabGenre' && <div className="text-ac-white">{genre}</div>}
                {activeTab === 'tabDirector' && 
                    <div className="text-ac-white d-flex flex-wrap">
                        { director.map((dir, index) => (
                            <p key={index} className="movie-card-director">{dir}</p>
                        )) }
                    </div>
                }
            </div>
        </div>
    )
};

export default MovieInfoContent;