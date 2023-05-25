export const getDateByNumber = (value: number) => {
	const date = new Date(value)
		.toLocaleString('ru')
		.split(', ')[0]
		.replace(/\./gim, '-')
		.split('-')
		.reverse()
		.join('-');
	return date;
};

export const getPlusTime = (range: number) => {
	return 1000 * 60 * 60 * 24 * range;
};

export const getDateWithRange = (range: number) => {
	const today = new Date().getTime();
	const days = getPlusTime(range);
	const currentDay = new Date(today + days);
	return currentDay;
};

export const getDateBySplit = (date: string, split: string = '-') => {
	const [year, month, day] = date.split(split);
	const newDate = new Date(+year, +month - 1, +day);
	return newDate;
};
