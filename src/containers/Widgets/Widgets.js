import React, { useEffect, useState } from "react";
import clone from "clone";
import { Row, Col, DatePicker, Space } from "antd";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import basicStyle from "@iso/assets/styles/constants";
import IsoWidgetsWrapper from "./WidgetsWrapper";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import actions from "@iso/redux/dashboard/actions";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
import { LineChart } from "./Line";
import { BarChart } from "./BarChart";
import { PieChart } from "./PieChart";
import moment from "moment";
import InfoSpendingToWallet from "./InfoSpendingToWallet";
import ShoeInfo from "./ShoeInfo";
// import faker from "faker";
// import IsoWidgetBox from "./WidgetBox";
// import CardWidget from "./Card/CardWidget";
// import ProgressWidget from "./Progress/ProgressWidget";
// import SingleProgressWidget from "./Progress/ProgressSingle";
// import ReportsWidget from "./Report/ReportWidget";
// import StickerWidget from "./Sticker/StickerWidget";
// import SaleWidget from "./Sale/SaleWidget";
// import VCardWidget from "./vCard/vCardWidget";
// import SocialWidget from "./SocialWidget/SocialWidget";
// import SocialProfile from "./SocialWidget/SocialProfileIcon";
// import userpic from "@iso/assets/images/user1.png";
import { isServer } from "@iso/lib/helpers/isServer";
import { TableViews, tableinfos, dataList } from "../Tables/AntTables/AntTables";
import * as rechartConfigs from "../Charts/Recharts/config";
// import StackedAreaChart from "../Charts/Recharts/Charts/StackedAreaChart";
import GoogleChart, { Chart } from "react-google-charts";
import ActivityInfo from "./ActivityInfo";
// import * as googleChartConfigs from "../Charts/GoogleChart/config";
// import IntlMessages from "@iso/components/utility/intlMessages";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const { RangePicker } = DatePicker;
const tableDataList = clone(dataList);
tableDataList.size = 5;
const styles = {
  wisgetPageStyle: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    overflow: "hidden",
  },
};

export const formatMoney = (price) => {
  return (price = price ? (price / 10 ** 18).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : parseInt(price));
};

export const formatHee = (price) => (price = price ? Number((price / 10 ** 18).toFixed(2)) : parseInt(price));

export default function () {
  // const { rowStyle, colStyle } = basicStyle;
  const dispatch = useDispatch();
  const { dataMint, listDataHee, listDataInfoSpendingToWallet, dataShoeInfo, dataActivityInfo, dataActivityFee } = useSelector((state) => state.Dashboard);
  const [datePicker, setDatePicker] = useState([]);
  const dateFormat = "YYYY/MM/DD";
  // const { width } = useWindowSize();

  useEffect(() => {
    let currentDate;
    let prevDate;
    if (!datePicker.length) {
      currentDate = moment(Date.now()).format("YYYY-MM-DD");
      prevDate = moment(Date.now() - 1296000000).format("YYYY-MM-DD");
    } else {
      currentDate = datePicker[1];
      prevDate = datePicker[0];
    }

    const payload = {
      fromDate: prevDate,
      toDate: currentDate,
    };

    dispatch(actions.getHeeInfo(payload));

    dispatch(actions.getInfoSpendingToWallet(payload));
    dispatch(actions.getShoeInfo(payload));
    dispatch(actions.getActivityInfo(payload));
    dispatch(actions.getActivityFee(payload));
    dispatch(actions.getMintInfo(payload));
  }, [datePicker, dispatch]);

  const labels = listDataHee?.chart?.categories;
  const data = listDataHee?.chart?.series[0]?.data.map((series) => {
    return formatHee(series);
  });

  const totalHee = formatMoney(listDataHee?.total);

  const handleChangeDate = (date, event) => {
    const dates = date.map((d, i) => moment(d).format("YYYY-MM-DD"));
    setDatePicker(dates);
  };
  return (
    <LayoutWrapper style={{ overflow: "auto", background: "#17171a" }}>
      <div style={{ width: "100%" }}>
        <div>
          <RangePicker
            allowClear={false}
            style={{ padding: "8px 16px", borderRadius: "8px" }}
            onChange={handleChangeDate}
            dateRender={(current) => {
              const style = {};

              if (current.date() === 1) {
                style.border = "1px solid #1890ff";
                style.borderRadius = "50%";
              }

              return (
                <div className="ant-picker-cell-inner" style={style}>
                  {current.date()}
                </div>
              );
            }}
            defaultValue={[moment(moment(Date.now()), dateFormat), moment(moment(Date.now() - 1296000000), dateFormat)]}
          />
        </div>
        <div style={{ display: "flex", gap: "150px", marginTop: "35px", marginBottom: "35px" }}>
          <InfoSpendingToWallet listDataInfoSpendingToWallet={listDataInfoSpendingToWallet} />
          <ShoeInfo dataShoeInfo={dataShoeInfo} />
        </div>
        <div style={{ width: "95%", margin: "auto" }}>
          <LineChart data={data && data} labels={labels} totalHee={totalHee} />
        </div>
        <div style={{ display: "flex", gap: "60px", width: "90%", margin: "auto" }}>
          <PieChart dataActivityFee={dataActivityFee["HEE"]} label="ACTIVITY DATA FEE HEE" />
          <PieChart dataActivityFee={dataActivityFee["FIU"]} label="ACTIVITY DATA FEE FIU" />
        </div>
        <div>
          <h1 style={{ lineHeight: "50px", fontWeight: "bold", fontSize: "20px", color: "rgb(255, 255, 255)" }}>Information Activity</h1>
          <div style={{ width: "60%", margin: "auto", marginBottom: "100px" }}>
            <BarChart data={dataMint} />
          </div>
          <ActivityInfo dataActivityInfo={dataActivityInfo} />
        </div>
      </div>
    </LayoutWrapper>
  );
}

