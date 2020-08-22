import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import queryString from "query-string";
import { LoadingOutlined } from "@ant-design/icons";
import {
  Layout,
  Card,
  Spin,
  Cascader,
  Row,
  Col,
  Pagination,
} from "antd";

// import { Story } from "./components";
import { Footer } from "../../components";
import { DetailArticle } from "./components";
import { getTopHeadlines } from "../../apis/topHeadlines";
import { getEverything } from "../../apis/everything";

import "./home.less";

const { Header, Content } = Layout;
const loadingIcon = <LoadingOutlined style={{ fontSize: 80 }} spin />;
const optionsSearchBy = [
  { value: false, label: "Top headlines" },
  { value: "Bitcoin", label: "Bitcoin" },
  { value: "Apple", label: "Apple" },
  { value: "Earthquake", label: "Earthquake" },
  { value: "Animal", label: "Animal" },
];

const Home = (props) => {
  const history = useHistory();
  const qs = queryString.parse(props.location.search);
  const [query, setQuery] = useState({
    page: parseInt(qs.page) || 1,
    q: qs.q || false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ hits: [], nbPages: 0 });
  const [visibleDetails, setVisibleDetails] = useState(false);
  const [article, setArticle] = useState({});

  useEffect(() => {
    const getArticles = async (query) => {
      document.title = "Loading...";
      try {
        let res = {};
        if (query.q === false) {
          res = await getTopHeadlines(
            queryString.stringify({ page: query.page, country: "US" })
          );
        } else {
          res = await getEverything(queryString.stringify(query));
        }

        setData(res.data);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
      document.title = "News";
    };
    getArticles(query);
  }, [query]);

  return (
    <Layout className="layout">
      <Header>
        <div className="header">
          <Link to="/">
            <img className="logo" src={require("./images/h-logo.svg")} alt="" />
          </Link>
          <div style={{ flex: 1 }}></div>
        </div>
      </Header>
      <Content className="h-content">
        {isLoading ? (
          <div style={{ textAlign: "center", margin: "50px 0" }}>
            <Spin indicator={loadingIcon} />
          </div>
        ) : (
          <div style={{ margin: "auto", maxWidth: 1800 }}>
            <div className="search-tool">
              <span>News</span>
              <Cascader
                options={optionsSearchBy}
                changeOnSelect
                defaultValue={[query.q && "Top headlines"]}
                onChange={(sort) => {
                  console.log(sort[0]);
                  window.scrollTo(0, 0);
                  history.push(
                    `?${queryString.stringify({
                      page: 1,
                      q: sort[0],
                    })}`
                  );
                  setQuery({ ...query, q: sort[0] });
                  setIsLoading(true);
                }}
                allowClear={false}
              />
            </div>

            {data.articles.length === 0 ? (
              <div style={{ textAlign: "center" }}>
                We found no article matching {query.q}
              </div>
            ) : (
              <>
                <Row gutter={32}>
                  {data.articles.map((article, index) => (
                    <Col className="gutter-row" lg={6} md={8} sm={12} xs={24} key={index}>
                      <Card
                        hoverable
                        style={{ marginBottom: 30 }}
                        onClick={() => {
                          setVisibleDetails(true);
                          setArticle(article);
                        }}
                        cover={
                          <img
                            style={{ height: 200 }}
                            alt=""
                            src={
                              article.urlToImage ||
                              "https://dapp.dblog.org/img/default.jpg"
                            }
                          />
                        }
                      >
                        <Card.Meta
                          title={article.title}
                          description={article.author || "unknow"}
                        />
                      </Card>
                    </Col>
                  ))}
                </Row>

                <div style={{ textAlign: "center" }}>
                  <Pagination
                    current={query.page}
                    onChange={(nPage) => {
                      window.scrollTo(0, 0);
                      history.push(
                        `?${queryString.stringify({
                          page: nPage,
                          q: query.q,
                        })}`
                      );
                      setIsLoading(true);
                      setQuery({ ...query, page: nPage });
                    }}
                    total={Math.ceil(data.totalResults / 2)}
                    showSizeChanger={false}
                  />
                </div>
              </>
            )}
          </div>
        )}
        <DetailArticle
          visible={visibleDetails}
          handleCancel={() => setVisibleDetails(false)}
          article={article}
        />
      </Content>
      <Footer />
    </Layout>
  );
};

export default Home;
