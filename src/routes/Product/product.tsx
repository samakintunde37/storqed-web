import React, { useState, useEffect } from "react";
import { Button, Space, Tabs } from "antd";
import { useParams, useHistory, Route, Link } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { Options as HighChartsOptions } from "highcharts";
import LineChart from "../../components/product/LineChart";
import { useProducts } from "../../context/ProductsContext";
import { formatPrice } from "../../utils/amount";
import { deleteProduct } from "../../actions/Products";
import { priceHistoryDb } from "../../models/price-history-db";
import { quantityHistoryDb } from "../../models/quantity-history-db";

const { TabPane } = Tabs;

const generateChartsOptions = (
  title: string = "",
  data: number[]
): HighChartsOptions => {
  return {
    title: {
      text: title,
    },
    series: [
      {
        type: "line",
        data,
      },
    ],
  };
};

const ProductRoute: React.FC = () => {
  const history = useHistory();
  const { slug } = useParams();
  const { products, dispatchProducts } = useProducts();
  const product = products.products[slug];
  const [priceChartOptions, setPriceChartOptions] = useState<HighChartsOptions>(
    generateChartsOptions(
      "Product History",
      priceHistoryDb.getPriceHistories()[product.id].reverse()
    )
  );
  const [quantityChartOptions, setQuantityChartOptions] = useState<
    HighChartsOptions
  >(
    generateChartsOptions(
      "Quantity History Chart",
      quantityHistoryDb.getQuantityHistories()[product.id].reverse()
    )
  );

  const handleDelete = () => {
    deleteProduct(dispatchProducts, product);
    history.goBack();
  };

  if (!product) return null;

  return (
    <div>
      <Tabs>
        <TabPane tab="Product Details" key={1}>
          <Space direction="vertical" size={16}>
            <div>
              <p>Name</p>
              <p>{product.name}</p>
            </div>
            <div>
              <p>EAN</p>
              {product.ean}
            </div>
            <div>
              <p>Product Type</p>
              {product.type}
            </div>
            <div>
              <p>Weight</p>
              {product.weight}
            </div>
            <div>
              <p>Color</p>
              {product.color}
            </div>
            <div>
              <p>Quantity</p>
              {product.quantity}
            </div>
            <div>
              <p>Price</p>
              <>${formatPrice(product.price)}</>
            </div>
            <div>
              <p>Active</p>
              <p>{product.active.toString()}</p>
            </div>
            <Space size="middle">
              <Space>
                <Link
                  to={{
                    pathname: `/products/${slug}/edit`,
                    state: {
                      background: history.location,
                    },
                  }}
                >
                  <Button icon={<EditTwoTone />} htmlType="button">
                    Edit
                  </Button>
                </Link>
                <Button
                  icon={<DeleteTwoTone twoToneColor="#D47B6E" />}
                  htmlType="button"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Space>
            </Space>
          </Space>
        </TabPane>

        <TabPane destroyInactiveTabPane tab="Price History" key={2}>
          <h2>Price History</h2>
          <LineChart options={priceChartOptions} />
        </TabPane>
        <TabPane destroyInactiveTabPane tab="Quantity History" key={3}>
          <h2>Quantity History</h2>
          <LineChart options={quantityChartOptions} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductRoute;
