import React, {Component} from 'react';
import {connect} from 'react-redux';

import ProductList from './ProductList';
import ProductAddForm from './ProductAddForm';
import ProductChangeForm from './ProductChangeForm';
import ProductDeleteForm from './ProductDeleteForm';
import EditPanel from '../../../shared/components/EditPanel';
import {Actions} from '../../../redux/products/AC';

import {Dispatch} from 'redux';
import {RootState} from '../../../redux/store';
import {ProductsRequestState} from '../../../redux/request/nested-states/products/states';
import {ProductDataForServer, ProductsState} from '../../../redux/products/states';

interface StateProps {
    products: ProductsState,
    productsRequests: ProductsRequestState,
}

interface DispatchProps {
    loadProducts(): void,
    submitAddForm(data: ProductDataForServer): void,
    submitChangeForm(data: ProductDataForServer, id: number): void,
    submitDeleteForm(id: number): void,
}

type Props = StateProps & DispatchProps;

interface State {
    isVisibleAddForm: boolean,
    isVisibleChangeForm: boolean,
    isVisibleDeleteForm: boolean,
}

class ProductsPage extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        };
    }

    public handleSubmitProductAddForm = (values: ProductDataForServer): void => {
        this.props.submitAddForm(values);
    };
    public handleSubmitProductChangeForm = (values: ProductDataForServer): void => {
        const {products: {activeProductId}, submitChangeForm} = this.props;

        if (activeProductId) {
            submitChangeForm(values, activeProductId);
        }
    };
    public handleSubmitProductDeleteForm = (evt: React.FormEvent<HTMLFormElement>): void => {
        const {products: {activeProductId}, submitDeleteForm} = this.props;

        evt.preventDefault();
        if (activeProductId) {
            submitDeleteForm(activeProductId);
        } else {
            this.handleButtonProductDeleteClick();
        }
    };
    public handleButtonProductAddClick = (): void => {
        this.setState({
            isVisibleAddForm: !this.state.isVisibleAddForm,
            isVisibleChangeForm: false,
            isVisibleDeleteForm: false,
        });
    };
    public handleButtonProductChangeClick = (): void => {
        this.setState({
            isVisibleChangeForm: !this.state.isVisibleChangeForm,
            isVisibleAddForm: false,
            isVisibleDeleteForm: false,
        });
    };
    public handleButtonProductDeleteClick = (): void => {
        this.setState({
            isVisibleDeleteForm: !this.state.isVisibleDeleteForm,
            isVisibleAddForm: false,
            isVisibleChangeForm: false,
        });
    };

    public render() {
        const {products: {activeProductId, data}, productsRequests, loadProducts} = this.props;
        const {isVisibleAddForm, isVisibleChangeForm, isVisibleDeleteForm} = this.state;
        const activeProduct = data.find(
            (elem) => elem.id === activeProductId
        );

        return (
            <section>
                <EditPanel
                    labelButton='product'
                    onAddButtonClick={this.handleButtonProductAddClick}
                    onChangeButtonClick={this.handleButtonProductChangeClick}
                    onDeleteButtonClick={this.handleButtonProductDeleteClick}
                    activeId={activeProductId}
                    formsState={{
                        isVisibleAddForm,
                        isVisibleChangeForm,
                        isVisibleDeleteForm,
                    }}
                />
                <ProductAddForm
                    isVisible={isVisibleAddForm}
                    isLoading={productsRequests.productsPost.loading}
                    errors={productsRequests.productsPost.errors}
                    onSubmit={this.handleSubmitProductAddForm}
                />
                <ProductChangeForm
                    isVisible={isVisibleChangeForm}
                    isLoading={productsRequests.productsPut.loading}
                    errors={productsRequests.productsPut.errors}
                    onSubmit={this.handleSubmitProductChangeForm}
                    activeProduct={activeProduct}
                />
                <ProductDeleteForm
                    isVisible={isVisibleDeleteForm}
                    isLoading={productsRequests.productsDelete.loading}
                    errors={productsRequests.productsDelete.errors}
                    name={activeProduct ? activeProduct.name : null}
                    handleSubmit={this.handleSubmitProductDeleteForm}
                />
                <h1>Products: </h1>
                <ProductList
                    productsRequest={productsRequests.productsGet}
                    productsData={data}
                    loadProducts={loadProducts}
                />
            </section>
        )
    }
}

const mapStateToProps = (state: RootState): StateProps => ({
    products: state.products,
    productsRequests: state.request.products,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        loadProducts: () => {
            dispatch(Actions.loadAllProducts());
        },
        submitAddForm: (data) => {
            dispatch(Actions.submitProductAddForm(data));
        },
        submitChangeForm: (data, id) => {
            dispatch(Actions.submitProductChangeForm(data, id));
        },
        submitDeleteForm: (id) => {
            dispatch(Actions.submitProductDeleteForm(id));
        },

    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ProductsPage);