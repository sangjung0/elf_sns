import { Modal, Container, Button, Form } from 'react-bootstrap';

const FriendAdd = ({ modalFlag, setModalFlag, }) => {
    const handleClose = () => {
        setModalFlag(false)
    }

    const handleAdd = (e) => {
        e.preventDefault()
        // 구조상 문제로 보류
    }

    return (
        <Modal
            show={modalFlag}
            onHide={handleClose}
            className='d-flex justify-content-between align-items-center'
        >
            <Modal.Header closeButton>Friend Add</Modal.Header>
            <Modal.Body>
                <Container>
                    <Form className='d-flex justify-content-between align-items-center'>
                        <Form.Group>
                            <Form.Label>Friend Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" />
                        </Form.Group>
                        <div>&nbsp;&nbsp;&nbsp;</div>
                        <Button variant="primary" type="click" size='lg' onClick={handleAdd}>
                            Add
                        </Button>
                    </Form>
                </Container>
            </Modal.Body>
        </Modal>
    )
}

export default FriendAdd;