import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {auth, rtdb, storage} from "../firebase";
import {ref as storageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import {get, onValue, ref} from "firebase/database";
import {useAuth} from "../AuthContext";
import {useNavigate} from "react-router-dom";
import Avatar from "../images/avatar.png";
import TimedAlert from "../components/profile/TimedAlert";
import {getAuth, signOut} from "firebase/auth";
import LogOutButton from "../components/profile/LogOutButton";
import InvalidUpdateInput from "../components/profile/InvalidUpdateInput";
import {update} from "@firebase/database";
import ProfileHeader from "../components/profile/ProfileHeader";

const ProfileScreen = () => {
    const [allData, setAllData] = useState([]);
    const [activeTab, setActiveTab] = useState("all");
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [successAlertImage, setSuccessAlertImage] = useState(false);
    const [successAlertEmail, setSuccessAlertEmail] = useState(false);
    const [successAlertNick, setSuccessAlertNick] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState("");
    const [email, setEmail] = useState("");
    const [prevNickname, setPrevNickname] = useState("");
    const [nickname, setNickname] = useState("");

    const [invalidEmailMessage, setInvalidEmail] = useState("");
    const [invalidNicknameMessage, setInvalidNickname] = useState("");

    const checkImage = async () => {
        try {
            const url = await getDownloadURL(
                storageRef(storage, `profile_images/${currentUser.uid}`)
            ).then((url) => { setAvatarUrl(url); });
        } catch (error) { return ''; }
    };
    checkImage();

    const handleLogout = () => {
        signOut(auth).then(() => {
            navigate("/");
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    };

    const checkEmail = (email) => {
        if (String(email).match(
            /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,}$/
        )) {
            setInvalidEmail("");
            return true;
        }
        setInvalidEmail("Invalid email format.");
        return false;
    };

    const handleEmailUpdate = () => {
        if (!checkEmail(email)) { return; }

        if (email === currentUser.email) {
            setInvalidEmail("You entered your current email.");
            return;
        }

        setSuccessAlertEmail(true);
        setTimeout(() => {
            setSuccessAlertEmail(false);
        }, 4000);

        // ----- Attempt 1
        // const user = auth.currentUser;
        // updateEmail(user, email)
        //     .then(() => {
        //         // Email updated successfully, send verification email
        //         sendEmailVerification(user)
        //             .then(() => {
        //                 console.log('Verification email sent');
        //             })
        //             .catch((error) => {
        //                 console.error('Error sending verification email:', error);
        //             });
        //     })
        //     .catch((error) => {
        //         console.error('Error updating email:', error);
        //     });

        // ----- Attempt 2
        // getAuth().updateCurrentUser({
        //         email: email
        //     })
        //     .then((userRecord) => {
        //         // See the UserRecord reference doc for the contents of userRecord.
        //         console.log('Successfully updated user', userRecord.toJSON());
        //     })
        //     .catch((error) => {
        //         console.log('Error updating user:', error);
        //     });

        // ----- Attempt 3
        // updateEmail(auth.currentUser, email).then(() => {
        // }).catch((error) => {});
        //
        // setSuccessAlertEmail(true);
        // setTimeout(() => {
        //     setSuccessAlertEmail(false);
        // }, 4000);

        setEmail("");
    };

    const checkNickname = (nickname) => {
        // TODO: save in db and check if nickname exists
        // if (nickname exists) {
        //     setInvalidDate("Nickname already exists.");
        //     return false;
        // }
        if (nickname === "") {
            setInvalidNickname("Invalid nickname.");
            return false;
        }
        setInvalidNickname("");
        return true;
    };

    const handleNicknameUpdate = async () => {
        if (!checkNickname(nickname)) {
            return;
        }

        const auth = getAuth();
        const currentUserRef = ref(rtdb, `users/${auth.currentUser.uid}`);

        if (nickname === prevNickname) {
            setInvalidNickname("You entered your current nickname.");
            return;
        }

        await update(currentUserRef, {
            nickname: nickname
        });

        setPrevNickname(nickname);

        setSuccessAlertNick(true);
        setTimeout(() => {
            setSuccessAlertNick(false);
        }, 4000);

        setNickname("");
    };

    const handleImageFileClick = (imageFile) => {
        if (imageFile == null) return false;

        const imageRef = storageRef(storage,
            `profile_images/${currentUser.uid}`);
        setSuccessAlertImage(uploadBytes(imageRef, imageFile).then(() => {
            // alert("Image uploaded successfully");
            getDownloadURL(storageRef(storage, `profile_images/${currentUser.uid}`))
                .then((url) => {
                    setAvatarUrl(url);
                })
            return true;
        }));

        setTimeout(() => { setSuccessAlertImage(false); }, 4000);
    }

    useEffect(() => {
        if (!currentUser) return;

        const fetchWorks = async () => {
            if (activeTab === "all" || activeTab === "your-writings") {
                const worksRef = ref(rtdb, "works");
                const snapshot = await get(worksRef);
                if (!snapshot.exists()) {
                    setAllData([]);
                    return;
                }

                const worksData = snapshot.val();
                let allWorks = [];
                if (activeTab === "all") {
                    allWorks = Object.keys(worksData).map(key => ({
                        id: key,
                        ...worksData[key]
                    }));
                } else {
                    allWorks = Object.keys(worksData).map(key => {
                        if (worksData[key].userId === currentUser.uid) {
                            return {
                                id: key,
                                ...worksData[key]
                            };
                        }
                    }).filter(work => work !== undefined);
                }
                setAllData(allWorks);
            } else {
                const userWorksRef = ref(rtdb, `users/${currentUser.uid}/${activeTab}`);
                const userSnapshot = await get(userWorksRef);
                if (!userSnapshot.exists()) {
                    setAllData([]);
                    return;
                }

                const ids = userSnapshot.val() || [];
                const worksPromises = ids.map(id => {
                    const workRef = ref(rtdb, `works/${id}`);
                    return new Promise((resolve) => {
                        onValue(workRef, (snapshot) => {
                            resolve(snapshot.exists() ? { id: snapshot.key, ...snapshot.val() } : null);
                        });
                    });
                });

                const fetchedWorks = await Promise.all(worksPromises);
                setAllData(fetchedWorks.filter(Boolean));
            }
        };
        fetchWorks();
    }, [activeTab, currentUser]);

    useEffect(() => {
        if (!currentUser || activeTab === "all" || activeTab === "your-writings") return;

        const userWorksRef = ref(rtdb, `users/${currentUser.uid}/${activeTab}`);
        const unsubscribe = onValue(userWorksRef, (snapshot) => {
            const ids = snapshot.val() || [];
            const updatedData = allData.filter(work => ids.includes(work.id));
            setAllData(updatedData);
        });

        return () => {
            unsubscribe();
        };
    }, [activeTab, currentUser, allData]);


    useEffect(() => {
        const worksRef = ref(rtdb, `works`);

        onValue(worksRef, (snapshot) => {
            const works = snapshot.val();
            const allContents = [];
            for (let id in works) {
                allContents.push({
                    id: id,
                    liked: false,
                    ...works[id]
                });
            }

            setAllData(allContents);
        });

        const getNickname = async () => {
            try {
                const auth = getAuth();
                const currentUserRef = ref(rtdb, `users/${auth.currentUser.uid}`);
                const snapshot = await get(currentUserRef);
                if (snapshot.exists()) {
                    setPrevNickname(snapshot.val().nickname || "");
                }
            } catch (error) {
                console.error("Error fetching nickname:", error);
            }
        };

        getNickname();

        return () => {};
    }, []);


    return (
        <Main>
            <ProfileHeader/>
            <MainContainer>
                <MainContainerTitle>Profile picture</MainContainerTitle>
                <MainContainerImage>
                    <FrameImgContainer>
                        <StyledRecentWritingImage src={avatarUrl || Avatar} alt="ProfileScreen picture"/>
                    </FrameImgContainer>
                    <MainContainerInput onChange={(e) => {
                        handleImageFileClick(e.target.files[0]);
                    }} />
                    {successAlertImage && <TimedAlert message="Image uploaded successfully!" />}
                    <MainContainerLabel htmlFor="files">Upload file</MainContainerLabel>
                </MainContainerImage>
                <MainContainerTitle>Email</MainContainerTitle>
                <MainContainerData>
                    <InputField placeholder={currentUser.email} value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                    <MainContainerDataButton onClick={handleEmailUpdate}>
                        Update
                    </MainContainerDataButton>
                    {successAlertEmail && <TimedAlert message="Email cannot be updated right now." />}
                </MainContainerData>
                {invalidEmailMessage && (<InvalidUpdateInput text={invalidEmailMessage} />)}
                <MainContainerTitle>Username</MainContainerTitle>
                <MainContainerData>
                    <InputField type="text" placeholder={prevNickname || "Add your nickname"} value={nickname}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\s/g, '');
                                    setNickname(value);
                                    checkNickname(value);
                                }} />
                    <MainContainerDataButton onClick={handleNicknameUpdate}>
                        Update
                    </MainContainerDataButton>
                    {successAlertNick && <TimedAlert message="Nickname updated successfully!" />}
                </MainContainerData>
                {invalidNicknameMessage && (<InvalidUpdateInput text={invalidNicknameMessage} />)}
                <HorizontalLineSeparator/>
                <LogOutButton onClick={handleLogout} text="Log out"/>
            </MainContainer>
        </Main>
    );
};

