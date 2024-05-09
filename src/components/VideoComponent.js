import styled from 'styled-components';

const VideoComponent = (props) => {
    return (
        <>
            <Container>
                <Video controls preload="auto">
                    <source src={props.src} type="video/mp4" />
                    Your browser does not support the video tag.
                </Video>
            </Container>
        </>
    )
};

export default VideoComponent;

const Video = styled.video`
    width: 85%;
    border-radius: 10px;
`;

const Container = styled.div`
    width: 50%;
`;
