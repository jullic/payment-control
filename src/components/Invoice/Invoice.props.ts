import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IInvoice } from '../../interfaces/invoice.interface';

export interface IInvoiceProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	invoice: IInvoice;
}
