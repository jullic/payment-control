export interface IInvoice {
	id: number;
	myCompany: string;
	name: string;
	inn: string;
	startDate: string;
	invoiceNumber: string;
	sum: string;
	nds: string;
	status: 'invoice' | 'paid';
	timeout: string;
	lastDate: string;
}
