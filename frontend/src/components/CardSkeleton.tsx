import Skeleton from "react-loading-skeleton";
import CardSkeletonStyle from "./CardSkeleton.module.css";

export const CardSkeleton = () => {
  return (
    <>
      <div className={CardSkeletonStyle.div}>
        <Skeleton className={CardSkeletonStyle.button} />
        <Skeleton className={CardSkeletonStyle.button} />
        <Skeleton className={CardSkeletonStyle.label} />
        <Skeleton className={CardSkeletonStyle.input} />
        <Skeleton className={CardSkeletonStyle.label} />
        <Skeleton className={CardSkeletonStyle.input} />
        <Skeleton className={CardSkeletonStyle.label} />
        <Skeleton className={CardSkeletonStyle.input} />
        <Skeleton className={CardSkeletonStyle.button} />
      </div>
    </>
  );
};
