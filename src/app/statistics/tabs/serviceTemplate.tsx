import { computeServiceStats, getServiceReview } from "@/utils/format";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Statistic as StatisticType } from "@prisma/client";
import { Card, Col, Row, Statistic } from "antd";

interface ServiceTemplateProps {
  serviceName: string;
  statistics?: StatisticType;
}

const ServiceTemplate = ({ serviceName, statistics }: ServiceTemplateProps) => {
  if (!statistics)
    return (
      <div>
        Veuillez choisir une date de statistique pour voir les informations
      </div>
    );

  return (
    <div className="h-full">
      <h1 className="font-bold text-2xl mb-4">{serviceName}</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Positif"
              value={
                computeServiceStats(statistics?.statistics, serviceName)
                  .positiveTotal
              }
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              prefix={<ArrowUpOutlined />}
              suffix="avis"
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Statistic
              title="Negatif"
              value={
                computeServiceStats(statistics?.statistics, serviceName)
                  .negativeTotal
              }
              precision={0}
              valueStyle={{ color: "#cf1322" }}
              prefix={<ArrowDownOutlined />}
              suffix="avis"
            />
          </Card>
        </Col>
      </Row>
      <div className="mt-4">
        {getServiceReview(statistics?.statistics as any, serviceName)}
      </div>
    </div>
  );
};

export default ServiceTemplate;
