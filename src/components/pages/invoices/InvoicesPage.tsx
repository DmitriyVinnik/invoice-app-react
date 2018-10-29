import React from 'react';
import {connect} from "react-redux";
import {Actions} from "../../../redux/customers/AC";

import {RootState} from "../../../redux/store";
import {Dispatch} from "redux";
import {Customer, CustomersState} from "../../../redux/customers/states";
import {CustomersRequestState} from "../../../redux/request/nested-states/customers/states";

import {createStyles, StyleRules, Theme, WithStyles, withStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface StateProps {
    customers: CustomersState,
    customersRequests: CustomersRequestState,
}

interface DispatchProps {
    loadCustomers(): void,

    selectActiveCustomer(data: Customer[], id: number): void,
}

type Props = StateProps & DispatchProps & WithStyles<typeof styles>;

class InvoicesPage extends React.Component<Props> {
    public componentDidMount() {
        this.props.loadCustomers();
    }

    public handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {selectActiveCustomer, customers: {data}} = this.props;

        selectActiveCustomer(data, +event.target.value)
    };

    public render() {
        const {classes, customers: {activeCustomerId, data}} = this.props;
        const menuItems = data.map(customer => (
            <MenuItem
                value={customer.id}
                key={customer.id}
            >
                {customer.name}, id: {customer.id}
            </MenuItem>
        ));

        return (
            <div>
                <h1>Invoices: </h1>
                <form className={classes.root} autoComplete="off">
                    <span style={{paddingTop: '30px'}}>Select customer - </span>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="customers-select">Customer:</InputLabel>
                        <Select
                            value={activeCustomerId ? activeCustomerId : '0'}
                            onChange={this.handleChange}
                            inputProps={{
                                name: 'customers',
                                id: 'customers-select',
                            }}
                        >
                            <MenuItem value='0'>None</MenuItem>
                            {menuItems}
                        </Select>
                    </FormControl>
                </form>
            </div>
        );
    }
}

const styles = (theme: Theme): StyleRules => createStyles({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});


const mapStateToProps = (state: RootState): StateProps => ({
    customers: state.customers,
    customersRequests: state.request.customers,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        loadCustomers: () => {
            dispatch(Actions.loadAllCustomers());
        },
        selectActiveCustomer: (data, id) => {
            dispatch(Actions.selectCustomer(data, id));
        },
    }
);

export default withStyles(styles)(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(InvoicesPage)
);
