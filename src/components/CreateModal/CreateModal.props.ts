import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ISupplier } from '../../interfaces/supplier.interface';

export interface ICreateModalProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	supplier: ISupplier | null;
}
