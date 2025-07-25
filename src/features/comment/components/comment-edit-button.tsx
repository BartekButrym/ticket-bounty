import Link from 'next/link';

import { Pencil } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { commentEditPath } from '@/path';

type CommentEditButtonProps = {
  ticketId: string;
  commentId: string;
};

const CommentEditButton = ({ ticketId, commentId }: CommentEditButtonProps) => (
  <Button asChild size="icon" variant="outline">
    <Link prefetch href={commentEditPath(ticketId, commentId)}>
      <Pencil className="h-4 w-4" />
    </Link>
  </Button>
);

export { CommentEditButton };
