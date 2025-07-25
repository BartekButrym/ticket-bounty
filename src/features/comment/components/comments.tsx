'use client';

import { useState } from 'react';

import { CardCompact } from '@/components/card-compact';
import type { PaginatedData } from '@/components/pagination/types';
import { Button } from '@/components/ui/button';
import { CommentWithMetadata } from '@/features/comment/types';

import { getComments } from '../queries/get-comments';
import { CommentDeleteButton } from './comment-delete-button';
import { CommentEditButton } from './comment-edit-button';
import { CommentItem } from './comment-item';
import { CommentUpsertForm } from './comment-upsert-form';

type CommentsProps = {
  ticketId: string;
  paginatedComments: PaginatedData<CommentWithMetadata>;
};

export const Comments = ({ ticketId, paginatedComments }: CommentsProps) => {
  const [comments, setComments] = useState(paginatedComments.list);
  const [metadata, setMetadata] = useState(paginatedComments.metadata);

  const handleMore = async () => {
    const morePaginatedComments = await getComments(ticketId, metadata.cursor);
    const moreComments = morePaginatedComments.list;

    setComments([...comments, ...moreComments]);
    setMetadata(morePaginatedComments.metadata);
  };

  const handleDeleteComment = (id: string) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== id)
    );
  };

  const handleCreateComment = (comment: CommentWithMetadata | undefined) => {
    if (!comment) return;

    setComments((prevComments) => [comment, ...prevComments]);
  };

  return (
    <>
      <CardCompact
        title="Create comment"
        description="A new comment will be created"
        content={
          <CommentUpsertForm
            ticketId={ticketId}
            onCreateComment={handleCreateComment}
          />
        }
      />

      <div className="flex flex-col gap-y-2 ml-8">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            buttons={[
              ...(comment.isOwner
                ? [
                    <CommentDeleteButton
                      key="0"
                      id={comment.id}
                      onDeleteComment={handleDeleteComment}
                    />,
                    <CommentEditButton
                      key="1"
                      ticketId={ticketId}
                      commentId={comment.id}
                    />,
                  ]
                : []),
            ]}
          />
        ))}
      </div>

      <div className="flex flex-col justify-center ml-8">
        {metadata.hasNextPage && (
          <Button variant="ghost" onClick={handleMore}>
            More
          </Button>
        )}
      </div>
    </>
  );
};
