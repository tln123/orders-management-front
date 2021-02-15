import React from 'react';
import OrderComponent from '../OrderComponent/OrderComponent';
import { Order, Employee } from '../../api';
import './OrdersList.scss'


export type OrdersListState = {
  unfulfilledCount: number;
  ordersCount: number;
  employeeFullfillmentCount: number;
}

export type OrdersListProps = {
  orders: { length: number, unfulfilledCount: number, ordersToReturn: Order[] };
  employee: Employee;
}

export class OrdersList extends React.PureComponent<OrdersListProps, OrdersListState> {

  constructor(props: OrdersListProps) {
    super(props);

    this.state = {
      ordersCount: this.props.orders.length,
      unfulfilledCount: this.props.orders.unfulfilledCount,
      employeeFullfillmentCount: this.props.employee.fulfilledCount,
    }
  }

  onFulfillmentChange = (newFulfillmentStatus: string, oldFulfillmentStatus: string) => {
    if (newFulfillmentStatus.split("-")[0] === 'fulfilled') {
      this.setState({
        unfulfilledCount: (this.state.unfulfilledCount - 1),
        employeeFullfillmentCount: (this.state.employeeFullfillmentCount + 1),
      });
    } else if (oldFulfillmentStatus === `fulfilled-by-${this.props.employee.username}`) {
      this.setState({
        unfulfilledCount: (this.state.unfulfilledCount + 1),
        employeeFullfillmentCount: (this.state.employeeFullfillmentCount - 1),
      });
    } else {
      this.setState({
        unfulfilledCount: (this.state.unfulfilledCount + 1)
      });
    }
  }


  render() {
    const { ordersToReturn } = this.props.orders;
    const { unfulfilledCount, ordersCount, employeeFullfillmentCount } = this.state;
    return (
      <div>
        <div className="employee-box">
          <h2>
            Hello <strong>{this.props.employee.name}</strong>, you fulfilled <strong>{employeeFullfillmentCount}
            </strong> orders so far, <br />keep up the good work!
          </h2>
        </div>

        <div className='results'>Found {ordersCount} orders, and {unfulfilledCount} of them not fulfilled.</div>
        <div className='orders'>
          {
            ordersToReturn.map((order, i) => {
              return (
                <OrderComponent
                  key={i}
                  order={order}
                  onFulfillmentChange={this.onFulfillmentChange}
                  employeeUN={this.props.employee.username}
                />
              );
            })
          }
        </div>
      </div>
    )
  }
}

export default OrdersList;