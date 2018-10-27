import React, {Component} from 'react';
import {connect} from 'react-redux';

import CustomerList from '../CustomerList';
import CustomerAddForm from '../CustomerAddForm';
import CustomerChangeForm from '../CustomerChangeForm';
import CustomerDeleteForm from '../CustomerDeleteForm';
import EditPanel from '../EditPanel';
import {Actions} from '../../redux/customers/AC';

import {Dispatch} from 'redux';
import {RootState} from '../../redux/store';
import {CustomersState} from '../../redux/customers/states';
import {CustomersRequestState} from '../../redux/request/nested-states/customers/states';
import {CustomerDataForServer, Customer as CustomerInterface} from '../../redux/customers/states';

interface StateProps {
    customers: CustomersState,
    customersRequests: CustomersRequestState,
}

interface DispatchProps {
    loadCustomers(): void,
    submitAddForm(data: CustomerDataForServer): void,
    submitChangeForm(data: CustomerDataForServer, id: number): void,
    submitDeleteForm(id: number): void,
}

type Props = StateProps & DispatchProps;

interface State {
    isVisibleAddForm: boolean,
    isVisibleChangeForm: boolean,
    isVisibleDeleteForm: boolean,
}

class CustomersPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        };
    }

    public handleSubmitCustomerAddForm = (values: CustomerDataForServer) => {
        this.props.submitAddForm(values);
    };
    public handleSubmitCustomerChangeForm = (values: CustomerDataForServer) => {
        const {customers: {activeCustomerId}, submitChangeForm} = this.props;

        if (activeCustomerId) {
            submitChangeForm(values, activeCustomerId);
        }
    };
    public handleSubmitCustomerDeleteForm = (evt: React.FormEvent<HTMLFormElement>) => {
        const {customers: {activeCustomerId}, submitDeleteForm} = this.props;

        evt.preventDefault();
        if (activeCustomerId) {
            submitDeleteForm(activeCustomerId);
        } else {
            this.handleButtonCustomerDeleteClick();
        }
    };
    public handleButtonCustomerAddClick = (): void => {
        this.setState({
            isVisibleAddForm: !this.state.isVisibleAddForm,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        });
    };
    public handleButtonCustomerChangeClick = (): void => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
            isVisibleAddForm: false,
            isVisibleDeleteForm: false,
        });
    };
    public handleButtonCustomerDeleteClick = (): void => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
        });
    };

    public render() {
        const {customers: {activeCustomerId, data}, customersRequests, loadCustomers} = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
        const activeCustomer: CustomerInterface | undefined = data.find(
            (elem: CustomerInterface) => elem.id === activeCustomerId
        );

        return (
            <section>
                <EditPanel
                    onAddButtonClick={this.handleButtonCustomerAddClick}
                    onChangeButtonClick={this.handleButtonCustomerChangeClick}
                    onDeleteButtonClick={this.handleButtonCustomerDeleteClick}
                    activeId={activeCustomerId}
                    formsState={{
                        isVisibleAddForm,
                        isVisibleChangeForm,
                        isVisibleDeleteForm,
                    }}
                />
                <CustomerAddForm
                    isVisible={isVisibleAddForm}
                    isLoading={customersRequests.customersPost.loading}
                    errors={customersRequests.customersPost.errors}
                    onSubmit={this.handleSubmitCustomerAddForm}
                />
                <CustomerChangeForm
                    isVisible={isVisibleChangeForm}
                    isLoading={customersRequests.customersPut.loading}
                    errors={customersRequests.customersPut.errors}
                    onSubmit={this.handleSubmitCustomerChangeForm}
                />
                <CustomerDeleteForm
                    isVisible={isVisibleDeleteForm}
                    isLoading={customersRequests.customersDelete.loading}
                    errors={customersRequests.customersDelete.errors}
                    name={activeCustomer ? activeCustomer.name : null}
                    handleSubmit={this.handleSubmitCustomerDeleteForm}
                />
                <h1>Customers: </h1>
                <CustomerList
                    customersRequest={customersRequests.customersGet}
                    customersData={data}
                    loadCustomers={loadCustomers}
                />
            </section>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    customers: state.customers,
    customersRequests: state.request.customers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        loadCustomers: () => {
            dispatch(Actions.loadAllCustomers());
        },
        submitAddForm: (data) => {
            dispatch(Actions.submitCustomerAddForm(data));
        },
        submitChangeForm: (data, id) => {
            dispatch(Actions.submitCustomerChangeForm(data, id));
        },
        submitDeleteForm: (id) => {
            dispatch(Actions.submitCustomerDeleteForm(id));
        },

    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CustomersPage);