import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from './CharacterCard';
import './styles.css';

const CharacterList = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isNext, setIsNext] = useState(true);
    const [isPrevious, setIsPrevious] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://swapi.py4e.com/api/people/?page=${currentPage}`);
                
                setIsNext(!response.data.next);
                setIsPrevious(!response.data.previous);
                setCharacters(response.data.results);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [currentPage]);

    const nextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Something went wrong</h1>;

    return (
        <div>
            <div className="character-list">
                {characters.map((character, index) => (
                    <CharacterCard key={character.url} character={character} picture={`https://picsum.photos/seed/${index}/200`} />
                ))}
            </div>

            <button onClick={prevPage} className='button' disabled={isPrevious}>Previous Page</button>
            <button onClick={nextPage} className='button' disabled={isNext}>Next Page</button>
        </div>
    );
};

export default CharacterList;
