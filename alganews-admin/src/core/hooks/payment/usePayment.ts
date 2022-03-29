import { useCallback, useState } from 'react';
import { Payment, PayrollService, Post } from 'mauricio.girardi-sdk';
import { ResourceNotFoundError } from 'mauricio.girardi-sdk/dist/errors';

export const usePayment = () => {
  const [posts, setPosts] = useState<Post.WithEarnings[]>([]);
  const [payment, setPayment] = useState<Payment.Detailed>();
  const [paymentPreview, setPaymentPreview] = useState<Payment.Preview>();

  const [fetchingPosts, setFetchingPosts] = useState(false);
  const [fetchingPayment, setFetchingPayment] = useState(false);
  const [approvingPayment, setApprovingPayment] = useState(false);
  const [fetchingSchedulePayment, setFetchingSchedulePayment] = useState(false);
  const [fetchingPaymentPreview, setFetchingPaymentPreview] = useState(false);

  const [paymentNotFound, setPaymentNotFound] = useState(false);
  const [postsNotFound, setPostsNotFound] = useState(false);

  const fetchPayment = useCallback(async (paymentId: number) => {
    try {
      setFetchingPayment(true);
      const payment = await PayrollService.getExistingPayment(paymentId);
      setPayment(payment);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setPaymentNotFound(true);
        return;
      }
      throw error;
    } finally {
      setFetchingPayment(false);
    }
  }, []);

  const approvePayment = useCallback(async (paymentId: number) => {
    try {
      setApprovingPayment(true);
      await PayrollService.approvePayment(paymentId);
    } finally {
      setApprovingPayment(false);
    }
  }, []);

  const fetchPosts = useCallback(async (paymentId: number) => {
    try {
      setFetchingPosts(true);
      const posts = await PayrollService.getExistingPaymentPosts(paymentId);
      setPosts(posts);
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        setPostsNotFound(true);
        return;
      }
      throw error;
    } finally {
      setFetchingPosts(false);
    }
  }, []);

  const fetchPaymentPreview = useCallback(
    async (paymentPreview: Payment.PreviewInput) => {
      try {
        setFetchingPaymentPreview(true);
        const preview = await PayrollService.getPaymentPreview(paymentPreview);
        setPaymentPreview(preview);
      } finally {
        setFetchingPaymentPreview(false);
      }
    },
    [],
  );

  const schedulePayment = useCallback(async (paymentInput: Payment.Input) => {
    try {
      setFetchingSchedulePayment(true);
      await PayrollService.insertNewPayment(paymentInput);
    } finally {
      setFetchingSchedulePayment(false);
    }
  }, []);

  const clearPaymentPreview = useCallback(() => {
    setPaymentPreview(undefined);
  }, []);

  return {
    posts,
    payment,
    fetchPosts,
    fetchPayment,
    fetchingPosts,
    postsNotFound,
    paymentPreview,
    approvePayment,
    schedulePayment,
    fetchingPayment,
    paymentNotFound,
    approvingPayment,
    fetchPaymentPreview,
    clearPaymentPreview,
    fetchingPaymentPreview,
    fetchingSchedulePayment,
  };
};
