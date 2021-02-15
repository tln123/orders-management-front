import React from 'react';
import './DropDownButton.scss';


export type DropDownState = {
    show: boolean;
}

export type DropDownProps = {
    onChange: (selected: string) => void,
    buttons: string[],
    handlerString: string;
}

export class DropDownButton extends React.PureComponent<DropDownProps, DropDownState> {

    constructor(props: DropDownProps) {
        super(props);

        this.state = {
            show: false,
        }
    }

    handleToggle = () => {
        this.setState({ show: !this.state.show })
    }

    onItemClick = (selected: string) => () => {
        this.setState({show: false});
        this.props.onChange(selected);
    }

    render() {
        const { buttons, handlerString } = this.props;
        return (
            <div className="dropdown-container">
                <label className="arrow">
                    <input
                        type="button"
                        value={handlerString}
                        onClick={this.handleToggle}
                    />
                </label>
                <ul className="dropdown-list" hidden={!this.state.show}>
                    {buttons.map((button, index) => (
                        <li
                            key={index}
                            onClick={this.onItemClick(button)}
                        >
                            {button}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default DropDownButton;