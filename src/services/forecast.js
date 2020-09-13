const wait = (time = 200) => new Promise((resolve) => {
    setTimeout(() => resolve(), time);
});

export const createService = () => {
    return {
        async saveForecastForItem(itemId, forecast) {
            // should be the remote call `POST /forecast` etc, here mimic the round trip
            console.log(`saving forecast ${JSON.stringify(forecast)} for Item id ${itemId}`);
            await wait();
        }
    };
};

export default createService();
