import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface IFILENAMEProps
	extends DetailedHTMLProps<
		HTMLAttributes<HTMLParagraphElement>,
		HTMLParagraphElement
	> {
	children: ReactNode;
}
