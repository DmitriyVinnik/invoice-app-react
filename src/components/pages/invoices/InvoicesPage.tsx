import React, {Component} from 'react';
import {connect} from 'react-redux';

import InvoicesList from './InvoicesList';
import InvoiceAddForm from './InvoiceAddForm';
import InvoiceChangeForm from './InvoiceChangeForm';
import InvoiceDeleteForm from './InvoiceDeleteForm';
import EditPanel from '../../../shared/components/EditPanel';
import CustomerSelectElement from './CustomerSelectElement';

import {Actions} from '../../../redux/invoices/AC';
import * as productsActions from '../../../redux/products/AC';


import {Dispatch} from 'redux';
import {RootState} from '../../../redux/store';
import {InvoicesRequestState} from '../../../redux/request/nested-states/invoices/states';
import {InvoicesState} from '../../../redux/invoices/states';
import {CustomersState} from "../../../redux/customers/states";

interface StateProps {
    invoices: InvoicesState,
    invoicesRequests: InvoicesRequestState,
    customers: CustomersState,
}

interface DispatchProps {
    loadProducts(): void,
    loadInvoices(): void,
    submitDeleteForm(id: number): void,
}

type Props = StateProps & DispatchProps;

interface State {
    isVisibleAddForm: boolean,
    isVisibleChangeForm: boolean,
    isVisibleDeleteForm: boolean,
}

class InvoicesPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        };
    }

    public componentDidUpdate (prevProps: Props) {
        if (prevProps.customers.activeCustomerId !== this.props.customers.activeCustomerId) {
            this.setState({
                isVisibleAddForm: false,
                isVisibleChangeForm: false,
                isVisibleDeleteForm: false,
            })
        }
    }

    public handleSubmitInvoiceDeleteForm = (evt: React.FormEvent<HTMLFormElement>): void => {
        const {invoices: {activeInvoiceId}, submitDeleteForm} = this.props;

        evt.preventDefault();
        if (activeInvoiceId) {
            submitDeleteForm(activeInvoiceId);
        } else {
            this.handleButtonInvoiceDeleteClick();
        }
    };
    public handleButtonInvoiceAddClick = (): void => {
        this.setState({
            isVisibleAddForm: !this.state.isVisibleAddForm,
        });
    };
    public handleButtonInvoiceChangeClick = (): void => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
        });
    };
    public handleButtonInvoiceDeleteClick = (): void => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
        });
    };

    public render() {
        const {
            invoices: {activeInvoiceId}, invoicesRequests, invoices,
            loadInvoices, loadProducts,
            customers: {activeCustomerId},
        } = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
        const activeInvoice = invoices.data.find(
            (elem) => elem.id === activeInvoiceId
        );

        return (
            <div>
                <h1 className='main-heading'>Invoices: </h1>
                <CustomerSelectElement/>
                {activeCustomerId && <section>
                    <EditPanel
                        labelButton='invoice'
                        onAddButtonClick={this.handleButtonInvoiceAddClick}
                        onChangeButtonClick={this.handleButtonInvoiceChangeClick}
                        onDeleteButtonClick={this.handleButtonInvoiceDeleteClick}
                        activeId={activeInvoiceId}
                        formsState={{
                            isVisibleAddForm,
                            isVisibleChangeForm,
                            isVisibleDeleteForm,
                        }}
                    />
                    <InvoiceAddForm
                        isVisible={isVisibleAddForm}
                        isLoading={invoicesRequests.invoicesPost.loading}
                        errors={invoicesRequests.invoicesPost.errors}
                        activeCustomerId={activeCustomerId}
                    />
                    {activeInvoice && <InvoiceChangeForm
                        isVisible={isVisibleChangeForm}
                        isLoading={invoicesRequests.invoicesPut.loading}
                        errors={invoicesRequests.invoicesPut.errors}
                        activeInvoice={activeInvoice}
                        activeCustomerId={activeCustomerId}
                    />}
                    {activeInvoice && <InvoiceDeleteForm
                        isVisible={isVisibleDeleteForm}
                        isLoading={invoicesRequests.invoicesDelete.loading}
                        errors={invoicesRequests.invoicesDelete.errors}
                        id={activeInvoice.id}
                        handleSubmit={this.handleSubmitInvoiceDeleteForm}
                    />}
                    <InvoicesList
                        invoicesRequest={invoicesRequests.invoicesGet}
                        invoicesData={invoices.data}
                        activeCustomerId={activeCustomerId}
                        loadInvoices={loadInvoices}
                        loadProducts={loadProducts}
                    />
                </section>}
            </div>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    invoices: state.invoices,
    customers: state.customers,
    invoicesRequests: state.request.invoices,
});

const mapDispatchToProps = (
    dispatch: Dispatch<Actions | productsActions.Actions>
): DispatchProps => (
    {
        loadInvoices: () => {
            dispatch(Actions.loadAllInvoices());
        },
        loadProducts: () => {
            dispatch(productsActions.Actions.loadAllProducts());
        },
        submitDeleteForm: (id) => {
            dispatch(Actions.submitInvoiceDeleteForm(id));
        },

    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoicesPage);