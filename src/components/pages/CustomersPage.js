import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CustomerList from '../CustomerList';
import CustomerAddForm from '../CustomerAddForm';
import CustomerChangeForm from '../CustomerChangeForm';
import CustomerDeleteForm from '../CustomerDeleteForm';
import EditPanel from '../EditPanel';

import {
    submitCustomerAddForm, submitCustomerChangeForm, submitCustomerDeleteForm,
    loadAllCustomers,
} from '../../redux/customers/AC'

class CustomersPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        };
    }

    handleSubmitCustomerAddForm = (values) => {
        this.props.submitAddForm(values);
    };
    handleSubmitCustomerChangeForm = (values) => {
        const {customers: {activeCustomerId}, submitChangeForm} = this.props;

        submitChangeForm(values, activeCustomerId);
    };
    handleSubmitCustomerDeleteForm = (evt) => {
        const {customers: {activeCustomerId}, submitDeleteForm} = this.props;

        evt.preventDefault();
        if (activeCustomerId) {
            submitDeleteForm(activeCustomerId);
        } else {
            this.handleButtonCustomerDeleteClick();
        }
    };
    handleButtonCustomerAddClick = () => {
        this.setState({
            isVisibleAddForm: !this.state.isVisibleAddForm,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        });
    };
    handleButtonCustomerChangeClick = () => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
            isVisibleAddForm: false,
            isVisibleDeleteForm: false,
        });
    };
    handleButtonCustomerDeleteClick = () => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
        });
    };

    render() {
        const {customers: {activeCustomerId, data}, customersRequests, loadCustomers} = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;

        return (
            <section>
                <EditPanel
                    onAddButtonClick={this.handleButtonCustomerAddClick}
                    onChangeButtonClick={this.handleButtonCustomerChangeClick}
                    onDeleteButtonClick={this.handleButtonCustomerDeleteClick}
                    activeId={activeCustomerId}
                    formsState={{
                        isVisibleAddForm: isVisibleAddForm,
                        isVisibleChangeForm: isVisibleChangeForm,
                        isVisibleDeleteForm: isVisibleDeleteForm,
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
                    name={
                        activeCustomerId ?
                            data.find(elem => elem.id === activeCustomerId).name :
                            null
                    }
                    onSubmit={this.handleSubmitCustomerDeleteForm}
                />
                <CustomerList
                    customersRequest={customersRequests.customersGet}
                    customersData={data}
                    loadCustomers={loadCustomers}
                />
            </section>
        )
    }

    static propTypes = {
        loadCustomers: PropTypes.func.isRequired,
        submitAddForm: PropTypes.func.isRequired,
        submitChangeForm: PropTypes.func.isRequired,
        submitDeleteForm: PropTypes.func.isRequired,
        customersRequests: PropTypes.shape({
            customersGet: PropTypes.shape({
                loading: PropTypes.bool,
                loaded: PropTypes.bool,
                errors: PropTypes.object,
            }),
            customersPost: PropTypes.shape({
                loading: PropTypes.bool,
                loaded: PropTypes.bool,
                errors: PropTypes.object,
            }),
            customersPut: PropTypes.shape({
                loading: PropTypes.bool,
                loaded: PropTypes.bool,
                errors: PropTypes.object,
            }),
            customersDelete: PropTypes.shape({
                loading: PropTypes.bool,
                loaded: PropTypes.bool,
                errors: PropTypes.object,
            }),
        }),
        customers: PropTypes.shape({
            activeCustomerId: PropTypes.number,
            data: PropTypes.array,
        }),
    };
}

const mapStateToProps = state => ({
    customers: state.customers,
    customersRequests: state.request.customers,
});

const mapDispatchToProps = dispatch => (
    {
        loadCustomers: () => {
            dispatch(loadAllCustomers());
        },
        submitAddForm: (data) => {
            dispatch(submitCustomerAddForm(data));
        },
        submitChangeForm: (data, id) => {
            dispatch(submitCustomerChangeForm(data, id));
        },
        submitDeleteForm: (id) => {
            dispatch(submitCustomerDeleteForm(id));
        },

    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomersPage);