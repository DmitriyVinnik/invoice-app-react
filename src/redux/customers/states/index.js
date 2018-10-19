const customersState = {
    data: [],
    isLoading: false,
    isLoaded: false,
    errorLoadMessage: '',
    activeCustomerId: null,
    customerAddForm: {
        isVisible: false,
        isLoading: false,
        errorMessage: '',
    },
    customerChangeForm: {
        isVisible: false,
        isLoading: false,
        errorMessage: '',
    },
    customerDeleteForm: {
        isVisible: false,
        isLoading: false,
        errorMessage: '',
    },
};

export default customersState;
