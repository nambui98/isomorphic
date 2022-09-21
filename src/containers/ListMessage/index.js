import React, { useEffect, useState, lazy } from "react";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import LazyLoadingSpin from "@iso/components/LazyLoadingSpin";
import { Pagination, Button } from "antd";
import PageHeader from "@iso/components/utility/pageHeader";
import CardWrapper, { Box, StatusTag } from "@iso/containers/Invoice/Invoice.styles";
import { Link, useRouteMatch } from "react-router-dom";
// react-redux
import { useDispatch, useSelector } from "react-redux";

// actions
import actions from "@iso/redux/notification/actions";

import ListTable from "./ListTable/ListTable";
import CartList from "./CardListNoti";
import SearchListMessage from "./Search";

const layoutContent = lazy(() => import("@iso/components/utility/layoutContent"));
const LayoutContentWrapper = lazy(() => import("@iso/components/utility/layoutWrapper"));

export default function ListMessage() {
  const [pages, setPages] = useState(1);
  const { width } = useWindowSize();
  const dispatch = useDispatch();

  const { listNoti, totalNoti, isLoading, bodySearch } = useSelector((state) => state.Noti);

  useEffect(() => {
    dispatch(
      actions.getListNotifications({
        limit: 8,
        page: pages,
        ...bodySearch,
      })
    );
  }, [bodySearch, pages]);

  return (
    <LayoutContentWrapper>
      <layoutContent style={{ width: "100%" }}>
        <PageHeader>List Notification</PageHeader>
        <SearchListMessage setPages={setPages} />
        <LazyLoadingSpin loading={isLoading}>
          <Box>
            <div className="isoInvoiceTableBtn">
              <Link to="In-AppMessaging">
                <Button type="primary" className="mateAddInvoiceBtn">
                  Push Notification
                </Button>
              </Link>
            </div>
            {width > 400 ? <ListTable dataSource={listNoti} /> : <CartList dataSource={listNoti} />}
          </Box>
        </LazyLoadingSpin>
        <Pagination
          responsive={width <= 400}
          style={{ textAlign: "center", margin: "10px 0" }}
          defaultCurrent={1}
          pageSize={8}
          current={pages}
          total={totalNoti}
          showSizeChanger={false}
          onChange={(currentPage) => setPages(currentPage)}
        />
      </layoutContent>
    </LayoutContentWrapper>
  );
}
