import React, { useState, useEffect } from 'react';
import CharacterDetailsModal from './CharacterDetailsModal';
import axios from 'axios';
import './index.css';

const getSpeciesBackground = species => {
    switch (species) {
        case 'Human':
            return 'human-background';
        case 'Droid':
            return 'droid-background';
         case 'Wookiee':
            return 'wookiee-background';
         case 'Rodian':
            return 'rodian-background';
         case 'Hutt':
            return 'hutt-background';
         case 'Yoda\'s species':
            return 'yoda-background';
         case 'Trandoshan':
            return 'trandoshan-background';
         case 'Mon Calamari':
            return 'mon-calamari-background';
         case 'Ewok':
            return 'ewok-background';
        default:
            return 'default-background';
    }
};

const CharacterCard = ({ character, picture }) => {
    const {species: speciesArr} = character
    const [showModal, setShowModal] = useState(false);
    const [species, setSpecies] = useState(null);
    const [homeworld, setHomeworld] = useState(null);
    const backgroundClass = getSpeciesBackground(species)

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                const speciesResponses = await Promise.all(speciesArr.map(url => axios.get(url)));
                const speciesData = speciesResponses.map(response => response.data.name);
                setSpecies(speciesData[0]); 
            } catch (error) {
                console.error('Error fetching species:', error);
            }
        };

        fetchSpecies();
    }, [speciesArr]);

        useEffect(() => {
        const fetchHomeworld = async () => {
            try {
                const response = await axios.get(character.homeworld);
                setHomeworld(response.data);
            } catch (error) {
                console.error('Error fetching homeworld:', error);
            }
        };

        if (character.homeworld) {
            fetchHomeworld();
        }
    }, [character.homeworld]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <div>
            <div className={`character-card ${backgroundClass}`} onClick={toggleModal}>
                <img src={picture} alt={character.name} />
                <h3>{character.name}</h3>
            </div>
            {showModal && <CharacterDetailsModal character={character} onClose={toggleModal} homeworld={homeworld} />}
        </div>
    );
};

export default CharacterCard;

