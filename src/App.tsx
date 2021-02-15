import React from 'react';
import OrdersList from './components/OrdersList/OrdersList';
import Login from './components/Login/Login';
import Pagination from './components/Pagination/Pagination';
import SearchBox from './components/SearchBox/SearchBox';
import { createApiClient, Order } from './api';
import './App.scss';


export type AppState = {
	orders?: { length: number, unfulfilledCount: number, ordersToReturn: Order[] },
	searchValue: string;
	searchMethod: string;
	pageNumber: number;
	fulfillmentFilter: string;
	paymentFilter: string;
	route: string;
	employee: {
		username: string,
		name: string,
		fulfilledCount: number
	};
}

const api = createApiClient();


export class App extends React.PureComponent<{}, AppState> {

	state: AppState = {
		searchValue: '',
		searchMethod: 'Name',
		pageNumber: 1,
		fulfillmentFilter: 'No Filter',
		paymentFilter: 'No Filter',
		route: 'login',
		employee: {
			username: '',
			name: '',
			fulfilledCount: 0,
		}
	};

	searchDebounce: any = null;


	async componentDidMount() {
		this.setState({
			orders: await api.getOrders(
				this.state.searchValue,
				this.state.searchMethod,
				this.state.pageNumber,
				this.state.fulfillmentFilter,
				this.state.paymentFilter
			),
		});
	}

	async getOrdersAfterLoad(searchValue: string, searchMethod: string, pageNumber: number, fulfillmentFilter: string, paymentFilter: string) {
		this.setState({
			orders: await api.getOrders(searchValue, searchMethod, pageNumber, fulfillmentFilter, paymentFilter)
		})
	}




	onLogin = (username: string, password: string) => {
		api.login(username, password).then((res) => {
			if (res === 'wrong-username'){
				alert('Employee Does Not Exist')
			}else if (res === 'wrong-password'){
				alert('Wrong Credentials')
			}else{
				this.setState({
					employee: {
						username: res.username,
						name: res.name,
						fulfilledCount: res.fulfilledCount
					},
					route: 'home'
				});
			}
		})
	}

	onSignOut = () => {
		this.setState({
			employee: {
				username: '',
				name: '',
				fulfilledCount: 0,
			},
			route: 'login',
		})
	}

	onSearchClick = () => {
		this.setState({
			pageNumber: 1
		});
		this.getOrdersAfterLoad(
			this.state.searchValue,
			this.state.searchMethod,
			1,
			this.state.fulfillmentFilter,
			this.state.paymentFilter
		);
	}

	onEnterKeyStroke = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			this.onSearchClick();
		}
	}

	onInputChange = async (value: string) => {

		clearTimeout(this.searchDebounce);

		this.searchDebounce = setTimeout(async () => {
			this.setState({
				searchValue: value
			});
		}, 300);
	};

	onSearchMethodChange = (searchMethod: string) => {
		this.setState({ searchMethod: searchMethod })
	}

	onFulfillmentFilterChange = (filter: string) => {
		this.setState({ fulfillmentFilter: filter });
	}

	onPaymentFilterChange = (filter: string) => {
		this.setState({ paymentFilter: filter });
	}

	onPageClick = (pageNumber: number) => {
		this.setState({ pageNumber: pageNumber });
		this.getOrdersAfterLoad(
			this.state.searchValue,
			this.state.searchMethod,
			pageNumber,
			this.state.fulfillmentFilter,
			this.state.paymentFilter
		);
	}

	//test convenience function
	OnTester = () => {
		this.setState({
			employee: {
				username: 'tester',
				name: 'Tester',
				fulfilledCount: 10,
			},
			route: 'home',
		})
	}

	render() {
		const { orders, searchMethod, fulfillmentFilter, paymentFilter, pageNumber, route, employee } = this.state;
		return (
			<main>
				{route === "login" ?
					<div>
						<Login onLogin={this.onLogin} />
						<p className='like-link-p tester' onClick={this.OnTester}>Tester?</p>
					</div>
					:
					<div className='wrapper'>
						<p className='like-link-p signout' onClick={this.onSignOut}>Signout</p>
						<div className='header-title'>
							<h1>Orders</h1>
						</div>
						<header>
							<SearchBox
								searchMethod={searchMethod}
								fulfillmentFilter={fulfillmentFilter}
								paymentFilter={paymentFilter}
								onSearchMethodChange={this.onSearchMethodChange}
								onFulfillmentFilterChange={this.onFulfillmentFilterChange}
								onPaymentFilterChange={this.onPaymentFilterChange}
								onInputChange={this.onInputChange}
								onSearchClick={this.onSearchClick}
								onEnterKeyStroke={this.onEnterKeyStroke}
							/>
						</header>
						{
							orders ?
								<OrdersList
									key={orders.length}
									orders={orders}
									employee={employee}
								/>
								:
								<h2>Loading...</h2>
						}

						{
							orders && orders.length !== 0
								?
								// 5 page buttons pagination
								<Pagination
									numberOfOrders={orders.length}
									currentPage={pageNumber}
									handleClick={this.onPageClick}
								/>
								:
								null
						}
					</div>
				}
			</main >
		)
	}

};

export default App;
