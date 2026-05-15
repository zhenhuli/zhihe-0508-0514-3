import React, { useState, useEffect } from 'react';
import { Layout, Card, Form, Input, InputNumber, DatePicker, Upload, Button, List, Timeline, message, Typography, Row, Col, Statistic } from 'antd';
import { PlusOutlined, PictureOutlined, RiseOutlined, CalendarOutlined } from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import 'antd/dist/reset.css';
import './App.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

function App() {
  const [records, setRecords] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const saved = localStorage.getItem('plantRecords');
    if (saved) {
      setRecords(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('plantRecords', JSON.stringify(records));
  }, [records]);

  const onFinish = (values) => {
    const newRecord = {
      id: Date.now(),
      date: values.date.format('YYYY-MM-DD'),
      height: values.height,
      note: values.note,
      photo: values.photo && values.photo[0] ? values.photo[0].thumbUrl : null
    };
    setRecords(prev => [...prev, newRecord].sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf()));
    form.resetFields();
    message.success('记录添加成功！');
  };

  const uploadProps = {
    listType: 'picture-card',
    maxCount: 1,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('只能上传图片文件！');
      }
      return isImage;
    }
  };

  const chartData = records.map(r => ({
    date: r.date,
    height: r.height
  }));

  const latestRecord = records[records.length - 1];
  const firstRecord = records[0];
  const totalGrowth = latestRecord && firstRecord ? (latestRecord.height - firstRecord.height).toFixed(1) : 0;

  return (
    <Layout className="layout">
      <Header className="header">
        <Title level={2} style={{ color: 'white', margin: 0 }}>🌱 植物生长时间轴</Title>
      </Header>
      <Content className="content">
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <Card title="添加生长记录" extra={<PlusOutlined />}>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <Form.Item
                  name="date"
                  label="日期"
                  rules={[{ required: true, message: '请选择日期！' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item
                  name="height"
                  label="株高 (cm)"
                  rules={[{ required: true, message: '请输入株高！' }]}
                >
                  <InputNumber min={0} step={0.1} style={{ width: '100%' }} placeholder="请输入株高" />
                </Form.Item>
                <Form.Item
                  name="note"
                  label="状态备注"
                >
                  <TextArea rows={3} placeholder="记录植物的生长状态..." />
                </Form.Item>
                <Form.Item
                  name="photo"
                  label="生长照片"
                  valuePropName="fileList"
                >
                  <Upload {...uploadProps}>
                    <div>
                      <PictureOutlined />
                      <div style={{ marginTop: 8 }}>上传</div>
                    </div>
                  </Upload>
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" block icon={<PlusOutlined />}>
                    添加记录
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="记录总数"
                    value={records.length}
                    prefix={<CalendarOutlined />}
                    suffix="条"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="当前株高"
                    value={latestRecord?.height || 0}
                    prefix={<RiseOutlined />}
                    suffix="cm"
                    precision={1}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="累计生长"
                    value={totalGrowth}
                    valueStyle={{ color: '#3f8600' }}
                    prefix="+ "
                    suffix="cm"
                    precision={1}
                  />
                </Card>
              </Col>
            </Row>

            <Card title="生长变化图谱" style={{ marginTop: 16 }}>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis label={{ value: '株高 (cm)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="height" stroke="#52c41a" strokeWidth={2} dot={{ fill: '#52c41a' }} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
                  暂无数据，请添加生长记录
                </div>
              )}
            </Card>

            <Card title="生长时间轴" style={{ marginTop: 16 }}>
              {records.length > 0 ? (
                <Timeline mode="left">
                  {records.slice().reverse().map((record) => (
                    <Timeline.Item
                      key={record.id}
                      label={<Text strong>{record.date}</Text>}
                      color="green"
                    >
                      <Card size="small" style={{ marginBottom: 8 }}>
                        <Row gutter={16}>
                          {record.photo && (
                            <Col span={6}>
                              <img src={record.photo} alt="植物照片" style={{ width: '100%', borderRadius: 4 }} />
                            </Col>
                          )}
                          <Col span={record.photo ? 18 : 24}>
                            <List
                              size="small"
                              dataSource={[
                                { label: '株高', value: `${record.height} cm` },
                                { label: '备注', value: record.note || '无' }
                              ]}
                              renderItem={item => (
                                <List.Item>
                                  <Text type="secondary">{item.label}：</Text>
                                  <span>{item.value}</span>
                                </List.Item>
                              )}
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Timeline.Item>
                  ))}
                </Timeline>
              ) : (
                <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
                  暂无记录，开始记录您的植物生长吧！
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
