import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { ref, update, onValue, set, child, get } from "firebase/database";
import { rtdb } from "../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";

const CheckWork = () => {
    const navigate = useNavigate();
    const { workId } = useParams();
    const [comment, setComment] = useState("");
    const [work, setWork] = useState(null);
    const [comments, setComments] = useState([]);
    const { currentUser } = useAuth();
    const userId = currentUser.uid;

    useEffect(() => {
        const workRef = ref(rtdb, `works/${workId}`);
        onValue(workRef, (snapshot) => {
            setWork(snapshot.val());
        });

        const commentsRef = ref(rtdb, `comments/${workId}`);
        onValue(commentsRef, (snapshot) => {
            const commentsData = snapshot.val();
            if (commentsData) {
                const commentsArray = Object.entries(commentsData).map(([comment, authorId]) => {
                    return { comment, authorId };
                });
                setComments(commentsArray);
            } else {
                setComments([]);
            }
        });
    }, [workId]);

    const handleBackClick = () => {
        navigate("/main_page");
    };

    const submitForm = async (event) => {
        event.preventDefault();

        const commentData = {
            comment,
            authorId: userId
        };

        const commentsRef = ref(rtdb, `comments/${workId}`);
        await set(child(commentsRef, comment), userId);

        const updatedReviews = [...(work.reviews || []), { comment, authorId: userId }];
        await update(ref(rtdb, `works/${workId}`), { reviews: updatedReviews });

        setComment('');
    };

    const handleDeleteClick = async (comment) => {
        const commentsRef = ref(rtdb, `comments/${workId}`);
        await set(child(commentsRef, comment), null);
    };

    if (!work) {
        return <StyledDiv>Loading...</StyledDiv>;
    }

    return (
        <StyledContainer>
            <BackButton onClick={handleBackClick}>Back</BackButton>
            <Text>
                <Title>{work.title}</Title>
                <StyledDiv dangerouslySetInnerHTML={{ __html: work.content }} />
            </Text>
            <StyledLine />
            <AddCommentSection>
                <ReviewTtle>Reviews</ReviewTtle>
                <CommentForm onSubmit={submitForm}>
                    <StyledTextarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <StyledButton type="submit">Add comment</StyledButton>
                </CommentForm>
            </AddCommentSection>
            {comments.length > 0 && (
                <ReviewsSection>
                    {comments.map(({ comment: cmt, authorId }, index) => (
                        <ReviewItem key={index}>
                            <p>{cmt}</p>
                            {authorId === userId &&
                                <button onClick={() => handleDeleteClick(cmt)}>Delete comment</button>
                            }
                            <p>{authorId}</p>
                        </ReviewItem>
                    ))}
                </ReviewsSection>
            )}
        </StyledContainer>
    );
};

export default CheckWork;

const ReviewTtle = styled.div`
    font-size: 36px;
    font-weight: 600;
    align-self: flex-start;
`;

const StyledLine = styled.div`
    width: 90%;
    height: 2px;
    background-color: gray;
    margin-top: 50px;
    margin-bottom: 50px;
`;

const BackButton = styled.button`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
    border-radius: 15px;
    padding: 10px 20px;
    margin-top: 20px;
    margin-right: 20px;
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
    align-self: flex-end;
    
    
`;

const Text = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Montserrat Alternates", sans-serif;
    justify-content: center;
    align-items: center;
    gap: 20px;
    
    @media (max-width: 1000px) {
        gap: 5px;
        margin-top: 8px;
    }
`;

const ReviewsSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
    margin-top: 40px;
    
    @media (max-width: 1000px) {
        width: 90%;
    }
`;

const ReviewItem = styled.div`
    width: 70%;
    color: #5c5c5c;
    font-size: 24px;
    align-self: flex-start;
    
    @media (max-width: 1300px) {
        font-size: 22px;
        width: 80%;
    }
    
    @media (max-width: 900px) {
        font-size: 20px;
        width: 90%;
    }
`;


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
`;

const AddCommentSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: center;
    align-items: center;
    
    @media (max-width: 1000px) {
        width: 90%;
    }
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 36px;
    
    @media (max-width: 1300px) {
        font-size: 32px;
    }
    
    @media (max-width: 900px) {
        font-size: 30px;
    }
    
    @media (max-width: 420px) {
        font-size: 28px;
    }
`;

const StyledDiv = styled.div`
    margin-bottom: 50px;
    font-size: 24px;
    line-height: 1.55;
    font-weight: 450;
    max-width: 70%;
    text-align: justify;
    word-wrap: break-word;
    
    @media (max-width: 1300px) {
        max-width: 80%;
        font-size: 22px;
    }
    
    @media (max-width: 900px) {
        max-width: 85%;
    }
    
    @media (max-width: 420px) {
        max-width: 90%;
        font-size: 20px;
    }
    
    @media (max-width: 380px){
        max-width: 95%;
        font-size: 18px;
    }
`;

const StyledButton = styled.button`
    background-color: #ffffff;
    border: 2px solid #000000;
    color: black;
    border-radius: 15px;
    padding: 10px 20px;
    margin-top: 20px;
    margin-right: 20px;
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
`;

const CommentForm = styled.form`
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    margin-top: 20px;
    align-items: center;
    align-content: center;
`;

const StyledTextarea = styled.textarea`
    padding: 10px;
    border: 2px solid #000000;
    border-radius: 10px;
    font-size: 16px;
    margin-top: 10px;
`;

