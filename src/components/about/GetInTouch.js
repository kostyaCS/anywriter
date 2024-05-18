import styled from "styled-components";
import React, { useState } from "react";
import ContinueButton from "../ContinueButton";
import scribble_zig from "../../images/landing/scribble_zig.png";
import InvalidInput from "../AboutInvalidInput";
import scribble_black from "../../images/landing/scribble_black.png";
import { PhoneInput } from "react-international-phone";
import { parsePhoneNumber } from "libphonenumber-js";
import swal from "sweetalert";

const GetInTouch = () => {
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [fullName, setFullName] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const [invalidEmailMessage, setInvalidEmail] = useState("");
    const [invalidPhoneNumberMessage, setInvalidPhoneNumber] = useState("");
    const [invalidFullNameMessage, setInvalidFullName] = useState("");
    const [invalidSubjectMessage, setInvalidSubject] = useState("");
    const [invalidMessMessage, setInvalidMessage] = useState("");

    const checkEmail = (email) => {
        if (String(email).match(/^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,}$/)) {
            setInvalidEmail("");
            return true;
        }
        setInvalidEmail("Invalid email format.");
        return false;
    };

    const checkPhoneNumber = (phoneNumber) => {
        try {
            const phone = parsePhoneNumber(phoneNumber);
            if (phone.isValid()) {
                setInvalidPhoneNumber("");
                return true;
            } else {
                setInvalidPhoneNumber("Invalid format of phone number.");
                return false;
            }
        } catch (error) {
            setInvalidPhoneNumber("Phone number is too short.");
            return false;
        }
    };

    const checkFullName = (fullName) => {
        if (fullName) {
            setInvalidFullName("");
            return true;
        }
        setInvalidFullName("This field is required.");
        return false;
    };

    const checkSubject = (subject) => {
        if (subject) {
            setInvalidSubject("");
            return true;
        }
        setInvalidSubject("This field is required.");
        return false;
    };

    const checkMessage = (message) => {
        if (message) {
            setInvalidMessage("");
            return true;
        }
        setInvalidMessage("This field is required.");
        return false;
    };

    const checkInputData = () => {
        return (
            checkFullName(fullName) &&
            checkEmail(email) &&
            checkPhoneNumber(phoneNumber) &&
            checkSubject(subject) &&
            checkMessage(message)
        );
    };

    const sendMessage = async () => {
        if (!checkInputData()) {
            return;
        }

        console.log("Attempting to send message.");

        // TODO : implement sending email.

        const willSend = await swal({
            title: "Are you sure you want to send this message?",
            text: "",
            icon: "info",
            buttons: {
                no: {
                    text: "No",
                    className: "swal-button--cancel",
                    value: false,
                },
                yes: {
                    text: "Yes",
                    className: "swal-button--confirm",
                    value: true,
                },
            },
            dangerMode: true,
            closeOnClickOutside: true,
            closeOnEsc: true,
        });

        if (willSend) {
            setFullName("");
            setEmail("");
            setPhoneNumber("");
            setSubject("");
            setMessage("");
            swal("Success!", "Your message has been sent.", "success");
            // swal({
            //     title: "Sending...",
            //     text: "Your message is being sent.",
            //     icon: "info",
            //     buttons: false,
            //     closeOnClickOutside: true,
            //     closeOnEsc: true,
            //     timer: 1000,
            // }).then(() => {
            //     swal("Success!", "Your message has been sent.", "success");
            // });
        } else {
            swal("Cancelled", "Your message was not sent.", "error");
        }
    };

    return (
        <Main>
            <StyledGetInTouchText>
                <StyledScribbleZigImage src={scribble_zig} alt="scribble zigzag" />
                Get In Touch
            </StyledGetInTouchText>
            <StyledGetInTouchTextSmall>
                Send your message to us
            </StyledGetInTouchTextSmall>

            <HorizontalLine />
            <Subtitle>Full Name</Subtitle>
            <InputField
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            {invalidFullNameMessage && <InvalidInput text={invalidFullNameMessage} />}
            <Subtitle>Email</Subtitle>
            <InputField
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {invalidEmailMessage && <InvalidInput text={invalidEmailMessage} />}
            <PhoneAndSubject>
                <PhoneCont>
                    <Subtitle>Phone Number</Subtitle>
                    <StyledPhoneInput
                        defaultCountry={"ua"}
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                    />
                    {invalidPhoneNumberMessage && (
                        <InvalidInput text={invalidPhoneNumberMessage} />
                    )}
                </PhoneCont>
                <SubjectCont>
                    <Subtitle>Subject</Subtitle>
                    <SubjectInputField
                        type="text"
                        placeholder="Enter a subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                    {invalidSubjectMessage && (
                        <InvalidInput text={invalidSubjectMessage} />
                    )}
                </SubjectCont>
            </PhoneAndSubject>
            <Subtitle>Message</Subtitle>
            <MessageInputField
                type="text"
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {invalidMessMessage && <InvalidInput text={invalidMessMessage} />}
            <ContinueButton
                onClick={async () => {
                    await sendMessage();
                }}
                text="SEND MESSAGE"
            />
            <ScribbleImg src={scribble_black} alt="scribble black" />
        </Main>
    );
};

