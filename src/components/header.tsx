import { Kanban } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { homePath, ticketsPath } from '@/path';

export const Header = () => {
	return (
		<nav
			className='
        supports-backdrop-blur:bg-background/60
        fixed left-0 right-0 top-0 z-20
        border-b bg-background/95 backdrop-blur
        w-full flex py-2.5 px-5 justify-between
      '
		>
			<div>
				<Link href={homePath()} className={buttonVariants({ variant: 'ghost' })}>
					<Kanban />
					<h1 className='text-lg font-semibold'>TicketBounty</h1>
				</Link>
			</div>
			<div>
				<Link href={ticketsPath()} className={buttonVariants({ variant: 'default' })}>
					Tickets
				</Link>
			</div>
		</nav>
	);
};
