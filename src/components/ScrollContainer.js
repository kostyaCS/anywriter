import React, { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import styled from "styled-components";
import {useAuth} from "../AuthContext";
import {ref as firebaseRef, get, set} from "firebase/database"
import { rtdb } from "../firebase";


const ScrollContainer = (props) => {
    const { currentUser } = useAuth();
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
        console.log("Liked work ID:", workId);
        const likesRef = firebaseRef(rtdb, `users/${currentUser.uid}/liked`);
        let likesSnapshot = await get(likesRef);
        let currentLikes = likesSnapshot.exists() ? likesSnapshot.val() : [];

        if (currentLikes.includes(workId)) {
            // If already liked, unlike it
            currentLikes = currentLikes.filter(id => id !== workId);
        } else {
            // If not liked, add to likes
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


    return (
        <>
            <List>
                {state.map((el, index) => (
                    <Item key={index + el}>
                        <DataContainer>
                            <video
                                controls
                                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                                width="50%">
                            </video>
                            <ItemTextContainer>
                                <div dangerouslySetInnerHTML={{__html: props.text[el].title}}/>
                            </ItemTextContainer>
                            <Reaction>
                                <ReactionIconButton onClick={() => {
                                    handleLikeClick(props.text[el].id);
                                    console.log(state);
                                }}>
                                    <svg className="w-[35px] h-[35px]" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"
                                         viewBox="0 0 24 24" stroke={state[el].liked ? "red" : "currentColor"}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"/>
                                    </svg>
                                </ReactionIconButton>
                                <ReactionIconButton>
                                    <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z"/>
                                    </svg>

                                </ReactionIconButton>
                                <ReactionIconButton>
                                    <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"
                                         viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                              d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"/>
                                    </svg>
                                </ReactionIconButton>
                            </Reaction>
                        </DataContainer>
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
    overflow-y: scroll;
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

const ItemTextContainer = styled.div`
    width: 30%;
    overflow: hidden;
    white-space: pre;
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
