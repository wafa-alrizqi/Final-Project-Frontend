import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PArticles from "../Article/PArticles";
import { Card, Container, Button } from "react-bootstrap";
import FavCategory from "./FavCategory";

function BookMark() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [deleteBookMarkId, setDeleteBookMarkId] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("token");

  const config = {
    headers: { Authorization: `Bearer ${accessToken}` },
  };

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/all_bookmark/`, config)
      .then((res) => {
        console.log(res.data.Bookmark);
        setData(res.data.Bookmark);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteBookMark = () => {
    axios
      .delete(
        `http://127.0.0.1:8000/delete_bookmark/${deleteBookMarkId}/`,
        config
      )
      .then((res) => {
        console.log("inside http delete method");
        setData(res.data.Bookmark);
        alert("deleted");
        window.location.reload();
      })
      .catch((error) => {
        console.log("inside http delete method / catch part");
        console.log(error);
      });
  };
  if (data.length === 0 ) {
    return (
      <>
      <div style={{ marginBottom: "100px" }}></div>
      <div className="d-flex justify-content-around">
      <section className=" mt-5 mb-5 text-center">
        <div className="container">
          <h2 className='mb-5' style={{ fontWeight: "bolder" }}>Your BookMark is Empty !</h2>
          <p className="lead text mb-5">
            You can Track on your interests without having to read everything.
            <br /> Reading brief articles from news sites, newsletters, and
            other sources can help you stay up to date on your interests.
          </p>
          <p>
            <a
              type="button"
              className="btn btn-outline-primary custom-btn"
              data-mdb-ripple-color="dark"
              style={{ marginRight: "10px", width: "300px" ,fontWeight: "bold", fontSize:'x-large' }}

              href="/categories"
            >
              Go To Categories
            </a>
          </p>
        </div>
      </section>
      </div>
      <div style={{ marginTop: "100px" }}></div>
      </>
    );
  } else {

  return (
    <div>
      <div>
        {" "}
        <FavCategory />
      </div>
      <h4 style={{ margin: "100px 0 20px 70px" ,color: "#545454"}}>My Bookmark Articles</h4>

      {data.map((e) => {
        return (
          <>
            <div style={{ marginTop: "12px" }}></div>
            <div
              className="d-flex justify-content-between"
              style={{ marginLeft: "70px" }}
            >
              <div class="card mb-3" style={{ width: "780px" }}>
                <div class="row no-gutters">
                  <div class="col-md-4">
                    <img src={e.article.image} class="card-img" alt="..." />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{e.article.title}</h5>
                      <p class="card-text">{e.article.summary}</p>
                      <p class="card-text">
                        <div
                          class="btn-group mr-2"
                          role="group"
                          aria-label="First group"
                        >
                          <svg
                            onClick={() => {
                              navigate(`/ViewDetails/${e.article.id}`);
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="blue"
                            class="bi bi-eye"
                            viewBox="0 0 20 20"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                          </svg>
                        </div>
                        <div
                          class="btn-group mr-2"
                          role="group"
                          aria-label="First group"
                        >
                          <svg
                            onClick={() => {
                              setDeleteBookMarkId(e.id);
                              deleteBookMark();
                            }}
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="red"
                            class="bi bi-x"
                            viewBox="0 0 20 20"
                          >
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                          </svg>
                        </div>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
}
}

export default BookMark;