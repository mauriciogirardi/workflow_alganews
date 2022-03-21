import { useCallback, useState } from 'react';
import {
  Payment,
  PayrollService,
  Post,
} from 'mauricio.girardi-sdk';

export const usePayment = () => {
  const [posts, setPosts] = useState<Post.WithEarnings[]>(
    [],
  );
  const [payment, setPayment] =
    useState<Payment.Detailed>();

  const [fetchingPost, setFetchingPost] = useState(false);
  const [fetchingPayment, setFetchingPayment] =
    useState(false);

  const fetchPayment = useCallback(
    async (paymentId: number) => {
      try {
        setFetchingPayment(true);
        const payment =
          await PayrollService.getExistingPayment(
            paymentId,
          );
        setPayment(payment);
      } finally {
        setFetchingPayment(false);
      }
    },
    [],
  );

  const fetchPosts = useCallback(
    async (paymentId: number) => {
      try {
        setFetchingPost(true);
        const posts =
          await PayrollService.getExistingPaymentPosts(
            paymentId,
          );
        setPosts(posts);
      } finally {
        setFetchingPost(false);
      }
    },
    [],
  );

  return {
    fetchPayment,
    fetchPosts,
    fetchingPayment,
    fetchingPost,
    posts,
    payment,
  };
};
