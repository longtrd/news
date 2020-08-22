import React from "react";
import { Modal } from "antd";
import moment from "moment";

const detailArticle = ({ visible, handleCancel, article }) => {
  return (
    <Modal
      wrapClassName="detail-article-modal"
      title="  "
      visible={visible}
      onCancel={handleCancel}
      width="calc(100% - 10px)"
      footer={null}
      style={{ maxWidth: 1000, top: 20 }}
    >
      <h1>{article.title}</h1>
      <div className="detail-author">
        <h3>
          {article.author} •{" "}
          {moment(article.publishedAt).startOf("hour").fromNow()}
        </h3>
        <h3>source: {"source" in article && article.source.name} </h3>
      </div>

      <img
        alt=""
        src={article.urlToImage || "https://dapp.dblog.org/img/default.jpg"}
        className="img-detail"
      />
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        View more...
      </a>
    </Modal>
  );
};

export default detailArticle;
