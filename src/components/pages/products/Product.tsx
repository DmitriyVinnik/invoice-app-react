import React from 'react';
import {connect} from 'react-redux';
import {Actions} from '../../../redux/products/AC';

import {Dispatch} from 'redux';
import {Product as ProductInterface} from '../../../redux/products/states';
import {RootState} from '../../../redux/store';

type OwnProps = ProductInterface

interface StateProps {
    activeProductId: number | null,
    productsData: ProductInterface[],
}

interface DispatchProps {
    selectActiveProduct(data: ProductInterface[], id: number): void,
    resetSelectionActiveProduct(): void,
}

type Props = StateProps & DispatchProps & OwnProps

const Product:React.SFC<Props> = (props: Props) => {
    const {
        id, name, price, activeProductId, productsData,
        resetSelectionActiveProduct, selectActiveProduct,
    } = props;
    const onClickProduct = (): void => {
        selectActiveProduct(productsData, id);
    };
    const isProductActive = activeProductId === id;
    const onReClickProduct = (): void => {
        resetSelectionActiveProduct();
    };
    const productStyle: React.CSSProperties = isProductActive ?
        {color: 'green', paddingBottom: '20px', cursor: 'pointer'} :
        {paddingBottom: '20px', cursor: 'pointer'};

    return (
        <li onClick={!isProductActive ? onClickProduct : onReClickProduct} style={productStyle}>
            <ul style={{listStyle: 'none'}}>
                <li>Name: {name}, id: {id}</li>
                <li>Price: {price}</li>
            </ul>
        </li>
    );
};

const mapStateToProps = (state: RootState): StateProps => ({
    activeProductId: state.products.activeProductId,
    productsData: state.products.data,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchProps => (
    {
        selectActiveProduct: (data, id) => {
            dispatch(Actions.selectProduct(data, id));
        },
        resetSelectionActiveProduct: () => {
            dispatch(Actions.resetSelectionProduct());
        },
    }
);

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Product)