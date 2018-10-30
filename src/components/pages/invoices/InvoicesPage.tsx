import React, {Component} from 'react';
import {connect} from 'react-redux';

import InvoicesList from './InvoicesList';
import InvoiceAddForm from './InvoiceAddForm';
import InvoiceChangeForm from './InvoiceChangeForm';
import InvoiceDeleteForm from './InvoiceDeleteForm';
import EditPanel from '../../../shared/components/EditPanel';
import CustomerSelectElement from '../../../shared/components/CustomerSelectElement';
import {Actions} from '../../../redux/invoices/AC';

import {Dispatch} from 'redux';
import {RootState} from '../../../redux/store';
import {InvoicesRequestState} from '../../../redux/request/nested-states/invoices/states';
import {InvoiceDataForServer, InvoicesState} from '../../../redux/invoices/states';
import {CustomersState} from "../../../redux/customers/states";

interface StateProps {
    invoices: InvoicesState,
    invoicesRequests: InvoicesRequestState,
    customers: CustomersState,
}

interface DispatchProps {
    loadInvoices(): void,

    submitAddForm(data: InvoiceDataForServer): void,

    submitChangeForm(data: InvoiceDataForServer, id: number): void,

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

    public handleSubmitInvoiceAddForm = (values: InvoiceDataForServer): void => {
        this.props.submitAddForm(values);
    };
    public handleSubmitInvoiceChangeForm = (values: InvoiceDataForServer): void => {
        const {invoices: {activeInvoiceId}, submitChangeForm} = this.props;

        if (activeInvoiceId) {
            submitChangeForm(values, activeInvoiceId);
        }
    };
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
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        });
    };
    public handleButtonInvoiceChangeClick = (): void => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
            isVisibleAddForm: false,
            isVisibleDeleteForm: false,
        });
    };
    public handleButtonInvoiceDeleteClick = (): void => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
        });
    };

    public render() {
        const {
            invoices: {activeInvoiceId, data}, invoicesRequests, loadInvoices,
            customers: {activeCustomerId},
        } = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
        const activeInvoice = data.find(
            (elem) => elem.id === activeInvoiceId
        );

        return (
            <div>
                <h1>Invoices: </h1>
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
                        onSubmit={this.handleSubmitInvoiceAddForm}
                        activeCustomerId={activeCustomerId}
                    />
                    <InvoiceChangeForm
                        isVisible={isVisibleChangeForm}
                        isLoading={invoicesRequests.invoicesPut.loading}
                        errors={invoicesRequests.invoicesPut.errors}
                        onSubmit={this.handleSubmitInvoiceChangeForm}
                        activeInvoice={activeInvoice}
                    />
                    <InvoiceDeleteForm
                        isVisible={isVisibleDeleteForm}
                        isLoading={invoicesRequests.invoicesDelete.loading}
                        errors={invoicesRequests.invoicesDelete.errors}
                        id={activeInvoice ? activeInvoice.id : null}
                        handleSubmit={this.handleSubmitInvoiceDeleteForm}
                    />
                    <InvoicesList
                        invoicesRequest={invoicesRequests.invoicesGet}
                        invoicesData={data}
                        activeCustomerId={activeCustomerId}
                        loadInvoices={loadInvoices}
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

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        loadInvoices: () => {
            dispatch(Actions.loadAllInvoices());
        },
        submitAddForm: (data) => {
            dispatch(Actions.submitInvoiceAddForm(data));
        },
        submitChangeForm: (data, id) => {
            dispatch(Actions.submitInvoiceChangeForm(data, id));
        },
        submitDeleteForm: (id) => {
            dispatch(Actions.submitInvoiceDeleteForm(id));
        },

    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoicesPage);