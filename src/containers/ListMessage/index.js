import React, { useEffect, useState, lazy } from "react";
import useWindowSize from "@iso/lib/hooks/useWindowSize";

import { Pagination } from "antd";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// actions
import actions from "@iso/redux/notification/actions";

import ListTable from "./ListTable/ListTable";
import CartList from "./CardListNoti";
const layoutContent = lazy(() => import("@iso/components/utility/layoutContent"));
const LayoutContentWrapper = lazy(() => import("@iso/components/utility/layoutWrapper"));

export default function ListMessage() {
  const [pages, setPages] = useState(1);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const { listNoti, totalNoti } = useSelector((state) => state.Noti);

  console.log("duwqeourwq", width);

  useEffect(() => {
    dispatch(
      actions.getListNotifications({
        limit: 20,
        page: pages,
        channel: null,
        notifyType: null,
        segment: null,
        title: null,
        status: null,
      })
    );
  }, [pages]);

  return (
    <LayoutContentWrapper>
      <layoutContent style={{ width: "100%" }}>
        {width > 400 ? <ListTable dataSource={listNoti} /> : <CartList dataSource={listNoti} />}
        <Pagination
          responsive={width <= 400}
          style={{ textAlign: "center", margin: "10px 0" }}
          defaultCurrent={1}
          pageSize={20}
          total={totalNoti}
          showSizeChanger={false}
          onChange={(currentPage) => setPages(currentPage)}
        />
      </layoutContent>
    </LayoutContentWrapper>
  );
}
