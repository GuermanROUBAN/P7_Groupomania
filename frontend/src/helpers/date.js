


function dateTimeFormat(dateString) {
const [date, time] = new Intl.DateTimeFormat('br-FR', {
	day: 'numeric',
	month: 'numeric',
	year: 'numeric',
	hour: 'numeric',
	minute: 'numeric',
	hour12: false
}).format(new Date(dateString)).split(', ');

const dateParts = date.split('/');

	[dateParts[0], dateParts[1]];

return `${dateParts.join('/')} ${time}`
}

export default dateTimeFormat
