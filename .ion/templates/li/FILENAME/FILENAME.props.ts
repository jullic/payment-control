import { DetailedHTMLProps, LiHTMLAttributes, ReactNode } from 'react';

export interface IFILENAMEProps
	extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
	children: ReactNode;
}