{
  /* <div style={styles.wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <ReportsWidget label={<IntlMessages id="widget.reportswidget.label" />} details={<IntlMessages id="widget.reportswidget.details" />}>
                {SIGNLE_PROGRESS_WIDGET.map((widget, idx) => (
                  <SingleProgressWidget
                    key={idx}
                    label={<IntlMessages id={widget.label} />}
                    percent={widget.percent}
                    barHeight={widget.barHeight}
                    status={widget.status}
                    info={widget.info} 
                  />
                ))}
              </ReportsWidget>
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={16} md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox>
                <TableViews.SimpleView tableInfo={tableinfos[0]} dataList={tableDataList} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          {STICKER_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
              <IsoWidgetsWrapper>
                <StickerWidget number={<IntlMessages id={widget.number} />} text={<IntlMessages id={widget.text} />} icon={widget.icon} fontColor={widget.fontColor} bgColor={widget.bgColor} />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          {SALE_WIDGET.map((widget, idx) => (
            <Col lg={6} md={12} sm={12} xs={24} style={colStyle} key={idx}>
              <IsoWidgetsWrapper>
                <SaleWidget label={<IntlMessages id={widget.label} />} price={<IntlMessages id={widget.price} />} details={<IntlMessages id={widget.details} />} fontColor={widget.fontColor} />
              </IsoWidgetsWrapper>
            </Col>
          ))}
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            {CARD_WIDGET.map((widget, idx) => (
              <IsoWidgetsWrapper key={idx} gutterBottom={20}>
                <CardWidget icon={widget.icon} iconcolor={widget.iconcolor} number={<IntlMessages id={widget.number} />} text={<IntlMessages id={widget.text} />} />
              </IsoWidgetsWrapper>
            ))}
          </Col>

          <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
            {PROGRESS_WIDGET.map((widget, idx) => (
              <IsoWidgetsWrapper key={idx} gutterBottom={20}>
                <ProgressWidget
                  label={<IntlMessages id={widget.label} />}
                  details={<IntlMessages id={widget.details} />}
                  icon={widget.icon}
                  iconcolor={widget.iconcolor}
                  percent={widget.percent}
                  barHeight={widget.barHeight}
                  status={widget.status}
                />
              </IsoWidgetsWrapper>
            ))}
          </Col>

          <Col lg={12} md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={448} style={{ overflow: "hidden" }}>
                <StackedAreaChart {...stackConfig} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470} style={{ overflow: "hidden" }}>
                <GoogleChart {...googleChartConfigs.BarChart} chartEvents={chartEvents} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={470} style={{ overflow: "hidden" }}>
                <GoogleChart {...googleChartConfigs.Histogram} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>

        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <VCardWidget
                style={{ height: "450px" }}
                src={userpic}
                alt="Jhon"
                name={<IntlMessages id="widget.vcardwidget.name" />}
                title={<IntlMessages id="widget.vcardwidget.title" />}
                description={<IntlMessages id="widget.vcardwidget.description" />}
              >
                <SocialWidget>
                  {SOCIAL_PROFILE.map((profile, idx) => (
                    <SocialProfile key={idx} url={profile.url} icon={profile.icon} iconcolor={profile.iconcolor} />
                  ))}
                </SocialWidget>
              </VCardWidget>
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={8} md={12} sm={12} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={450} style={{ overflow: "hidden" }}>
                <GoogleChart {...googleChartConfigs.TrendLines} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>

          <Col lg={8} md={24} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox height={450} style={{ overflow: "hidden" }}>
                <GoogleChart {...googleChartConfigs.ComboChart} />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </div> */
}
