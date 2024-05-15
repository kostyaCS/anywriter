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
            <BackButton onClick={handleBackClick}>Back</BackButton>
            <Text>
                <Title>{work.title}</Title>
                <StyledDiv dangerouslySetInnerHTML={{ __html: work.content }} />
            </Text>
            <StyledLine />
            <AddCommentSection>
                <ReviewTtle>
                    Reviews
                </ReviewTtle>
                <CommentForm onSubmit={submitForm}>
                    <StyledTextarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required
                    />
                    <StyledButton type="submit">Add comment</StyledButton>
                </CommentForm>
            </AddCommentSection>
            {work.reviews && work.reviews.length > 0 && (
                <ReviewsSection>
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

        </StyledContainer>
    );

}

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
`;

const ReviewItem = styled.div`
    width: 70%;
    color: #5c5c5c;
    font-size: 24px;
    align-self: flex-start;
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
    width: 80%;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    font-weight: 600;
    font-size: 36px;
`;

const StyledDiv = styled.div`
    margin-bottom: 50px;
    font-size: 24px;
    line-height: 1.55;
    font-weight: 450;
    max-width: 70%;
    text-align: justify;
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

