import { useState } from 'react';
import { uploadContent } from '../../lib/contentData';

import { Modal, Form, Button } from 'react-bootstrap';

const WriteModal = ({ setModalFlag, modalFlag, userInfo }) => {
    const [imageFile, setImageFile] = useState(null);
    const [textInput, setTextInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile) {
            alert('Please select an image file.');
            return;
        }

        if (textInput.trim() === ''){
            alert('Please write content.');
            return;
        }
        
        const formData = new FormData();
        imageFile.forEach((file, index) => {
          formData.append(`file${index}`, file); // 서버에서 파일을 구별할 수 있도록 키를 다르게 지정합니다.
        });
        formData.append('content', textInput);
        const response = await uploadContent(formData);
        if(response.state !== 'SUCCESS') {
            alert("업로드 실패");
            return;
        }
    };

    const handleImageFileChange = (e) => {
        const file = e.target.files;
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
                            multiple
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