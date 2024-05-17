import React, { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import styled from "styled-components";
import { useAuth } from "../../AuthContext";
import { ref as firebaseRef, get, set } from "firebase/database";
import { rtdb } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import CheckboxGroup from "../CheckBoxGroup";

const ScrollContainer = (props) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [isVisible] = useInView({ threshold: 1 });
    const [currentLikes, setCurrentLikes] = useState([]);
    const [currentSaved, setCurrentSaved] = useState([]);
    const newData = [...Array(1).keys()].map((x) => x + state.length);
    const [currIds, setCurrIds] = useState(props.text.map(obj => obj.id)[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredText, setFilteredText] = useState(props.text);

    // Initialize state from localStorage
    const [selectedGenres, setSelectedGenres] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedGenres")) || [];
    });
    const [selectedInterests, setSelectedInterests] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedInterests")) || [];
    });
    const [selectedFormats, setSelectedFormats] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedFormats")) || [];
    });
    const [selectedEmotions, setSelectedEmotions] = useState(() => {
        return JSON.parse(localStorage.getItem("selectedEmotions")) || [];
    });

    const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);

    const genreData = ["Хорор", "Фентезі", "Наукова фантастика", "Містика", "Трилер", "Історичний", "Романтичний роман", "Детектив"];
    const interestsData = ["Подорожі", "Живопис", "Скульптура", "Музика", "Театр", "Історія", "Кіно", "Спорт"];
    const formatData = ["Нарис", "Лист", "Новела", "Оповідання", "Спогад", "Легенда"];
    const emotionsData = ["Радість", "Сум", "Спокій", "Страх"];

    useEffect(() => {
        localStorage.setItem("selectedGenres", JSON.stringify(selectedGenres));
    }, [selectedGenres]);

    useEffect(() => {
        localStorage.setItem("selectedInterests", JSON.stringify(selectedInterests));
    }, [selectedInterests]);

    useEffect(() => {
        localStorage.setItem("selectedFormats", JSON.stringify(selectedFormats));
    }, [selectedFormats]);

    useEffect(() => {
        localStorage.setItem("selectedEmotions", JSON.stringify(selectedEmotions));
    }, [selectedEmotions]);

    useEffect(() => {
        const filtered = props.text.filter(item => {
            const titleMatches = item.title.toLowerCase().includes(searchQuery.toLowerCase());

            const itemGenres = Array.isArray(item.genre) ? item.genre : [item.genre];
            const genreMatches = selectedGenres.length === 0 ||
                selectedGenres.some(genre => itemGenres.includes(genre));

            const itemInterests = Array.isArray(item.interests) ? item.interests : [item.interests];
            const interestsMatch = selectedInterests.length === 0 ||
                selectedInterests.some(interest => itemInterests.includes(interest));

            return titleMatches && genreMatches && interestsMatch;
        });

        setFilteredText(filtered);
    }, [searchQuery, selectedGenres, selectedInterests, props.text]);

    useEffect(() => {
        if (props.text && currIds === undefined) {
            setCurrIds(props.text.map(obj => obj.id)[0]);
        }
    }, [props.text, currIds]);

    useEffect(() => {
        if (state.length + newData.length > props.text.length) {
            return;
        }
        if (isVisible) {
            setState((state) => [...state, ...newData]);
        }
    }, [isVisible, newData, props.text.length, state.length]);

    useEffect(() => {
        let isActive = true;

        const fetchLikes = async () => {
            try {
                const likesRef = firebaseRef(rtdb, `users/${currentUser.uid}/liked`);
                const likesSnapshot = await get(likesRef);
                if (isActive) {
                    setCurrentLikes(likesSnapshot.exists() ? likesSnapshot.val() : []);
                }
                const savedRef = firebaseRef(rtdb, `users/${currentUser.uid}/saved`);
                const savesSnapshot = await get(savedRef);
                if (isActive) {
                    setCurrentSaved(savesSnapshot.exists() ? savesSnapshot.val() : []);
                }
            } catch (error) {
                console.error('Failed to fetch likes:', error);
            }
        };

        fetchLikes();

        return () => {
            isActive = false;
        };
    }, []);

    const handleLikeClick = async (workId) => {
        let updatedLikes = [...currentLikes];

        if (updatedLikes.includes(workId)) {
            updatedLikes = updatedLikes.filter(id => id !== workId);
        } else {
            updatedLikes.push(workId);
        }

        setCurrentLikes(updatedLikes);
        await set(firebaseRef(rtdb, `users/${currentUser.uid}/liked`), updatedLikes);

        const updatedState = state.map(item => {
            if (item.id === workId) {
                return { ...item, liked: !item.liked };
            }
            return item;
        });

        setState(updatedState);
    };

    const handleSavedClick = async (workId) => {
        let updatedSaved = [...currentSaved];

        if (updatedSaved.includes(workId)) {
            updatedSaved = updatedSaved.filter(id => id !== workId);
        } else {
            updatedSaved.push(workId);
        }

        setCurrentSaved(updatedSaved);
        await set(firebaseRef(rtdb, `users/${currentUser.uid}/saved`), updatedSaved);

        const updatedState = state.map(item => {
            if (item.id === workId) {
                return { ...item, saved: !item.saved };
            }
            return item;
        });

        setState(updatedState);
    };

    const handleReadClick = (workId) => {
        navigate(`/work/${workId}`);
    };

    useEffect(() => {
        console.log(filteredText);
    }, [filteredText]);

    const toggleCheckboxVisibility = () => {
        setIsCheckboxVisible((prevVisibility) => !prevVisibility);
    };

    return (
        <>
            <ScrollHeader>
                <ToggleCheckboxButton onClick={toggleCheckboxVisibility}>
                    Filters
                </ToggleCheckboxButton>
                <SearchInput
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </ScrollHeader>
            {isCheckboxVisible && (
                <>
                    <CheckboxGroup
                        title="Жанри"
                        options={genreData}
                        selectedValues={selectedGenres}
                        onChange={setSelectedGenres}
                    />
                    <CheckboxGroup
                        title="Інтереси"
                        options={interestsData}
                        selectedValues={selectedInterests}
                        onChange={setSelectedInterests}
                    />
                    <CheckboxGroup
                        title="Формати"
                        options={formatData}
                        selectedValues={selectedFormats}
                        onChange={setSelectedFormats}
                    />
                    <CheckboxGroup
                        title="Емоція"
                        options={emotionsData}
                        selectedValues={selectedEmotions}
                        onChange={setSelectedEmotions}
                    />
                </>
            )}
            <List>
                {filteredText.map((el, index) => (
                    <Item key={el.id || index}>
                        <ItemTextContainer>
                            <ItemDate>{el.date ? el.date : "28.05.2024"}</ItemDate>
                            <ItemTitle dangerouslySetInnerHTML={{ __html: el.title }} onClick={() => handleReadClick(el.id)} />
                            <ItemText dangerouslySetInnerHTML={{ __html: el.content.slice(3, 300) }} />
                            <ItemGenre>{el.genre}</ItemGenre>
                        </ItemTextContainer>
                        <Reaction>
                            <ReactionIconButton liked={currentLikes.includes(el.id)} onClick={() => {
                                handleLikeClick(el.id);
                            }}>
                                <svg className="w-[35px] h-[35px]" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                     fill={currentLikes.includes(el.id) ? "red" : "none"}
                                     viewBox="0 0 24 24"
                                     stroke={currentLikes.includes(el.id) ? "red" : "currentColor"}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                          d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                                </svg>
                            </ReactionIconButton>
                            <ReactionIconButton saved={currentSaved.includes(el.id)} onClick={() => {
                                handleSavedClick(el.id)
                            }
                            }>
                                <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="30" height="30"
                                     fill={currentSaved.includes(el.id) ? "orange" : "none"}
                                     viewBox="0 0 24 24">
                                    <path stroke={currentSaved.includes(el.id) ? "orange" : "currentColor"}
                                          strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                          d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                                </svg>
                            </ReactionIconButton>
                        </Reaction>
                    </Item>
                ))}
                {filteredText.length === 0 && <Loader>No matches found</Loader>}
            </List>
        </>
    );
};

