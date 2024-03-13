import React from 'react';
import './index.css';

const CharacterDetailsModal = ({ character, onClose, homeworld }) => {
    const date = new Date(character.created);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return (
        <div >
            <div className="backdrop" onClick={onClose} />
            <div className="character-details-modal">
                <h2>{character.name}</h2>
                <p>Height: {character.height} meters</p>
                <p>Mass: {character.mass} kg</p>
                <p>Created: {formattedDate}</p>
                <p>Number of films: {character.films.length}</p>
                <p>Birth year: {character.birth_year}</p>

                <h2>{homeworld.name}</h2>
                <p>Terrain: {homeworld.terrain}</p>
                <p>Climate: {homeworld.climate}</p>
                <p>Amount of residents: {homeworld.population}</p>
            </div>
        </div>
    );
};

export default CharacterDetailsModal;
