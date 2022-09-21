import React, { useEffect, useState } from "react";
import clone from "clone";
import { Row, Col } from "antd";
import LayoutWrapper from "@iso/components/utility/layoutWrapper";
import basicStyle from "@iso/assets/styles/constants";
import IsoWidgetsWrapper from "./WidgetsWrapper";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import actions from "@iso/redux/dashboard/actions";
import useWindowSize from "@iso/lib/hooks/useWindowSize";
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
// import * as googleChartConfigs from "../Charts/GoogleChart/config";
// import IntlMessages from "@iso/components/utility/intlMessages";

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
const SIGNLE_PROGRESS_WIDGET = [
  {
    label: "widget.singleprogresswidget1.label",
    percent: 70,
    barHeight: 7,
    status: "active",
    info: true,
  },
  {
    label: "widget.singleprogresswidget2.label",
    percent: 80,
    barHeight: 7,
    status: "active",
    info: true,
  },
  {
    label: "widget.singleprogresswidget3.label",
    percent: 40,
    barHeight: 7,
    status: "active",
    info: true,
  },
  {
    label: "widget.singleprogresswidget4.label",
    percent: 60,
    barHeight: 7,
    status: "active",
    info: true,
  },
];

const STICKER_WIDGET = [
  {
    number: "widget.stickerwidget1.number",
    text: "widget.stickerwidget1.text",
    icon: "ion-email-unread",
    fontColor: "#ffffff",
    bgColor: "#7266BA",
  },
  {
    number: "widget.stickerwidget1.number",
    text: "widget.stickerwidget2.text",
    icon: "ion-android-camera",
    fontColor: "#ffffff",
    bgColor: "#42A5F6",
  },
  {
    number: "widget.stickerwidget1.number",
    text: "widget.stickerwidget3.text",
    icon: "ion-chatbubbles",
    fontColor: "#ffffff",
    bgColor: "#7ED320",
  },
  {
    number: "widget.stickerwidget1.number",
    text: "widget.stickerwidget4.text",
    icon: "ion-android-cart",
    fontColor: "#ffffff",
    bgColor: "#F75D81",
  },
];

const SALE_WIDGET = [
  {
    label: "widget.salewidget1.label",
    price: "widget.salewidget1.price",
    details: "widget.salewidget1.details",
    fontColor: "#F75D81",
  },
  {
    label: "widget.salewidget2.label",
    price: "widget.salewidget2.price",
    details: "widget.salewidget2.details",
    fontColor: "#F75D81",
  },
  {
    label: "widget.salewidget3.label",
    price: "widget.salewidget3.price",
    details: "widget.salewidget3.details",
    fontColor: "#F75D81",
  },
  {
    label: "widget.salewidget4.label",
    price: "widget.salewidget4.price",
    details: "widget.salewidget4.details",
    fontColor: "#F75D81",
  },
];

const CARD_WIDGET = [
  {
    icon: "ion-android-chat",
    iconcolor: "#42A5F5",
    number: "widget.cardwidget1.number",
    text: "widget.cardwidget1.text",
  },
  {
    icon: "ion-music-note",
    iconcolor: "#F75D81",
    number: "widget.cardwidget2.number",
    text: "widget.cardwidget2.text",
  },
  {
    icon: "ion-trophy",
    iconcolor: "#FEAC01",
    number: "widget.cardwidget3.number",
    text: "widget.cardwidget3.text",
  },
];

const PROGRESS_WIDGET = [
  {
    label: "widget.progresswidget1.label",
    details: "widget.progresswidget1.details",
    icon: "ion-archive",
    iconcolor: "#4482FF",
    percent: 50,
    barHeight: 7,
    status: "active",
  },
  {
    label: "widget.progresswidget2.label",
    details: "widget.progresswidget2.details",
    icon: "ion-pie-graph",
    iconcolor: "#F75D81",
    percent: 80,
    barHeight: 7,
    status: "active",
  },
  {
    label: "widget.progresswidget3.label",
    details: "widget.progresswidget3.details",
    icon: "ion-android-download",
    iconcolor: "#494982",
    percent: 65,
    barHeight: 7,
    status: "active",
  },
];

const SOCIAL_PROFILE = [
  {
    url: "#",
    icon: "ion-social-facebook",
    iconcolor: "#3b5998",
  },
  {
    url: "#",
    icon: "ion-social-twitter",
    iconcolor: "#00aced",
  },
  {
    url: "#",
    icon: "ion-social-googleplus",
    iconcolor: "#dd4b39",
  },
  {
    url: "#",
    icon: "ion-social-linkedin-outline",
    iconcolor: "#007bb6",
  },
  {
    url: "#",
    icon: "ion-social-dribbble-outline",
    iconcolor: "#ea4c89",
  },
];

export default function () {
  const { rowStyle, colStyle } = basicStyle;
  const dispatch = useDispatch();
  const { listDataHee } = useSelector((state) => state.Dashboard);
  console.log("daskfjashdf", listDataHee);

  const { width } = useWindowSize();

  const formatHee = (price) => {
    return (price = price > 0 ? Number(parseFloat(price / 10 ** 18).toFixed(2)) : parseInt(price));
  };

  const dataHeeInfo = listDataHee?.chart?.categories.map((category, index) => {
    return [category, formatHee(listDataHee?.chart?.series[0]?.data[index])];
  });

  console.log("dsfhjahsdfa", dataHeeInfo);

  useEffect(() => {
    dispatch(
      actions.getHeeInfo({
        fromDate: "2022-08-20",
        toDate: "2022-09-20",
      })
    );
  }, []);

  const options = {
    chart: {
      title: "Total amount of hee for the day",
      subtitle: `Total: ${Number(parseFloat(listDataHee?.total / 10 ** 18).toFixed(2))} hee.`,
    },
    width: width > 400 ? "1200px" : "600px",
    height: "600px",
    // vAxis: {
    //   format: "long",
    // },
    // chartArea: { left: 15, top: 15, right: 0, bottom: 0 },
    // curveType: "function",
  };

  // const chartEvents = [
  //   {
  //     eventName: "select",
  //     callback(Chart) {},
  //   },
  // ];

  // const stackConfig = {
  //   ...rechartConfigs.StackedAreaChart,
  //   width: !isServer && window.innerWidth < 450 ? 300 : 500,
  // };
  return (
    <LayoutWrapper style={{ overflow: "auto" }}>
      <div>
        <Row style={rowStyle} gutter={0} justify="start">
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
            {/* <Col> */}
            <IsoWidgetsWrapper>
              {/* <Line options={options} data={data} /> */}
              <Chart chartType="Line" data={dataHeeInfo && [["Days", "Hee"], ...dataHeeInfo]} options={options} />
            </IsoWidgetsWrapper>
          </Col>
        </Row>
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
