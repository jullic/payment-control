import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface I$FILENAMEProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	children: ReactNode;
}
