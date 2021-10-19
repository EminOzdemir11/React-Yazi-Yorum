import { api } from "../api";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const YaziFormu = (props) => {
  const [yazi, setYazi] = useState({ title: "", content: "" });
  const [hata, setHata] = useState("");

  const onInputChange = (event) => {
    setYazi({ ...yazi, [event.target.name]: event.target.value });
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    setHata("");

    if (props.yazi?.title) {
      //edit işlemi
      api()
        .put(`/posts/${props.match.params.id}`, yazi)
        .then((response) => {
          console.log(response);
          props.history.push(`/posts/${props.match.params.id}`);
        }).catch(error => {
          setHata("başlık ve yazı içeriği alanları zorunludur.");
        })
    } else {
      //add işlemi
      api()
        .post(`/posts`, yazi)
        .then((response) => {
          props.history.push("/"); // Anasayfaya yönlendiriyoruz
        })
        .catch((error) => {
          setHata("başlık ve yazı içeriği alanları zorunludur.");
        });
    }
  };

  useEffect(() => {
    if (props?.yazi?.title && props.yazi.content) {
      setYazi(props.yazi);
    }
  }, [props.yazi]);

  return (
    <React.Fragment>
      {hata && (
        <div class="ui error message">
          <div class="header">Hata</div>
          <p>{hata}</p>
        </div>
      )}

      <div className="ui form">
        <div className="field">
          <label>Yazı Başlığı</label>

          <input
            value={yazi.title}
            type="text"
            name="title"
            onChange={onInputChange}
          />
        </div>
        <div className="field">
          <label>Yazı İçeriği</label>
          <textarea
            value={yazi.content}
            rows="3"
            name="content"
            onChange={onInputChange}
          ></textarea>
        </div>
        <button className="ui primary button" onClick={onFormSubmit}>
          Gönder
        </button>
        <button className="ui button">İptal Et</button>
        <Link to="/">Anasayfaya dön</Link>
      </div>
    </React.Fragment>
  );
};
export default withRouter(YaziFormu);
