import React, { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import styled from "styled-components";
import {useAuth} from "../AuthContext";
import {ref as firebaseRef, get, set} from "firebase/database"
import { rtdb } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { type } from "@testing-library/user-event/dist/type";


const ScrollContainer = (props) => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [state, setState] = useState([]);
    const [ref, isVisible] = useInView({ threshold: 1 });

    const newData = [...Array(1).keys()].map((x) => x + state.length);

    useEffect(() => {
        if (state.length + newData.length > props.text.length) {
            return;
        }
        if (isVisible) {
            setState((state) => [...state, ...newData]);
        }
    }, [isVisible, newData, props.text.length, state.length]);

    const handleLikeClick = async (workId) => {
        const likesRef = firebaseRef(rtdb, `users/${currentUser.uid}/liked`);
        let likesSnapshot = await get(likesRef);
        let currentLikes = likesSnapshot.exists() ? likesSnapshot.val() : [];

        if (currentLikes.includes(workId)) {
            currentLikes = currentLikes.filter(id => id !== workId);
        } else {
            currentLikes.push(workId);
        }

        await set(likesRef, currentLikes);
        const updatedState = state.map(item => {
            if (item.id === workId) {
                return { ...item, liked: !item.liked };
            }
            return item;
        });
        setState(updatedState);
    };

    const handleSavedClick = async (workId) => {


        const savedRef = firebaseRef(rtdb, `users/${currentUser.uid}/saved`);
        let savedSnapshot = await get(savedRef);
        let currentSaves = savedSnapshot.exists() ? savedSnapshot.val() : [];

        if (currentSaves.includes(workId)) {
            currentSaves = currentSaves.filter(id => id !== workId);
        } else {
            currentSaves.push(workId);
        }

        await set(savedRef, currentSaves);
        const updatedState = state.map(item => {
            if (item.id === workId) {
                return { ...item, liked: !item.liked };
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
                console.log('Recommendation:', recommendation);
            } else {
                console.error('Failed to get recommendation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    const handleDislikeClick = () => {
        sendFeedback("Наукова фантастика", false);
    }
    
    const handleLikeButtonClick = () => {
        sendFeedback("Наукова фантастика", true);
    }

    return (
        <>
            <List>
                {state.map((el, index) => (
                    console.log(typeof el, el, props.text[el]),
                    <Item key={index + el}>
                        <DataContainer>
                            <ItemReviewsContainer>
                                <ItemReviewsElement>
                                    <span style={{fontSize: 18}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In fringilla lobortis nunc, in ultricies odio aliquet ac. Praesent posuere, tellus sed blandit eleifend, nulla felis hendrerit nibh, a egestas augue diam ut felis. Aenean tristique, massa ac maximus pretium, felis urna pulvinar turpis, sed hendrerit quam lectus in justo. Sed ut justo et nulla convallis volutpat in a elit.
                                    </span>
                                    <span style={{fontSize: 14, fontWeight: 300, textAlign: "right"}}>
                                        Joe Biden from <span style={{fontWeight: 500}}>Reddit</span>
                                    </span>
                                </ItemReviewsElement>
                                <ItemReviewsElement>
                                    <span style={{fontSize: 18}}>
                                        In fringilla lobortis nunc, in ultricies odio aliquet ac. Praesent posuere, tellus sed blandit eleifend, nulla felis hendrerit nibh, a egestas augue diam ut felis. Aenean tristique, massa ac maximus pretium, felis urna pulvinar turpis, sed hendrerit quam lectus in justo. Sed ut justo et nulla convallis volutpat in a elit.
                                    </span>
                                    <span style={{fontSize: 14, fontWeight: 300, textAlign: "right"}}>
                                        Stewie Griffin from <span style={{fontWeight: 500}}>Goodreads</span>
                                    </span>
                                </ItemReviewsElement>
                            </ItemReviewsContainer>
                            <ItemTextContainer>
                                {props.text[el].content.slice(3, 400)}
                                <span style={{fontSize: 18, fontWeight: 500, textAlign: "right"}}>
                                    <div dangerouslySetInnerHTML={{__html: props.text[el].title}}/>
                                </span>
                            </ItemTextContainer>
                            <Reaction>
                                <ReactionIconButton liked={el.liked} onClick={() => {
                                    {
                                        handleLikeClick(props.text[el].id)
                                    }
                                    props.text[el].liked = (props.text[el].liked) ? !props.text[el].liked : 1;

                                }}>
                                <svg className="w-[35px] h-[35px]" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={props.text[el].liked ? "red" : "none"}
                                         viewBox="0 0 24 24" stroke={props.text[el].liked ? "red" : "currentColor"}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                                    </svg>
                                </ReactionIconButton>
                                <ReactionIconButton saved={el.saved} onClick={() => {{
                                    handleSavedClick(props.text[el].id)}
                                    props.text[el].saved = (props.text[el].saved)? !props.text[el].saved : 1;

                                }}>
                                    <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill={props.text[el].saved ? "orange" : "none"}
                                         viewBox="0 0 24 24">
                                        <path stroke={props.text[el].saved ? "orange" : "currentColor"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                                    </svg>
                                </ReactionIconButton>
                            </Reaction>
                        </DataContainer>
                        <ButtonsContainer>
                        <StyledButton onClick={handleDislikeClick}>
                            Dislike
                        </StyledButton>
                        <StyledButton onClick={() => handleReadClick(props.text[el].id)}>
                            Read it!
                        </StyledButton>
                        <StyledButton onClick={handleLikeButtonClick}>
                            Like
                        </StyledButton>
                        </ButtonsContainer>
                    </Item>
                ))}
                {state.length !== props.text.length && <Loader ref={ref}>Loading...</Loader>}
            </List>
        </>
    );
}

export default ScrollContainer;

const List = styled.div`
    //margin-top: 3vh;
    //margin-bottom: 2vh;
    max-height: 90vh;
    overflow-y: hidden;
    scroll-snap-type: y mandatory;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    scrollbar-width: none;

    &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 25px;
`;

const LikeButton = styled.button`
    background-color: green;
    color: white;
    &:hover {
        background-color: darkgreen;
    }
`;

const DislikeButton = styled.button`
    background-color: red;
    color: white;
    &:hover {
        background-color: darkred;
    }
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
    font-size: 32px;
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
