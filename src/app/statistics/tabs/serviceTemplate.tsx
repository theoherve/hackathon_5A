import {Card, Col, Row, Statistic} from "antd";
import {computeServiceStats, getServiceReview} from "@/utils/format";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

interface ServiceTemplateProps {
	serviceName: string
	data?: any,
}

const ServiceTemplate = ({serviceName, data}: ServiceTemplateProps) => {
	return (
		<div className="h-full">
			<h1 className="font-bold text-2xl mb-4">{serviceName}</h1>
			<Row gutter={16}>
				<Col span={12}>
					<Card bordered={false}>
						<Statistic
							title="Positif"
							value={computeServiceStats(data, serviceName).positiveTotal}
							precision={0}
							valueStyle={{color: "#3f8600"}}
							prefix={<ArrowUpOutlined/>}
							suffix="avis"
						/>
					</Card>
				</Col>
				<Col span={12}>
					<Card bordered={false}>
						<Statistic
							title="Negatif"
							value={computeServiceStats(data, serviceName).negativeTotal}
							precision={0}
							valueStyle={{color: "#cf1322"}}
							prefix={<ArrowDownOutlined/>}
							suffix="avis"
						/>
					</Card>
				</Col>
			</Row>
			<div className="mt-4">
				{getServiceReview(data, serviceName)}
			</div>

		</div>
	);
};

export default ServiceTemplate;
