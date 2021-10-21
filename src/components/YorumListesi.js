import React, { useState } from "react";
import { api } from "../api";

const YorumListesi = (props) => {
  const [duzenlenecekYorumId, setDuzenlenecekYorumId] = useState(0);
  const [duzenlenecekYorum, setDuzenlenecekYorum] = useState("");


  const yorumGuncelle = (event, yorum, duzenlenecekYorum)=>{
    event.preventDefault();
    api()
      .put(`/posts/${props.yaziDetayi.id}/comments/${yorum.id}`, {"body":duzenlenecekYorum})
      .then(() => {
        console.log("işlem tamam")})
      .catch((error) => {
        console.log("olmadı be usta");
      });
  }

  const handleOnChange = (event) => {
    //console.log(duzenlenecekYorum);
    setDuzenlenecekYorum(event.target.value);
    
  };

  const updateComment = (yorum) => {
    //event.preventDefault();
    setDuzenlenecekYorumId(yorum.id);
    setDuzenlenecekYorum(yorum.body);
    //console.log(duzenlenecekYorum);

    // api()
    //   .put(`/posts/${props.id}/comments/${duzenlenecekYorumId}`)
    //   .then((response) => {
    //     console.log("Değiştirildi: " + response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <React.Fragment>
      <h3>Yorumlar</h3>
      {props.yorumlar.map((yorum) => {
        if (duzenlenecekYorumId === yorum.id) {
          return (
            <form
              className="ui form"
              key={yorum.id}
              onSubmit={(event) => {
                yorumGuncelle(event, yorum,duzenlenecekYorum);
                //yorumGuncelle(event);
              }}
            >
              <div className="ui mini icon input">
                <input
                  disabled
                  name="display_name"
                  type="text"
                  placeholder="Adınız"
                  //onChange={handleOnChange}
                  value={yorum.display_name}
                />
              </div>
              <textarea
                name="body"
                placeholder="Yorumunuz"
                rows="3"
                onChange={handleOnChange}
                value={duzenlenecekYorum}
              ></textarea>
              <button className="ui blue button" type="submit">
                Kaydet
              </button>
            </form>
          );
        }

        return (
          <div className="ui relaxed list" key={yorum.id}>
            <div className="item">
              {/* <img
                className="ui avatar image"
                src="yazi-yorum-project/src/components/img/3.jpg"
              /> */}
              <div className="content">
                <span className="header">{yorum.display_name}</span>
                <div className="description">{yorum.body}</div>
              </div>
              <button
                className="ui blue button"
                onClick={() => updateComment(yorum)}
              >
                Düzenle
              </button>
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};
export default YorumListesi;
