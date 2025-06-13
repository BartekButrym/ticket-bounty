import { initialTickets } from '@/data';

type TicketPageProps = {
	params: Promise<{
		ticketId: string;
	}>;
};

const TicketPage = async ({ params }: TicketPageProps) => {
	const { ticketId } = await params;

	const ticket = initialTickets.find((el) => el.id === ticketId);

	if (!ticket) {
		return <h2>Ticket not found</h2>;
	}

	return (
		<div>
			<h2 className='text-lg'>{ticket.title}</h2>

			<p className='text-sm'>{ticket.content}</p>
		</div>
	);
};

export default TicketPage;
