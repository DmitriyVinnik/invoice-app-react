import React from 'react';
import PropTypes from 'prop-types';
import CustomerList from './CustomerList';
import CustomerAddForm from './CustomerAddForm';
import CustomerChangeForm from './CustomerChangeForm';
import CustomerDeleteForm from './CustomerDeleteForm';
import {connect} from 'react-redux';
import {
    loadAllCustomersStart, toggleCustomerAddForm, postCustomerAddForm, toggleCustomerChangeForm,
    putCustomerChangeForm, toggleCustomerDeleteForm, deleteCustomer,
} from "../AC";

function CustomerPanel(props) {
    const {
        customers, loadCustomers, postAddForm, toggleAddForm, toggleChangeForm, putChangeForm,
        toggleDeleteForm, deleteActiveCustomer,
        customers: {activeCustomerId, customerAddForm, customerChangeForm, customerDeleteForm}
    } = props;
    const handleSubmitCustomerAddForm = (values) => {
        postAddForm(values);
    };
    const handleSubmitCustomerChangeForm = (values) => {
        putChangeForm(values, activeCustomerId);
    };
    const handleSubmitCustomerDeleteForm = (evt) => {
        evt.preventDefault();
        deleteActiveCustomer(activeCustomerId);
    };
    const handleButtonCustomerAddClick = () => {
        toggleAddForm();
    };
    const handleButtonCustomerChangeClick = () => {
        toggleChangeForm();
    };
    const handleButtonCustomerDeleteClick = () => {
        toggleDeleteForm();
    };

    return (
        <section>
            <div>
                <button
                    type="button"
                    onClick={handleButtonCustomerAddClick}
                >
                    {customerAddForm.isVisible ? 'Close' : 'Add new customer'}
                </button>
                {activeCustomerId &&
                <button
                    type="button"
                    onClick={handleButtonCustomerChangeClick}
                >
                    {customerChangeForm.isVisible ? 'Close' : 'Change customer'}
                </button>}
                {activeCustomerId &&
                <button
                    type="button"
                    onClick={handleButtonCustomerDeleteClick}
                >
                    {customerChangeForm.isVisible ? 'Close' : 'Delete customer'}
                </button>}
            </div>
            <CustomerAddForm
                isVisible={customerAddForm.isVisible}
                isLoading={customerAddForm.isLoading}
                errorMessage={customerAddForm.errorMessage}
                onSubmit={handleSubmitCustomerAddForm}
            />
            <CustomerChangeForm
                isVisible={customerChangeForm.isVisible}
                isLoading={customerChangeForm.isLoading}
                errorMessage={customerChangeForm.errorMessage}
                onSubmit={handleSubmitCustomerChangeForm}
            />
            <CustomerDeleteForm
                isVisible={customerDeleteForm.isVisible}
                isLoading={customerDeleteForm.isLoading}
                errorMessage={customerDeleteForm.errorMessage}
                name={activeCustomerId ? customers.data.find(elem => elem.id === activeCustomerId).name : null}
                onSubmit={handleSubmitCustomerDeleteForm}
            />
            <CustomerList customers={customers} loadCustomers={loadCustomers}/>
        </section>
    )
}

CustomerPanel.propTypes = {
    loadCustomers: PropTypes.func.isRequired,
    toggleAddForm: PropTypes.func.isRequired,
    postAddForm: PropTypes.func.isRequired,
    toggleChangeForm: PropTypes.func.isRequired,
    putChangeForm: PropTypes.func.isRequired,
    toggleDeleteForm: PropTypes.func.isRequired,
    deleteActiveCustomer: PropTypes.func.isRequired,
    customers: PropTypes.shape({
        data: PropTypes.array.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isLoaded: PropTypes.bool.isRequired,
        errorLoadMessage: PropTypes.string.isRequired,
        activeCustomerId: PropTypes.number,
        customerAddForm: PropTypes.shape({
            isLoading: PropTypes.bool,
            isVisible: PropTypes.bool,
            errorMessage: PropTypes.string,
        }),
        customerChangeForm: PropTypes.shape({
            isLoading: PropTypes.bool,
            isVisible: PropTypes.bool,
            errorMessage: PropTypes.string,
        }),
        customerDeleteForm: PropTypes.shape({
            isLoading: PropTypes.bool,
            isVisible: PropTypes.bool,
            errorMessage: PropTypes.string,
        })
    })
};

const mapStateToProps = state => ({
    customers: state.customers,
});

const mapDispatchToProps = dispatch => (
    {
        loadCustomers: () => {
            dispatch(loadAllCustomersStart());
        },
        toggleAddForm: () => {
            dispatch(toggleCustomerAddForm());
        },
        postAddForm: (data) => {
            dispatch(postCustomerAddForm(data));
        },
        toggleChangeForm: () => {
            dispatch(toggleCustomerChangeForm());
        },
        putChangeForm: (data, id) => {
            dispatch(putCustomerChangeForm(data, id));
        },
        toggleDeleteForm: () => {
            dispatch(toggleCustomerDeleteForm());
        },
        deleteActiveCustomer: (id) => {
            dispatch(deleteCustomer(id));
        },

    }
);

export default connect(mapStateToProps, mapDispatchToProps)(CustomerPanel);