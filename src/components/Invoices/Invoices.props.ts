import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IInvoice } from '../../interfaces/invoice.interface';

export interface IInvoicesProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	invoices: IInvoice[];
	date: string;
}
