import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IFILENAMEProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLHeadingElement>,
		HTMLHeadingElement
	> {
	children: ReactNode;
}
