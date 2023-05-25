import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IFILENAMEProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLUListElement>,
		HTMLUListElement
	> {
	children: ReactNode;
}
