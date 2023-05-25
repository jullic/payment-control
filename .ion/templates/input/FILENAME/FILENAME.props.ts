import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

export interface IFILENAMEProps
	extends DetailedHTMLProps<
		InputHTMLAttributes<HTMLInputElement>,
		HTMLInputElement
	> {
	children: ReactNode;
}
