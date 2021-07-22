import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

function Test(props) {
    const {
        modalMake
    } = props;
    const [modalMakeInvoice, setModalMakeInvoice] = useState(false);
    const toggleMakeInvoice = () => setModalMakeInvoice(!modalMakeInvoice);
    return (
        <div>
            <h1>OKe</h1>
            <h1>OKe</h1>
            <h1>OKe</h1>
            <Button onClick={toggleMakeInvoice}>Open</Button>
            <Button onClick={toggleMakeInvoice}>Close</Button>
            <Modal isOpen={modalMakeInvoice} toggle={toggleMakeInvoice} className={modalMake}>
                <ModalHeader toggle={toggleMakeInvoice} charCode="X"></ModalHeader>
                <ModalBody>
                    <table>
                        <tr>
                            <th>Month</th>
                            <th>Savings</th>
                        </tr>
                        <tr>
                            <td>January</td>
                            <td>$100</td>
                        </tr>
                        <tr>
                            <td>February</td>
                            <td>$80</td>
                        </tr>
                    </table>
                </ModalBody>
            </Modal>

        </div>
    );
}

export default Test;