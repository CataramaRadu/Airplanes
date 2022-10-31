export function getGameDurationFromDate(startTime, endTime) {
    return (endTime.getTime() - startTime.getTime()) / 1000;
}