export default ScrollContainer;
const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 81vh;
    margin-top: 20px;
    background: #fff;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }

    @media (max-width: 800px) {
        height: 76vh;
    }
`;

const Item = styled.div`
    margin: 0 20px 20px 20px;
    padding: 60px 0;
    text-align: center;
    display: flex;
    gap: 15px;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    scroll-snap-align: start;
    border-radius: 25px;
    border: 2px solid #000;
    box-shadow: 0 10px 32px -15px rgba(0,0,0,0.75);
    font-family: "Montserrat Alternates", sans-serif;
    background: #fff;
    min-height: fit-content;

    @media (max-width: 800px){
        padding: 20px;
    }

    @media (max-width: 430px) {
        flex-direction: column;

    }
`;

const ItemTitle = styled.div`
    font-size: 25px;
    font-weight: 700;
    text-align: left;
    transition: transform 0.25s ease;
    ${Item}:hover & {
        transform: scale(1.01);
    }
    cursor: pointer;

    @media (max-width: 800px) {
        font-size: 18px;
    }
`;

const ItemText = styled.div`
    font-size: 16px;
    font-weight: 500;
    text-align: left;

    @media (max-width: 800px) {
        font-size: 12px;
    }
`;

const ItemDate = styled.div`
    color: #CB6B6B;
    font-size: 18px;
    font-weight:600;
    text-align: left;

    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const ItemGenre = styled.div`
    padding: 10px;
    border-radius: 6px;
    font-size: 16px;
    border: 1px solid #000;
    width: max-content;

    @media (max-width: 800px) {
        font-size: 14px;
    }
`;

const ItemTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 70%;
    font-size: 25px;
    text-align: left;

    @media (max-width: 800px) {
        width: 85%;
        gap: 15px;
    }
`;

const Loader = styled.div`
    min-height: 20vh;
    margin-bottom: 30px;
    margin-left: 20px;
    margin-right: 20px;
    display: flex;
    background: #444;
    scroll-snap-align: start;
    color: #eee;
    align-content: center;
    align-items: center;
    justify-content: center;
    border-radius: 25px;
`;

const Reaction = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 50px;

    @media (max-width: 430px){
        flex-direction: row;
    }
`;

const ReactionIconButton = styled.button`
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;

    &:hover {
        transform: scale(1.1);
    }
`;

const ToggleCheckboxButton = styled.button`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
    border-radius: 15px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    font-family: "Montserrat Alternates", sans-serif;
    cursor: pointer;
    box-shadow: 5px 5px 0px 0px #81ADC8;
    margin-left: 20px;

    transition: 0.3s ease;
    &:hover {
        scale: 1.03;
        box-shadow: 6px 6px 0px 0px #81ADC8;
    }

    @media (max-width: 800px) {
        margin-left: 0;
    }

    @media (max-width: 430px) {
        font-size: 14px;
    }
`;

const SearchInput = styled.input`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
    border-radius: 15px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    font-family: "Montserrat Alternates", sans-serif;
    box-shadow: 5px 5px 0 0 #81ADC8;
    margin-right: 20px;

    transition: 0.3s ease;

    &:hover {
        scale: 1.03;
        box-shadow: 6px 6px 0 0 #81ADC8;
    }

    &:focus {
        outline: none;
        box-shadow: 5px 5px 0 0 rgba(145, 95, 109, 0.5);
    }

    @media (max-width: 800px) {
        margin-right: 0;
        max-width: 55%;
    }

    @media (max-width: 430px) {
        max-width: 40%;
        font-size: 14px;
    }
`;

const ScrollHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: 800px) {
        margin: 0 20px 10px 20px;
        justify-content: space-between;
        gap: 15px;
        max-width: 100%;
    }
`;
