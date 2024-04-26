import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import { ref, update, onValue } from "firebase/database";
import { rtdb } from "../firebase";
import { useNavigate} from "react-router-dom";

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
    }, [workId]);

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

        updates[`/works/${workId}/reviews/${newReviewKey}`] = newReview;
        update(ref(rtdb), updates).then(() => {
            console.log('Review added successfully!');

            const updatedReviews = [...currentReviews, newReview];
            setWork({ ...work, reviews: updatedReviews });
            setComment('');
        }).catch(error => {
            console.error('Error adding review: ', error);
        });
    };


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
                    <StyledButton type="submit">Add comment</StyledButton>
                </CommentForm>
            </AddCommentSection>
            {work.reviews && work.reviews.length > 0 && (
                <ReviewsSection>
                    <h2>Reviews</h2>
                    {work.reviews.map((review, index) => (
                        <ReviewItem key={index}>
                            <p>{review}</p>
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
    width: 50%;
    justify-content: center;
    align-items: center;
`;

const Title = styled.div`
    
`;

const StyledDiv = styled.div`
    margin-bottom: 50px;
`;

const StyledButton = styled.button`
    margin-bottom: 50px;
`;

const CommentForm = styled.form`
    display: flex;
    flex-direction: column;
`;
