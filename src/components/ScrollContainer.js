import React, { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import styled from "styled-components";
import {useAuth} from "../AuthContext";
import {ref as firebaseRef, get, set} from "firebase/database"
import { rtdb } from "../firebase";
import { useNavigate } from 'react-router-dom';

const ScrollContainer = (props) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [ref, isVisible] = useInView({ threshold: 1 });
    const [currentLikes, setCurrentLikes] = useState([]);
    const [currentSaved, setCurrentSaved] = useState([]);
    const newData = [...Array(1).keys()].map((x) => x + state.length);
    const [currIds, setCurrIds] = useState(props.text.map(obj => obj.id)[0]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredText, setFilteredText] = useState(props.text);

    useEffect(() => {
        const filtered = props.text.filter((item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredText(filtered);
    }, [searchQuery, props.text]);


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
    }

    const sendFeedback = async (genre, like) => {
        try {
            // Send feedback
            const response = await fetch('http://127.0.0.1:5000/recommendations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ genre, like })
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log('Feedback sent successfully:', responseData);
            } else {
                console.error('Failed to send feedback');
            }

            // Get recommendations
            const recommendationResponse = await fetch('http://127.0.0.1:5000/recommendations');
            if (recommendationResponse.ok) {
                const recommendation = await recommendationResponse.json();
                setCurrIds(recommendation);
                console.log('Recommendation:', recommendation);
            } else {
                setCurrIds(props.text);
                console.error('Failed to get recommendation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleDislikeClick = (genre) => {
        sendFeedback(genre, false);
    }

    const handleLikeButtonClick = (genre) => {
        sendFeedback(genre, true);
    }

    return (
        <>
            <SearchInput
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <List>
                {filteredText.map((el, index) => (
                    <Item key={el.id || index}>
                        <DataContainer>
                            <ItemReviewsContainer>
                                {el.reviews.map((review, reviewIndex) => (
                                    <ItemReviewsElement key={reviewIndex}>
                                    <span style={{ fontSize: 18 }}>
                                        {review}
                                    </span>
                                        <span style={{ fontSize: 14, fontWeight: 300, textAlign: "right" }}>
                                        Joe Biden from <span style={{ fontWeight: 500 }}>Reddit</span>
                                    </span>
                                    </ItemReviewsElement>
                                ))}
                            </ItemReviewsContainer>
                            <ItemTextContainer>
                                <div dangerouslySetInnerHTML={{ __html: el.content.slice(3, 300) }} />
                                <span style={{ fontSize: 18, fontWeight: 500, textAlign: "right" }}>
                                <div dangerouslySetInnerHTML={{ __html: el.title }} />
                            </span>
                            </ItemTextContainer>
                            <Reaction>
                                <ReactionIconButton liked={currentLikes.includes(el.id)} onClick={() => {
                                    handleLikeClick(el.id);
                                }}>
                                    <svg className="w-[35px] h-[35px]" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={currentLikes.includes(el.id) ? "red" : "none"}
                                         viewBox="0 0 24 24" stroke={currentLikes.includes(el.id) ? "red" : "currentColor"}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                                    </svg>
                                </ReactionIconButton>
                                <ReactionIconButton saved={currentSaved.includes(el.id)} onClick={() => {
                                    handleSavedClick(el.id)}
                                }>
                                    <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={currentSaved.includes(el.id) ? "orange" : "none"}
                                         viewBox="0 0 24 24">
                                        <path stroke={currentSaved.includes(el.id) ? "orange" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                                    </svg>
                                </ReactionIconButton>
                            </Reaction>
                        </DataContainer>
                        <ButtonsContainer>
                            <StyledButton onClick={() => handleDislikeClick(el.genre)}>
                                Dislike
                            </StyledButton>
                            <StyledButton onClick={() => handleReadClick(el.id)}>
                                Read it!
                            </StyledButton>
                            <StyledButton onClick={() => handleLikeButtonClick(el.genre)}>
                                Like
                            </StyledButton>
                        </ButtonsContainer>
                    </Item>
                ))}
                {filteredText.length === 0 && <Loader>No matches found</Loader>}
            </List>
        </>
    );
}

export default ScrollContainer;

const List = styled.div`
    max-height: 90vh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 25px;
`;


const Item = styled.div`
    margin: 0 20px 20px 20px;
    padding: 20px 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    align-content: center;
    scroll-snap-align: start;
    min-height: 85vh;
    border-radius: 25px;
    box-shadow: 0 10px 32px -15px rgba(0,0,0,0.75);

    background: #fff;
`;

const StyledButton = styled.button`
    align-items: center;
    background-color: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: .25rem;
    box-shadow: rgba(0, 0, 0, 0.02) 0 1px 3px 0;
    color: rgba(0, 0, 0, 0.85);
    cursor: pointer;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    min-height: 3rem;
    padding: calc(.875rem - 1px) calc(1.5rem - 1px);
    transition: all 250ms;
    user-select: none;

    &:hover {
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
        color: rgba(0, 0, 0, 0.85);
    }
`

const ItemTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 40%;
    font-size: 30px;
    text-align: left;
`;

const ItemReviewsContainer = styled.div`
    width: 40%;
    max-height: 70vh;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow: scroll;
`;

const ItemReviewsElement = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    //align-items: center;
    background-color: white;
    padding: 25px 15px 25px 15px;
    margin: 5px;
    border-radius: 15px;
    text-align: left;
`;

const ItemReviewsText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    align-items: flex-start;
    word-break: break-all;
    text-align: left;
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

const Text = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-left: 30px;
`;

const Reaction = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 50px;
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

const DataContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
`;

const AuthorContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    gap: 15px;
    margin-left: 9%;
`;
