import React, { useEffect, useState } from "react";
import { useInView } from "react-hook-inview";
import styled from "styled-components";

const ScrollContainer = (props) => {
    const [state, setState] = useState([]);
    const [ref, isVisible] = useInView({ threshold: 1 });

    console.log(props.text.length);

    const newData = [...Array(1).keys()].map((x) => x + state.length);

    useEffect(() => {
        if (state.length + newData.length > props.text.length) {
            return;
        }
        if (isVisible) {
            setState((state) => [...state, ...newData]);
        }
    }, [isVisible, newData, props.text.length, state.length]);

    console.log([...state]);
    console.log([...newData]);

    return (
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
                            <div dangerouslySetInnerHTML={{__html: props.text[el]}}/>
                        </ItemTextContainer>
                        <Reaction>
                            <ReactionIconButton>
                                <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none"
                                     viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
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
                    <AuthorContainer>
                        <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.3"
                                  d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                        <span>Author name</span>
                    </AuthorContainer>
                </Item>
            ))}
            {state.length !== props.text.length && <Loader ref={ref}>Loading...</Loader>}
        </List>
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
