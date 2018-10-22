import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CustomerList from '../CustomerList';
import CustomerAddForm from '../CustomerAddForm';
import CustomerChangeForm from '../CustomerChangeForm';
import CustomerDeleteForm from '../CustomerDeleteForm';
import EditPanel from '../EditPanel';

import {
    toggleCustomerAddForm, toggleCustomerChangeForm, toggleCustomerDeleteForm,
    submitCustomerAddForm, submitCustomerChangeForm, submitCustomerDeleteForm,
    loadAllCustomers,
} from '../../redux/customers/AC'

function CustomersPage(props) {
    const { state,
        customersRequests, loadCustomers,
        toggleDeleteForm, toggleAddForm, toggleChangeForm,
        submitAddForm, submitDeleteForm, submitChangeForm,
        customers: {activeCustomerId, isVisible, data }
    } = props;
    const handleSubmitCustomerAddForm = (values) => {
        submitAddForm(values);
    };
    const handleSubmitCustomerChangeForm = (values) => {
        submitChangeForm(values, activeCustomerId);
    };
    const handleSubmitCustomerDeleteForm = (evt) => {
        evt.preventDefault();
        submitDeleteForm(activeCustomerId);
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
console.log(state)
    return (
        <section>
            <EditPanel
                onAddButtonClick={handleButtonCustomerAddClick}
                onChangeButtonClick={handleButtonCustomerChangeClick}
                onDeleteButtonClick={handleButtonCustomerDeleteClick}
                activeId={activeCustomerId}
                formsState={{
                    isVisibleAddForm: isVisible.addForm,
                    isVisibleChangeForm: isVisible.changeForm,
                    isVisibleDeleteForm: isVisible.deleteForm,
                }}
            />
            <CustomerAddForm
                isVisible={isVisible.addFrom}
                isLoading={customersRequests.customersPost.loading}
                errors={customersRequests.customersPost.errors}
                onSubmit={handleSubmitCustomerAddForm}
            />
            <CustomerChangeForm
                isVisible={isVisible.changeForm}
                isLoading={customersRequests.customersPut.loading}
                errors={customersRequests.customersPut.errors}
                onSubmit={handleSubmitCustomerChangeForm}
            />
            <CustomerDeleteForm
                isVisible={isVisible.deleteForm}
                isLoading={customersRequests.customersDelete.loading}
                errors={customersRequests.customersDelete.errors}
                name={
                    activeCustomerId ?
                        data.find(elem => elem.id === activeCustomerId).name :
                        null
                }
                onSubmit={handleSubmitCustomerDeleteForm}
            />
            <CustomerList
                customersRequest={customersRequests.customersGet}
                customersData={data}
                loadCustomers={loadCustomers}
            />
        </section>
    )
}

CustomersPage.propTypes = {
    loadCustomers: PropTypes.func.isRequired,
    toggleAddForm: PropTypes.func.isRequired,
    toggleChangeForm: PropTypes.func.isRequired,
    toggleDeleteForm: PropTypes.func.isRequired,
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
        isVisible: PropTypes.objectOf(PropTypes.bool),
        data: PropTypes.array,
    }),
};

const mapStateToProps = state => ({
    customers: state.customers,
    customersRequests: state.request.customers,
    state,
});

const mapDispatchToProps = dispatch => (
    {
        loadCustomers: () => {
            dispatch(loadAllCustomers());
        },
        toggleAddForm: () => {
            dispatch(toggleCustomerAddForm());
        },
        toggleChangeForm: () => {
            dispatch(toggleCustomerChangeForm());
        },
        toggleDeleteForm: () => {
            dispatch(toggleCustomerDeleteForm());
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