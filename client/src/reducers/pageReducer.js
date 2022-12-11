const page = (state = 0, {type, payload}) => {
    switch (type) {
        case 'PAGE':
            if (payload !== null) {
                return payload;
            }
            return state;
        default:
            return state;
    }
};

export default page;
