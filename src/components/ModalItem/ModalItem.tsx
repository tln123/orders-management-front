import React from 'react';
import { createApiClient, Item } from '../../api';
import './ModalItem.scss'


export type ModalItemState = {
    item?: Item;
}

export type ItemProps = {
    itemIdAndQuantity: { id: string, quantity: number };
}

const api = createApiClient();

export class ModalItem extends React.PureComponent<ItemProps, ModalItemState> {

    constructor(props: ItemProps) {
        super(props);

        this.state = {};
    }

    async componentDidMount() {
        this.setState({
            item: await api.getItem(this.props.itemIdAndQuantity.id)
        });
    }

    render() {
        const { itemIdAndQuantity } = this.props;
        const { item } = this.state;
        return (
            <div>
                {
                    item ?
                        <div className='modal-item'>
                            <div className="modal-item-title">
                                <img src={item.image} alt='' />
                                <h4>{item.name}</h4>
                            </div>
                            <div className="modal-items-numbers">
                                <h4>{item.price}</h4>
                                <h4>{itemIdAndQuantity.quantity}</h4>
                            </div>
                        </div>
                        :
                        <h2>Loading...</h2>
                }
            </div>
        )
    }
}

export default ModalItem;