const rejectionHandler = (reason: Error, promise: Promise<any>) => {
    throw reason;
};

export default rejectionHandler;
