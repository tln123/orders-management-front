import React from 'react';
import { Order, createFulfillmentClient } from '../../api';
import OrderComponent from '../OrderComponent/OrderComponent';
import ModalItem from '../ModalItem/ModalItem';
import Scroll from '../Scroll/Scroll';
import './OrderModal.scss'


export type ModalState = {
    fulfillmentStatus: string;
    fulfillmentImgSrc: string;
}

export type ModalProps = {
    closeModal: (event: React.MouseEvent<HTMLButtonElement>) => void,
    order: Order;
    onFulfillmentChange: (newFulfillmentStatus: string, oldFulfillmentStatus: string) => void;
    employeeUN: string;
}

const orderApi = createFulfillmentClient();

export class OrderModal extends React.PureComponent<ModalProps, ModalState> {

    constructor(props: ModalProps) {
        super(props);

        this.state = {
            fulfillmentStatus: props.order.fulfillmentStatus,
            fulfillmentImgSrc: OrderComponent.getAssetByStatus(props.order.fulfillmentStatus),
        }
    }

    onFulfilmentChange = () => {
        const oldFulfillmentStatus = this.state.fulfillmentStatus;
        const newFulfillmentStatus = oldFulfillmentStatus === 'not-fulfilled' ? `fulfilled-by-${this.props.employeeUN}` : 'not-fulfilled';
        const assetSrc = (newFulfillmentStatus === 'not-fulfilled') ? 'not-fulfilled' : 'fulfilled'; 

        orderApi.changeFulfillmentStatus(this.props.order.id, newFulfillmentStatus, this.props.employeeUN).then((res) => {
            if (res === 'success') {
                this.props.order.fulfillmentStatus = newFulfillmentStatus;
                this.setState({
                    fulfillmentStatus: newFulfillmentStatus,
                    fulfillmentImgSrc: OrderComponent.getAssetByStatus(assetSrc)
                });
                this.props.onFulfillmentChange(newFulfillmentStatus, oldFulfillmentStatus);
            } else {
                alert(`Something went wrong with changing order ${this.props.order.id} fulfilment status, please try again`)
            }
        });
    }


    render() {
        const { id, createdDate, fulfillmentStatus, billingInfo, customer, itemQuantity, items, price } = this.props.order;
        const assetSrc = fulfillmentStatus === 'not-fulfilled' ? fulfillmentStatus : 'fulfilled';
        return (
            <div className="modal-back-layer">
                <div className="modal-wrapper" style={{ transform: 'translateY(0vh)', transition: 'transition: all 0.5s ease' }}>

                    <div className="modal-header">
                        <p>
                            {`Order ${id}`}
                        </p>
                        <span onClick={this.props.closeModal} className="close-modal-btn">
                            x
                        </span>
                    </div>

                    <div className="modal-content">

                        <div className="modal-left">

                            <h4>{customer.name}</h4>
                            <h4>{new Date(createdDate).toLocaleDateString()} </h4>
                            <h4>{new Date(createdDate).toLocaleTimeString()} </h4>

                            <div className="modal-icons">
                                <img src={OrderComponent.getAssetByStatus(billingInfo.status)} alt='' />
                            </div>
                        </div>

                        <div className="modal-right">
                            <h4>{`Total # of Items: ${itemQuantity}`}</h4>
                            <Scroll>
                                <div >
                                    <div className="modal-list-header">
                                        <div className="modal-list-header-item">
                                            <h4>Item</h4>
                                        </div>
                                        <h4>Price</h4>
                                        <h4>Quantity</h4>
                                    </div>
                                    <hr />
                                    {items.map((item, index) => {
                                        return <ModalItem key={index} itemIdAndQuantity={item} />
                                    })}
                                </div>
                            </Scroll>
                            <div className="modal-right-bottom">

                                <h4>{`Total Order Price: ${price.formattedTotalPrice}`}</h4>
                                <div className="modal-right-bottom-fulfillment">
                                    <img src={OrderComponent.getAssetByStatus(assetSrc)} alt='' />
                                    {fulfillmentStatus !== 'canceled' &&
                                        <p className='like-link-p' onClick={() => this.onFulfilmentChange()}>Mark as {fulfillmentStatus === 'not-fulfilled' ? 'Delivered' : 'Not Delivered'}</p>
                                    }
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="modal-footer">
                        <button onClick={this.props.closeModal} className="btn-cancel">Close</button>
                    </div>

                </div>

            </div>
        )
    }
}

export default OrderModal;