import React from "react";

import Item from "./Item";
import ItemSkeleton from "./ItemSkeleton";
import { ProductType } from "@/types/product";

interface IResponsiveColumns {
  desktop: number;
  tablet: number;
  mobile: number;
}
interface IProductCardListProps {
  title: string;
  column: IResponsiveColumns;
  data: ProductType[];
  children?: React.ReactNode;
  isPending?: boolean;
}

export default function ProductCardList({
  title,
  column,
  data,
  children,
  isPending = false,
}: IProductCardListProps) {
  return (
    <div className="flex flex-col justify-between gap-[20px]">
      <div className="grid h-fit max-w-full items-center gap-[12px] grid-cols-[1fr_auto_auto_auto] max-[720px]:grid-cols-[1fr_auto]">
        <h1 className="text-[20px] font-bold max-[720px]:col-[1/3] max-[720px]:row-[1]">
          {title}
        </h1>

        {children}
      </div>

      <div
        className="grid max-w-full gap-[24px] auto-rows-fr grid-cols-[repeat(var(--col-desktop),minmax(0,1fr))] max-[1280px]:grid-cols-[repeat(var(--col-tablet),minmax(0,1fr))] max-[720px]:grid-cols-[repeat(var(--col-mobile),minmax(0,1fr))]"
        style={
          {
            "--col-desktop": column?.desktop,
            "--col-tablet": column?.tablet,
            "--col-mobile": column?.mobile,
          } as React.CSSProperties
        }
      >
        {data.map((d) =>
          isPending ? (
            <ItemSkeleton key={d.id} />
          ) : (
            <Item data={d} key={d.id} />
          ),
        )}
      </div>
    </div>
  );
}
