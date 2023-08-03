import Skeleton from 'react-loading-skeleton';

export default function CardSkeleton() {
  return (
    <div className="product-item">
      <Skeleton height={200} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} width={100} />
      <div className="btm-group">
        <Skeleton height={20} width={50} />
        <Skeleton height={40} width={100} />
      </div>
    </div>
  );
}
