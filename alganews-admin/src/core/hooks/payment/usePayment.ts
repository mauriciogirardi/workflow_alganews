import { useCallback, useState } from 'react';
import {
  Payment,
  PayrollService,
  Post,
} from 'mauricio.girardi-sdk';
import { ResourceNotFoundError } from 'mauricio.girardi-sdk/dist/errors';

export const usePayment = () => {
  const [notFound, setNotFound] = useState(false);
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
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          setNotFound(true);
          return;
        }
        throw err;
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
      } catch (err) {
        if (err instanceof ResourceNotFoundError) {
          setNotFound(true);
          return;
        }
        throw err;
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
    notFound,
  };
};
