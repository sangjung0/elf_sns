import { useState } from 'react';

import axios from 'axios';

import { Modal, Form, Button } from 'react-bootstrap';

const WriteModal = ({ setModalFlag, modalFlag, userInfo }) => {
    const [imageFile, setImageFile] = useState(null);
    const [textInput, setTextInput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert('Please select an image file.');
            return;
        }

        // Process the selected image file and text input here
        console.log('Image File:', imageFile);
        console.log('Text Input:', textInput);

        // You can perform further actions like sending data to a server or displaying it.
        axios({
            url: process.env.REACT_APP_SERVER_URL + '/add',
            method: 'post',
            body: {
                imageFile: imageFile,
                textInput: textInput
            }
        })
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    };

    const handleClose = () => {
        setModalFlag(false)
    }

    return (
        <Modal
            show={modalFlag}
            onHide={handleClose}
        >
            <Modal.Header closeButton>
                Write post
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {/* Image File Input */}
                    <Form.Group controlId="imageFile">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                        />
                    </Form.Group>

                    {/* Text Input */}
                    <br />
                    <Form.Group controlId="textInput">
                        <Form.Label>Text Input</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter text"
                            value={textInput}
                            onChange={(e) => setTextInput(e.target.value)}
                        />
                    </Form.Group>

                    {/* Submit Button */}
                    <br />
                    <Button variant="primary" type="submit" style={{ width: '100%' }}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default WriteModal;