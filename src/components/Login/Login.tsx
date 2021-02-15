import React, {createRef} from 'react';
import './Login.scss';


export type LoginState = {
    id: string;
    password: string;
}

export type LoginProps = {
    onLogin: (id: string, password: string) => void;
}

export class Login extends React.PureComponent<LoginProps, LoginState> {

    inputId = createRef<HTMLInputElement>();
    inputPassword = createRef<HTMLInputElement>();

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            id: '',
            password: '',
        }
        
    }

    searchDebounce: any = null;


    onInputChange = async (field: string, value: string) => {

        clearTimeout(this.searchDebounce);

        if (field === 'id') {
            this.searchDebounce = setTimeout(async () => {
                this.setState({ id: value });
            }, 300);
        } else {
            this.searchDebounce = setTimeout(async () => {
                this.setState({ password: value });
            }, 300);
        }
    };

    onLoginClick = () => {
        const { id, password } = this.state;
        this.setState({ id: '', password: '' })

        if (this.inputId.current) 
            this.inputId.current.value = "";

        if (this.inputPassword.current) 
            this.inputPassword.current.value = "";    
        
        this.props.onLogin(id, password);
    }



    render() {

        return (
            <div className='form-wrapper'>

                <div className="form">
                    <h1> Login to Continue </h1>
                    <div className='label-div'>
                        <label htmlFor="id">
                            Employee ID
                        </label>
                    </div>
                    <input
                        type="text"
                        name="id"
                        id="id"
                        placeholder="Your Employee ID"
                        onChange={(e) => this.onInputChange('id', e.target.value)}
                        ref={this.inputId}
                    />
                    <div className='label-div'>
                        <label htmlFor="password">
                            Password
                        </label>
                    </div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Your Given Password"
                        onChange={(e) => this.onInputChange('password', e.target.value)}
                        ref={this.inputPassword}
                    />
                    <button onClick={this.onLoginClick}>
                        Login
                    </button>
                </div>

            </div>
        )
    }
}

export default Login;





