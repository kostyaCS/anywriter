import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { ref, update, onValue, set } from "firebase/database";
import { rtdb } from "../firebase";
import { useNavigate} from "react-router-dom";
import {auth} from "../firebase";

const CheckWork = () => {
    const navigate = useNavigate();
    const { workId } = useParams();
    const [comment, setComment] = useState("");
    const [work, setWork] = useState(null);

    useEffect(() => {
        const workRef = ref(rtdb, `works/${workId}`);
        onValue(workRef, (snapshot) => {
            setWork(snapshot.val());
        });
    }, [workId, work]);

    const handleBackClick = () => {
        navigate("/main_page")
    }

    if (!work) {
        return <StyledDiv>Loading...</StyledDiv>;
    }

    const submitForm = (event) => {
        event.preventDefault();

        let updates = {};
        const newReview = comment;
        const currentReviews = work.reviews || [];
        const newReviewKey = currentReviews.length.toString();

        updates[`/works/${workId}/reviews/${newReviewKey}`] = [newReview, auth.currentUser.uid, auth.currentUser.email];
        update(ref(rtdb), updates).then(() => {
            const updatedReviews = [...currentReviews, newReview];
            setWork({ ...work, reviews: updatedReviews });
            setComment('');
        }).catch(error => {
            console.error('Error adding review: ', error);
        });
    };

    const handleDeleteClick = (review) => {
        const workRef = ref(rtdb, `works/${workId}/reviews`);
        const newReviews = work.reviews.filter(element => element !== review);

        set(workRef, newReviews).then(() => {
            setWork({ ...work, reviews: newReviews });
        }).catch(error => {
            console.error(error);
        });
    }


    return (
        <StyledContainer>
            <Title>{work.title}</Title>
            <StyledDiv dangerouslySetInnerHTML={{ __html: work.content }} />
            <AddCommentSection>
                <Title>
                    Add your comment
                </Title>
                <CommentForm onSubmit={submitForm}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <AddCommentButtom type="submit">Add comment</AddCommentButtom>
                </CommentForm>
            </AddCommentSection>
            {work.reviews && work.reviews.length > 0 && (
                <ReviewsSection>
                    <h2>Reviews</h2>
                    {work.reviews.map((review, index) => (
                        <ReviewItem key={index}>
                            <p>{Array.isArray(review) ? review[0] : review}</p>
                            {Array.isArray(review) && review[1] === auth.currentUser.uid ?
                                (<button onClick={() => handleDeleteClick(review)}>Delete comment</button>) : null}
                            <p>{Array.isArray(review) ? review[2]: null}</p>
                        </ReviewItem>
                    ))}
                </ReviewsSection>
            )}
            <StyledButton onClick={handleBackClick}>Back</StyledButton>
        </StyledContainer>
    );

}

export default CheckWork;

const ReviewsSection = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 50px;
`;

const ReviewItem = styled.div`
    border: 1px solid black;
    width: 50%;
`;


const StyledContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const AddCommentSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 50%;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    margin-top: 40px;
`;

const StyledDiv = styled.div`
    width: 90vw;
    margin: 40px 0;
`;

const AddCommentButtom = styled.button`
    height: 42px;
    width: 200px;
    background-color: transparent;
    border-radius: 5px;
    border: 2px solid black;
    color: black;
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-bottom: 20px;

    &:hover {
        transform: translateY(-1px);
    }
`;

const StyledButton = styled.button`
    margin-bottom: 50px;
    height: 42px;
    width: 120px;
    background-color: black;
    border-radius: 5px;
    border: none;
    color: white;
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    font-weight: 700;
    cursor: pointer;
    -webkit-box-shadow: 5px 5px 0 0 rgba(0,0,0,0.25);
    -moz-box-shadow: 5px 5px 0 0 rgba(0,0,0,0.25);
    box-shadow: 5px 5px 0 0 rgba(0,0,0,0.25);
    transition: all 0.3s ease-in-out;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 7px 7px 0 0 rgba(0,0,0,0.25);
    }
`;

const CommentForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    justify-content: center;
    align-items: center;
`;
