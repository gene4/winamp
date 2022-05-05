const formatNumber = (number) => {
    return number < 0 ? `0${number}` : number;
};

export function formatTime(trackTime) {
    let minutes = Math.floor(trackTime / 60000);
    let seconds = ((trackTime % 60000) / 1000).toFixed(0);

    return `${formatNumber(minutes)}:${formatNumber(seconds)}`;
}
