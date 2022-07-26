import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./css/Article.css";

export default function DeleteArticle() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/article_details/${id}/`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.Article);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteArticle = () => {
    axios
      .delete(`http://127.0.0.1:8000/delete_article/${id}/`, config)
      .then((res) => {
        alert("deleted");
        setData(res.data.Article);
        navigate("/PArticles");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    // <div className="row " style={{width:'80%',height:'100%',textAlign:'center',position:'relative',margin:'0 auto'}}>
    //   {data.map((e) => {
    //     return (
    //       <div className="col-8 col-md-6">
    //           <Card style={{ width: "50rem" ,  marginBottom:'20px',}}>
    //           <Card.Img
    //             style={{ width: "100%", height: "350px" }}
    //             variant="top"
    //             src={e.image}
    //           />
    //           <Card.Body>
    //             <Card.Title className="cardTitleText">
    //               Title: {e.title}
    //             </Card.Title>
    //             <Card.Text className="cardParagraphText">
    //               Content:
    //               <br /> {e.content}
    //             </Card.Text>
    //             <Card.Text className="cardParagraphText">
    //               Summary:
    //               <br /> {e.summary}
    //             </Card.Text>
    //             <Card.Text>Likes: {e.likes}</Card.Text>
    //             <Card.Footer className="text-muted">
    //               Publisehd at: {e.created_at} by {e.publisher}
    //             </Card.Footer>
    //           </Card.Body>
    //           <Card.Text className="text-center">
    //               <Button className="btn btn-danger"
    //                 onClick={deleteArticle}
    //                 style={{ marginBottom:'20px'}}
    //               >
    //                 Delete
    //               </Button>
    //             </Card.Text>
    //         </Card>
    //       </div>

    // view article details card
    <div className="cardsRow" style={{ columnCount: 1 }}>
      {data.map((e) => {
        return (
          <Container className="pt-5">
            <img
              style={{ width: "100%", height: "450px" }}
              variant="top"
              src={e.image}
              alt=" "
            />

            <h2 className="cardTitleText1 pt-3"> {e.title} </h2>

            <div className=" article-content">
              <p className="cardParagraphText">
                <br /> {e.content}
              </p>
              <p className="cardParagraphText">
                Summary:
                <br /> {e.summary}
              </p>
              <p className="text-muted">
                Publisehd at: {e.created_at} by {e.username}
              </p>
            </div>
            <div className="text-center">
              <button
                type="button"
                class="btn btn-outline-danger"
                data-mdb-ripple-color="dark"
                onClick={deleteArticle}
                style={{ marginBottom: "20px" }}
              >
                Delete
              </button>
            </div>
          </Container>
        );
      })}
    </div>
  );
}
