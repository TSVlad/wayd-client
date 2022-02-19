import {Button, Col, Form, Image, Row} from "react-bootstrap";
import LINKS from "../../utills/constants/links";
import {useEffect, useState} from "react";
import {registerRequest, updateUserRequest} from "../../utills/request/requests/userRequests";
import {useHistory} from "react-router-dom";

const UserEditComponent = (props) => {

    const [userInfo, setUserInfo] = useState(props.user ? props.user : {})
    const history = useHistory()

    useEffect(() => {
        if (props.user) {
            setUserInfo(props.user)
        }
    }, [props])

    const getUpdateInfo = () => {
        return {
            id: userInfo.id,
            name: userInfo.name,
            surname: userInfo.surname,
            contacts: userInfo.contacts,
            description: userInfo.description
        }
    }

    const getRegisterInfo = () => {
        return {}
    }

    return (
        <Form className={props.className}>
            <Row>
                <Col sm={4}>
                    <div className="avatar-div mr-1" style={{display: "inline-block"}}>
                        <Image src={userInfo.avatar ? props.user.avatar : LINKS.defaultAvatarLink}
                               className="avatar"/>
                    </div>
                </Col>
                <Col>
                    {!props.user &&
                        <>
                            <Form.Label className={'mt-2'}>Username*</Form.Label>
                            <Form.Control onChange={(e) => setUserInfo({...userInfo, username: e.target.value})}/>
                            <Form.Label className={'mt-2'}>Password*</Form.Label>
                            <Form.Control type={'password'}
                                          onChange={(e) => setUserInfo({...userInfo, password: e.target.value})}/>
                            <Form.Label className={'mt-2'}>Email*</Form.Label>
                            <Form.Control type={'email'}
                                          onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}/>
                            <Form.Label className={'mt-2'}>Date of birth*</Form.Label>
                            <Form.Control type={'date'} onChange={(e) => {
                                setUserInfo({...userInfo, dateOfBirth: e.target.value})
                            }}/>
                        </>
                    }
                    <Form.Label>Name</Form.Label>
                    <Form.Control defaultValue={userInfo.name}
                                  onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}/>
                    <Form.Label className={'mt-2'}>Surname</Form.Label>
                    <Form.Control defaultValue={userInfo.surname}
                                  onChange={(e) => setUserInfo({...userInfo, surname: e.target.value})}/>
                </Col>
            </Row>
            <Form.Label className={'mt-2'}>Contacts</Form.Label>
            <Form.Control defaultValue={userInfo.contacts}
                          onChange={(e) => setUserInfo({...userInfo, contacts: e.target.value})}/>
            <Form.Label className={'mt-2'}>Description</Form.Label>
            <Form.Control as={'textarea'} rows={4} defaultValue={userInfo.description}
                          onChange={(e) => setUserInfo({...userInfo, description: e.target.value})}/>
            <Row className="justify-content-center mt-3">
                <Button onClick={() => {
                    if (props.user) {
                        updateUserRequest(getUpdateInfo())
                            .then(response => {
                                if (response.status === 202) {
                                    history.push(`/user/${props.user.id}`)
                                }
                            })
                    } else {
                        registerRequest(userInfo)
                            .then(response => {
                                if (response.status === 201) {
                                    props.registerCallback()
                                }
                            })
                    }
                }}>{props.user ? 'Save' : 'Register'}</Button>
            </Row>
        </Form>
    )
}

export default UserEditComponent