export default GetInTouch;

const Main = styled.div`
  width: 100vw;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  margin-top: -75px;
  padding-top: 150px;
`;

const ScribbleImg = styled.img`
  height: 150px;
  margin-top: 50px;
  margin-left: 30px;
  z-index: 1;

  @media (max-width: 890px) {
    margin-top: 65px;
  }
`;

const StyledGetInTouchTextSmall = styled.div`
  font-size: 20px;
  width: 70vw;
  text-align: center;

  @media (max-width: 550px) {
    font-size: 18px;
  }

  @media (max-width: 430px) {
    font-size: 14px;
  }
`;

const Subtitle = styled.h4`
  width: 500px;
  font-size: 15px;
  margin: 4px 0;

  @media (max-width: 550px) {
    width: 85%;
  }
`;

const InputField = styled.input`
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  width: 500px;
  border-radius: 8px;
  border: 1px solid black;
  padding: 0 10px 0 20px;
  height: 50px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 550px) {
    width: 85%;
  }
`;

const MessageInputField = styled.input`
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  width: 500px;
  border-radius: 8px;
  border: 1px solid black;
  padding: 0 10px 0 20px;
  height: 70px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 550px) {
    width: 85%;
  }
`;

const SubjectInputField = styled.input`
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  width: 230px;
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

const StyledPhoneInput = styled(PhoneInput)`
  font-size: 14px;
  font-family: "Montserrat Alternates", sans-serif;
  width: 500px;
  --react-international-phone-height: 50px;
  --react-international-phone-border-radius: 8px;
  --react-international-phone-border-color: black;

  &:focus {
    outline: none;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.1);
  }
`;

const PhoneAndSubject = styled.div`
  display: flex;
  justify-content: space-between;
  width: 500px;
  gap: 10px;

  @media (max-width: 550px) {
    width: 85%;
    flex-direction: column;
  }
`;

const PhoneCont = styled.div`
  width: 250px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const SubjectCont = styled.div`
  width: 230px;
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

const StyledGetInTouchText = styled.div`
  width: max-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 700;
  text-align: center;
  word-break: keep-all;

  @media (max-width: 836px) {
    width: 370px;
    font-size: 45px;
  }

  @media (max-width: 550px) {
    font-size: 40px;
  }

  @media (max-width: 430px) {
    font-size: 30px;
  }
`;

const StyledScribbleZigImage = styled.img`
  width: 120px;
  align-self: flex-end;
  margin: 0 -60px -20px 0;

  @media (max-width: 863px) {
    width: 110px;
    margin: 0 -30px -20px 0;
  }

  @media (max-width: 550px) {
    width: 100px;
    margin: 0 -10px -20px 0;
  }

  @media (max-width: 430px) {
    width: 80px;
    margin: 0 40px -8px 0;
  }
`;

const HorizontalLine = styled.div`
  background-color: #4d4d4d;
  height: 0.1mm;
  width: 90%;
  margin-bottom: 15px;

  @media (max-width: 550px) {
    width: 85%;
  }
`;