export default ProfileScreen;

const Main = styled.div`
    font-family: 'Montserrat Alternates', sans-serif;
    height: 100vh;
    min-height: 790px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainContainer = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    margin-top: 30px;
    padding-bottom: 10px;
`;

const MainContainerTitle = styled.h2`
    font-size: 21px;
    transition: all 0.3s ease-in-out;

    @media (max-width: 460px) {
        font-size: 18px;
    }
`;

const MainContainerImage = styled.div`
    width: 90vw;
    display: flex;
    gap: 30px;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;

    @media (max-width: 460px) {
        gap: 20px;
    }
`;

const FrameImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    overflow: hidden;
    border-radius: 50%;
    transition: all 0.3s ease-in-out;

    @media (max-width: 460px) {
        width: 60px;
        height: 60px;
    }
`;

const StyledRecentWritingImage = styled.img`
    height: 100px;
    transition: all 0.3s ease-in-out;

    @media (max-width: 460px) {
        height: 60px;
    }
`;

const MainContainerLabel = styled.label`
    padding: 10px 20px;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        -webkit-box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.15);
        box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.15);
    }

    @media (max-width: 460px) {
        font-size: 14px;
    }
`;

const MainContainerInput = styled.input.attrs({ type: 'file', id: 'files', className: 'hidden' })`
    display: none;
`;

const InputField = styled.input`
    font-size: 14px;
    font-family: 'Montserrat Alternates', sans-serif;
    //width: 450px;
    border-radius: 8px;
    border: 1px solid black;
    padding: 0 10px 0 20px;
    height: 50px;
    box-sizing: border-box;

    &:focus {
        outline: none;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
    }
`;

const MainContainerData = styled.div`
    width: 90%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 20px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

const MainContainerDataButton = styled.button`
    height: 40px;
    background-color: white;
    padding: 0 20px;
    color: black;
    border-radius: 5px;
    border: 1px solid black;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
        -webkit-box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.15);
        -moz-box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.15);
        box-shadow: 2px 2px 3px 0 rgba(0,0,0,0.15);
    }

    @media (max-width: 460px) {
        font-size: 14px;
    }
`;

const HorizontalLineSeparator = styled.div`
    width: 90%;
    height: 0.15mm;
    background-color: #4D4D4D;
    margin: 30px 0 40px 0;
`;
