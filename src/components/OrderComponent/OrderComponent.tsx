import React from 'react';
import { Order } from '../../api';
import OrderModal from '../OrderModal/OrderModal';
import './OrderComponent.scss'
export type OrderState = {
  showModal: boolean;
}

export type OrderProps = {
  order: Order;
  onFulfillmentChange: (newFulfillmentStatus: string, oldFulfillmentStatus: string) => void;
  employeeUN: string;
}

export class OrderComponent extends React.PureComponent<OrderProps, OrderState> {

  constructor(props: OrderProps) {
    super(props);

    this.state = {
      showModal: false,
    }
  }


  openModal = () => {
    this.setState({ showModal: true });
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }
  

  render() {
    const { id, createdDate, billingInfo, customer, itemQuantity, price, fulfillmentStatus } = this.props.order;
    const { showModal } = this.state;
    const assetSrc = fulfillmentStatus === 'not-fulfilled' ? fulfillmentStatus : 'fulfilled';
    return (
      <div>
        {
          showModal ?
            <OrderModal order={this.props.order} closeModal={this.closeModal} onFulfillmentChange={this.props.onFulfillmentChange} employeeUN={this.props.employeeUN} />
            : null
        }
        <div className='orderCard' onClick={this.openModal}>

          <div className='generalData'>
            <h6>{id}</h6>
            <h4>{customer.name}</h4>
            <h5>Order Placed: {new Date(createdDate).toLocaleDateString()}</h5>
          </div>

          <div className='fulfillmentData'>
            <h4>{itemQuantity} Items</h4>
            <img src={OrderComponent.getAssetByStatus(assetSrc)} alt='' />
          </div>

          <div className='paymentData'>
            <h4>{price.formattedTotalPrice}</h4>
            <img src={OrderComponent.getAssetByStatus(billingInfo.status)} alt='' />
          </div>

        </div>
      </div>
    )
  }

  static getAssetByStatus = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return require('../../assets/package.png');
      case 'not-fulfilled':
        return require('../../assets/pending.png');
      case 'canceled':
        return require('../../assets/cancel.png');
      case 'paid':
        return require('../../assets/paid.png');
      case 'not-paid':
        return require('../../assets/not-paid.png');
      case 'refunded':
        return require('../../assets/refunded.png');
    }
  }

}

export default OrderComponent;