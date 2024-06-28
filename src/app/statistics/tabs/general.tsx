import { computeGlobalStats } from "@/utils/format";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { ResponsivePie } from "@nivo/pie";
import { Card, Col, Divider, Row, Statistic } from "antd";

const General = ({ data }: { data: Stats }) => {
  const globalStats = computeGlobalStats(data);

  return (
    <div className="h-full">
      <Row gutter={16}>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Positif"
              value={computeGlobalStats(data).positiveTotal}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="avis"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Negatif"
              value={computeGlobalStats(data).negativeTotal}
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="avis"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Statistic
              title="Neutre"
              value={computeGlobalStats(data).neutralTotal}
              precision={0}
              suffix="avis"
            />
          </Card>
        </Col>
      </Row>
      <div className="h-full flex mt-4">
        <div className="flex flex-col w-2/5">
          <h3 className="text-2xl font-bold">Avis global</h3>
          <p className="text-justify mt-2 self-center">
            {globalStats.globalReview}
          </p>
        </div>
        <ResponsivePie
          data={[
            {
              id: "positive",
              label: "Positif",
              value: globalStats.positiveTotal,
            },
            {
              id: "negative",
              label: "Negatif",
              value: globalStats.negativeTotal,
            },
            {
              id: "none",
              label: "Sans avis",
              value: globalStats.neutralTotal,
            },
          ]}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: "color",
            modifiers: [["darker", 0.2]],
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: "color",
            modifiers: [["darker", 2]],
          }}
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(255, 255, 255, 0.3)",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default General;
